document.addEventListener("DOMContentLoaded", () => {
    const elementsWithInfo = document.querySelectorAll("[data-info]");
    elementsWithInfo.forEach(element => {
        // Create the popup element
        const popup = document.createElement("div");
        popup.classList.add("popup-info");
        // Add text and image to the popup
        const text = document.createElement("p");
        text.textContent = element.getAttribute("data-info");
        const img = document.createElement("img");
        img.src = element.getAttribute("data-img");
        img.alt = "Popup image";
        popup.appendChild(text);
        popup.appendChild(img);
        // Append the popup to the body
        document.body.appendChild(popup);
        // Position the popup when hovering over the element
        element.addEventListener("mouseenter", (event) => {
            const rect = element.getBoundingClientRect();
            const popupWidth = popup.offsetWidth;
            const popupHeight = popup.offsetHeight;
            // Position the popup slightly above or below the element
            popup.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (popupWidth / 2)}px`;
            popup.style.top = `${rect.top + window.scrollY - popupHeight - 10}px`;
            // Show the popup
            popup.style.display = "block";
        });
        // Hide the popup when the mouse leaves
        element.addEventListener("mouseleave", () => {
            popup.style.display = "none";
        });
    });
});