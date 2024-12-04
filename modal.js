//Declaring variables
const bodyBox = document.querySelector("body");

//Creating the booking window
function openBookingWindow(challengeTitle, challengeId, availableTimes = [], participantOptions = []) {

    //Creating the <div> that will contain the booking window
    const bookingWindow = document.createElement("div");
    bookingWindow.classList.add("bookingWindow");

    const exitWindowButton = document.createElement("button");
    exitWindowButton.classList.add("exitWindowButton");
    exitWindowButton.innerHTML = "X";

    exitWindowButton.addEventListener("click", () => {
        bookingWindow.remove();
    });

    //Creating the <h1> for the booking window
    const roomTitle = document.createElement("h1");
    roomTitle.classList.add("roomTitle");
    roomTitle.innerHTML = `Book room "${challengeTitle}" (step 1)`;

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
    bookingInput.placeholder = "YY/MM/DD";
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
    bookingWindow.appendChild(exitWindowButton);
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

        //Fetch info about the times
        const availableTimes = await fetchAvailableTimes(selectedDate, challengeId);

        //Updating the window for step 2
        dateTitle.remove();
        inputLabel.remove();
        bookingInput.remove();
        searchButton.remove();

        //Updating the title
        roomTitle.innerHTML = `Book room "${challengeTitle}" (step 2)`;

        //Name input with label
        const nameLabel = document.createElement("label");
        nameLabel.setAttribute("for", "name");
        nameLabel.textContent = "Name:";

        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("id", "nameValue");
        nameInput.setAttribute("name", "nameValue");

        //Email input with label
        const emailLabel = document.createElement("label");
        emailLabel.setAttribute("for", "email");
        emailLabel.textContent = "E-mail:";

        const emailInput = document.createElement("input");
        emailInput.setAttribute("type", "email");
        emailInput.setAttribute("id", "emailValue");
        emailInput.setAttribute("name", "emailValue");
        emailInput.setAttribute("pattern", "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");

        //Time selection dropdown with label
        const timeLabel = document.createElement("label");
        timeLabel.setAttribute("for", "time");
        timeLabel.textContent = "What time?";

        const timeSelect = document.createElement("select");
        timeSelect.setAttribute("id", "timeValue");
        timeSelect.setAttribute("name", "timeValue");
        timeSelect.classList.add("timeSelect");

        // Populate the time dropdown with available times dynamically
        if (availableTimes.length === 0) {
            const noAvailableTimes = document.createElement("span");
            noAvailableTimes.innerHTML = "No available times at this date";
            noAvailableTimes.classList.add("noAvailableTimes");
            bookingWindow.appendChild(noAvailableTimes);
            return;

        } else {
            availableTimes.forEach(time => {
                const timeOption = document.createElement("option");
                timeOption.value = time;
                timeOption.textContent = time;
                timeSelect.appendChild(timeOption);
            });
            bookingWindow.appendChild(timeSelect);
        }

        //Participants dropdown with label
        const amountOfPeopleLabel = document.createElement("label");
        amountOfPeopleLabel.setAttribute("for", "amountOfPeople");
        amountOfPeopleLabel.textContent = "How many participants?";

        const amountOfPeopleInput = document.createElement("input");
        amountOfPeopleInput.classList.add("amountOfPeopleInput");
        amountOfPeopleInput.setAttribute("type", "number");

        const participantMin = Math.min(...participantOptions);
        const participantMax = Math.max(...participantOptions);

        const amountOfPeopleRange = document.createElement("label");
        amountOfPeopleRange.innerHTML = `Allowed participants ${participantMin} - ${participantMax}`;

        //Submit button
        const submitButton = document.createElement("button");
        submitButton.classList.add("submitButton");
        submitButton.innerHTML = "Submit booking";

        //Append elements to the booking window
        bookingWindow.appendChild(nameLabel);
        bookingWindow.appendChild(nameInput);
        bookingWindow.appendChild(emailLabel);
        bookingWindow.appendChild(emailInput);
        bookingWindow.appendChild(timeLabel);
        bookingWindow.appendChild(timeSelect);
        bookingWindow.appendChild(amountOfPeopleLabel);
        bookingWindow.appendChild(amountOfPeopleInput);
        bookingWindow.appendChild(amountOfPeopleRange);
        bookingWindow.appendChild(submitButton);

        //Runs when "Submit booking" is clicked
        submitButton.addEventListener("click", async () => {

            // Validate inputs
            const nameValue = nameInput.value.trim();
            const emailValue = emailInput.value.trim();
            const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const timeValue = timeSelect.value.trim();
            const amountOfPeopleValue = amountOfPeopleInput.value;

            if (!nameValue || !emailValue || !timeValue || !amountOfPeopleValue || amountOfPeopleInput.value < participantMin || amountOfPeopleInput.value > participantMax) {
                if (!emptyDateWarning) {
                    emptyDateWarning = document.createElement("span");
                    emptyDateWarning.classList.add("emptyDateWarning");
                    emptyDateWarning.innerHTML = "Please fill out all the fields.";
                    bookingWindow.appendChild(emptyDateWarning);
                }
                return;
            } else if (!emailFormat.test(emailValue)) {
                if (!emptyDateWarning) {
                    emptyDateWarning = document.createElement("span");
                    emptyDateWarning.classList.add("emptyDateWarning");
                    emptyDateWarning.innerHTML = "Please enter a valid email adress.";
                    bookingWindow.appendChild(emptyDateWarning);
                } else {
                    emptyDateWarning.innerHTML = "Please enter a valid email adress.";
                }
                return;
            } else if (emptyDateWarning) {
                emptyDateWarning.remove();
            }

            //Step 3 content
            roomTitle.remove();
            nameLabel.remove();
            nameInput.remove();
            emailLabel.remove();
            emailInput.remove();
            timeLabel.remove();
            timeSelect.remove();
            amountOfPeopleLabel.remove();
            amountOfPeopleInput.remove();
            submitButton.remove();

            //Added one line of styling to move content to center after button press
            bookingWindow.style.justifyContent = "center";

            const submittedTitle = document.createElement("h1");
            submittedTitle.classList.add("submittedTitle");
            submittedTitle.innerHTML = "Thank you!";

            const submittedButton = document.createElement("button");
            submittedButton.classList.add("submittedButton");
            submittedButton.innerHTML = "Back to challenges";

            bookingWindow.appendChild(submittedTitle);
            bookingWindow.appendChild(submittedButton);

            //POST to API
            const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/booking/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    challenge: challengeId,
                    name: nameValue,
                    email: emailValue,
                    date: selectedDate,
                    time: timeValue,
                    participants: amountOfPeopleValue,
                }),
            });
            const data = await res.json();

            //Close window
            submittedButton.addEventListener("click", () => {
                bookingWindow.remove();
            });
        });
    });
}

//Function to fetch availableTimes for specific date and challengeId
async function fetchAvailableTimes(date, challengeId) {
    try {
        const url = `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${date}&challenge=${challengeId}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error fetching available times: ${response.statusText}`);
        }

        const data = await response.json();

        return data.slots || [];
    } catch (error) {
        console.error("Error fetching available times:", error);
        return [];
    }
}