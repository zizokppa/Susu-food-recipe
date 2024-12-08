document.getElementById("searchButton").addEventListener("click", async () => {
    const ingredient = document.getElementById("ingredient").value.trim();
    const resultsDiv = document.getElementById("results");


    resultsDiv.innerHTML = "";

    if (!ingredient) {
        resultsDiv.textContent = "✨ Please enter an ingredient! ✨";
        return;
    }

    try {
       
        const response = await fetch("https://raw.githubusercontent.com/SusannaShu/susu-meal-prep/main/data.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

 
        const formattedIngredient = ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase();
        const item = data[formattedIngredient];

        if (!item) {
            resultsDiv.textContent = `🍭 No information found for "${ingredient}". 🍭`;
            return;
        }


        resultsDiv.innerHTML = `
            <h2>${formattedIngredient}</h2>
            <img src="${item.image}" alt="${formattedIngredient}" style="width: 100%; border-radius: 8px;">
            <p><strong>Description:</strong> ${item.description}</p>
            <p><strong>Tips:</strong> ${item.tip.join(", ")}</p>
            <p><strong>Risks:</strong> ${item.risk.join(", ")}</p>
            <p><strong>Storage Solution:</strong> ${item.meal_prep_solution}</p>
            <p><strong>Random Fact:</strong> ${item.random_fact}</p>
            <p><strong>Storage Time:</strong> ${item.storage_time}</p>
            <hr>
            <h3>${item.cuisine.name} (${item.cuisine.origin})</h3>
            <img src="${item.cuisine.image}" alt="${item.cuisine.name}" style="width: 100%; border-radius: 8px;">
        `;
    } catch (error) {
        resultsDiv.textContent = `🚨 Error fetching data: ${error.message} 🚨`;
        console.error("Fetch error:", error);
    }
});

document.getElementById("clearResults").addEventListener("click", () => {
    document.getElementById("results").innerHTML = "";
});

