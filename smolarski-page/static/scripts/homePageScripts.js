

document.addEventListener("DOMContentLoaded", () => {
    const elementsWithInfo = document.querySelectorAll("[data-info]");
    elementsWithInfo.forEach(element => {

        const popup = document.createElement("div");
        popup.classList.add("popup-info");

        const text = document.createElement("p");
        text.textContent = element.getAttribute("data-info");
        const img = document.createElement("img");
        img.src = element.getAttribute("data-img");
        img.alt = "Popup image";
        popup.appendChild(text);
        popup.appendChild(img);

        document.body.appendChild(popup);

        element.addEventListener("mouseenter", (event) => {
            const rect = element.getBoundingClientRect();
            const popupWidth = popup.offsetWidth;
            const popupHeight = popup.offsetHeight;

            popup.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (popupWidth / 2)}px`;
            popup.style.top = `${rect.top + window.scrollY - popupHeight - 10}px`;

            popup.style.display = "block";
        });

        element.addEventListener("mouseleave", () => {
            popup.style.display = "none";
        });
    });
});