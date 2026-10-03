import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderGit2,
  Sparkles,
  Plus,
  ArrowRight,
  Video,
  Image,
  Music,
  Upload,
  Eye,
  Sliders,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { MediaAsset } from '../types/project';
import { BrollMatcher } from '../components/assets/BrollMatcher';
import { UploadAssetModal } from '../components/assets/UploadAssetModal';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';
import { MOCK_ASSETS } from '../services/mockData';

export const AssetLibraryPage: React.FC = () => {
  const { activeProject, updateProjectAssets, updateProjectTimeline } = useProject();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<MediaAsset['category'] | 'All'>('All');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);

  const assets = activeProject?.assets || [];

  const filteredAssets = assets.filter((a) => {
    if (activeCategory === 'All') return true;
    return a.category === activeCategory;
  });

  const handleAddToTimeline = (asset: MediaAsset) => {
    const currentTimeline = activeProject?.timeline || [];
    const newTrackItem = {
      id: 'trk-' + Date.now(),
      trackType: (asset.type === 'video' ? 'VIDEO' : asset.type === 'audio' ? 'AUDIO' : 'VIDEO') as any,
      assetId: asset.id,
      title: asset.title,
      startTime: currentTimeline.length > 0 ? 12 : 0,
      duration: asset.durationSeconds || 10,
    };

    updateProjectTimeline([...currentTimeline, newTrackItem]);
    showToast({ type: 'success', title: 'Added to Timeline', message: `"${asset.title}" added to video track.` });
  };

  const handleUploadAsset = (newAsset: MediaAsset) => {
    const updated = [newAsset, ...assets];
    updateProjectAssets(updated);
    showToast({ type: 'success', title: 'Asset Uploaded', message: `"${newAsset.title}" indexed for AI matching.` });
  };

  const handleDeleteAsset = (id: string) => {
    const updated = assets.filter((a) => a.id !== id);
    updateProjectAssets(updated);
    showToast({ type: 'info', title: 'Asset Removed', message: 'Item deleted from project library.' });
  };

  const handleProceedToEditor = async () => {
    if (!activeProject?.timeline || activeProject.timeline.length === 0) {
      const currentAssets = activeProject?.assets?.length ? activeProject.assets : MOCK_ASSETS;
      const initialTimeline = [
        {
          id: 'trk-vid-1',
          trackType: 'VIDEO' as const,
          assetId: currentAssets[0]?.id || 'asset-1',
          title: currentAssets[0]?.title || 'Visual Opening Clip',
          startTime: 0,
          duration: 14,
        },
        {
          id: 'trk-voice-1',
          trackType: 'VOICE' as const,
          title: 'Master Voiceover',
          startTime: 0,
          duration: 44,
          volume: 100,
        },
        {
          id: 'trk-audio-2',
          trackType: 'AUDIO' as const,
          title: 'Cyber Pulse BGM (Lo-fi)',
          startTime: 1,
          duration: 44,
          volume: 18,
        },
        {
          id: 'trk-cap-1',
          trackType: 'CAPTIONS' as const,
          title: 'Dynamic Pop Subtitles',
          startTime: 0,
          duration: 44,
          text: 'Dynamic Animated Words',
        }
      ];
      await updateProjectTimeline(initialTimeline);
    }
    navigate('/studio/editor');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forge-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-crimson-400 font-mono uppercase tracking-wider bg-crimson-950 px-2.5 py-0.5 rounded-full border border-crimson-800">
              STAGE 05
            </span>
            <h1 className="text-2xl font-black text-white font-display">
              Asset Library & Semantic B-Roll
            </h1>
          </div>
          <p className="text-xs text-forge-400">
            Semantic AI matching scores footage directly against your script sentences.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsUploadOpen(true)}
            icon={<Upload className="w-3.5 h-3.5" />}
          >
            Upload Asset
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleProceedToEditor}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Open Multi-Track Video Editor (Stage 06)
          </Button>
        </div>
      </div>

      {/* Semantic AI B-Roll Matcher Section */}
      <div className="bg-forge-850/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <BrollMatcher
          suggestions={assets.filter((a) => a.semanticMatchScore && a.semanticMatchScore > 80)}
          onAddToTimeline={handleAddToTimeline}
          onPreview={(asset) => setPreviewAsset(asset)}
          onReject={(id) => showToast({ type: 'info', title: 'Match Rejected', message: 'Asset dismissed from suggestions.' })}
        />
      </div>

      {/* Media Category Library Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-forge-800">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-crimson-500" />
            <h3 className="text-lg font-bold text-white font-display">Media Asset Vault</h3>
            <span className="text-xs font-mono text-forge-400">({filteredAssets.length})</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Videos', 'Images', 'Audio', 'Generated', 'Uploaded'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-crimson-600 text-white shadow-glow-crimson'
                    : 'bg-forge-900 text-forge-400 hover:text-white hover:bg-forge-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asset Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-forge-900 border border-forge-700/70 hover:border-crimson-500/50 rounded-2xl overflow-hidden transition-all group flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-black overflow-hidden">
                <img
                  src={asset.thumbnailUrl}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-[9px] font-bold text-white px-2 py-0.5 rounded font-mono uppercase">
                  {asset.type}
                </div>
                {asset.durationSeconds && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-[9px] font-mono text-white px-1.5 py-0.5 rounded">
                    {asset.durationSeconds}s
                  </div>
                )}
              </div>

              <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white truncate" title={asset.title}>
                    {asset.title}
                  </h4>
                  <p className="text-[10px] text-forge-400 font-mono truncate">{asset.fileName}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-forge-800">
                  <button
                    onClick={() => setPreviewAsset(asset)}
                    className="text-xs text-forge-300 hover:text-white flex items-center gap-1 font-semibold"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDeleteAsset(asset.id)}
                      className="p-1 rounded text-forge-400 hover:text-rose-400"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleAddToTimeline(asset)}
                    >
                      + Timeline
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Asset Preview Modal */}
      {previewAsset && (
        <Modal
          isOpen={!!previewAsset}
          onClose={() => setPreviewAsset(null)}
          title={previewAsset.title}
          subtitle={`Type: ${previewAsset.type} • File: ${previewAsset.fileName}`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-forge-700 flex items-center justify-center">
              {previewAsset.type === 'video' ? (
                <video src={previewAsset.url} controls autoPlay loop className="w-full h-full object-contain" />
              ) : (
                <img src={previewAsset.url} alt={previewAsset.title} className="w-full h-full object-contain" />
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex flex-wrap gap-1">
                {previewAsset.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-forge-800 text-forge-300 px-2 py-0.5 rounded border border-forge-700">
                    #{tag}
                  </span>
                ))}
              </div>

              <Button
                variant="primary"
                onClick={() => {
                  handleAddToTimeline(previewAsset);
                  setPreviewAsset(null);
                }}
              >
                Insert into Timeline Track
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Upload Asset Modal */}
      <UploadAssetModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUploadAsset}
      />
    </div>
  );
};
