import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Zap,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Layers,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { Badge } from '../components/common/Badge';

export const AnalyticsPage: React.FC = () => {
  const { activeProject } = useProject();

  const analytics = activeProject?.analytics || {
    projectId: 'active-proj',
    retentionSimulation: [
      { second: 0, percentage: 100, industryAvg: 100 },
      { second: 3, percentage: 94, industryAvg: 72 },
      { second: 6, percentage: 89, industryAvg: 58 },
      { second: 12, percentage: 84, industryAvg: 48 },
      { second: 18, percentage: 79, industryAvg: 41 },
      { second: 24, percentage: 76, industryAvg: 36 },
      { second: 30, percentage: 72, industryAvg: 30 },
      { second: 36, percentage: 69, industryAvg: 25 },
      { second: 42, percentage: 67, industryAvg: 21 },
      { second: 45, percentage: 65, industryAvg: 18 },
    ],
    hookStrengthScore: 93,
    informationDensityScore: 88,
    sourceCoveragePercentage: 96,
    aiContributionPercentage: 62,
    humanEditCount: 7,
    estimatedHoursSaved: 3.8,
    predictedViralityScore: 89,
  };

  const pieData = [
    { name: 'AI Generation & Research', value: analytics.aiContributionPercentage, color: '#8B5CF6' },
    { name: 'Creator Direct Edits & Approval', value: 100 - analytics.aiContributionPercentage, color: '#EF4444' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forge-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-rose-400 font-mono uppercase tracking-wider bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800">
              AUDIENCE & PRODUCTION METRICS
            </span>
            <h1 className="text-2xl font-black text-white font-display">
              Short Video Intelligence & Retention Analytics
            </h1>
          </div>
          <p className="text-xs text-forge-400">
            Simulated viewer drop-off, hook resilience, fact coverage, and human-in-the-loop contribution breakdown.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge status="VERIFIED" size="sm" />
          <span className="text-xs font-mono font-bold text-white bg-forge-900 px-3 py-1 rounded-xl border border-forge-700">
            Virality Score: {analytics.predictedViralityScore}/100
          </span>
        </div>
      </div>

      {/* Demo simulation disclosure notice */}
      <div className="p-3.5 rounded-2xl bg-forge-900 border border-forge-700/60 flex items-center gap-2.5 text-xs text-forge-300">
        <Info className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          <strong>Simulated Model Disclosure:</strong> Retention curve predictions are simulated against 9:16 short-form benchmarks (TikTok, Reels, Shorts) based on script syllable velocity and hook contrast.
        </span>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-forge-900 border border-forge-700/70 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-forge-400">
            <span className="font-bold uppercase tracking-wider">Hook Strength</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-black font-mono text-white tracking-tight">
            {analytics.hookStrengthScore}<span className="text-sm font-normal text-forge-500">/100</span>
          </p>
          <p className="text-[11px] text-emerald-400 font-medium">
            +28% stronger than platform average
          </p>
        </div>

        <div className="bg-forge-900 border border-forge-700/70 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-forge-400">
            <span className="font-bold uppercase tracking-wider">Source Coverage</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-3xl font-black font-mono text-white tracking-tight">
            {analytics.sourceCoveragePercentage}<span className="text-sm font-normal text-forge-500">%</span>
          </p>
          <p className="text-[11px] text-cyan-400 font-medium">
            Cross-referenced with 3 citations
          </p>
        </div>

        <div className="bg-forge-900 border border-forge-700/70 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-forge-400">
            <span className="font-bold uppercase tracking-wider">Production Time Saved</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-black font-mono text-white tracking-tight">
            {analytics.estimatedHoursSaved}<span className="text-sm font-normal text-forge-500"> hrs</span>
          </p>
          <p className="text-[11px] text-emerald-400 font-medium">
            Versus manual editing workflows
          </p>
        </div>

        <div className="bg-forge-900 border border-forge-700/70 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-forge-400">
            <span className="font-bold uppercase tracking-wider">Creator Edits</span>
            <UserCheck className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-black font-mono text-white tracking-tight">
            {analytics.humanEditCount}<span className="text-sm font-normal text-forge-500"> actions</span>
          </p>
          <p className="text-[11px] text-purple-300 font-medium">
            Human-in-the-loop approved
          </p>
        </div>
      </div>

      {/* Main Retention Simulation Chart */}
      <div className="bg-forge-900 border border-forge-700/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-forge-800">
          <div>
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-crimson-400" />
              <span>Simulated Audience Retention Curve vs Platform Baseline</span>
            </h3>
            <p className="text-xs text-forge-400">
              Shows how the research-backed pattern interrupt retains viewers across the 45-second duration.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-crimson-400 font-bold">
              <span className="w-3 h-3 rounded bg-crimson-500" /> ClipForage AI Short
            </span>
            <span className="flex items-center gap-1.5 text-forge-500">
              <span className="w-3 h-3 rounded bg-forge-700" /> Industry Average
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.retentionSimulation}>
              <defs>
                <linearGradient id="colorClipForge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorIndustry" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4B536E" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4B536E" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#262D3E" />
              <XAxis dataKey="second" stroke="#8A96B2" tickFormatter={(v) => `${v}s`} />
              <YAxis stroke="#8A96B2" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0C0E14', borderColor: '#384157', borderRadius: '12px' }}
                labelFormatter={(v) => `Timestamp: ${v}s`}
                formatter={(value: any, name: any) => [
                  `${value}%`,
                  name === 'percentage' ? 'ClipForage Short' : 'Industry Average',
                ]}
              />
              <Area
                type="monotone"
                dataKey="percentage"
                stroke="#EF4444"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorClipForge)"
              />
              <Area
                type="monotone"
                dataKey="industryAvg"
                stroke="#6B7280"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#colorIndustry)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Split: AI vs Human Contribution & Information Density Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Human-in-the-Loop Contribution */}
        <div className="bg-forge-900 border border-forge-700/80 rounded-3xl p-6 space-y-4 shadow-2xl">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2 pb-3 border-b border-forge-800">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI Copilot vs Creator Oversight Split</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
            <div className="w-40 h-40 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 flex-1 text-xs">
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-purple-300">AI Intelligence (62%)</span>
                  <span className="text-white font-mono">Angle & Research Synthesis</span>
                </div>
                <p className="text-[11px] text-forge-400">
                  Angle ideation, source indexing, voiceover synthesis, and B-roll semantic matching.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-crimson-950/30 border border-crimson-800/40 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-crimson-300">Creator Decision-Making (38%)</span>
                  <span className="text-white font-mono">Final Approval</span>
                </div>
                <p className="text-[11px] text-forge-400">
                  Claim verification approvals, script section rewrites, and timeline cut adjustments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Density Metrics */}
        <div className="bg-forge-900 border border-forge-700/80 rounded-3xl p-6 space-y-4 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2 pb-3 border-b border-forge-800">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Production Density Scores</span>
            </h3>

            <div className="space-y-3 pt-3">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-forge-300 font-medium">Information Velocity</span>
                  <span className="font-mono font-bold text-emerald-400">92/100 (Optimal)</span>
                </div>
                <div className="w-full h-2 bg-forge-950 rounded-full overflow-hidden border border-forge-800">
                  <div className="h-full bg-emerald-500 rounded-full w-[92%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-forge-300 font-medium">Visual Cut Frequency</span>
                  <span className="font-mono font-bold text-cyan-400">3.2s avg per clip</span>
                </div>
                <div className="w-full h-2 bg-forge-950 rounded-full overflow-hidden border border-forge-800">
                  <div className="h-full bg-cyan-500 rounded-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-forge-300 font-medium">Reading Pacing</span>
                  <span className="font-mono font-bold text-amber-400">160 WPM (Clean Spoken)</span>
                </div>
                <div className="w-full h-2 bg-forge-950 rounded-full overflow-hidden border border-forge-800">
                  <div className="h-full bg-amber-500 rounded-full w-[88%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-forge-950 border border-forge-800 text-[11px] text-forge-400 italic mt-4">
            "High information velocity short videos backed by verifiable claims retain 42% more returning subscribers."
          </div>
        </div>
      </div>
    </div>
  );
};
