import "./style.css";

const URL =
  "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart";

async function getData(URL) {
  const response = await fetch(URL);
  if (!response.ok) throw new Error("Fetch failed");
  return response.json();
}

const selection = [];

for (let i = 0; i < 5; i++) {
  getData(URL).then((data) => selection.push(data));
}

function calculatestats(string) {
  const totalletters = string.length;
  const spaces = string.split("").filter((c) => c === " ").length;
  const uniqueletters = [...new Set(string)];
  return {
    Health: totalletters,
    Speed: Math.ceil((spaces * 10) / ((totalletters ** 2) / 100)),
    Power:
      Math.floor((uniqueletters.length / (1 + totalletters / 10)) * 10) / 10,
    Defense:
      Math.floor(((totalletters - spaces) * 10) / (spaces + 1)) / 10,
  };
}

document.querySelector("#app").innerHTML =
  `<h1 class="text-xl">hol up, the data is coming, chillax</h1>`;

const timeout = setInterval(() => {
  if (selection.length !== 5) return;
  clearInterval(timeout);

  document.querySelector("#app").innerHTML = `
    <div id="list" class="relative">
    </div>
  `;

  const list = document.getElementById("list");

  selection.forEach((joke) => {
    const stats = calculatestats(joke.setup);

    list.insertAdjacentHTML(
      "beforeend",
      `
      <div class="
        card
        mb-6 p-4 border rounded bg-white shadow
        transition-transform transition-opacity duration-700 ease-out
      ">
        <h1 class="joke font-bold">Joke: ${joke.setup}</h1>
        <h1 class="punch">Punchline: ${joke.delivery}</h1>
        <button class="select-btn mt-3 px-3 py-1 border rounded">
          Select
        </button>
        <div class="mt-2 text-sm">
          ${Object.entries(stats)
            .map(([k, v]) => `<div>${k}: ${v}</div>`)
            .join("")}
        </div>
      </div>
      `
    );
  });

  document.querySelectorAll(".select-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      if (document.getElementById("announcement")) return;

      const selectedCard = btn.closest(".card");
      const name = selectedCard
        .querySelector(".joke")
        .textContent.slice(6);

      // Announcement
      document.getElementById("app").insertAdjacentHTML(
        "afterbegin",
        `
        <h1
          id="announcement"
          class="
            fixed top-1/3 left-1/2 -translate-x-1/2
            font-bold text-7xl text-black
            opacity-0 scale-75 translate-y-6
            transition-all duration-500 ease-out
            pointer-events-none
          "
        >
          P1 SELECTED: ${name}
        </h1>
        `
      );

      const announcement = document.getElementById("announcement");

      requestAnimationFrame(() => {
        // Animate announcement
        announcement.classList.remove(
          "opacity-0",
          "scale-75",
          "translate-y-6"
        );
        announcement.classList.add(
          "opacity-100",
          "scale-100",
          "-translate-y-2"
        );

        const cards = [...document.querySelectorAll(".card")];

        // Set initial state for all cards
        cards.forEach((card) => {
          card.style.transform = "translateY(0)";
          card.style.opacity = "1";
        });

        // Animate cards one by one with stagger
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.transform = "translateY(-100vh)";
            card.style.opacity = "0";
          }, index * 150); // 150ms stagger
        });
      });
    })
  );
}, 100);
