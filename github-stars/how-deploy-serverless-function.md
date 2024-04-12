# How can I deploy a serverless function for my Docsify site?

Deploying a serverless function can be done using various platforms like `Vercel, Netlify, or AWS Lambda`. Here, I'll provide a step-by-step guide on how to do it using Vercel, which provides a simple and straightforward way to deploy serverless functions.

1. Install Vercel CLI: First, you need to install the Vercel CLI. You can do this using npm:

   ```bash
   npm install -g vercel
   ```

2. Create a new directory: Next, create a new directory for your serverless function:

   ```bash
   mkdir github-stars-api
   cd github-stars-api
   ```

3. Create your serverless function: In the github-stars-api directory, create a new file named api.js and add the following code:

   ```javascript
   const fetch = require("node-fetch");

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

     res.send({ stars: data.stargazers_count });
   };
   ```

4. Deploy your serverless function: Now you can deploy your serverless function to Vercel. Run the following command:

   ```bash
   vercel
   ```

> During the deployment process, Vercel CLI will ask you a series of questions. You can answer them as follows:

- Set up and develop ./: You can press Enter to accept the default.
- Link to existing project? Select "No".
- What’s your project’s name? Enter a name for your project.
- In which directory is your code located? Press Enter to accept the default (./).
- Want to override the settings? Select "No".

5.  Set up your GitHub token: After your deployment is complete, you need to add your GitHub token to your Vercel project. Run the following command:

    ```bash
    vercel env add plain GITHUB_TOKEN
    ```

    > When prompted, enter your GitHub token. This token will be stored securely and will be available to your serverless function as `process.env.GITHUB_TOKEN`.

6.  Redeploy your serverless function: Finally, redeploy your serverless function so it can use the newly added GitHub token:

    ```bash
    vercel --prod
    ```

    After this, your serverless function will be available at a URL like `https://your-vercel-project-name.vercel.app/api`. You can use this URL in your Docsify site to fetch the star count for GitHub repositories.

7.  Configure the `custom domain` (optional): If you want to use a custom domain for your serverless function, you can configure it in the Vercel dashboard. Go to your project settings and add your custom domain under the Domains section.
    > https://api.freeforgeeks.com/api.js
