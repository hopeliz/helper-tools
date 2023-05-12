function createTitle() {
    let title = document.forms["alias-form"].alias.value.replace(/-/g," ");

    document.getElementById("title-area").style.display = "flex";

    document.getElementById("title-text").innerHTML = title;

    return title;
}

function copyToClipboard() {
    let copiedText = document.getElementById("title-text").innerHTML;

    navigator.clipboard.writeText(copiedText);

    alert("Title has been copied.");

    return copiedText;
}