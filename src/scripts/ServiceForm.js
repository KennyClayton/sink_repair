// this function creates an html string of our service form which includes: the title of the input area, the input area itself (for user input), and classes for each so we can design them with CSS
export const ServiceForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="serviceDescription">Description</label>
            <input type="text" name="serviceDescription" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceAddress">Address</label>
            <input type="text" name="serviceAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceBudget">Budget</label>
            <input type="number" name="serviceBudget" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceDate">Date needed</label>
            <input type="date" name="serviceDate" class="input" />
        </div>

        <button class="button" id="submitRequest">Submit Request</button>
    `
    return html
} 

// instructions say this below function does what? The POST method on any HTTP request means "Hey API!! I want you to create something new!"
// the sendRequest function below will take input from the userServiceRequest function (which is holding the user input i think) and POST it to the requests array (add the user data as an object to the requests array). I think it is ".then" turned into json for JS use, and then //? can't remember right now 

const API = "http://localhost:8088"

export const sendRequest = (userServiceRequest) => {
    // the function below runs first. It is simply the instruction to POST the object to the requets array and to do so with these particular options: post method, a header of content-type and a body that will be a string of that object coming in.
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    //*PART 1 OF DISPLAYING THE NEW STATE: after the fetch posts the new object in our json server's requests folder, we want to have the fetch call "dispatch the custom event after the POST operation has been completed"...what is the custom event? it's 
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json()) //? turn the response into json so JS can read it?
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


// instruction for the below function given to us is to read and understand it...what is it saying?
const mainContainer = document.querySelector("#container")
// we are going to search our html document for the id of container...once found...we will listen for a click event...and if the user clicks a part of the page with "submitRequest"....then we'll harvest the user's input(value) into these four variables below....so basically we are listening for the click on the user input section for serviceDescription and whatever values the user enters we are giving it a variable name userDescription, userAddress, etc... and then line 58 this same function we are running will create a variable called dataToSendToAPI which is an OBJECT storing all the user's input....and finally, once that object is updated, we will run the sendRequest function and pass our user's data (in the form of an object) as an argument for sendRequest. Recall that sendRequest is a function (above) that takes the data from this function (which is the user's input values) and creates another new object in our requests folder/array.
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const userDescription = document.querySelector("input[name='serviceDescription']").value
        const userAddress = document.querySelector("input[name='serviceAddress']").value
        const userBudget = document.querySelector("input[name='serviceBudget']").value
        const userDate = document.querySelector("input[name='serviceDate']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            description: userDescription,
            address: userAddress,
            budget: userBudget,
            neededBy: userDate
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})