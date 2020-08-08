
function get30SWPeople(params) {
    let people = [];
    const SWPromises = [
        fetch('https://swapi.dev/api/people/?page=1'),
        fetch('https://swapi.dev/api/people/?page=2'),
        fetch('https://swapi.dev/api/people/?page=3')
    ]
   return Promise.all(SWPromises)
    .then(ResponsesArr => {
        return Promise.all(
            ResponsesArr.map(data => data.json())
            ) 
    })
    .then(jsonDataArr => {
        people = jsonDataArr.reduce(
            (acc, data) => [...acc, ...data.results]
            , people)
        return people;
    })
  }
  get30SWPeople().then(people => {
    console.log(people)
    
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
 
 get30SWPeople();

 const perForm = document.querySelector('#perForm');

 perForm.addEventListener('submit', (event) => {
     event.preventDefault();

     const formData = new formData(perForm);
     let perObj = new Object();

     for(let pair of formData.entries()) {
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
     
     container.appendChild() = parentDiv;
     
 })

 