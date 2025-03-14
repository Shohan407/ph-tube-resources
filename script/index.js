
const showLoader = () => {
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('videos-container').classList.add('hidden');
}

const hideLoader = () => {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('videos-container').classList.remove('hidden');
}



function removeActiveClass() {
    const activeButtons = document.getElementsByClassName('active');
    for (let btn of activeButtons) {
        btn.classList.remove('active');
         
    }
    // console.log(activeButtons);
}

function loadCategories() {
    const url = `https://openapi.programming-hero.com/api/phero-tube/categories`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.categories));
}

function loadVideos(searchText = '') {
    showLoader()
    const url =` 
     https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}
    `;

    fetch(url)
       .then(res => res.json())
       .then(data => {
        removeActiveClass()
        document.getElementById("btn-all").classList.add("active")    
        displayVideos(data.videos)
       });
}

const loadCategoryVideos = (id) => {
    showLoader()
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => {

            removeActiveClass()

            const clickedBtn = document.getElementById(`btn-${id}`);
            clickedBtn.classList.add("active")
            // console.log(clickedBtn);
            displayVideos(data.category)

        });
}

const loadVideoDetails = (videoId)  => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayVideoDetails(data.video);
        });
}

const displayVideoDetails = (video) => {
     document.getElementById("video_details").showModal();
     const videoDetailsContainer = document.getElementById("video_details_container");
     videoDetailsContainer.innerHTML = `
     <div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
       
    </div>
  </div>
</div>
     `;
}


function displayCategories(categories) {
    // console.log(categories);

    const categoryContainer = document.getElementById("categories-container");
    for (const category of categories){
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <button id="btn-${category.category_id}" onclick="loadCategoryVideos('${category.category_id}')" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `;
        categoryContainer.appendChild(categoryDiv);
    }
}

// {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//             "profile_name": "Noah Walker",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "543K",
//         "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// }
const displayVideos = (videos) => {
    const videosContainer = document.getElementById("videos-container");

    videosContainer.innerHTML = "";

    if (videos.length == 0) {
        videosContainer.innerHTML =`
        
    <div class="col-span-4 flex flex-col justify-center items-center py-20 gap-3 text-center">
        <img src="assets/Icon.png" alt="">
        <p class="text-2xl font-bold">Oops!! Sorry, There is no <br> content here</p>
    </div>
        `;
        hideLoader()
        return;
    }
    

    videos.forEach((video) => {
        // console.log(video);
        const videoDiv = document.createElement("div");
        videoDiv.innerHTML = `
         <div class="card bg-base-100">
        <figure class="relative">
          <img class="w-full h-[200px] object-cover"
            src=" ${video.thumbnail}"
            alt="" />
            <span class="absolute bottom-2 right-2 text-white bg-black rounded px-2">3hrs 56 min ago</span>
        </figure>
        <div class="flex gap-3 py-5">
           <div class="profile">
            <div class="avatar">
                <div class="ring-primary ring-offset-base-100 w-5 h-5  rounded-full ring ring-offset-2">
                  <img src="${video.authors[0].profile_picture}" />
                </div>
              </div>
           </div>
           <div class="intro">
           <h2 class="text-sm font-semibold"> ${video.title}</h2>
           <p class="text-sm text-gray-400 flex gap-1"> ${video.authors[0].profile_name}
            ${video.authors[0].verified == true ? `<img 
            class="w-5 h-5"
            src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : ""}
           </p>
           <p class="text-sm text-gray-400">${video.others.views} views</p>
         </div>
        </div>
        <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
      </div>
        `;
        videosContainer.appendChild(videoDiv);
    });
    hideLoader();
}


document.getElementById('search-box').addEventListener('keyup', function (e) {
    const input = e.target.value;
    loadVideos(input);
});

loadCategories()



 