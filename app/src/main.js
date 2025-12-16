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
const selection = [];
for (let i = 1; i <= 10; i++) {
  getData(URL).then((data) => selection.push(data));
}
document
  .querySelector("#app")
  .insertAdjacentHTML(
    "afterbegin",
    `<h1>hol up, the data is coming, chillax</h1>`
  );
const timeout = setInterval(function () {
  if (selection.length === 10) {
    clearInterval(timeout);
    document.querySelector("#app").innerHTML = "";
    for (let i = 1; i < selection.length; i++) {
      const uniqueletters = []
      for (let ii = 1; ii<selection.length;ii++){
        if (!uniqueletters.find((letter)=>letter===selection[i].setup[ii])){
          uniqueletters.push(selection[i].setup[ii])
        }
      }
      const stats = { Health: selection[i].setup.length, Speed: selection[i].setup.split('').filter(char => char === " ").length, Power:uniqueletters.length, };
      document
        .querySelector("#app")
        .insertAdjacentHTML(
          "afterbegin",
          `<div class="w-full h-50" id="${i}"><h1>Joke: ${selection[i].setup}</h1><h1>Punchline: ${selection[i].delivery}</h1></div>`
        );
        for (const stat in stats){
          document.getElementById(i).insertAdjacentHTML("beforeend",`<h1>${stat} : ${stats[stat]}</h1>`)
        }
        
      document.querySelectorAll("button").forEach;
    }
  }
}, 100);
