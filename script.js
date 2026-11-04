const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// Button click event
buttons.forEach((button)=>{
    button.addEventListener("click", ()=>{
        const value = button.dataset.value;
        const action = button.dataset.action;

        // Clear Screen
        if(action === "clear"){
            display.value = "";
        }

        // Delete Last Character
        else if (action === "delete"){
            display.value = display.value.slice(0, -1);
    }

    // Calculate Result
    else if (action === "calculate"){
        calculateResult();
    }

    // Add Value to Display
      else if (value !== undefined){
        display.value += value;
    }
    });
});


// Calculate Function
function calculateResult(){
    const expression = display.value;

    // Empty Display Check
    if(expression === ""){
        return;
    }
    try{
        // Allow only calculator characters
        if(!/^[0-9+\-*/%.() ]+$/.test(expression)){
            throw new Error("Invalid Expression");
        }

        // Calculate Result
        const result = Function(
            '"use strict"; return('
            + expression + ')'
        )();

        // Check Invalid Result
        if(!Number.isFinite(result)){
            throw new Error("Invalid Result");
        }
        // Show Result
        display.value = result;
    } catch (error){
        display.value = "Error";
    
    }
}


// Keyboard Support
document.addEventListener("keydown",(event)=>{
    const key = event.key;
    
    // Numbers and operators
    if(/^[0-9+\-*/%.()]$/.test(key)){
        display.value += key;
    }

    // Enter = Calculate
    else if (key==="Enter"){
        calculateResult();
    }

    // Backspace =Delete
    else if (key === "Backspace"){
        display.value = display.value.slice(0,-1);
    }

    // Escape = Clear
    else if (key === "Escape"){
        display.value = "";
    }
});
