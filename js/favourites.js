const cardWrapper = document.querySelector('.card-wrapper');
const input = document.querySelector('#inputSearch');

if(localStorage.getItem('fav-list')){
    favList = JSON.parse(localStorage.getItem('fav-list'));
    favList.forEach(id => fetchData(id));
}else{
    cardWrapper.innerHTML = `<h2>Go add some superheros in your favourites!</h2>` 
};

function fetchData(id){
  async function getCharacters() {
      var response = await fetch(
          `https://gateway.marvel.com/v1/public/characters/${id}?&ts=1&apikey=af9545c27d3579db0269b37578f6ad71&hash=dc9426869b656707b37dd9766dc5300a`
      );
      var parsedResponse = await response.json();
      return parsedResponse;
    }
  
  getCharacters().then(res => {
      let result = res.data.results;
  
      result.forEach(element => {
          let li = document.createElement('li');
          let cardContent = createCardTemplate(element);
          li.innerHTML = cardContent;
          cardWrapper.append(li);
      });
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
      <button data-id="${data.id}" onclick="removeFavourite(event)" type="button" class=" inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Remove Fav</button>
    </div>
    </div></a>`
  }
}

function fetchCharacter(e,id) {
  if(e.target.localName != "button"){
    window.location.href=`./superhero-page.html?${id}`
  }
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

function removeFavourite(e) {

  let btn = e.target;
  let btnID = btn.getAttribute('data-id');

  favList.splice(favList.indexOf(btnID),1)

  if(favList.length){
      localStorage.setItem('fav-list',JSON.stringify(favList));
  }else{
      localStorage.removeItem('fav-list');
  }

  //hide the character
  let liList = cardWrapper.querySelectorAll('li');
  liList.forEach(element => {
      let button = element.querySelector('button[data-id]');
      
      if(button.getAttribute('data-id') == btnID){
          cardWrapper.removeChild(element);
      }
  });
  if(liList.length == 1){
      cardWrapper.innerHTML = `<h2>Go add some superheros in your favourites!</h2>`
  };
}