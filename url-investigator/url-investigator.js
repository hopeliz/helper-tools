function investigateURL() {

    let parsedURL = document.forms["url-form"].url.value.split("/");
    
    console.log(parsedURL);
    
    // Get pieces
    let domain = "";
    let subdomain = "";
    let alias = "";
    let fileType = "";
    let fileName = "";
    let title = "";

    // Check if URL starts with ww...
    if (parsedURL[2].split(".")[0][0] != "w" && parsedURL[2].split(".")[0][1] != "w" && parsedURL[2].length > 3) {
        domain = `${parsedURL[2].split(".")[0]}.${parsedURL[2].split(".")[1]}`;
    }
    else {
        domain = `${parsedURL[2].split(".")[1]}.${parsedURL[2].split(".")[2]}`;
        subdomain = parsedURL[2].split(".")[0];
    }

    // Removes empty last indicies
    while (parsedURL[parsedURL.length - 1] == "") {
        parsedURL.pop();
    }
    
    // Check for links to files
    
    let lastPiece = parsedURL[parsedURL.length - 1];
    
    console.log(lastPiece);
    
    if (!lastPiece.includes(".")) {
        alias = lastPiece;
    }
    else {
        let lastPieceParsed = lastPiece.split(".");
        
        // Get file type and file name
        if (lastPieceParsed[lastPieceParsed.length - 1].length <= 4) {
            fileType = lastPieceParsed[lastPieceParsed.length - 1];
            fileName = `${lastPieceParsed[lastPieceParsed.length - 2]}.${fileType}`;
        }
    }
        
    title = alias.replace(/-/g," ");

    // Process results
    // I don't know why this needs to be ran repeatedly to work

    for (let i = 0; i < 5; i ++) {
        title = checkForSymbols(title, false);
    }

    // Print results
    document.getElementById("domain-text").innerHTML = domain;
    document.getElementById("subdomain-text").innerHTML = subdomain;
    document.getElementById("filename-text").innerHTML = fileName;
    document.getElementById("filetype-text").innerHTML = fileType;
    document.getElementById("alias-text").innerHTML = alias;
    document.getElementById("title-text").innerHTML = title;
}

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

    return resultText;
}

function copyToClipboard(textToCopy) {
    let copiedText = document.getElementById(textToCopy).innerHTML;

    navigator.clipboard.writeText(copiedText);

    alert("The text has been copied.");

    return copiedText;
}