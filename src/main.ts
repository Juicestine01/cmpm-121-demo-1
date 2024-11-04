import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Justin Xu's Game";
document.title = gameName;

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Cat Face 🐱",
    cost: 10,
    rate: 0.1,
    description: "You first begin to feed the cat",
  },
  {
    name: "Cat Smile 😸",
    cost: 100,
    rate: 2,
    description: "As you feed the cat more fish it's expression improves",
  },
  {
    name: "Cat Smirk😼",
    cost: 1000,
    rate: 50,
    description: "The cat begins to look at you funny",
  },
  {
    name: "Orange Cat 🐈",
    cost: 5000,
    rate: 100,
    description: "You notice that more cats are beginning to surround you",
  },
  {
    name: "Black Cat 🐈‍⬛",
    cost: 10000,
    rate: 250,
    description: "The mystical Black Cat appears",
  },
];

const button = document.createElement("button");
button.innerHTML = "🐟";

let counter: number = 0;
const counterDiv = document.createElement("div");
const growthRateDiv = document.createElement("div");

button.addEventListener("click", () => {
  counter += 1;
  counterDiv.innerHTML = `${Math.round(counter)} Fish 🐟`;
  updateShopButtons();
});

counterDiv.innerHTML = `${counter} Fishies 🐟`;

let previousTime: number = 0;
let flag = false;

const upgrades = new Array(availableItems.length).fill(0);


function calculateIncrementalCounterIncrease(increment: number) {
  availableItems.forEach((item, index) => {
    counter += increment * upgrades[index] * item.rate;
  });
}

function updateGrowthRateDisplay() {
  const growthRate = availableItems.reduce(
    (total, item, index) => total + upgrades[index] * item.rate,
    0
  );
  growthRateDiv.innerHTML = `Growth Rate: ${Math.round(growthRate * 10) / 10}`;
}

function refreshCounterDisplay() {
  counterDiv.innerHTML = `${Math.round(counter)} cat smirks 😼`;
}

function updateCount() {
  const currentTime = performance.now();
  const increment = (currentTime - previousTime) / 1000;

  calculateIncrementalCounterIncrease(increment);
  updateGrowthRateDisplay();
  refreshCounterDisplay();

  previousTime = currentTime;
  updateShopButtons();
  requestAnimationFrame(updateCount);
}


function updateShopButtons() {
  availableItems.forEach((item, index) => {
    const shopButton = document.getElementById(
      `shopButton-${index}`,
    ) as HTMLButtonElement;
    shopButton.disabled = Math.round(counter) < item.cost;
  });
}

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(button);
app.append(growthRateDiv);
app.append(counterDiv);

const growthRateMultiplier = 1.15

function createShopButton(item: Item, index: number): HTMLButtonElement {
  const shopButton = document.createElement("button");
  shopButton.innerHTML = `${item.name}: ${item.cost}`;
  shopButton.id = `shopButton-${index}`;
  shopButton.disabled = true;

  shopButton.addEventListener("click", () => handleShopButtonClick(item, index, shopButton));

  return shopButton;
}

function handleShopButtonClick(item: Item, index: number, shopButton: HTMLButtonElement) {
  if (!flag) {
    previousTime = performance.now();
    flag = true;
    requestAnimationFrame(updateCount);
  }
  counter -= item.cost;
  upgrades[index] += 1;
  counterDiv.innerHTML = `${Math.round(counter)} cat smirks 😼`;
  updateUpgradeDisplay(index);
  item.cost = Math.round(item.cost * growthRateMultiplier * 1000) / 1000;
  shopButton.innerHTML = `${item.name}: ${item.cost}`;
}

function updateUpgradeDisplay(index: number) {
  const counterDivForItem = document.getElementById(`upgradeDiv-${index}`);
  if (counterDivForItem) {
    counterDivForItem.innerHTML = `Number of ${availableItems[index].name}: ${upgrades[index]}`;
  }
}

function displayItemDetails(item: Item, index: number) {
  const descriptionDiv = document.createElement("div");
  descriptionDiv.innerHTML = `${item.description}`;
  descriptionDiv.style.fontStyle = "italic";

  const upgradeDiv = document.createElement("div");
  upgradeDiv.id = `upgradeDiv-${index}`;
  upgradeDiv.innerHTML = `Number of ${item.name}: ${upgrades[index]}`;

  app.append(descriptionDiv);
  app.append(upgradeDiv);
}

function initializeShopItems() {
  availableItems.forEach((item, index) => {
    const shopButton = createShopButton(item, index);
    app.append(shopButton);
    displayItemDetails(item, index);
  });
}

initializeShopItems();

