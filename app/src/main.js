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
for (let i = 1; i <= 5; i++) {
  getData(URL).then((data) => selection.push(data));
}
document
  .querySelector("#app")
  .insertAdjacentHTML(
    "afterbegin",
    `<h1>hol up, the data is coming, chillax</h1>`
  );
const timeout = setInterval(function () {
  if (selection.length === 5) {
    clearInterval(timeout);
    document.querySelector("#app").innerHTML = "";
    for (let i = 0; i < selection.length; i++) {
      const uniqueletters = []
      for (let ii = 1; ii<selection[i].setup.length;ii++){
        if (!uniqueletters.find((letter)=>letter===selection[i].setup[ii])){
          uniqueletters.push(selection[i].setup[ii])
        }
      }
      const totalletters = selection[i].setup.length
      const spaces = selection[i].setup.split('').filter(char => char === " ").length
      const stats = { 
        Health: totalletters, 
        Speed: Math.ceil(spaces*10/((totalletters**2)/100))/1, 
        Power: Math.floor(uniqueletters.length/(1+totalletters/10)*10)/10, 
        Defense: Math.floor((totalletters-spaces)*10/(spaces+1))/10 
      };
      document
        .querySelector("#app")
        .insertAdjacentHTML(
          "afterbegin",
          `<div class="w-full h-50" id="${i}">
          <h1 id="joke">Joke: ${selection[i].setup}</h1>
          <h1 id="punch">Punchline: ${selection[i].delivery}</h1>
          <button>Select</button>
          </div>`
        );
        for (const stat in stats){
          document.getElementById(i).insertAdjacentHTML("beforeend",`<h1>${stat} : ${stats[stat]}</h1>`)
        }
        
    }
    document.querySelectorAll("button").forEach((selectbutton)=>selectbutton.addEventListener("click",function(){
      const name = selectbutton.closest("div").querySelector("#joke").textContent.slice(6,selectbutton.closest("div").querySelector("#joke").textContent.length)
      const powermove = selectbutton.closest("div").querySelector("#punch").textContent.slice(11,selectbutton.closest("div").querySelector("#punch").textContent.length)
      
    }));
  }
}, 100);
