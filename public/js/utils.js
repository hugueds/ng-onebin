function request(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(null);
    xhr.onreadystatechange =  () => {
        let done = 4;
        let ok = 200;
        if (xhr.readyState == done) {
            if (xhr.status == ok) {
                callback(null, xhr.responseText);
            }
            else {
                callback(xhr.status, null);
            }
        }
    }
}

function convertTakt(ms) {
    let hr, min, sec;
    if (ms < 0) {
        negative = true;
        ms = ms * (-1);
    }
    else {
        negative = false;
    }

    hr = 0;
    min = (ms / 1000 / 60) << 0;
    sec = (ms / 1000) % 60;

    if (sec < 10)
        takt = min + ":0" + sec;
    else
        takt = min + ":" + sec;

    if (negative)
        takt = "-" + takt;

    return takt;
}
