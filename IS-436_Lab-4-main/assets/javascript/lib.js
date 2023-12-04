var headers = {
    authorization: localStorage.getItem('Token')
}
function performGet(url, onSuccess, onFailure) {
    var headers = {
        authorization: localStorage.getItem('Token')
    }
    $.ajax({
        url: url,
        type: "GET",
        headers: headers,
        xhrFields: {
            withCredentials: true
        },
        success: onSuccess,
        error: onFailure
    });
}



function performPost(url, data, onSuccess, onFailure) {
    $.ajax({
        url: url,
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        // method: 'POST',
        type: 'POST', // For jQuery < 1.9
        success: onSuccess,
        error: onFailure
    });
}

function performPostWithFormData(url, data, onSuccess, onFailure) {
    var headers = {
        authorization: localStorage.getItem('Token')
    }
    $.ajax({
        url: url,
        data: data,
        headers: headers,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', // For jQuery < 1.9
        success: onSuccess,
        error: onFailure
    });
}

function performPutWithFormData(url, data, onSuccess, onFailure) {
    var headers = {
        authorization: localStorage.getItem('Token')
    }
    $.ajax({
        url: url,
        data: data,
        headers: headers,
        cache: false,
        contentType: false,
        processData: false,
        method: 'PUT',
        type: 'PUT', // For jQuery < 1.9
        success: onSuccess,
        error: onFailure
    });
}

function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

function CheckIsValidDomain(domain) {
    var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
    return domain.match(re);
}

function validateIpAndPort(input) {
    var parts = input.split(":");
    var ip = parts[0].split(".");
    var port = parts[1];
    return validateNum(port, 1, 65535) && ip.length == 4 && ip.every(function (segment) {
        return validateNum(segment, 0, 255);
    });
}

function validateNum(input, min, max) {
    var num = +input;
    return num >= min && num <= max && input === num.toString();
}