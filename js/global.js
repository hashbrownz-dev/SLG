/*=== CLASS DEFINITIONS ===*/

//Shopping List

class ShoppingList{
    constructor(meals, items, misc){
        this.meals = meals;
        this.items = items;
        this.misc = misc;
    }

    //Returns misc items as an array
    get Misc(){
        if(this.misc){
            return this.misc.split(/,\s*/);
        }
    }

    //Returns an array that contains all of the items
    get List(){
        let list = [],
            recipes = JSON.parse(localStorage.getItem('recipes'));
        //Recipe Ingredients
        for (let meal of this.meals){
            for(let recipe of recipes){
                if(meal == recipe.name){
                    //list = list.concat(recipe.Ingredients);
                    for(let r of recipe.ingredients){
                        list.push(r.name);
                    }
                }
            }
        }
        //Pantry and Misc Items
        list = list.concat(this.items);
        if(this.misc)list = list.concat(this.Misc);

        //Remove Duplicate Items
        list = removeDuplicates(list);

        return list;
    }
}

class Recipe{
    constructor(name, ingredients, directions){
        this.name = name;
        this.ingredients = ingredients;
        this.directions = directions;
    }

    //Returns an array containing the names of all the ingredients.
    get Ingredients(){
        let i = [];
        for(let ingredient of this.ingredients){
            i.push(ingredient.name);
        }
        return i;
    }
}

class Ingredient{
    constructor(amount, unit, name){
        this.amount = amount;
        this.unit = unit;
        this.name = name;
    }
}

/*=== BUTTONS ===*/
//delete_button additional classes: up, down, edit
//!!!THIS FEATURE IS SUBJECT TO CHANGE IN THE NEXT UPDATE
const del = '&#x2716',
    up = '&#x2bc5',
    down = '&#x2bc6',
    edit = '&#x2703';

function addDeleteButton(cName){
    let txt = '';
    let c = 'delete_button';
    let btn = document.createElement('button');
    btn.type = 'button';
    switch(cName){
        case 'up':
            txt = up;
            c += ' up';
            break;
        case 'down':
            txt = down;
            c += ' down';
            break;
        case 'edit':
            txt = edit;
            c += ' edit';
            break;
        default:
            txt = del;
            break;
    }
    btn.className = c;
    btn.innerHTML = txt;
    return btn;
}

//Navigation (hamburger)
function navButton(){
    document.getElementById('hamburger').addEventListener('click', ()=> {
        if(document.getElementById('nav').style.top == '98px'){
            document.getElementById('nav').style.top = '-240px';
        }else{
            document.getElementById('nav').style.top = '98px';
        }
    });
}

//Checkboxes
function makeCheckbox(target){
    target.addEventListener('click', () => {
        if(/checked/.test(target.className)){
            target.className = "checkbox";
        }else{
            target.className = "checkbox checked";
        }
    });
}

/*=== FUNCTIONS ===*/

//A function that takes a nodelist and returns the ids of each element as an array of strings.
function getId(nl){
    let a = [];
    for(let n of nl){
        a.push(n.id);
    }
    return a;
}

//A function that removes duplicate items from a list
function removeDuplicates(oldarray){
	let newarray = oldarray;
	for(let i = 0; i<newarray.length; i++){
		let test = newarray[i];
		for(let j = i+1; j<newarray.length; j++){
			if(test == newarray[j])newarray.splice(j,1);
		}
	}
	return newarray;
}