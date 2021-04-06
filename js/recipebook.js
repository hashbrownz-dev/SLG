let recipebook,
    recipes = JSON.parse(localStorage.getItem('recipes')),
    current = sessionStorage.getItem('current');

function loadRecipes(){
    recipebook = document.getElementById('recipebook');
    for(let recipe of recipes){
        let div = document.createElement('div'),
            span = document.createElement('span'),
            edit = addDeleteButton('edit'),
            del = addDeleteButton();
        div.className = 'recipe';
        div.id = recipe.name;
        span.appendChild(document.createTextNode(recipe.name));
        div.appendChild(span);
        div.appendChild(edit);
        div.appendChild(del);
        recipebook.appendChild(div);
        //add the event listeners
        div.addEventListener('click', ()=>{
            console.log("view");
            sessionStorage.setItem('current', recipe.name);
            window.location.href = 'viewrecipe.html';
        });
        edit.addEventListener('click', ()=>{
            console.log("edit");
            sessionStorage.setItem('current', recipe.name);
            window.location.href = 'editrecipe.html';
            event.stopPropagation();
        });
        del.addEventListener('click', ()=>{
            console.log("delete");
            if(confirm('Are you sure you would like to delete '+recipe.name+' from your recipe book?')){
                deleteRecipe(recipe.name);
            }
            event.stopPropagation();
        })
    }
}
function viewRecipe(){
    for(let r of recipes){
        if(r.name == current){
            let title = document.querySelector('#page_title > h2');
            title.innerHTML = r.name;
            //load the ingredients
            let ingredients = document.querySelector('.component.ingredients');
            for(let i of r.ingredients){
                console.log(i);
                let li = document.createElement('li'),
                    t = document.createTextNode(i.amount + ' ' + i.unit + ' ' +i.name);
                li.appendChild(t);
                ingredients.appendChild(li);
            }
            //load the directions
            let directions = document.querySelector('.component.directions');
            for(let d of r.directions){
                let li = document.createElement('li'),
                    t = document.createTextNode(d);
                li.appendChild(t);
                directions.appendChild(li);
                console.log(d);
            }
        }
    }
}
function editRecipe(){
    for(let r of recipes){
        if(r.name == current){
            let n = document.querySelector('#name');
            n.value = r.name;
            //load the ingredients
            for(let i of r.ingredients){
                addIngredient(i.amount + ' ' + i.unit + ' ' + i.name);
            }
            //load the directions
            for(let d of r.directions){
                addDirection(d);
            }
        }
    }
}
function deleteRecipe(recipe){
    let i;
    for(let r of recipes){
        if(r.name == recipe){
            i = recipes.indexOf(r);
        }
    }
    recipes.splice(i,1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    document.getElementById(recipe).remove();
}
function saveRecipe(){
    let name = document.getElementById('name').value,
        ingredients = [],
        directions = [];
    //Populate the ingredients array
    for(let i of document.getElementsByClassName('component ingredient')){
        if(i.firstChild.value)ingredients.push(parseIngredient(i.firstChild.value));
    }
    //Populate the directions array
    for(let d of document.getElementsByClassName('component direction')){
        if(d.firstChild.value)directions.push(d.firstChild.value);
    }
    //Create a new Recipe Object
    let recipe = new Recipe(name,ingredients,directions);
    //Check to see if we are updating an existing recipe, or creating a new one.
    let update, //a boolean
        ind;    //the index of the recipe to update.
    for(let r of recipes){
        if(r.name == recipe.name){
            update = true;
            ind = recipes.indexOf(r);
            break;
        }
    }
    if(update == true){
        recipes.splice(ind,1,recipe);
    }else{
        recipes.push(recipe);
    }
    //save recipes to localStorage
    localStorage.setItem('recipes', JSON.stringify(recipes));
    alert(name + ' has been saved successfully.');
    window.location.href = 'recipebook.html';
}
function cancelRecipe(){
    if(confirm('Are you sure?  Any unsaved changes will be lost.')){
        window.location.href = 'recipebook.html';
    }
}
function addIngredient(value){
    let ingredients = document.getElementById('ingredients'),
        li = document.createElement('li'),
        input = document.createElement('input'),
        button = addDeleteButton();
    li.className = 'component ingredient';
    input.type = 'text';
    input.className = 'input';
    if(value)input.value = value;
    li.appendChild(input);
    li.appendChild(button);
    ingredients.appendChild(li);
    //add event listeners
    button.addEventListener('click', ()=>{
        button.parentNode.remove();
    });
}
function addDirection(value){
    let directions = document.getElementById('directions'),
        li = document.createElement('li'),
        txt = document.createElement('textarea'),
        up = addDeleteButton('up'),
        down = addDeleteButton('down'),
        del = addDeleteButton();
    li.className = 'component direction';
    txt.className = 'input';
    txt.maxlength = '500';
    if(value)txt.value = value;
    li.appendChild(txt);
    li.appendChild(up);
    li.appendChild(down);
    li.appendChild(del);
    directions.appendChild(li);
    //add event listeners
    up.addEventListener('click', ()=> {
        moveDirection('up', li);
    });
    down.addEventListener('click', ()=> {
        moveDirection('down', li);
    });
    del.addEventListener('click', ()=> {
        del.parentNode.remove();
    });
}
function moveDirection(dir, li){
    if(dir == 'up'){
        if(li.previousSibling){
            li.parentNode.insertBefore(li, li.previousSibling);
        }
    }
    if(dir == 'down'){
        if(li.nextSibling){
            li.parentNode.insertBefore(li.nextSibling, li);
        }
    }
}
function parseIngredient(ingredient){
    let units = /teaspoons?|tsp\.?\b|tablespoons?|tbsp\.?\b|tb\.?\b|fluid\sounces?|fl\.?\soz\.?\b|cups?|pints?|pt\.?\b|quarts?|qt\.?\b|gallons?|gal\.?\b|pounds?|lbs?\.?\b|ounces?|oz\.?/i,
        numbers = /\d+(.\d+)?\s?/;
    let amount,
        unit,
        name;
    amount = Number(ingredient.match(numbers)[0]);
    ingredient = ingredient.replace(numbers,'');
    unit = ingredient.match(units);
    ingredient = ingredient.replace(units,'');
    name = ingredient.replace(/^\s+/, ''); //removes any spaces at the beginning
    name = name.replace(/\s+$/, ''); //removes any spaces at the end
    if(unit){
        unit=unit.join();
    }else{
        unit = '';
    }
    return new Ingredient(amount,unit,name);
}