// creating an brewery img
let breweryImg=document.createElement("img");
breweryImg.setAttribute("src","brewery-icon.png")
// creating a header
let header = document.createElement("h1");
header.innerText = "BREWERY DATABASE";
// creating an input field
let inputField = document.createElement("input");
inputField.setAttribute("type", "text");
inputField.setAttribute("name", "search");
inputField.setAttribute("placeholder", "Search for Brewery's info.....");
inputField.setAttribute("id", "input");
// creating an div to align breweryImg,header,inputField
let div = document.createElement("div");
div.append(breweryImg,header, inputField);
document.body.append(div);
// creating a container and row
let container = document.createElement("div");
container.setAttribute("class", "container");
let row = document.createElement("div");
row.setAttribute("class", "row");
// Append container and row to the body
document.body.append(container);
container.append(row);
// Function to display data
function displayData(data) {
    row.innerHTML = ""; // Clear previous data
    for (let i in data) {
        row.innerHTML += `
            <div class="col-md-4">
                <div class="card border-white" style="max-width: 18rem;max-height:20rem;margin-bottom:10px;">
                    <h5 class="card-header text-dark">${data[i].name}</h5>
                    <div class="card-body text-dark">
                        <h5 class="card-title">Type: ${data[i].brewery_type}</h5>
                        <h5 class="card-title">Address: ${data[i].address_1}</h5>
                        <h5 class="card-title">Phone-No: ${data[i].phone}</h5>
                        <div class="card-footer bg-transparent">
                            <a href="${data[i].website_url}">
                                <button class="text-white border-dark" type="button">Click for website</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}
// To retrieve data from the API using an async function
async function fetchData() {
    try {
        let response = await fetch("https://api.openbrewerydb.org/v1/breweries");
        let data = await response.json();
        displayData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
// Calling fetchData while page loading
fetchData();
// Adding event listener to the input field for search functionality/filter
inputField.addEventListener("keyup", async (event) => {
    let searchTerm = event.target.value.toLowerCase();
    try {
        let response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_name=${searchTerm}`);
        let data = await response.json();
        displayData(data);
    } catch (error) {
        console.error("Error searching:", error);
    }
});
