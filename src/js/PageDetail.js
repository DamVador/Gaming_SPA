const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");


    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let { name, released, description, rating, ratings_count, background_image, platforms, short_screenshots } = response;

          let articleDOM = document.querySelector(".page-detail .article");

          articleDOM.querySelector("h1.title").innerHTML = name;
          articleDOM.querySelector("p.release-date span").innerHTML = released;
          articleDOM.querySelector("p.platforms span").innerHTML = platforms.map(platform => platform.platform.name).join(" • ")

          articleDOM.querySelector("p.description").innerHTML = description;
          articleDOM.querySelector("h4.rating").innerHTML = rating + "/5" + "-" + ratings_count + " votes";
          articleDOM.querySelector("p.background_image").innerHTML = `<img class="card-img-top" style="height: 30rem;" src="${background_image}" alt="Card image cap">`;
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const getScreenshots = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    const fetchGame = (url, argument) => {
      let finalURL = url + argument + "/screenshots";
      console.log(finalURL);
      const screenshotCard = (src) => {
          return `
          <img class="main-image img-fluid w-25 mr-2 ml-2 mb-3" src="${src}" alt="Card image cap">`
        }
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let { results } = response;

          let articleDOM = document.querySelector(".page-detail .article");
          articleDOM.querySelector(".screenshots-container").innerHTML = results.map(screenshot => screenshotCard(screenshot.image)).join("");

        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const getSimilarGames = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    const fetchGame = (url, argument) => {
      let finalURL = url + argument + "/suggested";
      const suggestionsCard = (id, image, name, released, genres) => {
      return `

      <div class="card bg-dark mb-5 col-12" style="height: 25rem" id="suggestion-${id}">
        <img class="card-img-top card-image" src="${image}" alt="Card image cap">
        <div class="card-body">
          <a href="#pagedetail/${id}" class="text-white"><h4 class="card-title text-white">${name}</h4></a>
          <p class="card-text text-white">${released}</p>
          <p>${genres}</p>
        </div>
      </div>`
    }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let { results } = response;

          let articleDOM = document.querySelector(".page-detail .article");
          articleDOM.querySelector(".suggestions-container").innerHTML = results.map(game => suggestionsCard(game.id, game.background_image, game.name, game.released, game.genres.map(genre => genre.name).join(" • "))).join("");
          console.log(results)

        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };



  const render = () => {
    pageContent.innerHTML = `
    </div>
    <div class="article">

    </div>
      <section class="page-detail">
        <div class="article ">
          <p class="background_image"></p>
          <div class="row" ">
            <h1 class="title text-white ml-5 col-8"></h1>
            <h4 class="rating text-danger col-2"></h4>
          </div>
          <p class="description ml-5 text-white mr-3"></p>
          <p class="release-date text-white ml-5">Release date : <span></span></p>
          <p class="platforms text-white ml-5">Platforms : <br> <span></span></p>
          <p class="ss"></p>

          <h1 class="title text-danger ml-5 col-8">Screenshots</h1>
          <div class="card-deck screenshots-container ml-5" "></div>

          <h1 class="title text-danger ml-5 col-8">Similar Games</h1>
          <div class="card-columns suggestions-container mt-3  ml-5">
            </div>


        </div>
      </section>
    `;

    preparePage();
    getScreenshots();
    getSimilarGames();
  };

  render();
};

export {PageDetail};
