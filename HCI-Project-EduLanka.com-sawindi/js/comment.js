//Book class : represent a book

class Comment{
    constructor(name, email, msg){
        this.name = name;
        this.email = email;
        this.msg = msg;
    }
}

//UI class : handle Ui tasks

class UI{
    static displayBooks(){
        const books = Store.getBook();
        books.forEach((book)=>UI.addCommentToList(book));
    }

    static addCommentToList(comment){
        //create the row in a table
        const ul = document.querySelector('#comment-list');

        function taskDate(dateMilli) {
            var d = (new Date(dateMilli) + '').split(' ');
            d[2] = d[2] + ',';
        
            return [d[0], d[1], d[2], d[3]].join(' ');
        }

        var datemilli = Date.parse(Date());
        
        const li = document.createElement('li');
        li.innerHTML = `
        <p><span class="h6 font-weight-bold">${comment.name}</span><small class="ml-5">${taskDate(datemilli)}</small></p>
        <p>${comment.msg}</p>
        <hr/>
        `;

        ul.appendChild(li);

    }

    static ClearFields(){
        document.querySelector('#validationCustom01').value = '';
        document.querySelector('#validationCustom02').value = '';
        document.querySelector('#validationTextarea').value = '';
    }

    static showAlerts(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(`${message}`));

        const show_alert = document.querySelector('.show-alert');
        const form = document.querySelector('#book-form');

        show_alert.appendChild(div);

        //vanish alert
        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }

}

//Store class : handle store data
    //handle storage
    class Store{
        static getBook(){
            //local storage keeps basicall key values pairs
            //we cannot store objects in local storage
            //It has to be a string
            let books;
            //check if there is a current book items in the local storage
            if(localStorage.getItem('books')===null){
                books = [];
            }else{
                books = JSON.parse(localStorage.getItem('books'));
            }
            return books;
        }

        static addComment(comment){
            const books = Store.getBook();
            books.push(comment);
            localStorage.setItem('books',JSON.stringify(books));
        }
        
    }



//Event : Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
 
//Event : Add a book
const form = document.querySelector('#book-form');

form.addEventListener('submit', (e)=>{
    //prevent actual submit
    e.preventDefault();
    //get form values
    const name = document.querySelector('#validationCustom01').value;
    const email = document.querySelector('#validationCustom02').value;
    const msg = document.querySelector('#validationTextarea').value;

    if(name === '' || email === '' || msg === ''){
       UI.showAlerts('Please fill in all fields!', 'danger');
    }else{
        //instantiate the Book class
        const comment = new Comment(name, email, msg);
        //add a book to UI
        UI.addCommentToList(comment);
        //add a book to store
        Store.addComment(comment);
        //clear fields
        UI.ClearFields();
        //Show success message
        UI.showAlerts('Comment added successful!', 'success');
    }
});


