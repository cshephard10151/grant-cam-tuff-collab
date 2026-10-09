let input = document.getElementById("input");
let button = document.getElementById("button");
let recognized_words = ["back", "settings", "help", "default", "Y", "N"];


input.addEventListener("keydown", function(e){
    if (e.key === "Enter"){
        e.preventDefault();
        button.click();
        input.value = "";
    }
});

input.focus();

let text_line_group = document.querySelectorAll(".text_line"); //make sure to fix rest of code
let current_user_line = 6;

text_line_group.forEach(line => {
    line.classList.add("green_text");
})

for (let i = 0; i <= 5; i++) { //homescreen
    text_line_group[i].textContent = "\u00A0";
}
text_line_group[6].textContent = 'Welcome!';
text_line_group[7].textContent = 'run "help" for command help.';
text_line_group[8].textContent = 'Begin? Y/N';
current_user_line = 5;

button.onclick = function(){
    
    if (input.value === "clear") {
        clear_lines(true);
    }

    function isNumeric(val) { 
        return !isNaN(parseFloat(val)) && isFinite(val);
    }

    function clear_lines(clearLastInput) {
        for (let i = 0; i < current_user_line; i++) {
            text_line_group[i].textContent = "\u00A0";
        }
        if (clearLastInput) text_line_group[8].textContent = "\u00A0";
        input.value = "";
        return;
    }


    if (input.value != '' && recognized_words.includes(input.value)) {
        text_line_group[4].classList.remove("red_text");
        text_line_group[4].classList.add("green_text");

        const pattern = /^\([^,]+,\s*[^,]+,\s*[^,]+\)$/;

        if (pattern.test(input.value)){

            let[red, green, blue] = input.value.replace(/[()]/g, '').split(',').map(item => item.trim());

            console.log(red, green, blue);

            if(isNumeric(red) && isNumeric(green) && isNumeric(blue)){
                change_bg_color(red, green, blue);
            }
        }

        const now = new Date();

        let hours = now.getHours();
        if (hours <10){
            hours = "0"+hours
        }
        let minutes = now.getMinutes();
        if (minutes <10){
            minutes = "0"+minutes
        }
        let seconds = now.getSeconds();
        if (seconds <10){
            seconds = "0"+seconds
        }

        function get_time_line() {
            return `${hours}:${minutes}:${seconds}` + " -> " + input.value;
        }

        function get_line() {
            return "------------------------------------";
        }

        function home_screen() {
            for (let i = 0; i <= 5; i++) {
                text_line_group[i].textContent = "\u00A0";
            }
            text_line_group[6].textContent = 'Welcome!';
            text_line_group[7].textContent = 'run "help" for command help.';
            text_line_group[8].textContent = 'Begin? Y/N';
            current_user_line = 5;
            return;
        }

        function help_screen() {
            text_line_group[4].textContent = get_time_line();
            text_line_group[5].textContent = get_line();
            text_line_group[6].textContent = '"back" to return';
            text_line_group[7].textContent = '"settings" for settings';
            text_line_group[8].textContent = '"clear" to clear messages.'
            current_user_line = 4;
        }

        function settings_screen() {
            text_line_group[6].textContent = get_time_line();
            text_line_group[7].textContent = get_line();
            text_line_group[8].textContent = "(R, G, B) to change background color";
            current_user_line = 6;
        }

        if (text_line_group[0].textContent === ''){
            text_line_group[0].textContent = "\u00A0";
        }


        if (input.value.toLowerCase() == "help"){
            help_screen();
        }
        if (input.value.toLowerCase() == "settings"){
            settings_screen();
        }
        if (input.value.toLowerCase() == "back") {
            home_screen();
        }

        if (input.value == "Y"){
            text_line_group[0].textContent = get_time_line();
            text_line_group[1].textContent = get_line();
            for (let i = 2; i<10; i++){
                text_line_group[i].textContent = "\u00A0";
            }
            //input.value = "";
        }

        if (input.value == "default"){
            change_bg_color(28, 34, 27);
        }


        for (let i = 9; i > 1; i--) {
            document.getElementById(i).textContent = document.getElementById(i - 1).textContent || "\u00A0";
        }

        document.getElementById(1).textContent = get_time_line();
        
        clear_line(false);
    } else {
        text_line_group[4].classList.remove("green_text");
        text_line_group[4].classList.add("red_text");
        text_line_group[4].textContent = "Not a recognized word! Try again";
    }
    input.value = "";
};