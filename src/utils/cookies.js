
function setCookie(cookieName, cookieValue) {
    const date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

function incrementCookie(cookieName,amount) {
    let value = getCookie(cookieName);
    let valueData = getCookie(cookieName+"data")
    value = value ? parseInt(value) + 1 : 1;
    valueData = valueData ? parseInt(valueData) + amount : amount;
    setCookie(cookieName, value);
    setCookie(cookieName+"data", valueData); 
}

function addDocumentSent(amount) {
    incrementCookie("documentsSent",amount);
}

function addDocumentReceived(amount) {
    incrementCookie("documentsReceived",amount);
}

function addAiAnalyses() {
    incrementCookie("aiAnalyses",0);
}

function initCookies() {
    setCookie("documentsSent",0)
    setCookie("documentsSent"+"data", 0); 
    setCookie("documentsReceived",0)
    setCookie("documentsReceived"+"data", 0); 
    setCookie("aiAnalyses",0)
}

function getCookieData() {
    if(getCookie("documentsSent") == "")
    {
        return null
    }

    var sent = getCookie("documentsSent")
    var received = getCookie("documentsReceived")

    var sentData = getCookie("documentsSentdata")
    var receivedData = getCookie("documentsReceiveddata")    

    var ai = getCookie("aiAnalyses")

    return {
        sentCount : sent,
        sentData : sentData,
        receivedCount : received,
        receivedData : receivedData,
        aiCount : ai
    }

}

export {addAiAnalyses,addDocumentReceived,addDocumentSent,initCookies,getCookieData}
