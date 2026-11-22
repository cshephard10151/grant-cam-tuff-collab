

let input = document.getElementById("input");
let button = document.getElementById("button");

for (let i = 1; i<17; i++){
    let p_i = int;
}


let top = ["[A] [B] [C] [D]"];
let r1 =  [`1 [${p1}] [${p2}] [${p2}] [${p4}]`];
let r2 =  [`2 [${p5}] [${p6}] [${p7}] [${p8}]`];
let r3 =  [`3 [${p9}] [${p10}] [${p11}] [${p12}]`];
let r4 =  [`4 [${p13}] [${p14}] [${p15}] [${p16}]`];

let last_input = "";
var iscommand = false;

input.addEventListener("keydown", function(e){
    if (e.key === "Enter"){
        e.preventDefault();
        button.click();
    }
    if (e.key === "ArrowUp"){
        console.log(last_input);
        input.value = last_input;
        
    }
});


input.focus();

for(let i =1; i<10; i++){
    document.getElementById(i).textContent = "\u00A0";
}
document.getElementById(8).textContent = "Welcome!";
document.getElementById(7).textContent = 'run "help" for command help.';
document.getElementById(6).textContent = 'Begin? Y/N';



button.onclick = function(){
    last_input = input.value;

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
        iscommand = true;
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
    

    if (iscommand === false){
        for (let i =9; i>1; i--){
            document.getElementById(i).textContent = document.getElementById(i-1).textContent;
        }
        document.getElementById(1).textContent = input.value;
    }
    input.value = "";

    iscommand = false;


}
