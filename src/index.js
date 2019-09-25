document.addEventListener('DOMContentLoaded', (event) => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3489

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  fetch(`${imageURL}`)
    .then(resp => resp.json())
    .then(logoData => {
      
      let logo = logoData;
      console.log(logo);
      const img = document.getElementById('image')
      console.log(img)
      
      const url = logo.url;
         img.src = url;
      
        // title of image
  
        const titleImg = document.getElementById('name');
        console.log(titleImg)
        const nameImg = logo.name;
        console.log(nameImg)
        titleImg.innerText = nameImg;

        // likes Button Feature

        const likesButton = document.getElementById('like_button');
        console.log(likesButton)
        let likeCount = logo.like_count;
        console.log(likeCount)

        likesButton.addEventListener('click', event => {
          
          let likesId = document.getElementById('likes');
            console.log(likesId)
            likesId.innerText = likeCount++;

            let configObj = {
              method: "POST",
              headers: {
                  'Accept': 'application/json',
                  "Content-Type": "application/json",
              },
              body: { image_id: `${imageId}`},
              }

              fetch (`${likeURL}`, configObj) 
                .then(resp => resp.json())
                .then(json => {
                  console.log(json)
                })
                
              })
              
              let commentForm = document.getElementsById('comment-form')
              console.log(commentForm)
            })
          })
          