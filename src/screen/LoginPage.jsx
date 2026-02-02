import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import "../screen/Auth.css";
import img from "../assets/loginBackground-image.jpg";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrors({
        email: !formData.email && "Email is required",
        password: !formData.password && "Password is required",
      });
      return;
    }

    try {
      setLoading(true);
      await login(formData);
    } catch (err) {
      setErrors({
        api: err.response?.data?.message || "Login failed",
      });
    } finally {
      setLoading(false);
      window.location.href = "/";
    }
  };

  return (
    <div 
      className="auth-container"
      style={{
        backgroundImage: `url(${img})`,  // Use imported image as background
        backgroundSize: "cover",          // Cover the entire container
        backgroundPosition: "center",     // Center the image
        backgroundRepeat: "no-repeat",    // Prevent repeating
      }}
    >
      
      <div className="auth-card" style={{
        backgroundColor:'rgba(16, 17, 15, 0.85)',  
      }}>
        <h2>Welcome Back</h2>
        <p>Login to your account</p>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {errors.api && <span className="error-text">{errors.api}</span>}
          <div className="input-group">
            <input name="email" placeholder="Email" onChange={handleChange} />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
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
            {loading ? <span className="spinner" /> : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          Don’t have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;