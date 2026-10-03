import React, { useState } from 'react';
import { Download, Copy, Check, Film, Share2, PlaySquare, Camera } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Project } from '../../types/project';
import { useToast } from '../../context/ToastContext';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, project }) => {
  const [activePlatform, setActivePlatform] = useState<'youtube' | 'instagram' | 'tiktok'>('youtube');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast({ type: 'success', title: 'Copied to Clipboard', message: `${fieldName} is ready to paste.` });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1738-large.mp4';
    link.download = `${project.title.toLowerCase().replace(/\s+/g, '_')}_1080x1920_master.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast({ type: 'success', title: 'Export Started', message: 'Downloading 1080x1920 MP4 Master file.' });
  };

  const ytTitle = `${project.title} #Shorts #Tech #AI`;
  const ytDesc = `Research-backed breakdown on ${project.title}.\n\nUnique Angle: ${project.brief?.uniqueAngle || 'Engineering Deep-Dive'}\n\nProduced with ClipForage AI (Research-backed short video production).`;
  const igCaption = `Stop thinking about AI as just a chatbot. In 2026, autonomous agentic loops change everything.\n\nFull research breakdown above 👆\n\n#aiagents #softwaredev #coding #techtrends #clipforge`;
  const ttCaption = `Why AI agents are not just autocomplete in 2026 🤯 #coding #developer #ai #tech #learnontiktok`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export & Publish Short"
      subtitle="Download the 1080x1920 MP4 master and copy multi-platform social metadata."
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Direct Download Action Card */}
        <div className="bg-gradient-to-r from-crimson-950/80 to-forge-900 border border-crimson-500/50 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-glow-crimson">
          <div>
            <h4 className="text-sm font-bold text-white font-display">1080x1920 H.264 Master File</h4>
            <p className="text-xs text-forge-300 mt-0.5">High bitrate 60FPS • Stereo Audio • Burned Dynamic Subtitles</p>
          </div>
          <Button variant="primary" onClick={handleDownload} icon={<Download className="w-4 h-4" />}>
            Download MP4
          </Button>
        </div>

        {/* Platform Metadata Tabs */}
        <div>
          <label className="block text-xs font-bold text-forge-400 uppercase tracking-wider mb-2">
            Social Media Publishing Pack
          </label>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => setActivePlatform('youtube')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activePlatform === 'youtube'
                  ? 'bg-red-950/80 border-red-600 text-white shadow-sm'
                  : 'bg-forge-850 border-forge-700/60 text-forge-400 hover:text-white'
              }`}
            >
              <PlaySquare className="w-4 h-4 text-red-500" />
              <span>YouTube Shorts</span>
            </button>

            <button
              onClick={() => setActivePlatform('instagram')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activePlatform === 'instagram'
                  ? 'bg-pink-950/80 border-pink-600 text-white shadow-sm'
                  : 'bg-forge-850 border-forge-700/60 text-forge-400 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4 text-pink-500" />
              <span>Instagram Reels</span>
            </button>

            <button
              onClick={() => setActivePlatform('tiktok')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activePlatform === 'tiktok'
                  ? 'bg-cyan-950/80 border-cyan-600 text-white shadow-sm'
                  : 'bg-forge-850 border-forge-700/60 text-forge-400 hover:text-white'
              }`}
            >
              <Film className="w-4 h-4 text-cyan-400" />
              <span>TikTok</span>
            </button>
          </div>

          {/* Copyable Box */}
          <div className="bg-forge-950 border border-forge-800 rounded-2xl p-4 space-y-4">
            {activePlatform === 'youtube' && (
              <>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-forge-400 uppercase tracking-wider">Video Title</span>
                    <button
                      onClick={() => handleCopy(ytTitle, 'YouTube Title')}
                      className="text-crimson-400 hover:text-crimson-300 flex items-center gap-1 font-semibold"
                    >
                      {copiedField === 'YouTube Title' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedField === 'YouTube Title' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="p-2.5 rounded-xl bg-forge-900 text-xs text-white border border-forge-800 font-mono">
                    {ytTitle}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-forge-400 uppercase tracking-wider">Description & Sources</span>
                    <button
                      onClick={() => handleCopy(ytDesc, 'YouTube Description')}
                      className="text-crimson-400 hover:text-crimson-300 flex items-center gap-1 font-semibold"
                    >
                      {copiedField === 'YouTube Description' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedField === 'YouTube Description' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="p-2.5 rounded-xl bg-forge-900 text-xs text-forge-200 border border-forge-800 font-mono whitespace-pre-line leading-relaxed">
                    {ytDesc}
                  </p>
                </div>
              </>
            )}

            {activePlatform === 'instagram' && (
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-forge-400 uppercase tracking-wider">Reels Caption & Hashtags</span>
                  <button
                    onClick={() => handleCopy(igCaption, 'Instagram Caption')}
                    className="text-pink-400 hover:text-pink-300 flex items-center gap-1 font-semibold"
                  >
                    {copiedField === 'Instagram Caption' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'Instagram Caption' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="p-2.5 rounded-xl bg-forge-900 text-xs text-forge-200 border border-forge-800 font-mono whitespace-pre-line leading-relaxed">
                  {igCaption}
                </p>
              </div>
            )}

            {activePlatform === 'tiktok' && (
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-forge-400 uppercase tracking-wider">TikTok Caption & Sounds</span>
                  <button
                    onClick={() => handleCopy(ttCaption, 'TikTok Caption')}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                  >
                    {copiedField === 'TikTok Caption' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'TikTok Caption' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="p-2.5 rounded-xl bg-forge-900 text-xs text-forge-200 border border-forge-800 font-mono whitespace-pre-line leading-relaxed">
                  {ttCaption}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-forge-700/60">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
