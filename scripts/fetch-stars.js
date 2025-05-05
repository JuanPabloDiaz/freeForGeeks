// scripts/fetch-stars.js

const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");

// Usa dotenv si tienes un .env (Remove For Production)
// require("dotenv").config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const readmePath = path.join(__dirname, "../README.md");
const readmeContent = fs.readFileSync(readmePath, "utf8");

// Extrae URLs tipo https://github.com/owner/repo
const repoRegex = /https:\/\/github\.com\/([\w.-]+\/[\w.-]+)(?![\w\/])/g;

const repoSet = new Set();
let match;
while ((match = repoRegex.exec(readmeContent)) !== null) {
  repoSet.add(match[1]); // Guarda solo el owner/repo
}

const repos = Array.from(repoSet);

(async () => {
  const results = {};

  for (const repo of repos) {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
      });
      if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
      const json = await res.json();
      results[repo] = json.stargazers_count ?? null;
    } catch (err) {
      console.error(`❌ Error fetching ${repo}`, err.message);
      results[repo] = null;
    }
  }

  const outputPath = path.join(__dirname, "../data/stars.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log("✅ data/stars.json generado");
})();
