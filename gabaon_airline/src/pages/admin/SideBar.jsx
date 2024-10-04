import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsAlarm, BsArrowLeft, BsBook, BsChat, BsGraphUp, BsPerson } from 'react-icons/bs';
import axios from 'axios';
import swal from "sweetalert";

const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/users/logout');
            localStorage.removeItem('token');
            window.location.href = '/signin';
            swal("Deconnexion!", "Déconnexion réussie!", "success");
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    const confirmLogout = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = (confirm) => {
        setIsModalOpen(false);
        if (confirm) {
            handleLogout();
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl text-red-500">Confirmation de Déconnexion</h2>
                        <p className="text-lg">Voulez-vous vraiment vous déconnecter ?</p>
                        <button className="bg-red-500 text-lg text-white font-bold rounded-lg w-full mt-4 p-2" onClick={() => handleModalClose(true)}>Oui</button>
                        <button className="bg-blue-500 text-lg text-white font-bold rounded-lg w-full mt-2 p-2" onClick={() => handleModalClose(false)}>Non</button>
                    </div>
                </div>
            )}
        <div className="fixed hidden top-0 left-0 w-38 h-screen bg-gray-800 text-white overflow-y-auto p-4 z-40 md:block lg:block xl:block ">
                <ul className="list-none p-0 m-0">
                    <li className={`flex flex-col items-center p-3 text-lg border-b border-gray-600 transition duration-300 ${window.location.pathname === '/member/dashboarder' ? 'bg-gray-600' : 'hover:bg-gray-700'}`}>
                        <div className="text-xl mb-1"><BsGraphUp /></div>
                        <Link to="/utilisateur" className="text-white">Gestion utilisateur</Link>
                    </li>
                    <li className={`flex flex-col items-center p-3 text-lg border-b border-gray-600 transition duration-300 ${window.location.pathname === '/member/courser' ? 'bg-gray-600' : 'hover:bg-gray-700'}`}>
                        <div className="text-xl mb-1"><BsBook /></div>
                        <Link to="/vole" className="text-white"> Gerer volle</Link>
                    </li>
                    <li className={`flex flex-col items-center p-3 text-lg border-b border-gray-600 transition duration-300 ${window.location.pathname === '/member/challenger' ? 'bg-gray-600' : 'hover:bg-gray-700'}`}>
                        <div className="text-xl mb-1"><BsChat /></div>
                        <Link to="/embarquement" className="text-white">Gerer embarquemetn</Link>
                    </li>
                    <li className={`flex flex-col items-center p-3 text-lg border-b border-gray-600 transition duration-300 ${window.location.pathname === '/member/annoncer' ? 'bg-gray-600' : 'hover:bg-gray-700'}`}>
                        <div className="text-xl mb-1"><BsAlarm /></div>
                        <Link to="/reservation-admin" className="text-white">Reservation </Link>
                    </li>
                    <li className={`flex flex-col items-center p-3 text-lg border-b border-gray-600 transition duration-300 ${window.location.pathname === '/member/annoncer' ? 'bg-gray-600' : 'hover:bg-gray-700'}`}>
                        <div className="text-xl mb-1"><BsAlarm /></div>
                        <Link className="text-white"  onClick={handleLogout}>Deconnexion </Link>
                    </li>
                
                </ul>
            </div>

            {/* Sidebar mobile */}
            <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-1 h-20 flex justify-around md:hidden">
  <Link to="/user-dashboard" className='flex flex-col justify-center items-center'>
    <BsGraphUp className="text-white text-2xl" />
    <span className="text-white text-xs">Dashboard</span>
  </Link>
  <Link to="/member-cours " className='flex flex-col justify-center items-center'>
    <BsBook className="text-white text-2xl" />
    <span className="text-white text-xs">Cours</span>
  </Link>
  <Link to="/challenge" className='flex flex-col justify-center items-center'>
    <BsPerson className="text-white text-2xl" />
    <span className="text-white text-xs">Challenge</span>
  </Link>
  {/* <Link to="/member/annonce">
    <BsAlarm className="text-white text-2xl" />
    <span className="text-white text-xs">Annonces</span>
  </Link> */}
  <Link to="/member-profile" className='flex flex-col justify-center items-center'>
    <BsPerson className="text-white text-3xl" />
    <span className="text-white text-xs">Profil</span>
  </Link>
  <span onClick={confirmLogout} className='flex flex-col justify-center items-center'>
    <BsArrowLeft className="text-white cursor-pointer text-2xl" />
    <span className="text-white text-xs">Déconnexion</span>
  </span>
</div>
        </>
    );
};

export default Sidebar;