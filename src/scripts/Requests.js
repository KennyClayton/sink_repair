import { getRequests, getPlumbers, saveCompletion } from "./dataAccess.js"

// event listener below will listen for change events involving any "plumbers" id's clicked on the page...and do what //? i think it will fill up the completion object with the user's input

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            // split that element into two parts, with -- as the divider
            // then store both the requestId value and the plumberId value in variables by the same name
            const [requestId, plumberId] = event.target.value.split("--")
//? does the split store the value of each into the variables in the array to the left? YES
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const timestamp = new Date().toLocaleString() //? this is how i coded to get the date the job was clicked as completed
            // now collect the user's data into the completion object...
            const completion = { //? not sure how to code this to allow requestId to come in
                "requestId": requestId,
                "plumberId": plumberId,
                "date_created": timestamp
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion) //? this is the function we created in dataAccess that sends the completed job (completion) to the API folder for permanent storage on the change event(when the user clicks the plumber's name that completed the job)
        }
    }
)



//^ INSTRUCTION: define the function that will be passed to the map() method.
//^ In the following code, you will need to define the function that will be passed to the map() method.

//^ The function you write will convert each service request object into HTML representations. Since it is wrapped with a <ul> element, make each one an <li> element showing only the description of the request to start.

//^ The function should define 1 parameter (value will be each object in the array)
//^ The description of the service request should be interpolated inside the <li> HTML representation.
//^ The function should return the HTML representation.
//^ For example, if you write a function named convertRequestToListElement, then you would update the code below to the following...

//^ requests.map(convertRequestToListElement).join("")

// this function will gat the requests from the user's selections and convert it to a list of requests. It includes a delete option next to each request. 
export const Requests = () => {
    const requests = getRequests()
     const plumbers = getPlumbers()
    
    // We got access to the requests array above. 
    // Now convert each object of the array to a list (with .map method) and then list each object with <li> tags ... //* these objects are the user-input service requests that will be listed below th Submit Request button. They will have a delete button next to them 
    // I do not need a for...of loop because .map iterates through an array
    // the starter code is mapping the requests array for me so no map method needed here, right?
    //! build an if-statement to remove the select options 
    const convertRequestToListElement = (request) => {
        return `<li>${request.description}
        <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
        ${
            plumbers.map(
                plumber => {
                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                }
            ).join("")
        }
    </select>
        
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
        </li>`
    }

    let html = `
        <ul>
            ${
        // pass the function to the .map method and join the strings of objects in a list
        requests.map(convertRequestToListElement).join("")
        }
        </ul>
    `

    return html
}

