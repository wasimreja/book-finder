function search(e) {
  e.preventDefault();
  var search = document.getElementById("input").value;

  document.getElementById("input").value = "";
  document.activeElement.blur(); // this removes focus on the input bar after search

  console.log("Working");
  $.ajax({
    url:
      "https://www.googleapis.com/books/v1/volumes?q=" +
      search +
      "&maxResults=20",
    dataType: "json",

    success: function (res) {
      var myNode = document.getElementById("results");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
      for (var i = 0; i < res.items.length; i++) {
        console.log(res.items[i].volumeInfo.imageLinks);

        // Card
        var card = document.createElement("DIV");
        card.style.backgroundImage = `url(${res.items[i].volumeInfo.imageLinks.thumbnail})`;
        card.classList.add("result");

        //Card content
        var card_content = document.createElement("DIV");

        // Title
        var h1 = document.createElement("H1");
        var title = document.createTextNode(res.items[i].volumeInfo.title);
        h1.appendChild(title);

        // Description
        var par = document.createElement("p");
        var desc = document.createTextNode(
          res.items[i].volumeInfo.description ?? ""
        );
        par.appendChild(desc);
        par.classList.add("card-desc");

        // Button
        var btn = document.createElement("BUTTON");
        btn.innerHTML = "Read";
        btn.setAttribute(
          "onclick",
          "location.href = ' " + res.items[i].volumeInfo.previewLink + " '; "
        );

        btn.classList.add("btn");
        btn.classList.add("btn-outline-secondary");

        card_content.appendChild(h1);
        card_content.appendChild(par);
        card_content.appendChild(btn);
        card_content.classList.add("card-content-container");

        card.appendChild(card_content);

        document.getElementById("results").appendChild(card);
      }
    },
    maxResults: 30,
    type: "GET",
  });
}

document.querySelector(".search-form").addEventListener("submit", search);
