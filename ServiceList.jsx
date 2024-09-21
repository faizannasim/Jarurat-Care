import React, { useState, useEffect } from 'react';

function ServiceList() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '', price: 0 });
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    // Initialize services list from API or local storage
    const initialServices = [
      { id: 1, name: 'Service 1', description: 'Description 1', price: 10.99 },
      { id: 2, name: 'Service 2', description: 'Description 2', price: 20.99 },
      // ...
    ];
    setServices(initialServices);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingService) {
      // Update existing service
      const updatedService = { ...editingService, ...newService };
      const updatedServices = services.map((service) => (service.id === updatedService.id ? updatedService : service));
      setServices(updatedServices);
      setEditingService(null);
    } else {
      // Add new service
      const newServiceData = { id: services.length + 1, ...newService };
      setServices([...services, newServiceData]);
    }
    setNewService({ name: '', description: '', price: 0 });
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setNewService(service);
  };

  const handleDelete = (serviceId) => {
    const updatedServices = services.filter((service) => service.id !== serviceId);
    setServices(updatedServices);
  };

  return (
    <div>
      <h1>Healthcare Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <span>{service.name}</span>
            <span>{service.description}</span>
            <span>${service.price}</span>
            <button onClick={() => handleEdit(service)}>Edit</button>
            <button onClick={() => handleDelete(service.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={newService.name} onChange={(event) => setNewService({ ...newService, name: event.target.value })} />
        </label>
        <label>
          Description:
          <input type="text" value={newService.description} onChange={(event) => setNewService({ ...newService, description: event.target.value })} />
        </label>
        <label>
          Price:
          <input type="number" value={newService.price} onChange={(event) => setNewService({ ...newService, price: parseFloat(event.target.value) })} />
        </label>
        <button type="submit">{editingService ? 'Update Service' : 'Add New Service'}</button>
      </form>
    </div>
  );
}

export default ServiceList;