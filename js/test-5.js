"use strict";

const contentPar = document.querySelector(".content p");

//? CREATING CSV FILE with JS

//* Example 1 *********** */
/*

let arrayHeader = ["Name", "Country", "Email"]
let arrayData = [{ data: ["Sigit Prasetya", "Indonesia", "sigit@gmail.com"] }, { data: ["Song Hye Kyo", "South Korea", "songsong@gmail.com"] }, { data: ["Andy Lau", "Hongkong", "andyLau@gmail.com"] }, { data: ["Enji Shaun", "United State", "shaun2@gmail.com"] }, {
    data: ["Azumi", "Japan", "azumiK@gmail.com"]
}, ];

const export_csv = (arrayHeader, arrayData, delimiter, fileName) => {
    let header = arrayHeader.join(delimiter) + "\n";
    let csv = header;

    arrayData.forEach(array => {
        csv += array.data.join(delimiter) + "\n";

    });

    let csvData = new Blob([csv], { type: "text/csv" });
    let csvURL = URL.createObjectURL(csvData);
    // console.log(csvURL);

    let hiddenElement = document.createElement("a");
    hiddenElement.href = csvURL;
    hiddenElement.target = "_blank";
    hiddenElement.download = fileName + ".csv";
    hiddenElement.click();
};

export_csv(arrayHeader, arrayData, ",", "master-one");

*/

//* Example 2 ********** */

let arrayHeader = ["Name", "Country", "Email"];
let arrayData = [];
arrayData[0] = { name: "Sigit", country: "Indonesia", email: "sigit@gmail.com" };
arrayData[1] = { name: "Joana", country: "Brazil", email: "Joana@gmail.com" };
arrayData[2] = { name: "Albert", country: "Mexico", email: "albert@gmail.com" };
arrayData[3] = { name: "Nuuna", country: "South Korea", email: "Nuuna@gmail.com" };
arrayData[4] = { name: "Aroon", country: "Irlandia", email: "aroon@gmail.com" };

function export_csv(arrayHeader, arrayData, delimiter, fileName) {
    let header = arrayHeader.join(delimiter) + "\n";
    let csv = header;
    arrayData.forEach(obj => {
        let row = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                row.push(obj[key]);
            }
        }
        csv += row.join(delimiter) + "\n";
    });
    let csvData = new Blob([csv], { type: "text/csv" });
    let csvUrl = URL.createObjectURL(csvData);

    let hiddenElement = document.createElement('a');
    hiddenElement.href = csvUrl;
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName + '.csv';
    // hiddenElement.click();
    // contentPar.innerHTML = csvUrl;
};

export_csv(arrayHeader, arrayData, "\t", "master-2");

//* Removing unwanted characters in a string; */

let string = "20, Min Nagar, Gobichettipalayam, Tamil Nadu 638452, India, Some.thing.going.on.here";

function removeSpecialCar(str) {
    if (str == null || str == "") {
        return "";
    } else {
        return str.replace(/[^a-zA-Z0-9 \.']/g, "\t");
    }
};

//****** RegExp */
//*** 1 */
let readTheString = removeSpecialCar(string);

// let str_2 = "Thu, Mar 18, 2021 1:10 AM";
// let str_2 = ",,,,,,,";
let str_2 = "1x Footlong Steak and Cheese, 1x Footlong Turkey Breast"

// let regEx = new RegExp("[a-z]+(,){1}[0-9]+", "gi");
let regEx = new RegExp("(, ){1}", "gi");

let res = str_2.match(regEx);
// let newStr = str_2.replace(regEx, ";");
let newStr = str_2.replace(regEx, "; ")

// console.log(res)
// console.log(newStr)

//*** 2 */

//* ******* Reading CSV Files Example 1 ******* */

var obj_csv = {
    size: 0,
    dataFile: []
};

function readImage(input) {
    // console.log(input);
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.readAsBinaryString(input.files[0]);
        reader.onload = function(e) {
            // console.log(e);
            obj_csv.size = e.total;
            obj_csv.dataFile = e.target.result;
            // console.log(obj_csv.dataFile);
            // parseData(obj_csv.dataFile);
            fineDelimiter(obj_csv.dataFile);
        }
    }
};

function fineDelimiter(dataIn) {
    let delimiter = "";
    let comma = -1;
    let semicolon = -1;
    let tab = -1;
    comma = dataIn.indexOf(",");
    semicolon = dataIn.indexOf(";");
    tab = dataIn.indexOf("\t");

    if (semicolon === -1 && tab === -1) {
        delimiter = ","
        console.log("one")
    } else if (semicolon !== -1 && tab === -1 && comma === -1 || semicolon < comma && tab === -1) {
        delimiter = ";"
        console.log("two")
    } else if (tab !== -1 && semicolon < tab || semicolon < comma) {
        delimiter = ";";
        console.log("three")
    }

    if (tab !== -1 && tab < semicolon || tab !== -1 && tab < comma || tab !== -1 && tab < comma) {
        delimiter = "\t";
        console.log("four")
    }

    // dropBox.style.display = "none";
    console.log(comma, semicolon, tab);
    console.log("|" + delimiter + "|")
    return delimiter;
};

function parseData(data) {
    let csvData = [];
    let lbreak = data.split("\n");
    lbreak.forEach(res => {
        csvData.push(res.split('\"'));

    })
    console.log(csvData);
    // drawOutput(csvData);
}

function drawOutput(lines) {
    //Clear previous data
    document.getElementById("output").innerHTML = "";
    var table = document.createElement("table");
    for (var i = 0; i < lines.length; i++) {
        var row = table.insertRow(-1);
        for (var j = 0; j < lines[i].length; j++) {
            var firstNameCell = row.insertCell(-1);
            firstNameCell.appendChild(document.createTextNode(lines[i][j]));
        }
    }
    document.getElementById("output").appendChild(table);
}

//* *** Read Example 2 *** */

//? source = "https://github.com/MounirMesselmeni/html-fileapi/blob/master/js/read-csv.js" */

/*

function handleFiles(files) {
    // Check for the various File API support.
    if (window.FileReader) {
        // FileReader are supported.
        getAsText(files[0]);
    } else {
        alert('FileReader are not supported in this browser.');
    }
}

function getAsText(fileToRead) {
    var reader = new FileReader();
    // Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
    // Read file into memory as UTF-8      
    reader.readAsText(fileToRead);
}

function loadHandler(event) {
    var csv = event.target.result;
    processData(csv);
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    while (allTextLines.length) {
        lines.push(allTextLines.shift().split(','));
    }
    console.log(lines);
    drawOutput(lines);
}

//if your csv file contains the column names as the first line
function processDataAsObj(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];

    //first line of csv
    var keys = allTextLines.shift().split(',');

    while (allTextLines.length) {
        var arr = allTextLines.shift().split(',');
        var obj = {};
        for (var i = 0; i < keys.length; i++) {
            obj[keys[i]] = arr[i];
        }
        lines.push(obj);
    }
    console.log(lines);
    drawOutputAsObj(lines);
}

function errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
}

function drawOutput(lines) {
    //Clear previous data
    document.getElementById("output").innerHTML = "";
    var table = document.createElement("table");
    for (var i = 0; i < lines.length; i++) {
        var row = table.insertRow(-1);
        for (var j = 0; j < lines[i].length; j++) {
            var firstNameCell = row.insertCell(-1);
            firstNameCell.appendChild(document.createTextNode(lines[i][j]));
        }
    }
    document.getElementById("output").appendChild(table);
}

//draw the table, if first line contains heading
function drawOutputAsObj(lines) {
    //Clear previous data
    document.getElementById("output").innerHTML = "";
    var table = document.createElement("table");

    //for the table headings
    var tableHeader = table.insertRow(-1);
    Object.keys(lines[0]).forEach(function(key) {
        var el = document.createElement("TH");
        el.innerHTML = key;
        tableHeader.appendChild(el);
    });

    //the data
    for (var i = 0; i < lines.length; i++) {
        var row = table.insertRow(-1);
        Object.keys(lines[0]).forEach(function(key) {
            var data = row.insertCell(-1);
            data.appendChild(document.createTextNode(lines[i][key]));
        });
    }
    document.getElementById("output").appendChild(table);
}

*/