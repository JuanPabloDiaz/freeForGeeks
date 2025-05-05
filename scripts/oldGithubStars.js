// This script is not in use anymore

window.$docsify = {
  plugins: [
    function (hook, vm) {
      hook.doneEach(function () {
        const elements = Array.from(document.querySelectorAll("[data-stars]"));
        Promise.all(
          elements.map(async (el) => {
            const repo = el.getAttribute("data-stars");
            try {
              const res = await fetch(`https://api.github.com/repos/${repo}`);
              const data = await res.json();
              if (data.stargazers_count !== undefined) {
                el.innerText = `${data.stargazers_count.toLocaleString()} ⭐`;
              } else {
                el.innerText = "N/A";
              }
            } catch (e) {
              el.innerText = "N/A";
            }
          })
        ).catch((e) => {
          console.error("Error fetching GitHub stars:", e);
        });
      });
    },
  ],
};
