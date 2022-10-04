var i = 0;
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
          console.log(
            res.items[i].volumeInfo.title +
              " " +
              res.items[i].volumeInfo.subtitle +
              " " +
              res.items[i].volumeInfo.authors +
              " " +
              res.items[i].volumeInfo.imageLinks.smallThumbnail
          );

          // DIV
          var div = document.createElement("DIV");
          div.classList.add("card");
          
          // Image
          var imgDiv = document.createElement("DIV");
          imgDiv.classList.add("card__image-holder");
          var img = document.createElement("IMG");
          img.src = res.items[i].volumeInfo.imageLinks.smallThumbnail;
          img.classList.add("card__image");
          imgDiv.appendChild(img);
          div.appendChild(imgDiv);

          // Title
          var textDiv = document.createElement("DIV");
          textDiv.classList.add("card-title");
          var h2 = document.createElement("H2");
          var title = document.createTextNode(res.items[i].volumeInfo.title);
          
          textDiv.innerHTML = "<a href='#' class='toggle-info btn'> <span class='left'></span> <span class='right'></span></a>"
          
          h2.appendChild(title);
          
          //Author
          var p = document.createElement("small");
          var author = document.createTextNode(`by ${res.items[i].volumeInfo.authors[0] ? res.items[i].volumeInfo.authors[0] : 'No title'}`);
          p.appendChild(author);
          h2.appendChild(p);
          textDiv.appendChild(h2);
          div.appendChild(textDiv);
          //flap flap
          var flapflap = document.createElement("DIV");
          flapflap.classList.add("card-flap");
          flapflap.classList.add("flap1");

          // Description
          var par = document.createElement("DIV");
          par.classList.add("card-description");
          var desc = document.createTextNode(res.items[i].volumeInfo.description ? res.items[i].volumeInfo.description : 'No description');
          par.appendChild(desc);
          flapflap.appendChild(par);

          // Button
          var btn = document.createElement("a");
          btn.innerHTML = "READ NOW";
          btn.href = res.items[i].volumeInfo.previewLink
          btn.target = "blank"
          var cardaction = document.createElement("DIV");
          cardaction.classList.add("card-actions");
          cardaction.appendChild(btn);
          var cflapflap2 = document.createElement("DIV");
          cflapflap2.classList.add("card-flap");
          cflapflap2.classList.add("flap2");
          cflapflap2.appendChild(cardaction);
          flapflap.appendChild(cflapflap2);

            div.appendChild(flapflap);

          // div.appendChild(textDiv);
          // div.appendChild(imgDiv);
          document.getElementById("results").appendChild(div);
          if(i==0){
            $.getScript( './cards.js', function( data, textStatus, jqxhr ) {
              console.log("called");
            } );
            i = 1;
          }
          document.getElementById("results").scrollIntoView();
        }
      }
    },
    maxResults: 30,
    type: "GET",
  });
  
}

document.querySelector(".search-form").addEventListener("submit", search);