"use strict";

const body = document.querySelector("body");
const contentWrapper = document.querySelector(".content-wrapper");

const createBtn = document.getElementById("create-btn");
const cancelBtn = document.getElementById("cancel");
const saveBtn = document.getElementById("save-btn");

const rowsNumber = document.getElementById("row-number");
const colsNumber = document.getElementById("col-number");
const tableName = document.getElementById("table-name");

function begin() {
    localStorage.setItem("container-1", "one,30,31")
    localStorage.setItem("container-2", "two,30,31");
    localStorage.setItem("container-3", "three,30,31");
    localStorage.setItem("active", "table-container-one");
};

begin();

function limitInput(el) {
    if (el.value <= 0) {
        el.value = 1;
    } else if (el.value >= 102) {
        el.value = 101;
    }
};
limitInput(rowsNumber);
limitInput(colsNumber);

function setStoragePalletItem() {
    const currentTheme = localStorage.getItem("pallet");
    return currentTheme;
};

const currentTheme = setStoragePalletItem();

const storageItems = {...localStorage };

const storageArray = Object.keys(storageItems);

function showContainers() {
    let containerItems = [];
    storageArray.forEach(item => {
        if (item.includes("container-")) {
            containerItems.push(item);
        }
    });
    let sortItems = containerItems.sort();
    
    sortItems.forEach(item => {
        let itemBody = localStorage.getItem(item).split(",");
        create(itemBody[1], itemBody[2], itemBody[0]);
    });
    return containerItems;
};

const containersArray = showContainers();
console.log(containersArray);
//* ======= Create Tables =========
function create(r, c, id) {
    let tableHeader;
    let rows = r;
    let columns = c;

    let table;
    let thead;
    let headRow;
    let th;
    let tbody;
    let bodyRows;
    let td;
    let tCell;

    let container = document.createElement("div");
    container.className = "table-container";
    container.id = "table-container-"+ id;
    container.dataset.id = id;
    table = document.createElement("table");
    table.classList = "table";
    table.id = "table-"+id;
    table.dataset.id = id;
    tableHeader = document.createElement("div");
    tableHeader.classList = "table-header";
    tableHeader.dataset.id = id;
    tableHeader.innerHTML = `
            
            <div class="buttons">
            <h4 class="table-title">Table</h4>
                <button class="save" id="save-${id}" title="Save this table as CSV file" onClick=window.location.reload(true) data-id="${id}">Save as CSV</button>
                 <button class="read-btn" id="read-btn-${id}" title="Read CSV file"  data-id="${id}">Read CSV</button>
                <button class="clean" id="clean-${id}" title="Clear table content" data-id="${id}">Clean</button>
                <button class="add" id="add-${id}" title="Add a new Table" data-id="${id}">Add</button>
                <button class="delete" id="delete-${id}" title="Delete this table" data-id="${id}">Delete</button>
                
            </div>
            <div class="table-tags">

            </div>
           <div class="panel" id="panel-${id}">
            <div class="address-div">
               
                <input class="address" id="address-${id}" class="cell-address" type="text" placeholder="cell address"></input>
            </div>
            <div class="text-div">
                
                <input class="text" id="text-${id}" type="text" placeholder="cell content"></input>
            </div>
            <div class="function-div">
                f(x)
                <input class="function" id="function-${id}" type"text" placeholder="function"></input>
            </div>
           
        </div>
        <!-- panel -->
                
            </div>
      
        <!-- table header   -->`;

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
            tCell.setAttribute("contenteditable", "true");
            tCell.className = "t-cell";
            td.append(tCell);
            bodyRows.append(td);
        }
    }

    for (let z = 0; z < columns; z++) {
        th = document.createElement("th");
        let tCell = document.createElement("span");
        tCell.className = "t-cell";
        th.append(tCell);
        headRow.append(th);
    };

    thead.append(headRow);
    table.append(thead, tbody);
    container.append(tableHeader, table);
    contentWrapper.append(container);

    general(container)
    cleanText(container);
};

const tableTitle = document.querySelectorAll(".table-title");

tableTitle.forEach(title => {
    let table = title.parentElement.parentElement.parentElement.querySelector(".table");
    title.innerText = table.id;
});

// * Clean tables content
function cleanText(el) {
    const cleanBtn = el.querySelector(".clean");
    const table = el.querySelector("table");
    const elId = table.id
    cleanBtn.addEventListener("click", () => {
        const cells = el.querySelectorAll(".t-cell");
        cells.forEach(cell => {
            let itemName = elId + "-" + cell.dataset.address;
            if (cell.innerHTML != "") {
                cell.innerHTML = "";
                localStorage.removeItem(itemName, "");
            }
        })
    })
};

const csvBtns = document.querySelectorAll(".save");
csvBtns.forEach(button => {
    button.addEventListener("click", () => {

    })
});
//* ********* add table tags ===============

const tableContainers = document.querySelectorAll(".table-container");
const tableTags = document.querySelectorAll(".table-tags");

for (let x = 0; x < tableContainers.length; x++) {
    // let container = tableContainers[x];
    let tagDiv = tableTags[x];
    for (let y = 0; y < tableContainers.length; y++) {
        let tagSpan = document.createElement("span");
        tagSpan.classList = "tag-span";
        tagSpan.setAttribute("tabindex", "0");
        tagSpan.dataset.vector = y;
        tagSpan.innerText = "table-" + tableContainers[y].dataset.id;
        tagSpan.dataset.parent = "table-container-" + tableContainers[y].dataset.id;
        tagDiv.append(tagSpan);
    }
    tableContainers[x].style.zIndex = "-1";
};
//! Set Active container
const activeContainer = localStorage.getItem("active");
let actCon = document.getElementById(activeContainer);
actCon.classList.add("active");
actCon.style.zIndex = "5";

// * ********** Chose a Table ***************
tableContainers.forEach(container => {
    let tagSpans = container.querySelectorAll(".tag-span");

    markTag(container);

    let nowSpan = container.querySelector(".now");
    let currentVector = parseInt(nowSpan.dataset.vector);
    let nextVector;
    tagSpans.forEach(tag => {
        tag.addEventListener("click", (e) => {
            if (container.classList.contains("active")) {
                container.classList.remove("active");
            }
            let elementId = tag.dataset.parent;
            let element = document.getElementById(elementId);
            element.classList.add("active");
            localStorage.setItem("active", elementId)
            nextVector = parseInt(e.target.dataset.vector)
            if (nextVector >= currentVector) {
                for (let x = 0; x < tableContainers.length; x++) {
                    tableContainers[x].style.animation = "moveOutRight 2000ms forwards ease";
                }
                tableContainers[nextVector].style.animation = "moveInFromLeft 2000ms forwards ease";
            } else {
                for (let x = 0; x < tableContainers.length; x++) {
                    tableContainers[x].style.animation = "moveOutLeft 2000ms forwards ease";
                    tableContainers[x].style.zIndex = "-1";
                }
                tableContainers[nextVector].style.animation = "moveInFromRight 2000ms forwards ease";
                tableContainers[nextVector].style.zIndex = "6";
            }
        });
    });
});

//* Read CSV File ***************
function addTableFromCsv() {
    const btnRead = document.querySelectorAll(".read-btn");
    btnRead.forEach(btn => {
        btn.addEventListener('click', () => {
            dropBox.style.display = "flex";
            // let newWindow = open();
        })
    });
    addActive();
};

addTableFromCsv();

function addActive() {
    let containerObj = document.querySelectorAll(".table-container");
    let last = containerObj.length - 1;
    containerObj.forEach(obj => {
        if (obj.classList.contains("active")) {
            obj.classList.remove("active");
        }
    })
    containerObj[last].classList.add("active");
    containerObj[last].classList.add("new");
};


//* Add new Table ***************
const addTableButtons = document.querySelectorAll(".add");
const form = document.querySelector(".form-div");

addTableButtons.forEach(button => {
    addEventListener("click", (e) => {
        if (e.target.className === "add") {
            form.style.display = "block";
        }
    });
});

addTableButtons.forEach(button => {
    button.addEventListener("dblclick", () => {
        form.style.display = "none";
    })
})

createBtn.addEventListener("click", addTable);
cancelBtn.addEventListener("click", hideForm);


function addTable() {
    let rows = rowsNumber.value;
    let cols = colsNumber.value;
    let name = tableName.value;
    getStorageItems(rows, cols, name);
    hideForm();
}

function getStorageItems(row, col, id) {
    let containersArray = [];
    storageArray.forEach(item => {
        if (item.includes("container-")) {
            containersArray.push(item);
        }
    })
    // let next = containersArray.length + 1;
    localStorage.setItem(`container-${id}`, `${id},${row},${col}`);
};

function hideForm() {
    setTimeout(function() {
        form.style.display = "none";
    }, 800);
    window.location.reload();
};

//* *********************************

//* Delete Table ***********************

const deleteButtons = document.querySelectorAll(".delete");
const delDiv = document.getElementById("del-div");
const delBtn = document.getElementById("del");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
        // console.log(cleanBtn)
        delDiv.style.display = "block";
        let tableId = button.dataset.id;
        delBtn.innerText = "Delete table - " + tableId + "?";
    })
});

yesBtn.addEventListener("click", removeTable);

function removeTable(e) {
    const activeTable = document.querySelector(".active");
    let num = activeTable.dataset.id
    localStorage.removeItem("container-" + num);
    clearItems(num);
    hideButton();
}

function clearItems(number) {
    let delArr = Object.keys(storageItems);

    delArr.forEach(el => {
        if (el.includes(`table-${number}-`)) {
            let str = el;
            localStorage.removeItem(str);
        }
    })
}

function hideButton() {
    setTimeout(function() {
        delDiv.style.display = "none";
    }, 800);
    window.location.reload();
}

noBtn.addEventListener("click", () => {
    delDiv.style.display = "none";
})


// deleteButtons.forEach(button => {
//     button.addEventListener("click", (e) => {
//         if (e.target.className === "delete") {
//             let btn = e.target;
//             let thisBtn = e.target.dataset.id;
//             localStorage.removeItem(`container-${thisBtn}`);
//         }
//     })
// });

//* **************************************
function markTag(el) {
    let tags = el.querySelectorAll(".tag-span");
    let tableTitle = el.querySelector(".table-title").innerText;
    tags.forEach(tag => {
        if (tag.innerText === tableTitle) {
            tag.classList.add("now");
        } else {
            tag.classList.remove("now");
        }
    });
};

//* ** Colors Themes and Pallets

const styles = document.documentElement.style;
const options = document.querySelectorAll("option");
const palletList = document.getElementById("pallet-list");
let palletEl = palletList.value;

for (let x = 0; x < pallets.length; x++) {
    let option = document.createElement("option");
    let pallet = pallets[x].name;
    option.value = pallet;
    option.innerText = pallet;
    option.value = pallet;
    palletList.append(option);
};

//* Apply Color Theme to the page;
palletList.addEventListener("change", function() {
    localStorage.setItem("pallet", palletList.value);
    setThemeColors()
});

function setThemeColors() {
    const currentTheme = localStorage.getItem("pallet");
    pallets.forEach(el => {
        if (el.name === currentTheme) {
            styles.setProperty("--prime", el.color[0]);
            styles.setProperty("--second", el.color[1])
            styles.setProperty("--third", el.color[2])
            styles.setProperty("--fourth", el.color[3])
            styles.setProperty("--fifth", el.color[4])
        }
    });
};

function selectedOption() {
    const options = document.querySelectorAll("option");
    options.forEach(option => {
        if (option.value !== "" && option.value === currentTheme) {
            option.setAttribute("selected", "true");
        }
    })
};
selectedOption();

window.onload = setThemeColors();

//* === *** Computed Styles *** === $

let root = getComputedStyle(document.documentElement);
let prime = root.getPropertyValue("--prime");
let second = root.getPropertyValue("--second");
let third = root.getPropertyValue("--third");
let fourth = root.getPropertyValue("--fourth");
let fifth = root.getPropertyValue("--fifth");

//*** */

// localStorage.clear();

// console.log(containersArray);

// let delArr = Object.keys(storageItems);

// delArr.forEach(el => {
//     if (el.includes("table-4-")) {
//         let str = el;
//         localStorage.removeItem(str);
//     }
// })