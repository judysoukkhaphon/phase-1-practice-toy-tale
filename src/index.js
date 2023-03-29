let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



// Above code is provided. This lab has no tests. 
// to create a server storing all of our lost toy data at restful routs at: "http://localhost:3000/toys", Start server by running >>json-server --watch db.json 
// see information about an individual toy at: "http://localhost:3000/toys/:id", where ":id" is a variable for some specific toys id value.
// css styles have been pre-created, so include the appropriate css class to style the cards to display them.
// code has been provided that adds a form for a user to enter toy information to create new toy data.

// 1.When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, 
//    make a <div class="card"> for each toy and add it to the toy-collection div

// 2.
// 3.
document.addEventListener('DOMContentLoaded', loadCards);

function loadCards() {
  let toyCollectionDiv = document.getElementById('toy-collection');

  fetch(`http://localhost:3000/toys`)
  .then((response) => response.json())
  .then((data) => {
    data.forEach(data => {
      const card = document.createElement('div');
      const name = document.createElement('h2');
      const source = document.createElement('img');
      const likes = document.createElement('p');
      const button = document.createElement('button');
      source.setAttribute('class', 'toy-avatar');
      button.setAttribute('class', 'like-btn');
      button.setAttribute('id', data.id);
      card.setAttribute('class', 'card');
      source.setAttribute('src', data.image);
      toyCollectionDiv.appendChild(card);
      card.appendChild(name).innerHTML = data.name;
      card.appendChild(source);
      card.appendChild(likes).innerHTML = data.likes;
      
      card.appendChild(button).innerHTML='Like';

      toyCollectionDiv.appendChild(card);

      button.addEventListener('click', ()=>{
        //event.preventDefault();
        fetch(`http://localhost:3000/toys/${button.id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify({
              likes: data.likes + 1
          }),
        })
        .then(function (response) {
          return response.json();
      })
          .then(function (object) {    
            return (object);
          })
      })

    });
  });           
};


function addToyForm(event) {
  event.preventDefault();
  let name = document.querySelector('input[name=name]').value;
  let image = document.querySelector('input[name=image]').value;


  fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          name: name,
          image: image,
          likes: 0
      }),
  })
          .then(function (response) {
              return response.json();
          })
              .then(function (object) {
                  return loadCards(object);
              })
}

function updateLikes(id) {
  let ids = id;
  
 
  fetch(`http://localhost:3000/toys/${ids}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
        likes: updateLikes
    }),
})
      .then(function (response) {
        return response.json();
      })
        .then(function (object) {
            return loadCards(object);
  })
}



let form = document.querySelector('.add-toy-form');
form.addEventListener('submit', addToyForm)


