const inputColor = document.getElementById("inputColor")
const basicColor = document.getElementById('basicColor')
const range = document.getElementById("range")
const textRangeValue = document.getElementById("rangePerValue")
const altColor = document.getElementById("altColor")
const checkBox = document.querySelector("input[type='checkbox']");


let newColorGlobal;



const validHexRegex = /^#[0-9a-fA-F]{6}$/; // Move this outside the event listener

inputColor.addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
        let inputText = e.target.value.trim();
        
        if (validHexRegex.test(inputText)) {
            let newColor = newShade(inputColor.value, range.value);
            
    
            changeBackground(inputColor.value, basicColor);
            newColorGlobal = newColor;
        }
    }
});
range.oninput = displayPercentage;
function displayPercentage(){
    let newColor;
    if (checkBox.checked){
        newColor = newShade(inputColor.value, -range.value)
        console.log(newColor)
    }else{
        newColor = newShade(inputColor.value, range.value)
    }
    
    textRangeValue.innerText = `${range.value}%`
    
    changeBackground(newColor, altColor)
    
}

displayPercentage()


function changeBackground(color, div){
    div.style.background = color;
    
}

// checkBox.addEventListener("change", function(){
//     changeBackground()
// })


function newShade(hexColor, magnitude) {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        const scaledMagnitude = Math.round((magnitude / 100) * 255);
        let r = (decimalColor >> 16) + scaledMagnitude;
        r = Math.max(0, Math.min(255, r)); // Limit r to be within 0 to 255
        let g = (decimalColor >> 8 & 0xff) + scaledMagnitude;
        g = Math.max(0, Math.min(255, g)); // Limit g to be within 0 to 255
        let b = (decimalColor & 0xff) + scaledMagnitude;
        b = Math.max(0, Math.min(255, b)); // Limit b to be within 0 to 255

        // Function to pad a component with leading zeros
        const padComponent = (component) => {
            const hex = component.toString(16);
            return hex.length === 1 ? `0${hex}` : hex;
        };

        // Create the final hexadecimal color string with padded components
        return `#${padComponent(r)}${padComponent(g)}${padComponent(b)}`;
    } else {
        return hexColor;
    }
}

