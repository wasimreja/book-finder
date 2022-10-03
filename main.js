
let retfield = document.querySelector('.count')
retfield.addEventListener('keydown',(e)=>{
  if(e.key === 'Enter'){
    console.log("Working")
    const number = Number(e.target.value)
    getresult(number)
  }
})


//get the results from the api

const getresult = (number)=>{

  var search = document.getElementById("input").value;

  document.getElementById("input").value = "";
  document.activeElement.blur(); 

  $.ajax({
    url:
      "https://www.googleapis.com/books/v1/volumes?q=" +
      search +
      `&maxResults=${Number(number)}`,
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
          var author = document.createTextNode(`by ${res.items[i].volumeInfo.authors[0] ? res.items[i].volumeInfo.authors[0] : 'No title'}`);
          p.appendChild(author);

          // Description
          var par = document.createElement("p");
          var desc = document.createTextNode(res.items[i].volumeInfo.description ? res.items[i].volumeInfo.description : 'No description');
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


function search(e) {
  e.preventDefault();
  // var search = document.getElementById("input").value;

  // document.getElementById("input").value = "";
  // document.activeElement.blur(); // this removes focus on the input bar after search

  let num = document.querySelector('.count').value  // get the return value from the input field

  console.log("Working");
  
  if(!num){
    getresult(1)  //if nothing provided by user return just 1 result
  }else{
    getresult(num)   //if value provided then return that many results
  }
}


document.querySelector(".search-form").addEventListener("submit", search);
