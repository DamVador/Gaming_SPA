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
          platforms.forEach( platform => {
            articleDOM.querySelector("p.platforms span").innerHTML += platform.name + " ";

          });
          articleDOM.querySelector("p.description").innerHTML = description;
          articleDOM.querySelector("h4.rating").innerHTML = rating + "/5" + "-" + ratings_count + " votes";
          articleDOM.querySelector("p.background_image").innerHTML = `<img class="card-img-top" style="height: 30rem;" src="${background_image}" alt="Card image cap">`;
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

        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export {PageDetail};
