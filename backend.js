const PI = 3.14159;
const GRAVITY = 9.81;

// Properly declare your elements
const button = document.getElementById("button1");
// const textElement = document.getElementById("text");
// const style_button_1 = document.getElementById("style_button_1")
// const style_button_2 = document.getElementById("style_button_2")
// const style_button_3 = document.getElementById("style_button_3")
const link = document.createElement('link');

let input_field = document.getElementById("bg color");
let input1_field = document.getElementById("bg1 color");
let input2_field = document.getElementById("bg2 color");
let answer_button = document.getElementById("answer button");


function change_bg_color(redVal, greenVal, blueVal) {
    document.documentElement.style.setProperty('--bg-color-red', redVal);
    document.documentElement.style.setProperty('--bg-color-green', greenVal);
    document.documentElement.style.setProperty('--bg-color-blue', blueVal);
}

answer_button.onclick = function(){
    response = input_field.value;
    response1 = input1_field.value;
    response2 = input2_field.value;
    change_bg_color(response, response1, response2);
};

// style_button_1.onclick = function() {
//     change_bg_color(28, 34, 27);
// };

// style_button_2.onclick = function() {
//     change_bg_color(11, 114, 143);
// };

// style_button_3.onclick = function() {
//     change_bg_color(217, 113, 179);
// };

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
}
