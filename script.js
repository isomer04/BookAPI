const form = document.getElementById('search-form');
const resultsContainer = document.getElementById('results-container');
// document.getElementById('#name').innerText = localStorage.getItem('books');


form.addEventListener('submit', (event) => {
  event.preventDefault();
  const isbnInput = document.getElementById('isbn-input').value;
    const url= `https://openlibrary.org/api/books?bibkeys=ISBN:${isbnInput}&format=json&jscmd=data`;
    const url2= `https://openlibrary.org/isbn/${isbnInput}.json`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Handle the API response
    //   console.log(data.title)
    //   console.log(data)
    //   if(!localStorage.getItem('books')){
    //     localStorage.setItem('books', data.title);
    //   } else {
    //     let books= localStorage.getItem('books') + " ; " + data.title;
    //     localStorage.setItem('books'
    //     , books);
    //   }

      //put title into localStorage
    //   let books= localStorage.getItem('books') + " ; " + data.title;
    //   localStorage.setItem('books'
    //   , books);
    //   document.querySelector('h2').innerText = localStorage.getItem('books');

      displayResults(data[`ISBN:${isbnInput}`]);

    })
    .catch(error => {
      // Handle errors
      console.error(error);
    });
});

function displayResults(bookData) {
  resultsContainer.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = bookData.title;
  resultsContainer.appendChild(title);

  const author = document.createElement('p');
  author.textContent = `Author: ${bookData.authors[0].name}`;
  resultsContainer.appendChild(author);

  const coverImage = document.createElement('img');
  coverImage.src = bookData.cover.medium;
  resultsContainer.appendChild(coverImage);

  const description = document.createElement('p');
  description.textContent = bookData.subtitle || '';
  resultsContainer.appendChild(description);
}
