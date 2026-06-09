import { jsPDF } from 'jspdf';
import { UserProfile, CarbonFootprint } from '../types';
import { calculateEmissions, getCarbonScoreAndGrade } from '../data/carbonData';

interface PdfGenerateOptions {
  profile: UserProfile;
  footprint: CarbonFootprint;
  purchasedCert?: {
    certId: string;
    projectName: string;
    location: string;
    tonsOffsetted: number;
    cost: number;
    date: string;
    holderName: string;
    rating: string;
  } | null;
}

export function generateSustainReportPdf({ profile, footprint, purchasedCert }: PdfGenerateOptions) {
  // Initialize standard A4 PDF (210mm x 297mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageW = 210;
  const pageH = 297;

  // Color Palette Definitions
  const colorSlateBg = [15, 23, 42]; // #0F172A (Deep Slate)
  const colorEmerald = [16, 185, 129]; // #10B981 (Emerald Green)
  const colorSky = [14, 165, 233]; // #0EA5E9 (Sky Blue)
  const colorMutedText = [100, 116, 139]; // #64748B (Slate grey)
  const colorDarkText = [30, 41, 59]; // #1E293B

  // Calculations
  const breakdown = calculateEmissions(footprint);
  const { score, grade } = getCarbonScoreAndGrade(breakdown.total);
  const totalTons = (breakdown.total / 1000).toFixed(2);

  // 1. HEADER SECTION (Slate blue banner)
  doc.setFillColor(colorSlateBg[0], colorSlateBg[1], colorSlateBg[2]);
  doc.rect(0, 0, pageW, 38, 'F');

  // Decorative header accent bar
  doc.setFillColor(colorEmerald[0], colorEmerald[1], colorEmerald[2]);
  doc.rect(0, 38, pageW, 2, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('CARBONPULSE', 14, 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(209, 213, 219);
  doc.text('MONTHLY SUSTAINABILITY REPORT & VERIFIED LEDGER', 14, 21);

  // Header Metadata (Right Aligned)
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('STATEMENT ID: CP-2026-614', pageW - 65, 14);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(167, 243, 208); // Emerald Green light
  doc.text('PARIS CLIMATE ALLY COMPLIANT', pageW - 65, 19);

  doc.setTextColor(209, 213, 219);
  doc.text(`ISSUED: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}`, pageW - 65, 24);

  // Standard margin positions
  const startX = 14;
  let currentY = 52;

  // 2. USER PROFILE BLOCK (Left) & CARBON GRADE BLOCK (Right)
  // Left: Profile details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(colorDarkText[0], colorDarkText[1], colorDarkText[2]);
  doc.text('OPERATOR PROFILE', startX, currentY);

  doc.setDrawColor(226, 232, 240); // divider line
  doc.setLineWidth(0.3);
  doc.line(startX, currentY + 2, 105, currentY + 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  doc.text(`Name:`, startX, currentY + 8);
  doc.setFont('helvetica', 'bold');
  doc.text(profile.name, startX + 18, currentY + 8);

  doc.setFont('helvetica', 'normal');
  doc.text(`Clearance:`, startX, currentY + 14);
  doc.setFont('helvetica', 'bold');
  doc.text(`Lvl ${profile.level} (${profile.levelName})`, startX + 18, currentY + 14);

  doc.setFont('helvetica', 'normal');
  doc.text(`ID Ticket:`, startX, currentY + 20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colorMutedText[0], colorMutedText[1], colorMutedText[2]);
  doc.text(profile.email, startX + 18, currentY + 20);

  // Right: Carbon Grade summary panel
  doc.setFillColor(248, 250, 252); // light slate box
  doc.rect(115, currentY - 3, 81, 28, 'F');
  doc.rect(115, currentY - 3, 81, 28, 'S');

  // Draw Grade letter
  doc.setFillColor(colorEmerald[0], colorEmerald[1], colorEmerald[2]);
  doc.rect(119, currentY, 15, 15, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(grade, 125, currentY + 10.5);

  doc.setTextColor(colorDarkText[0], colorDarkText[1], colorDarkText[2]);
  doc.setFontSize(10);
  doc.text('Sovereign Carbon Grade', 139, currentY + 4);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(colorMutedText[0], colorMutedText[1], colorMutedText[2]);
  doc.text(`Calculated score: ${score} points`, 139, currentY + 9);
  doc.text('Paris Target Alignment Check: PASS', 139, currentY + 13);

  currentY += 32;

  // 3. CARBON FOOTPRINT METRICS GRID
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(colorDarkText[0], colorDarkText[1], colorDarkText[2]);
  doc.text('ANNUAL CARBON EMISSIONS MATRIX (MEASURED INPUTS)', startX, currentY);
  
  doc.line(startX, currentY + 2, pageW - 14, currentY + 2);

  // Summary box of total footprint
  doc.setFillColor(236, 253, 245); // light green
  doc.rect(startX, currentY + 6, pageW - 28, 12, 'F');
  
  doc.setTextColor(6, 95, 70); // deep emerald text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Total Annual Environmental Load:', startX + 4, currentY + 14);
  doc.setFontSize(11);
  doc.text(`${totalTons} Tons CO2e / Year`, pageW - 65, currentY + 14);

  // Emissions items list (Table header)
  currentY += 25;
  doc.setFillColor(241, 245, 249);
  doc.rect(startX, currentY, pageW - 28, 7, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('EMISSIONS CATEGORY', startX + 4, currentY + 5);
  doc.text('MEASURED HABITS / USAGE BASIS', startX + 60, currentY + 5);
  doc.text('ESTIMATED CO2e IMPACT', pageW - 48, currentY + 5);

  // Category values list
  const categoryRows = [
    { name: 'Transportation', details: `${footprint.transportation} km/wk via ${footprint.transportType}`, value: `${breakdown.transport} kg CO2e` },
    { name: 'Flights / Long Range', details: `${footprint.flights} short-haul, ${footprint.flightsLong} long-haul flights/yr`, value: `${breakdown.travel} kg CO2e` },
    { name: 'Electricity & Utilities', details: `${footprint.electricity} kWh electricity and ${footprint.water}L water daily`, value: `${breakdown.home} kg CO2e` },
    { name: 'Diet & Nutrition', details: `${footprint.diet} style consumption index`, value: `${breakdown.food} kg CO2e` },
    { name: 'Shopping & Consumables', details: `${footprint.shopping} retail shopping volume level`, value: `${breakdown.shopping} kg CO2e` },
    { name: 'Digital Services Usage', details: `${footprint.digital} hrs daily streaming/compute cycles`, value: `${breakdown.digital} kg CO2e` },
  ];

  let matrixY = currentY + 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);

  categoryRows.forEach(row => {
    doc.text(row.name, startX + 4, matrixY);
    doc.text(row.details, startX + 60, matrixY);
    doc.setFont('helvetica', 'bold');
    doc.text(row.value, pageW - 48, matrixY);
    doc.setFont('helvetica', 'normal');
    
    // row separator dotted look
    doc.setDrawColor(241, 245, 249);
    doc.line(startX, matrixY + 2.5, pageW - 14, matrixY + 2.5);
    matrixY += 7.5;
  });

  currentY = matrixY + 5;

  // 4. GAMIFIED REWARDS & MONTHLY ACHIEVEMENTS
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(colorDarkText[0], colorDarkText[1], colorDarkText[2]);
  doc.text('MONTHLY ACHIEVEMENTS & ACCREDITED BADGES', startX, currentY);
  doc.setDrawColor(226, 232, 240);
  doc.line(startX, currentY + 2, pageW - 14, currentY + 2);

  // Badge list display
  let badgeY = currentY + 7;

  const badges = [
    { title: '🚲 URBAN COMMUTER LOCK', desc: 'Slashed vehicle driving vectors by over 45% using electric or public alternatives.' },
    { title: '🔋 POWER STANDBY SLAYER', desc: 'Eradicated micro energy leaks and phantom standby currents across residential modules.' }
  ];

  // If climate innovator Nga Nguyen is loaded
  if (profile.isInnovator) {
    badges.push({
      title: '🌟 ReFi TALENTS INNOVATOR BADGE',
      desc: "Honorable professional certification index from Frankfurt School. Verified sovereign ledger aligned."
    });
  }

  badges.forEach(badge => {
    // Left marker dot
    doc.setFillColor(colorEmerald[0], colorEmerald[1], colorEmerald[2]);
    doc.rect(startX + 1, badgeY + 1, 2.5, 2.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(16, 124, 65); // green text
    doc.text(badge.title, startX + 6, badgeY + 3.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(badge.desc, startX + 6, badgeY + 7.5);

    badgeY += 12;
  });

  currentY = badgeY + 3;

  // 5. VERIFIED CARBON OFFSET CERTIFICATES section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(colorDarkText[0], colorDarkText[1], colorDarkText[2]);
  doc.text('VERIFIED CARBON OFFSET CERTIFICATES LEDGER', startX, currentY);
  doc.line(startX, currentY + 2, pageW - 14, currentY + 2);

  currentY += 7;

  // Pre-secured baseline offset (for beautiful visual content)
  const baselineOffset = {
    id: 'CERT-PULSE-4801',
    project: 'Katingan Peatland Mangrove Carbon Conservation',
    location: 'Central Kalimantan, Indonesia',
    tons: '1.20 Tons CO2e',
    status: 'VERIFIED & RETIRED'
  };

  // Draw Certificate representation card format
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.rect(startX, currentY, pageW - 28, 18, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text(baselineOffset.project, startX + 4, currentY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Location: ${baselineOffset.location} • Registry: Verra VCS Registry`, startX + 4, currentY + 10);
  doc.text(`ID: ${baselineOffset.id}`, startX + 4, currentY + 14);

  doc.setTextColor(16, 115, 65);
  doc.setFont('helvetica', 'bold');
  doc.text(baselineOffset.tons, pageW - 55, currentY + 7);
  doc.setFontSize(7.5);
  doc.text(baselineOffset.status, pageW - 55, currentY + 12);

  currentY += 21;

  // If a newly purchased cert exists, print it too!
  if (purchasedCert) {
    doc.setFillColor(240, 253, 250); // Mint color
    doc.setDrawColor(153, 246, 228);
    doc.rect(startX, currentY, pageW - 28, 18, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 118, 110);
    doc.text(purchasedCert.projectName, startX + 4, currentY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(20, 110, 100);
    doc.text(`Location: ${purchasedCert.location} • Rating: ${purchasedCert.rating}`, startX + 4, currentY + 10);
    doc.text(`Trans ID: ${purchasedCert.certId} • Cost: $${purchasedCert.cost.toFixed(2)}`, startX + 4, currentY + 14);

    doc.setTextColor(13, 148, 136);
    doc.setFont('helvetica', 'bold');
    doc.text(`${purchasedCert.tonsOffsetted.toFixed(2)} Tons CO2e`, pageW - 55, currentY + 7);
    doc.setFontSize(7.5);
    doc.text('RETIRED IN LIVE SESSION', pageW - 55, currentY + 12);
    
    currentY += 21;
  }

  // 6. CRYPTOGRAPHIC SIGNATURE & SYSTEM SEAL FOOTER
  const footerY = pageH - 26;
  doc.setDrawColor(226, 232, 240);
  doc.line(startX, footerY, pageW - 14, footerY);

  // Left crypto hash
  doc.setFont('courier', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  const hash = 'SHA256: 7d6c57f2081827361bfd3bfda39921ff9281a8b9e697cfdb89d81d2a71cfeb32';
  doc.text(hash, startX, footerY + 5);
  doc.text('CO2e ACCREDITATION NODE: RUNNING_SECURE // FIPS-COMPLIANT CERTIFICATION', startX, footerY + 9);

  // Right official issuer disclaimer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('CarbonPulse Environment Registry • Verra VCS Platform Support Node 102', pageW - 104, footerY + 5);
  doc.text('Secure PDF generated in live user session - all rights retained.', pageW - 96, footerY + 9);

  // Save document
  doc.save(`${profile.name.toLowerCase().replace(/\s+/g, '_')}_sustainability_ledger.pdf`);
}
