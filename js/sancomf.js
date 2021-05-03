"use strict";
const holder = document.getElementById("holder");
const textDiv = document.getElementById("text");
const content = document.querySelector(".content");

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

        // holder.innerText = event.target.result;
        holder.innerText = "Done!";


        if (firstString.indexOf("\r") === -1) {
            // splitResult = resStr.split('\n');
            splitResult = firstString.split("\n");
            console.log("unix")
                // console.log(splitResult)
        } else {
            // splitResult = resStr.split('\r\n');
            splitResult = firstString.split("\r\n");
            console.log("not unix")
        }
        for (let x = 0; x < splitResult.length; x++) {
            splitArray.push(splitResult[x]);
        }

        for (let y = 0; y < splitArray.length; y++) {
            splitStr = splitArray[y];
            finalArr.push(splitStr);
        }
        // console.log(finalArr);

        let delimiter = finalArr[0].slice(-1);
        // console.log(finalArr[0]);
        console.log(delimiter);
        oneRowArr = finalArr[0].split(delimiter);


        createAndFill(finalArr, oneRowArr, delimiter);
    };
    // console.log(file);
    reader.readAsText(file);
    return false;
};


function createAndFill(outer, inner, delimiter) {
    let rows = outer.length;
    let cols = inner.length;
    let contentStr = ""
    console.log(rows);
    console.log(cols);
    textDiv.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    // textDiv.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    textDiv.style.gridTemplateRows = `auto`;
    let inArr = [];

    for (let r = 0; r < outer.length; r++) {
        let innerStr = outer[r];
        inArr = innerStr.split(delimiter);
        // console.log(innerStr)
        inArr.length = inArr.length;
        for (let c = 0; c < inArr.length; c++) {
            /*
            let tCell = document.createElement("span");
            tCell.className = "t-cell";
            tCell.dataset.address = `r${r+1}c${c+1}`
            tCell.dataset.r = r;
            tCell.dataset.c = c;
            tCell.setAttribute('contenteditable', "true");
            tCell.innerHTML = inArr[c];
            textDiv.append(tCell);
            */
            // console.log(inArr[c])

            contentStr += inArr[c];


        }
    }
    content.innerHTML = contentStr;
};