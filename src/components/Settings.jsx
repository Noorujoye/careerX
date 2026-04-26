import React, { useState, useEffect } from 'react'

function Settings({ isOpen, onClose }) {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    language: 'en',
    fontSize: 'medium'
  })

  useEffect(() => {
    const savedSettings = localStorage.getItem('careerxai-settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('careerxai-settings', JSON.stringify(settings))

    if (settings.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [settings])

  const handleSettingChange = (setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value
    }))
  }

  const resetSettings = () => {
    const defaultSettings = {
      darkMode: false,
      notifications: true,
      language: 'en',
      fontSize: 'medium'
    }

    setSettings(defaultSettings)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4">

      {/* Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.15),transparent_35%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.10),transparent_30%)]"></div>

      {/* Modal */}
      <div className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">
            Settings <span className="text-emerald-400">Panel</span>
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xl"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">

          {/* Dark Mode */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white">Dark Mode</h3>
              <p className="text-sm text-slate-400">
                Toggle between light and dark theme
              </p>
            </div>

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) =>
                  handleSettingChange('darkMode', e.target.checked)
                }
                className="sr-only peer"
              />

              <div className="w-12 h-7 rounded-full bg-slate-700 peer-checked:bg-emerald-500 after:content-[''] after:absolute after:left-1 after:top-1 after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
            </label>
          </div>

          {/* Notifications */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white">Notifications</h3>
              <p className="text-sm text-slate-400">
                Receive alerts and reminders
              </p>
            </div>

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) =>
                  handleSettingChange('notifications', e.target.checked)
                }
                className="sr-only peer"
              />

              <div className="w-12 h-7 rounded-full bg-slate-700 peer-checked:bg-emerald-500 after:content-[''] after:absolute after:left-1 after:top-1 after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
            </label>
          </div>

          {/* Language */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <h3 className="font-semibold text-white mb-3">Language</h3>

            <select
              value={settings.language}
              onChange={(e) =>
                handleSettingChange('language', e.target.value)
              }
              className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          {/* Font Size */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <h3 className="font-semibold text-white mb-3">Font Size</h3>

            <select
              value={settings.fontSize}
              onChange={(e) =>
                handleSettingChange('fontSize', e.target.value)
              }
              className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          {/* Account */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <h3 className="font-semibold text-white mb-4">Account</h3>

            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300">
                Change Password
              </button>

              <button className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300">
                Privacy Settings
              </button>

              <button className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300">
                Data Export
              </button>
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={resetSettings}
            className="w-full py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings