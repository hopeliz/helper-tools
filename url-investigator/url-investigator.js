const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var parsedURL, fullDomain, domain, subdomain, aliasPart, alias, fileType, fileName, title;
var dates = [];
var year, month, day;

var lastPiece, lastPieceParsed, queryString, urlParamsObj;

var urlParams = [];
var urlParamValues = [];

function investigateURL() {
    
    resetPage();

    parsedURL = document.forms["url-form"].url.value.split("/");
    
    console.log("Parsed URL:");
    console.log(parsedURL);
    
    fullDomain = parsedURL[2];
    console.log(`Full domain: ${fullDomain}`);

    // Check for subdomain
    if (fullDomain.split(".").length > 2) {
        // Check if URL starts with ww...
        if (fullDomain.split(".")[0][0] == "w" && fullDomain[2].split(".")[0][1] == "w" && fullDomain.length < 3) {
            domain = `${fullDomain.split(".")[1]}.${fullDomain.split(".")[2]}`;
            console.log("Domain: " + domain);
        }
        else {
            domain = `${fullDomain.split(".")[1]}.${fullDomain.split(".")[2]}`;
            console.log("Domain: " + domain);
            
            subdomain = fullDomain.split(".")[0];
            console.log("Subdomain: " + subdomain);
        }
    }
    else {
        domain = `${fullDomain.split(".")[0]}.${fullDomain.split(".")[1]}`;
    }

    // Removes empty last indicies
    while (parsedURL[parsedURL.length - 1] == "") {
        parsedURL.pop();
        console.log("Removed empty last index");
    }
    
    lastPiece = parsedURL[parsedURL.length - 1];
    console.log("Last piece: " + lastPiece);

    // Check for query string
    if (document.forms["url-form"].url.value.includes("?")) {
        queryString = lastPiece.split("?")[lastPiece.split("?").length - 1];
        console.log(`Query string: ${queryString}`);

        let queryStringParsed = queryString.split("&");

        for (let x in queryStringParsed) {
            if (queryStringParsed[x].includes("=")) {
                urlParams.push(queryStringParsed[x].split("=")[0]);
                urlParamValues.push(queryStringParsed[x].split("=")[1]);
            }
        }

        console.log("URL Parameters:");
        console.log(urlParams);
        console.log("URL Parameter Values:");
        console.log(urlParamValues);
    }
    
    // Check for links to files
    if (!lastPiece.includes(".")) {
        
        // Check for alias
        if (lastPiece.includes("-")) {
            aliasPart = lastPiece;
        }
        else if (parsedURL[parsedURL.length - 2].includes("-")) {
            aliasPart = parsedURL[parsedURL.length - 2];
        }
        
        if (queryString == "") {
            alias = aliasPart;
            console.log(`Alias/Slug: ${alias}`);
        }
        else {
            alias = aliasPart.split("?")[0];
            console.log(`Alias/Slug: ${alias}`);
        }
    }
    else {
        lastPieceParsed = lastPiece.split(".");
        
        // Get file type and file name
        if (lastPieceParsed[lastPieceParsed.length - 1].length <= 4) {
            fileType = lastPieceParsed[lastPieceParsed.length - 1];
            fileName += lastPiece;
        }
        
        console.log(`File Name: ${fileName}`);
    }
        
    title = alias.replace(/-/g," ");

    // Process results
    // I don't know why this needs to be ran repeatedly to work

    for (let i = 0; i < 5; i ++) {
        title = checkForSymbols(title, false);
    }
    
    console.log(`Possible article title: ${title}`);
    
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
    
    console.log("Dates found in URL:");
    console.log(URLDates);
    console.log(LastPieceDates);
    console.log(dates);

    // Print results
    
    document.getElementById("full-domain-text").innerHTML = fullDomain;
    document.getElementById("domain-text").innerHTML = domain;
    
    if (subdomain != "www" && subdomain != "") {
        document.getElementById("subdomain-container").style.display = "block";
        document.getElementById("subdomain-text").innerHTML = subdomain;
    }

    if (urlParams.length > 0) {
        document.getElementById("query-container").style.display = "block";

        let queryText = "";

        queryText = `<div class="table">
                <div class="table-data"><strong>Parameter</strong></div>
                <div class="table-data"><strong>Value</strong></div>`;

        for (let x in urlParams) {
            queryText += `<div class="table-data">${urlParams[x]}</div>
            <div class="table-data">${urlParamValues[x]}</div>`;
        }

        queryText += "</div>";

        document.getElementById("query-text").innerHTML = queryText;
    }
    
    if (fileName != "") {
        document.getElementById("filename-container").style.display = "block";
        document.getElementById("filename-text").innerHTML = fileName;
    }
    
    if (fileType != "") {
        document.getElementById("filetype-container").style.display = "block";
        document.getElementById("filetype-text").innerHTML = fileType + " - " + getFileTypeInfo(fileType);
    }
    
    if (alias != "") {
        document.getElementById("alias-container").style.display = "block";
        document.getElementById("alias-text").innerHTML = alias;
    }
    
    if (title != "") {
        document.getElementById("title-container").style.display = "block";
        document.getElementById("title-text").innerHTML = title;
    }
    
    if (dates.length > 0) {
        document.getElementById("dates-container").style.display = "block";
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
}

function lookForDate(arrayToCheck) {
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

function copyToClipboard(textToCopy, tooltipID) {
    let copiedText = document.getElementById(textToCopy).innerHTML;

    navigator.clipboard.writeText(copiedText);

    document.getElementById(tooltipID).innerHTML = "Copied";

    //alert("The text has been copied.");

    return copiedText;
}


function outCopy(tooltipID) {
    document.getElementById(tooltipID).innerHTML = "Copy";
}

function resetPage() {
    parsedURL = "";
    fullDomain = "";
    domain = "";
    subdomain = "";
    aliasPart = "";
    alias = "";
    fileType = "";
    fileName = "";
    title = "";
    dates = [];
    year = "";
    month = "";
    day = "";
    lastPiece = "";
    lastPieceParsed = "";
    queryString = "";
    urlParamsObj = "";
    urlParams = [];
    urlParamValues = [];
    
    document.getElementById("full-domain-text").innerHTML = "";
    document.getElementById("domain-text").innerHTML = "";
    document.getElementById("subdomain-container").style.display = "none";
    document.getElementById("query-container").style.display = "none";
    queryText = "";
    document.getElementById("filename-container").style.display = "none";
    document.getElementById("filetype-container").style.display = "none";    
    document.getElementById("alias-container").style.display = "none";   
    document.getElementById("title-container").style.display = "none";
    document.getElementById("dates-container").style.display = "none";
    
}