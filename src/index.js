let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.querySelector('#toy-collection')
  const addForm = document.querySelector('form')
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    event.preventDefault()
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
      
  })

  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(result => result.map(toy => {
      const toyDiv = document.createElement('div')
      toyDiv.className = 'card'

      const toyName = document.createElement('h2')
      toyName.innerText = toy.name

      const toyImg = document.createElement('img')
      toyImg.src = toy.image
      toyImg.className = "toy-avatar"

      const likes = document.createElement('p')
      likes.innerText = `${toy.likes} Likes`

      const likeButton = document.createElement('button')
      likeButton.className = "like-btn"
      likeButton.innerText = "Like"

      const deleteButton = document.createElement('button')
      deleteButton.className = "delete-btn"
      deleteButton.innerText = "X"

      toyDiv.append(toyName, toyImg, likes, likeButton, deleteButton)
      toyCollection.appendChild(toyDiv)

      likeButton.addEventListener('click', event => {
        likes.innerText = `${toy.likes++} Likes`

        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json" 
          },
          body: JSON.stringify({
            "likes": `${toy.likes++}`
          })
        }).then(() => {
          window.location.reload()
        })
      })

      deleteButton.addEventListener('click', event => {
        event.target.parentNode.remove()
        
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "DELETE"
        })
      })

    }))
  
    addForm.addEventListener('submit', event => {
      event.preventDefault()

      const toyData = new FormData(event.target)
      const name = toyData.get('name')
      const image = toyData.get('image')

      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": `${name}`,
          "image": `${image}`,
          "likes": 0
        })
      }).then(() => {
        window.location.reload()
      })
    })


})
