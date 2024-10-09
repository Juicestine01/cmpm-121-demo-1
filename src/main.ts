import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Justin Xu's Game";
document.title = gameName;

const button = document.createElement("button");
button.innerHTML = "😼";

let counter: number = 0; // Lines 11-16 increment counter each button click
const newDiv = document.createElement("div");
const newDiv2 = document.createElement("div")
button.addEventListener("click", () => {
    shopButton.disabled = counter < 9
    counter += 1;
    newDiv.innerHTML = `${Math.round(counter)} smirks 😼`;
});

newDiv.innerHTML = `${counter} smirks 😼`; //Initialize first buttion

let previousTime: number = 0 // Initialize the time at the start

function updateCount() {
  const currentTime = performance.now(); // Time after program
  const increment = (currentTime - previousTime) / 1000; // diff in time
  counter += increment * upgrades; // increase counter divide by 1k to get seconds
  newDiv.innerHTML = `${Math.round(counter)} smirks 😼`; // increment counter
  previousTime = currentTime; // for next frame so u can get difference between 2 frames
  shopButton.disabled = counter < 10
  requestAnimationFrame(updateCount);
}

let upgrades: number = 0;

const shopButton = document.createElement("button");
shopButton.innerHTML = "Upgrades 😼" 
shopButton.disabled = true
shopButton.addEventListener("click", () => {
    if (upgrades >= 0) {
        console.log(performance.now())
        previousTime = performance.now()
        requestAnimationFrame(updateCount);
    }
    counter -= 10
    upgrades += 1
    newDiv.innerHTML = `${Math.round(counter)} smirks 😼`;
    newDiv2.innerHTML = `${upgrades} upgrades 😼`;
})

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(button);
app.append(shopButton);
app.append(newDiv);
app.append(newDiv2)
