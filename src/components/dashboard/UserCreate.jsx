import React, { useState } from "react";
const UserCreateForm = ({ onSubmit }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, email, role });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <input value={role} onChange={(e) => setRole(e.target.value)} required />
        </div>
        <button type="submit">Create User</button>
      </form>
    );
  };

  
  export default UserCreateForm;