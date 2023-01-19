const characterWrap = document.querySelector('.character-wrap');

// retrieve the id from the url 
let queryString = location.search.substring(1);

// fetch character using the id
async function getCharacter() {
    var response = await fetch(
        `https://gateway.marvel.com/v1/public/characters/${queryString}?ts=1&apikey=af9545c27d3579db0269b37578f6ad71&hash=dc9426869b656707b37dd9766dc5300a`
    );
    var parsedResponse = await response.json();
    return parsedResponse;
}

getCharacter().then(res => {
    let result = res.data.results;

    
    result.forEach(element => {
        
        // console.log(element);
        characterWrap.innerHTML = `
            <!-- component -->
            <div class="character-header p-6 my-6">
                    <p class="text-3xl font-bold text-white">${element.name}</p>
                    ${element.description && `<p class="text-xl pt-2 mb-0 text-gray-50">${element.description}</p>`}
                  
            </div>
            ${ (element.comics.available > 0) ? 
                `<div>
                    <h2>Comics</h2>
                    <div class="comics-wrap common-wrap">

                    </div>
                </div>` : ''
            }

            ${ (element.events.available > 0) ? 
                `<div>
                    <h2>Events</h2>
                    <div class="events-wrap common-wrap">

                    </div>
                </div>` : ''
            }            
            ${ (element.series.available > 0) ? 
                `<div>
                    <h2>Series</h2>
                    <div class="series-wrap common-wrap">

                    </div>
                </div>` : ''
            }`
    });
});

fetchData('comics');
fetchData('events');
fetchData('series');

function fetchData(queryType){

    async function getCharacter() {
        var response = await fetch(
            `https://gateway.marvel.com/v1/public/characters/${queryString}/${queryType}?ts=1&apikey=af9545c27d3579db0269b37578f6ad71&hash=dc9426869b656707b37dd9766dc5300a`
        );
        var parsedResponse = await response.json();
        return parsedResponse;
    }
    
    getCharacter().then(res => {
        let result = res.data.results;
        // console.log(result);
        let comicWrap = document.querySelector('.comics-wrap');
        let eventWrap = document.querySelector('.events-wrap');
        let seriesWrap = document.querySelector('.series-wrap');
        
        result.forEach(ele => {
            let div = document.createElement('div');
            div.innerHTML = `
            <div class="item-image">
                <img src="${ele.thumbnail.path}/${(queryType == 'series') ? 'standard_fantastic': 'portrait_uncanny'}.${ele.thumbnail.extension}" alt="${ele.title}-img">
            </div>
            <div class="item-text">
                <h5>${ele.title}</h5>
                <p>${createWriterTemplate(ele.creators.items)}</p>
            </div>
            `;

            // check which wrapper div to append to
            (queryType == 'comics') && comicWrap.append(div) ;
            (queryType == 'events') && eventWrap.append(div) ;
            (queryType == 'series') && seriesWrap.append(div) ;
        });

        function createWriterTemplate(arr){
            let tempArr = [];
            arr.filter(ele => ele.role == "writer").forEach(ele => tempArr.push(ele.name));
            return tempArr.slice(0,2).join(', ');
        }
    })
}