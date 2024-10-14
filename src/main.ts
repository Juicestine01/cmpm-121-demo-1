import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Justin Xu's Game";
document.title = gameName;

interface Item {
    name: string,
    cost: number,
    rate: number
};

const availableItems: Item[] = [
    {name: "Normal Smile 😊", cost: 10, rate: 0.1},
    {name: "Cat Smile 😸", cost: 100, rate: 2},
    {name: "Cat Face 🐱", cost: 1000, rate: 50}
];

const button = document.createElement("button");
button.innerHTML = "😼";

let counter: number = 0;
const newDiv = document.createElement("div");
const gr = document.createElement("div");

button.addEventListener("click", () => {
  counter += 1;
  newDiv.innerHTML = `${Math.round(counter)} cat smirks 😼`;
  updateShopButtons();
});

newDiv.innerHTML = `${counter} cat smirks 😼`;

let previousTime: number = 0;
let flag = false;

let upgrades = new Array(availableItems.length).fill(0);

function updateCount() {
  const currentTime = performance.now();
  const increment = (currentTime - previousTime) / 1000;
  availableItems.forEach((item, index) => {
    counter += increment * upgrades[index] * item.rate;
  });
  const growthRate = availableItems.reduce(
    (total, item, index) => total + upgrades[index] * item.rate,
    0
  );
  gr.innerHTML = `Growth Rate: ${Math.round(growthRate * 10) / 10}`;
  newDiv.innerHTML = `${Math.round(counter)} cat smirks 😼`;
  previousTime = currentTime;
  updateShopButtons();
  requestAnimationFrame(updateCount);
}

function updateShopButtons() {
  availableItems.forEach((item, index) => {
    const shopButton = document.getElementById(`shopButton-${index}`) as HTMLButtonElement;
    shopButton.disabled = Math.round(counter) < item.cost;
  });
}

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(button);
app.append(gr);
app.append(newDiv);

// Create shop buttons using a loop
availableItems.forEach((item, index) => {
  const shopButton = document.createElement("button");
  shopButton.innerHTML = `${item.name}: ${item.cost}`;
  shopButton.id = `shopButton-${index}`;
  shopButton.disabled = true;

  shopButton.addEventListener("click", () => {
    if (!flag) {
      previousTime = performance.now();
      flag = true;
      requestAnimationFrame(updateCount);
    }
    counter -= item.cost;
    upgrades[index] += 1;
    newDiv.innerHTML = `${Math.round(counter)} cat smirks 😼`;
    const newDivForItem = document.getElementById(`upgradeDiv-${index}`);
    if (newDivForItem) {
      newDivForItem.innerHTML = `Number of ${item.name}: ${upgrades[index]}`;
    }
    item.cost = Math.round(item.cost * 1.15 * 1000) / 1000;
    shopButton.innerHTML = `${item.name}: ${item.cost}`;
  });

  const upgradeDiv = document.createElement("div");
  upgradeDiv.id = `upgradeDiv-${index}`;
  upgradeDiv.innerHTML = `Number of ${item.name}: ${upgrades[index]}`;
  app.append(shopButton);
  app.append(upgradeDiv);
});