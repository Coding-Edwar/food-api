const API_URL = 'https://trackapi.nutritionix.com/v2/search' 
const X_APP_ID = '050e0a98'
const X_APP_KEY = '3b310312d9b72ed6b3024c37f58305a3'

//1. Get the ID via the queryString from the current URL
const queryString = window.location.search
const params = new URLSearchParams(queryString); // create a new object
const id = params.get('id')
// method chaining
getSingleFood(id)
    .then(item =>updatePage(item))
    // .then(item =>updatePage(item))


function updatePage(item = {}){
    document.querySelector('#details')
        .innerHTML = `
            <h3>${item.food_name} by ${item.brand_name}</h3>
            <img src="${item.photo.thumb}" alt="${item.food_name}">
            <p>${item.nf_ingredient_statement}</p>
        `
}
//2. Use the ID to query the API
async function getSingleFood(itemId){
    const results = await fetch(`${API_URL}/item?nix_item_id=${itemId}`,{
        headers : {
            'x-app-id' : X_APP_ID,
            'x-app-key': X_APP_KEY
        }
    });

    const data = await results.json()

    return data.foods[0]
}

//3. update the page with data...
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
