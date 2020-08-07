const getPeople = () => {
fetch ('http://swapi.dev/api/people/')
.then(resp => resp.json())
.then(list => {
const people = list.results;

const redefinePerson = (person, idx) => {
    return {
        name: person.name,
        weight: person.mass,
        height: person.height,
        skin_color: person.skin_color,
        id: idx

     }
   }
const myPeopleArray = people.map(redefinePerson)
 console.log(myPeopleArray);



const cardHTML = myPeopleArray.map(person => {
    return `
     <div class="scene">
      <div class="card">
      <div class="card__face card__face--front"><img id="img" src ='/SWImg/${person.id}.jpg'/><div id="name">${person.name}</div></div>
      <div class="card__face card__face--back"><div id="info"><p>Weight:${person.weight}, Height:${person.height}, Skin:${person.skin_color}</p></div></div>
    </div>
    `
}).join(' ,');

console.log(cardHTML);

const container = document.querySelector('#container');

container.innerHTML=cardHTML;

var cards = document.querySelectorAll('.card');


cards.forEach (card => {
    card.addEventListener( 'click', function() {
        card.classList.toggle('is-flipped');
    });
})


})
}
 getPeople();

 const perForm = document.querySelector('#perForm');

 perForm.addEventListener('submit', (event) => {
     event.preventDefault();

     const formData = new formData(perForm);
     let perObj = new Object();

     for (let pair of formData.entries()) {
         console.log(pair)

         perObj[pair[0]] = pair[1]
     }

   

   const parentDiv = document.createElement('div');
   parentDiv.className('scene');

   const innerDiv = document.createElement('div');
   innerDiv.className('card');

   const frontDiv = document.createElement('div');
   frontDiv.className('card_face card_face--front');

   const backDiv = document.createElement('div');
   backDiv.className('card_face card_face--back');

    
   innerDiv.appendChild(frontDiv, backDiv);
   parentDiv.appendChild(innerDiv);
   
   container.innerHTML = parentDiv;
 })

