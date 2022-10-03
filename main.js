

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

				//Author

				var p=document.createElement("h6");
				var author=document.createTextNode(`by ${res.items[i].volumeInfo.authors[0]}`);
				p.appendChild(author);

        // Description
        var par = document.createElement("p");
        var desc = document.createTextNode(res.items[i].volumeInfo.description);
        par.appendChild(desc);

        // Button
        var btn = document.createElement("a");
        btn.innerHTML = "Read";
		btn.href= res.items[i].volumeInfo.previewLink
		btn.target= "blank"

        btn.classList.add("btn");
        btn.classList.add("btn-outline-secondary");
        div.classList.add("result");
        div.classList.add("container");

        div.appendChild(h1);
				div.appendChild(p);
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
