let panel;
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
        </div>
        <footer><button id="ok" type="submit" uxp-variant="cta">Submit</button></footer>
    </form>
    `
    function appendName() {
        const { editDocument } = require("application");
        const textToAppend = String(document.querySelector("#append").value);
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


module.exports = {
    panels: {
        appendName: {
            show
        }
    }
};