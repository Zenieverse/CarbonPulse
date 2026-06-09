import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Lazy initializer for Google Gen AI
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. AI functionality will fallback to high-quality smart mock summaries.");
      // Throwing error on compile is bad, we will handle it gracefully in routes
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. HEALTHCHECK
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// 2. AI SUGGESTION & CHAT ASSISTANT
app.post("/api/chat", async (req, res) => {
  const { messages, currentFootprint } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Missing or invalid messages array" });
  }

  const promptMessage = messages[messages.length - 1]?.content || "Provide climate advice.";

  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      // Return high-quality mock data when there's no API key to let the prototype be incredibly interactive
      const mockReplies = [
        "Your electricity consumption contributes a fair share. Switching to energy-saving heat pumps or smart scheduling could reduce home emissions by up to 25%. Let's start with a energy-audit challenge!",
        "Transportation occupies a major slot. If you replace 2 medium gas car drives with electric transit or bicycle trips per week, you can prevent 420 kg of carbon emissions annually!",
        "Transitioning to a plant-based diet even on weekends creates a wonderful effect. Re-routing dairy products to plant-based almonds or oat milks spares nearly 180 kg CO2e a year.",
        "Your digital consumption is clean, but charging devices overnight keeps phantom vampire voltage running. Try joining our vampire energy savings habit!"
      ];
      const randomMock = mockReplies[Math.floor(Math.random() * mockReplies.length)];
      return res.json({
        reply: `[MOCK AI] ${randomMock} (Configure a real GEMINI_API_KEY inside Settings > Secrets to link the live Gemini model)`,
        suggestedActions: [
          { label: "Join No Car Week", action: "join_challenge", id: "chall-1" },
          { label: "Add Vegan Lunch", action: "add_habit", value: "vegan-lunch" }
        ]
      });
    }

    const ai = getAI();
    const systemIns = `You are CarbonPulse AI Coach, a highly motivational, scientific sustainability coach (like a combination of Duolingo, Fitbit, and Stripe Dashboards).
The user's current footprint metrics are: ${JSON.stringify(currentFootprint)}.
Guide them towards reducing carbon. Give specific figures (eg tons of CO2e saved). Format with markdown. Keep paragraphs punchy.`;

    const chatContext = messages.map(m => ({
      role: m.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: m.content }]
    }));

    // Generate response
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatContext,
      config: {
        systemInstruction: systemIns,
        temperature: 0.7,
      }
    });

    res.json({
      reply: response.text || "I apologize, I could not synthesize that advice.",
      suggestedActions: [
        { label: "Unplug standby vampire devices", action: "add_habit", value: "vampire" },
        { label: "Swap 1 car drive for transit", action: "add_habit", value: "transit" }
      ]
    });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: error.message || "Failed to communicate with AI" });
  }
});

// 3. AI BILLS & RECEIPT OCR DETECTOR
app.post("/api/analyze-bill", async (req, res) => {
  const { imageBase64, mimeType } = req.body;
  if (!imageBase64 || !mimeType) {
    return res.status(400).json({ error: "Missing imageBase64 or mimeType representation" });
  }

  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      // Mock parsing for high fidelity offline demonstration
      const mockResult = {
        company: "Pacific Grid Power Co.",
        date: new Date().toLocaleDateString(),
        serviceType: "electricity",
        extractedValue: 340, // 340 kWh
        unit: "kWh",
        confidence: 94,
        co2eEstimateKg: 129.2, // 340 * 0.38
        summary: "Extracted electricity utility billing statement. Total quantity: 340 kWh of grid power detected."
      };
      return res.json(mockResult);
    }

    const ai = getAI();
    const imagePart = {
      inlineData: {
        data: imageBase64.split(",").pop() || imageBase64,
        mimeType: mimeType
      }
    };

    const textPart = {
      text: `Analyze this receipt, utility bill or purchase invoice. 
Identify the merchant/company, bill date, type of service or product purchased (electricity, water, gasoline, groceries, airline, digital streaming, general shopping).
Extract the numeric utility value or unit amount if specified (e.g. kWh, gallons, liters, distance, or total currency spending).
Estimate its carbon footprint intensity in kg CO2e based on industry standards (e.g., 0.38kg per kWh grid power, 2.3kg per liter gas, etc.).
Provide the answer structured precisely as JSON.`
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            company: { type: Type.STRING, description: "Merchant or utility brand company name" },
            date: { type: Type.STRING, description: "Date of billing or ticket" },
            serviceType: { type: Type.STRING, description: "One of: electricity, water, gas, transit, flight, diet, shopping" },
            extractedValue: { type: Type.NUMBER, description: "Numeric consumption quantity extracted from bill" },
            unit: { type: Type.STRING, description: "The units associated (e.g. kWh, Gallons, Liters, USD, EUR)" },
            confidence: { type: Type.NUMBER, description: "Confidence score 0-100" },
            co2eEstimateKg: { type: Type.NUMBER, description: "Estimated kg carbon emissions generated" },
            summary: { type: Type.STRING, description: "Very short human summary explanation" }
          },
          required: ["company", "serviceType", "co2eEstimateKg", "summary"]
        }
      }
    });

    const parsedJson = JSON.parse(response.text || "{}");
    res.json(parsedJson);

  } catch (error: any) {
    console.error("OCR Analysis Error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze document" });
  }
});

// 4. AI FOOTPRINT FORECASTING
app.post("/api/forecast", async (req, res) => {
  const { currentFootprint, history } = req.body;
  if (!currentFootprint) {
    return res.status(400).json({ error: "Missing footprint parameters" });
  }

  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      // Mock forecasting
      const transport = currentFootprint.transportation * 52 * 0.18;
      const electricity = currentFootprint.electricity * 12 * 0.38;
      const initialTotal = (transport + electricity + 2500) / 1000; // t CO2e

      return res.json({
        forecast: [
          { name: "Current", businessAsUsual: initialTotal, targetReduction: initialTotal },
          { name: "3 Months", businessAsUsual: initialTotal * 1.02, targetReduction: initialTotal * 0.94 },
          { name: "6 Months", businessAsUsual: initialTotal * 1.03, targetReduction: initialTotal * 0.88 },
          { name: "12 Months", businessAsUsual: initialTotal * 1.05, targetReduction: initialTotal * 0.75 },
          { name: "5 Years", businessAsUsual: initialTotal * 1.15, targetReduction: initialTotal * 0.45 }
        ],
        insights: "Based on current trajectories, your annual footprint of " + initialTotal.toFixed(1) + " tons CO2e will grow slightly under business-as-usual, but adopting a public transit shift can yield a beautiful 55% contraction by Year 5, matching standard Net-Zero Paris agreement thresholds!"
      });
    }

    const ai = getAI();
    const prompt = `Based on this current carbon profile indicators: ${JSON.stringify(currentFootprint)}, 
recommend 3 emissions projections metrics in Tons of CO2e (tCO2e):
1. Business-as-Usual (BAU) pathway for: Current, 3 months, 6 months, 12 months, 5 years.
2. Net-Zero Target Adaptive Pathway: Current, 3 months, 6 months, 12 months, 5 years.

Synthesize a short response formatted as JSON containing:
1. 'forecast' - An array of 5 entries, each having: { name: "Current" | "3 Months" | "6 Months" | "12 Months" | "5 Years", businessAsUsual: number, targetReduction: number }
2. 'insights' - A paragraph explaining the comparisons of BAU vs Target adaptive pathways.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            forecast: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  businessAsUsual: { type: Type.NUMBER, description: "Emissions in tons CO2e under BAU" },
                  targetReduction: { type: Type.NUMBER, description: "Emissions in tons CO2e under active sustainable adaptations" }
                },
                required: ["name", "businessAsUsual", "targetReduction"]
              }
            },
            insights: { type: Type.STRING, description: "Explanation paragraph comparing models" }
          },
          required: ["forecast", "insights"]
        }
      }
    });

    const parsedJson = JSON.parse(response.text || "{}");
    res.json(parsedJson);

  } catch (error: any) {
    console.error("Forecasting error:", error);
    res.status(500).json({ error: error.message || "Failed to generate forecasting insights" });
  }
});

// Serve frontend assets in production and development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Vite Dev Middleware Configuration
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CarbonPulse full-stack server listening on http://localhost:${PORT}`);
  });
}

startServer();
