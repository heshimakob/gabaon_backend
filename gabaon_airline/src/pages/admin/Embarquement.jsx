import React from 'react'
import Sidebar from './SideBar'
// import AddBaggage from './component/AddBagage'
import BagageTable from './component/BagageTable'

const Embarquement = () => {
  return (
 <>
 <Sidebar/>
 <div className="container mx-auto p-4 mt-32">
 {/* <AddBaggage/> */}
 <BagageTable/>
 </div>

 </>
  )
}

export default Embarquement
