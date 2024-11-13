//Declaring variables
const bodyBox = document.querySelector("body");
const placeHolderButton = document.querySelector(".onsiteBtn");

function openBookingWindow() {

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
    bookingInput.placeholder = ("YY/MM/DD");
    bookingInput.type = "number";
    bookingInput.maxLength = 7;

    //Prevents user from typing more than 6 numbers
    bookingInput.addEventListener("input", () => {
        const value = bookingInput.value.toString();

        if (bookingInput.value.length >= 6) {
            bookingInput.value = value.substring(0, 6);
        }
    })

    //Creating a button to search for available times
    const searchButton = document.createElement("button");
    searchButton.classList.add("searchButton");
    searchButton.innerHTML = "Search available times";

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
