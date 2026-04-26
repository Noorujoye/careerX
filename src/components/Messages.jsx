import React, { useState } from 'react'

function IconInbox(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 4h16v12H4z" />
      <path d="M4 16h5l2 3h2l2-3h5" />
    </svg>
  )
}

function IconUnread(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 4h16v16H4z" />
      <path d="m4 6 8 7 8-7" />
      <circle cx="18" cy="6" r="2" />
    </svg>
  )
}

function IconBriefcase(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M10 6V4h4v2" />
      <rect x="4" y="6" width="16" height="14" rx="2" />
      <path d="M4 12h16" />
    </svg>
  )
}

function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 6h16v12H4z" />
      <path d="m4 8 8 6 8-6" />
    </svg>
  )
}

function IconEmptyChat(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
    </svg>
  )
}

function Messages() {
  const [activeTab, setActiveTab] = useState('all')

  const tabs = [
    { id: 'all', label: 'All Messages', Icon: IconInbox },
    { id: 'unread', label: 'Unread', Icon: IconUnread },
    { id: 'job', label: 'Job Messages', Icon: IconBriefcase },
    { id: 'inmail', label: 'InMail', Icon: IconMail },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-[140px] rounded-full"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-8">
          <span className="text-white">Messages</span>
          <span className="text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]">
            {' '}Center
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar */}
          <div className="w-full lg:w-72 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.08)] p-4">

            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">

              {tabs.map((tab) => (
                <div key={tab.id} className="shrink-0">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all whitespace-nowrap font-medium ${
                      activeTab === tab.id
                        ? 'bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <tab.Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                </div>
              ))}

            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.08)] p-10 flex items-center justify-center">

            <div className="text-center">

              <div className="flex justify-center mb-5 text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]">
                <IconEmptyChat className="w-20 h-20" />
              </div>

              <h2 className="text-2xl font-bold mb-3 text-white">
                No messages yet
              </h2>

              <p className="text-slate-400 max-w-md">
                When recruiters, companies or users send messages, they’ll appear here instantly.
              </p>

              <button className="mt-6 px-8 py-3 rounded-2xl bg-emerald-400 text-black font-bold hover:scale-105 duration-300 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                Explore Jobs
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Messages