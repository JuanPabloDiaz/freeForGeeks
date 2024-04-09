// Replace 'owner' and 'repo' with the owner and name of the repository
// const url = "https://api.github.com/repos/JuanPabloDiaz/freeForGeeks";

// fetch(url)
//   .then((response) => response.json())
//   .then((data) => {
//     const stars = data.stargazers_count;
//     // Display the number of stars on your site
//     document.getElementById("star-count").textContent = stars;
//   })
//   .catch((error) => console.error("Error:", error));

// ------------------------------ //

function formatNumber(number) {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  } else {
    return number.toString();
  }
}

// ------------------------------ //

window.onload = function () {
  // Select all the links that point to a GitHub repository
  const links = Array.from(
    document.querySelectorAll('a[href^="https://github.com/"]')
  );
  // const links = Array.from(document.querySelectorAll("https://github.com/"));

  links.forEach((link) => {
    // Parse the URL and extract the owner and repo
    const url = new URL(link.href);
    const [owner, repo] = url.pathname.split("/").slice(1);

    // Make a GET request to the GitHub API's repository endpoint
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((response) => response.json())
      .then((data) => {
        // Extract the stargazers_count property and display it on the site
        const stars = data.stargazers_count;
        console.log("stars: ", stars);
        const Kstars = formatNumber(stars);
        console.log("K stars: ", Kstars);
        const starSpan = document.createElement("stars");
        starSpan.textContent = `⭐ ${Kstars} stars`;
        link.parentNode.insertBefore(starSpan, link.nextSibling);
      })
      .catch((error) => console.error("Error:", error));
  });
};

// ------------------------------ //
// Example usage (optional, can be removed)
const number = 23548;
const formattedNumber = formatNumber(number);
console.log(`${number} stars should be ${formattedNumber} stars`);
