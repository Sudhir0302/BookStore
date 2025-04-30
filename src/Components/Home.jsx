import React, { useEffect, useState } from 'react';
import { bookCollection } from './BookCollections';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { X } from 'lucide-react';
import Admin from './Admin';
import About from './About'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import LoginPopup from './LoginPopup.jsx';
import { serverurl } from '../App.jsx';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full h-96 mb-8">
      <div className="absolute inset-0">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <button
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-300"
      >
        <ChevronLeft size={24} /> 
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-300"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};


const Popup = ({handlePop,popdata}) => {

  const navigate=useNavigate();

  return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg ring-4 ring-slate-600-500 ring-opacity-40 shadow-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4">{popdata}</h2>
            <p className="mb-4 text-gray-700">Added to cart!!</p>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              onClick={() => handlePop()}
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-transparent text-black border-2 border-black rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 ml-20"
              onClick={() => navigate('/cart')}
            >
              CheckOut
            </button>
          </div>
        </div>
  )
}

const DetailedBookView = ({ book, onClose ,isAdded,setIsAdded}) => {
  const { user, isLogin } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleAddToCart = async (bookId) => {
      if (!isLogin) {
          setIsPopupOpen(true);
          return;
      }

      try {
          const response = await axios.put(serverurl+'/user/addcart', {
              userId: user._id,
              bookId
          });
          setIsAdded(true);
          console.log('Book added to cart:', response.data.message);
      } catch (error) {
          console.error('Error adding to cart:', error);
      }
  };

  const handleClosePopup = () => {
      setIsPopupOpen(false);
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg ring-4 ring-slate-600-500 ring-opacity-40 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                  Close
              </button>
              <div className="flex flex-col md:flex-row gap-8">
                  <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-full md:w-1/3 h-64 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                      <p className="text-gray-600 mb-4">
                          by <span className="text-blue-800">{book.author}</span>
                      </p>
                      <p className="text-gray-700 mb-4">{book.description}</p>
                      <div className="mb-4">
                          <h3 className="text-lg font-semibold mb-2">Overview</h3>
                          <p className="text-gray-700">{book.overview}</p>
                          <a href="#" className="text-blue-400 text-sm">Read more</a>
                      </div>
                      <div className="mb-4">
                          <h3 className="text-lg font-semibold mb-2">Details</h3>
                          <ul className="list-disc pl-5 text-gray-700">
                              <li><strong>Language:</strong> {book.language}</li>
                              <li><strong>Genre:</strong> {book.genre}</li>
                              <li><strong>Publisher:</strong> {book.publisher}</li>
                          </ul>
                      </div>
                      <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">₹{book.price}</span>
                          <button
                              className={`font-bold py-2 px-4 rounded ${
                                  isAdded ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
                              } text-white`}
                              onClick={() => handleAddToCart(book.id)}
                              disabled={isAdded}
                          >
                              {isAdded ? 'Added to Cart' : 'Add to Cart'}
                          </button>
                      </div>
                  </div>
              </div>
          </div>

          {isPopupOpen && <LoginPopup onClose={handleClosePopup} />}
      </div>
  );
};

const ProductCard = ({ title, author, description, price, imageUrl, overview, stockAvailability, language, genre, format, publisher ,id,handlePop}) => {
  const [isDetailedViewOpen, setIsDetailedViewOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { user, isLogin } = useAuth();
  

  const handleAddToCart = async (e,bookId) => {
    e.stopPropagation();
    if (!isLogin) {
        setIsPopupOpen(true);
        return;
    }

    try {
        const response = await axios.put(serverurl+'/user/addcart', {
            userId: user._id,
            bookId
        });
        setIsAdded(true);
        console.log('Book added to cart:', response.data.message);
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
};

const handleClosePopup = () => {
    setIsPopupOpen(false);
};



  const openDetailedView = () => {
    setIsDetailedViewOpen(true);
  };

  const closeDetailedView = () => {
    setIsDetailedViewOpen(false);
  };

  return (
    <>
      <div
        className="bg-white rounded-lg overflow-hidden shadow-lg ring-4 ring-slate-600-500 ring-opacity-40 max-w-xs mx-auto flex flex-col justify-between hover:scale-105 duration-200 hover:shadow-lg cursor-pointer"
        onClick={openDetailedView}
      >
        <div className="relative">
          <img className="w-full h-64 object-cover" src={imageUrl} alt={title} />
        </div>
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-medium font-1">{title}</h3>
          <p className="text-gray-600 text-xs mb-4 font-3">
            by <span className="text-blue-800">{author}</span>
          </p>
          <p className="text-gray-600 text-sm mb-4 font-3 line-clamp-3">
            {description}
          </p>
        </div>
        <div className="p-4 flex items-center justify-between mt-auto">
          <span className="font-bold text-lg">₹{price}</span>
          <button
            className={`font-bold py-1 px-2 p-1 text-sm rounded font-1 ${
              isAdded ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
            onClick={(e)=>handleAddToCart(e,id)}
            disabled={isAdded}
          >
            {isAdded ? 'Added' : 'Add to Cart'}
            {/* {pop ? <Popup />:" "} */}
          </button>
        </div>
      </div>
      {isDetailedViewOpen && (
        <DetailedBookView
          book={{ title, author, description, price, imageUrl, overview, stockAvailability, language, genre, format, publisher,id }}
          onClose={closeDetailedView}
          isAdded={isAdded}
          setIsAdded={setIsAdded}
        />
      )}
       {isPopupOpen && <LoginPopup onClose={handleClosePopup} />}
    </>
  );
};

const GenreSection = ({ genre, books, search,handlePop}) => {
  const [startIndex, setStartIndex] = React.useState(0);

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, books.length - 5));
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredBooks.length === 0 && search) {
    return null;
  }

  return (
    <div className="mb-12">
      <h1 className="text-3xl font-bold mb-6 font-4">{genre}</h1>
      <div className="relative">
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:scale-110 duration-300 hover:bg-blue-300"
          disabled={startIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4">
        {filteredBooks.slice(startIndex, startIndex + 5).map((book) => (
          <ProductCard
            key={book._id} 
            title={book.title}
            author={book.author}
            description={book.description}
            price={book.price}
            imageUrl={book.imageUrl}
            overview={book.overview}
            stockAvailability={book.stockAvailability}
            language={book.language}
            genre={book.genre}
            format={book.format}
            publisher={book.publisher}
            id={book._id} 
            handlePop={handlePop}
          />
        ))}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:scale-110 duration-300 hover:bg-blue-300"
          disabled={startIndex >= filteredBooks.length - 5}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

const Home = ({ search, category, OnCategory }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pop, setPop] = useState(false);
  const [popdata, setPopdata] = useState('');

  
  const carouselImages = [
    'https://cdn.pixabay.com/photo/2014/09/05/18/32/old-books-436498_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/10/09/08/38/book-978878_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/16/20/55/books-4208228_960_720.jpg',
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      const token=localStorage.getItem('token')
      try {
        const response=await axios.get(serverurl+"/books",{
          withCredentials: true
        })
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to load books');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handlePop = (data) => {
    setPopdata(data);
    setPop(!pop);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const matchedGenres = Object.entries(
    books.reduce((acc, book) => {
      if (category && !book.genre.toLowerCase().includes(category.toLowerCase())) {
        return acc;
      }
      const genre = book.genre;
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(book);
      return acc;
    }, {})
  ).filter(([genre, books]) =>
    books.some((book) => book.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className='text-center font-5 text-4xl mb-3 shadow-lg bg-slate-800 text-white h-14 p-2 w-full top-0'>WelCome to Bookart</h1>
        
        <Carousel images={carouselImages} />

        {matchedGenres.length > 0 ? (
          matchedGenres.map(([genre, books], index) => (
            <GenreSection
              key={`${genre}-${index}`} 
              genre={genre}
              books={books}
              search={search}
              handlePop={handlePop}
            />
          ))
        ) : (
          <div className="w-full h-full my-96">
            <h2 className="text-2xl text-center">No books found.</h2>
          </div>
        )}
        {pop && <Popup handlePop={handlePop} popdata={popdata} />}
      </div>
      <About OnCategory={OnCategory} />
    </div>
  );
};

export default Home;