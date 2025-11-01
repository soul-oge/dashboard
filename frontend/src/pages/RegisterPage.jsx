import { useState } from 'react'
import { register } from '../api/userApi'
import { useNavigate, Link } from 'react-router-dom'

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    const { username, email, password, passwordConfirm } = form

    // Validation simple
    if (!username || !email || !password || !passwordConfirm) {
      setError('Tous les champs sont obligatoires')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("L'email n'est pas valide")
      return
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    if (password !== passwordConfirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    setLoading(true)

    try {
      await register({ username, email, password })
      alert('Inscription réussie !')
      navigate('/login')
    } catch (err) {
      console.error(err.response?.data || err.message)
      setError(
        "Erreur lors de l'inscription : " +
          (err.response?.data?.message || 'Erreur inconnue')
      )
    } finally {
      setLoading(false)
    }
  }

  const floatingIconsStyles = {
    style1: { position: 'absolute', top: '8%', left: '10%' },
    style2: { position: 'absolute', top: '25%', right: '15%' },
    style3: { position: 'absolute', bottom: '10%', left: '18%' },
    style4: { position: 'absolute', top: '50%', right: '20%' }
  }

  return (
    <div className='bg-gray-500 min-h-screen flex items-center justify-center p-4 relative'>
      <div className='bg-black bg-opacity-80 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 max-w-md w-full'>
        <h1 className='text-4xl font-extrabold text-center text-gray-300 mb-8 neon-text'>
          REGISTER
        </h1>

        {error && (
          <p className='text-red-500 text-center mb-4 font-semibold'>{error}</p>
        )}

        <form className='space-y-6' onSubmit={handleSubmit}>
          <div className='relative'>
            <input
              type='text'
              name='username'
              placeholder="Nom d'utilisateur"
              value={form.username}
              onChange={handleChange}
              className='w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300'
              required
            />
            <i className='fas fa-user absolute right-3 top-3 text-purple-500'></i>
          </div>
          <div className='relative'>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={form.email}
              onChange={handleChange}
              className='w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300'
              required
            />
            <i className='fas fa-envelope absolute right-3 top-3 text-purple-500'></i>
          </div>
          <div className='relative'>
            <input
              type='password'
              name='password'
              placeholder='Mot de passe'
              value={form.password}
              onChange={handleChange}
              className='w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300'
              required
            />
            <i className='fas fa-lock absolute right-3 top-3 text-purple-500'></i>
          </div>
          <div className='relative'>
            <input
              type='password'
              name='passwordConfirm'
              placeholder='Confirmer le mot de passe'
              value={form.passwordConfirm}
              onChange={handleChange}
              className='w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300'
              required
            />
            <i className='fas fa-check-circle absolute right-3 top-3 text-purple-500'></i>
          </div>
          <button
            type='submit'
            className='w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
            disabled={loading}
          >
            {loading ? 'Chargement...' : "S'inscrire"}
          </button>
        </form>
        <div className='flex justify-center space-x-4 mt-4'>
            <a
              href='http://localhost:4000/auth/google'
              className='text-red-500 hover:text-red-600 transform hover:scale-125 transition-all duration-300'
            >
              <i className='fab fa-google text-2xl'></i>
            </a>
          </div>
        <div className='mt-8 text-center text-white'>
          <span>Déjà un compte ?</span>{' '}
          <Link
            to='/login'
            className='text-blue-500 hover:text-blue-300 underline ms-2'
          >
            Se connecter
          </Link>
        </div>
      </div>

      {/* Floating icons */}
      <div className='absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden'>
        <i
          className='fas fa-meteor text-yellow-500 text-4xl absolute animate-ping'
          style={floatingIconsStyles.style1}
        ></i>
        <i
          className='fas fa-star text-blue-500 text-2xl absolute animate-pulse'
          style={floatingIconsStyles.style2}
        ></i>
        <i
          className='fas fa-rocket text-red-500 text-5xl absolute float'
          style={floatingIconsStyles.style3}
        ></i>
        <i
          className='fas fa-planet-ringed text-purple-500 text-6xl absolute rotate'
          style={floatingIconsStyles.style4}
        ></i>
      </div>
    </div>
  )
}

export default RegisterPage
