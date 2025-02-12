import { useEffect, useState } from 'react';
import './assets/css/core.css';
import Navbar from './Components/Navbar';
import Cart from './Components/Cart';
import Home from './Components/Home';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import Admin from './Components/Admin';
import About from './Components/About';
import { AuthProvider } from './context/AuthContext.jsx';
import axios from 'axios';

function App() {
  const location = useLocation();
  const hidebar = location.pathname === '/' || location.pathname === '/register';

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://bookstore-server-1.onrender.com/books');
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks(searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory, books]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  const filterBooks = (term, category) => {
    let filtered = books;

    if (term) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(term.toLowerCase()) ||
        book.author.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((book) => book.genre === category);
    }

    setFilteredBooks(filtered);
  };

  return (
    <AuthProvider>
      <div>
          {hidebar&&<Navbar onSearch={handleSearch} onCategory={handleCategory} />}


        <Routes>
          <Route path='/' element={<Home search={searchTerm} category={selectedCategory} OnCategory={handleCategory} />} />
          <Route path='/register' element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/about' element={<About OnCategory={handleCategory} />} />
        </Routes>
      </div>
    </AuthProvider>
  )
};

export default App;
