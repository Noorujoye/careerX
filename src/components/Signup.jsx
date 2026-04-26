import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { signup } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters'

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const newUser = {
      id: Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    }

    const result = await signup(newUser)

    if (!result.ok) {
      setErrors({ general: result.message })
      return
    }

    navigate('/')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex items-center justify-center px-4 py-10">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.18),transparent_35%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.12),transparent_30%)]"></div>

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-4xl font-bold tracking-wide"
          >
            <span className="text-white">Career</span>
            <span className="text-emerald-400">X-AI</span>
          </Link>

          <h2 className="mt-4 text-3xl font-bold text-white leading-tight">
            Make the most of your professional life
          </h2>

          <p className="text-slate-400 mt-2">
            Join and grow your career with AI tools
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Names */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  First Name
                </label>

                <input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                />

                {errors.firstName && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Last Name
                </label>

                <input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                />

                {errors.lastName && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.lastName}
                  </p>
                )}
              </div>

            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Email
              </label>

              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
              />

              {errors.email && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Password (8+ characters)
              </label>

              <input
                name="password"
                type="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
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

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-400 text-black font-bold hover:scale-105 duration-300 shadow-lg"
            >
              Agree & Join
            </button>

            {/* Terms */}
            <p className="text-xs text-slate-400 text-center leading-6">
              By clicking Agree & Join, you agree to our{' '}
              <Link to="/terms" className="text-emerald-400 hover:text-emerald-300">
                User Agreement
              </Link>
              ,{' '}
              <Link to="/privacy" className="text-emerald-400 hover:text-emerald-300">
                Privacy Policy
              </Link>
              , and{' '}
              <Link to="/cookie" className="text-emerald-400 hover:text-emerald-300">
                Cookie Policy
              </Link>
              .
            </p>

          </form>

          {/* Divider */}
          <div className="my-6 border-t border-white/10"></div>

          {/* Sign In */}
          <p className="text-center text-slate-400 text-sm mb-4">
            Already on CareerX-AI?
          </p>

          <Link
            to="/login"
            className="w-full block text-center py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 duration-300"
          >
            Sign In
          </Link>

        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-6">
          © 2024 CareerX-AI. All rights reserved.
        </p>

      </div>
    </div>
  )
}

export default Signup