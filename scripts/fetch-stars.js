const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");

const repos = [
  "ColorlibHQ/AdminLTE",
  "tabler/tabler",
  "akveo/ngx-admin",
  "coreui/coreui-free-bootstrap-admin-template",
  "creativetimofficial/material-dashboard",
  "tailwindcomponents/dashboard",
  "tailwindtoolbox/Admin-Template",
];

(async () => {
  const results = {};

  for (const repo of repos) {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}`);
      const json = await res.json();
      results[repo] = json.stargazers_count ?? null;
    } catch (err) {
      console.error(`❌ Error fetching ${repo}`, err);
      results[repo] = null;
    }
  }

  const outputPath = path.join(__dirname, "../data/stars.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log("✅ data/stars.json generado");
})();
