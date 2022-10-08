function listen(e) {
  const div = e.target.parentElement;
  const text = div.children[2].innerText;
  const book = div.children[0].innerText;
  const author = div.children[1].innerText;

  const message = `The name of the book is ${book}  . It is written ${author} .  ${text}`;

  console.log(text);
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
      const myNode = document.getElementById("results");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
      if (res.totalItems == 0) {
        const div = document.createElement("div");
        const h1 = document.createElement("h1");
        h1.textContent = "Book Not Found!";
        div.appendChild(h1);
        document.getElementById("results").appendChild(div);
      } else {
        for (let i = 0; i < res.items.length; i++) {
          // DIV
          const div = document.createElement("div");

          // Image
          if (res.items[i].volumeInfo.imageLinks) {
            var imgDiv = document.createElement("div");
            imgDiv.classList.add("col-md-2", "offset-md-2");

            const img = document.createElement("img");
            img.src = res.items[i].volumeInfo.imageLinks.smallThumbnail;
            img.classList.add("w-100");

            imgDiv.appendChild(img);
          }

          // Title
          const textDiv = document.createElement("div");
          textDiv.classList.add("col-md-8");
          const h1 = document.createElement("h1");
          h1.textContent = res.items[i].volumeInfo.title;

          //Author
          if (res.items[i].volumeInfo.authors) {
            var p = document.createElement("h6");
            const author = document.createTextNode(
              `by ${
                res.items[i].volumeInfo.authors[0]
                  ? res.items[i].volumeInfo.authors[0]
                  : "No title"
              }`
            );
            p.appendChild(author);
          }

          // Description
          const par = document.createElement("p");
          const desc = document.createTextNode(
            res.items[i].volumeInfo.description
              ? res.items[i].volumeInfo.description
              : "No description"
          );
          par.appendChild(desc);

          // Button
          const btn = document.createElement("a");
          btn.innerHTML = "READ";
          btn.href = res.items[i].volumeInfo.previewLink;
          btn.target = "blank";

          const speech = document.createElement("button");
          speech.classList.add("listen", "btn", "btn-outline-secondary");
          speech.textContent = "LISTEN";

          btn.classList.add("btn", "btn-outline-secondary");
          div.classList.add("result", "row");

          textDiv.append(h1, p, par, btn, speech);

          div.append(textDiv, imgDiv);
          document.getElementById("results").appendChild(div);
          document.getElementById("results").scrollIntoView();
        }

        const buttons = document.querySelectorAll(".listen");

        for (const button of buttons) {
          button.addEventListener("click", (e) => {
            console.log("clicked");
            listen(e);
          });
        }
      }
    },
    maxResults: 30,
    type: "GET",
  });
}

document.querySelector(".search-form").addEventListener("submit", search);
