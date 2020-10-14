const Home = (argument = "") => {
  console.log("Home", argument);
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = ``;

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "?search=" + argument;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            articles += `

                    <div class="col-4">
                      <div class="card mr-3 mb-3" style="width: 18rem;">
                        <img class="card-img-top" src="${article.background_image}" alt="Card image cap">
                        <div class="card-body bg-dark">
                        <h4 class="text-white">${article.name}</h4>
                        <h5 class="text-white">${article.released}</h5>
                        <a href = "#pagedetail/${article.id}">${article.id}</a>
                        </div>
                      </div>
                    </div>

                `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;
        });
    };

    fetchList(`https://api.rawg.io/api/games`, cleanedArgument);

      function searchMethod(e) {
        e.preventDefault();
            const formSearchValue = document.forms["researchForm"]["fsearch"].value.replace(/\s+/g, "-");
            console.log("listener");
            alert(`#pagelist/${formSearchValue}`);
            window.location = `#pagelist/${formSearchValue}`;
            fetchList(`https://api.rawg.io/api/games`, document.forms["researchForm"]["fsearch"].value);

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
      <div class="multiple-button">
        ${Button("Click here")}
        ${Button("Read more")}
        ${Button("One more !")}
      </div>
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  const dateToday = moment(Date.now()).format("YYYY-MM-DD");
  const date365 = moment(Date.now() + 3.154e+10).format("YYYY-MM-DD");

  render();


};

export {Home};
