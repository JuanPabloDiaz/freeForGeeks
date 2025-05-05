// Lista de repositorios a excluir
const excludedRepos = ["JuanPabloDiaz/freeForGeeks"];

async function loadStarsData() {
  try {
    const response = await fetch("./data/stars.json");
    if (!response.ok)
      throw new Error(`Failed to load stars.json: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error loading stars.json:", err.message);
    return {};
  }
}

async function updateGitHubStars() {
  const starsData = await loadStarsData();
  const links = document.querySelectorAll('a[href*="github.com"]');

  for (const link of links) {
    const repo = extractRepoFromURL(link.href);

    // Excluir repositorios en la lista de exclusión
    if (!repo || excludedRepos.includes(repo) || !(repo in starsData)) continue;

    const stars = starsData[repo];
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

    if (!replaced) {
      const span = document.createElement("span");
      span.textContent = ` ${newStarText}`;
      link.appendChild(span);
    }
  }
}

function extractRepoFromURL(url) {
  const match = url.match(/^https:\/\/github\.com\/([^\/]+\/[^\/\s#?]+)/);
  return match ? match[1] : null;
}

// Integrar con Docsify
window.$docsify = window.$docsify || {};
window.$docsify.plugins = (window.$docsify.plugins || []).concat((hook) => {
  hook.doneEach(() => {
    updateGitHubStars();
  });
});
