import sharp from "sharp";

const projects = [
  { id: 1, name: "CloudStore", hue: 210 },
  { id: 2, name: "TaskFlow", hue: 160 },
  { id: 3, name: "BrandUp", hue: 280 },
  { id: 4, name: "FitLife", hue: 120 },
  { id: 5, name: "EcoTrack", hue: 90 },
  { id: 6, name: "ChatHub", hue: 330 },
];

for (const p of projects) {
  const svg = `<svg width="640" height="360" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:hsl(${p.hue},60%,15%)"/>
        <stop offset="100%" style="stop-color:hsl(${p.hue + 40},50%,8%)"/>
      </linearGradient>
      <linearGradient id="glow" x1="50%" y1="50%" x2="0%" y2="0%">
        <stop offset="0%" style="stop-color:hsl(${p.hue},80%,50%);stop-opacity:0.15"/>
        <stop offset="100%" style="stop-color:hsl(${p.hue},80%,50%);stop-opacity:0"/>
      </linearGradient>
    </defs>
    <rect width="640" height="360" fill="url(#bg)"/>
    <rect width="640" height="360" fill="url(#glow)"/>
    <rect x="80" y="60" width="480" height="240" rx="12" fill="hsl(${p.hue},40%,20%)" stroke="hsl(${p.hue},50%,30%)" stroke-width="1"/>
    <rect x="80" y="60" width="480" height="200" rx="12" fill="hsl(${p.hue},40%,15%)"/>
    <circle cx="100" cy="80" r="4" fill="hsl(0,0%,40%)"/>
    <circle cx="116" cy="80" r="4" fill="hsl(40,80%,50%)"/>
    <circle cx="132" cy="80" r="4" fill="hsl(120,60%,50%)"/>
    <text x="320" y="200" font-family="Inter,sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">${p.name}</text>
    <text x="320" y="230" font-family="Inter,sans-serif" font-size="13" fill="hsl(0,0%,50%)" text-anchor="middle">Project Mockup</text>
  </svg>`;

  await sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile(`public/portfolio-${p.id}.webp`);
  console.log(`Created portfolio-${p.id}.webp`);
}
