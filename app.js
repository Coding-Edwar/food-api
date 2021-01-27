const API_URL = 'https://trackapi.nutritionix.com/v2/search' 
const X_APP_ID = '050e0a98'
const X_APP_KEY = '3b310312d9b72ed6b3024c37f58305a3'

/** alternative keys */
// const X_APP_ID = '2b73860b'
// const X_APP_KEY = '3021e4b8b20e1bd8b5bb19d38c129c6c'
const previousSearch = []
const DEBUG = false; //to see helpful notes, set to true

// All items - /instant?query=${searchTerm}
// Single - /item?nix_item_id=${itemId} // `branded.nix_item_id`

const searchBtn = document.querySelector('#food-search');
const input = document.querySelector('#food-query');
const foodDetailsForm = document.querySelector('#food-details')

const singleFormId = document.querySelector('#form-id')

const cacheResults = JSON.parse(getFromStore("allFoods"))

if(cacheResults.length !== 0 ){
    updatePage(cacheResults)    
}

if(getFromStore('query') !== ""){
    input.value = getFromStore('query')
}

// gets all food that matches
async function getAllFood(query){

    if(getFromStore('query') === query){
   
        return JSON.parse(getFromStore("allFoods"))
   
    } else {
        const results = await fetch(`${API_URL}/instant?query=${query}`,{
            headers : {
                'x-app-id' : X_APP_ID ,
                'x-app-key': X_APP_KEY
            }
        });
    
        const data = await results.json()
    
        if(DEBUG) console.log(data);
    
        return data.branded
    }

   

}

searchBtn.addEventListener('click', async () => {

    const query = input.value
    
    const allFoods = await getAllFood(input.value);

    store('allFoods', JSON.stringify(allFoods))
    store('query', input.value)

    if(DEBUG){
        console.log(`Alls matching ${input.value}: `, allFoods);
        // console.log(`The Id of the ID of the first el: `, allFoods[0].nix_item_id);
        // console.log(`More details about the single el: `, singleFood)
    }
    
    if(DEBUG) console.log(previousSearch)

    updatePage(allFoods)

})


function updatePage(data = []){
    const resultsDiv = document.querySelector('#results')

    // clear the results sections first
    resultsDiv.innerHTML = ''

    data.forEach( item => {
        const div = document.createElement('div')

        div.innerHTML = `
            <h3><a href='/details.html?id=${item.nix_item_id}'>${item.food_name} by ${item.brand_name}</a></h3>
            <img src="${item.photo.thumb}" width="150px" height="150px" alt="${item.food_name}">
            <h4>Calories: ${item.nf_calories}</h4>
        
            <hr>
        `
        resultsDiv.appendChild(div)
    })
}

function store(itemName, itemValue){
    window.localStorage.setItem(itemName, itemValue)
}

function getFromStore(item){
    return window.localStorage.getItem(item)
}