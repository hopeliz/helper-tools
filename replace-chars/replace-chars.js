function replaceChars(remove) {
    let formObj = document.forms["text-form"];
    let text = formObj.startText.value;
    let char1 = formObj.char1.value;
    let char2 = formObj.char2.value;
    let firstParam = new RegExp(`${char1}`, 'g');
    
    let endText;
    
    if (remove) { 
        endText = text.replace(firstParam,"");
    }
    else {
        endText = text.replace(firstParam, char2);
    }
    
    document.getElementById("result-text").innerHTML = endText;
    
    return endText;
}