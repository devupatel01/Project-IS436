function checkInputEmail(eInput) { //checkEmail function
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
    if (!eInput.match(pattern)) { //if pattern not matched then add error and remove valid class
        return false;
    }
    return true
}

function checkInputText(iTInput) { //checkPass function
    if (iTInput == "") { //if pass is empty then add error and remove valid class
        return false
    }
    return true
}

function checkInputPassword(iTInput) { //checkPass function
    if (iTInput == "") { //if pass is empty then add error and remove valid class
        return false
    }
    return true
}

function checkInputDate(iDInput) { //checkPass function
    if (!iDInput) return false
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!iDInput.match(regEx)) return false;  // Invalid format
    var d = new Date(iDInput);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === iDInput;
}

function checkInputTime(iDInput) { //checkPass function
    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(iDInput);
}
