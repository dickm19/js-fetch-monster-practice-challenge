const monsterContainer = document.querySelector("#monster-container")
const createMonster = document.querySelector("#create-monster")
const next = document.querySelector("#forward")
const back = document.querySelector("#back")
let page = 1

//create an event listener for forward button
next.addEventListener("click", renderNextPage)

//create a function to render the next page of monsters
function renderNextPage(){
    
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page + 1}`)
    .then(response => response.json())
    .then(data => renderMonsters(data))
    page += 1
}

//create an event listener for the back button
back.addEventListener("click", renderPrevPage)


//create a function to render the previous page
function renderPrevPage(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page - 1}`)
    .then(response => response.json())
    .then(data => renderMonsters(data))
    page -= 1
}

//creating a monster form dynamically
const monsterForm = document.createElement("form")
monsterForm.setAttribute("method", "post")
monsterForm.setAttribute("action", "submit")
createMonster.append(monsterForm)

//create input field for name
const name = document.createElement("input");
name.setAttribute("type", "text");
name.setAttribute("name", "Name");
name.setAttribute("placeholder", "Name");
monsterForm.append(name)

//create an input field for age
const age = document.createElement("input")
age.setAttribute("type", "number")
age.setAttribute("name", "Age")
age.setAttribute("placeholder", "Age")
monsterForm.append(age)

//create an input field for description
const description = document.createElement("input")
description.setAttribute("type", "text")
description.setAttribute("name", "Description")
description.setAttribute("placeholder", "Description")
monsterForm.append(description)


//create a submit button
const submit = document.createElement("input")
submit.setAttribute("type", "submit")
submit.setAttribute("value", "submit")
monsterForm.append(submit)

//add event listener to monster form
monsterForm.addEventListener("submit", function(event) {
    event.preventDefault()

    //creating name, age, and description attributes for new monster
    const name = event.target["Name"].value
    const age = event.target["Age"].value
    const description = event.target["Description"].value

    //assigning form values to new monster
    const monsterObj = {
        name: name,
        age: age,
        description: description
    }

    //clearing form fields
    event.target.reset()

    //fetch request to post and render new monster
   return fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(monsterObj),
    })
    .then(response => response.json())
    .then(newMonsterObj => {
  
      renderMonster(newMonsterObj)
    })
    
})


//create a render monster function
function renderMonster(monster){

    //create monster card element
    const card = document.createElement("div")

    //create ID for each monster
    card.dataset.id = monster.id

    //create element for monster name
    const h1 = document.createElement("h1")
    h1.textContent = monster.name

    //create element for monster age
    const h3 = document.createElement("h3")
    h3.textContent = monster.age

    //create element for monster description
    const p = document.createElement("p")
    p.textContent = monster.description

    //append all elements to monster card
    card.append(h1, h3, p)

    //append card to monster container
    monsterContainer.append(card)

}

//render multiple monsters function
function renderMonsters(monsters){
    monsters.forEach(renderMonster)
}

//fetch request for all created monsters in API

fetch("http://localhost:3000/monsters/?_limit=50&_page=")
.then(response => response.json())
.then(data => renderMonsters(data))