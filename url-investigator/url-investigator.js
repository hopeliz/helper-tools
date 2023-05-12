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
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let dates = [];
    let year = "";
    let month = "";
    let day = "";
    let lastPiece = "";
    let lastPieceParsed = "";

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
    
    lastPiece = parsedURL[parsedURL.length - 1];
    
    console.log(lastPiece);
    
    if (!lastPiece.includes(".")) {
        alias = lastPiece;
    }
    else {
        lastPieceParsed = lastPiece.split(".");
        
        // Get file type and file name
        if (lastPieceParsed[lastPieceParsed.length - 1].length <= 4) {
            fileType = lastPieceParsed[lastPieceParsed.length - 1];
            fileName += lastPiece;
        }
    }
        
    title = alias.replace(/-/g," ");

    // Process results
    // I don't know why this needs to be ran repeatedly to work

    for (let i = 0; i < 5; i ++) {
        title = checkForSymbols(title, false);
    }
    
    // Look for a date in URL structure
    let URLDates = lookForDate(parsedURL);
    let LastPieceDates = lookForDate(lastPieceParsed);
    
    // Add URL dates first
    if (URLDates.years.length > 0) {
        for (let i = 0; i < URLDates.years.length; i++) {
            
            year = URLDates.years[i];
            
            if (URLDates.months[i] >= 0) {
                month = URLDates.months[i];
            }
            
            if (URLDates.days[i] >= 0) {
                day = URLDates.days[i];
            }
            
            if (day != "") {
                dates.push(new Date(year, (month - 1), day));
            }
            else if (month != "") {
                if (month[0] == 0) {
                    dates.push(monthNames[month[1]] + " " + year);
                }
                else {
                    dates.push(monthNames[month] + " " + year);
                }
//                dates.push(new Date(year, (month - 1)));
            }
            else {
                dates.push(year);
            }
            
            // Reset values
            year = "";
            month = "";
            day = "";
        }
    }
    
    // Add Last Piece dates next
    if (LastPieceDates.years.length > 0) {
        for (let i = 0; i < LastPieceDates.years.length; i++) {
            
            year = LastPieceDates.years[i];
            
            if (LastPieceDates.months[i] >= 0) {
                month = LastPieceDates.months[i];
            }
            
            if (LastPieceDates.days[i] >= 0) {
                day = LastPieceDates.days[i];
            }
            
            if (day != "") {
                dates.push(new Date(year, (month - 1), day));
            }
            else if (month != "") {
                if (month[0] == 0) {
                    dates.push(monthNames[month[1]] + " " + year);
                }
                else {
                    dates.push(monthNames[month] + " " + year);
                }
//                dates.push(new Date(year, (month - 1)));
            }
            else {
                dates.push(year);
            }
            
            // Reset values
            year = "";
            month = "";
            day = "";
        }
    }
    
    console.log(URLDates);
    console.log(LastPieceDates);
    console.log(dates);

    // Print results
    document.getElementById("domain-text").innerHTML = domain;
    document.getElementById("subdomain-text").innerHTML = subdomain;
    document.getElementById("filename-text").innerHTML = fileName;
    document.getElementById("filetype-text").innerHTML = fileType + " - " + getFileTypeInfo(fileType);
    document.getElementById("alias-text").innerHTML = alias;
    document.getElementById("title-text").innerHTML = title;
    
    for (let i = 0; i < dates.length; i++) {
        if (dates[i] instanceof Date) {
            if (dates[i].getDate())
            document.getElementById("dates-text").innerHTML += `<p>${monthNames[dates[i].getMonth()]} ${dates[i].getDate()}, ${dates[i].getFullYear()}</p>`;
        }
        else {
            document.getElementById("dates-text").innerHTML += `<p>${dates[i]}</p>`;
        }
    }
}

function lookForDate(arrayToCheck) {
    
    console.log(arrayToCheck);
    
    let years = [];
    let months = [];
    let days = [];
    
    let Dates = {};
    
    // Checks for YYYY/MM/DD format used by many URLs and in naming conventions
    for (let x in arrayToCheck) {
        if (arrayToCheck[x].length == 4 && !isNaN(arrayToCheck[x])) {
            years.push(arrayToCheck[x]);
            
            console.log("next piece(" + (x + 1) + "): " + arrayToCheck[Number(x)+1]);
            if (arrayToCheck[Number(x)+1] != undefined) {
                if (arrayToCheck[Number(x)+1].length == 2 && !isNaN(arrayToCheck[Number(x)+1])) {
                    months.push(arrayToCheck[Number(x)+1]);

                    if (arrayToCheck[Number(x)+2] != undefined) {
                        if (arrayToCheck[Number(x)+2].length == 2 && !isNaN(arrayToCheck[Number(x)+2])) {
                            days.push(arrayToCheck[Number(x)+2]);
                        }
                        else {
                            days.push(-1);
                        }
                    }
                }
            }
            else {
                months.push(-1);
                days.push(-1);
            }
        }
    }
    
    Dates = {
        years,
        months,
        days
    };
    
    return Dates;
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