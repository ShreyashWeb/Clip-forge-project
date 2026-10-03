import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Mic,
  Sliders,
  Cpu,
  BarChart3,
  Layers,
  Play,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  Lock,
  ChevronRight,
  Terminal,
  Zap,
  Globe,
  Box
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ThreeHeroCanvas } from '../components/three/ThreeHeroCanvas';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('solution');
  const [demoStep, setDemoStep] = useState(0);

  const steps = [
    { num: '01', title: 'Idea & Angle', desc: 'AI proposes 4 unique creator angles tailored for high-retention 9:16 shorts.' },
    { num: '02', title: 'Research & Sources', desc: 'Pulls verified academic papers and data points with source credibility scores.' },
    { num: '03', title: 'Fact-Checked Script', desc: 'Structures 6 core sections with B-roll prompts and flags unverified claims.' },
    { num: '04', title: 'Neural Voice', desc: 'ElevenLabs voiceover synthesis with speed, emotion, and waveform controls.' },
    { num: '05', title: 'Semantic B-Roll', desc: 'Matches footage with AI relevance % scores to every script sentence.' },
    { num: '06', title: 'AI Timeline & NLE', desc: 'Auto-assembles multi-track video, voice, audio, and dynamic pop captions.' },
    { num: '07', title: 'Render & Publish', desc: '1080x1920 60FPS master video with copyable YouTube, TikTok, and Reels metadata.' },
  ];

  return (
    <div className="min-h-screen bg-forge-950 text-forge-100 overflow-x-hidden selection:bg-crimson-600 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-forge-950/80 backdrop-blur-xl border-b border-forge-700/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-crimson-500 to-crimson-700 flex items-center justify-center shadow-glow-crimson">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-lg tracking-wider font-display">CLIPFORAGE</span>
              <span className="text-[10px] bg-crimson-950 text-crimson-400 font-bold px-1.5 py-0.5 rounded border border-crimson-700/40">AI</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-forge-300">
            <a href="#problem" className="hover:text-white transition-colors">The Problem</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#trust" className="hover:text-white transition-colors">Trust Engine</a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/dashboard')} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Open Studio
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Interactive Three.js 3D WebGL Canvas */}
      <section className="relative pt-16 pb-24 px-6 overflow-hidden">
        {/* Three.js 3D WebGL Canvas */}
        <ThreeHeroCanvas />

        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-crimson-600/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forge-900/90 border border-crimson-500/40 shadow-glow-crimson text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-crimson-400" />
            <span className="text-forge-200">The Research-Backed Short-Form Production Copilot</span>
            <span className="text-[9px] bg-cyan-950 text-cyan-400 font-mono font-bold px-1.5 py-0.5 rounded border border-cyan-800/40">Three.js 3D</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-display leading-[1.1]">
            From idea to publish-ready short. <br />
            <span className="gradient-crimson-text">
              With research, context & AI on your side.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-forge-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Turn a rough idea into a research-backed short-form video using AI-assisted research, scripting, voiceover, visual matching and multi-track editing. <br className="hidden sm:inline" />
            <strong className="text-white font-semibold">AI assists the creator, but you remain in complete control.</strong>
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/create')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-extrabold text-base text-white bg-gradient-to-r from-crimson-600 via-crimson-500 to-rose-500 hover:from-crimson-500 hover:to-rose-400 active:scale-[0.98] shadow-lg shadow-crimson-900/40 hover:shadow-glow-crimson transition-all"
            >
              <span>Create Your First Video</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-base text-forge-200 bg-forge-900 hover:bg-forge-850 hover:text-white border border-forge-700/80 active:scale-[0.98] transition-all"
            >
              <Play className="w-4 h-4 fill-current text-crimson-400" />
              <span>Explore Interactive Demo</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-forge-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Human-in-the-Loop Review</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Citation & Fact-Check Guardrails</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multi-Track Browser NLE</span>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section id="problem" className="py-20 px-6 bg-forge-900/50 border-y border-forge-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-crimson-400 uppercase tracking-wider font-mono">
              THE BROKEN WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Short-Form Production Is Painfully Fragmented.
            </h2>
            <p className="text-forge-400 max-w-2xl mx-auto text-sm sm:text-base">
              Creators currently juggle 6 disconnected tools and spend 5+ hours on a single 45-second video, while generic one-click AI tools hallucinate unverified claims.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* The Old Fragmented Way */}
            <div className="p-8 rounded-3xl bg-forge-900 border border-rose-900/40 space-y-6">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>The Fragmented Manual Slog</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-forge-400">
                <span className="p-2 rounded-xl bg-forge-950 border border-forge-800">Google Search</span>
                <span className="text-rose-500">→</span>
                <span className="p-2 rounded-xl bg-forge-950 border border-forge-800">Notion Script</span>
                <span className="text-rose-500">→</span>
                <span className="p-2 rounded-xl bg-forge-950 border border-forge-800">Manual Fact-Check</span>
                <span className="text-rose-500">→</span>
                <span className="p-2 rounded-xl bg-forge-950 border border-forge-800">ElevenLabs TTS</span>
                <span className="text-rose-500">→</span>
                <span className="p-2 rounded-xl bg-forge-950 border border-forge-800">Stock Hunting</span>
                <span className="text-rose-500">→</span>
                <span className="p-2 rounded-xl bg-forge-950 border border-forge-800">Premiere / CapCut</span>
              </div>

              <ul className="space-y-2.5 text-xs text-forge-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Takes 4 to 6 hours per video with tedious context-switching</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Generic AI tools output generic fluff without your unique angle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>High risk of publishing fabricated or unsupported claims</span>
                </li>
              </ul>
            </div>

            {/* The ClipForage AI Way */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-forge-850 via-forge-900 to-crimson-950/30 border border-crimson-500/50 shadow-glow-crimson space-y-6">
              <div className="flex items-center gap-2 text-crimson-400 font-bold text-sm uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>One Workspace. One AI Copilot.</span>
              </div>

              <div className="p-4 rounded-2xl bg-forge-950/80 border border-forge-700/60 font-mono text-xs text-white">
                Idea → Research → Verified Script → Neural Voice → Semantic B-Roll → NLE Editor → Render
              </div>

              <ul className="space-y-2.5 text-xs text-forge-200">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Creators cut production time from 5 hours to under 8 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>AI discovers high-retention creator angles tailored to your niche</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Every claim is cross-checked with peer-reviewed source citations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Creator stays in control of every word, clip, and cut</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Core Features Grid */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-crimson-400 uppercase tracking-wider font-mono">
            CREATOR WORKSPACE CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Engineered for Serious Short-Form Creators
          </h2>
          <p className="text-forge-400 max-w-2xl mx-auto text-sm sm:text-base">
            Everything you need to produce viral, high-credibility Reels, Shorts, and TikToks in one cohesive studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: 'AI Angle Discovery',
              desc: 'Discovers 4 distinctive counter-intuitive angles so your video never sounds like generic ChatGPT sludge.',
              icon: Sparkles,
              color: 'text-purple-400',
            },
            {
              title: 'Research & Verification',
              desc: 'Retrieves verified academic papers, benchmarks, and credible sources with confidence scores.',
              icon: ShieldCheck,
              color: 'text-cyan-400',
            },
            {
              title: 'Script Studio Intelligence',
              desc: 'Structures 6-part viral scripts with instant 1-click optimizers (Improve Hook, Shorten, Simplify, CTA).',
              icon: FileText,
              color: 'text-emerald-400',
            },
            {
              title: 'Neural AI Voice (ElevenLabs)',
              desc: 'Professional studio voices with speed, emotion, stability tuning, and interactive waveform visualizer.',
              icon: Mic,
              color: 'text-amber-400',
            },
            {
              title: 'Semantic B-Roll Matching',
              desc: 'Recommends matching visual footage for every sentence with transparent AI relevance percentage scores.',
              icon: FolderGit2,
              color: 'text-crimson-400',
            },
            {
              title: 'AI Multi-Track Timeline',
              desc: 'Full browser NLE with Video, Audio, Voice, Subtitles, and Text overlay tracks with AI Auto-Assembly.',
              icon: Sliders,
              color: 'text-indigo-400',
            },
            {
              title: 'Human-in-the-Loop Control',
              desc: 'You approve every claim rewrite, tweak every cut, and edit any word before rendering.',
              icon: Layers,
              color: 'text-teal-400',
            },
            {
              title: 'Retention & Virality Analytics',
              desc: 'Simulates audience watch-time curves, hook strength scores, and content density metrics.',
              icon: BarChart3,
              color: 'text-rose-400',
            },
          ].map((feat, idx) => (
            <div
              key={idx}
              className="bg-forge-900/90 border border-forge-700/60 hover:border-crimson-500/50 rounded-2xl p-6 transition-all hover:bg-forge-850 hover:shadow-glow-crimson group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-forge-800/80 border border-forge-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <feat.icon className={`w-6 h-6 ${feat.color}`} />
                </div>
                <h3 className="text-base font-bold text-white font-display mb-2">{feat.title}</h3>
                <p className="text-xs text-forge-400 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7-Stage How It Works Interactive Walkthrough */}
      <section id="how-it-works" className="py-20 px-6 bg-forge-900/60 border-y border-forge-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-crimson-400 uppercase tracking-wider font-mono">
              THE 7-PHASE PIPELINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              How ClipForage AI Produces Shorts
            </h2>
            <p className="text-forge-400 max-w-xl mx-auto text-sm">
              Click through the stages to see how idea transforms into publish-ready video.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setDemoStep(idx)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  demoStep === idx
                    ? 'bg-crimson-600 border-crimson-500 text-white shadow-glow-crimson'
                    : 'bg-forge-850 border-forge-700/70 text-forge-400 hover:text-white hover:bg-forge-800'
                }`}
              >
                <span className="text-[10px] font-mono font-bold block opacity-80">{s.num}</span>
                <span className="text-xs font-bold truncate block">{s.title}</span>
              </button>
            ))}
          </div>

          {/* Active Step Showcase Card */}
          <div className="p-8 rounded-3xl bg-forge-850 border border-forge-700/80 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs font-mono font-bold text-crimson-400 uppercase tracking-wider bg-crimson-950 px-3 py-1 rounded-full border border-crimson-800">
                Stage {steps[demoStep].num} // {steps[demoStep].title}
              </span>
              <h3 className="text-2xl font-bold text-white font-display">
                {steps[demoStep].title} Engine
              </h3>
              <p className="text-sm text-forge-300 leading-relaxed">
                {steps[demoStep].desc}
              </p>
            </div>

            <Button
              variant="primary"
              onClick={() => navigate('/dashboard')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Test In Studio
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & Fact-Check Verification Engine */}
      <section id="trust" className="py-24 px-6 max-w-5xl mx-auto space-y-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-forge-850 to-forge-900 border border-emerald-500/40 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-950 border border-emerald-700/50 text-emerald-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                "AI-Generated Does Not Mean Unchecked."
              </h2>
              <p className="text-xs sm:text-sm text-emerald-300">
                ClipForage AI automatically flags unverified claims and provides peer-reviewed source rewrites.
              </p>
            </div>
          </div>

          <p className="text-sm text-forge-300 leading-relaxed">
            The platform is explicitly designed with fact-checking guardrails. When an unverified or hyperbolic claim is detected (e.g. "AI will replace all coders in 30 days"), ClipForage flags it as <span className="text-amber-400 font-bold">Needs Review</span> and suggests a research-backed rewrite with source citations.
          </p>

          <div className="p-4 rounded-2xl bg-forge-950 border border-forge-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-forge-300">
              <strong className="text-white block">Zero Fake Success States</strong>
              <span>If external APIs are unavailable, the platform uses clear mock diagnostics without pretending.</span>
            </div>
            <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard')}>
              See Verification Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 text-center bg-gradient-to-t from-forge-950 via-forge-900 to-forge-950 border-t border-forge-800 space-y-6">
        <h2 className="text-3xl sm:text-5xl font-black text-white font-display">
          Ready to Forge Your First Research-Backed Short?
        </h2>
        <p className="text-forge-400 max-w-xl mx-auto text-sm sm:text-base">
          Join professional creators, educators, and tech builders creating high-retention short videos with AI assistance.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigate('/create')}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-extrabold text-base text-white bg-gradient-to-r from-crimson-600 to-rose-500 hover:from-crimson-500 hover:to-rose-400 shadow-glow-crimson transition-all"
          >
            <span>Launch ClipForage Studio</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-forge-800 text-center text-xs text-forge-500 font-mono">
        ClipForage AI © 2026 — Research-backed short-form video production platform. Powered by Google Gemini & ElevenLabs.
      </footer>
    </div>
  );
};
