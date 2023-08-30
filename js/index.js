const cardWrapper = document.querySelector('.card-wrapper');
const input = document.querySelector('#inputSearch');
const navButton = document.querySelector('[data-bs-target="#navbarSupportedContent"]');
const mobileNav = document.querySelector('.navbar-nav');

let favList = [];

// check if favourite list is already available in localStorage
if(localStorage.getItem('fav-list')){
  favList = JSON.parse(localStorage.getItem('fav-list'));
};

// fetch data from marvel api
async function getCharacters() {
  var response = await fetch(
      "https://gateway.marvel.com/v1/public/characters?&limit=40&ts=1&apikey=af9545c27d3579db0269b37578f6ad71&hash=dc9426869b656707b37dd9766dc5300a"
  );
  var parsedResponse = await response.json();
  return parsedResponse;
}

// mobile navbar
navButton.addEventListener('click', ()=>(
  mobileNav.classList.toggle('hidden')
))

getCharacters().then(res => {
  let result = res.data.results;

  // create individual cards for all the item elements
  result.forEach(element => {
      let li = document.createElement('li');
      let cardContent = createCardTemplate(element);
      li.innerHTML = cardContent;
      cardWrapper.append(li);
  });

  //update all the favourite button
  let buttonList = cardWrapper.querySelectorAll('button[data-id]');
  buttonList.forEach(btn => {
    if(favList.includes(btn.getAttribute('data-id'))){
      btn.innerText = "Added to Fav"
      btn.classList.add('inactive');
    } 
  })
});

function createCardTemplate(data){
    return `<a href="javascript: void(0);" onclick="fetchCharacter(event,id=${data.id})"><div class="img-thumbnail">
    <img class="rounded-lg" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="${data.name}-img"/>
    <p>${data.name}</p>
  </div>
  <div class="rounded-lg shadow-lg bg-white hidden">
    <img class="rounded-t-lg" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="${data.name}-img"/>
  <div class="p-6 w-full rounded-b-lg">
    <h5 class="text-gray-900 text-xl font-medium mb-2 charName">${data.name}</h5>
    <button data-id="${data.id}" onclick="addFavourite(event)" type="button" class=" inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Add to Fav</button>
  </div>
  </div></a>`
}

function filterList(input){
  
  let liList = cardWrapper.querySelectorAll('li');
  liList.forEach(element => {
    let listName = element.querySelector('.charName').innerText.toLowerCase();
    if(!listName.includes(input.value.toLowerCase())){
      element.style.display = "none";
    }else{
      element.style.display = "flex";
    }
  })
}

function addFavourite(e) {
  let btn = e.target;
  let btnID = btn.getAttribute('data-id');

  if(!favList.includes(btnID)) {
    favList.push(btnID)

    btn.innerText = "Added to Fav"
    btn.classList.add('inactive');

    localStorage.setItem('fav-list',JSON.stringify(favList));
  };
}

function fetchCharacter(e,id) {
  if(e.target.localName != "button"){
    window.location.href=`./superhero-page.html?${id}`
  }
}