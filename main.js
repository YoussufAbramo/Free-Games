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
  console.log("run fn")
  var api_div = ``;
  for(var i = 0; i < 5; i++){
    var random_game = Math.abs(Math.round(Math.random() * (10 - 70) + 10));
    console.log("run for")
    api_div += `
      <div class="item d-flex">
        <div class="img">
        <a href="${api_data[random_game].freetogame_profile_url}" target="_blank">
          <img src="${api_data[random_game].thumbnail}" alt="${api_data[random_game].title}">
        </a>
        </div>
        <div class="info d-flex">
        <div>
          <h2 >${api_data[random_game].title}</h2><span>  // ${api_data[random_game].genre}</span><br>
        </div>
        <div>
          <h3>${api_data[random_game].platform}</h3><span> - ${api_data[random_game].developer}</span><br>
        </div>
          <span>Expires in: <b>${api_data[random_game].release_date}</b></span>
          <small>${api_data[random_game].short_description}</small>
        </div>
        <div class="action d-flex">
          <a class="btn" href="${api_data[random_game].game_url}" target="_blank">Get It</a>
        </div>
      </div>
    `;
    console.log(random_game);
  }
  document.getElementById("free_games").innerHTML = api_div;
}