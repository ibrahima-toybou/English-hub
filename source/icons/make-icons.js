// Render the app icons (PNG) from icon.svg with the preinstalled Playwright. Usage: node icons/make-icons.js <outDir>
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const out = path.resolve(process.argv[2] || path.join(__dirname, "..", ".."));
const svg = fs.readFileSync(path.join(__dirname, "icon.svg"), "utf8");
const bleed = svg.replace('rx="112" ', "").replace(/<rect x="112"[\s\S]*<\/svg>/, m => '<g transform="translate(256 256) scale(0.78) translate(-256 -256)">' + m.replace("</svg>", "") + "</g></svg>");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  const shot = async (src, size, file, transparent) => {
    await p.setViewportSize({ width: size, height: size });
    await p.setContent('<html><body style="margin:0;background:transparent">' + src.replace("<svg ", '<svg width="' + size + '" height="' + size + '" ') + "</body></html>");
    await p.screenshot({ path: path.join(out, file), omitBackground: transparent });
  };
  await shot(svg, 192, "icon-192.png", true);
  await shot(svg, 512, "icon-512.png", true);
  await shot(bleed, 512, "icon-maskable-512.png", false);
  await shot(bleed, 180, "apple-touch-icon.png", false);
  fs.copyFileSync(path.join(__dirname, "icon.svg"), path.join(out, "icon.svg"));
  await b.close();
  console.log("icons written to", out);
})();
