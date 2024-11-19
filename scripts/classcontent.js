const detailArray = document.getElementsByTagName("details");
const summaryArray = document.getElementsByTagName("summary"); //This is for preventing seizures with the transitions.
const expandAllButton = document.getElementById("expandall-toggler");
let numTimesExpandToggleClicked = 0; //Even is EXPAND ALL, Odd is COLLAPSE ALL 

const query = window.matchMedia(
    '(prefers-reduced-motion: no-preference)');

// HOVER EFFECTS
expandAllButton.addEventListener('mouseover', (event) => {
    if (numTimesExpandToggleClicked % 2 == 0) {
        expandAllButton.style.borderImage = "url(../Math-13-Smolarski-Page/assets/borders/Plus_Border_Expand3.png) 20 round";
    } else {
        expandAllButton.style.borderImage = "url(../Math-13-Smolarski-Page/assets/borders/Minus_Border_Collapse3.png) 20 round";
    }
})

expandAllButton.addEventListener('mouseout', (event) => {
    if (numTimesExpandToggleClicked % 2 == 0) {
        expandAllButton.style.borderImage = "url(../Math-13-Smolarski-Page/assets/borders/Plus_Border_Expand.png) 20 round";
    } else {
        expandAllButton.style.borderImage = "url(../Math-13-Smolarski-Page/assets/borders/Minus_Border_Collapse.png) 20 round";
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
    expandAllButton.style.borderImage = "url(../Math-13-Smolarski-Page/assets/borders/Plus_Border_Expand3.png) 20 round";
    expandAllButton.innerHTML = 'EXPAND ALL';
    if (query.matches) {
        for (i = 0; i < detailArray.length; i++) {
            summaryArray[i].style.transition = "0.1s"; //resetting "out" transition after everything collapses
        }
    }
    return;
}
function expandAllAccordions() {
    for (i = 0; i < detailArray.length; i++) {
        detailArray[i].open = true;
    }
    expandAllButton.style.borderImage = "url(../Math-13-Smolarski-Page/assets/borders/Minus_Border_Collapse3.png) 20 round";
    expandAllButton.innerHTML = 'COLLAPSE ALL';
    return;
}

// SHOW/HIDE PREVIOUS WEEKS
let currDate = Date.now();