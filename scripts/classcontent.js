const detailArray = document.getElementsByTagName("details");
function toggleExpandAllAccordions() {
    // array1.forEach((element) => console.log(element));
    let i = 0;

    // detailArray.forEach(details => {
    //     if (details.open) {
    //         details.open = false;
    //     }
    // });

    for (i = 0; i < detailArray.length; i++) {
        if (detailArray[i].open) {
            closeAllAccordions();
            return;
        }
        detailArray[i].open = true;
    }

}

function closeAllAccordions() {
    for (let i = 0; i < detailArray.length; i++) {
        detailArray[i].open = false;
    }
}