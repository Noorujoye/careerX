import React, { useState } from 'react'

function JobRecommender() {
  const [showForm, setShowForm] = useState(false)

  const [preferences, setPreferences] = useState({
    skills: '',
    location: '',
    salary: '',
    jobType: 'full-time'
  })

  const [statusMessage, setStatusMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setPreferences((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFindJobs = () => {
    if (!showForm) {
      setShowForm(true)
      return
    }

    if (!preferences.skills.trim()) {
      alert('Please enter your skills')
      return
    }

    setStatusMessage(
      'Job recommendations are not connected yet. Connect a real API to show live jobs.'
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-4 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-[140px] rounded-full"></div>

      <div className="relative z-10 container mx-auto">
        <div className="max-w-5xl mx-auto">

          {/* Heading */}
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-5">
            Job <span className="text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]">Recommender</span>
          </h3>

          <p className="text-lg md:text-xl text-center text-slate-400 mb-12">
            Find the perfect job matches tailored to your skills and preferences.
          </p>

          {!showForm ? (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.08)] p-8">

              <div className="grid md:grid-cols-2 gap-10 items-center">

                {/* Left */}
                <div className="text-center">
                  <button
                    onClick={handleFindJobs}
                    className="px-10 py-4 rounded-2xl bg-emerald-400 text-black font-bold hover:scale-105 duration-300 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                  >
                    Find Jobs
                  </button>
                </div>

                {/* Right */}
                <div>
                  <h4 className="text-2xl font-semibold text-emerald-400 mb-5">
                    Smart Matching
                  </h4>

                  <ul className="space-y-4 text-slate-300">
                    <li className="flex items-center">
                      <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-3"></span>
                      Skill-based recommendations
                    </li>

                    <li className="flex items-center">
                      <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-3"></span>
                      Location and salary preferences
                    </li>

                    <li className="flex items-center">
                      <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-3"></span>
                      Company culture matching
                    </li>

                    <li className="flex items-center">
                      <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-3"></span>
                      Growth opportunity analysis
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          ) : (
            <div className="space-y-8">

              {/* Form Card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.08)] p-8">

                <h4 className="text-2xl font-semibold text-center text-emerald-400 mb-8">
                  Tell us about your preferences
                </h4>

                <div className="grid md:grid-cols-2 gap-6">

                  <div>
                    <label className="block mb-2 text-slate-300">
                      Skills (comma separated)
                    </label>

                    <input
                      type="text"
                      name="skills"
                      value={preferences.skills}
                      onChange={handleInputChange}
                      placeholder="React, JavaScript, Node.js"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-slate-300">
                      Preferred Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={preferences.location}
                      onChange={handleInputChange}
                      placeholder="Remote, Delhi, Mumbai"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-slate-300">
                      Salary Range
                    </label>

                    <input
                      type="text"
                      name="salary"
                      value={preferences.salary}
                      onChange={handleInputChange}
                      placeholder="5 LPA - 12 LPA"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-slate-300">
                      Job Type
                    </label>

                    <select
                      name="jobType"
                      value={preferences.jobType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="remote">Remote</option>
                    </select>
                  </div>

                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={handleFindJobs}
                    className="px-10 py-4 rounded-2xl bg-emerald-400 text-black font-bold hover:scale-105 duration-300 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                  >
                    Find My Perfect Jobs
                  </button>
                </div>

              </div>

              {/* Status */}
              {statusMessage && (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center">
                  <p className="text-slate-300">{statusMessage}</p>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default JobRecommender