const buttons = document.querySelectorAll('button');
const topDisplay = document.getElementById('topDisplay');
const botDisplay = document.getElementById('botDisplay');

let topValue = "";
let botValue = "";
let held = "O";

document.addEventListener("keydown", pressKey);
buttons.forEach(item => {
    item.onclick = () => pressButton(item.id);
});

function pressKey(key) {
    console.log(key.key);
    if (key.key === "Backspace") {
        pressButton("back");
    } else if (key.key === ".") {
        pressButton("decimal");
    } else if (key.key === "Escape") {
        pressButton("ce");
    } else if (key.key === "+") {
        pressButton("plus");    
    } else if (key.key === "-") {
        pressButton("minus");
    } else if (key.key === "*") {
        pressButton("multiply");
    } else if (key.key === "/") {
        pressButton("divide");
    } else if (key.key === "=" || key.key === "Enter") {
        pressButton("equal");
    } else if (!isNaN(key.key)) {
        pressButton("a" + key.key);
    }
}
function pressButton(butt) {
    if (butt.charAt(0) === "a") {
        botValue += butt.charAt(1);
    } else if (butt === "back") {
        botValue = botValue.slice(0, botValue.length - 1);     
    } else if (butt === "ce") {
        botValue = "";
        topValue = "";
        held = "O";
        buttons.forEach(item => {
            item.onclick = () => pressButton(item.id);
        });
    } else if (butt === "c") {
        botValue = "";
    } else if (butt === "plusMinus") {
        if (botValue !== "") {
            -Math.abs(botValue);
            (botValue.charAt(0) === "-") ? botValue = botValue.slice(1, botValue.length) : botValue = "-" + botValue; 
        }
    } else if (butt === "plus") {
        operate(botValue, "+");
        front("+");
    } else if (butt === "minus") {
        operate(botValue, "-");
        front("-");
    } else if (butt === "multiply") {
        operate(botValue, "*");
        front("*");
    } else if (butt === "divide") {
        operate(botValue, "/");
        front("/");
    } else if (butt === "equal") {
        if (botValue === "") {
            return;
        }
        operate(botValue, topValue.charAt(topValue.length - 1));
        front(topValue.charAt(topValue.length - 1));
        topValue = topValue.slice(0, topValue.length - 1);
    } else if (butt === "decimal") {
        if (!findDecimal(botValue) && findDecimal(botValue) !== 0) { //botValue.indexOf(".") would work here 
            botValue += ".";
        }
    }
    refresh();
}
function operate(num, op) {
    held = Number(held);
    if (topValue.charAt(topValue.length - 1) === "+") {
        held = (isNaN(held)) ? Number(num) : held + Number(num);
        return;
    } else if (topValue.charAt(topValue.length - 1) === "-") {
        held = (isNaN(held)) ? Number(num) : held - Number(num);
        return;
    } else if (topValue.charAt(topValue.length - 1) === "*") {
        if (num !== "") {
            held = (isNaN(held)) ? Number(num) : held * Number(num);
        }
        return;
    } else if (topValue.charAt(topValue.length - 1) === "/") {
        if (num === 0 || num === "0") {
            botValue = "Hey, guy.. what're you doing?";
            topValue = "";
        } else if (num !== "") {
            held = (isNaN(held)) ? Number(num) : held / Number(num);
        }
        return;
    }
    if (op === "+") {
        held = (isNaN(held)) ? Number(num) : held + Number(num);
    } else if (op === "-") {
        held = (isNaN(held)) ? Number(num) : held - Number(num);
    } else if (op === "*") {
        if (num !== "") {
            held = (isNaN(held)) ? Number(num) : held * Number(num);
        } else if (isNaN(held)) {
            held = 0;
        }
    } else if (op === "/") {
        if (num === 0 || num === "0") {
            botValue = "Hey, guy.. what're you doing?";
            topValue = "";
        } else if (num !== "") {
            held = (isNaN(held)) ? Number(num) : held / Number(num);
        } else if (isNaN(held)) {
            held = 0;
        }
    }
}
function front(op) {
    held = String(held).slice(0, findDecimal(String(held)) + 5); 
    //doesn't round, just cuts the end off.. could round to 4th decimal then check for numbers after decimal, cutting zeros and unneeded decimals
    if (!isNaN(botValue)) {
        if (isNaN(Number(topValue.charAt(0)))) {
            topValue = "";
        }
        topValue = held + " " + op;
        botValue = (isNaN(botValue)) ? botValue : "";
    } else {
        topValue = topValue.slice(0, topValue.length - 1);
        topValue = topValue + op;
    }
    if (isNaN(botValue)) {
        buttons.forEach(item => {
            item.onclick = () => pressButton('ce');
        });   
    }
}
function refresh () {
    botDisplay.textContent = botValue;
    topDisplay.textContent = topValue;
}
function findDecimal(num) { //indexOf() is a thing..
    for (let i = 0; i <= num.length; i++) {
        if (num.charAt(i) == ".") {
            return i;    
        }
    }
    return false;
}