"use strict";

const containers = document.querySelectorAll(".table-container");

containers.forEach(container => {
    general(container);
    let table = container.querySelector(".table");
    console.log(table.id);
})

function general(el) {
    const table = el.querySelector(".table");
    const tRows = table.querySelectorAll(".row");
    const tCols = table.querySelectorAll("th");
    const tCells = table.querySelectorAll("td");
    const tId = table.id;
    const address = el.querySelector(".address");
    const cellContent = el.querySelector(".text");
    //* *********************
    tCells.forEach(cell => {
        let cellSpan = cell.querySelector("span[contenteditable=true]");
        cellSpan.addEventListener("blur", function() {
            if (cellSpan.innerHTML !== "") {
                let string = this.innerText;
                let cName = this.dataset.address;
                let itemName = tId + "-" + cName;
                localStorage.setItem(itemName, string);
        }
    })
});

    //* *************************

 tCols.forEach(head => {
        head.querySelector("span").setAttribute("contenteditable", "false");
 });

    //* *************************

 for (let x = 0; x < tCols.length; x++) {
        let headCell = tCols[x];
        headCell.innerText = "c" + (x);
        // headCell.style.cursor = 'url("../img/cursor/down.png"), s-resize';
 }

 tCols[0].innerText = "";

    //* *************************

 for (let x = 0; x < tRows.length; x++) {
        let tRow = tRows[x].querySelector("td span");
        tRow.setAttribute("contenteditable", "false");
        tRow.classList.remove("t-cell");
        tRow.innerText = "r" + (x + 1);
 }

    //* *****************************

 for (let x = 0; x < tRows.length; x++) {
        let rowCells = tRows[x].querySelectorAll("span[contenteditable=true]");
        for (let c = 0; c < rowCells.length; c++) {
            rowCells[c].dataset.address = `r${x+1}c${c+1}`;
            rowCells[c].dataset.r = (x + 1);
            rowCells[c].dataset.c = (c + 1);
    }
 };

 const cells = el.querySelectorAll("span[contenteditable=true]");

    //* *****************************
 cells.forEach(cell => {
        let cName = cell.dataset.address;
        // cell.className = "t-cell"
        cell.addEventListener("focus", (e) => {
            address.value = cName;
            cellContent.value = cell.innerHTML;
        })
 cell.addEventListener("input", () => {
        let itemName = `${tId}-${cell.dataset.address}`
        if (!cell.innerHTML === "<br>") {
            localStorage.setItem(itemName, cell.innerHTML);
            cellContent.innerHTML = cell.innerHTML;
         }
    })
 });
 
    //* **********************************

function dataToCell() {
    const cells = el.querySelectorAll(".t-cell");
    cells.forEach(cell => {
        let itemName = tId + "-" + cell.dataset.address;
        cell.innerText = localStorage.getItem(itemName);
        // localStorage.setItem(itemName, "")
    })
 };

 dataToCell();

    //* *********************************
table.addEventListener("keydown", (e) => {

    let rRow = parseInt(e.target.dataset.r);
    let cCol = parseInt(e.target.dataset.c);
    // console.log(e.key);

    if ("ArrowDown" === e.key) {
        focusOnCell(rRow, cCol)
    } else if ("ArrowUp" === e.key) {
        rRow = rRow - 2;
        focusOnCell(rRow, cCol)
    } else if ("ArrowRight" === e.key) {
        rRow = rRow - 1;
        cCol = cCol + 1;

        focusOnCell(rRow, cCol)
    } else if ("ArrowLeft" === e.key) {
        rRow = rRow - 1;
        cCol = cCol - 1;
        focusOnCell(rRow, cCol);
    }
});

function focusOnCell(r, c) {
        if (r < 0) {
            r = 0;
        } else if (r > tRows.length - 1) {
            r = tRows.length - 1;
        };

        if (c < 0) {
            c = 0;
        } else if (c > tCols.length - 1) {
            c = tCols.length - 1;
        };
        let row = tRows[r];
        let col = row.querySelectorAll("span")[c];
        col.focus();
    };

    
};