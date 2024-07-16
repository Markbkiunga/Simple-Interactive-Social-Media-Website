//Random Joke Functionality
const header = document.querySelector('#header');
const leftSideBar = document.querySelector('#sidenav-left-container');
const rightSideBar = document.querySelector('#sidenav-right-container');

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
