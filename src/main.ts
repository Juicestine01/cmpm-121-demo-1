import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Justin Xu's Game";
document.title = gameName;

const button = document.createElement("button");
button.innerHTML = "😼";

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(button)
