async function search(){
    const filterBy = document.querySelector("#filter-type").value;
    const searchInput = document.querySelector("#user-input").value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&filter=${filterBy}&key=${googleKey}`;

    try {
        const results = await axios.get(url);

        $("#search-results").empty();

        results.data.items.forEach(book => {
    
        let author;
  
        if(book.volumeInfo.authors == undefined){
            author = "Author name not avaiable";
        } else {
            author = book.volumeInfo.authors[0];
        } 

        let $items = $(`
        <div class="row g-0">
          <div class="col-md-4" 
             style="padding-top: 50px;">
          <img src="${book.volumeInfo.imageLinks.thumbnail}" 
               class="img-fluid rounded-start" 
               alt="book"
               style="width: 200px;">
          </div>

        <div class="col-md-8" style="padding-top: 30px;">
          <div class="card-body">
            <h3 class="card-title">Title: ${book.volumeInfo.title}</h3>
            <h4 class="card-title">By: ${author}</h4>
            <h5 class="card-title">Rating: ${book.volumeInfo.maturityRating}</h5>
            <h6 class="card-title">Langauge: ${book.volumeInfo.language}</h6>
            <p class="card-text">Published date: ${book.volumeInfo.publishedDate}</p>
            <a class="btn btn-primary" 
               href="${book.volumeInfo.previewLink}" 
               role="button">
               Check Now!!
            </a>
         </div>
        </div>
      </div>
        
        
        `);

        $("#search-results").append($items);

        save(book.volumeInfo.imageLinks.thumbnail,
             book.volumeInfo.title,
             author,
             book.volumeInfo.maturityRating,
             book.volumeInfo.language,
             book.volumeInfo.publishedDate,
             book.volumeInfo.previewLink
            )

    });
    } catch (error) {
        if(error instanceof TypeError){
            alert("Invalid input Please Try Again")
            location.reload();
        } 
    }
}


$('#click').on('click' ,function(){
    if (document.querySelector("#user-input").value == "" || document.querySelector("#filter-type").value == "Select here"){
        alert("Search bar cannot be empty");
        location.reload();
    }
    search();
});




