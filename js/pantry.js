//Loads localStorage
let pantry = JSON.parse(localStorage.getItem('pantry')),
    pantry_list;
//Populates the pantry element on the page
function loadPantry(){
    pantry_list = document.getElementById('pantry');
    for(let item of pantry){
        addItem(item);
    }
}
function addItem(value){
    let li = document.createElement('li'),
        inp = document.createElement('input'),
        btn = addDeleteButton();
    console.log(pantry_list);
    li.className = 'checkbox';
    inp.type = 'text';
    inp.className = 'pantry_item';
    inp.value = value;
    li.appendChild(inp);
    li.appendChild(btn);
    btn.addEventListener('click', ()=>{
        li.remove();
    });
    pantry_list.appendChild(li);
}
function updatePantry(){
    let pantrylist = document.querySelectorAll('.pantry_item'),
        newpantrylist = [];
        console.log(pantrylist);
    for (let item of pantrylist){
        if(item.value){
            let output = item.value.toLowerCase();
            newpantrylist.push(output);
            console.log(output);
        }
    }
    localStorage.setItem('pantry', JSON.stringify(newpantrylist));
    alert("Your pantry has been updated.");
    location.reload();
}