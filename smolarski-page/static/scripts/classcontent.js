// EDIT ME, MR. SMOLARSKI!
const startDateOfQuarter = new Date("2024-09-23")
const startDate_in_ms = startDateOfQuarter.getTime();

const lastUpdatedText = document.getElementById("last-updated");
const lastModified = new Date(document.lastModified);
// Format using Intl.DateTimeFormat
const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
});
const formattedDate = formatter.format(lastModified);
lastUpdatedText.append(formattedDate);


const detailArray = document.getElementsByClassName("week-details");
const summaryArray = document.getElementsByTagName("summary"); //This is for preventing seizures with the transitions.
const expandAllButton = document.getElementById("expandall-toggler");
const inactiveAccordion = document.getElementById("inactive-toggler");
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
let currDate = new Date("2024-10-22"); //requires time-traveling to test, should be just new Date() by default
let currDate_in_ms = currDate.getTime();

// Difference in milliseconds
const differenceInMs = currDate - startDateOfQuarter;
// Difference in days (aka days since start of quarter)
const differenceInWeeks = msToWeeks(differenceInMs);

const msPerDay = 1000 * 60 * 60 * 24;
const msPerWeek = msPerDay * 7;

function inactiveToggleHandler() {
    if (inactiveAccordion.open) {
        showInactiveWeeks();
    } else {
        hideInactiveWeeks();
    }
}

// DISPLAYING " [CURRENT]" ON THE CURRENT WEEK OF THE QUARTER
const currDisplay = document.createElement("h4")
currDisplay.textContent = " [CURRENT]"
currDisplay.style.color = "red"
currDisplay.style.display = "inline"

const mondayWarning = document.createElement("h5")
mondayWarning.textContent = " [DOUBLE-CHECK FOR MONDAY-DUE ASSIGNMENTS]"
mondayWarning.style.color = "darkgray"
mondayWarning.style.display = "inline"


let weekHeaderArray = document.getElementsByClassName("week-header");
let currWeekOfQuarter = Math.ceil(msToWeeks(Math.abs(currDate_in_ms)) - msToWeeks(startDate_in_ms))
weekHeaderArray[currWeekOfQuarter].append(currDisplay)
weekHeaderArray[currWeekOfQuarter - 1].append(mondayWarning)

console.log("The current week is", currWeekOfQuarter)

function hideInactiveWeeks() {
    for (i = 0; i < detailArray.length; i++) {
        let targetWeek = i * msPerWeek + startDate_in_ms;
        // If the difference is greater than 2 weeks + Monday, then hide.
        if (msToWeeks((currDate_in_ms - targetWeek)) > msToWeeks(msPerWeek)) {
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

function msToDays(totalMilliseconds) {
    let msPerDay = 1000 * 60 * 60 * 24;
    return totalMilliseconds / msPerDay
}
let chadModeActivated = Boolean(false);
const smolarskiFace = document.getElementById("cool-math-teacher");
function toggleGigaChad() {
    if (!chadModeActivated) {
        smolarskiFace.src = "/icons/icons/smolarski-true-form.png"
    } else {
        smolarskiFace.src = "/icons/icons/smolarski-moji.png"
    }
    chadModeActivated = !chadModeActivated;
}