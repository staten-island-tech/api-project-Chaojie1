import "./style.css";
const URL =
  "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart";

async function getData(URL) {
  try {
    const response = await fetch(URL);
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    console.log("no bueno");
  }
}
const p1selection = [];
for (let i = 1; i <= 10; i++) {
  getData(URL).then((data) => p1selection.push(data));
}
document
  .querySelector("#app")
  .insertAdjacentHTML(
    "afterbegin",
    `<h1>hol up, the data is coming, chillax</h1>`
  );
const timeout = setInterval(function () {
  if (p1selection.length === 10) {
    clearInterval(timeout);
    document.querySelector("#app").innerHTML = "";
    for (let i = 1; i < p1selection.length; i++) {
      document
        .querySelector("#app")
        .insertAdjacentHTML(
          "afterbegin",
          `<div class="w-250 h-20 bg-red-100"><h1>${p1selection[i].setup} ${p1selection[i].delivery}</h1><button>display stats</button></div>`
        );
    }
  }
}, 100);
