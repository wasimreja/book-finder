function search(e) {
  e.preventDefault();

  const searchElem = $('#input');
  if (!searchElem) return;
  var search = searchElem.val()?.trim() || '';
  if (!search) return;
  searchElem.val('');

  $.ajax({
    url: `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=20`,
    dataType: 'json',
    maxResults: 30,
    type: 'GET',
    beforeSend: function () {
      $('#req-status').html('Loading ...').css('color', 'green');
    },
    error: function () {
      $('#req-status').html('Failed to load books ...').css('color', 'salmon');
    },
    success: function (res) {
      var myNode = $('#results');
      if (!myNode) return;
      $('#req-status').html('');
      if (!res.items?.length) {
        $('#req-status').html('No books found').css('color', 'violet');
        return;
      }

      const results = res.items?.map((item) => {
        return `
        <tr>
          <th scope="row">
            <img 
              title=${item.volumeInfo?.title || '-'} 
              alt=${item.volumeInfo?.title || '-'} 
              src=${item.volumeInfo?.imageLinks?.smallThumbnail} 
            />
          </th>
          <td>
            <a 
              target="_blank"
              title=${item.volumeInfo?.title || '-'} 
              href=${item.volumeInfo?.previewLink} 
            >
              ${item.volumeInfo?.title || '-'}
            </a>
          </td>
          <td>${item.volumeInfo?.subtitle || '-'}</td>
          <td>${item.volumeInfo?.authors?.join(', ') || '-'}</td>
        </tr>
        `;
      });

      const template = `
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Thumbnail</th>
              <th scope="col">Title</th>
              <th scope="col">Subtitle</th>
              <th scope="col">Authors</th>
            </tr>
          </thead>
          <tbody>
            ${results.join('')}
          </tbody>
        </table>
      `;

      myNode.html(template);
      return;
    },
  });
}

$('#searchForm').submit(search);
