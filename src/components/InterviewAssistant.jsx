import React from 'react'

function InterviewAssistant() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-4 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-[140px] rounded-full"></div>

      <div className="relative z-10 container mx-auto">
        <div className="max-w-5xl mx-auto">

          {/* Heading */}
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-5">
            Interview{' '}
            <span className="text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]">
              Assistant
            </span>
          </h3>

          <p className="text-lg md:text-xl text-center text-slate-400 mb-12">
            Practice interview questions and track your progress.
          </p>

          {/* Main Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.08)] p-8">

            <div className="grid md:grid-cols-2 gap-10 items-center">

              {/* Left Content */}
              <div>
                <h4 className="text-2xl font-semibold text-emerald-400 mb-5">
                  Preparation Tools
                </h4>

                <ul className="space-y-4 text-slate-300">

                  <li className="flex items-center">
                    <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-3"></span>
                    Mock interview practice
                  </li>

                  <li className="flex items-center">
                    <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-3"></span>
                    Common question database
                  </li>

                  <li className="flex items-center">
                    <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-3"></span>
                    Performance analytics
                  </li>

                  <li className="flex items-center">
                    <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-3"></span>
                    Personalized tips
                  </li>

                </ul>
              </div>

              {/* Right Content */}
              <div className="text-center">

                <div className="mb-5 text-7xl">🎯</div>

                <button
                  disabled
                  className="px-10 py-4 rounded-2xl bg-emerald-400 text-black font-bold opacity-70 cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.45)]"
                >
                  Coming Soon
                </button>

                <p className="text-slate-500 mt-4 text-sm">
                  AI Mock Interview system launching soon
                </p>

              </div>

            </div>
          </div>

          {/* Bottom Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center hover:border-emerald-400/40 duration-300">
              <h5 className="text-xl font-semibold text-white mb-2">
                HR Round
              </h5>
              <p className="text-slate-400 text-sm">
                Personality & communication questions
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center hover:border-emerald-400/40 duration-300">
              <h5 className="text-xl font-semibold text-white mb-2">
                Technical
              </h5>
              <p className="text-slate-400 text-sm">
                Coding & domain specific questions
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center hover:border-emerald-400/40 duration-300">
              <h5 className="text-xl font-semibold text-white mb-2">
                Analytics
              </h5>
              <p className="text-slate-400 text-sm">
                Score tracking & improvement reports
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default InterviewAssistant