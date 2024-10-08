const header = document.querySelector('#header');
const leftSideBar = document.querySelector('#sidenav-left-container');
const rightSideBar = document.querySelector('#sidenav-right-container');
const memesSection = document.querySelector('#memes-section');
const musicSection = document.querySelector('#music-section');
const dogSection = document.querySelector('#dogs-section');

//Loader

document.addEventListener('DOMContentLoaded', () => {
  // Simulate an API request or any async operation
  setTimeout(() => {
    hideLoader();
    showContent();
  }, 2000); // Replace with your actual data loading logic and time

  function hideLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
  }

  function showContent() {
    const content = document.getElementById('content');
    content.style.display = 'block';
  }
});

//Username submission
const usernameForm = document.querySelector('#user-information');
const userNameInput = document.querySelector('#username');
const usernameContainer = document.querySelector('#username-container');
usernameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  username = userNameInput.value;
  usernameForm.classList.add('hidden');
  usernameContainer.append(`${username}`);
});

//Random Joke Functionality
fetch(
  'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart'
)
  .then((response) => response.json())
  .then((jokeData) => {
    let jokeContainer = document.createElement('div');
    jokeContainer.classList.add('joke-container');
    jokeContainer.innerHTML = `
      <p>${jokeData.setup}</p>
      <p>${jokeData.delivery}</p>
      `;
    header.appendChild(jokeContainer);
  });

//Random 3 Friends Functionality
let friendsContainer = document.querySelector('#friends-container');
function fetchRandomFriend() {
  fetch('https://randomuser.me/api/')
    .then((response) => response.json())
    .then((friendData) => {
      let friendName = document.createElement('p');
      friendName.textContent = `${friendData.results[0].name.title} ${friendData.results[0].name.first} ${friendData.results[0].name.last}`;
      friendsContainer.appendChild(friendName);

      let friendImage = document.createElement('img');
      friendImage.setAttribute('src', friendData.results[0].picture.medium);
      friendsContainer.appendChild(friendImage);

      let friendUsername = document.createElement('p');
      friendUsername.textContent = `${friendData.results[0].login.username}`;
      friendsContainer.appendChild(friendUsername);
    });
}
fetchRandomFriend();
fetchRandomFriend();
fetchRandomFriend();

//Random Technology related Quote
const quoteContainer = document.querySelector('#quote-container');
fetch('https://api.quotable.io/quotes/random?tags=technology')
  .then((response) => response.json())
  .then((quoteData) => {
    let quote = document.createElement('p');
    quote.textContent = `"${quoteData[0].content}"`;
    quoteContainer.appendChild(quote);

    let quoteAuthor = document.createElement('p');
    quoteAuthor.textContent = `~${quoteData[0].author}~`;
    quoteContainer.appendChild(quoteAuthor);
  });

//Display GeoData Functionality
const geoDataContainer = document.querySelector('#geo-data-container');
fetch('https://ipapi.co/json/')
  .then((response) => response.json())
  .then((geoData) => {
    let userGeoData = document.createElement('p');
    userGeoData.innerHTML = `
    </br>
    ${geoData.country_name} </br> ${geoData.city} </br> ${geoData.org} </br> ${geoData.ip} </br> ${geoData.timezone}
    `;
    geoDataContainer.appendChild(userGeoData);
  });
//Date and time functionality
const now = new Date(); // create a new `Date` object
const currentDateTime = now.toLocaleString(); // get the current date and time as a string
let dateTime = document.createElement('p');
dateTime.textContent = currentDateTime;
rightSideBar.appendChild(dateTime);
//Add Memes to DOM functionality
fetch('https://memes-data-backend.vercel.app/memes')
  .then((response) => response.json())
  .then((memesData) => {
    memesData.forEach((memeData) => {
      let memeContainer = document.createElement('div');
      memeContainer.classList.add('meme-container');

      let memeName = document.createElement('p');
      memeName.textContent = memeData.name;
      memeName.classList.add('meme-name');
      memeContainer.appendChild(memeName);

      let memeImage = document.createElement('img');
      memeImage.setAttribute('src', memeData.url);
      memeImage.classList.add('meme-image');
      memeContainer.appendChild(memeImage);
      //Commenting functionality
      let commentsContainer = document.createElement('div');
      commentsContainer.classList.add('comments-container');
      memeContainer.appendChild(commentsContainer);

      let commentInput = document.createElement('input');
      commentInput.setAttribute('type', 'text');
      commentInput.classList.add('comment-input');
      commentsContainer.appendChild(commentInput);

      let addCommentButton = document.createElement('button');
      addCommentButton.textContent = 'Change Caption';
      addCommentButton.classList.add('comment-button');
      commentsContainer.appendChild(addCommentButton);

      let memeCaption = document.createElement('p');
      memeCaption.classList.add('meme-caption');
      memeCaption.textContent = memeData.captions;
      memeContainer.appendChild(memeCaption);
      //Changing Caption Event Listener
      addCommentButton.addEventListener('click', () => {
        fetch(`https://memes-data-backend.vercel.app/memes/${memeData.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            captions: `${usernameContainer.textContent}:)${commentInput.value} `,
          }),
        })
          .then((response) => response.json())
          .then((userCaption) => {
            console.log(userCaption);
          });
        setTimeout(() => location.reload(), 1000);
      });
      //Liking a meme Event Listener
      memeImage.addEventListener('dblclick', () => {
        if (memeContainer.className === 'meme-container') {
          memeContainer.classList.add('meme-container-liked');
        } else {
          memeContainer.classList.remove('meme-container-liked');
        }
      });

      memesSection.appendChild(memeContainer);
    });
  });
//Adds Music to DOM functionality
fetch('https://music-data-backend.vercel.app/tracks')
  .then((response) => response.json())
  .then((musicData) => {
    musicData.forEach((musicDetails) => {
      let musicContainer = document.createElement('div');
      musicContainer.classList.add('music-container');

      let musicName = document.createElement('p');
      musicName.textContent = musicDetails.name;
      musicName.classList.add('music-name');
      musicContainer.appendChild(musicName);

      let musicThumbnail = document.createElement('img');
      musicThumbnail.setAttribute('src', musicDetails.img);
      musicThumbnail.classList.add('music-image');
      musicContainer.appendChild(musicThumbnail);

      let musicLink = document.createElement('a');
      musicLink.classList.add('music-link');
      musicLink.setAttribute('href', musicDetails.trackUrl);
      musicLink.setAttribute('target', '_blank');
      musicLink.textContent = 'Link to Youtube';
      musicContainer.appendChild(musicLink);

      musicSection.appendChild(musicContainer);
    });
  });
//Adds 40 Random Dogs to DOM functionality
fetch('https://dog.ceo/api/breeds/image/random/40')
  .then((response) => response.json())
  .then((dogData) => {
    let dogs = dogData.message;
    dogs.forEach((dog) => {
      let dogContainer = document.createElement('div');
      dogContainer.classList.add('dog');
      dogSection.appendChild(dogContainer);

      let dogImage = document.createElement('img');
      dogImage.setAttribute('src', dog);
      dogImage.classList.add('dog-image');
      dogContainer.appendChild(dogImage);
    });
  });

/*Filtering code backfired
filterSelection('all');
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName('filterDiv');
  if (c == 'all') c = '';
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], 'show');
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], 'show');
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += ' ' + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(' ');
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById('filterButtonsContainer');
var buttons = btnContainer.getElementsByClassName('btn');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    var current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';
  });
}
  */
/* Set the width of the sidebar to 250px (show it) */
function openLeftNav() {
  leftSideBar.style.width = '300px';
}

/* Set the width of the sidebar to 0 (hide it) */
function closeLeftNav() {
  leftSideBar.style.width = '0';
}
function openRightNav() {
  rightSideBar.style.width = '300px';
}

/* Set the width of the sidebar to 0 (hide it) */
function closeRightNav() {
  rightSideBar.style.width = '0';
}
