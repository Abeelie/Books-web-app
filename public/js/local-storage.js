// Local Storage

async function save(img, title, author, maturityRating, language, publishedDate, previewLink){
    
    let newBookList = {
        img, title, author, maturityRating, language, publishedDate, previewLink
    }

    if(localStorage.getItem("books") == null){ 
        localStorage.setItem("books", '[]');
    }

    let bookList = JSON.parse(localStorage.getItem('books'));
    bookList.push(newBookList);

    localStorage.setItem("books", JSON.stringify(bookList))
}


async function showSearchHistory(){
    if(localStorage.getItem("books") !== null) {
       const list = JSON.parse(localStorage.getItem("books"));

       for (let i = 0; i < list.length; i++) {
        
        let $searchedBooks = $(`
        <div class="row g-0" data-toggle=${i}>
          <div class="col-md-4" 
             style="padding-top: 50px;">
          <img src="${list[i].img}" 
               class="img-fluid rounded-start" 
               alt="book"
               style="width: 200px;">
          </div>

        <div class="col-md-8" style="padding-top: 30px;">
          <div class="card-body">
            <h3 class="card-title">Title: ${list[i].title}</h3>
            <h4 class="card-title">By: ${list[i].author}</h4>
            <h5 class="card-title">Rating: ${list[i].maturityRating}</h5>
            <h6 class="card-title">Langauge: ${list[i].language}</h6>
            <p class="card-text">Published date: ${list[i].publishedDate}</p>
            <a class="btn btn-primary" 
               href="${list[i].previewLink}" 
               role="button">
               Check Now!!
            </a>
            <a class="btn btn-danger" 
               onClick="deleteSearchHistoryItem(${i})"
               role="button">
               Delete
            </a>
         </div>
        </div>
      </div>
        `);

        $("#search-history").append($searchedBooks);
           
       }
    }        
}


function deleteSearchHistoryItem(index){
    const list = JSON.parse(localStorage.getItem("books"));
    
    list.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(list));
    location.reload();
}

showSearchHistory()