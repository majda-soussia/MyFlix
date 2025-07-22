import React, { useState } from "react";
import "./style/Userdash.css";
import {users as  initialUsers } from "../data/users.ts";
type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthday: string;
  gender: string;
};
const UserDashboard: React.FC  = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    birthday: "",
    gender: "",
  }); 
  const handleDelete=(id:number)=>{
    const updated=users.filter((u)=> u.id !==id);
    setUsers(updated);
  }
  const handleEdit = (id: number) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setEditingUser(user);
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        birthday: user.birthday,
        gender: user.gender,
      });
      setIsFormVisible(true);
    }
  };
  const handleAddUserClick = () => {
    setEditingUser(null); 
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      birthday: "",
      gender: "",
    });
    setIsFormVisible(true);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...u, ...formData } : u
        )
      );
    } else {
      const newUser: User = {
        id: Date.now(),
        ...formData,
      };
      setUsers([...users, newUser]);
    }
    setIsFormVisible(false);
    setEditingUser(null);
  };
  return (
    <div className="user-dashboard">
      <div>
        <h2 className="dashboard-title">List of Users</h2>
        <button onClick={handleAddUserClick} className="Add">Add User</button>
      </div>

      {isFormVisible && (
        <form className="user-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder="Firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>
          <button type="submit">
            {editingUser ? "Update User" : "Add User"}
          </button>
        </form>
      )}

      <div className="user-info-card">
        <table className="user-table">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Birthday</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.birthday}</td>
                <td>{user.gender}</td>
                <td>
                  <img
                    src="/images/edit.png"
                    alt="Modifier"
                    title="Modifier"
                    onClick={() => handleEdit(user.id)}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  />
                  <img
                    src="/images/poubelle.png"
                    alt="Supprimer"
                    title="Supprimer"
                    onClick={() => handleDelete(user.id)}
                    style={{ width: 24, height: 24, cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
