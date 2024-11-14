//Declaring variables
const bodyBox = document.querySelector("body");
const placeHolderButton = document.querySelector(".onsiteBtn");

//Creating the step 1 window
function bookingWindowStep1(challengeId) {

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

    //Append elements to the booking window and body
    bookingWindow.appendChild(roomTitle);
    bookingWindow.appendChild(dateTitle);
    bookingWindow.appendChild(inputLabel);
    bookingWindow.appendChild(bookingInput);
    bookingWindow.appendChild(searchButton);
    bodyBox.appendChild(bookingWindow);

    //Runs when "Search available times" is clicked
    searchButton.addEventListener("click", async () => {

        //Prevents the user from continuing without selecting a date
        const selectedDate = bookingInput.value;
        let emptyDateWarning = document.querySelector(".emptyDateWarning");

        if (!selectedDate) {
            if (!emptyDateWarning) {
                emptyDateWarning = document.createElement("span");
                emptyDateWarning.classList.add("emptyDateWarning");
                emptyDateWarning.innerHTML = "Please select a date.";
                bookingWindow.appendChild(emptyDateWarning);
            }
            return;
        } else {
            if (emptyDateWarning) {
                emptyDateWarning.remove();
            }
        }

        //Updating the window for step 2
        dateTitle.remove();
        inputLabel.remove();
        bookingInput.remove();
        searchButton.remove();

        //Updating the title
        roomTitle.innerHTML = "Book room '${challenge.title}' (step 2)";

        //Name input with label
        const nameLabel = document.createElement("label");
        nameLabel.setAttribute("for", "name");

        nameLabel.textContent = "Name:"

        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("id", "nameValue")
        nameInput.setAttribute("name", "nameValue");

        //Email input with label
        const emailLabel = document.createElement("label");
        emailLabel.setAttribute("for", "email");

        emailLabel.textContent = "E-mail:"

        const emailInput = document.createElement("input");
        emailInput.setAttribute("type", "email");
        emailInput.setAttribute("id", "emailValue")
        emailInput.setAttribute("name", "emailValue");

        //What time? input with label
        const timeLabel = document.createElement("label");
        timeLabel.setAttribute("for", "time");

        timeLabel.textContent = "What time?"

        const timeInput = document.createElement("input");
        timeInput.setAttribute("type", "time");
        timeInput.setAttribute("id", "timeValue")
        timeInput.setAttribute("name", "timeValue");

        //How many participants= input with label
        const amountOfPeopleLabel = document.createElement("label");
        amountOfPeopleLabel.setAttribute("for", "amountOfPeople");

        amountOfPeopleLabel.textContent = "How many participants?"

        const amountOfPeopleSelect = document.createElement("select");
        amountOfPeopleSelect.classList.add("amountOfPeopleSelect");

        const amountOfPeopleOption = document.createElement("option");
        amountOfPeopleOption.classList.add("amountOfPeopleOption");
        amountOfPeopleOption.textContent = "Test Placeholder";

        //Creating a button to search for available times
        const submitButton = document.createElement("button");
        submitButton.classList.add("submitButton");
        submitButton.innerHTML = "Submit booking";

        //Append elements to the booking window and body
        nameLabel.appendChild(nameInput);
        emailLabel.appendChild(emailInput)
        timeLabel.appendChild(timeInput);
        amountOfPeopleSelect.appendChild(amountOfPeopleOption);
        amountOfPeopleLabel.appendChild(amountOfPeopleSelect);

        bookingWindow.appendChild(nameLabel);
        bookingWindow.appendChild(emailLabel);
        bookingWindow.appendChild(timeLabel);
        bookingWindow.appendChild(amountOfPeopleLabel);
        bookingWindow.appendChild(submitButton);

    })
}

//Function that opens up a "Modal" box when pressing on a "Book this room" <button>
//Currently only a placeholder button to try the function
placeHolderButton.addEventListener("click", bookingWindowStep1);
