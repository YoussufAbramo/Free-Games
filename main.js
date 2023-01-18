const data = null;
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.open("GET", "https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc");
xhr.setRequestHeader("X-RapidAPI-Key", "431e2e0512msh12ec0cf6343c1c8p1de776jsnb12502d1e36b");
xhr.setRequestHeader("X-RapidAPI-Host", "free-to-play-games-database.p.rapidapi.com");
xhr.send(data);

var api_data = [];
xhr.addEventListener("readystatechange", function(){
  if(this.readyState === this.DONE){
    console.log(JSON.parse(this.responseText));
    api_data = JSON.parse(this.responseText);
    print_api();
  }
})

function print_api(){
  var api_div = ``;
  for(var i = 0; i < 5; i++){
    var random_game = Math.abs(Math.round(Math.random() * (10 - 70) + 10));
    api_div += `
      <div class="item d-flex">
        <div class="img">
          <img src="${api_data[i].thumbnail}" alt="${api_data[i].title}">
        </div>
        <div class="info">
          <h2>${api_data[i].title}</h2><span> | ${api_data[i].genre}</span>
          <span>Expires in: ${api_data[i].release_date}</span>
          <h3>Epic Store</h3>
          <small>${asmalli_data[i].short_description}</small>
        </div>
        <div class="action d-flex">
          <a href="${api_data[i].game_url}" target="_blank">Get It</a>
        </div>
      </div>
    `;
    console.log(i);
    console.log(random_game);
  }
  document.getElementById("free_games").innerHTML = api_div;
}