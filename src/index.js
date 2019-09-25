document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3476 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imgContainer = document.getElementById('image')
  const imgName = document.getElementById('name')
  const comments = document.getElementById('comments')
  const likes = document.getElementById('likes')
  const likeButton = document.getElementById('like_button')
  const commentForm = document.getElementById('comment_form')
  const contentField = document.getElementById('comment_input')

  function addDeleteListener(button) {
    button.addEventListener('click', (event) => {
      const id = event.target.id
      fetch(`https://randopic.herokuapp.com/comments/${id}`, {
        method: 'DELETE'
      })
      .then(resp => resp.json())
      .then(
        event.target.parentNode.remove()
      )
    })
  }

  function createComment(content, commentId) {
    const li = document.createElement('li')
    li.innerText = content
    comments.appendChild(li)

    const deleteButton = document.createElement('button')
    deleteButton.innerText = "Delete"
    deleteButton.setAttribute('id', commentId)
    addDeleteListener(deleteButton)
    li.appendChild(deleteButton)
  }

  fetch(imageURL)
  .then(resp => resp.json())
  .then(resp => {
    imgContainer.src = resp.url
    imgName.innerText = resp.name
    for(let i = 0; i < resp.comments.length; i++) {
      content = resp.comments[i].content
      createComment(content, resp.comments[i].id)
    }
    likes.innerText = resp.like_count
  })

  likeButton.addEventListener('click', () => {
    likes.innerText = parseInt(likes.innerText) + 1
    fetch(likeURL, {
      method: 'POST',
      headers: 
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(
        {
          image_id: imageId
        })
      })
    })

    commentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      content = contentField.value
      
      fetch(commentsURL, {
        method: 'POST',
        headers: 
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(
          {
            image_id: imageId,
            content: content
          })
        })
        .then(resp => resp.json())
        .then(resp => {
          // comments are pessimistic despite the readme saything they should be
          // optimistic because I didn't know how else to get the id in order to
          // make the delete button functional
          createComment(content, resp.id)
          contentField.value = ''
        })
    })
    


































})
