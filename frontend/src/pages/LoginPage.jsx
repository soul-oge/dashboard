import { useState } from 'react'
import { login } from '../api/userApi'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
      setError("L'email est obligatoire")
      return
    }
    if (!emailRegex.test(email)) {
      setError("L'email n'est pas valide")
      return
    }
    if (!password) {
      setError('Le mot de passe est obligatoire')
      return
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setLoading(true)

    try {
      const response = await login({ email, password })
      alert('Connexion réussie')
      sessionStorage.setItem('token', response.data.token)
      navigate('/profile')
    } catch (err) {
      console.error(err.response?.data || err.message)
      setError(
        'Erreur lors de la connexion : ' +
          (err.response?.data?.message || 'Erreur inconnue')
      )
    } finally {
      setLoading(false)
    }
  }

  const floatingIconsStyles = {
    style1: { position: 'absolute', top: '10%', left: '5%' },
    style2: { position: 'absolute', top: '20%', right: '10%' },
    style3: { position: 'absolute', bottom: '15%', left: '15%' },
    style4: { position: 'absolute', top: '40%', right: '20%' }
  }

  return (
    <div className='bg-gray-500 min-h-screen flex items-center justify-center p-4 relative'>
      <div className='bg-black bg-opacity-80 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 max-w-md w-full'>
        <h1 className='text-4xl font-extrabold text-center text-gray-300 mb-8 neon-text'>
          LOGIN
        </h1>

        {error && (
          <p className='text-red-500 text-center mb-4 font-semibold'>{error}</p>
        )}

        <form className='space-y-6' onSubmit={handleSubmit}>
          <div className='relative'>
            <input
              type='email'
              placeholder='Email'
              className='w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <i className='fas fa-envelope absolute right-3 top-3 text-pink-500'></i>
          </div>
          <div className='relative'>
            <input
              type='password'
              placeholder='Mot de passe'
              className='w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <i className='fas fa-lock absolute right-3 top-3 text-pink-500'></i>
          </div>
          <button
            type='submit'
            className='w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
            disabled={loading}
          >
            {loading ? 'Chargement...' : 'Se connecter'}
          </button>
        </form>

        <div className='mt-8 text-center'>
          <p className='text-gray-400'>Ou connectez-vous avec</p>
          <div className='flex justify-center space-x-4 mt-4'>
            <a
              href='http://localhost:4000/auth/google'
              className='text-red-500 hover:text-red-600 transform hover:scale-125 transition-all duration-300'
            >
              <i className='fab fa-google text-2xl'></i>
            </a>
          </div>
          <div className='flex justify-center space-x-2 mt-4 text-white'>
            <span>Pas encore de compte ?</span>
            <Link
              to='/register'
              className='text-blue-700 hover:text-blue-300 underline'
            >
              S'inscrire
            </Link>
          </div>
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
