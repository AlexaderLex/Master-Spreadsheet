"use strict";

const dropBox = document.querySelector(".drop-div");
const holder = document.getElementById("holder");
const upload = document.getElementById("upload-file");
const state = document.getElementById('status');
const lastClick = document.getElementById("last-click");

let obj_csv = {
    size: 0,
    dataFile: []
};

if (typeof window.FileReader === 'undefined') {
    state.className = 'fail';
    state.style.color = "red";
} else {
    state.className = 'success';
    state.innerHTML = 'File API & FileReader available';
    state.style.color = "lime";
}

holder.ondragover = function() {
    this.className = 'hover';
    return false;
};
holder.ondragend = function() {
    this.className = '';
    return false;
};
holder.ondrop = function(e) {
    this.className = "";
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        holder.innerText = "Done!";
        let targetString = event.target;
        const result = event.target.result;
        const firstString = result;

        findDelimiter(firstString);

    }
    reader.readAsText(file);
    return false;
};

function splitMark(data) {
    let r = data.indexOf("\r");
    let n = data.indexOf("\n");
    console.log(r + " - r");
    console.log(n + " - n")
    let splitSym = "";
    if (r === -1) {
        splitSym = "\n";
    } else {
        splitSym = "\r\n";
    }
    console.log(splitSym);
    return splitSym;
}

function readFile(input) {
    // console.log(input);
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        let file = input.files[0];
        reader.readAsText(input.files[0]);
        reader.onload = function(e) {
            // console.log(e);
            obj_csv.size = e.total;
            obj_csv.dataFile = e.target.result;
            // console.log(obj_csv.dataFile);
            // console.log(file.name);
            // console.log(file.size);
            // parseData(obj_csv.dataFile);
            const delimit = findDelimiter(obj_csv.dataFile);
            // const splitSym = splitMark(obj_csv.dataFile);
            CSVToArray(obj_csv.dataFile, delimit);
        }
    }
};


function findDelimiter(dataIn) {
    let delimiter = "";
    let comma = -1;
    let semicolon = -1;
    let tab = -1;
    comma = dataIn.indexOf(",");
    semicolon = dataIn.indexOf(";");
    tab = dataIn.indexOf("\t");

    if (semicolon === -1 && tab === -1) {
        delimiter = ","
    } else if (comma !== -1 && semicolon !== -1 && comma < semicolon) {
        delimiter = ",";
    } else if (semicolon !== -1 && tab === -1 && comma === -1 || semicolon < comma && tab === -1) {
        delimiter = ";"
    } else if (tab !== -1 && semicolon < tab || semicolon < comma) {
        delimiter = ";";
    }
    if (tab !== -1 && tab < semicolon || tab !== -1 && tab < comma || tab !== -1 && tab < comma) {
        delimiter = "\t";
    }
    // dropBox.style.display = "none";
    // console.log(comma, semicolon, tab);
    // console.log("|" + delimiter + "|")
    return delimiter;
};

function CSVToArray(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );

    // READ!!! http://www.regular-expressions.info/brackets.html

    var arrData = [
        []
    ];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
        var strMatchedDelimiter = arrMatches[1];
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
        ) {
            arrData.push([]);
        }
        if (arrMatches[2]) {
            var strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );
        } else {
            var strMatchedValue = arrMatches[3];
        }

        arrData[arrData.length - 1].push(strMatchedValue);
    }
    // console.log(arrData);
    dataToPage(arrData);
    return (arrData);
}


function dataToPage(data) {
    // console.log(data.length);
    // console.log(data[0].length)
    let rows = data.length;
    let columns = data[0].length;
    let container = document.createElement("div");
    container.className = "container";
    container.style.display = "grid";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.gridTemplateRows = "auto";
    container.style.gridTemplateColumns = `repeat(${columns}, 1fr`;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let spanEl = document.createElement("span");
            spanEl.style.border = "1px solid #bbb";
            spanEl.innerHTML = data[r][c];
            container.append(spanEl);
        }

    }

    fuck(container);
}

function fuck(data) {
    lastClick.addEventListener("click", (e) => {
        const newTab = open();
        newTab.document.body.append(data);
        let links = newTab.document.querySelectorAll("a");
        console.log(links.length)

        // console.log(data)
    })
}