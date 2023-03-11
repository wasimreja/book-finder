const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener(" click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);
function listen(e, pause) {
  const bookCard = e.target.parentElement;
  const bookDescription = bookCard.children[2].innerText;
  const bookName = bookCard.children[0].innerText;
  const authorName = bookCard.children[1].innerText;

  const message = `The name of the book is ${bookName}  . It is written ${authorName} .  ${bookDescription}`;

  // console.log(bookDescription);
  let synth = speechSynthesis;
  synth.cancel();
  if (pause) {
    synth.pause();
  }
  setTimeout(() => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    synth.speak(speech);
  }, 1000);
}

function search(e) {
  e.preventDefault();
  const search = document.getElementById("input").value;
  $('#pagination-wrapper').removeClass('hidden');
  if (search.trim() === "") return;
  document.activeElement.blur(); // this removes focus on the input bar after search
  initiateApi(1,search);
  for(let curr=1; curr < 5; curr++){
    let mainDiv=document.getElementById('pagination-wrapper');
    mainDiv.children[curr].addEventListener('click' ,function(e){
      // mainDiv.children[curr].style.backgroundColor='dodgerblue';
      for(let curr1=1; curr1 < 5; curr1++){
        if(curr1!==curr){
          mainDiv.children[curr1].style.removeProperty('background-color');
        }
      }
      initiateApi(curr,search);
    });
  }

  // console.log("Working");
}


  function initiateApi(curr,search){
    console.log(`https://www.googleapis.com/books/v1/volumes?q="${search}"&maxResults=5&startIndex=`+(curr-1)*5);
  // console.log("Working");
  $.ajax({
    url: `https://www.googleapis.com/books/v1/volumes?q="${search}"&maxResults=5&startIndex=`+(curr-1)*5
    ,
    dataType: "json",
    beforeSend: function () {
      $(".whirly-loader").show();
    },
    complete: function () {
      $(".whirly-loader").hide();
    },

    success: function (res) {
      const resultsContainer = document.getElementById("results");
      while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
      }

      let bookNotFound = res.totalItems === 0;

      if (bookNotFound) {

        // let notfound = document.createElement("DIV");
        // notfound.innerHTML = `
        // <div class="d-flex flex-column flex-sm-row align-items-center justify-content-center text-center text-sm-left error-message"
        //      color=(icon.classList.contains('fa-moon') ? 'text-white' : 'text-dark'>
        //     <img src="./img/file-not-found.gif" alt="404 error" width="100" height="100" class="m-2">
        //     <div>
        //       <p class="lead"> <span class="text-danger">Oops!</span> Book not found.</p>
        //       <p class="fs-3">The book you’re looking for doesn’t exist.</p>
        //     </div>
        // </div>
        // `;

        // document.getElementById("results").appendChild(notfound);
        
        location.replace("404.html"); // Redirect to 404 page
      } else {
        for (let i = 0; i < res.items.length; i++) {
          // DIV
          const bookCard = document.createElement("div");

          // Image
          if (res.items[i].volumeInfo.imageLinks) {
            var bookImageContainer = document.createElement("div");
            bookImageContainer.classList.add("col-md-2", "offset-md-2");

            const bookImage = document.createElement("img");
            bookImage.src = res.items[i].volumeInfo.imageLinks.smallThumbnail;
            bookImage.classList.add("w-100");

            bookImageContainer.appendChild(bookImage);
          }

          // Title
          const bookInfo = document.createElement("div");
          bookInfo.classList.add("col-md-8");
          const bookTitle = document.createElement("h1");
          bookTitle.textContent = res.items[i].volumeInfo.title;

          //Author
          if (res.items[i].volumeInfo.authors) {
            var bookAuthor = document.createElement("h6");
            bookAuthor.textContent = `by ${
              res.items[i].volumeInfo.authors[0]
                ? res.items[i].volumeInfo.authors[0]
                : "No title"
            }`;
          }

          // Description
          const bookDescription = document.createElement("p");
          bookDescription.classList.add("description");
          const desc = res.items[i].volumeInfo.description
            ? res.items[i].volumeInfo.description
            : "No description";

          const shortPar = document.createElement("span");
          shortPar.classList.add("short-description");
          const shortDesc = document.createTextNode(desc.substring(0, 100));
          shortPar.appendChild(shortDesc);

          const remainingPar = document.createElement("span");
          remainingPar.classList.add("remaining-description");
          const remainingDesc = document.createTextNode(desc.substring(100));
          remainingPar.appendChild(remainingDesc);

          const readMoreBtn = document.createElement("span");
          readMoreBtn.classList.add("read-more-btn");
          const readMoreBtnText = document.createTextNode(" ...Read More");
          readMoreBtn.appendChild(readMoreBtnText);
          readMoreBtn.addEventListener("click", (e) => {
            const remainingDescription = e.target.parentNode.querySelector(
              ".remaining-description"
            );
            remainingDescription.classList.toggle(
              "remaining-description--show"
            );

            e.target.textContent = e.target.textContent.includes(
              " ...Read More"
            )
              ? " ...Read Less"
              : " ...Read More";
          });

          bookDescription.appendChild(shortPar);
          bookDescription.appendChild(remainingPar);
          if (desc !== "No description") {
            bookDescription.appendChild(readMoreBtn);
          }

          // Button
          const bookPreviewLink = document.createElement("a");
          bookPreviewLink.innerHTML = "READ";
          bookPreviewLink.href = res.items[i].volumeInfo.previewLink;
          bookPreviewLink.target = "blank";

          const speechButton = document.createElement("button");
          speechButton.classList.add("listen", "btn", "btn-outline-secondary");
          speechButton.textContent = "LISTEN";

          bookPreviewLink.classList.add("btn", "btn-outline-secondary");
          bookCard.classList.add("result", "row");
          bookCard.setAttribute("data-aos", "fade-up");

          bookInfo.append(
            bookTitle,
            bookAuthor,
            bookDescription,
            bookPreviewLink,
            speechButton
          );

          bookCard.append(bookInfo, bookImageContainer);
          document.getElementById("results").appendChild(bookCard);
          document.getElementById("results").scrollIntoView();
        }
        const speechButtons = document.querySelectorAll(".listen");
        for (const speechButton of speechButtons) {
          let isOn = false;
          speechButton.addEventListener("click", (e) => {
            console.log(e);
            console.log(speechButton.textContent);
            if (speechButton.textContent == "LISTEN") {
              speechButton.textContent = "STOP";
            } else {
              speechButton.textContent = "LISTEN";
            }
            isOn = !isOn;
            if (isOn) {
              listen(e, false);
            } else {
              listen(e, true);
            }
          });
        }
      }
    },
    maxResults: 30,
    type: "GET",
  });
}

document.querySelector(".search-form").addEventListener("submit", search);

const scroll = document.getElementById("return-to-top");
window.onscroll = () => scrollFunction();
function scrollFunction() {
  if (document.body.scrollTop || document.documentElement.scrollTop > 20) {
    scroll.classList.remove("special1");
  } else {
    scroll.classList.add("special1");
  }
}

var icon = document.getElementById("icon");
icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "img/sun.png";
    localStorage.setItem("theme", "dark");
  } else {
    icon.src = "img/moon.png";
    localStorage.setItem("theme", "light");
  }
};

const initIcon = () => {
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "img/sun.png";
  } else {
    icon.src = "img/moon.png";
  }
};
window.onload = initIcon();
