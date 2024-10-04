import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddVole from './component/AddVole';
import VolesList from './component/VoleList';
import Sidebar from './SideBar';
import Tabs from "../../component/Tabs"
import { MdGridView } from 'react-icons/md';
import { FaList } from 'react-icons/fa';

const TABS = [
  { title: "listes de vole", icon: <MdGridView /> },
  { title: "faire une reservation", icon: <FaList /> },
];

const Vole = () => {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [voles, setVoles] = useState([]);
  const [selectedVole, setSelectedVole] = useState(null);

  useEffect(() => {
    fetchVoles();
  }, []);

  const fetchVoles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/vole');
      setVoles(response.data);
    } catch (error) {
      console.error('Error fetching voles', error);
    }
  };

  const handleAddVole = async (vole) => {
    try {
      const response = await axios.post('http://localhost:8080/api/vole/create', vole);
      setVoles([...voles, response.data]);
    } catch (error) {
      console.error('Error adding vole', error);
    }
  };

  const handleUpdateVole = async (updatedVole) => {
    try {
      await axios.put(`/api/voles/${updatedVole._id}`, updatedVole);
      setVoles(voles.map(vole => vole._id === updatedVole._id ? updatedVole : vole));
      setSelectedVole(null);
    } catch (error) {
      console.error('Error updating vole', error);
    }
  };

  const handleDeleteVole = async (id) => {
    try {
      await axios.delete(`/api/voles/${id}`);
      setVoles(voles.filter(vole => vole._id !== id));
    } catch (error) {
      console.error('Error deleting vole', error);
    }
  };

  return (
  <>
  <Sidebar/>
  <div className="container mx-auto p-4 mt-32">
      <h1 className="text-2xl font-bold mb-4">Gestion des Vols</h1>
      <AddVole onAddVole={handleAddVole} />
      <VolesList voles={voles} onEdit={setSelectedVole} onDelete={handleDeleteVole} />
      {selectedVole && (
        <ModalVole vole={selectedVole} onUpdateVole={handleUpdateVole} onClose={() => setSelectedVole(null)} />
      )}
    </div>
  </>
  )
}

export default Vole