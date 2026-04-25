// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContext'

// function IconTarget(props) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <circle cx="12" cy="12" r="8" />
//       <circle cx="12" cy="12" r="4" />
//       <path d="M12 2v2" />
//       <path d="M22 12h-2" />
//       <path d="M12 22v-2" />
//       <path d="M2 12h2" />
//     </svg>
//   )
// }

// function IconDocument(props) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
//       <path d="M14 2v6h6" />
//       <path d="M9 13h6" />
//       <path d="M9 17h6" />
//     </svg>
//   )
// }

// function IconChat(props) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
//     </svg>
//   )
// }

// function IconMap(props) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <path d="M9 18 3 20V6l6-2 6 2 6-2v14l-6 2-6-2z" />
//       <path d="M9 4v14" />
//       <path d="M15 6v14" />
//     </svg>
//   )
// }

// function Home() {
//   const { currentUser } = useAuth()

//   return (
//     <div className="min-h-screen bg-slate-950 text-white">

//       {/* HERO */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">

//         {/* Glow Effects */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.18),transparent_35%)]"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.12),transparent_30%)]"></div>

//         <div className="container mx-auto px-4 text-center relative z-10">

//           <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
//             Unlock Your <span className="text-emerald-400">Career Potential</span> with AI
//           </h1>

//           <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
//             Discover personalized career paths, ATS resume tools, smart job opportunities and AI powered interview preparation.
//           </p>

//           <div className="flex flex-wrap justify-center gap-4 mb-12">
//             <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-300">
//               AI Powered
//             </span>

//             <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-300">
//               ATS Friendly
//             </span>

//             <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-300">
//               Career Growth
//             </span>
//           </div>

//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             {currentUser ? (
//               <>
//                 <Link
//                   to="/profile"
//                   className="px-10 py-4 rounded-2xl bg-emerald-400 text-black font-semibold hover:scale-105 duration-300 shadow-lg"
//                 >
//                   View Profile
//                 </Link>

//                 <Link
//                   to="/resume-optimizer"
//                   className="px-10 py-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 duration-300"
//                 >
//                   Get Started
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/signup"
//                   className="px-10 py-4 rounded-2xl bg-emerald-400 text-black font-semibold hover:scale-105 duration-300 shadow-lg"
//                 >
//                   Join Now
//                 </Link>

//                 <Link
//                   to="/ats-score"
//                   className="px-10 py-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 duration-300"
//                 >
//                   Check ATS Score
//                 </Link>
//               </>
//             )}
//           </div>

//           <div className="mt-16 animate-bounce text-sm text-slate-400">
//             ↓ Scroll Down
//           </div>

//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="py-24 px-4">
//         <div className="container mx-auto">

//           <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
//             Why Choose <span className="text-emerald-400">CareerX-AI</span>?
//           </h2>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

//             {[
//               {
//                 icon: <IconTarget className="w-6 h-6" />,
//                 title: "AI Job Recommendations",
//                 desc: "Get personalized jobs based on your skills and interests."
//               },
//               {
//                 icon: <IconDocument className="w-6 h-6" />,
//                 title: "ATS Resume Optimizer",
//                 desc: "Improve your resume to pass recruiter ATS filters."
//               },
//               {
//                 icon: <IconChat className="w-6 h-6" />,
//                 title: "Interview Assistant",
//                 desc: "Practice with AI mock interviews and feedback."
//               },
//               {
//                 icon: <IconMap className="w-6 h-6" />,
//                 title: "Career Roadmap",
//                 desc: "Build a clear career journey with guided steps."
//               }
//             ].map((item) => (
//               <div
//                 key={item.title}
//                 className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-emerald-400/40 hover:-translate-y-2 duration-300"
//               >
//                 <div className="w-14 h-14 rounded-2xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-5">
//                   {item.icon}
//                 </div>

//                 <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
//                 <p className="text-slate-300 leading-7">{item.desc}</p>
//               </div>
//             ))}

//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-24 px-4">
//         <div className="container mx-auto">
//           <div className="rounded-3xl bg-gradient-to-r from-emerald-500 to-green-600 text-center py-16 px-6 shadow-2xl">

//             <h2 className="text-4xl md:text-5xl font-bold mb-5 text-black">
//               Ready to Transform Your Career?
//             </h2>

//             <p className="text-lg text-black/80 max-w-2xl mx-auto mb-8">
//               Join thousands of professionals accelerating careers with CareerX-AI tools.
//             </p>

//             <Link
//               to="/signup"
//               className="inline-block px-12 py-4 rounded-2xl bg-black text-white font-semibold hover:scale-105 duration-300"
//             >
//               Start Your Journey
//             </Link>

//           </div>
//         </div>
//       </section>

//     </div>
//   )
// }

// export default Home

import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import careerImage from '../../career.jpg'

function IconTarget(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M22 12h-2" />
      <path d="M12 22v-2" />
      <path d="M2 12h2" />
    </svg>
  )
}

function IconDocument(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  )
}

function IconChat(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
  )
}

function IconMap(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 18 3 20V6l6-2 6 2 6-2v14l-6 2-6-2z" />
      <path d="M9 4v14" />
      <path d="M15 6v14" />
    </svg>
  )
}

function Home() {
  const { currentUser } = useAuth()

  const features = [
    {
      icon: <IconTarget className="w-6 h-6" />,
      title: 'AI Job Recommendations',
      desc: 'Get personalized jobs based on your skills and interests.'
    },
    {
      icon: <IconDocument className="w-6 h-6" />,
      title: 'ATS Resume Optimizer',
      desc: 'Improve your resume to pass recruiter ATS filters.'
    },
    {
      icon: <IconChat className="w-6 h-6" />,
      title: 'Interview Assistant',
      desc: 'Practice with AI mock interviews and feedback.'
    },
    {
      icon: <IconMap className="w-6 h-6" />,
      title: 'Career Roadmap',
      desc: 'Build a clear career journey with guided steps.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Background Image */}
        <img
          src={careerImage}
          alt="Career Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/55"></div>

        {/* Green Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.18),transparent_35%)]"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6">

          <div className="max-w-3xl">

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Unlock Your <span className="text-emerald-400">Career Potential</span> with AI
            </h1>

            <p className="text-lg md:text-xl text-gray-200 leading-8 mb-8">
              Discover personalized career paths, ATS resume tools,
              smart job opportunities and AI powered interview preparation.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/20">
                AI Powered
              </span>

              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/20">
                ATS Friendly
              </span>

              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/20">
                Career Growth
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              {currentUser ? (
                <>
                  <Link
                    to="/profile"
                    className="px-8 py-4 rounded-2xl bg-emerald-400 text-black font-semibold hover:scale-105 duration-300"
                  >
                    View Profile
                  </Link>

                  <Link
                    to="/resume-optimizer"
                    className="px-8 py-4 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 duration-300"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="px-8 py-4 rounded-2xl bg-emerald-400 text-black font-semibold hover:scale-105 duration-300"
                  >
                    Join Now
                  </Link>

                  <Link
                    to="/ats-score"
                    className="px-8 py-4 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 duration-300"
                  >
                    Check ATS Score
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-4">
        <div className="container mx-auto">

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
            Why Choose <span className="text-emerald-400">CareerX-AI</span>?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {features.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-emerald-400/40 hover:-translate-y-2 duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-5">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-300 leading-7">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto">

          <div className="rounded-3xl bg-gradient-to-r from-emerald-500 to-green-600 text-center py-16 px-6 shadow-2xl">

            <h2 className="text-4xl md:text-5xl font-bold mb-5 text-black">
              Ready to Transform Your Career?
            </h2>

            <p className="text-lg text-black/80 max-w-2xl mx-auto mb-8">
              Join thousands of professionals accelerating careers with CareerX-AI tools.
            </p>

            <Link
              to="/signup"
              className="inline-block px-12 py-4 rounded-2xl bg-black text-white font-semibold hover:scale-105 duration-300"
            >
              Start Your Journey
            </Link>

          </div>
        </div>
      </section>

    </div>
  )
}

export default Home