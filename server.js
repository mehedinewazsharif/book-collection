const express = require('express');
const res = require('express/lib/response');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
const port = 8000;
let books = [];


/* 
  I will try but last moment help Open AI and Stackoverflow.
*/



app.get("/", (req, res) => {
    //res.send("<h1>Hello express js</h1>");
    res.sendFile(__dirname + '/index.html');
});


app.get('/books', (req, res) => {
  res.json(books);
});


app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;
  const id = uuidv4();
  const book = { id, title, author, publishedDate };
  books.push(book);
  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: 'Book successfully deleted.' });
  } else {
    res.status(404).json({ message: 'Book not found.' });
  }
});



app.listen(port, () => {
    console.log(`Server is running at ${port}`);
}); 


/*
app.listen(8000, () => {
    console.log("Server run success");
});*/ 