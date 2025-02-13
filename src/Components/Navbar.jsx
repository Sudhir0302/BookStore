import React, { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = ({ onSearch, onCategory }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLogin, user } = useAuth();
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    onCategory(selectedCategory);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between p-4">
          <div className="text-3xl font-bold font-5">
            <h1>Bookart</h1>
          </div>

          <div className="hidden lg:block flex-1 mx-8">
            <form className="relative" onSubmit={handleSearchSubmit}>
              <input
                type="search"
                placeholder="Search books..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  onSearch(e.target.value);
                }}
                className="w-64 py-2 pl-10 pr-4 text-sm text-gray-900 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <Search className="w-4 h-4 text-gray-500" />
              </button>
            </form>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <nav>
              <ul className="flex items-center space-x-6 text-sm font-medium">
                <li className="relative">
                  <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="bg-transparent hover:text-blue-400 transition focus:outline-none focus:ring-0"
                  >
                    <option className="bg-slate-800 text-white" value="">Categories</option>
                    <option className="bg-slate-800 text-white" value="Contemporary Fiction">Contemporary Fiction</option>
                    <option className="bg-slate-800 text-white" value="Classic Literature">Classic Literature</option>
                    <option className="bg-slate-800 text-white" value="Mystery/Thriller">Mystery/Thriller</option>
                    <option className="bg-slate-800 text-white" value="Science Fiction/Fantasy">Science Fiction/Fantasy</option>
                    <option className="bg-slate-800 text-white" value="Non-fiction">Non-fiction</option>
                  </select>
                </li>
                <li className="hover:text-blue-400 transition cursor-pointer" onClick={() => navigate('/')}>Home</li>
                <li className="hover:text-blue-400 transition cursor-pointer" onClick={() => navigate('/about')}>About</li>
                <li className="hover:text-blue-400 transition cursor-pointer" onClick={() => navigate('/cart')}>Checkout</li>
                {isLogin && user.role === 'admin' && (
                  <li className="hover:text-blue-400 transition cursor-pointer" onClick={() => navigate('/admin')}>Admin</li>
                )}
                <li className="hover:text-blue-400 transition cursor-pointer" onClick={() => navigate('/login')}>
                  {isLogin ? 'Logout' : 'Login'}
                </li>
              </ul>
            </nav>
          </div>

          <div className="lg:hidden relative">
            <button
              className="p-2 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            {isMobileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl py-2 z-50">
                <form className="px-4 pb-2" onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search books..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        onSearch(e.target.value);
                      }}
                      className="w-full py-2 pl-8 pr-4 text-sm text-gray-900 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                    >
                      <Search className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </form>

                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-2 text-sm bg-transparent hover:bg-slate-700 focus:outline-none"
                >
                  <option className="bg-slate-800" value="">Categories</option>
                  <option className="bg-slate-800" value="Contemporary Fiction">Contemporary Fiction</option>
                  <option className="bg-slate-800" value="Classic Literature">Classic Literature</option>
                  <option className="bg-slate-800" value="Mystery/Thriller">Mystery/Thriller</option>
                  <option className="bg-slate-800" value="Science Fiction/Fantasy">Science Fiction/Fantasy</option>
                  <option className="bg-slate-800" value="Non-fiction">Non-fiction</option>
                </select>

                <div className="border-t border-slate-700 my-2"></div>

                <div className="px-2">
                  <button onClick={() => navigate('/')} className="w-full text-left px-2 py-2 text-sm hover:bg-slate-700 rounded">Home</button>
                  <button onClick={() => navigate('/about')} className="w-full text-left px-2 py-2 text-sm hover:bg-slate-700 rounded">About</button>
                  <button onClick={() => navigate('/cart')} className="w-full text-left px-2 py-2 text-sm hover:bg-slate-700 rounded">Checkout</button>
                  {isLogin && user.role === 'admin' && (
                    <button onClick={() => navigate('/admin')} className="w-full text-left px-2 py-2 text-sm hover:bg-slate-700 rounded">Admin</button>
                  )}
                  <button onClick={() => navigate('/login')} className="w-full text-left px-2 py-2 text-sm hover:bg-slate-700 rounded">
                    {isLogin ? 'Logout' : 'Login'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;