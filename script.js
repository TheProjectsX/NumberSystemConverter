// Const Variables
const decFrom = document.getElementById("decFrom");
const decTo = document.getElementById("decTo");

const autoUpdate = document.getElementById("autoUpdate");
const convert = document.getElementById("convert");

const encTextBox = document.getElementById("encTextBox");
const decTextBox = document.getElementById("decTextBox");

const root = document.documentElement;

// Change link color every 0.1 second
let hua = Math.floor(Math.random() * 358);
function changeColor(){
    setInterval(() => {
        root.style.setProperty("--hua", hua + "deg");

        hua += 3;
        if (hua > 358){
            hua = 0;
        }
    }, 100);
}

/*
Fucntions to Convert

1. Binary to Decimal
2. Binary to Hex
3. Binary to Octal

4. Decimal to Binary
5. Decimal to Hex
6. Decimal to Octal

7. Hex to Binary
8. Hex to Decimal
9. Hex to Octal

10. Octal to Binary
11. Octal to Decimal
12. Octal to Hex

(And lastly. In case of Funny Users! Though we will not Make any functions for that!)
1. Binary to Binary
2. Decimal to Decimal
3. Hex to Hex
4. Octal to Octal
*/

// Check if input is Binary
function isBinary(value) {
    for (let i = 0; i < value.length; i++) {
        if (!((value[i] === "1") || (value[i] === "0"))) {
            return false;
        }
    }

    return true;
}

// Binary to Decimal
function binaryToDecimal(binary) {
    if (!(isBinary(binary))) {
        return "";
    }

    let decimal = 0n;
    let power = 0;
    for (let i = binary.length - 1; i >= 0; i--) {
        if (binary[i] === "1") {
            decimal += BigInt(Math.pow(2, power));
        }
        power++;
    }
    return decimal;
}

// Binary to Hex
function binaryToHex(binary) {
    if (!(isBinary(binary))) {
        return "";
    }

    let hex = '';
    let binaryLength = binary.length;
    if (binaryLength % 4 !== 0) {
        // Pad the binary number with zeros to make it a multiple of 4
        while (binaryLength % 4 !== 0) {
            binary = '0' + binary;
            binaryLength++;
        }
    }
    for (let i = 0; i < binaryLength; i += 4) {
        let nibble = binary.substr(i, 4);
        let decimal = parseInt(nibble, 2);
        let hexDigit = decimal.toString(16);
        hex += hexDigit;
    }
    return hex;
}

// Binary to Octal
function binaryToOctal(binary) {
    if (!(isBinary(binary))) {
        return "";
    }

    let octal = '';
    let binaryLength = binary.length;
    if (binaryLength % 3 !== 0) {
        // Pad the binary number with zeros to make it a multiple of 3
        while (binaryLength % 3 !== 0) {
            binary = '0' + binary;
            binaryLength++;
        }
    }
    for (let i = 0; i < binaryLength; i += 3) {
        let triplet = binary.substr(i, 3);
        let decimal = parseInt(triplet, 2);
        let octalDigit = decimal.toString(8);
        octal += octalDigit;
    }
    return octal;
}

// Decimal to Binary
function decimalToBinary(decimal) {
    let binary = '';
    while (decimal > 0) {
        binary = (decimal % 2) + binary;
        decimal = Math.floor(decimal / 2);
    }
    return binary;
}

// Decimal to Hex
function decimalToHex(decimal) {
    let hex = '';
    while (decimal > 0) {
        let remainder = decimal % 16;
        if (remainder < 10) {
            hex = remainder + hex;
        } else {
            hex = String.fromCharCode(remainder + 55) + hex;
        }
        decimal = Math.floor(decimal / 16);
    }
    return hex;
}

// Decimal to Octal
function decimalToOctal(decimal) {
    let octal = '';
    while (decimal > 0) {
        let remainder = decimal % 8;
        octal = remainder + octal;
        decimal = Math.floor(decimal / 8);
    }
    return octal;
}

// Hex to Binary
function hexToBinary(hex) {
    let binary = '';
    for (let i = 0; i < hex.length; i++) {
        let decimal = parseInt(hex[i], 16);
        let binaryDigit = decimal.toString(2);
        while (binaryDigit.length < 4) {
            binaryDigit = '0' + binaryDigit;
        }
        binary += binaryDigit;
    }
    return binary;
}

// Hex to Decimal
function hexToDecimal(hex) {
    let decimal = 0n;
    for (let i = 0; i < hex.length; i++) {
        let digit = hex[i];
        let value = BigInt(parseInt(digit, 16));
        decimal = decimal * 16n + value;
    }
    return decimal;
}

// Hex to Octal
function hexToOctal(hex) {
    let decimal = hexToDecimal(hex);
    let octal = decimalToOctal(decimal);
    return octal;
}

// Octal to Binary
function octalToBinary(octal) {
    let binary = '';
    for (let i = 0; i < octal.length; i++) {
        let decimal = parseInt(octal[i], 8);
        let binaryDigit = decimal.toString(2);
        while (binaryDigit.length < 3) {
            binaryDigit = '0' + binaryDigit;
        }
        binary += binaryDigit;
    }
    return binary;
}

// Octal to Decimal
function octalToDecimal(octal) {
    let decimal = 0n;
    for (let i = 0; i < octal.length; i++) {
        let digit = octal[i];
        let value = BigInt(parseInt(digit, 8));
        decimal = decimal * 8n + value;
    }
    return decimal;
}

// Octal to Hex
function octalToHex(octal) {
    let decimal = octalToDecimal(octal);
    let hex = decimalToHex(decimal);
    return hex
}

// Converting Fucntion
function convertValues(reverse) {
    let encValue;
    let decEncFrom;
    let decEncTo;
    if (reverse === true) {
        encValue = decTextBox.value;
        decEncFrom = decTo.value;
        decEncTo = decFrom.value;
    } else {
        encValue = encTextBox.value;
        decEncFrom = decFrom.value;
        decEncTo = decTo.value;
    }

    if ((decEncFrom == decEncTo) || (encValue == "")) {
        encTextBox.value = encValue;
        decTextBox.value = encValue;
        return;
    }
    // As our Function names are Meaningfull, why use so much if...else's when we can use the easy way!
    // As window contains every Function, so we can call any function via using it's name as Strin. Example: DecFrom.toLowerCase + "To" + DecTo : binaryToDecimal
    let functionToCall = `${decEncFrom.toLowerCase()}To${decEncTo}`
    let decValue = window[functionToCall](encValue);

    console.log(decValue)
    if (decValue == "") {
        return;
    }

    if (reverse === true) {
        encTextBox.value = decValue;
    } else {
        decTextBox.value = decValue;
    }
}


// User Event Listeners
// The main Convert Button
convert.addEventListener("click", convertValues);

// User editing Event Listeners
encTextBox.addEventListener("input", () => {
    if (autoUpdate.checked) {
        convertValues();
    }
});

decTextBox.addEventListener("input", () => {
    if (autoUpdate.checked) {
        convertValues(true);
    }
})


// Change title color
changeColor();
