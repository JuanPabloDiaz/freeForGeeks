module.exports = async (req, res) => {
  const { owner, repo } = req.query;

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  const data = await response.json();

  // Get the origin of the request
  const origin = req.headers.origin;

  // Define the allowed origins
  const allowedOrigins = [
    "http://127.0.0.1:5500",
    "https://juanpablodiaz.github.io",
    "https://freeforgeeks.vercel.app",
    "https://freeforgeeks.com",
    "https://www.freeforgeeks.com", // when this is commented out, the cors error disappears when working locally
  ];

  // If the origin of the request is in the allowedOrigins array, set the Access-Control-Allow-Origin header to that origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.send({ stars: data.stargazers_count });
};
