document.addEventListener('DOMContentLoaded', (event) => {

  
  // console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 1 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let imageCard = document.querySelector('#image_card')
  let name = document.querySelector('#name');
  let myImage = document.querySelector("#image")
  let spanLikes = document.querySelector('#likes')
  let likeButton = document.querySelector('#like_button')

  let commentForm = document.querySelector("#comment_form")
  let commentInput = commentForm.querySelector("#comment_input")
  let submit = commentForm.querySelector('input[name="Submit"]')

  let comments = document.querySelector("#comments")
  let container = document.querySelector('#container')
  let imageContent = document.querySelector("#image_content")

  
      fetch('https://randopic.herokuapp.com/images/3511') 
      .then(response => response.json())
      .then(data => {
        console.log(data)
        
        let likes = data.like_count.length

        let li = document.createElement('li')
        imageCard.innerText = data.id
        name.innerText = data.name
        myImage.src = data.url
        li.innerText = data.comments[0].content
        spanLikes.innerText = `Likes:${data.like_count}`

        
        // container.appendChild(imageContent)
        imageContent.appendChild(imageCard)
        imageCard.appendChild(myImage)
        imageCard.appendChild(name)
        imageCard.appendChild(spanLikes)
        imageCard.appendChild(likeButton)
        imageCard.appendChild(commentForm)
        commentForm.appendChild(commentInput)
        // commentForm.appendChild(submit)
        imageCard.appendChild(comments)
        comments.appendChild(li)
        
        likeButton.addEventListener('click', (event) => {
          likes++; 


        fetch('https://randopic.herokuapp.com/likes', {
          method: 'PATCH',
          body: JSON.stringify({
            image_id: 3351
          }), headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
         })
         .then(response => response.json())
         .then(data => console.log(data))




        })


        
      })      


})
