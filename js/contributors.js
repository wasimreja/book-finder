fetch("./contributors.json")
  .then((res) => res.json())
  .then((data) => {
    data.profiles.forEach((element) => {
      cardsset.insertAdjacentHTML(
        "beforeend",
        `<div class='profilecard'>
        <img class="profilepic" src=${element.avatarUrl} alt="images">
        <h4 class="username">${element.name}</h4>
        <div class="details">
          <a target="_blank" id="socials" href="https://github.com/${element.github}">
            <i class="uil uil-github-alt"></i>
          </a>
          <a target="_blank" id="socials" href="https://twitter.com/${element.twitter}">
            <i class="uil uil-twitter-alt"></i>
          </a> 
        </div>
      </div>`
      );
    });
  });
