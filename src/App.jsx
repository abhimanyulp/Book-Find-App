import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  //Books Data
  const [books, setBooks] = useState([]);

  //Book Input Values
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  //Filter Values
  const [filtered, setFiltered] = useState([])
  const [sort, setSort] = useState("")

  useEffect(() => {
    fetch()
  }, []);

  const fetch = async () => {
    try {
      const res = await axios.get("https://rose-crazy-lion.cyclic.app/books/getall")
      console.log(res.data.data)
      setBooks(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addBook = async (e) => {
    e.preventDefault()
    try {
      await axios.post("https://rose-crazy-lion.cyclic.app/books/post", {
        title,
        author,
        genre,
        description: desc,
        price
      })
      //Fech again
      fetch()
      //Resetting the values
      setTitle("")
      setAuthor("")
      setGenre("")
      setDesc("")
      setPrice("")
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBook = async (id) => {
    try {
      await axios.delete(`https://rose-crazy-lion.cyclic.app/books/delete/${id}`)
      fetch()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    filterBooks()
  }, [genre])

  const filterBooks = async () => {
    try {
      if (genre === "") {
        setFiltered(books)
      } else {

        const res = await axios.get(`https://rose-crazy-lion.cyclic.app/books/genre/${genre}`)
        console.log(res.data.data)
        setFiltered(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }

  }

  const sortAndFilter = async () => {

    if (sort === "asc") {
      const sortedData = [...filtered].sort((a, b) => a.price - b.price)
      setFiltered(sortedData)
    } else if (sort === "desc") {
      const sortedData = [...filtered].sort((a, b) => b.price - a.price)
      setFiltered(sortedData)
    }


  }

  return (
    <div>

      {/* Add Book Section  */}
      <h1>Add Book</h1>
      <form onSubmit={addBook}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <label>Author:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <br />
        <label>Genre:</label>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="Comic">Comic</option>
        </select>
        <br />
        <label>Description:</label>
        <textarea type="text" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
        <br />
        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        <br />
        <button type='submit'>Add Book</button>
      </form>

      {/* Filtering and Sorting   */}
      <h1>Filter and Sort</h1>
      <label>Filter by genre:</label>
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">Select</option>
        <option value="Fiction">Fiction</option>
        <option value="Science">Science</option>
        <option value="Comic">Comic</option>
      </select>

      <label>Sort by price:</label>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Select</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>

      <button onClick={sortAndFilter}>Apply</button>

      {/* My Book Section  */}
      <h1>My Books</h1>

      <div id='main'>
        {
          filtered ? (
            filtered.map((book) => (
              <div key={book._id}>
                <h3>{book.title}</h3>
                <p>Author:</p>
                <p>{book.author}</p>
                <p>Genre:</p>
                <p>{book.genre}</p>
                <p>Description:</p>
                <p>{book.description}</p>
                <p>Price:</p>
                <p>{book.price}</p>
                <button onClick={() => deleteBook(book._id)}>Delete</button>
              </div>))
          ) : (
            books.map((book) => (
              <div key={book._id}>
                <h3>{book.title}</h3>
                <p>Author:</p>
                <p>{book.author}</p>
                <p>Genre:</p>
                <p>{book.genre}</p>
                <p>Description:</p>
                <p>{book.description}</p>
                <p>Price:</p>
                <p>{book.price}</p>
                <button onClick={() => deleteBook(book._id)}>Delete</button>
              </div>))
          )
        }
      </div>

      {/* {books.map((book) => (
        <div key={book._id}>
          <h3>{book.title}</h3>
          <p>Author:</p>
          <p>{book.author}</p>
          <p>Genre:</p>
          <p>{book.genre}</p>
          <p>Description:</p>
          <p>{book.description}</p>
          <p>Price:</p>
          <p>{book.price}</p>
          <button onClick={() => deleteBook(book._id)}>Delete</button>
        </div>))} */}

    </div>
  );
}

export default App;
