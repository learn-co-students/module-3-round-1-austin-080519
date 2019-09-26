document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3478 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const likeButton = document.getElementById('like_button')
  const likes = document.getElementById('likes')
  const namePlace = document.getElementById('name')
  const image = document.getElementById('image')
  const userComment = document.getElementById('comment_input')
  const commentSection = document.getElementById('comments')
  const commentForm = document.getElementById('comment_form')

  fetch(imageURL) 
    .then(response => response.json())
    .then(data => {
      console.log(data)
    
      showLikes(data)
      showImage(data)
      showComments(data)
  }); 
  
  addLikes();
  createComment();

  function showLikes(data) {
    likes.innerText = data.like_count
  };

  function showImage(data) {
    namePlace.innerText = `${data.name}`;
    image.src = data.url;
  };

  function showComments(data) {
      const pictureComments = data.comments
      pictureComments.forEach(function (comment) {
      const innerContent = comment.content;
      const commentId = comment.id;
      const li = document.createElement('li')
      const deleteBtn = document.createElement('button')
      deleteBtn.innerHTML = 'delete'
      li.innerText = innerContent
      li.appendChild(deleteBtn)
      commentSection.appendChild(li)
    
    deleteBtn.addEventListener("click", (event) =>{
      fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
        method: 'DELETE'
        });
      });
    })
  };

  function createComment(data) {
    commentForm.addEventListener("submit", (event) =>{
      event.preventDefault()
      const newli = document.createElement('li')
      userCommentValue = userComment.value
      newli.innerText = userCommentValue
      commentSection.appendChild(newli)
      userComment.value = ""
    
      fetch(commentsURL, {
        method: 'POST',
        body: JSON.stringify({
          image_id: imageId,
          content: userCommentValue
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          }
        });
    });
  };

  function addLikes() {

    likeButton.addEventListener("click", (event) => {
      let updatedLikes = parseInt(likes.innerText, 10) + 1; 
      likes.innerText = updatedLikes
      
      fetch(likeURL, {
        method: 'POST',
        body: JSON.stringify({
          image_id: imageId,
          like_count: updatedLikes
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          }
      });
    });
  };

});

//current bugs