
// this dataAccess module will hold the "application state" of the user selections...meaning this is not permanent state
// applicationState is an object that holds aPlumbersts" array of service requests received from users on our website
const applicationState = {
    requests: [],
    plumbers: [], 
    completions: [] 
}



// API is the variable holding the link for our server which is storing the data we want to fetch
// So right now I want to add a couple of plumbers to the plumbers array. How do I add objcts to the API/plumbers?
const API = "http://localhost:8088"

export const fetchRequests = () => {
    // we use the API/hyperlink from above to insert in our fetch return so the fetch knows to go to that API/url and look inside the requests folder/array
    return fetch(`${API}/requests`)
        // ...then, once inside the "requests" folder/array, we can convert the data in there to .json for use in Javascript...
        .then(response => response.json())
        // ...then, we will pass that "requests" array data (which are objects) as an argument through the serviceRequests parameter for use inside this function below...
        // ...what is this function below? it says to make that data we just received from our fetch equal to our local applicationState object's "requests" array..
        //? in other words, store the data we fetched from the API/server/online into our local "requests" array in our local database?
        .then(
            (serviceRequests) => {
                // Store the external state in application state(in here/locally) for us to work with. Below we take the requests entered by users and store them in our requests array above, which is stored as a variable named applicationState
                applicationState.requests = serviceRequests
            }
        )
}

//^ INSTRUCTION: Define and export a function named getRequests that returns a copy of the requests state. Go back to a previous project and look at the functions that return copies of arrays in the database module if you've forgotten the syntax.
// so take the requests objects out of the requests array above and map each object into its own request object outside of the array...something like that //?
export const getRequests = () => {
    return applicationState.requests.map(request => ({ ...request }))
    // return [...applicationState.requests]
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

// here again, this dataAccess module is focused on the task of getting access to the data in our API. So below we are fetching the plumber objects.
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}

//? I assume i needed to create a get function for the plumbers so I can access plumber objects in my Requests function in the Requests.js module
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({ ...plumber}))
    // return [...applicationStatPlumbersts]
}

// saveCompletion() - This will perform the POST request to save the completion object to the JSON server/API
export const saveCompletion = (complete) => { //? leaving parenthesis blank so the parameter can be filled when called in ServiceForm module
    const postJobCompleted = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(complete) //? leaving parenthesis blank so the parameter can be filled when called in ServiceForm module
    }

    //*PART 1 OF DISPLAYING THE NEW STATE: after the fetch posts the new object in our json server's requests folder, we want to have the fetch call "dispatch the custom event after the POST operation has been completed"...what is the custom event? it's 
    return fetch(`${API}/completions`, postJobCompleted)
        .then(response => response.json()) //? turn the response into json so JS can read it?
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

// fetchCompletions() - This will retrieve all completion objects from the API
 export const fetchCompletions = () => { //? is this correct code for sending to the API for permanent storage?
    return fetch(`${API}/completions`) // this is a GET request to the json server's completions folder
        .then(response => response.json()) // response.json is a method that will parse the response body as JSON
        .then((data) => {applicationState.completions = data} // then assign that data to the completions array in my local applicationState object //? by the way, why are we storing as an object of arrays instead of array of objects? Because an array containt key-value pairs and that's the data type we have here....the key is requestId and it has a value of 1 or 2 or some other integer. Objects are not meant to store key-value pairs like arrays do.
        )
}