//Populate #meals

function loadMeals(){
    let meals = JSON.parse(localStorage.getItem('recipes')),
        meallist = document.getElementById('meals');
    for(let meal of meals){
        let li = document.createElement('li');
        li.className = 'checkbox';
        li.id = meal.name;
        li.innerHTML = meal.name;
        makeCheckbox(li);
        meallist.appendChild(li);
    }
}

//Populate #pantry

function loadPantry(){
    let pantry = JSON.parse(localStorage.getItem('pantry')),
        pantrylist = document.getElementById('pantry');
    for(let item of pantry){
        let li = document.createElement('li');
        li.className = "checkbox";
        li.id = item;
        li.innerHTML = item;
        makeCheckbox(li);
        pantrylist.appendChild(li);
    }
}

//Save
//this function takes a snapshot of shoppinglist.html and saves it to local storage.
function saveShoppingList(){
    let meals = document.querySelectorAll('#meals > .checked'),
        items = document.querySelectorAll('#pantry > .checked'),
        misc = document.getElementById('misc_items').value;
    let shoppinglist = new ShoppingList(getId(meals),getId(items),misc);
    //save shopping list to local storage
    localStorage.setItem('shoppinglist', JSON.stringify(shoppinglist));
    console.log(shoppinglist);
    return shoppinglist;
}
//Load
function loadShoppingList(){
    let list = JSON.parse(localStorage.getItem('shoppinglist'));
    //meals
    let meals = document.querySelectorAll('#meals > .checkbox');
    for(let meal of meals){
        for(let m of list.meals){
            if(meal.id == m){
                meal.className = 'checkbox checked';
            }
        }
    }
    //pantry
    let pantry = document.querySelectorAll('#pantry > .checkbox');
    for(let item of pantry){
        for(let i of list.items){
            if(item.id == i){
                item.className = 'checkbox checked';
            }
        }
    }
    //misc
    let misc = document.getElementById('misc_items');
    misc.value = list.misc;
}
//View
function viewShoppingList(){
    let s = JSON.parse(localStorage.getItem('shoppinglist')),
        element = document.getElementById('shoppinglist'),
        shoppingList = new ShoppingList(s.meals, s.items, s.misc);
    //Cycle through the list and create li elements
    for(let item of shoppingList.List){
        let li = document.createElement('li');
        li.className = 'checkbox';
        li.appendChild(document.createTextNode(item));
        element.appendChild(li);
        //add event listener
        li.addEventListener('click', () => {
            if(/disabled/.test(li.className)){
                li.className = 'checkbox';
            }else{
                li.className = 'checkbox disabled';
            }
        });
    }
}
//Clear
function clearShoppingList(){
    let clear = new ShoppingList();
    localStorage.setItem('shoppinglist', JSON.stringify(clear));
    window.location.href = 'shoppinglist.html';
}