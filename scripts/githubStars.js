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
  console.log("Window loaded");

  // Select all the links that point to a GitHub repository
  const links = Array.from(
    document.querySelectorAll('a[href^="https://github.com/"]')
  );
  console.log("Links:", links);
  // const links = Array.from(document.querySelectorAll("https://github.com/"));

  links.forEach((link) => {
    // Parse the URL and extract the owner and repo
    const url = new URL(link.href);
    const [owner, repo] = url.pathname.split("/").slice(1);

    // // Skip the fetch operation if the current repository is the one you want to exclude
    // if (owner === "JuanPabloDiaz" && repo === "freeForGeeks") {
    //   return;
    // }

    console.log("Fetching data for:", owner, repo);

    // Make a GET request to the GitHub API's repository endpoint
    // fetch(`https://api.github.com/repos/${owner}/${repo}`)
    // fetch(`https://api.freeforgeeks.com/api?owner=${owner}&repo=${repo}`)
    fetch(`https://freeforgeeks.vercel.app/api?owner=${owner}&repo=${repo}`)
      .then((response) => {
        console.log("Status:", response.status);
        // console.log("Response:", response);
        return response.text();
      })
      .then((text) => {
        // console.log("Data:", data);
        // Extract the stargazers_count property and display it on the site
        console.log("Response text:", text);
        return JSON.parse(text);
        // const stars = data.stars;
        // console.log("stars: ", stars);
        // const Kstars = formatNumber(stars);
        // console.log("K stars: ", Kstars);
        // const starSpan = document.createElement("stars");
        // starSpan.textContent = `⭐ ${Kstars} stars`;
        // link.parentNode.insertBefore(starSpan, link.nextSibling);
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log("Status:", error.response && error.response.status);
      });
  });
};

// ------------------------------ //
// Example usage (optional, can be removed)
const number = 23548;
const formattedNumber = formatNumber(number);
console.log(`${number} stars should be ${formattedNumber} stars`);
