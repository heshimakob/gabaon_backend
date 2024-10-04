import React from 'react'
import NavBar from '../component/NavBar'
import Recherche from '../component/Recherche'
import avion from "../assets/avion.jpg"
import Programme from './Programme'

const Home = () => {
  return (
<>
<NavBar/>
<div >
  <Recherche/>
  <Programme/>

</div>
</>
  )
}

export default Home