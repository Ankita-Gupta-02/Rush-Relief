// Function to get items from local storage
export function getCard() {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    return items;
}

// Function to add an item to local storage
export function addCardItem(id) {
    const items = getCard();
    if (!items.includes(id)) {
        items.push(id);
        localStorage.setItem("items", JSON.stringify(items));
    }
}

// Function to remove an item from local storage
export function removeCardItem(id) {
    let items = getCard();
    items = items.filter(item => item !== id);
    localStorage.setItem("items", JSON.stringify(items));
}