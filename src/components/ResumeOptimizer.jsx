import React, { useState } from 'react'

function ResumeOptimizer() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const clearSelectedFile = () => {
    setSelectedFile(null)
    setUploadStatus('')
    const input = document.getElementById('resume-upload')
    if (input) input.value = ''
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]

    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]

      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file)
        setUploadStatus('')
      } else {
        setSelectedFile(null)
        setUploadStatus('Please upload PDF or Word file (.pdf, .doc, .docx)')
      }
    }
  }

  const handleOptimize = () => {
    if (!selectedFile) {
      setUploadStatus('Please select your resume first')
      return
    }

    setLoading(true)
    setUploadStatus('')

    setTimeout(() => {
      setLoading(false)
      setUploadStatus('Resume analyzed successfully! AI suggestions ready.')
    }, 2200)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.18),transparent_35%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.10),transparent_30%)]"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">

            {/* Heading */}
            <div className="text-center mb-14">
              <h1 className="text-5xl md:text-6xl font-bold mb-5">
                AI <span className="text-emerald-400">Resume Optimizer</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                Improve your resume with ATS friendly formatting, smart keywords
                and recruiter focused suggestions.
              </p>
            </div>

            {/* Main Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-md shadow-2xl">

              <div className="grid md:grid-cols-2 gap-10 items-center">

                {/* Left */}
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Why Use CareerX AI?
                  </h2>

                  <div className="space-y-4">

                    {[
                      'AI-powered keyword optimization',
                      'ATS-friendly formatting checks',
                      'Industry specific improvements',
                      'Real-time feedback reports',
                      'Better recruiter visibility'
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                        <p className="text-slate-200">{item}</p>
                      </div>
                    ))}

                  </div>
                </div>

                {/* Right Upload */}
                <div className="text-center">

                  <div className="mb-5">
                    <div className="text-6xl mb-4">📄</div>

                    <input
                      type="file"
                      id="resume-upload"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    <label
                      htmlFor="resume-upload"
                      className="inline-block px-7 py-3 rounded-2xl bg-emerald-400 text-black font-semibold hover:scale-105 duration-300 cursor-pointer shadow-lg"
                    >
                      Choose Resume File
                    </label>
                  </div>

                  {selectedFile && (
                    <div className="mb-5 flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                      <p className="text-sm text-slate-300 truncate">
                        {selectedFile.name}
                      </p>

                      <button
                        onClick={clearSelectedFile}
                        className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <button
                    onClick={handleOptimize}
                    className="w-full px-8 py-4 rounded-2xl bg-white/5 border border-white/15 hover:bg-white/10 font-semibold duration-300"
                  >
                    Optimize My Resume
                  </button>

                  {loading && (
                    <p className="mt-4 text-emerald-300 animate-pulse">
                      Analyzing Resume...
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* Status */}
            {uploadStatus && (
              <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-slate-200">{uploadStatus}</p>
              </div>
            )}

            {/* Bottom Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">

              {[
                'ATS Score Boost',
                'Keyword Enhancement',
                'Professional Formatting'
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center hover:border-emerald-400/40 duration-300"
                >
                  <h3 className="text-xl font-semibold text-emerald-300">
                    {item}
                  </h3>
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default ResumeOptimizer