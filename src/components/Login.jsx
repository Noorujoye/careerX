import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const result = await login(formData.email, formData.password)

    if (result.ok) navigate('/')
    else setErrors({ general: result.message })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center py-8 px-4 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 blur-[130px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-[130px] rounded-full"></div>

      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center">

          <Link
            to="/"
            className="text-4xl font-bold tracking-wide"
          >
            <span className="text-white">Career</span>
            <span className="text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]">
              X-AI
            </span>
          </Link>

          <h2 className="mt-6 text-3xl font-bold">
            Welcome Back
          </h2>

          <p className="mt-2 text-slate-400">
            Sign in to continue your career journey
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.12)] p-8">

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Email or phone"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
              />

              {errors.email && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
              />

              {errors.password && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.password}
                </p>
              )}
            </div>

            {/* General Error */}
            {errors.general && (
              <p className="text-red-400 text-sm text-center">
                {errors.general}
              </p>
            )}

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-emerald-400 hover:text-emerald-300"
              >
                Forgot password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-400 text-black font-bold hover:scale-[1.02] duration-300 shadow-[0_0_20px_rgba(16,185,129,0.45)]"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-white/10"></div>

          {/* Signup */}
          <div className="text-center">
            <p className="text-slate-400 mb-4">
              New to CareerX-AI?
            </p>

            <Link
              to="/signup"
              className="w-full block py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 duration-300 font-medium"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-slate-500 relative z-10">
        <p>© 2024 CareerX-AI. All rights reserved.</p>

        <div className="mt-2 space-x-4">
          <Link to="/about" className="hover:text-white">
            About
          </Link>

          <Link to="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>

          <Link to="/terms" className="hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Login