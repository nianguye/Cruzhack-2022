var myToken = 'e07f3b33321145d381afbf99809a4c11';

var sampleData = { results: 
   [ { id: 716426,
       title: 'Cauliflower, Brown Rice, and Vegetable Fried Rice',
       image: 'https://spoonacular.com/recipeImages/716426-312x231.jpg',
       imageType: 'jpg',
       price: 1.1549 },
     { id: 644826,
       title: 'Gluten Free Dairy Free Sugar Free Chinese Chicken Salad',
       image: 'https://spoonacular.com/recipeImages/644826-312x231.jpg',
       imageType: 'jpg',
       price: 3.0593 },
     { id: 716311,
       title: 'Mango Fried Rice',
       image: 'https://spoonacular.com/recipeImages/716311-312x231.jpg',
       imageType: 'jpg',
       price: 1.4040000000000001 },
     { id: 660231,
       title: 'Skinny Veggie Fried Rice',
       image: 'https://spoonacular.com/recipeImages/660231-312x231.jpg',
       imageType: 'jpg',
       price: 1.4043999999999999 },
     { id: 663150,
       title: 'Thai Savory Brown Fried Rice',
       image: 'https://spoonacular.com/recipeImages/663150-312x231.jpg',
       imageType: 'jpg',
       price: 1.5621 },
     { id: 638642,
       title: 'Chinese Chicken Salad With Chipotle Dressing',
       image: 'https://spoonacular.com/recipeImages/638642-312x231.jpg',
       imageType: 'jpg',
       price: 2.9488 },
     { id: 638649,
       title: 'Chinese Chicken Salad With Creamy Soy Dressing',
       image: 'https://spoonacular.com/recipeImages/638649-312x231.jpg',
       imageType: 'jpg',
       price: 8.2527999999999997 },
     { id: 638369,
       title: 'Korean Sweet n Sour Chicken',
       image: 'https://spoonacular.com/recipeImages/638369-312x231.jpg',
       imageType: 'jpg',
       price: 12.6708 },
     { id: 661351,
       title: 'Spinach Soup With Wontons',
       image: 'https://spoonacular.com/recipeImages/661351-312x231.jpg',
       imageType: 'jpg',
       price: 15.4249 },
     { id: 663169,
       title: 'Thai Veggie Slaw with Peanut Dressing and Crispy Wontons',
       image: 'https://spoonacular.com/recipeImages/663169-312x231.jpg',
       imageType: 'jpg',
       price: 1000.7844 } ],
  offset: 0,
  number: 10,
  totalResults: 45 };

function fetchSearchResults(ans) {
        // const baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${myToken}&cuisine=${cuisine}&number=1&instructionsRequired=True&type=${course}`;

        // const response = await fetch(baseURL);
        // const data = await response.json();
        
        return sampleData;
} 

async function fetchPrices(results) {
        // for (var i = 0; i < results["results"].length; i++) {
        //     var id = results["results"][i]["id"];
        //     const baseURL = `https://api.spoonacular.com/recipes/${id}/priceBreakdownWidget.json?apiKey=${myToken}`;
        //     const response = await fetch(baseURL);
        //     const priceData = await response.json();
            
        //     results["results"][i]["price"] = priceData["totalCostPerServing"]/100;
        // }
        
        return sampleData;
}

// id = blah["results"][i][0]
// https://api.spoonacular.com/recipes/${id}/priceBreakdownWidget.json

function displayResults(ans) {
    // Takes in data from fetchAPI and returns an element that you can show on the website
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement  
    // Set up results & price data
    const searchResults = fetchSearchResults(ans);
    resultsWithPrice = sampleData;
    // Filter recipes that fall into budget
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    for (var i = resultsWithPrice["results"].length - 1; i >= 0; i--) {
        var budget = +ans[1];
        var recipePrice = resultsWithPrice["results"][i]["price"];
        
        if (!(budget - 5 < recipePrice && recipePrice < budget)) {
            // Recipe does not fall into price range.
            resultsWithPrice["results"].splice(i, 1);
        }
        console.log(recipePrice, +ans[1]);
    }
    console.log(resultsWithPrice);
}

var userAnswers = [];

function slideCard(card) {
    // 1.) Slide the current card left
    card.classList.add('move-left');
    // 2.) Get the next card
    const nextCardOrder = +card.dataset.cardOrder + 1;
    const nextCard = document.querySelector(`[data-card-order='${nextCardOrder}']`)
    // 3.) Show the next card
    nextCard.style.display = "flex";
}

// Add an click event listener to all answers
const allAnswers = Array.from(document.querySelectorAll('.js-question-answer'))
allAnswers.forEach((answer) => {
    answer.addEventListener('click', (e) => {
        const card = answer.parentNode.parentNode;
        userAnswers.push(answer.value);
        if (userAnswers.length === 3){
            displayResults(userAnswers);
        }
        // Make the slide animation happen when you click on an answer
        slideCard(card);
    })
})

