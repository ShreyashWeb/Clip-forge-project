import { ProjectBrief, ResearchSource, ClaimVerification, ScriptSection, MediaAsset } from '../types/project';
import { MOCK_ASSETS } from './mockData';

export interface AngleSuggestion {
  id: string;
  title: string;
  description: string;
  rationale: string;
  targetAudience: string;
  recommendedHook: string;
}

export interface AIService {
  generateAngles(topic: string): Promise<AngleSuggestion[]>;
  generateBrief(params: {
    topic: string;
    angle: string;
    audience: string;
    platform: string;
    duration: string;
    tone: string;
    cta?: string;
  }): Promise<ProjectBrief>;
  fetchResearch(topic: string, angle: string): Promise<{
    summary: string;
    keyFacts: string[];
    sources: ResearchSource[];
    claims: ClaimVerification[];
  }>;
  generateScript(brief: ProjectBrief, researchSummary?: string): Promise<{
    sections: ScriptSection[];
    totalWords: number;
    estimatedDurationSeconds: number;
  }>;
  rewriteSection(section: ScriptSection, prompt: string, tone: string): Promise<{
    rewrittenContent: string;
    explanation: string;
  }>;
  factCheck(claim: string): Promise<{
    status: 'VERIFIED' | 'NEEDS_REVIEW' | 'POTENTIALLY_UNSUPPORTED';
    confidence: number;
    reason: string;
    suggestedRewrite: string;
  }>;
  suggestBroll(scriptText: string): Promise<MediaAsset[]>;
  generatePlatformMetadata(projectTitle: string, angle: string): Promise<{
    youtubeShorts: { title: string; tags: string[]; description: string };
    instagramReels: { caption: string; hashtags: string[] };
    tiktok: { caption: string; soundRecommendation: string; hashtags: string[] };
  }>;
}

// Mock Implementation for ultra-fast, zero-key, reliable hackathon demo
class MockAIServiceImpl implements AIService {
  async generateAngles(topic: string): Promise<AngleSuggestion[]> {
    await new Promise(r => setTimeout(r, 600));
    return [
      {
        id: 'angle-1',
        title: `Deconstruct the Technical Reality vs Marketing Hype of ${topic}`,
        description: 'Expose what is actually happening under the hood versus what hype accounts claim.',
        rationale: 'High audience retention because it dispels confusion and builds authoritative credibility.',
        targetAudience: 'Software engineers, tech practitioners & curious builders',
        recommendedHook: `Stop listening to tech influencers about ${topic}. Here is what is actually in the code.`
      },
      {
        id: 'angle-2',
        title: `Explain ${topic} in 45 Seconds to a 5th Grader`,
        description: 'Use a vivid, everyday real-world physical metaphor to make complex concepts intuitive.',
        rationale: 'Maximum shareability and broad viral appeal on TikTok & Instagram Reels.',
        targetAudience: 'General tech enthusiasts, students, and non-technical founders',
        recommendedHook: `If you think ${topic} is complicated, this 30-second kitchen metaphor will fix that forever.`
      },
      {
        id: 'angle-3',
        title: `The 3 Costly Mistakes Everyone Makes with ${topic}`,
        description: 'Highlight anti-patterns, security pitfalls, or wrong assumptions people make right now.',
        rationale: 'Strong loss-aversion psychology that hooks viewers in the first 2 seconds.',
        targetAudience: 'Early-career professionals and indie hackers',
        recommendedHook: `Here are 3 fatal mistakes people make with ${topic}—and why number 2 ruins performance.`
      },
      {
        id: 'angle-4',
        title: `The Future Paradigm Shift: Where ${topic} Goes in 2027`,
        description: 'Analyze the emerging research and architectural breakthroughs coming in the next 18 months.',
        rationale: 'Positions the creator as an ahead-of-the-curve visionary with peer-reviewed backing.',
        targetAudience: 'Senior architects, CTOs, and tech investors',
        recommendedHook: `The architecture of ${topic} is completely flipping next year. Here is the paper nobody is reading.`
      }
    ];
  }

  async generateBrief(params: {
    topic: string;
    angle: string;
    audience: string;
    platform: string;
    duration: string;
    tone: string;
    cta?: string;
  }): Promise<ProjectBrief> {
    await new Promise(r => setTimeout(r, 800));
    return {
      id: 'brief-' + Date.now(),
      projectId: 'proj-' + Date.now(),
      title: `${params.topic}: ${params.angle.slice(0, 45)}...`,
      topic: params.topic,
      uniqueAngle: params.angle,
      whyThisAngle: `Focusing on "${params.angle}" prevents generic regurgitation and aligns with the ${params.tone.toLowerCase()} tone requested for ${params.platform}.`,
      targetAudience: params.audience || 'Tech-curious creators and builders',
      platform: params.platform as any,
      duration: params.duration as any,
      tone: params.tone as any,
      language: 'English (US)',
      hookVariant: `Stop scrolling if you care about ${params.topic}. This 40-second breakdown changes everything you thought you knew.`,
      alternateHooks: [
        `Here is the single biggest misconception about ${params.topic}.`,
        `Why 95% of people misunderstand ${params.topic} in 2026.`
      ],
      keyPillars: [
        `Core mechanism: How ${params.topic} actually operates in production.`,
        `Empirical data: Why research-backed architecture outperforms naive implementations.`,
        `Creator insight: The human-in-the-loop control layer that keeps systems secure.`
      ],
      callToAction: params.cta || 'Save this video and follow ClipForge for research-backed AI production.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  async fetchResearch(topic: string, angle: string): Promise<{
    summary: string;
    keyFacts: string[];
    sources: ResearchSource[];
    claims: ClaimVerification[];
  }> {
    await new Promise(r => setTimeout(r, 1000));
    return {
      summary: `Research indicates that while interest in ${topic} has grown exponentially (+140% YoY in academic papers and production deployments), over 60% of consumer-facing claims fail rigorous verification. Utilizing a structured angle like "${angle}" provides a high-credibility narrative grounded in verifiable engineering benchmarks.`,
      keyFacts: [
        `Empirical tests show that iterative feedback loops improve error recovery by 47.3% over single-turn generation.`,
        `Leading research from Stanford NLP and MIT CSAIL emphasizes human architectural oversight as the primary reliability factor.`,
        `Production systems with multi-agent validation exhibit 3x fewer regression bugs than unsupervised prompts.`
      ],
      sources: [
        {
          id: 'src-' + Date.now() + '-1',
          projectId: 'proj-active',
          title: `Empirical Benchmarks & Frameworks for ${topic}`,
          publisher: 'Stanford AI & Systems Lab',
          url: 'https://arxiv.org/abs/2403.00001',
          publicationDate: '2025-08-14',
          sourceType: 'Academic Paper',
          reliabilityStatus: 'VERIFIED',
          credibilityScore: 97,
          snippet: 'Rigorous benchmark results demonstrating significant reliability improvements when execution feedback is coupled with domain constraints.',
          keyTakeaways: [
            'Iterative tool-use outperforms static completion models',
            'Context window saturation reduces accuracy if not pruned intelligently'
          ]
        },
        {
          id: 'src-' + Date.now() + '-2',
          projectId: 'proj-active',
          title: `State of Enterprise Engineering & Architecture 2026`,
          publisher: 'IEEE Computer Society & ACM',
          url: 'https://ieee.org/publications/enterprise-ai-2026',
          publicationDate: '2026-01-20',
          sourceType: 'Industry Report',
          reliabilityStatus: 'VERIFIED',
          credibilityScore: 93,
          snippet: 'Survey of over 1,200 engineering leaders reveals that hybrid human-AI workflows reduce delivery cycles by 52% while maintaining code quality.',
          keyTakeaways: [
            'Architects spend more time reviewing specs and less time typing boilerplate',
            'Safety gates are critical for production deployments'
          ]
        },
        {
          id: 'src-' + Date.now() + '-3',
          projectId: 'proj-active',
          title: `Why ${topic} Will Instantly Replace Everyone Without Human Oversight`,
          publisher: 'TechHype Clickbait Blog',
          url: 'https://viraltechblog.example.com/replace-all-humans',
          publicationDate: '2026-02-12',
          sourceType: 'Technical Article',
          reliabilityStatus: 'POTENTIALLY_UNSUPPORTED',
          credibilityScore: 35,
          snippet: 'Sensationalist blog post asserting autonomous software will eliminate all human engineers in 60 days.',
          keyTakeaways: [
            'Lacks empirical benchmarking',
            'Overlooks regulatory, safety, and architectural verification requirements'
          ]
        }
      ],
      claims: [
        {
          id: 'claim-gen-1',
          projectId: 'proj-active',
          claimText: `${topic} can completely operate in mission-critical environments with zero human supervision.`,
          status: 'NEEDS_REVIEW',
          confidenceScore: 38,
          reason: 'Peer-reviewed studies indicate unsupervised operations in complex codebases produce hallucinations in up to 34% of edge cases.',
          suggestedRewrite: `${topic} accelerates implementation and debugging, but human engineers remain essential for security gates and architectural boundaries.`,
          sourceAttribution: 'Stanford AI Systems Lab & IEEE 2026',
          isApplied: false
        },
        {
          id: 'claim-gen-2',
          projectId: 'proj-active',
          claimText: `Scaffolded feedback loops increase task resolution by over 40% compared to basic generation.`,
          status: 'VERIFIED',
          confidenceScore: 95,
          reason: 'Corroborated across SWE-bench Verified and Princeton NLP findings.',
          suggestedRewrite: `Scaffolded feedback loops increase task resolution by over 40% compared to basic generation.`,
          sourceAttribution: 'Princeton SWE-bench Verified',
          isApplied: false
        }
      ]
    };
  }

  async generateScript(brief: ProjectBrief, researchSummary?: string): Promise<{
    sections: ScriptSection[];
    totalWords: number;
    estimatedDurationSeconds: number;
  }> {
    await new Promise(r => setTimeout(r, 900));
    const sections: ScriptSection[] = [
      {
        id: 'sec-hook',
        type: 'HOOK',
        title: 'Hook (0 - 5s)',
        content: brief.hookVariant || `Stop scrolling if you want to understand what's really happening with ${brief.topic}.`,
        estimatedSeconds: 5,
        wordCount: 18,
        suggestedBrollPrompt: `Cinematic high-contrast close-up of tech dashboard with glowing red accents and data streams`
      },
      {
        id: 'sec-context',
        type: 'CONTEXT',
        title: 'Context & The Flaw (5 - 14s)',
        content: `Most people assume ${brief.topic} is just an incremental upgrade. But research shows the real shift is in the autonomous execution loop.`,
        estimatedSeconds: 9,
        wordCount: 24,
        suggestedBrollPrompt: `Split-screen visual showing traditional static code vs active agentic terminal execution`
      },
      {
        id: 'sec-kp1',
        type: 'KEY_POINT_1',
        title: 'Key Pillar: The Core Mechanism (14 - 24s)',
        content: brief.keyPillars?.[0] || `Instead of predicting static tokens, modern systems plan, execute tools, read compiler errors, and iterate.`,
        estimatedSeconds: 10,
        wordCount: 22,
        suggestedBrollPrompt: `3D node network graph connecting plan, tool execution, and self-correction loop`
      },
      {
        id: 'sec-kp2',
        type: 'KEY_POINT_2',
        title: 'Key Pillar: The Human Advantage (24 - 33s)',
        content: brief.keyPillars?.[2] || `Stanford research confirms: developers don’t disappear—they become system architects directing autonomous workers.`,
        estimatedSeconds: 9,
        wordCount: 20,
        suggestedBrollPrompt: `High-tech creator studio with developer reviewing AI pull requests and verified badges`
      },
      {
        id: 'sec-example',
        type: 'EXAMPLE',
        title: 'Real-World Proof (33 - 39s)',
        content: `You set the high-level architecture and security constraints; the AI executes the repetitive plumbing in parallel.`,
        estimatedSeconds: 6,
        wordCount: 16,
        suggestedBrollPrompt: `Modern IDE showing real-time code generation with instant green test passes`
      },
      {
        id: 'sec-cta',
        type: 'CTA',
        title: 'Call to Action (39 - 44s)',
        content: brief.callToAction || 'Follow ClipForge for research-backed AI engineering breakdowns.',
        estimatedSeconds: 5,
        wordCount: 10,
        suggestedBrollPrompt: `ClipForge brand badge with animated subscribe button and red rim light`
      }
    ];

    const totalWords = sections.reduce((acc, s) => acc + s.wordCount, 0);
    const estimatedDurationSeconds = Math.round((totalWords / 160) * 60);

    return {
      sections,
      totalWords,
      estimatedDurationSeconds
    };
  }

  async rewriteSection(section: ScriptSection, prompt: string, tone: string): Promise<{
    rewrittenContent: string;
    explanation: string;
  }> {
    await new Promise(r => setTimeout(r, 700));
    let rewritten = section.content;
    let explanation = `Refined with ${prompt} in ${tone} tone.`;

    if (prompt.toLowerCase().includes('shorter')) {
      rewritten = section.content.split('. ').slice(0, 1).join('. ') + '.';
      explanation = 'Trimmed fluff words and tightened pacing for high-velocity short format.';
    } else if (prompt.toLowerCase().includes('conversational')) {
      rewritten = `Look, here is the wild part: ${section.content.charAt(0).toLowerCase() + section.content.slice(1)}`;
      explanation = 'Added conversational cadence and direct creator-to-viewer address.';
    } else if (prompt.toLowerCase().includes('hook')) {
      rewritten = `You're thinking about ${section.content.slice(0, 20)} completely wrong. In 2026, everything changed.`;
      explanation = 'Injected pattern interrupt and curiosity gap into opening 3 seconds.';
    } else if (prompt.toLowerCase().includes('simplify')) {
      rewritten = `Think of it like a chef with automated prep cooks: you design the recipe, and they chop the vegetables with zero mistakes.`;
      explanation = 'Replaced jargon with a visceral everyday analogy.';
    } else {
      rewritten = `${section.content} Specifically, verified data shows this saves 4+ hours per sprint.`;
      explanation = 'Enhanced clarity and backed with empirical framing.';
    }

    return {
      rewrittenContent: rewritten,
      explanation
    };
  }

  async factCheck(claim: string): Promise<{
    status: 'VERIFIED' | 'NEEDS_REVIEW' | 'POTENTIALLY_UNSUPPORTED';
    confidence: number;
    reason: string;
    suggestedRewrite: string;
  }> {
    await new Promise(r => setTimeout(r, 800));
    const isOverhyped = claim.toLowerCase().includes('replace all') || claim.toLowerCase().includes('zero human') || claim.toLowerCase().includes('obsolete');
    if (isOverhyped) {
      return {
        status: 'NEEDS_REVIEW',
        confidence: 42,
        reason: 'Empirical research does not support absolute claims. Human architectural oversight is consistently required in production benchmarks.',
        suggestedRewrite: claim.replace(/replace all/gi, 'automate repetitive tasks for').replace(/obsolete/gi, 'evolved')
      };
    }
    return {
      status: 'VERIFIED',
      confidence: 94,
      reason: 'Cross-checked against Stanford and Princeton software benchmark repositories.',
      suggestedRewrite: claim
    };
  }

  async suggestBroll(scriptText: string): Promise<MediaAsset[]> {
    await new Promise(r => setTimeout(r, 600));
    return MOCK_ASSETS.map(asset => ({
      ...asset,
      semanticMatchScore: Math.floor(78 + Math.random() * 18),
      scriptSentenceMatch: scriptText.slice(0, 60) + '...'
    }));
  }

  async generatePlatformMetadata(projectTitle: string, angle: string) {
    await new Promise(r => setTimeout(r, 500));
    return {
      youtubeShorts: {
        title: `${projectTitle} #Shorts #Tech #AI`,
        tags: ['AI Agents', 'Software Engineering', 'Coding', 'Tech Trends 2026', 'Programming'],
        description: `Research-backed short breakdown on ${projectTitle}.\n\nAngle: ${angle}\nCreated with ClipForge AI (Human-in-the-loop production).`
      },
      instagramReels: {
        caption: `Stop building AI chatbots. In 2026, autonomous agentic loops are changing how software gets engineered. 🚀\n\nFull research breakdown in the reel. Drop a comment with your thoughts! 👇`,
        hashtags: ['#aiagents', '#softwareengineering', '#codinglife', '#techtrends', '#clipforge']
      },
      tiktok: {
        caption: `Why AI agents are not just autocomplete in 2026 🤯 #coding #developer #ai #tech #learnontiktok`,
        soundRecommendation: 'Cyber Pulse Lofi Tech Bed (Original ClipForge)',
        hashtags: ['#coding', '#developer', '#aiagents', '#technology', '#software']
      }
    };
  }
}

export const aiService: AIService = new MockAIServiceImpl();
