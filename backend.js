const PI = 3.14159;
const GRAVITY = 9.81;

// Properly declare your elements
const button = document.getElementById("button1");
const textElement = document.getElementById("text");

// Initialize animation variables outside of the loop
let time = 0; 
let animationId = null;

button.onclick = function() {
    console.log("test");
    
    // 1. Correctly update the DOM text content on the screen
    if (textElement.textContent === "Hello JavaScript") {
        textElement.textContent = "Goodbye JavaScript";
    } else {
        textElement.textContent = "Hello JavaScript";
    }
    
    // Make sure the button is set up for absolute moving
    button.style.position = "absolute";

    // 2. Prevent stacking duplicate loops if clicked multiple times
    if (animationId) clearInterval(animationId);

    // 3. Use setInterval instead of while(true) + setTimeout
    animationId = setInterval(() => {
        // Calculate a visible wave movement (e.g., amplitude of 50px, centered at 100px)
        const newTop = 75 + Math.sin(time) * 50;
        const newRight = screen.width - 200 + Math.cos(time) * 50;
        
        // Apply the position with pixels unit ("px")
        button.style.top = newTop + "px";
        button.style.right = newRight +"px";
        
        // Increment time smoothly
        time += 0.1; 
    }, 16); // ~60 frames per second
};
