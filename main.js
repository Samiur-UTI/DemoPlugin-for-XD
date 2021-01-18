let panel;
let searchResult ="You can also search inside the items!";
function create() {
    const HTML =
    `<style>
        .break {
            flex-wrap: wrap;
        }
        label.row > span {
            color: #8E8E8E;
            width: 20px;
            text-align: right;
            font-size: 9px;
        }
        label.row input {
            flex: 1 1 auto;
        }
        .show {
            display: block;
        }
        .hide {
            display: none;
        }
    </style>
    <form method="dialog" id="main">
        <div class="row break">
            <label class="row">
                <span>↕︎</span>
                <input type="text" uxp-quiet="true" id="append" value="[Style]" placeholder="Insert Value" />
            </label>
            <label class="row">
                <span>↔︎</span>
                <input type="text" uxp-quiet="true" id="search" value="[Style]" placeholder="Search for Values" />
            </label>
        </div>
        <footer><button id="ok" type="submit" uxp-variant="cta">Submit</button></footer>
    </form>
    <p>${searchResult}</p>
    `
    function appendName() {
        const { editDocument } = require("application");
        const textToAppend = String(document.querySelector("#append").value);
        const search = String(document.querySelector("#search").value);

    
        editDocument({ editLabel: "Append Name for Item" },  function workerFunction(selection, searchResult){
            if(selection.items.length !== 0 && selection.items.length === 1){
                selection.itemsIncludingLocked.forEach( node => {
                    let previousName = node.name;
                    node.name = textToAppend + " " + previousName;
                })
            }
        } )
    }
    panel = document.createElement("div");
    panel.innerHTML = HTML;
    panel.querySelector("form").addEventListener("submit", appendName);

    return panel;
}
function show(event) {
    if (!panel) event.node.appendChild(create());
}
function search () {
    const HTML = `
        <style>
            .break {
                flex-wrap: wrap;
            }
            label.row > span {
                color: #8E8E8E;
                width: 20px;
                text-align: right;
                font-size: 9px;
            }
            label.row input {
                flex: 1 1 auto;
            }
        </style>
        <form method="dialog" id="main">
            <div class="row break">
                <label class="row">
                    <span>↔︎</span>
                    <input type="text" uxp-quiet="true" id="search" value="[Style]" placeholder="Search for Values" />
                </label>
            </div>
            <footer><button id="ok" type="submit" uxp-variant="cta">Submit</button></footer>
        </form>
        <p>${searchResult}</p>
        `
    function search (selection, searchResult){
        if (selection.items.length > 1){
            selection.itemsIncludingLocked.forEach(node => {
                if(node.name = search){
                    searchResult = "item found!"
                }
                else {
                    searchResult = "Item not found!"
                }
            })
        }
    }
    panel = document.createElement("div");
    panel.innerHTML = HTML;
    panel.querySelector("form").addEventListener("submit", search);
    return panel;
}


module.exports = {
    panels: {
        appendName: {
            show
        }
    }
};