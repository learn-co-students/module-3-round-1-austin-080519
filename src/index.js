document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3479 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  //https://randopic.herokuapp.com/images/3479

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
    .then(response => response.json() )
    .then(data => {
      console.log("json data returned = ", data)
      loadContent(data);
    })
})

function loadContent(data) {
  console.log("I'm returning data inside fxn = ", data)

  //add contents to page from data
  image = document.getElementById('image')
  //console.log("image = ", image)
  image.setAttribute('src', `${data.url}`)

  title = document.getElementById('name')
  title.innerHTML = data.name

  likes = document.getElementById('likes')
  const likesCount = data.like_count
  likes.innerHTML = likesCount
  

  //add event listener to like button
  likeButton = document.getElementById('like_button')
  likeButton.addEventListener('click', (event) => {
    console.log('like button has been clicked')
    event.preventDefault()
    likePicture(data, likes, likesCount)
  })


  //add event listener to comment form
  commentForm = document.getElementById('comment_form')
  commentForm.addEventListener('submit', (event) => {
    console.log('add comment button form has been submitted')
    event.preventDefault()
    
    //grab comment value from form
    let commentValue = document.getElementById('comment_input').value
    console.log("commentValue = ", commentValue)
    
    addComment(data, commentValue)
  })

  displayComments(data)
}


function displayComments(data) {
  const comments = document.getElementById('comments')
  
  const commentsArray = data.comments
  console.log("commentsArray = ", commentsArray)
  for (i=0; i < commentsArray.length; i++) {
    for (const comment in commentsArray[i]) {
      console.log("for each loop = ", comment['content'])
      
      const li = document.createElement('li')
      li.innerHTML = comment.content
      console.log("li tag contents = ", li)
      
      comments.appendChild(li)
    }
  }

};


function likePicture(data, likes, likesCount) {
  console.log ("likes before ", likesCount)
  likesCount++
  console.log("likes after ", likesCount)
  likes.innerHTML = likesCount
  
  //likes are only increasing by 1 each time, but updating on back end

  let imageData = {
    image_id: data.id
  }

  let imageObject = {
    method: 'POST',
    headers:
    {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(imageData)
  }

  fetch(`https://randopic.herokuapp.com/likes/`, imageObject)
    .then(response => console.log("POST response = ", response))
  //check response to see if likes are updating
};


function addComment(data, commentValue) {

  let commentData = {
    image_id: data.id,
    content: commentValue
  }

  let commentObject = {
    method: 'POST',
    headers: 
    {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
  }

  fetch(`https://randopic.herokuapp.com/comments/`, commentObject)
};