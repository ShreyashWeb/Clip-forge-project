import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Wand2, Film, Clock, PlaySquare, Camera } from 'lucide-react';
import { VideoPlatform, VideoDuration, VideoTone } from '../../types/project';
import { useProject } from '../../context/ProjectContext';
import { aiService } from '../../services/aiService';
import { useToast } from '../../context/ToastContext';

export const QuickCreateCard: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<VideoPlatform>('YouTube Shorts');
  const [duration, setDuration] = useState<VideoDuration>('45 sec');
  const [tone, setTone] = useState<VideoTone>('Educational');
  const [isGenerating, setIsGenerating] = useState(false);

  const { createProject, updateProjectBrief } = useProject();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleStartProduction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      showToast({ type: 'warning', title: 'Idea Required', message: 'Please enter a video topic or question to begin.' });
      return;
    }

    setIsGenerating(true);
    try {
      // 1. Query AI Angle Discovery & Brief
      const angles = await aiService.generateAngles(topic);
      const chosenAngle = angles[0]?.title || `Deconstruct the technical reality of ${topic}`;
      const brief = await aiService.generateBrief({
        topic,
        angle: chosenAngle,
        audience: 'Tech creators and software builders',
        platform,
        duration,
        tone,
      });

      // 2. Fetch Initial Research for the Angle
      const research = await aiService.fetchResearch(topic, chosenAngle);

      // 3. Create project with Brief & Research attached directly
      await createProject({
        title: topic,
        platform,
        duration,
        tone,
        status: 'RESEARCHING',
        brief,
        research,
      });

      showToast({ type: 'ai', title: 'Angle Discovered', message: 'Generated production brief and researched initial facts.' });
      navigate('/studio/brief');
    } catch (err) {
      showToast({ type: 'error', title: 'Generation Failed', message: 'Could not generate production brief.' });
    } finally {
      setIsGenerating(false);
    }
  };

  const sampleIdeas = [
    'Explain how AI agents are changing software development.',
    'Why PostgreSQL MVCC is superior to traditional locking.',
    'The 3 biggest myths about LLM reasoning models.'
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-forge-850 via-forge-900 to-forge-950 border border-forge-700/80 p-6 sm:p-8 shadow-2xl glow-border">
      {/* Background ambient red glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-crimson-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-xl bg-crimson-950/80 border border-crimson-700/50 text-crimson-400 shadow-glow-crimson">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display">
              Create Your Next Research-Backed Short
            </h2>
            <p className="text-xs sm:text-sm text-forge-400">
              Transform a raw topic into a verified, fact-checked 9:16 video brief in seconds.
            </p>
          </div>
        </div>

        <form onSubmit={handleStartProduction} className="mt-6 space-y-5">
          {/* Main Idea Input */}
          <div className="relative">
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What do you want to create? (e.g. 'Explain how AI agents test and debug code autonomously in 2026')"
              className="w-full bg-forge-950/90 border border-forge-700 rounded-2xl p-4 text-sm sm:text-base text-white placeholder-forge-500 focus:outline-none focus:border-crimson-500 focus:ring-1 focus:ring-crimson-500 transition-all resize-none shadow-inner"
            />
            {/* Sample Chips */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-[11px] font-semibold text-forge-500 uppercase tracking-wider">Try:</span>
              {sampleIdeas.map((idea, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setTopic(idea)}
                  className="text-xs text-forge-300 hover:text-white bg-forge-800/80 hover:bg-forge-750 px-2.5 py-1 rounded-lg border border-forge-700/50 transition-colors truncate max-w-[280px]"
                >
                  {idea}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Config Selector Bars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Platform Selector */}
            <div>
              <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-2">
                Platform
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['YouTube Shorts', 'Instagram Reels', 'TikTok'] as VideoPlatform[]).map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`py-2 px-2 text-xs font-medium rounded-xl border transition-all text-center flex flex-col items-center gap-1 ${
                      platform === p
                        ? 'bg-crimson-950/80 border-crimson-500 text-white shadow-glow-crimson font-semibold'
                        : 'bg-forge-850 border-forge-700/70 text-forge-300 hover:bg-forge-800 hover:text-white'
                    }`}
                  >
                    {p === 'YouTube Shorts' && <PlaySquare className="w-3.5 h-3.5 text-red-500" />}
                    {p === 'Instagram Reels' && <Camera className="w-3.5 h-3.5 text-pink-500" />}
                    {p === 'TikTok' && <Film className="w-3.5 h-3.5 text-cyan-400" />}
                    <span className="truncate w-full">{p.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selector */}
            <div>
              <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-2">
                Duration Target
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['30 sec', '45 sec', '60 sec'] as VideoDuration[]).map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`py-2 px-2 text-xs font-medium rounded-xl border transition-all text-center flex items-center justify-center gap-1 ${
                      duration === d
                        ? 'bg-crimson-950/80 border-crimson-500 text-white shadow-glow-crimson font-semibold'
                        : 'bg-forge-850 border-forge-700/70 text-forge-300 hover:bg-forge-800 hover:text-white'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-forge-400" />
                    <span>{d}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-2">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as VideoTone)}
                className="w-full h-[42px] bg-forge-850 border border-forge-700/70 rounded-xl px-3 text-xs text-white focus:outline-none focus:border-crimson-500 font-medium"
              >
                <option value="Educational">Educational (High Clarity)</option>
                <option value="Conversational">Conversational (Engaging)</option>
                <option value="Storytelling">Storytelling (Narrative)</option>
                <option value="News">News & Breaking Tech</option>
                <option value="Professional">Professional Architect</option>
              </select>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-forge-800">
            <div className="flex items-center gap-2 text-xs text-forge-400">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>AI will discover your angle and pull research facts before drafting.</span>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !topic.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-crimson-600 via-crimson-500 to-rose-500 hover:from-crimson-500 hover:to-rose-400 active:scale-[0.98] shadow-lg shadow-crimson-900/40 hover:shadow-glow-crimson transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Angles...</span>
                </>
              ) : (
                <>
                  <span>Start AI Production</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
