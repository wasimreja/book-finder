function listen(e) {

  console.log("HI")
  const div = e.target.parentElement;
  var text = div.children[2].innerText;
  const Book = div.children[0].innerText ;
  const Author = div.children[1].innerText ;

  var message = `The name of the Book is ${Book}  . It is Written ${Author} .  ${text}` ;


  console.log(text);
  let synth = speechSynthesis;
  synth.cancel();

  setTimeout(() => {
    const speech = new SpeechSynthesisUtterance(message);
    const voices = synth.getVoices();
    speech.lang = 'en-US' ;
    synth.speak(speech);
  }, 1000);

}

function search(e) {
  const scroll = document.getElementById("scroll");
  scroll.classList.add("visible");
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
      } else {
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
          img.src = res.items[i].volumeInfo.imageLinks.smallThumbnail ;
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
<<<<<<< HEAD
          var author = document.createTextNode(
            `by ${res.items[i].volumeInfo.authors[0]}`
          );
=======
          var author = document.createTextNode(`by ${res.items[i].volumeInfo.authors[0] ? res.items[i].volumeInfo.authors[0] : 'No title'}`);
>>>>>>> 7331c90afae4a8607a18ec1aaeea89471737e1e8
          p.appendChild(author);

          // Description
          var par = document.createElement("p");
<<<<<<< HEAD
          var desc = document.createTextNode(
            res.items[i].volumeInfo.description
          );
=======
          var desc = document.createTextNode(res.items[i].volumeInfo.description ? res.items[i].volumeInfo.description : 'No description');
>>>>>>> 7331c90afae4a8607a18ec1aaeea89471737e1e8
          par.appendChild(desc);

          // Button
          var btn = document.createElement("a");
<<<<<<< HEAD
          btn.innerHTML = "Read";
          btn.href = res.items[i].volumeInfo.previewLink;
          btn.target = "blank";
=======
          btn.innerHTML = "READ";
          btn.href = res.items[i].volumeInfo.previewLink
          btn.target = "blank"
>>>>>>> 7331c90afae4a8607a18ec1aaeea89471737e1e8

          const speech = document.createElement('button');
          speech.classList.add('listen');
          speech.classList.add('btn');
          speech.classList.add('btn-outline-secondary');
          speech.innerText = 'LISTEN' ;

          btn.classList.add("btn");
          btn.classList.add("btn-outline-secondary");
          div.classList.add("result");
          div.classList.add("row");

          textDiv.appendChild(h1);
          textDiv.appendChild(p);
          textDiv.appendChild(par);
          textDiv.appendChild(btn);
          textDiv.appendChild(speech);

          div.appendChild(textDiv);
          div.appendChild(imgDiv);
          document.getElementById("results").appendChild(div);
          document.getElementById("results").scrollIntoView();
        }

        const buttons = document.querySelectorAll('.listen');

        for( let button of buttons)
        {
          button.addEventListener('click', (e)=>{
            listen(e);
          })
        }
      }
    },
    maxResults: 30,
    type: "GET",
  });
}

document.querySelector(".search-form").addEventListener("submit", search);
