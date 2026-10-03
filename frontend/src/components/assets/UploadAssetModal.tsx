import React, { useState } from 'react';
import { Upload, Video, Image, Music, X } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { MediaAsset } from '../../types/project';

interface UploadAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (asset: MediaAsset) => void;
}

export const UploadAssetModal: React.FC<UploadAssetModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MediaAsset['category']>('Uploaded');
  const [type, setType] = useState<MediaAsset['type']>('video');
  const [tags, setTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      const newAsset: MediaAsset = {
        id: 'asset-custom-' + Date.now(),
        title,
        fileName: title.toLowerCase().replace(/\s+/g, '_') + (type === 'video' ? '.mp4' : type === 'image' ? '.jpg' : '.mp3'),
        type,
        category: 'Uploaded',
        url: type === 'video'
          ? 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1738-large.mp4'
          : 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600',
        thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600',
        durationSeconds: type === 'video' ? 12 : type === 'audio' ? 30 : undefined,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        semanticMatchScore: 88,
      };

      onUpload(newAsset);
      setIsUploading(false);
      setTitle('');
      setTags('');
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Media Asset"
      subtitle="Upload B-roll footage, diagrams, screenshots, or background audio tracks."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Drag and Drop Zone */}
        <div className="border-2 border-dashed border-forge-700 hover:border-crimson-500/60 rounded-2xl p-8 text-center bg-forge-950/60 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-2xl bg-forge-800 group-hover:bg-crimson-950 text-forge-400 group-hover:text-crimson-400 flex items-center justify-center mx-auto mb-3 border border-forge-700 transition-colors">
            <Upload className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-white">Drag & drop files or click to browse</p>
          <p className="text-xs text-forge-500 mt-1">MP4, MOV, WEBM, PNG, JPG, MP3, WAV (up to 500MB)</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
            Asset Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Developer Terminal Session Screen Recording"
            className="glass-input w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
              Asset Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="glass-input w-full"
            >
              <option value="video">Video Clip (9:16 / 16:9)</option>
              <option value="image">Image / Graphic</option>
              <option value="audio">Audio / SFX</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="terminal, coding, agent"
              className="glass-input w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-forge-700/60">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isUploading}>
            Save & Index Asset
          </Button>
        </div>
      </form>
    </Modal>
  );
};
