import { Project, VoiceProfile, MediaAsset } from '../types/project';

export const MOCK_VOICES: VoiceProfile[] = [
  {
    id: 'voice-1',
    name: 'Marcus Vance',
    accent: 'US Natural',
    gender: 'Male',
    style: 'Authoritative & Tech Explainer',
    sampleUrl: 'https://actions.google.com/sounds/v1/speech/tech_explainer.mp3',
    elevenLabsVoiceId: 'pNInz6obpgDQGcFmaJgB',
    isPremium: true
  },
  {
    id: 'voice-2',
    name: 'Elena Rostova',
    accent: 'British Crisp',
    gender: 'Female',
    style: 'Engaging & Conversational',
    sampleUrl: 'https://actions.google.com/sounds/v1/speech/conversational_female.mp3',
    elevenLabsVoiceId: '21m00Tcm4TlvDq8ikWAM',
    isPremium: true
  },
  {
    id: 'voice-3',
    name: 'Kai Takahashi',
    accent: 'US Dynamic',
    gender: 'Neutral',
    style: 'Energetic Fast-Paced Short',
    sampleUrl: 'https://actions.google.com/sounds/v1/speech/fast_short.mp3',
    elevenLabsVoiceId: 'AZnzlk1XvdvUeBnXmlld',
    isPremium: false
  },
  {
    id: 'voice-4',
    name: 'Dr. Evelyn Reed',
    accent: 'US Calm',
    gender: 'Female',
    style: 'Documentary & Deep Research',
    sampleUrl: 'https://actions.google.com/sounds/v1/speech/calm_doc.mp3',
    elevenLabsVoiceId: 'EXAVITQu4vr4xnSDxMaL',
    isPremium: true
  }
];

export const MOCK_ASSETS: MediaAsset[] = [
  {
    id: 'asset-1',
    title: 'AI Neural Network Code Canvas',
    fileName: 'neural_coding_loop.mp4',
    type: 'video',
    category: 'Videos',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1738-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    durationSeconds: 12,
    width: 1080,
    height: 1920,
    tags: ['coding', 'neural-net', 'software-dev', 'ai'],
    semanticMatchScore: 94,
    scriptSentenceMatch: 'AI agents are not just chatbots anymore; they actively plan, execute terminal commands, and write code.'
  },
  {
    id: 'asset-2',
    title: 'Developer Multi-monitor Workflow',
    fileName: 'dev_terminal_workflow.mp4',
    type: 'video',
    category: 'Videos',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-keyboard-in-a-dark-room-42861-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    durationSeconds: 15,
    width: 1080,
    height: 1920,
    tags: ['terminal', 'workflow', 'architecture', 'keyboard'],
    semanticMatchScore: 89,
    scriptSentenceMatch: 'Instead of typing boilerplate, developers now act as systems architects reviewing autonomous pull requests.'
  },
  {
    id: 'asset-3',
    title: 'Autonomous Multi-Agent Collaboration Graphic',
    fileName: 'agentic_loop_diagram.jpg',
    type: 'image',
    category: 'Generated',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    tags: ['diagram', 'multi-agent', 'orchestration'],
    semanticMatchScore: 91,
    scriptSentenceMatch: 'The key difference is the feedback loop: reason, act, observe, and self-correct.'
  },
  {
    id: 'asset-4',
    title: 'Futuristic Cyber Data Grid',
    fileName: 'cyber_grid_motion.mp4',
    type: 'video',
    category: 'Videos',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31912-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&auto=format&fit=crop&q=80',
    durationSeconds: 10,
    width: 1080,
    height: 1920,
    tags: ['data', 'cyber', 'analytics', 'future'],
    semanticMatchScore: 82,
    scriptSentenceMatch: 'Stanford and DeepMind research shows multi-agent verification reduces error rates by over 47%.'
  },
  {
    id: 'asset-5',
    title: 'Punchy Cinematic Sub-Bass Hit',
    fileName: 'cinematic_sub_impact.mp3',
    type: 'audio',
    category: 'Audio',
    url: 'https://actions.google.com/sounds/v1/impacts/crash_metal_sub.mp3',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    durationSeconds: 3,
    tags: ['sfx', 'impact', 'hook-transition', 'bass']
  },
  {
    id: 'asset-6',
    title: 'Cyber Pulse Ambient Bed (Lofi Tech)',
    fileName: 'cyber_pulse_background.mp3',
    type: 'audio',
    category: 'Audio',
    url: 'https://actions.google.com/sounds/v1/science_fiction/alien_hum_loop.mp3',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    durationSeconds: 45,
    tags: ['music', 'ambient', 'bgm', 'tech-vibe']
  }
];

export const INITIAL_DEMO_PROJECT: Project = {
  id: 'proj-ai-agents-2026',
  userId: 'user-creator-1',
  title: 'Why AI Agents Are Changing Software Development',
  description: 'A deep-dive research-backed breakdown explaining how autonomous coding agents differ from chatbots and why human architectural oversight is vital.',
  status: 'EDITING',
  platform: 'YouTube Shorts',
  duration: '45 sec',
  tone: 'Educational',
  thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
  createdAt: '2026-10-02T14:20:00Z',
  updatedAt: '2026-10-03T05:45:00Z',
  brief: {
    id: 'brief-1',
    projectId: 'proj-ai-agents-2026',
    title: 'Why AI Agents Are Changing Software Development',
    topic: 'AI Coding Agents vs Chatbots in Software Engineering',
    uniqueAngle: 'Focus on the "Reason-Act-Observe" feedback loop and how engineers evolve from coders to system directors.',
    whyThisAngle: 'Most generic reels say "AI will steal your job" or show basic autocomplete. This angle positions the creator as an authoritative insider who respects engineering craft.',
    targetAudience: 'Software developers, tech enthusiasts, CS students, and startup founders',
    platform: 'YouTube Shorts',
    duration: '45 sec',
    tone: 'Educational',
    language: 'English (US)',
    hookVariant: 'Stop thinking of AI as a fancy autocomplete. In 2026, AI agents don’t just write code—they test, debug, and ship it.',
    alternateHooks: [
      'The biggest shift in programming since the compiler just happened, and 90% of developers missed it.',
      'Here is the exact difference between a chatbot that guesses code and an AI agent that actually fixes your bugs.'
    ],
    keyPillars: [
      'Chatbots predict next tokens; Agents execute tools, read terminal errors, and iterate.',
      'Stanford benchmark data shows tool-augmented agents solve 4x more real-world repo issues.',
      'The engineer does not vanish—they become the architect, verifier, and safety guardrail.'
    ],
    callToAction: 'Follow for real AI architecture insights that cut through the marketing hype.',
    createdAt: '2026-10-02T14:22:00Z',
    updatedAt: '2026-10-02T14:25:00Z'
  },
  research: {
    summary: 'Current academic benchmarks (SWE-bench, Stanford Agentic Systems Report) demonstrate that autonomous agentic loops combining reflection, terminal execution, and sub-agent verification achieve a 47.3% higher task completion rate than single-turn LLM generation. However, unverified claims asserting total replacement of human engineers are unsupported due to ambiguity in architectural planning, safety constraints, and domain heuristics.',
    keyFacts: [
      'SWE-bench Verified shows multi-step agent frameworks solve complex GitHub issues with ~65% success rate.',
      'The core loop consists of: Planning → Tool Calling (Bash/Grep/Edit) → Environmental Feedback → Self-Correction.',
      'Human-in-the-loop validation remains mandatory for security auditing, architectural coherence, and business logic.'
    ],
    sources: [
      {
        id: 'src-1',
        projectId: 'proj-ai-agents-2026',
        title: 'SWE-bench: Can Language Models Resolve Real-World GitHub Issues?',
        publisher: 'Princeton NLP & Stanford University',
        url: 'https://arxiv.org/abs/2310.06770',
        publicationDate: '2024-05-15',
        sourceType: 'Academic Paper',
        reliabilityStatus: 'VERIFIED',
        credibilityScore: 98,
        snippet: 'Evaluating LLMs on end-to-end software engineering tasks reveals that scaffolded agents with execution environments outperform raw prompt completion by a significant margin.',
        keyTakeaways: [
          'Environment interaction is essential for realistic bug resolution',
          'Single-shot LLMs fail on 86% of complex multi-file repo patches without iterative execution feedback'
        ]
      },
      {
        id: 'src-2',
        projectId: 'proj-ai-agents-2026',
        title: 'The State of AI Assisted Engineering & Developer Productivity 2025/2026',
        publisher: 'GitHub Octoverse & Microsoft Research',
        url: 'https://github.blog/research/ai-productivity-report',
        publicationDate: '2025-11-20',
        sourceType: 'Industry Report',
        reliabilityStatus: 'VERIFIED',
        credibilityScore: 94,
        snippet: 'Developers utilizing agentic workflows report a 55% reduction in repetitive debugging time, shifting focus toward system architecture and domain logic verification.',
        keyTakeaways: [
          'Developers retain primary oversight for architectural boundaries',
          'Productivity gains stem from automated context retrieval and tool execution'
        ]
      },
      {
        id: 'src-3',
        projectId: 'proj-ai-agents-2026',
        title: 'Autonomous Coding Agents: Complete Replacement of Traditional Developers?',
        publisher: 'TechHype Weekly Blog',
        url: 'https://techhype-weekly.example.com/ai-replace-coders',
        publicationDate: '2026-02-10',
        sourceType: 'Technical Article',
        reliabilityStatus: 'POTENTIALLY_UNSUPPORTED',
        credibilityScore: 38,
        snippet: 'Article claims that within 6 months, human engineers will not write a single line of code and engineering degrees will be obsolete.',
        keyTakeaways: [
          'Unsupported hyperbolic claims without peer-reviewed benchmarking',
          'Conflates prototype script generation with mission-critical distributed systems'
        ]
      }
    ],
    claims: [
      {
        id: 'claim-1',
        projectId: 'proj-ai-agents-2026',
        claimText: 'AI agents can completely replace human software engineers and eliminate the need for coding knowledge.',
        status: 'NEEDS_REVIEW',
        confidenceScore: 32,
        reason: 'The available peer-reviewed sources and industry data do not support complete replacement. Real repo engineering requires architectural decision-making, verification, and domain logic.',
        suggestedRewrite: 'AI agents automate repetitive coding, test execution, and debugging, allowing engineers to transition into higher-level architects and verifiers.',
        sourceAttribution: 'Princeton SWE-bench & GitHub Research 2025',
        isApplied: true
      },
      {
        id: 'claim-2',
        projectId: 'proj-ai-agents-2026',
        claimText: 'AI agents operate via an iterative feedback loop: Plan, Execute Tool, Observe Result, and Self-Correct.',
        status: 'VERIFIED',
        confidenceScore: 96,
        reason: 'Fully corroborated by Stanford Agentic Systems and Princeton NLP research.',
        suggestedRewrite: 'AI agents operate via an iterative feedback loop: Plan, Execute Tool, Observe Result, and Self-Correct.',
        sourceAttribution: 'Princeton NLP ArXiv:2310.06770',
        isApplied: false
      },
      {
        id: 'claim-3',
        projectId: 'proj-ai-agents-2026',
        claimText: 'Multi-agent verification reduces unhandled syntax and runtime errors by roughly 47%.',
        status: 'VERIFIED',
        confidenceScore: 91,
        reason: 'Supported by empirical benchmark results across multi-agent paired validation tests.',
        suggestedRewrite: 'Benchmark data shows scaffolded agent verification cuts common debugging errors by nearly half.',
        sourceAttribution: 'Stanford AI Systems Lab',
        isApplied: false
      }
    ]
  },
  script: {
    id: 'script-1',
    projectId: 'proj-ai-agents-2026',
    title: 'Why AI Agents Are Changing Software Development (45s Short)',
    totalWords: 118,
    estimatedDurationSeconds: 44,
    readingSpeedWpm: 160,
    sections: [
      {
        id: 'sec-1',
        type: 'HOOK',
        title: 'Hook (0 - 5s)',
        content: 'Stop thinking of AI as just a fancy autocomplete. In 2026, AI agents don’t just suggest code—they test, debug, and run it.',
        estimatedSeconds: 6,
        wordCount: 22,
        suggestedBrollPrompt: 'Fast-paced developer keyboard close-up with holographic glowing terminal errors turning green'
      },
      {
        id: 'sec-2',
        type: 'CONTEXT',
        title: 'Context & The Old Way (5 - 14s)',
        content: 'Traditional chatbots only guess the next word. But an AI agent has a feedback loop: it writes a file, executes it in a sandbox, reads the compiler error, and fixes its own mistake.',
        estimatedSeconds: 9,
        wordCount: 33,
        suggestedBrollPrompt: 'Split-screen comparison: Static ChatGPT prompt box vs Dynamic terminal loop with agent actions'
      },
      {
        id: 'sec-3',
        type: 'KEY_POINT_1',
        title: 'Key Pillar: The Reason-Act Loop (14 - 23s)',
        content: 'According to Princeton SWE-bench research, giving AI tools to run terminal commands increases bug resolution by over 40% compared to basic generation.',
        estimatedSeconds: 9,
        wordCount: 23,
        suggestedBrollPrompt: 'Animated 3D graphic showing SWE-bench verified benchmark graph spiking upward'
      },
      {
        id: 'sec-4',
        type: 'KEY_POINT_2',
        title: 'Key Pillar: The Creator & Engineer Role (23 - 33s)',
        content: 'Does this mean engineers are obsolete? Absolutely not. You stop writing boilerplate and start acting as the lead architect directing autonomous workers.',
        estimatedSeconds: 10,
        wordCount: 23,
        suggestedBrollPrompt: 'Modern software architect orchestrating nodes on a dark glass UI dashboard'
      },
      {
        id: 'sec-5',
        type: 'EXAMPLE',
        title: 'Real-World Implication (33 - 39s)',
        content: 'You define the system boundary, verify the security claims, and let the agents handle the plumbing.',
        estimatedSeconds: 6,
        wordCount: 16,
        suggestedBrollPrompt: 'Live code review screen showing AI pull request verified with high confidence badges'
      },
      {
        id: 'sec-6',
        type: 'CTA',
        title: 'Call to Action (39 - 44s)',
        content: 'Subscribe to ClipForge for research-backed AI insights that cut through the hype.',
        estimatedSeconds: 4,
        wordCount: 11,
        suggestedBrollPrompt: 'Sleek ClipForge branded animated subscribe watermark with red neon glow'
      }
    ]
  },
  voiceover: {
    voiceId: 'voice-1',
    speed: 1.05,
    pitch: 0,
    emotion: 'Authoritative',
    stability: 85,
    clarityBoost: 90,
    audioUrl: 'https://actions.google.com/sounds/v1/speech/tech_explainer.mp3',
    generatedDurationSeconds: 44.2
  },
  assets: MOCK_ASSETS,
  timeline: [
    {
      id: 'trk-vid-1',
      trackType: 'VIDEO',
      assetId: 'asset-1',
      title: 'Neural Coding Loop',
      startTime: 0,
      duration: 14,
      sourceStartTime: 0
    },
    {
      id: 'trk-vid-2',
      trackType: 'VIDEO',
      assetId: 'asset-4',
      title: 'Data Grid & Benchmarks',
      startTime: 14,
      duration: 12,
      sourceStartTime: 0
    },
    {
      id: 'trk-vid-3',
      trackType: 'VIDEO',
      assetId: 'asset-2',
      title: 'Architect Workflow',
      startTime: 26,
      duration: 18,
      sourceStartTime: 0
    },
    {
      id: 'trk-voice-1',
      trackType: 'VOICE',
      title: 'Marcus Vance Voiceover (AI Tech Master)',
      startTime: 0,
      duration: 44,
      volume: 100
    },
    {
      id: 'trk-audio-1',
      trackType: 'AUDIO',
      assetId: 'asset-5',
      title: 'Intro Sub Hit SFX',
      startTime: 0,
      duration: 3,
      volume: 75
    },
    {
      id: 'trk-audio-2',
      trackType: 'AUDIO',
      assetId: 'asset-6',
      title: 'Cyber Pulse BGM (Lo-fi)',
      startTime: 1,
      duration: 43,
      volume: 18
    },
    {
      id: 'trk-cap-1',
      trackType: 'CAPTIONS',
      title: 'Dynamic Pop Subtitles',
      startTime: 0,
      duration: 44,
      text: 'Dynamic Animated Words',
      style: {
        color: '#FFFFFF',
        backgroundColor: 'rgba(239, 68, 68, 0.85)',
        fontSize: 28,
        animation: 'pop'
      }
    },
    {
      id: 'trk-txt-1',
      trackType: 'TEXT',
      title: 'Headline Overlay',
      startTime: 0.5,
      duration: 5,
      text: 'AI AGENTS ≠ CHATBOTS',
      style: {
        color: '#EF4444',
        fontSize: 34,
        animation: 'glow'
      }
    }
  ],
  renderProgress: 0,
  analytics: {
    projectId: 'proj-ai-agents-2026',
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
      { second: 45, percentage: 65, industryAvg: 18 }
    ],
    hookStrengthScore: 93,
    informationDensityScore: 88,
    sourceCoveragePercentage: 96,
    aiContributionPercentage: 62,
    humanEditCount: 7,
    estimatedHoursSaved: 3.8,
    predictedViralityScore: 89
  }
};

export const MOCK_PROJECTS_LIST: Project[] = [
  INITIAL_DEMO_PROJECT,
  {
    id: 'proj-quantum-2026',
    userId: 'user-creator-1',
    title: 'Quantum Supremacy in 45 Seconds',
    description: 'Deconstructing what quantum qubits actually do without sci-fi hand-waving.',
    status: 'COMPLETED',
    platform: 'TikTok',
    duration: '45 sec',
    tone: 'Conversational',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
    createdAt: '2026-09-28T10:15:00Z',
    updatedAt: '2026-10-01T18:30:00Z',
    brief: {
      id: 'brief-quantum',
      projectId: 'proj-quantum-2026',
      title: 'Quantum Supremacy in 45 Seconds',
      topic: 'Quantum Computing vs Classical Supercomputers',
      uniqueAngle: 'Explain superposition and entanglement using spinning coins and correlated dice rather than matrix math.',
      whyThisAngle: 'Avoids intimidating mathematical physics jargon while preserving scientific accuracy.',
      targetAudience: 'Tech curious Gen-Z and TikTok science lovers',
      platform: 'TikTok',
      duration: '45 sec',
      tone: 'Conversational',
      language: 'English (US)',
      hookVariant: 'Quantum computers are NOT just faster laptops. They calculate in dimensions classical silicon physically cannot touch.',
      alternateHooks: [
        'Here is the exact reason Google and IBM spent billions on cryogenic quantum chips.',
        'If classical bits are a light switch, quantum qubits are a sphere of light.'
      ],
      keyPillars: [
        'Bits are 0 or 1. Qubits explore all states simultaneously via superposition.',
        'Entanglement lets entangled pairs share state faster than physical transmission.',
        'Useful for molecular simulation and cryptography, not playing Fortnite at 1000 FPS.'
      ],
      callToAction: 'Follow for real science breakdowns that make complex physics click.',
      createdAt: '2026-09-28T10:20:00Z',
      updatedAt: '2026-09-28T10:25:00Z'
    },
    research: {
      summary: 'Peer-reviewed Nature and Science publications confirm quantum computational advantage for specific synthetic sampling algorithms (e.g. random circuit sampling). Practical commercial fault-tolerant quantum error correction requires millions of physical qubits to generate hundreds of logical qubits.',
      keyFacts: [
        'Sycamore processor solved a sampling benchmark in 200 seconds that would take classical supercomputers millennia.',
        'Decoherence and thermal noise remain the primary engineering bottleneck.',
        'Post-quantum lattice cryptography is already being deployed by NIST.'
      ],
      sources: [
        {
          id: 'src-q1',
          projectId: 'proj-quantum-2026',
          title: 'Quantum Computational Advantage Using Superconducting Processors',
          publisher: 'Nature / Google Quantum AI',
          url: 'https://nature.com/articles/s41586-019-1666-5',
          publicationDate: '2024-01-10',
          sourceType: 'Academic Paper',
          reliabilityStatus: 'VERIFIED',
          credibilityScore: 99,
          snippet: 'Demonstrating programmable quantum processor execution scaling exponentially beyond classical simulation limits.',
          keyTakeaways: ['Experimental verification of quantum scaling laws']
        }
      ],
      claims: [
        {
          id: 'claim-q1',
          projectId: 'proj-quantum-2026',
          claimText: 'Quantum computers calculate by exploring all combinations simultaneously via superposition.',
          status: 'VERIFIED',
          confidenceScore: 98,
          reason: 'Corroborated by NIST and IBM Quantum research.',
          suggestedRewrite: 'Quantum computers calculate by exploring state spaces simultaneously via superposition and interference.',
          sourceAttribution: 'Nature s41586-019-1666-5',
          isApplied: true
        }
      ]
    },
    script: {
      id: 'script-q1',
      projectId: 'proj-quantum-2026',
      title: 'Quantum Supremacy in 45 Seconds',
      totalWords: 110,
      estimatedDurationSeconds: 42,
      readingSpeedWpm: 160,
      sections: [
        {
          id: 'sec-q1',
          type: 'HOOK',
          title: 'Hook (0 - 5s)',
          content: 'Quantum computers are NOT just faster laptops. They calculate in dimensions classical silicon cannot touch.',
          estimatedSeconds: 5,
          wordCount: 16,
          suggestedBrollPrompt: 'Cryogenic quantum dilution refrigerator glowing in neon blue'
        },
        {
          id: 'sec-q2',
          type: 'CONTEXT',
          title: 'Context (5 - 15s)',
          content: 'A normal computer stores data as 0 or 1. A qubit uses superposition to represent a blend of both at the same time.',
          estimatedSeconds: 9,
          wordCount: 24,
          suggestedBrollPrompt: 'Bloch sphere 3D holographic animation rotating smoothly'
        },
        {
          id: 'sec-q3',
          type: 'KEY_POINT_1',
          title: 'Key Point (15 - 28s)',
          content: 'When you link qubits with entanglement, calculating power multiplies exponentially, finding molecular formulas in seconds.',
          estimatedSeconds: 11,
          wordCount: 20,
          suggestedBrollPrompt: 'Molecular crystal lattice folding simulation in 4K'
        },
        {
          id: 'sec-q4',
          type: 'CTA',
          title: 'Outro (28 - 42s)',
          content: 'Follow ClipForge for science breakdowns that cut right through the hype.',
          estimatedSeconds: 5,
          wordCount: 11,
          suggestedBrollPrompt: 'ClipForge animated neon badge'
        }
      ]
    },
    voiceover: {
      voiceId: 'voice-3',
      speed: 1.1,
      pitch: 0,
      emotion: 'Energetic',
      stability: 80,
      clarityBoost: 95,
      audioUrl: 'https://actions.google.com/sounds/v1/speech/fast_short.mp3',
      generatedDurationSeconds: 42.0
    },
    assets: MOCK_ASSETS,
    timeline: [
      {
        id: 'trk-q-vid1',
        trackType: 'VIDEO',
        assetId: 'asset-4',
        title: 'Quantum Cyber Grid',
        startTime: 0,
        duration: 20
      },
      {
        id: 'trk-q-voice',
        trackType: 'VOICE',
        title: 'Kai Takahashi Voiceover',
        startTime: 0,
        duration: 42,
        volume: 100
      }
    ],
    renderProgress: 100,
    renderedVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1738-large.mp4',
    analytics: {
      projectId: 'proj-quantum-2026',
      retentionSimulation: [
        { second: 0, percentage: 100, industryAvg: 100 },
        { second: 10, percentage: 88, industryAvg: 55 },
        { second: 25, percentage: 78, industryAvg: 38 },
        { second: 45, percentage: 68, industryAvg: 22 }
      ],
      hookStrengthScore: 91,
      informationDensityScore: 94,
      sourceCoveragePercentage: 100,
      aiContributionPercentage: 55,
      humanEditCount: 12,
      estimatedHoursSaved: 4.5,
      predictedViralityScore: 92
    }
  },
  {
    id: 'proj-postgres-acid',
    userId: 'user-creator-1',
    title: 'How PostgreSQL Survives Power Loss (ACID Explained)',
    description: 'Explaining Write-Ahead Logging (WAL) and MVCC concurrency with database benchmark sources.',
    status: 'RESEARCHING',
    platform: 'YouTube Shorts',
    duration: '60 sec',
    tone: 'Educational',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80',
    createdAt: '2026-10-02T09:00:00Z',
    updatedAt: '2026-10-02T11:20:00Z',
    brief: {
      id: 'brief-pg',
      projectId: 'proj-postgres-acid',
      title: 'How PostgreSQL Survives Power Loss (ACID Explained)',
      topic: 'PostgreSQL WAL & MVCC Architecture',
      uniqueAngle: 'Focus on the physical mechanics of fsync() and Write-Ahead Logging rather than generic relational theory.',
      whyThisAngle: 'Engineers love knowing what happens at the disk and OS kernel layer when power suddenly cuts out.',
      targetAudience: 'Backend engineers, DevOps, and database architects',
      platform: 'YouTube Shorts',
      duration: '60 sec',
      tone: 'Educational',
      language: 'English (US)',
      hookVariant: 'If your database server loses power mid-transaction, why is your bank balance never corrupted?',
      alternateHooks: [
        'PostgreSQL doesn’t write your data to the table first. It does something far smarter.',
        'Here is the exact file that saves Postgres from total catastrophic data loss.'
      ],
      keyPillars: [
        'Write-Ahead Logging (WAL) ensures every change is appended to disk sequentially before table files are touched.',
        'Checkpointing flushes dirty pages in the background to keep recovery time bounded.',
        'MVCC creates row versions so readers never lock writers and writers never lock readers.'
      ],
      callToAction: 'Subscribe for deep-dive systems engineering breakdowns.',
      createdAt: '2026-10-02T09:05:00Z',
      updatedAt: '2026-10-02T09:10:00Z'
    },
    research: {
      summary: 'PostgreSQL relies on Write-Ahead Logging (WAL) to implement ACID durability (D). Before dirty data buffers are modified in main shared memory, the corresponding transaction log entries are flushed to synchronous NVMe storage using fsync(). On reboot after power failure, the engine replays REDO log records from the last valid checkpoint.',
      keyFacts: [
        'WAL writes sequentially to disk, providing orders-of-magnitude faster write throughput than random table page writes.',
        'MVCC eliminates read-write table lock contention through transaction snapshot visibility matrices.',
        'Fsync barrier guarantees persistence against OS buffer cache volatility.'
      ],
      sources: [
        {
          id: 'src-pg1',
          projectId: 'proj-postgres-acid',
          title: 'The Design and Implementation of the PostgreSQL Write-Ahead Log System',
          publisher: 'ACM SIGMOD / PostgreSQL Global Development Group',
          url: 'https://postgresql.org/docs/current/wal-intro.html',
          publicationDate: '2024-06-12',
          sourceType: 'Official Doc',
          reliabilityStatus: 'VERIFIED',
          credibilityScore: 99,
          snippet: 'Write-Ahead Logging ensures that no data page is written to disk until the WAL record describing the change has been flushed.',
          keyTakeaways: ['Guarantees atomicity and durability under unexpected crashes']
        }
      ],
      claims: [
        {
          id: 'claim-pg1',
          projectId: 'proj-postgres-acid',
          claimText: 'Postgres commits immediately update the table rows on your NVMe drive.',
          status: 'NEEDS_REVIEW',
          confidenceScore: 28,
          reason: 'Technically incorrect. Postgres writes to WAL sequentially first and updates table pages in RAM buffer cache, flushing them asynchronously during checkpoints.',
          suggestedRewrite: 'Postgres appends changes to a sequential Write-Ahead Log first, flushing actual table pages in the background.',
          sourceAttribution: 'PostgreSQL 17 Internals Architecture Guide',
          isApplied: true
        }
      ]
    },
    script: {
      id: 'script-pg1',
      projectId: 'proj-postgres-acid',
      title: 'How PostgreSQL Survives Power Loss',
      totalWords: 140,
      estimatedDurationSeconds: 52,
      readingSpeedWpm: 160,
      sections: [
        {
          id: 'sec-pg1',
          type: 'HOOK',
          title: 'Hook (0 - 5s)',
          content: 'If your server loses power in the middle of a transaction, why is your database never corrupted?',
          estimatedSeconds: 5,
          wordCount: 17,
          suggestedBrollPrompt: 'Data center server rack suddenly blinking with emergency red warning lights'
        },
        {
          id: 'sec-pg2',
          type: 'CONTEXT',
          title: 'Context (5 - 20s)',
          content: 'Most people think Postgres writes directly to table files. But writing randomly across a disk is slow and dangerous.',
          estimatedSeconds: 9,
          wordCount: 20,
          suggestedBrollPrompt: 'SSD memory architecture animation showing fragmented blocks'
        },
        {
          id: 'sec-pg3',
          type: 'KEY_POINT_1',
          title: 'Key Point: The WAL (20 - 45s)',
          content: 'Instead, it appends changes to a sequential file called the Write-Ahead Log. On crash recovery, it just replays the log.',
          estimatedSeconds: 10,
          wordCount: 22,
          suggestedBrollPrompt: 'Sequential stream of binary transaction logs verifying with green checkmarks'
        },
        {
          id: 'sec-pg4',
          type: 'CTA',
          title: 'Outro (45 - 55s)',
          content: 'Follow ClipForge for real database engineering breakdowns that level up your architecture.',
          estimatedSeconds: 5,
          wordCount: 13,
          suggestedBrollPrompt: 'Sleek dark mode database architect dashboard with glowing metrics'
        }
      ]
    },
    voiceover: {
      voiceId: 'voice-1',
      speed: 1.05,
      pitch: 0,
      emotion: 'Authoritative',
      stability: 90,
      clarityBoost: 90,
      audioUrl: 'https://actions.google.com/sounds/v1/speech/tech_explainer.mp3',
      generatedDurationSeconds: 52.0
    },
    assets: MOCK_ASSETS,
    timeline: [],
    renderProgress: 0
  },
  {
    id: 'proj-myth-10k-hours',
    userId: 'user-creator-1',
    title: 'The Myth of the 10,000 Hour Rule',
    description: 'Challenging Gladwell with Ericsson original deliberate practice research.',
    status: 'SCRIPT_READY',
    platform: 'Instagram Reels',
    duration: '30 sec',
    tone: 'Storytelling',
    thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
    createdAt: '2026-10-01T16:00:00Z',
    updatedAt: '2026-10-02T08:15:00Z',
    brief: {
      id: 'brief-10k',
      projectId: 'proj-myth-10k-hours',
      title: 'The Myth of the 10,000 Hour Rule',
      topic: 'Anders Ericsson Deliberate Practice vs Malcolm Gladwell 10,000 Hours',
      uniqueAngle: 'Explain why 10,000 hours of mindless repetition produces mediocrity while deliberate feedback loops produce mastery.',
      whyThisAngle: 'Challenges a widely held cultural myth with direct cognitive psychology literature.',
      targetAudience: 'High performers, knowledge workers, creators and students',
      platform: 'Instagram Reels',
      duration: '30 sec',
      tone: 'Storytelling',
      language: 'English (US)',
      hookVariant: 'Malcolm Gladwell lied to you about the 10,000 hour rule. Here is what the actual science proved.',
      alternateHooks: [
        'You can practice coding for 10,000 hours and still be a junior developer. Here is why.',
        'The scientist who discovered deliberate practice hated how pop culture distorted his research.'
      ],
      keyPillars: [
        '10,000 hours was merely an arbitrary average of Berlin violinists, not a magic threshold.',
        'Mindless repetition causes cognitive plateauing through automaticity.',
        'Deliberate practice requires immediate feedback, high mental strain, and targeted error correction.'
      ],
      callToAction: 'Follow for research-backed breakdown on human performance and AI.',
      createdAt: '2026-10-01T16:05:00Z',
      updatedAt: '2026-10-01T16:10:00Z'
    },
    research: {
      summary: 'K. Anders Ericsson’s seminal 1993 psychological review demonstrated that deliberate practice—characterized by well-defined tasks, immediate feedback, and repetition with error correction—determines expert performance, not aggregate time spent. Malcolm Gladwell popularized a simplified 10,000-hour figure that ignored individual variance and practice quality.',
      keyFacts: [
        'Ericsson explicitly rejected Gladwell’s 10,000-hour formulation in his book Peak.',
        'Deliberate practice requires operating outside comfort zones with real-time coaching or feedback.',
        'Without targeted feedback loops, automaticity halts cognitive growth.'
      ],
      sources: [
        {
          id: 'src-10k-1',
          projectId: 'proj-myth-10k-hours',
          title: 'The Role of Deliberate Practice in the Acquisition of Expert Performance',
          publisher: 'Psychological Review / APA',
          url: 'https://pubmed.ncbi.nlm.nih.gov/8415539/',
          publicationDate: '1993-07-01',
          sourceType: 'Academic Paper',
          reliabilityStatus: 'VERIFIED',
          credibilityScore: 99,
          snippet: 'Differences between expert performers and normal adults reflect a life-long period of deliberate effort to improve performance in a specific domain.',
          keyTakeaways: ['Quality of feedback loop outweighs raw chronological practice time']
        }
      ],
      claims: [
        {
          id: 'claim-10k-1',
          projectId: 'proj-myth-10k-hours',
          claimText: '10,000 hours of practice guarantees world-class mastery in any domain.',
          status: 'NEEDS_REVIEW',
          confidenceScore: 19,
          reason: 'Refuted by Anders Ericsson. 10,000 was an arbitrary group average in one specific domain and raw time without deliberate correction yields plateauing.',
          suggestedRewrite: 'Mastery requires deliberate practice with targeted feedback loops, not merely accumulating 10,000 mindless hours.',
          sourceAttribution: 'Ericsson et al., Psychological Review 1993',
          isApplied: true
        }
      ]
    },
    script: {
      id: 'script-10k',
      projectId: 'proj-myth-10k-hours',
      title: 'The Myth of the 10,000 Hour Rule',
      totalWords: 78,
      estimatedDurationSeconds: 29,
      readingSpeedWpm: 160,
      sections: [
        {
          id: 'sec-10k-1',
          type: 'HOOK',
          title: 'Hook (0 - 5s)',
          content: 'Malcolm Gladwell lied to you about the 10,000 hour rule. Here is what the science actually found.',
          estimatedSeconds: 5,
          wordCount: 17,
          suggestedBrollPrompt: 'Dramatic violin performance close-up transitioning into neurological brain scan'
        },
        {
          id: 'sec-10k-2',
          type: 'KEY_POINT_1',
          title: 'The Science (5 - 18s)',
          content: 'The researcher, Anders Ericsson, found that 10,000 hours of mindless repetition does not create masters—it creates plateaus.',
          estimatedSeconds: 8,
          wordCount: 18,
          suggestedBrollPrompt: 'Psychological study graphs showing rapid improvement curve vs flat plateau'
        },
        {
          id: 'sec-10k-3',
          type: 'CTA',
          title: 'Outro (18 - 29s)',
          content: 'True mastery requires deliberate practice: immediate feedback, discomfort, and relentless error correction. Follow for more research.',
          estimatedSeconds: 6,
          wordCount: 17,
          suggestedBrollPrompt: 'ClipForge red glowing verified badge and subscribe button'
        }
      ]
    },
    voiceover: {
      voiceId: 'voice-2',
      speed: 1.05,
      pitch: 0,
      emotion: 'Empathetic',
      stability: 85,
      clarityBoost: 90,
      audioUrl: 'https://actions.google.com/sounds/v1/speech/conversational_female.mp3',
      generatedDurationSeconds: 29.0
    },
    assets: MOCK_ASSETS,
    timeline: [],
    renderProgress: 0
  }
];

export const MOCK_TREND_SPARKS = [
  {
    topic: 'Cursor & Claude 3.7 Hybrid Workflows',
    growth: '+340%',
    platform: 'YouTube Shorts',
    suggestedHook: 'The real reason developers are abandoning standard IDEs in 2026.'
  },
  {
    topic: 'Postgres vs Vector Databases for RAG',
    growth: '+210%',
    platform: 'TikTok',
    suggestedHook: 'Why you probably don’t need a specialized vector DB for your AI app.'
  },
  {
    topic: 'Reasoning Models vs Chain of Thought',
    growth: '+185%',
    platform: 'Instagram Reels',
    suggestedHook: 'OpenAI o3 and DeepSeek R1 are not just bigger models—here is the math.'
  }
];

