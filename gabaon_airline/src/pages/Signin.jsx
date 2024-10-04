import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess, signInFailure } from '../store/userSlice';
import { Link, useNavigate } from 'react-router-dom';

// import B from "../assets/B.png";
import swal from "sweetalert";
import { Toaster } from 'react-hot-toast';
import NavBar from '../component/NavBar';


const Signin = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { error: errorMessage, user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };
 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8080/api/users/signin', { email, password });
            const { token, isAdmin } = response.data;
            dispatch(signInSuccess({ token, isAdmin }));
            localStorage.setItem('token', token);
            swal("Connecter!", "Connexion réussie!", "success");
            window.location.href = isAdmin ? '/utilisateur' : '/home';
        } catch (error) {
            swal("Connecter!", "Echec de connexion!", "error");
            resetForm();
            window.location.href = '/signin';
            console.error(error);
        }
    };

    return (<>
    <NavBar/>
    <div className=' h-screen flex items-center justify-center mt-32 '>
            <div className="h-screen w-full md:w-1/3 p-10 flex flex-col  mt-14 items-center">
                <div className="text-center flex flex-col items-center">
                   <Link to="/">
                
                    {/* <h1 className="text-3xl text-gray-300 mb-10">Black Born Community</h1> */}
                    
                    
                     </Link>
                    {/* <img src={B} width="20%" height="200px" alt='logo bbc' /> */}
                    <h1 className="text-2xl mb-10">Se connnecter</h1>
                </div>
                <form className='mt-14' onSubmit={handleSubmit}>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Adresse mail*
                    </label>
                    <input
                        type='email'
                        placeholder='name@company.com'
                        id='email'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mb-6 border border-gray-200 rounded-md"
                    />
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Mot de passe*
                    </label>
                    <input
                        type='password'
                        placeholder='Mot de passe'
                        id='password'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 mb-6 border border-gray-200 rounded-md"
                    />
                    <button
                        className="w-full bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Se connecter'}
                    </button>
                </form>
                <div className='flex  flex-col  text-center gap-2 text-sm mt-5  '>
                    <span>Vous n'avez pas de compte?</span>
                    <Link to='/register' className='text-blue-500'>
                        Creer un compte
                    </Link>
                </div>
                {errorMessage && (
                    <span className='mt-5 text-red-500'>{errorMessage}</span>
                )}
               
            </div>
            {/* Div de droite caché en mode mobile */}
            {/* <div className="hidden md:block bg-cover bg-center h-screen w-2/3"
                style={{
                    backgroundImage: `url(${bglog})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
            </div> */}
            <Toaster />
        </div>
    </>
        
    );
};

export default Signin;