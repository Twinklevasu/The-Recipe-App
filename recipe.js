const searchbox = document.querySelector('.searchbox');
const searchbutton = document.querySelector('.searchbutton');
const recipecontainer = document.querySelector('.recipe-container');
const recipeDetailscontent = document.querySelector('.recipe-details-content');
const recipeclosebutton = document.querySelector('.recipe-close-button');


// Function to get recipes
const fetchRecipes = async (query) =>{
      recipecontainer.innerHTML = "<h2>Please wait while we are fetching recipes...</h2>"
      try {
            const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`);
            const response = await data.json();

            recipecontainer.innerHTML = "";
            response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strArea}</span> Dish</p>
                <p> Belongs to <span>${meal.strCategory}</span> Category</p>
                
            
            `
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            // Adding EventListener to recipe button
            button.addEventListener('click' ,()=>{
                  openRecipePopup(meal);

            });


            recipecontainer.appendChild(recipeDiv);
            });
      }
      catch(error){
            recipecontainer.innerHTML = "<h2>Error in fetching recipes,Try again ...</h2>"
      }   
}
// Function to fetch ingredients and measurements 
const fetchIngredients = (meal) => {
      let ingredientsList = "";
      for(let i=1;i<=20;i++) {
            const ingredient = meal[`strIngredient${i}`];
            if(ingredient) {
                  const measure = meal[`strMeasure${i}`];
                  ingredientsList += `<li>${measure} ${ingredient}</li>`
            }
            else {
                  break;
            }
      }   
      return ingredientsList;
}
const openRecipePopup = (meal) => {
      recipeDetailscontent.innerHTML= `
            <h2 class="recipeName">${meal.strMeal}</h2>
            <h3>Ingredients:</h3>
            <ul class="ingredientList">${fetchIngredients(meal)}</ul>
            <div>
                  <h3>Instructions:</h3>
                  <p class="recipeInstructions">${meal.strInstructions}</p>
            </div>

      `;
      
      recipeDetailscontent.parentElement.style.display ="block";
}

recipeclosebutton.addEventListener('click',()=>{
      recipeDetailscontent.parentElement.style.display = "none";

});
searchbutton.addEventListener('click', (e) => {
      e.preventDefault();
      const searchInput = searchbox.value.trim();
      if(!searchInput){
            recipecontainer.innerHTML =`<h2> Type the meal in the Search box.</h2>`;
            return;
      }
      fetchRecipes(searchInput);
      
});
