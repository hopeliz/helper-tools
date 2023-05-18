function checkForSymbols(textToCheck, includeChars) { 
    let resultText = textToCheck;

    //Check for spaces
    if (textToCheck.includes("%20")) {
        resultText = textToCheck.replace(/%20/g," ");
    }

    //Check for mdash
    if (textToCheck.includes("%E2%80%93")) {
        if (includeChars) {
            resultText = textToCheck.replace(/%E2%80%93/g,"&mdash;");
        }
        else {
            resultText = textToCheck.replace(/%E2%80%93/g,"");
        }
    }

    //Check for doublequotes
    if (textToCheck.includes("%22")) {
        if (includeChars) {
            resultText = textToCheck.replace(/%22/g,"&quot;");
        }
        else {
            resultText = textToCheck.replace(/%22/g,"");
        }
    }

    //Check for left double quotes
    if (textToCheck.includes("%E2%80%9C")) {
        if (includeChars) {
            resultText = textToCheck.replace(/%E2%80%9C/g,"&quot;");
        }
        else {
            resultText = textToCheck.replace(/%E2%80%9C/g,"");
        }
    }

    //Check for right double quotes
    if (textToCheck.includes("%e2%80%9d")) {
        if (includeChars) {
            resultText = textToCheck.replace(/%e2%80%9d/g,"&quot;");
        }
        else {
            resultText = textToCheck.replace(/%e2%80%9d/g,"");
        }
    }

    //Check for tick
    if (textToCheck.includes("%E2%80%99")) {
        if (includeChars) {
            resultText = textToCheck.replace(/%E2%80%99/g,"&apos;");
        }
        else {
            resultText = textToCheck.replace(/%E2%80%99/g,"");
        }
    }

    //Check for copyright symbol
    if (textToCheck.includes("%C2%A9")) {
        if (includeChars) {
            resultText = textToCheck.replace(/%C2%A9/g,"&copy;");
        }
        else {
            resultText = textToCheck.replace(/%C2%A9/g,"");
        }
    }

    //Check for greater than
    if (textToCheck.includes("%3E")) {
        if (includeChars) {
            resultText = textToCheck.replace(/%3E/g,"&gt;");
        }
        else {
            resultText = textToCheck.replace(/%3E/g,"");
        }
    }

    //Check for lesser than
    if (textToCheck.includes("%3C")) {
        if (includeChars) {
            resultText = textToCheck.replace(/%3C/g,"&lt;");
        }
        else {
            resultText = textToCheck.replace(/%3C/g,"");
        }
    }

    //Check for forward slash
    if (textToCheck.includes("%2F")) {
        if (includeChars) {
            resultText = textToCheck.replace(/%2F/g,"/");
        }
        else {
            resultText = textToCheck.replace(/%2F/g," ");
        }
    }

    return resultText;
}