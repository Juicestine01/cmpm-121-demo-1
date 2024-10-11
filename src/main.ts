import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Justin Xu's Game";
document.title = gameName;

const button = document.createElement("button");
button.innerHTML = "😼";

let counter: number = 0; // Lines 11-16 increment counter each button click
let cost1: number = 10;
let cost2: number = 100;
let cost3: number = 1000;
const newDiv = document.createElement("div");
const newDiv2 = document.createElement("div");
const newDiv3 = document.createElement("div");
const newDiv4 = document.createElement("div");
const gr = document.createElement("div");
button.addEventListener("click", () => {
  shopButton1.disabled = Math.round(counter) < 9;
  counter += 1;
  newDiv.innerHTML = `${Math.round(counter)} cat smirks 😼`;
});

newDiv.innerHTML = `${counter} cat smirks 😼`; //Initialize first buttion

let previousTime: number = 0; // Initialize the time at the start
let flag = false;

function updateCount() {
  const currentTime = performance.now(); // Time after program
  const increment = (currentTime - previousTime) / 1000; // diff in time
  counter +=
    increment * (upgrades1 * 0.1) +
    increment * (upgrades2 * 2) +
    increment * (upgrades3 * 50); // increase counter divide by 1k to get seconds
  gr.innerHTML = `Growth Rate: ${Math.round(upgrades1 * 0.1 * 10) / 10 + upgrades2 * 2 + upgrades3 * 50}`;
  newDiv.innerHTML = `${Math.round(counter)} cat smirks 😼`; // increment counter
  previousTime = currentTime; // for next frame so u can get difference between 2 frames
  shopButton1.disabled = Math.round(counter) < cost1;
  shopButton2.disabled = Math.round(counter) < cost2;
  shopButton3.disabled = Math.round(counter) < cost3;
  requestAnimationFrame(updateCount);
}

let upgrades1: number = 0;
let upgrades2: number = 0;
let upgrades3: number = 0;

const shopButton1 = document.createElement("button");
shopButton1.innerHTML = `Normal Smile 😊: ${cost1}`;
shopButton1.disabled = true;

shopButton1.addEventListener("click", () => {
  if (upgrades1 >= 0) {
    if (!flag) {
    previousTime = performance.now();
    flag = true
    requestAnimationFrame(updateCount);
    }
  }
  counter -= cost1;
  upgrades1 += 1;
  newDiv.innerHTML = `${Math.round(counter)} Cat Smirks 😼`;
  newDiv2.innerHTML = `Number of normal smiles: ${upgrades1}`;
  cost1 *= 1.15;
  cost1 = Math.round(cost1 * 1000) / 1000;
  shopButton1.innerHTML = `Normal Smile 😊: ${cost1}`;
});

const shopButton2 = document.createElement("button");
shopButton2.innerHTML = `Cat Smile 😸: ${cost2}`;
shopButton2.disabled = true;
shopButton2.addEventListener("click", () => {
  counter -= cost2;
  upgrades2 += 1;
  newDiv.innerHTML = `${Math.round(counter)} Cat Smirks 😼`;
  newDiv3.innerHTML = `Number of Cat Smiles 😸: ${upgrades2}`;
  cost2 *= 1.15;
  cost2 = Math.round(cost2 * 1000) / 1000;
  shopButton2.innerHTML = `Cat Smile 😸: ${cost2}`;
});
const shopButton3 = document.createElement("button");
shopButton3.innerHTML = `Cat Face 🐱: ${cost3}`;
shopButton3.disabled = true;
shopButton3.addEventListener("click", () => {
  counter -= cost3;
  upgrades3 += 1;
  newDiv.innerHTML = `${Math.round(counter)} Cat Smirks 😼`;
  newDiv4.innerHTML = `Number of Cat Faces 🐱: ${upgrades3}`;
  cost3 *= 1.15;
  cost3 = Math.round(cost3 * 1000) / 1000;
  shopButton3.innerHTML = `Cat Face 🐱: ${cost3}`;
});

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(button);
app.append(shopButton1);
app.append(shopButton2);
app.append(shopButton3);
app.append(gr);
app.append(newDiv);
app.append(newDiv2);
app.append(newDiv3);
app.append(newDiv4);
