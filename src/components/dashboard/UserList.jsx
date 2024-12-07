import React, { useState, useEffect } from "react";
import { useLoading }  from '../loading/LoadingContext';
import SlidingModal from '../modal/SlidingModal';
import UserInfo from './UserInfo';
import UserCreateForm from './UserCreate';

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const { setIsLoading, isLoading  } = useLoading();
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [modalContent, setModalContent] = useState(null);

  // API base URL
  const API_URL = `${window.API_BASE_URL}/users`;
  const API_Key = window.API_KEY;
  const token = localStorage.getItem("authToken"); // Retrieve token

  // const [selectedUser, setSelectedUser] = useState(null);
  // const [users, setUsers] = useState([
  //   { id: 1, name: "John Doe", username: "john@example.com", role: "Admin" },
  //   { id: 2, name: "Jane Smith", username: "jane@example.com", role: "User" },
  // ]);

  const showUserInfo = (userId) => {
    // const selectedUser = users.find((user) => user.id === userId);
    // setSelectedUser(selectedUser);
    openModal();
    setModalContent(<UserInfo userId={userId} />);
  }
  const createUser = () => {
    openModal();
    setModalContent(<UserCreateForm />);
  }

  
  useEffect(() => {
    // Fetch employees from API
    
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_Key,
          Authorization: `Bearer ${token}`
        },
      });
      
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setEmployees(data); // Set the fetched data to state
      } catch (err) {
        setError(err.message); // Set the error message if the request fails
      } finally {
        setIsLoading(false); // Set loading to false when the request completes
      }
    };

    fetchEmployees();
  }, []); // Empty dependency array ensures the effect runs only once

  if (isLoading) {
    return <p>Loading employees...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
    <div className="col-md-8 offset-2">
      <div className="row">
        <div className="col-6"><h3>Users List</h3></div>
        <div className="col-6">
        <button className="btn btn-outline-primary btn-sm float-end" onClick={() => createUser()} >
                Add User
              </button>
          </div>
        </div>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>
                <button type="button" className="btn btn-info btn-sm" onClick={() => showUserInfo(employee.id)}>View Info</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
      <SlidingModal isOpen={isModalOpen} title="User Details" onClose={closeModal}>
        {modalContent}
      </SlidingModal>
    </div>
  );
};

export default EmployeesList;
