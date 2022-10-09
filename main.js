  const bookCard = e.target.parentElement;
  const bookDescription = bookCard.children[2].innerText;
  const bookName = bookCard.children[0].innerText;
  const authorName = bookCard.children[1].innerText;

  const message = `The name of the book is ${bookName}  . It is written ${authorName} .  ${bookDescription}`;

  console.log(bookDescription);
  let synth = speechSynthesis;
  synth.cancel();

  setTimeout(() => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    synth.speak(speech);
  }, 1000);
}

function search(e) {
  e.preventDefault();
  const search = document.getElementById("input").value;
  document.activeElement.blur(); // this removes focus on the input bar after search

  console.log("Working");
  $.ajax({
    url: `https://www.googleapis.com/books/v1/volumes?q="${search}"&maxResults=20`,
    dataType: "json",

    success: function (res) {
      const resultsContainer = document.getElementById("results");
      while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
      }
      let bookNotFound = res.totalItems === 0;
      if (bookNotFound) {
        const errorBlock = document.createElement("div");
        const errorMessage = document.createElement("h1");
        errorMessage.textContent = "Book Not Found!";
        errorBlock.appendChild(errorMessage);
        document.getElementById("results").appendChild(errorBlock);
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
          bookDescription.textContent = `${
            res.items[i].volumeInfo.description
              ? res.items[i].volumeInfo.description
              : "No description"
          }`;

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
          speechButton.addEventListener("click", (e) => {
            console.log("clicked");
            listen(e);
          });
        }
      }
    },
    maxResults: 30,
    type: "GET",
  });
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