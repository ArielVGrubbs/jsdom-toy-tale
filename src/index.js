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
  fetch('http://localhost:3000/toys')
  .then((response) => response.json())
  .then((data) => {
    data.forEach(myFunc)
    function myFunc(value){
      addToyToPage(value)
    }
  })
});

function addToyToPage(toy) {
  // create toy tag
  const toyTag = document.createElement('div')
  toyTag.className = "card"

  const nameTag = document.createElement('h2')
  nameTag.innerText = toy.name
  toyTag.appendChild(nameTag)

  const imageTag = document.createElement('img')
  imageTag.className ="toy-avatar"
  imageTag.src = toy.image
  toyTag.appendChild(imageTag)

  const likesTag = document.createElement('p')
  likesTag.innerText = toy.likes
  toyTag.appendChild(likesTag)

  const buttonTag = document.createElement('button')
  buttonTag.className = "like-btn"
  buttonTag.innerText = "Like"
  toyTag.appendChild(buttonTag)

  buttonTag.addEventListener('click', function(event) {
    event.preventDefault()
    return fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": `${parseInt(toy.likes) + 1}`
      })
    })
    .then(function(response) {
      return response.json
    })
    .then(function(object) {
      likesTag.innerText = `${parseInt(likesTag.innerText) + 1}`
    })
  })

  // change the content
  // find the parent
  const toyParent = document.querySelector('#toy-collection')
  // ✋🏻
  toyParent.appendChild(toyTag)
}

const toyFormSubmit = document.querySelector('.add-toy-form')
toyFormSubmit.addEventListener('submit', function(event) {
  event.preventDefault()
  const nameInputValue = event.target.querySelector("#input-name").value
  const imageInputValue = event.target.querySelector("#input-image").value
  return fetch( 'http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: `${nameInputValue}`,
      image: `${imageInputValue}`,
      likes: 0
    })
  })
  .then(function(response) {
      return response.json();
  })
  .then(function(object) {
      // document.body.innerHTML = object[ "id" ]
      addToyToPage(object);
  })
  .catch(function(error) {
      document.body.innerHTML = error.message
  })

})

