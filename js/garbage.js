//* getStyles()
/*
function getStyles() {
    const stylesheet = document.styleSheets[0];
    let styleRules = stylesheet.cssRules;
    for (let s = 0; s < styleRules.length; s++) {
        if (stylesheet.cssRules[s].selectorText === ".table-container") {
            containerStyle = stylesheet.cssRules[s];
        } else if (stylesheet.cssRules[s].selectorText === ".active") {
            activeStyle = stylesheet.cssRules[s];
        }
    };
};

*/
//* saveTable()
/*
function saveTable() {
    const tabs = document.querySelectorAll(".table-container");
    const conLen = tabs.length;
    const itemName = "container-" + conLen;
    localStorage.setItem(itemName, tabs[conLen - 1].outerHTML);
};
*/

//* allStorage() 
/*
function allStorage() {
    let values = [];
    let keys = Object.keys(localStorage);
    let i = keys.length;
    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }
    return values;
};
const storageArray = allStorage();
console.log(storageArray);
*/