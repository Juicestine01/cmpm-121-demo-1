import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Justin Xu's Game";
document.title = gameName;

const button = document.createElement("button");
button.innerHTML = "😼";

let counter: number = 0;
const newDiv = document.createElement("div");
button.addEventListener("click", () => {
  counter += 1;
  newDiv.innerHTML = `${counter} smirks 😼`;
});
newDiv.innerHTML = `${counter} smirks 😼`;

let nIntervID;

if (!nIntervID) {
    nIntervID = setInterval(myCallback, 1000);
}

function myCallback() {
    counter += 1
    newDiv.innerHTML = `${counter} smirks 😼`;
}


const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(button);
app.append(newDiv);
