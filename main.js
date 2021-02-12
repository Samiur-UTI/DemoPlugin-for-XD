let panel;
let savedTag1 = " ";
let savedTag2 = " ";
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
                <input type="text" uxp-quiet="true" id="append1" placeholder="Insert Value" />
                <button id="chonu" type="submit" uxp-variant="cta">${savedTag1}</button>
            </label>
            <label class="row">
                <span>↕︎</span>
                <input type="text" uxp-quiet="true" id="append2" placeholder="Insert Value" />
                <button id="monu" type="submit" uxp-variant="cta">${savedTag2}</button>
            </label>
            <label class="row">
                <span>↕︎</span>
                <input type="text" uxp-quiet="true" id="search" placeholder="Search for tags" />
            </label>
        </div>
        <footer><button id="ok" type="submit" uxp-variant="cta">Submit</button></footer>
    </form>
    `
    function appendName() {
        const { editDocument } = require("application");
        const textToAppend1 = String(document.querySelector("#append1").value);
        const textToAppend2 = String(document.querySelector("#append2").value);
        editDocument({ editLabel: "Append Name for Item1" },  function workerFunction(selection){
            if(selection.items.length !== 0 && selection.items.length === 1){
                selection.itemsIncludingLocked.forEach( node => {
                    let previousName = node.name;
                    node.name = textToAppend1 + " " + previousName;
                })
            } else if (selection.items.length > 1){
                let node1 = selection.itemsIncludingLocked[0].name;
                let node2 = selection.itemsIncludingLocked[1].name;
                selection.itemsIncludingLocked[0].name = textToAppend1 + " " + node1;
                selection.itemsIncludingLocked[1].name = textToAppend2 + " " + node2;
            }
        })
    }
    function appendSavedTag(){
        const { editDocument } = require("application");
        const textToAppend1 = String(document.querySelector("#append1").value);
        savedTag1 = textToAppend1;
        editDocument({ editLabel: "Saved Append Name for Item1" }, 
            function workerFunction(selection){
                if(selection.items.length !== 0 && selection.items.length === 1){
                    selection.itemsIncludingLocked.forEach( node => {
                        let previousName = node.name;
                        node.name = textToAppend1 + " " + previousName;
                    })
                }
            })
    }
    panel = document.createElement("div");
    panel.innerHTML = HTML;
    panel.querySelector("form").addEventListener("submit", appendName);
    panel.querySelector("#chonu").addEventListener("click", appendSavedTag);

    return panel;
}
function show(event) {
    if (!panel) event.node.appendChild(create());
}

module.exports = {
    panels: {
        appendName: {
            show
        }
    }
};