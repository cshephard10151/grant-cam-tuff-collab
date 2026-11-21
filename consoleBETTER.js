

let input = document.getElementById("input");
let button = document.getElementById("button");

let last_input;

input.addEventListener("keydown", function(e){
    if (e.key === "Enter"){
        e.preventDefault();
        button.click();
        input.value = "";
    }
    // if (e.key === "ArrowUp"){
    //     last_input = input
    // } WIP
});


input.focus();

for(let i =1; i<10; i++){
    document.getElementById(i).textContent = "\u00A0";
}
document.getElementById(8).textContent = "Welcome!";
document.getElementById(7).textContent = 'run "help" for command help.';
document.getElementById(6).textContent = 'Begin? Y/N';

button.onclick = function(){
    const pattern = /^\([^,]+,\s*[^,]+,\s*[^,]+\)$/;

    function isNumeric(val) { 
        return !isNaN(parseFloat(val)) && isFinite(val);}

    if (pattern.test(input.value)){
        let[red, green, blue] = input.value.replace(/[()]/g, '').split(',').map(item => item.trim());
        console.log(red, green, blue);
        if(isNumeric(red) && isNumeric(green) && isNumeric(blue)){
            change_bg_color(red, green, blue);}
    }


    if (input.value === ""){  
        return;
        }
    
    if (input.value === "help"){
        document.getElementById(9).textContent = "\u00A0";
        document.getElementById(8).textContent = "help"
        document.getElementById(7).textContent = "------------------------------------";
        document.getElementById(6).textContent = "\u00A0";
        document.getElementById(5).textContent = "To change background color, run '(color1, color2, color3).'";
        document.getElementById(4).textContent = "To begin, press Y.";
        document.getElementById(3).textContent = "For a list of commands, run cmds";
        document.getElementById(2).textContent = "\u00A0";
        document.getElementById(1).textContent = "Begin? Y/N";
    }
    


    for (let i =9; i>1; i--){
        document.getElementById(i).textContent = document.getElementById(i-1).textContent;
    }
    document.getElementById(1).textContent = input.value;
    input.value = "";


}
