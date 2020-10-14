import{Button} from"./index";
import{validateForm} from"./index";

import moment from "moment";


const PageList = (argument = "") => {

  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = ``;

    const fetchList = (url, argument, quest = "no") => {
      let finalURL = url;
      if (argument && quest === "no") {
        finalURL = url + "search=" + argument + "&page_size=9";
      } else if (argument && quest === "yes"){
        finalURL = url + "search=" + argument + "&page_size=27";
      }
      console.log(finalURL);
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          articles = "";

          response.results.forEach((article) => {

            articles += `

                    <div class="col-4">
                      <div class="card mr-3 ml-3 mb-3" id="e">
                      <a href = "#pagedetail/${article.id}"><img class="card-img-top" style="height: 18rem;" src="${article.background_image}" alt="Card image cap"></a>
                        <div class="card-body bg-dark">
                        <h4 class="text-white"><a href = "#pagedetail/${article.id}" class="text-white">${article.name}</a></h4>
                        <h5 class="text-white">${article.released}</h5>
                        <h5 class="text-white">${article.platforms[0].platform.name}</h5>
                        </div>
                      </div>
                    </div>

                `;

          });
          document.querySelector(".page-list .row").innerHTML = articles ;

          function nextMethod(e) {
            e.preventDefault();
                const formSearchValue = document.forms["researchForm"]["fsearch"].value.replace(/\s+/g, "-");
                fetchList(`https://api.rawg.io/api/games?page=2&`, document.forms["researchForm"]["fsearch"].value);
            };
            function previousMethod(e) {
              e.preventDefault();
                  const formSearchValue = document.forms["researchForm"]["fsearch"].value.replace(/\s+/g, "-");
                  fetchList(`https://api.rawg.io/api/games?page=1&`, document.forms["researchForm"]["fsearch"].value);
              };
            function nextnextMethod(e) {
              e.preventDefault();
                  const formSearchValue = document.forms["researchForm"]["fsearch"].value.replace(/\s+/g, "-");
                  articles = "";
                  fetchList(`https://api.rawg.io/api/games?page=1&`, document.forms["researchForm"]["fsearch"].value, "yes");
              };

            if (response.previous !== null && response.next !== null) {
                document.querySelector(".page-list .row").innerHTML += `
                <div class="row mx-auto mb-3">
                  <button class="btn btn-outline-danger mr-1"><-</button>
                  <button class="btn btn-outline-danger mr-1">-></button>
                </div>`;
                const previousButton = document.getElementsByClassName("btn btn-outline-danger mr-1")[0];
                previousButton.addEventListener('click', previousMethod);
                const nextButton = document.getElementsByClassName("btn btn-outline-danger mr-1")[1];
                nextButton.addEventListener('click', nextnextMethod);

              } else if (response.previous !== null ) {
                document.querySelector(".page-list .row").innerHTML += `
                <div class="row mx-auto mb-3">
                  <button class="btn btn-outline-danger mr-1"> <- </button>
                </div>`;
                const previousButton = document.getElementsByClassName("btn btn-outline-danger mr-1")[0];
                previousButton.addEventListener('click', nextMethod);
              } else if (response.next !== null && (/27$/).test(finalURL) === false ) {
                  document.querySelector(".page-list .row").innerHTML += `
                  <div class="row mx-auto mb-3">
                    <button class="btn btn-outline-danger mr-1"> -> </button>
                  </div>`;
                  const nextButton = document.getElementsByClassName("btn btn-outline-danger mr-1")[0];
                  nextButton.addEventListener('click', nextMethod);
              }

        });

    };

    fetchList(`https://api.rawg.io/api/games`, cleanedArgument);

      function searchMethod(e) {
        e.preventDefault();
            const formSearchValue = document.forms["researchForm"]["fsearch"].value.replace(/\s+/g, "-");
            console.log("listener");
            alert(`#pagelist/${formSearchValue}`);
            window.location = `#pagelist/${formSearchValue}`;
            fetchList(`https://api.rawg.io/api/games?`, document.forms["researchForm"]["fsearch"].value);

        }

      const searchButton = document.getElementsByClassName("btn btn-outline-danger my-2 my-sm-0")[0];
      searchButton.addEventListener('click', searchMethod);
      console.log(searchButton);
  };

  const render = () => {
    pageContent.innerHTML = `
    <div class="jumbotron jumbotron-fluid bg-dark">
      <div class="container">
        <h1 class="display-4 text-white">Welcome,</h1>
        <p class="lead text-white">The Hyper Programe is the world's premier event for computer and video games
        and related products. At The Hyper Programe, the video game industry's top talent pack the Losa Angeles Convention Center,
        connecting tens of thousands of the best, brightest and most innovative in the interactive entertainment industry. For three
        exciting days, leading-edge companies, groundbreaking new technologies, and never-seen-before products will be showcased.
        The Hyper Programe connects you with both new and existing partners, industry executives, gamers, and social influencers providing
        unprecedented exposure</p>
      </div>
    </div>
    <div class="form-group col-2 bg-danger ml-3">
      <select class="form-control text-white bg-danger" id="exampleFormControlSelect1" value="Platform">
        <option>PC</option>
        <option>XBox One</option>
        <option>PlayStation 4</option>
        <option>PlayStation 3</option>
        <option>Android</option>
        <option>macOS</option>
        <option>Linux</option>
        <option>Nintendo Switch</option>
      </select>
    </div>
      <section class="page-list mx-auto">
        <div class="row">...loading</div>
      </section>
    `;

    preparePage();
  };

  const dateToday = moment(Date.now()).format("YYYY-MM-DD");
  const date365 = moment(Date.now() + 3.154e+10).format("YYYY-MM-DD");

  render();

};



export {PageList};
