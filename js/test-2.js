"use strict";

const btn = document.getElementById("button-1");
const tableContainer = document.querySelector(".table-container");
let rows = 101;
let columns = 50;

btn.addEventListener("click", create);

function create() {
    let table;
    let thead;
    let headRow;
    let th;
    let tbody;
    let bodyRows;
    let td;
    let tCell;

    table = document.createElement("table");
    table.classList = "table";
    thead = document.createElement("thead");
    headRow = document.createElement("tr");
    tbody = document.createElement("tbody");


    for (let x = 0; x < rows; x++) {
        bodyRows = document.createElement("tr");
        bodyRows.classList = "row";
        tbody.append(bodyRows);

        for (let y = 0; y < columns; y++) {
            td = document.createElement("td");
            td.classList = "cols";
            tCell = document.createElement("span");
            tCell.innerText = "cell"
            td.append(tCell);
            bodyRows.append(td);
            console.log(y);
        }
    }

    for (let z = 0; z < columns; z++) {
        th = document.createElement("th");
        th.innerText = "head"
        headRow.append(th);
    };

    thead.append(headRow);
    table.append(thead, tbody);
    tableContainer.append(table);

};