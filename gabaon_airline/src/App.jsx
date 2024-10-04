import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

import Signin from './pages/Signin'

import Programme from './pages/Programme'
import Register from './pages/Register'
import PrivateRoutes from './component/PrivateRoutes'
import Vole from './pages/admin/Vole'
import Utilisateurs from './pages/admin/Utilisateurs'
import Embarquement from './pages/admin/Embarquement'
import ReservationAdmin from './pages/admin/ReservationAdmin'
import Reservation from './pages/Reservation'
import TicketPage from './pages/admin/TicketPage'
import AddBaggage from './pages/admin/component/AddBagage'
import BoardingPass from './pages/admin/component/BoardingPass'



function App() {


  return (
  <BrowserRouter>
  <Routes>
  <Route path="/" element= {<Home/>} />
  <Route path="/reservation" element= {<Reservation/>} /> 
  <Route   path="/signin" element= {<Signin/>} /> 
  <Route   path="/register" element= {<Register/>} /> 
  <Route   path="/programme" element= {<Programme/>} /> 


  <Route element={<PrivateRoutes adminOnly />}>
          <Route path="/utilisateur" element={<Utilisateurs/>} />
          <Route path="/vole" element={<Vole/>} />
          <Route path="/embarquement" element={<Embarquement/>} />
          <Route path="/ticket/:reservationId" component={<TicketPage/>} />
          <Route path="/reservation-admin" element={<ReservationAdmin/>} />
          <Route path="/add-baggage/:reservationId" element={<AddBaggage />} />
          <Route path="/boarding-pass/:reservationId" element={<BoardingPass/>} />
        
        </Route>


        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
      
        </Route>

  </Routes>
  </BrowserRouter>
  )
}

export default App
