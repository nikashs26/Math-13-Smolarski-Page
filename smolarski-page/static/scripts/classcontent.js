const detailArray = document.getElementsByTagName("details");
const summaryArray = document.getElementsByTagName("summary"); //This is for preventing seizures with the transitions.
const expandAllButton = document.getElementById("expandall-toggler");
const inactiveCheckbox = document.getElementById("prev-weeks");
let numTimesExpandToggleClicked = 0; //Even is EXPAND ALL, Odd is COLLAPSE ALL 

const query = window.matchMedia(
    '(prefers-reduced-motion: no-preference)');

// HOVER EFFECTS
expandAllButton.addEventListener('mouseover', (event) => {
    if (numTimesExpandToggleClicked % 2 == 0) {
        expandAllButton.style.borderImage = "url(icons/borders/Plus_Border_Expand3.png) 20 round";
    } else {
        expandAllButton.style.borderImage = "url(icons/borders/Minus_Border_Collapse3.png) 20 round";
    }
})

expandAllButton.addEventListener('mouseout', (event) => {
    if (numTimesExpandToggleClicked % 2 == 0) {
        expandAllButton.style.borderImage = "url(icons/borders/Plus_Border_Expand.png) 20 round";
    } else {
        expandAllButton.style.borderImage = "url(icons/borders/Minus_Border_Collapse.png) 20 round";
    }
})

// "EXPAND/COLLAPSE ALL" BUTTON
let i = 0;
function toggleExpandAllAccordions() {
    for (i = 0; i < detailArray.length; i++) {
        if (numTimesExpandToggleClicked % 2 == 0) {
            expandAllAccordions();
        } else {
            closeAllAccordions();
        }
    }
    numTimesExpandToggleClicked++;
}

function closeAllAccordions() {
    for (i = 0; i < detailArray.length; i++) {
        summaryArray[i].style.transition = "none"; //seizure prevention in action
        detailArray[i].open = false;
    }
    expandAllButton.style.borderImage = "url(icons/borders/Plus_Border_Expand3.png) 20 round";
    expandAllButton.innerHTML = 'EXPAND ALL';
    setTimeout(() => {
        // Code to be executed after 5 seconds
        for (i = 0; i < detailArray.length; i++) {
            summaryArray[i].style.transition = "0.3s";
        }
    }, 300);


    return;
}
function expandAllAccordions() {
    for (i = 0; i < detailArray.length; i++) {
        detailArray[i].open = true;
    }
    expandAllButton.style.borderImage = "url(icons/borders/Minus_Border_Collapse3.png) 20 round";
    expandAllButton.innerHTML = 'COLLAPSE ALL';
    return;
}

// SHOW/HIDE PREVIOUS WEEKS
let currDate = new Date("2024-10-25"); //to the past to test it
let currDate_in_ms = currDate.getTime();
let startDateOfQuarter = new Date("2024-09-23")
let startDate_in_ms = startDateOfQuarter.getTime();

// Difference in milliseconds
const differenceInMs = currDate - startDateOfQuarter;
// Difference in days (aka days since start of quarter)
const differenceInWeeks = msToWeeks(differenceInMs);

const msPerWeek = 1000 * 60 * 60 * 24 * 7;

function inactiveToggleHandler() {
    if (inactiveCheckbox.checked) {
        showInactiveWeeks();
    } else {
        hideInactiveWeeks();
    }
}


function hideInactiveWeeks() {
    for (i = 0; i < detailArray.length; i++) {
        let targetWeek = i * msPerWeek + startDate_in_ms;
        if (msToWeeks((currDate_in_ms - targetWeek)) > msToWeeks(2 * msPerWeek)) {
            detailArray[i].style.display = "none";
            console.log(msToWeeks(Math.abs(currDate_in_ms - targetWeek)), " is less than ", msToWeeks(2 * msPerWeek))
        } else {
            console.log("not hiding")
            console.log(msToWeeks(Math.abs(currDate_in_ms - targetWeek)), " is greater than than ", msToWeeks(2 * msPerWeek))
        }
    }
}

function showInactiveWeeks() {
    for (i = 0; i < detailArray.length; i++) {
        if (detailArray[i].style.display = "none") {
            detailArray[i].style.display = "list-item";
        } else {
            return;
        }
    }
}

function msToWeeks(totalMilliseconds) {
    let msPerWeek = 1000 * 60 * 60 * 24 * 7;
    return totalMilliseconds / msPerWeek;
}
