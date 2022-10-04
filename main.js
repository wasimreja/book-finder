function search(e) {
  e.preventDefault();
  var search = document.getElementById("input").value;
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
        // Card
        var card = document.createElement("DIV");
        card.style.backgroundImage = `url(${res.items[i].volumeInfo.imageLinks.thumbnail})`;
        card.classList.add("result");

        //Card content
        var card_content = document.createElement("DIV");


          // Image
          var imgDiv = document.createElement("DIV");
          imgDiv.classList.add("col-md-2");
          imgDiv.classList.add("offset-md-2");


        //Author

        if (
          res.items[i].volumeInfo.authors &&
          res.items[i].volumeInfo.authors.length > 0
        ) {
          var p = document.createElement("h6");
          var author = document.createTextNode(
            `by ${res.items[i].volumeInfo.authors[0]}`
          );
          p.appendChild(author);
        }

        // Description
        var par = document.createElement("p");
        var desc = document.createTextNode(
          res.items[i].volumeInfo.description ?? ""
        );
        par.appendChild(desc);
        par.classList.add("card-desc");

        // Button
        var btn = document.createElement("a");
        btn.innerHTML = "Read";
        btn.href = res.items[i].volumeInfo.previewLink;
        btn.target = "blank";

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
