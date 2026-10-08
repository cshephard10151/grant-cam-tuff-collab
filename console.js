let input = document.getElementById("input");
let button = document.getElementById("button");


input.addEventListener("keydown", function(e){
    if (e.key === "Enter"){
        e.preventDefault();
        button.click();
    }
})

input.focus();

let text_line_group = document.querySelectorAll(".text_line"); //make sure to fix rest of code

button.onclick = function(){

    function isNumeric(val) { 
        return !isNaN(parseFloat(val)) && isFinite(val);
    }


    if (input.value != ''){
        for (let i = 9; i > 1; i--){
            document.getElementById(i).textContent = document.getElementById(i-1).textContent;
            
            if (document.getElementById(i).textContent === ''){
                document.getElementById(i).textContent = "\u00A0";
            }
        }

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



        document.getElementById(1).textContent = `${hours}:${minutes}:${seconds}`+"> " + input.value;

        if (text_line_group[0].textContent === ''){
            text_line_group[0].textContent = "\u00A0";
        }


        if (input.value == "help"){
            text_line_group[4].textContent = `${hours}:${minutes}:${seconds}`+"> help";
            text_line_group[5].textContent = "------------------------------------";
            text_line_group[6].textContent = '"settings" for settings';
            text_line_group[7].textContent ='"help" for help';
            text_line_group[8].textContent = '"clear" for clearing message history.'
        }
        if (input.value == "settings"){
            text_line_group[6].textContent = `${hours}:${minutes}:${seconds}`+"> settings";
            text_line_group[7].textContent = "------------------------------------";
            text_line_group[8].textContent = "(R, G, B) to change background color";
        }

        if (input.value == "Y"){
            text_line_group[0].textContent = `${hours}:${minutes}:${seconds}`+"> Y";
            text_line_group[1].textContent = "------------------------------------";
            for (let i = 2; i<10; i++){
                text_line_group[i].textContent = "\u00A0";
            }
            input.value = "";
        }

        if (input.value == "default"){
            change_bg_color(28, 34, 27);
        }

        if (input.value == "clear"){
            set_blank_lines();
        }

        input.value = "";

    }
};

function set_blank_lines() {
    for (let i = 0; i < text_line_group.length; i++) {
        text_line_group[i].textContent = "\u00A0";
    }
}