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
        var img = document.createElement("IMG");
        img.src = res.items[i].volumeInfo.imageLinks.smallThumbnail;

        // Title
        var h1 = document.createElement("H1");
        var title = document.createTextNode(res.items[i].volumeInfo.title);
        h1.appendChild(title);

        // Description
        var par = document.createElement("p");
        // var desc = document.createTextNode(res.items[i].volumeInfo.description);
        var desc = clipText(res.items[i].volumeInfo.description);
        
        if (desc.short) {
          //shortened description
          var short = document.createTextNode(desc.short);
          // as the name shows
          var dotdotdot = document.createElement('span');
          dotdotdot.innerHTML = '...';
          // remainder of the description
          var rem = document.createElement('span');
          rem.innerHTML = ' ' + desc.rem;
          rem.classList.add('read-more')
          // element to show/hide the remainder
          var readMore = document.createElement("a");
          readMore.innerHTML = 'Read more';
          readMore.classList.add('show-more')
          readMore.addEventListener('click', (e)=>{
            let dot = e.path[1].children[0];
            let show = e.path[1].children[1];
            if (e.path[0].innerHTML == 'Read more') {
              dot.style.display = 'none';
              show.style.display = 'inline';
              e.path[0].innerHTML = 'Read Less'
            } else {
              dot.style.display = 'inline';
              show.style.display = 'none';
              e.path[0].innerHTML = 'Read more'
            }
          })

          par.appendChild(short)
          par.appendChild(dotdotdot)
          par.appendChild(rem)
          par.appendChild(readMore)
        } else {
          // in case the description is very long
          par.appendChild(document.createTextNode(desc.allText))
        }
        

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

document.querySelector(".search-form").addEventListener("submit", search);

function clipText(text) {
  let allText = (text)? text.split(' ') : '';
  let short = [];
  let rem = [];
  const LIMIT = 50;

  if (allText.length > LIMIT) {
    short = allText.slice(0, LIMIT);
    rem = allText.slice(LIMIT, allText.length - 1);
  }

  allText = allText.join(' ');
  (short)? short = short.join(' ') : '';
  (rem)? rem = rem.join(' ') : '';

  return {allText, short, rem};
}