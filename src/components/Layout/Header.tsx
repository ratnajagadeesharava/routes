import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white backdrop-blur border-b-white" >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          <a href="/" className="flex items-center">
            <svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-xl">Transit</span>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-4">
            
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
          <Link to="/" className='hover:text-blue-300'>Home</Link>  
            <Link to="/create" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Create
            </Link>
        
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;