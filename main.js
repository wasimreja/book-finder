function search(e) {
  e.preventDefault();
  const search = document.getElementById("input").value;

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
      const myNode = document.getElementById("results");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
      for (const i = 0; i < res.items.length; i++) {
        // DIV
        const div = document.createElement("DIV");

        // Image
        const img = document.createElement("IMG");
        img.src = res.items[i].volumeInfo.imageLinks.smallThumbnail;

        // Title
        const h1 = document.createElement("H1");
        const title = document.createTextNode(res.items[i].volumeInfo.title);
        h1.appendChild(title);

				//Author

				const p=document.createElement("h6");
				const author=document.createTextNode(`by ${res.items[i].volumeInfo.authors[0]}`);
				p.appendChild(author);

        // Description
        const par = document.createElement("p");
        const desc = document.createTextNode(res.items[i].volumeInfo.description);
        par.appendChild(desc);

        // Button
        const btn = document.createElement("a");
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

document.querySelector(".search-form").addEventListener("submit", search);
