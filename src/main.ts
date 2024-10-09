import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Justin Xu's Game";
document.title = gameName;

const button = document.createElement("button");
button.innerHTML = "😼";

let counter: number = 0; // Lines 11-16 increment counter each button click
const newDiv = document.createElement("div");
button.addEventListener("click", () => {
  counter += 1;
  newDiv.innerHTML = `${counter} smirks 😼`; 
});

newDiv.innerHTML = `${counter} smirks 😼`; //Initialize first buttion 

let previousTime: number = performance.now() // Initialize the time at the start

function updateCount() {
    const currentTime = performance.now() // Time after program
    const increment = (currentTime - previousTime) / 1000 // diff in time
    counter += (increment) // increase counter divide by 1k to get seconds
    newDiv.innerHTML = `${Math.round(counter)} smirks 😼`; // increment counter
    previousTime = currentTime // for next frame so u can get difference between 2 frames
    requestAnimationFrame(updateCount)
}

requestAnimationFrame(updateCount);


const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(button);
app.append(newDiv);
