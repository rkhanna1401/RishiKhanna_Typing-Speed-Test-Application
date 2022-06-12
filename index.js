const TIME_LIMIT = 60;

let quote_array = [
    "Hello everyone !! This is Advance Javascript assignment -3.",
    "The task is to build speed meter application to test writing speed.",
    "Make sure to read the sentences first.",
    "Good Luck with your test. Do well !!!"
];

let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function update_quote() {
    quote_text.textContent = null;
    current_quote = quote_array[quoteNo];

    current_quote.split('').forEach(char => {
        const chSpan = document.createElement('span')
        chSpan.innerText = char
        quote_text.appendChild(chSpan)
    })

    if (quoteNo < quote_array.length - 1) {
        quoteNo++;
    }
    else {
        quoteNo = 0;
    }
}

function processCurrentText() {
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');

    characterTyped++;

    errors = 0;

    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_input_array[index]

        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');


        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');

        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');

            errors++;
        }
    });


    error_text.textContent = total_errors + errors;


    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);


    if (curr_input.length == current_quote.length) {
        update_quote();

        total_errors += errors;

        input_area.value = "";
    }
}

function startGame() {

    resetValues();
    update_quote();

    // clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the game.';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}


function updateTimer() {
    if (timeLeft > 0) {
        // decrease the current time left
        timeLeft--;

        // increase the time elapsed
        timeElapsed++;

        // update the timer text
        timer_text.textContent = timeLeft + "s";
    }
    else {
        // finish the game
        finishGame();
    }
}

function finishGame() {
    // stop the timer
    clearInterval(timer);

    // disable the input area
    input_area.disabled = true;

    // show finishing text
    quote_text.textContent = "Click on restart to start a new game.";

    // display restart button
    restart_btn.style.display = "block";

    // calculate cpm and wpm
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

    // update cpm and wpm text
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;

    // display the cpm and wpm
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
}
