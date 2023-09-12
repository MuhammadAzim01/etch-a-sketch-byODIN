let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


let rangeValue = document.getElementById("slider-value");
let range = document.getElementById("box-range");
let block = document.querySelector(".grid");
let eraseBtn = document.getElementById("erase");
let clearBtn = document.getElementById("clear");
let colorBtn = document.getElementById("color");
let colorID = document.querySelector(".color-box");

let currentColor = '#000000';;


function createDiv(width, height) {
    let div = document.createElement("div");
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.className = "grid-element";

    return div;
}

function clearGrid() {
    block.innerHTML= " ";
    createGrid();
    focusButton("clear");
}

function createGrid() {
    const inputValue = range.value;  
    const WIDTH = block.getBoundingClientRect().width;
    const HEIGHT = block.getBoundingClientRect().height;

    let box_width = parseFloat(WIDTH / inputValue).toFixed(4);
    let box_height = parseFloat(HEIGHT / inputValue).toFixed(4);

    for (let i = 0; i < (inputValue * inputValue); i++) {
        block.appendChild(createDiv(box_width, box_height));
    }

    rangeValue.textContent = inputValue + " * " + inputValue;
}



range.addEventListener("change", clearGrid);
clearBtn.addEventListener("click", clearGrid);
eraseBtn.addEventListener("click", changeColor);
colorBtn.addEventListener("click", changeColor);
colorID.addEventListener("change", changeColor);


function changeColor(e) {
    if (e.target.id == "erase") {
        currentColor = "transparent";
    } else {
        currentColor = colorID.value;
    }
    
    triggerEvents();
    
    focusButton(e.target.id);
}

function triggerEvents() {
    let gridElements = document.querySelectorAll(".grid-element");
    gridElements.forEach(element => {   
        element.addEventListener('mousedown', ()=>{
            element.style.backgroundColor = currentColor;
        }); 
        element.addEventListener('mouseover', ()=>{
            if(mouseDown) {
                element.style.backgroundColor = currentColor;
            }
        }); 
    });
}

function focusButton(button) {
    switch(button) {
        case "clear":
            clearBtn.classList.add('active');
            eraseBtn.classList.remove('active');
            colorBtn.classList.remove('active');
            break;
        case "erase":
            eraseBtn.classList.add('active');
            clearBtn.classList.remove('active');
            colorBtn.classList.remove('active');
            break;
        case "color":
            colorBtn.classList.add('active');
            clearBtn.classList.remove('active');
            eraseBtn.classList.remove('active');
            break;
        default:
            console.log("default called");
            break;
    }
}

window.onload = ()=> {   
    createGrid();
    triggerEvents();
};