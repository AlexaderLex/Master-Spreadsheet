"use strict";

const holder = document.getElementById("holder");
const textDiv = document.getElementById("text");
// modified from http://html5demos.com/file-api

const state = document.getElementById('status');

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
    this.className = '';
    e.preventDefault();

    const file = e.dataTransfer.files[0],
        reader = new FileReader();
    reader.onload = function(event) {
        // console.log(event.target);

        const result = event.target.result;
        // const resultArray = result.split('');
        let firstString = result;
        // let regEx = new RegExp("(, ){1}", "g");
        // let resStr = firstString.replace(regEx, "; ")
        let splitResult;
        let splitArray = [];
        let splitStr = "";
        let oneRowArr = [];
        let finalArr = [];
        let delimiter = "";

        // holder.innerText = event.target.result;
        holder.innerText = "Done!";

        let comma = -1;
        let semicolon = -1;
        let tab = -1;
        comma = firstString.indexOf(",");
        semicolon = firstString.indexOf(";");
        tab = firstString.indexOf("\t");

        // console.log(comma, semicolon, tab + " - zero");

        if (semicolon === -1 && tab === -1 || semicolon > comma && tab === -1) {
            delimiter = ",";
            // console.log("comma");
        } else if (semicolon !== -1 && tab === -1 || semicolon < comma && tab === -1) {
            delimiter = ";";
            // console.log("semicolon");
        } else if (tab !== -1 || tab < semicolon || tab < comma) {
            delimiter = "\t";
        }

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

            return (arrData);
        }

        let ccc = CSVToArray(result, delimiter);
        let row = ccc.length;
        let col = ccc[0].length;

        textDiv.style.gridTemplateColumns = `repeat(${col},1fr)`;
        // textDiv.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        textDiv.style.gridTemplateRows = `auto`;

        for (let x = 0; x < row; x++) {
            let oneRow = ccc[x];
            for (let y = 0; y < col; y++) {
                let oneCell = oneRow[y];
                // console.log(oneCell);
                let tCell = document.createElement("span");
                tCell.className = "t-cell";
                tCell.dataset.address = `r${x+1}c${y+1}`
                tCell.dataset.r = x;
                tCell.dataset.c = y;
                tCell.setAttribute('contenteditable', "true");
                tCell.innerHTML = oneCell;
                textDiv.append(tCell);
            }
        }

        // createAndFill(ccc, delimiter);
    };
    // console.log(file);
    reader.readAsText(file);
    return false;
};

function createAndFill(outer, delimiter) {

    let preImg = "polotenhik.ru";
    let rows = outer.length;
    let cols = outer[0].length;
    console.log(rows);
    console.log(cols);
    textDiv.style.gridTemplateColumns = `repeat(${cols}, minmax(70px, 1fr))`;
    // textDiv.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    textDiv.style.gridTemplateRows = `auto`;
    let inArr = [];

    for (let r = 0; r < outer.length; r++) {
        let innerStr = outer[r];
        inArr = innerStr.split(delimiter);
        inArr.length = inArr.length;
        for (let c = 0; c < inArr.length; c++) {
            let tCell = document.createElement("span");
            tCell.className = "t-cell";
            tCell.dataset.address = `r${r+1}c${c+1}`
            tCell.dataset.r = r;
            tCell.dataset.c = c;
            tCell.setAttribute('contenteditable', "true");
            tCell.innerHTML = inArr[c];
            textDiv.append(tCell);

        }
    }

};