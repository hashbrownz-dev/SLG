//Initialize App
//This runs upon the first time visiting the site.

function init(){
    //Create Defaults
    let sample_recipes = [],
        s1_ing = [],
        s2_ing = [],
        s1_dir = [],
        s2_dir = [];

    //Sample Recipe 1 Ingredients:
    s1_ing.push(new Ingredient(2, 'tablespoon','extra-virgin olive oil'));
    s1_ing.push(new Ingredient(0.5, 'teaspoon', 'kosher salt'));
    s1_ing.push(new Ingredient(1, 'cup', 'corn'));
    s1_ing.push(new Ingredient(1,'whole', 'jalapeno'));
    s1_ing.push(new Ingredient(2,'tablespoon','cilantro'));
    s1_ing.push(new Ingredient(2,'tablespoon','red onion'));
    s1_ing.push(new Ingredient(2,'tablespoon','fresh lime juice'));
    s1_ing.push(new Ingredient(1,'teaspoon','sugar'));

    //Sample Recipe 2 Ingredients
    s2_ing.push(new Ingredient(2,'whole','cucumber'));
    s2_ing.push(new Ingredient(0.5,'cup','rice wine vinegar'));
    s2_ing.push(new Ingredient(0.5,'cup','water'));
    s2_ing.push(new Ingredient(0.25,'cup','granulated sugar'));
    s2_ing.push(new Ingredient(0.25,'teaspoon','salt'));
    s2_ing.push(new Ingredient(1,'half','red onion'));

    //Sample Recipe 1 Directions
    s1_dir = ["If using fresh corn, bring a small pot of salted water to a boil.  Add the corn and cook until tender, 2 to 3 minutes; drain.",  "Chop and seed the Jalapeno, red onion, and cilantro.", "Mix the corn (if using frozen, add it here), jalapeno, cilantro, and red onion in a bowl.","Stir in the olive oil, lime juice, sugar and salt"];
    s2_dir = ["In a medium bowl combine water, vinegar, sugar, and salt.  Stir until dissolved.", "Peel, chop, and seed cucumbers.  Slice red onion into thin slices.","Add in the cucumbers and onions and mix until combined.", "Let marinate in refrigerator for 1 hour"];

    //Adding both recipes to the sample recipe array.
    sample_recipes.push(new Recipe('Corn Salsa', s1_ing, s1_dir));
    sample_recipes.push(new Recipe('Cucumber Salad', s2_ing, s2_dir));

    //create recipes item in localStorage with default values
    localStorage.setItem('recipes', JSON.stringify(sample_recipes));
    console.log("Default recipes have been saved to localStorage.");

    //create default pantry items
    let sample_pantry = ['milk', 'eggs', 'butter', 'oil', 'bread', 'rice', 'pasta'];
    localStorage.setItem('pantry', JSON.stringify(sample_pantry));
    console.log("Default pantry items have been saved to localStorage");

    //create a default shopping list
    let sample_list = new ShoppingList(['corn salsa'],['milk','butter','bread']);
    localStorage.setItem('shoppinglist', JSON.stringify(sample_list));
    console.log("The default shopping list has been saved to localStorage");  
}