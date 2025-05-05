// scripts/githubStars.js

async function fetchGitHubStars(repo) {
  const url = `https://api.github.com/repos/${repo}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Bad response");
    const data = await response.json();
    return data.stargazers_count;
  } catch (err) {
    console.warn(
      `❌ No se pudieron obtener estrellas para ${repo}:`,
      err.message
    );
    return null; // Falla silenciosa
  }
}

function extractRepoFromURL(url) {
  const match = url.match(/^https:\/\/github\.com\/([^\/]+\/[^\/\s#?]+)/);
  return match ? match[1] : null;
}

async function updateGitHubStars() {
  const links = document.querySelectorAll('a[href*="github.com"]');
  for (const link of links) {
    const repo = extractRepoFromURL(link.href);
    if (!repo) continue;

    const stars = await fetchGitHubStars(repo);
    if (stars === null) continue;

    // Busca un texto tipo "⭐ 1234" dentro del enlace y reemplázalo
    const starTextRegex = /⭐\s?\d[\d,\.]*/;
    const newStarText = `⭐ ${stars.toLocaleString()}`;

    let replaced = false;
    for (const node of link.childNodes) {
      if (
        node.nodeType === Node.TEXT_NODE &&
        starTextRegex.test(node.textContent)
      ) {
        node.textContent = node.textContent.replace(starTextRegex, newStarText);
        replaced = true;
        break;
      }
    }

    // Si no encontró texto de estrellas, opcional: agregarlo
    if (!replaced) {
      const span = document.createElement("span");
      span.textContent = ` ${newStarText}`;
      link.appendChild(span);
    }
  }
}

// Integrarlo como plugin de Docsify
window.$docsify = window.$docsify || {};
window.$docsify.plugins = (window.$docsify.plugins || []).concat((hook) => {
  hook.doneEach(() => {
    updateGitHubStars();
  });
});
