import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; // Assurez-vous d'avoir installé 'react-icons'
import { Link, useNavigate } from 'react-router-dom';
import gab from "../assets/gab.png"
function NavBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleloginClick = () => {
    navigate('/signin');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <section className="overflow-hidden border border-gray-100 fixed top-0 left-0 w-full z-50">
        <div className="bg-white">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-between py-5">
              <div className="w-auto">
                <Link
                  to='/'
                  className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
                >
                  {/* <span className='px-2 py-1 bg-gradient-to-r to-emerald-950 from-sky-800 rounded-lg text-white'>
       
                  </span> */}
                     <img className='w-16 h-10' src={gab}/>
                </Link>
              </div>
              <div className="w-auto hidden lg:block">
                <ul className="flex items-center mr-8">
                  <li className="mr-14 font-medium text-blue-700 hover:text-gray-200 tracking-tight"><Link to='/'>Recherche vole</Link></li>
                  <li className="mr-14 font-medium text-blue-700 hover:text-gray-200 tracking-tight"><Link to='/reservation'>Reservation</Link></li>
                  <li className="mr-14 font-medium text-blue-700 hover:text-gray-200 tracking-tight"><Link to='/programme'>Nos programmes</Link></li>
                  {/* <li className="mr-8 font-medium text-gray-100 hover:text-gray-200 tracking-tight border-r border-gray-700 pr-8"><a href="#">Events</a></li> */}
                  <li className="font-bold text-gray-800 hover:text-gray-200 tracking-tight border border-blue-400 p-2 rounded-xl hover:border-blue-500" onClick={handleloginClick}><a href="#">Se connecter</a></li>
                </ul>
              </div>
              <div className="lg:hidden">
                <button onClick={toggleMenu} aria-label="Toggle Menu">
                  <AiOutlineMenu className="text-white" size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className={`fixed top-0 right-0 h-full w-64 bg-gray-950 text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-between items-center p-4">
              <h2 className="font-bold">Menu</h2>
              <button onClick={toggleMenu} aria-label="Close Menu">
                <AiOutlineClose className="text-white" size={24} />
              </button>
            </div>
            <nav className="flex flex-col items-start p-4">
              <Link className="mb-2 hover:text-gray-400" to="/blog-site">Blog</Link>
              <Link className="mb-2 hover:text-gray-400" to="/why">Why BBC ?</Link>
              <Link className="mb-2 hover:text-gray-400" to="/company">For company</Link>
              {/* <Link className="mb-2 hover:text-gray-400" to="#">Events</Link> */}
              <button onClick={handleloginClick} className="mb-2 hover:text-gray-400">Se connecter</button>
            </nav>
          </div>
        )}
      </section>
    </>
  );
}

export default NavBar;