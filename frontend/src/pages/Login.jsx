import { useContext, useState } from "react";

import API from "../api/axios";

import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      login(res.data.token);

      alert("Login successful");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
          />

          <button className="primary-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;