import React, { useState } from "react";

export default function ATSScore() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(82);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file.name);
    setLoading(true);
    setShowResult(false);

    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
      setScore(Math.floor(Math.random() * 25) + 70);
    }, 1800);
  };

  const handleLearnMore = () => {
    document
      .getElementById("careerx-features")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOptimize = () => {
    document
      .getElementById("upload-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { title: "Keyword Match", value: 78 },
    { title: "Format Score", value: 91 },
    { title: "Grammar & Clarity", value: 65 },
    { title: "Readability", value: 88 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white px-6 md:px-12 py-10">

      {/* Top Header */}
      <div className="relative mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          ATS <span className="text-emerald-400">Score Checker</span>
        </h1>

        <p className="text-slate-300 mt-2">
          Analyze your resume and improve hiring chances instantly.
        </p>

        <button
          onClick={handleLearnMore}
          className="mt-5 md:absolute md:right-0 md:top-0 px-6 py-3 rounded-2xl bg-emerald-400 text-black font-semibold hover:scale-105 duration-300"
        >
          Learn More
        </button>
      </div>

      {/* Upload Section */}
      <div
        id="upload-section"
        className="max-w-3xl mx-auto bg-white/5 border border-emerald-400/20 rounded-3xl p-8 text-center shadow-2xl shadow-emerald-500/10"
      >
        <div className="text-5xl mb-4">📄</div>

        <h2 className="text-3xl font-bold mb-3">Upload Your Resume</h2>

        <p className="text-slate-300 mb-6">
          Drag & drop or click below to upload your file
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {["PDF", "DOC", "DOCX", "TXT"].map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full bg-slate-800 text-emerald-300 text-sm"
            >
              {item}
            </span>
          ))}
        </div>

        <label className="cursor-pointer px-8 py-4 rounded-2xl bg-emerald-400 text-black font-bold hover:scale-105 duration-300 inline-block">
          Choose File
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileUpload}
          />
        </label>

        {selectedFile && (
          <p className="text-emerald-300 mt-4 text-sm">{selectedFile}</p>
        )}

        {loading && (
          <p className="text-cyan-300 mt-4 animate-pulse">
            Scanning Resume...
          </p>
        )}
      </div>

      {/* Result Section */}
      {showResult && (
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 p-3 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center">
                <h2 className="text-5xl font-bold">{score}</h2>
                <p className="text-slate-400">/100</p>
              </div>
            </div>

            <h3 className="text-center text-2xl text-emerald-400 font-bold mt-6">
              Grade: {score >= 90 ? "A+" : score >= 80 ? "B+" : "C"}
            </h3>

            <p className="text-center text-slate-300 mt-3">
              Improve keywords and grammar for better ranking.
            </p>
          </div>

          <div className="md:col-span-2 grid md:grid-cols-2 gap-5">
            {stats.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 rounded-2xl p-6 border border-white/10"
              >
                <div className="flex justify-between mb-3 font-semibold">
                  <span>{item.title}</span>
                  <span className="text-emerald-400">{item.value}%</span>
                </div>

                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>

                <p className="text-sm text-slate-400 mt-3">
                  ATS optimization insight available
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis */}
      <div className="mt-16 bg-white/5 rounded-3xl p-8 border border-white/10">
        <h2 className="text-3xl font-bold mb-6 text-emerald-400">
          Resume Deep Analysis
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            "Strong Professional Summary",
            "Experience Well Structured",
            "Missing 4 Industry Keywords",
            "Need Better Action Verbs",
            "Grammar Needs Improvement",
            "ATS Parsing Good",
          ].map((item) => (
            <div
              key={item}
              className="p-5 rounded-2xl bg-slate-900 border border-white/10 hover:border-emerald-400 duration-300"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div id="careerx-features" className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-emerald-400">
          Why Choose Our ATS Tool
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Instant ATS Score",
            "Smart Resume Suggestions",
            "Interview Ready Insights",
          ].map((item) => (
            <div
              key={item}
              className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center hover:border-emerald-400 duration-300"
            >
              <h3 className="text-xl font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Get Hired Faster
        </h2>

        <button
          onClick={handleOptimize}
          className="px-8 py-4 rounded-2xl bg-emerald-400 text-black font-bold hover:scale-105 duration-300"
        >
          Optimize Resume Now
        </button>
      </div>
    </div>
  );
}
