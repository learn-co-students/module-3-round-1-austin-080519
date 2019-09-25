document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3478 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageCard = document.getElementById('image-card')
  const likeButton = document.getElementById('like_button')
  const likes = document.getElementById('likes')
  const namePlace = document.getElementById('name')
  const image = document.getElementById('image')
  const commentInput = document.getElementById('comment_input')
  const commentSection = document.getElementById('comments')

fetch(imageURL) 
  .then(response => response.json())
  .then(data => {
    console.log(data)
  
    showImage(data)
    addLikes(data)
    showComments(data)
    createComment(data)
  }) 

  function showImage(data) {
    namePlace.innerText = `${data.name}`;
    image.src = imageURL;
  }

  function showComments(data) {
    const li = document.createElement('li')
    const pictureComments = `${data.comments[0].content}`
      //   // -----------------------
      //   pictureComments.forEach(function (comment) {
      //     console.log(comment.content);
      // });
    
      // //----------------------------------
    li.innerText = pictureComments
    commentSection.appendChild(li)
    
  };

  function createComment(data) {
    const newComment = commentInput.value
    const commentForm = document.getElementById('comment_form')

    console.log(newComment)

    commentForm.addEventListener("click", (event) =>{
      event.preventDefault()
      const newli = document.createElement('li')
      newli.innerText = newComment
      commentSection.appendChild(newli)
    })

  };

  function addLikes(data) {
    var myLikes = `${data.like_count}`
    likes.innerText = myLikes

    likeButton.addEventListener("click", (event) => {
      event.preventDefault()
      var updatedLikes = myLikes++; 
      return likes.innerText = updatedLikes
    });

    fetch(likeURL, {
      //prevent default
      method: 'POST',
      body: JSON.stringify({
        image_id: imageId,
        like_count: myLikes
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }

    });

  }
// function showImage() {
    
//   imageCard.appendChild
// }

});

//current bugs
// line 22: adding likes per refresh - need to use callback to ensure can use data outside of scope
// line 53: need to get to the submit button, not just the form for the click event.
