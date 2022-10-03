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
      if (res.totalItems == 0) {
        var div = document.createElement("DIV");
        var h1 = document.createElement("H1");
        var error_res = document.createTextNode("Book Not Found !");
        h1.appendChild(error_res);
        div.appendChild(h1);
        document.getElementById("results").appendChild(div);
      }
      else {
        for (var i = 0; i < res.items.length; i++) {
          // console.log(
          //   res.items[i].volumeInfo.title +
          //     " " +
          //     res.items[i].volumeInfo.subtitle +
          //     " " +
          //     res.items[i].volumeInfo.authors +
          //     " " +
          //     res.items[i].volumeInfo.imageLinks.smallThumbnail
          // );

          // DIV
          var div = document.createElement("DIV");

          // Image
          var imgDiv = document.createElement("DIV");
          imgDiv.classList.add("col-md-2");
          imgDiv.classList.add("offset-md-2");

          var img = document.createElement("IMG");
          img.src = res.items[i].volumeInfo.imageLinks.smallThumbnail;
          img.classList.add("w-100");

          imgDiv.appendChild(img);

          // Title
          var textDiv = document.createElement("DIV");
          textDiv.classList.add("col-md-8");
          var h1 = document.createElement("H1");
          var title = document.createTextNode(res.items[i].volumeInfo.title);
          h1.appendChild(title);

          //Author

          var p = document.createElement("h6");
          var author = document.createTextNode(`by ${res.items[i].volumeInfo.authors[0]}`);
          p.appendChild(author);

          // Description
          var par = document.createElement("p");
          var desc = document.createTextNode(res.items[i].volumeInfo.description);
          par.appendChild(desc);

          // Button
          var btn = document.createElement("a");
          btn.innerHTML = "READ NOW";
          btn.href = res.items[i].volumeInfo.previewLink
          btn.target = "blank"

          btn.classList.add("btn");
          btn.classList.add("btn-outline-secondary");
          div.classList.add("result");
          div.classList.add("row");

          textDiv.appendChild(h1);
          textDiv.appendChild(p);
          textDiv.appendChild(par);
          textDiv.appendChild(btn);

          div.appendChild(textDiv);
          div.appendChild(imgDiv);
          document.getElementById("results").appendChild(div);
        }
      }
    },
    maxResults: 30,
    type: "GET",
  });
}

document.querySelector(".search-form").addEventListener("submit", search);
