const detailArray = document.getElementsByTagName("details");
const expandAllButton = document.getElementById("expandall-toggler");
let i = 0;
let numTimesExpandToggleClicked = 0;
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
        detailArray[i].open = false;
    }
    expandAllButton.style.borderImage = "url(../Math-13-Smolarski-Page/assets/icons/Plus_Border_Expand.png) 20 round";
    return;
}
function expandAllAccordions() {
    for (i = 0; i < detailArray.length; i++) {
        detailArray[i].open = true;
    }
    expandAllButton.style.borderImage = "url(../Math-13-Smolarski-Page/assets/icons/Minus_Border_Collapse.png) 20 round";
    return;
}