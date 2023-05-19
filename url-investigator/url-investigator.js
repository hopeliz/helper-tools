const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var parsedURL, fullDomain, domain, subdomain, aliasPart, alias, fileType, fileName, title;
var dates = [];
var year, month, day;

var lastPiece, lastPieceParsed, queryString, urlParamsObj;

var urlParams = [];
var urlParamValues = [];

var searchQuery = [];

function investigateURL() {
    
    resetPage();

    parsedURL = document.forms["url-form"].url.value.split("/");
    
    console.log("Parsed URL:");
    console.log(parsedURL);
    
// ------- DOMAIN & SUBDOMAIN ---------- //
    
    fullDomain = parsedURL[2];
    console.log(`Full domain: ${fullDomain}`);
    
    // Check for subdomain
    
    let fullDomainParsed = fullDomain.split(".");
    console.log(fullDomainParsed);
    
    if (fullDomainParsed.length > 2) {
        // Check if URL starts with ww...
        if (fullDomainParsed[0][0] == "w" && fullDomainParsed[0][1] == "w" && fullDomain.length < 3) {
            
            for (let x in fullDomainParsed) {
                if (x > 0) {
                    domain += fullDomainParsed[x];
                    
                    if (x < fullDomainParsed.length - 1) {
                        domain += ".";
                    }
                }
            }
            //domain = `${fullDomain.split(".")[1]}.${fullDomain.split(".")[2]}`;
            console.log("Domain: " + domain);
        }
        else {
            for (let x in fullDomainParsed) {
                if (x > 0) {
                    domain += fullDomainParsed[x];
                    
                    if (x < fullDomainParsed.length - 1) {
                        domain += ".";
                    }
                }
            }
            //domain = `${fullDomain.split(".")[1]}.${fullDomain.split(".")[2]}`;
            console.log("Domain: " + domain);
            
            subdomain = fullDomain.split(".")[0];
            console.log("Subdomain: " + subdomain);
        }
    }
    else {
        domain = `${fullDomain.split(".")[0]}.${fullDomain.split(".")[1]}`;
    }
    
// ------- TRIM URL ---------- //

    // Removes empty last indicies
    while (parsedURL[parsedURL.length - 1] == "") {
        parsedURL.pop();
        console.log("Removed empty last index");
    }
    
    lastPiece = parsedURL[parsedURL.length - 1];
    console.log("Last piece: " + lastPiece);
    
// ------- QUERY STRING ---------- //

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

        for (let x in urlParams) {
            for (let i = 0; i < 5; i ++) {
                urlParams[x] = checkForSymbols(urlParams[x], false);
            }
        }

        for (let x in urlParamValues) {
            for (let i = 0; i < 5; i ++) {
                urlParamValues[x] = checkForSymbols(urlParamValues[x], true);
            }
        }

        console.log("URL Parameters:");
        console.log(urlParams);
        console.log("URL Parameter Values:");
        console.log(urlParamValues);
    }
    
// ------- ALIAS/SLUG ---------- //
    
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
    
// ------- FILES ---------- //
    
    else {
        lastPieceParsed = lastPiece.split(".");
        
        // Get file type and file name
        if (lastPieceParsed[lastPieceParsed.length - 1].length <= 4) {
            fileType = lastPieceParsed[lastPieceParsed.length - 1];
            fileName += lastPiece;
        }
        
        console.log(`File Name: ${fileName}`);
        
        // Check for alias
        if (lastPieceParsed[lastPieceParsed.length - 2].includes("-")) {
            title = lastPieceParsed[lastPieceParsed.length - 2].replace(/-/g," ");
        }
    }
     
    if (title == "") {
        title = alias.replace(/-/g," ");
    }

    // Process results
    // I don't know why this needs to be ran repeatedly to work

    for (let i = 0; i < 5; i ++) {
        title = checkForSymbols(title, false);
    }
    
    console.log(`Possible article title: ${title}`);
    
// ------- DATES ---------- //
    
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

// ------- PRINT RESULTS ---------- //
    
    document.getElementById("full-domain-text").innerHTML = fullDomain;
    document.getElementById("domain-text").innerHTML = domain;
    document.getElementById("gd-inurlurl").value = domain;
    document.getElementById("gd-allinurlurl").value = domain;
    
    if (subdomain != "www" && subdomain != "") {
        document.getElementById("subdomain-container").style.display = "block";
        document.getElementById("subdomain-text").innerHTML = subdomain;
    }

    if (urlParams.length > 0) {
        document.getElementById("query-container").style.display = "block";

        let queryText = "";

        queryText = `<div class="table">
                <div class="table-data parameter"><strong>Parameter</strong></div>
                <div class="table-data"><strong>Value</strong></div>`;

        for (let x in urlParams) {
            queryText += `<div class="table-data parameter">${urlParams[x]}</div>
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
        
        document.getElementById("search-container").style.display = "block";
        document.getElementById("search-text").innerHTML = title;

        searchQuery.push(title);
    }
    
    if (dates.length > 0) {
        document.getElementById("dates-container").style.display = "block";
        document.getElementById("dates-text").innerHTML = "";
        
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
                    months.push(arrayToCheck[Number(x)+1] - 1);

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

function buildSearchQuery(id) {

    let searchText = document.getElementById("search-text");

    if (id == "gd-exact") {
        if (document.getElementById(id).checked) { searchQuery[0] = `"${searchQuery[0]}"`; }
        else { searchQuery[0] = title; }
    }

    searchText.innerHTML = searchQuery[0];

    if (id == "gd-inurl") {
        if (document.getElementById(id).checked) { 
            searchQuery[1] = " inurl:" + document.getElementById(id + "url").value; 
            document.getElementById("gd-allinurl").checked = false;
        }
        else { 
            searchQuery[1] = ""; 
        }
    }

    if (id == "gd-allinurl") {
        if (document.getElementById(id).checked) { 
            searchQuery[1] = " allinurl:" + document.getElementById(id + "url").value; 
            document.getElementById("gd-inurl").checked = false;
        }
        else { 
            searchQuery[1] = ""; 
        }
    }

    if (searchQuery[1] != undefined) { searchText.innerHTML += searchQuery[1]; }
    else { searchText.innerHTML += ""; }
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
    searchQuery = [];
    
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
    document.getElementById("search-text").innerHTML = "";
    document.getElementById("search-container").style.display = "none";
}