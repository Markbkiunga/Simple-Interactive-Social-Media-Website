const header = document.querySelector('#header');
const leftSideBar = document.querySelector('#sidenav-left-container');
const rightSideBar = document.querySelector('#sidenav-right-container');
const memesSection = document.querySelector('#memes-section');
const musicSection = document.querySelector('#music-section');
const dogSection = document.querySelector('#dogs-section');

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
    let jokeSetup = document.createElement('p');
    jokeSetup.textContent = jokeData.setup;
    jokeSetup.classList.add('joke');
    header.appendChild(jokeSetup);

    let jokeDelivery = document.createElement('p');
    jokeDelivery.textContent = jokeData.delivery;
    jokeDelivery.classList.add('joke');
    header.appendChild(jokeDelivery);
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
fetch('http://localhost:3000/data/')
  .then((response) => response.json())
  .then((memesData) => {
    memesData.memes.forEach((memeData) => {
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

      let commentInput = document.createElement('input');
      commentInput.setAttribute('type', 'text');
      commentInput.classList.add('comment-input');
      memeContainer.appendChild(commentInput);

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
/*
fetch('http://localhost:3000/tracks')
  .then((response) => response.json())
  .then((musicData) => {
    musicData.forEach((musicDetails) => {
      console.log(musicDetails);
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

      let commentInput = document.createElement('input');
      commentInput.setAttribute('type', 'text');
      commentInput.classList.add('comment-input');
      musicContainer.appendChild(commentInput);

      musicSection.appendChild(musicContainer);
    });
  });
*/
// //Adds 40 Random Dogs to DOM functionality
// fetch('https://dog.ceo/api/breeds/image/random/40')
//   .then((response) => response.json())
//   .then((dogData) => {
//     let dogs = dogData.message;
//     dogs.forEach((dog) => {
//       let dogContainer = document.createElement('div');
//       dogContainer.classList.add('dog');
//       dogSection.appendChild(dogContainer);

//       let dogImage = document.createElement('img');
//       dogImage.setAttribute('src', dog);
//       dogImage.classList.add('dog-image');
//       dogContainer.appendChild(dogImage);
//     });
//   });
