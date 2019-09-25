document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3475 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${3475}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let imagebox = document.getElementById("image")
  let name = document.getElementById("name")
  let likeamount = document.getElementById("likes")
  let likesbutton = document.getElementById("like_button")
  let commentform = document.getElementById("comment_form")
  let form = document.getElementById("comment_form")
  let br = document.createElement("br")
  let commentsbelow = document.getElementById("comments")
  let li = document.createElement("li")
  let forminfo = document.getElementById("comment_input")
  commentsbelow.appendChild(li)
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let value = forminfo.value
  li.append(value)
  br
})
  likesbutton.onclick = function() {
  count += 1;
  likesbutton.innerHTML = "Like" + count;
  
};
fetch(imageURL)
.then(response => response.json())
.then(data => {
  let imageurl = data.url
  let imagename = data.name
  imagebox.src = imageurl
  name.append(imagename)  

})
fetch(likeURL, {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    image_id: imageId
  })
})
  .then( (response) => {
    console.log(response)
  })
fetch(commentsURL, {
  method: "POST",
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    image_id: imageId,
    content: forminfo.value
  })
})
.then( (response) => {
  
})
})
