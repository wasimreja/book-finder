function listen(e) {
	const div = e.target.parentElement;
	var text = div.children[2].innerText;
	const Book = div.children[0].innerText;
	const Author = div.children[1].innerText;

	var message = `The name of the Book is ${Book}  . It is Written ${Author} .  ${text}`;

	console.log(text);
	let synth = speechSynthesis;
	synth.cancel();

	setTimeout(() => {
		const speech = new SpeechSynthesisUtterance(message);
		const voices = synth.getVoices();
		speech.lang = "en-US";
		synth.speak(speech);
	}, 1000);
}

function search(e) {
	e.preventDefault();
	var search = document.getElementById("input").value;
	if (search === "") return;
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
					if (res.items[i].volumeInfo.imageLinks) {
						var imgDiv = document.createElement("DIV");
						imgDiv.classList.add("col-md-2");
						imgDiv.classList.add("offset-md-2");

						var img = document.createElement("IMG");
						img.src = res.items[i].volumeInfo.imageLinks.smallThumbnail;
						img.classList.add("w-100");

						imgDiv.appendChild(img);
					}

					// Title
					var textDiv = document.createElement("DIV");
					textDiv.classList.add("col-md-8");
					var h1 = document.createElement("H1");
					var title = document.createTextNode(res.items[i].volumeInfo.title);
					h1.appendChild(title);

					//Author
					if (res.items[i].volumeInfo.authors) {
						var p = document.createElement("h6");
						var author = document.createTextNode(
							`by ${
								res.items[i].volumeInfo.authors[0]
									? res.items[i].volumeInfo.authors[0]
									: "No title"
							}`
						);
						p.appendChild(author);
					}

					// Description
					var par = document.createElement("p");
					par.classList.add("description");
					var desc = res.items[i].volumeInfo.description
						? res.items[i].volumeInfo.description
						: "No description";

					var shortPar = document.createElement("span");
					shortPar.classList.add("short-description");
					var shortDesc = document.createTextNode(desc.substring(0, 100));
					shortPar.appendChild(shortDesc);

					var remainingPar = document.createElement("span");
					remainingPar.classList.add("remaining-description");
					var remainingDesc = document.createTextNode(desc.substring(100));
					remainingPar.appendChild(remainingDesc);

					var readMoreBtn = document.createElement("span");
					readMoreBtn.classList.add("read-more-btn");
					var readMoreBtnText = document.createTextNode(" ...Read More");
					readMoreBtn.appendChild(readMoreBtnText);
					readMoreBtn.addEventListener("click", (e) => {
						var remainingDescription = e.target.parentNode.querySelector(
							".remaining-description"
						);
						remainingDescription.classList.toggle(
							"remaining-description--show"
						);

						e.target.textContent = e.target.textContent.includes(
							" ...Read More"
						)
							? " ...Read Less"
							: " ...Read More";
					});

					par.appendChild(shortPar);
					par.appendChild(remainingPar);
					if (desc !== "No description") {
						par.appendChild(readMoreBtn);
					}

					// Button
					var btn = document.createElement("a");
					btn.innerHTML = "READ";
					btn.href = res.items[i].volumeInfo.previewLink;
					btn.target = "blank";

					const speech = document.createElement("button");
					speech.classList.add("listen");
					speech.classList.add("btn");
					speech.classList.add("btn-outline-secondary");
					speech.innerText = "LISTEN";

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

				const buttons = document.querySelectorAll(".listen");

				for (let button of buttons) {
					button.addEventListener("click", (e) => {
						console.log("clickesd");
						listen(e);
					});
				}
			}
		},
		maxResults: 30,
		type: "GET",
	});
}

document.querySelector(".search-form").addEventListener("submit", search);
