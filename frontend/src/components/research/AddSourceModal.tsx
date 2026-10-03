import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { ResearchSource } from '../../types/project';

interface AddSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (source: ResearchSource) => void;
}

export const AddSourceModal: React.FC<AddSourceModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [url, setUrl] = useState('');
  const [snippet, setSnippet] = useState('');
  const [sourceType, setSourceType] = useState<ResearchSource['sourceType']>('Academic Paper');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    const newSource: ResearchSource = {
      id: 'src-custom-' + Date.now(),
      projectId: 'active-proj',
      title,
      publisher: publisher || 'Verified Source',
      url,
      publicationDate: new Date().toISOString().split('T')[0],
      sourceType,
      reliabilityStatus: 'VERIFIED',
      credibilityScore: 92,
      snippet: snippet || title,
      keyTakeaways: ['Creator provided custom citation']
    };

    onAdd(newSource);
    setTitle('');
    setPublisher('');
    setUrl('');
    setSnippet('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Verified Research Source"
      subtitle="Attach an academic paper, documentation link, or industry report to this video project."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
            Source Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"
            className="glass-input w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
              Publisher / Institution
            </label>
            <input
              type="text"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              placeholder="e.g. Stanford University & Princeton"
              className="glass-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
              Source Type
            </label>
            <select
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value as any)}
              className="glass-input w-full"
            >
              <option value="Academic Paper">Academic Paper</option>
              <option value="Industry Report">Industry Report</option>
              <option value="Official Doc">Official Documentation</option>
              <option value="Technical Article">Technical Article</option>
              <option value="Case Study">Case Study</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
            Source URL
          </label>
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://arxiv.org/abs/..."
            className="glass-input w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
            Key Excerpt / Snippet
          </label>
          <textarea
            rows={3}
            value={snippet}
            onChange={(e) => setSnippet(e.target.value)}
            placeholder="Paste the relevant data point or conclusion here..."
            className="glass-input w-full resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-forge-700/60">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Citation
          </Button>
        </div>
      </form>
    </Modal>
  );
};
