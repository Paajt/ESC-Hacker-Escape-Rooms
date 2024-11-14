//Declaring variables
const bodyBox = document.querySelector("body");
const placeHolderButton = document.querySelector(".onsiteBtn");

function openBookingWindow(challengeId) {

    //Creating the <div> that will contain the booking window
    const bookingWindow = document.createElement("div")
    bookingWindow.classList.add("bookingWindow");

    //Creating the <h1> for the booking window
    const roomTitle = document.createElement("h1");
    roomTitle.classList.add("roomTitle");
    roomTitle.innerHTML = "Book room '${challenge.title}' (step 1)";

    //Creating the date <h2>
    const dateTitle = document.createElement("h2");
    dateTitle.classList.add("dateTitle");
    dateTitle.innerHTML = "What date would you like to come?";

    //Creating the date <label>
    const inputLabel = document.createElement("label");
    inputLabel.classList.add("dateLabel");
    inputLabel.innerHTML = "Date";

    //Creating a date <input> 
    const bookingInput = document.createElement("input");
    bookingInput.classList.add("bookingInput");
    bookingInput.placeholder = ("YY/MM/DD");
    bookingInput.type = "date";

    //Creating a button to search for available times
    const searchButton = document.createElement("button");
    searchButton.classList.add("searchButton");
    searchButton.innerHTML = "Search available times";

    searchButton.addEventListener("click", async () => {
        const selectedDate = bookingInput.value;
        let emptyDateWarning;

        if (!selectedDate){
            emptyDateWarning = document.createElement("span");
            emptyDateWarning.classList.add("emptyDateWarning");
            emptyDateWarning.innerHTML = "Please select a date.";
            bookingWindow.appendChild(emptyDateWarning);
            return;
        } else {
            emptyDateWarning = document.querySelector(".emptyDateWarning");
            if (emptyDateWarning) {
                emptyDateWarning.remove();
            }
        }

        console.log("Selected Date: ", selectedDate);

        // if (selectedDate && challengeId) {
        //     const apiURL = `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${selectedDate}&challenge=${challengeId}`

        //     fetch(apiURL, {
        //         method: "GET",
        //         headers: {
        //             "Content-Type:" 
        //         }

        //     })
        // }
    })

    //Append elements to the booking window and body
    bookingWindow.appendChild(roomTitle);
    bookingWindow.appendChild(dateTitle);
    bookingWindow.appendChild(inputLabel);
    bookingWindow.appendChild(bookingInput);
    bookingWindow.appendChild(searchButton);
    bodyBox.appendChild(bookingWindow);
}

//Function that opens up a "Modal" box when pressing on a "Book this room" <button>
//Currently only a placeholder button to try the function
placeHolderButton.addEventListener("click", openBookingWindow);
