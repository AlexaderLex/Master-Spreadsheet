"use strict";

// console.log(containersArray);
// console.log(storageArray)

containersArray.forEach(arr => {
    let tableEl = localStorage.getItem(arr);
    let tableArr = tableEl.split(",");
    // console.log(tableArr[0]);
    console.log(arr);
});

console.log(containersArray);

let tableSourceArray = [];
function getTableContent() {

    storageArray.forEach(item => {
    if(item.includes("table-test-")) {
        tableSourceArray.push(item);
    }
    
    });
    tableSourceArray.forEach(val => {
        if(localStorage.getItem(val) === "<br>") {
            localStorage.removeItem(val);
        }
        // console.log(localStorage.getItem(val))
    });
};

// getTableContent();

function tableContent(el) {
    console.log(el)
}

const activeTable = document.querySelector(".active");
console.log(activeTable);

const activeTableCells = activeTable.querySelectorAll(".t-cell");
let selectedValues = [];

activeTableCells.forEach(cell => {
    let tableId = activeTable.querySelector("table").id;
    let address = cell.dataset.address;
    cell.addEventListener("click", e => {
        
        if(e.ctrlKey) {
            // console.log(Number(cell.innerText));
            selectedValues.push(Number(cell.innerText));
        }

        if(cell.innerText === "+") {
            cell.innerText = sumResult(selectedValues, address, tableId);
            selectedValues.length = 0;
            cell.style.backgroundColor = "rgb(255, 230,230)"
        } else if(cell.innerText === "*") {
            cell.innerText = timesResult(selectedValues, address, tableId);
            selectedValues.length = 0;
            cell.style.backgroundColor = "rgb(255, 230,230)"
        } else if(cell.innerText === "-") {
            cell.innerText = minusResult(selectedValues, address, tableId);
            selectedValues.length = 0;
            cell.style.backgroundColor = "rgb(255, 230,230)"
        } else if(cell.innerText === "/") {
            cell.innerText = divideResult(selectedValues, address, tableId);
            selectedValues.length = 0;
            cell.style.backgroundColor = "rgb(255, 230,230)"
        }
    //    console.log(selectedValues)
    }) 

    cell.addEventListener("dblclick", (e) => {
        let itemName = tableId + "-" + e.target.dataset.address;
        localStorage.removeItem(itemName);
        if(e.target.innerHTML = "<br>") {
            e.target.innerHTML = "";
        }
    })
    
   
});

function cleanCellContent(el) {
    let table = el.querySelector("table");
    let cells = table.querySelectorAll(".t-cell");
    Array.from(cells).forEach(cell => {
        let localCell = table.id + "-" + cell.dataset.address;
        if(cell.innerText === "" && localStorage.getItem(localCell) !== "") {
            let that = localCell;
            localStorage.removeItem(that);
        }
        
   })
};

cleanCellContent(activeTable)

function sumResult(arr, addr, id) {
    
    let res = 0;
    if(arr.length>0) {
            for(let x = 0; x< arr.length; x++) {
            res += arr[x];
        }
    }
    // console.log(tableId)
    // console.log(addr)
    return res;
}
function timesResult(arr, addr, id) {
   if(arr.length > 0) {
        let res = arr[0]*arr[1];
        console.log(arr)
        return res;
   }
};

function minusResult(arr, addr, id) {
    let res = 0;
    if(arr.length > 0) {
         res = arr[0] - arr[1];
         return res;
    }
};

function divideResult(arr, addr, id) {
    if(arr.length > 0) {
       let res = arr[0]/arr[1] 
       return res;
    }
}

localStorage.removeItem("table-test-r8c8");

// let seeRes = result(numbers);

// console.log(seeRes)

/*
function values() {
    let cellValues = [];
    this.addEventListener("mouseout", e => {
    //    e.target.style.backgroundColor = "#eee";
       function fillArray() {
          cellValues.push(Number(e.target.innerText)) 
           
           console.log(cellValues)
       }
       fillArray();
       
    });

    this.addEventListener("dblclick", e => {
        e.target.style.backgroundColor = "rgb(252,252,252)";
    })
    
};

*/




