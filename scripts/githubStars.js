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

// Function to format numbers as "85.5k stars"
function formatStarsCount(stars) {
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(1)}k`; // Add one decimal place
  }
  return stars.toString();
}

async function updateGitHubStars() {
  const starsData = await loadStarsData();
  const links = document.querySelectorAll('a[href*="github.com"]');

  for (const link of links) {
    const repo = extractRepoFromURL(link.href);
    if (!repo) continue;

    const stars = starsData[repo];
    if (!stars) continue; // Skip if no stars data available

    const formattedStars = formatStarsCount(stars);
    const starTextRegex = /⭐\s?\d[\d,\.]*k?\s?stars?/i;
    const newStarText = `⭐ ${formattedStars} stars`;

    // Check if this is a star count link
    const isStarCountLink = link.textContent.match(/^\d[\d,\.]*k?\s?stars?$/i);
    // Check if this is a GitHub link
    const isGitHubLink = link.textContent.trim() === "GitHub";

    if (isStarCountLink) {
      // This is a star count link, update its text
      link.textContent = `${formattedStars} stars`;
    } else if (isGitHubLink) {
      // This is a GitHub link, replace text with star count
      link.textContent = `⭐ ${formattedStars} stars`;
    } else {
      // This is a regular link, handle inline star count
      let hasExistingStars = false;

      // Remove any existing star spans
      const existingStarSpans = link.querySelectorAll("span");
      existingStarSpans.forEach((span) => {
        if (span.textContent.includes("⭐")) {
          span.remove();
          hasExistingStars = true;
        }
      });

      // Check for and remove any inline star text
      for (const node of link.childNodes) {
        if (
          node.nodeType === Node.TEXT_NODE &&
          starTextRegex.test(node.textContent)
        ) {
          node.textContent = node.textContent.replace(starTextRegex, "").trim();
          hasExistingStars = true;
        }
      }

      // Only add star count if there was one before
      if (hasExistingStars) {
        const span = document.createElement("span");
        span.textContent = ` ${newStarText}`;
        link.appendChild(span);
      }
    }
  }
}

function extractRepoFromURL(url) {
  const match = url.match(/^https:\/\/github\.com\/([^\/]+\/[^\/\s#?]+)/);
  return match ? match[1] : null;
}

// Integrate with Docsify
window.$docsify = window.$docsify || {};
window.$docsify.plugins = (window.$docsify.plugins || []).concat((hook) => {
  hook.doneEach(() => {
    updateGitHubStars();
  });
});
