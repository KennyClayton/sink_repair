import { fetchCompletions, fetchPlumbers, fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"

// this adds an event listener to mainContainer and will trigger a new render function (which is online 23 below: render() will display our SinkRepair function anew (builds all the html again, after the user clicks to submit the order). 

// mainContainer holds our target data which is the "container" CSS selector on the document(index.html). 
// So #container is a parameter 
// querySelector is a method 
// querySelector is looking at the document for an id or class of "container", which is a CSS selector.
// another way to explan it is: querySelector is looking at index.html for "container"
// "container" is an ID for an element
// IDs are unique identifiers assigned to HTML elements
// Once the querySelector finds "Container" ID on the index.html module, it stores it in mainContainer variable
const mainContainer = document.querySelector("#container")

// render function will use SinkRepair as our innherHTML data for display on the web page
const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(() => fetchCompletions())
        .then(
            () => {
                mainContainer.innerHTML = SinkRepair()
            }
        )
}
render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)
// call the render function so it will run (ie - it will do its job of sending all combined and structured data to index.html where it will be read and then displayed by the browser)
render()
