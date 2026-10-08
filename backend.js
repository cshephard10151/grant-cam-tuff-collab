// Properly declare your elements
//const button = document.getElementById("button1");
// const textElement = document.getElementById("text");
const style_button_1 = document.getElementById("style_button_1");
const style_button_2 = document.getElementById("style_button_2");
const style_button_3 = document.getElementById("style_button_3");
const link = document.createElement('link');


const color_menu_div = document.getElementById("color_menu"); //every element corresponding the color menu
color_menu_div.classList.toggle("hidden_element"); //keeps hidden initially
//toggle_group_class(color_menu_elements, "child")
const color_menu_toggle = document.getElementById("color_menu_button");

color_menu_toggle.onclick = function() {
    color_menu_div.classList.toggle("hidden_element");
    if (color_menu_div.classList.contains("hidden_element")) color_menu_toggle.textContent = "Open Background Color Menu";
    else color_menu_toggle.textContent = "Close Background Color Menu";
}

let input_field_1 = document.getElementById("bg color"); //user's custom rgb
let input_field_2 = document.getElementById("bg1 color");
let input_field_3 = document.getElementById("bg2 color");
let color_confirmation_button = document.getElementById("color_confirmation");
let custom_color_button = document.getElementById("custom_color_button");

let openrgb = false
hide_input_fields(true);
input_field_1.classList.add("red_border")
input_field_2.classList.add("green_border")
input_field_3.classList.add("blue_border")

function hide_input_fields(bool) { //true to hide elements false to show
    openrgb = !bool
    input_field_1.hidden = bool, input_field_2.hidden = bool, input_field_3.hidden = bool;
    color_confirmation_button.hidden = bool;
    if (bool) custom_color_button.textContent = "Custom Color";
    else custom_color_button.textContent = "Back";
}

custom_color_button.onclick = function() {
    if (!openrgb) {
        hide_input_fields(false);
    } else if (openrgb) {
        hide_input_fields(true);
    }
}

color_confirmation_button.onclick = function() {
    const i1 = input_field_1
    const i2 = input_field_2
    const i3 = input_field_3;
    if (!(i1.value == "" || i2.value == "" || i3.value == "")) {
        change_bg_color(input_field_1.value, input_field_2.value, input_field_3.value);
    }
    hide_input_fields(true);
}

function change_bg_color(redVal, greenVal, blueVal) {
    document.documentElement.style.setProperty('--bg-color-red', redVal);
    document.documentElement.style.setProperty('--bg-color-green', greenVal);
    document.documentElement.style.setProperty('--bg-color-blue', blueVal);
}

style_button_1.onclick = function() {
    change_bg_color(28, 34, 27);
};

style_button_2.onclick = function() {
    change_bg_color(11, 114, 143);
};

style_button_3.onclick = function() {
    change_bg_color(217, 113, 179);
};

function toggle_group_class(list, class_name) {
    list.forEach(element => {
        element.classList.toggle(class_name);
    });
}



//---------------------------------------------------------------------------------------------------------------------- NEW CONSOLE CODE

// let input = document.getElementById("input");
// let button = document.getElementById("button");

// input.addEventListener("keydown", function(e){
//     if (e.key === "Enter"){
//         e.preventDefault();
//         button.click();
//     }
// })

// input.focus();

// let text_line_group = document.querySelectorAll(".text_line"); //make sure to fix rest of code

// button.onclick = function(){

//     function isNumeric(val) { 
//         return !isNaN(parseFloat(val)) && isFinite(val);
//     }


//     if (input.value != ''){
//         for (let i = 9; i > 1; i--){
//             document.getElementById(i).textContent = document.getElementById(i-1).textContent;
            
//             if (document.getElementById(i).textContent === ''){
//                 document.getElementById(i).textContent = "\u00A0";
//             }
//         }

//         const pattern = /^\([^,]+,\s*[^,]+,\s*[^,]+\)$/;

//         if (pattern.test(input.value)){

//             let[red, green, blue] = input.value.replace(/[()]/g, '').split(',').map(item => item.trim());

//             console.log(red, green, blue);

//             if(isNumeric(red) && isNumeric(green) && isNumeric(blue)){
//                 change_bg_color(red, green, blue);
//             }
//         }

//         document.getElementById(1).textContent = "> " + input.value;

//         if (text_line_group[0].textContent === ''){
//             text_line_group[0].textContent = "\u00A0";
//         }

//         if (input.value == "help"){
//             text_line_group[4].textContent = "> help";
//             text_line_group[5].textContent = "------------------------------------";
//             text_line_group[6].textContent = '"settings" for settings';
//             text_line_group[7].textContent ='"help" for help';
//             text_line_group[8].textContent = '"clear" for clearing message history.'
//         }
//         if (input.value == "settings"){
//             text_line_group[6].textContent = "> settings";
//             text_line_group[7].textContent = "------------------------------------";
//             text_line_group[8].textContent = "(R, G, B) to change background color";
//         }

//         if (input.value == "Y"){
//             text_line_group[0].textContent = "> Y";
//             text_line_group[1].textContent = "------------------------------------";
//             for (let i = 2; i<10; i++){
//                 text_line_group[i].textContent = "\u00A0";
//             }
//         }

//         if (input.value == "default"){
//             change_bg_color(28, 34, 27);
//         }

//         if (input.value == "clear"){
//             set_blank_lines();
//         }

//         input.value = '';

//     }
// };

// function set_blank_lines() {
//     for (let i = 0; i < text_line_group.length; i++) {
//         text_line_group[i].textContent = "\u00A0";
//     }
// }

