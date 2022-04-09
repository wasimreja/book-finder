function search() {
	var search = document.getElementById('input').value;
	document.getElementById('input').value = '';
	console.log('Working');
	$.ajax({
		url: 'https://www.googleapis.com/books/v1/volumes?q=' + search + "&maxResults=20",
		dataType: 'json',

		success: function(res) {
			//console.log(res.items[0].volumeInfo);
			for (var i = 0; i < res.items.length; i++) {
				console.log(res.items[i].volumeInfo.title + " " + res.items[i].volumeInfo.subtitle + " " + res.items[i].volumeInfo.authors + " " + res.items[i].volumeInfo.imageLinks.smallThumbnail);
			}
		},
		maxResults: 30,
		type: 'GET'
	});
}

document.getElementById('button-addon1').addEventListener('click', search, false);