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

        // Image
        var img = document.createElement("IMG");
        img.src = res.items[i].volumeInfo.imageLinks.smallThumbnail;

        // Title
        var h1 = document.createElement("H1");
        var title = document.createTextNode(res.items[i].volumeInfo.title);
        h1.appendChild(title);

        // Description
        var par = document.createElement("p");
        var desc = document.createTextNode(res.items[i].volumeInfo.description);
        par.appendChild(desc);

        // Button
        var btn = document.createElement("BUTTON");
        btn.innerHTML = "Read";
        btn.setAttribute(
          "onclick",
          "location.href = ' " + res.items[i].volumeInfo.previewLink + " '; "
        );

        btn.classList.add("btn");
        btn.classList.add("btn-outline-secondary");
        div.classList.add("result");
        div.classList.add("container");

        div.appendChild(h1);
        div.appendChild(img);
        div.appendChild(par);
        div.appendChild(btn);
        document.getElementById("results").appendChild(div);
      }
    },
    maxResults: 30,
    type: "GET",
  });
}

var words = ['Hi, there','I am help you to find out books'],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;
var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    }
    else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      }
      else {
        offset--;
      }
    }
    $('.word').text(part);
  },speed);
};

$(document).ready(function () {
  wordflick();
});

document.querySelector(".search-form").addEventListener("submit", search);
