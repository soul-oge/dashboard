import { useState } from "react";
import { register } from "../api/userApi";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { username, email, password, passwordConfirm } = form;

    if (!username || !email || !password || !passwordConfirm) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("L'email n'est pas valide");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const { username, email, password } = form;
      await register({ username, email, password });
      alert("Inscription réussie !");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(
        "Erreur lors de l'inscription : " +
          (err.response?.data?.message || "Erreur inconnue")
      );
    } finally {
      setLoading(false);
    }
  };

  const style1 = {
    top: "10%",
    left: "5%",
  };
  const style2 = {
    top: "20%",
    right: "10%", 
  };
  const style3 = {
    bottom: "15%",
    left: "15%",
  };
  const style4 = {
    top: "40%",
    right: "20%",
  };

  return (
    <div className="bg-gray-400 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-blue-500/30 transition-all duration-500 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          SIGN-UP
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={form.username}
              onChange={handleChange}
              required
            />
            <i className="fas fa-user absolute right-3 top-3.5 text-blue-500"></i>
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={form.email}
              onChange={handleChange}
              required
            />
            <i className="fas fa-envelope absolute right-3 top-3.5 text-blue-500"></i>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={form.password}
              onChange={handleChange}
              required
            />
            <i className="fas fa-lock absolute right-3 top-3.5 text-blue-500"></i>
          </div>

          <div className="relative">
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={form.passwordConfirm}
              onChange={handleChange}
              required
            />
            <i className="fas fa-lock absolute right-3 top-3.5 text-blue-500"></i>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-3 rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Chargement..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500">Or sign up with</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="http://localhost:4000/auth/google"
              className="text-red-500 hover:text-red-600 transform hover:scale-125 transition-all duration-300"
            >
              <i className="fab fa-google text-2xl"></i>
            </a>
          </div>
          <div className="flex justify-center space-x-2 mt-4 text-gray-600">
            <span>I have an account:</span>
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-400 font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <i
          className="fas fa-meteor text-yellow-400 text-4xl absolute animate-ping"
          style={style1}
        ></i>
        <i
          className="fas fa-star text-blue-400 text-2xl absolute animate-pulse"
          style={style2}
        ></i>
        <i
          className="fas fa-rocket text-red-400 text-5xl absolute"
          style={style3}
        ></i>
        <i
          className="fas fa-planet-ringed text-purple-400 text-6xl absolute"
          style={style4}
        ></i>
      </div>
    </div>
  );
}
