import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function IconMenu(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  )
}

function IconClose(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  )
}

function IconSettings(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V21a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H3a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2H8a1 1 0 0 0 .6-.9V3a2 2 0 1 1 4 0v.2a1 1 0 0 0 .7.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1V8c0 .4.2.8.6.9h.2a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.7z" />
    </svg>
  )
}

function IconChevron(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function Layout() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isFeatureOpen, setIsFeatureOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const profileRef = useRef(null)
  const featureRef = useRef(null)

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/ats-score', label: 'ATS Score' },
    { to: '/resume-optimizer', label: 'Resume Optimizer' },
    { to: '/job-recommender', label: 'Jobs' },
    { to: '/interview-assistant', label: 'Interview' },
    { to: '/about', label: 'About' }
  ]

  useEffect(() => {
    const handleOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false)
      }

      if (featureRef.current && !featureRef.current.contains(e.target)) {
        setIsFeatureOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsProfileOpen(false)
    setIsFeatureOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [darkMode])

  const handleLogout = async () => {
    try {
      await logout()
    } catch {}
    navigate('/login')
  }

  const userName =
    currentUser?.name ||
    currentUser?.displayName ||
    currentUser?.email ||
    'User'

  const activeLink = (path) =>
    location.pathname === path
      ? 'text-emerald-400'
      : 'text-white hover:text-emerald-300'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
            >
              <IconMenu className="w-5 h-5" />
            </button>

            <Link to="/" className="text-2xl font-bold tracking-wide">
              <span className="text-white">Career</span>
              <span className="text-emerald-400">X-AI</span>
            </Link>
          </div>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 px-8">
            <input
              type="text"
              placeholder="Search jobs, companies..."
              className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-emerald-400 text-white placeholder:text-slate-400"
            />
          </div>

          {/* DESKTOP FEATURES DROPDOWN */}
          <div className="hidden lg:flex items-center gap-4">

            <div ref={featureRef} className="relative">
              <button
                onClick={() => setIsFeatureOpen(!isFeatureOpen)}
                className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-2"
              >
                Features
                <IconChevron className="w-4 h-4" />
              </button>

              {isFeatureOpen && (
                <div className="absolute top-14 right-0 w-64 rounded-2xl border border-white/10 bg-slate-900 shadow-2xl p-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`block px-4 py-3 rounded-xl transition ${activeLink(item.to)} hover:bg-white/5`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="ml-auto flex items-center gap-3">

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="hidden sm:flex px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10"
            >
              <IconSettings className="w-4 h-4 mr-2" />
              Theme
            </button>

            {currentUser ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-11 h-11 rounded-full bg-emerald-400 text-black font-bold"
                >
                  {userName[0].toUpperCase()}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-white/10 bg-slate-900 shadow-2xl p-3">

                    <div className="px-3 py-2 border-b border-white/10 mb-2">
                      <p className="font-semibold">{userName}</p>
                      <p className="text-sm text-slate-400 truncate">
                        {currentUser?.email}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-xl hover:bg-white/5"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/applications"
                      className="block px-3 py-2 rounded-xl hover:bg-white/5"
                    >
                      Applications
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-xl text-red-400 hover:bg-white/5"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:block px-5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-xl bg-emerald-400 text-black font-semibold hover:scale-105 duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">

          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          <div className="absolute left-0 top-0 h-full w-72 bg-slate-950 border-r border-white/10 p-5">

            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-emerald-400">
                CareerX-AI
              </span>

              <button onClick={() => setIsMenuOpen(false)}>
                <IconClose className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="pt-24 px-4 max-w-7xl mx-auto">
        <Outlet />
      </main>

    </div>
  )
}

export default Layout