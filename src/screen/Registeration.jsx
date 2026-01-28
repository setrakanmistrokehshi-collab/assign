import { useState } from "react";
import { registerUser } from "../api/authApi";
import "./Auth.css";

const Registeration= () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const validate = () => {
    let temp = {};
    if (!formData.name) temp.name = "Name is required";
    if (!formData.email) temp.email = "Email is required";
    if (!formData.password) temp.password = "Password is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      await registerUser(formData);
      alert("Registration successful");
    } catch (err) {
      setErrors({
        api: err.response?.data?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Register to get started</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {errors.api && <span className="error-text">{errors.api}</span>}
          <div className="input-group">
            <input name="name" placeholder="Full Name" onChange={handleChange} />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          <div className="input-group">
            <input name="email" placeholder="Email Address" onChange={handleChange} />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
          <input name="country" placeholder="Country" onChange={handleChange} />
          <input name="state" placeholder="State" onChange={handleChange} />
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Registeration;