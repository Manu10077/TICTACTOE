let boxes = document.querySelectorAll(".box"); // Select all boxes
let resetb = document.querySelector("#reset");
let newb = document.querySelector("#newb");
let msgcon = document.querySelector(".msg-cont");
let msg = document.querySelector("#msg");
let turnO = true; // True means 'O', False means 'X'

const winpat = [
    [0,1,2], [0,3,6], [1,4,7], [2,5,8], 
    [3,4,5], [6,7,8], [0,4,8], [2,4,6]
];

// Reset game
const resetgame = () => {
    turnO = true;
    enablebox();
    msgcon.classList.add("hide");
};

// Add click event to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("button was clicked");

        // Prevent overwriting
        if (box.innerText !== "") {
            return;
        }

        // Set 'O' or 'X'
        box.innerText = turnO ? "O" : "X";
        turnO = !turnO;

        // Check for win
        checkwin();
    });
});

// Disable all boxes after winning
const disablebox = () => {
    boxes.forEach(box => {
        box.style.pointerEvents = "none"; // Disables clicking
    });
};

// Enable all boxes for a new game
const enablebox = () => {
    boxes.forEach(box => {
        box.innerText = ""; // Clear text
        box.style.pointerEvents = "auto"; // Enable clicking
    });
};

// Show winner message
const showwin = (winner) => {
    msg.innerText = `Congratulations, ${winner} Wins!`;
    msgcon.classList.remove("hide");
    disablebox();
};

// Check if there's a winner
const checkwin = () => {
    for (let pattern of winpat) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            console.log("Winner:", pos1);
            showwin(pos1);
            return; // Stop further checking
        }
    }
};

// Event listeners for reset and new game
newb.addEventListener("click", resetgame);
resetb.addEventListener("click", resetgame);
