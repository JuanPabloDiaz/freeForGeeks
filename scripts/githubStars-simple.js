window.$docsify = {
  plugins: [
    function (hook, vm) {
      hook.doneEach(function () {
        document.querySelectorAll("[data-stars]").forEach(async (el) => {
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
        });
      });
    },
  ],
};
