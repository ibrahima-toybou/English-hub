// Assemble the single-file artifact: head + body + data scripts (filename order) + app.
const fs = require("fs");
const path = require("path");
const root = __dirname;
const out = process.argv[2] || "/mnt/user-data/outputs/english-hub.html";

const dataDir = path.join(root, "data");
const order = f => (f.startsWith("tables") || f.startsWith("extras") || f.startsWith("vocab")) ? "z" + f : f;
const dataFiles = fs.readdirSync(dataDir).filter(f => f.endsWith(".js")).sort((a, b) => order(a).localeCompare(order(b)));
let data = "";
for (const f of dataFiles) {
  const src = fs.readFileSync(path.join(dataDir, f), "utf8");
  if (/<\/script/i.test(src)) throw new Error(f + " contains </script");
  data += "/* " + f + " */\n" + src + "\n";
}
const app = fs.readFileSync(path.join(root, "src/app.js"), "utf8");
const html = fs.readFileSync(path.join(root, "src/head.html"), "utf8")
  + "\n" + fs.readFileSync(path.join(root, "src/body.html"), "utf8")
  + "\n<script>\n" + data + "</script>\n<script>\n" + app + "</script>\n";
fs.writeFileSync(out, html);
console.log("built", out, (html.length / 1024).toFixed(0) + " KB", "from", dataFiles.join(", "));
