let imageId = 3474

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

const imageElement = document.getElementById("image");
const imageTitle = document.getElementById("name");
const totalLikes = document.getElementById("likes");
const commentsList = document.getElementById("comments");
const likeButton = document.getElementById("like_button");
const submitButton = document.querySelector('[type="submit"]');
const commentInput = document.getElementById("comment_input");

function fetchImage() {
  fetch(imageURL)
  .then(response => response.json())
  .then(imageObj => {
    // Display image
    imageElement.setAttribute("src", `${imageObj['url']}`);
    imageElement.setAttribute("date-id", `${imageObj['id']}`);

    // Display image title 
    imageTitle.innerText = `${imageObj['name']}`;

    // Display image likes
    totalLikes.innerText = `${imageObj['like_count']}`;

    // Display list of comments
    displayComments(imageObj);
  })
}

function likeImage() {
  let data = {
    image_id: imageId
  }

  let objConfig = {
    method: "POST",
    headers: {
      "Content=Type": "application/json",
      "Accept": "application/json"
    },
    body: data
  }

  fetch(likeURL, objConfig)
  .then(response => response.json())
  .then(likeObj => {
    console.log(likeObj);
  })
}

function createComment() {
  let data = {
    image_id: 3474,
    content: commentInput.value
  }

  let objConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  }

  fetch(commentsURL, objConfig)
  .then(response => response.json())
  .then(commentObj => {
    console.log(commentObj);
  })
}

function displayComments(image) {
  let comments = image['comments'];

  for (const comment of comments) {
    const commentItem = document.createElement("li");
    commentItem.setAttribute("comment-id", `${comment['id']}`);
    commentItem.innerText = comment['content'];
    commentsList.appendChild(commentItem);
  }
}

function newComment() {
  const commentItem = document.createElement("li");
  commentItem.innerText = commentInput.value;
  commentsList.appendChild(commentItem);
}

function incrementLikes() {
  let currentLikes = totalLikes.innerText;
  parseInt(currentLikes);
  currentLikes++;
  totalLikes.innerText = `${currentLikes}`;
}




document.addEventListener('DOMContentLoaded', () => {
  
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  fetchImage();

  likeButton.addEventListener("click", event => {
    event.preventDefault();
    incrementLikes();
    likeImage();
  })

  submitButton.addEventListener("click", event => {
    event.preventDefault();
    newComment();
    createComment();
    commentInput.value = "";
  })

})
