document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3477 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const deleteURL = (id => `https://randopic.herokuapp.com/comments/${id}`); 
  const image = document.querySelector('#image');
  const name = document.querySelector('#name');
  const likes = document.querySelector('#likes');
  const like_button = document.querySelector('#like_button');
  const comment_input = document.querySelector('#comment_input');
  const submit = document.querySelector('input[type="submit"]');
  const comments = document.querySelector('#comments');
  
  setTimeout(function(){ comment_count = 0; }, 60000);

  function deleteComment(id){
    let delconfig = {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    fetch(deleteURL(id), delconfig)
    .then(response => response.json())
    .then(function(json){
      console.log(json);
    })
    .catch(error => console.log(error));
  }

  function deleteButton(li, id){
    let delbutton = document.createElement('button');
      delbutton.innerText = "delete";
      li.appendChild(delbutton);
      delbutton.addEventListener('click', function(){
        let result = confirm("Really?");
        if(result){
          comments.removeChild(li);
          deleteComment(id);
        }
      })
  }
  
  fetch(imageURL)
  .then(res => res.json())
  .then(function(json){
    image.setAttribute('src', json.url);
    name.innerText = json.name;
    likes.innerText = json.like_count;
    for(const comm of json.comments){
      let li = document.createElement('li');
      li.innerText = comm.content;
      comments.appendChild(li);
      // let delbutton = document.createElement('button');
      // delbutton.innerText = "delete";
      // li.appendChild(delbutton);
      // delbutton.addEventListener('click', function(){
      //   let result = confirm("Really?");
      //   if(result){
      //     comments.removeChild(li);
      //     deleteComment(comm.id);
      //   }
      // })
      deleteButton(li, comm.id);
    }
    console.log(json);
    
  })
  .catch(error => console.log(error));
  like_button.addEventListener('click', function(){
    likes.innerText = (parseInt(likes.innerText) + 1);
    const likedata = {
      image_id: imageId
    }
    const likeconfig = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(likedata)
    }
    fetch(likeURL, likeconfig)
    .then(res => res.json())
    .then(function(json){
      console.log(json);
    })
    .catch(error => console.log(error));
  });

  submit.addEventListener('click', function(event){
    event.preventDefault();
    let li = document.createElement('li');
    li.append(comment_input.value);
    comments.append(li);
    const commentdata = {
      image_id: imageId,
      content: comment_input.value
    };
    const commentconfig = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentdata)
    };
    fetch(commentsURL, commentconfig)
    .then(res => res.json())
    .then(function(json){
      console.log(json);
      deleteButton(li, json.id);
    })
    .catch(error => console.log(error));
    comment_input.value = "";
    }
  )
  

})
