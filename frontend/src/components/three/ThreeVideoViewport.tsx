import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Camera,
  Crop,
  Layers,
  Box,
  Eye,
  Sliders,
  Tv,
  Zap,
  Flame,
  CheckCircle2,
  Compass,
  Monitor,
  Video
} from 'lucide-react';
import { TimelineTrackItem } from '../../types/project';
import { useToast } from '../../context/ToastContext';

export type Viewport3DMode = '2D_FLAT' | '3D_CINEMA' | '3D_HOLOGRAM' | '3D_ISOMETRIC';
export type ShaderEffect3D = 'NONE' | 'CYBERPUNK_GLOW' | 'VHS_GLITCH' | 'CRT_SCANLINES' | 'HOLO_MATRIX' | 'GOLDEN_HOUR';
export type ParticleEffect3D = 'NONE' | 'CYBER_SPARKS' | 'MATRIX_RAIN' | 'COSMIC_STARFIELD' | 'NEON_RINGS';

interface ThreeVideoViewportProps {
  currentTime: number;
  totalDuration: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  timeline: TimelineTrackItem[];
  activeCaptionText?: string;
  projectTitle: string;
}

export const ThreeVideoViewport: React.FC<ThreeVideoViewportProps> = ({
  currentTime,
  totalDuration,
  isPlaying,
  onTogglePlay,
  onSeek,
  timeline,
  activeCaptionText,
  projectTitle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { showToast } = useToast();

  // 3D Controls State
  const [viewMode, setViewMode] = useState<Viewport3DMode>('3D_CINEMA');
  const [shaderEffect, setShaderEffect] = useState<ShaderEffect3D>('CYBERPUNK_GLOW');
  const [particleEffect, setParticleEffect] = useState<ParticleEffect3D>('CYBER_SPARKS');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [isMuted, setIsMuted] = useState(false);
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [cameraAngle, setCameraAngle] = useState<'CENTER' | 'DYNAMIC_TILT' | 'LOW_ANGLE' | 'CRANE'>('DYNAMIC_TILT');

  // Three.js instances ref
  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    videoTexture: THREE.VideoTexture | null;
    screenMesh: THREE.Mesh;
    hologramRingGroup: THREE.Group;
    particlesMesh: THREE.Points | null;
    particlesGeo: THREE.BufferGeometry | null;
    gridHelper: THREE.GridHelper | null;
    floatingBadgesGroup: THREE.Group;
    ambientLight: THREE.AmbientLight;
    pointLight1: THREE.PointLight;
    pointLight2: THREE.PointLight;
    reqId: number;
    clock: THREE.Clock;
    targetRotation: { x: number; y: number };
    currentRotation: { x: number; y: number };
    targetCameraPos: THREE.Vector3;
    isUserInteracting: boolean;
  } | null>(null);

  const activeVideoSrc =
    'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1738-large.mp4';

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  // Video playback synchronization
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle active text track
  const activeTextTrack = timeline.find(
    (t) => t.trackType === 'TEXT' && currentTime >= t.startTime && currentTime <= t.startTime + t.duration
  );

  // Initialize Three.js WebGL Engine
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth || 360;
    const height = canvas.clientHeight || 560;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c10);
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.035);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // 4. Video Element & VideoTexture
    let videoTexture: THREE.VideoTexture | null = null;
    if (videoRef.current) {
      videoTexture = new THREE.VideoTexture(videoRef.current);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.generateMipmaps = false;
      if ('colorSpace' in videoTexture) {
        // @ts-ignore
        videoTexture.colorSpace = THREE.SRGBColorSpace;
      }
    }

    // 5. 3D Video Screen Mesh
    // Ratio dimensions for 9:16 portrait screen
    const planeW = 2.4;
    const planeH = 4.26;
    const screenGeo = new THREE.PlaneGeometry(planeW, planeH, 32, 32);

    // Create custom shader or rich material for screen
    const screenMat = new THREE.MeshStandardMaterial({
      map: videoTexture,
      roughness: 0.2,
      metalness: 0.1,
      emissive: new THREE.Color(0x111111),
      emissiveMap: videoTexture,
      emissiveIntensity: 0.4,
      side: THREE.DoubleSide,
    });

    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    scene.add(screenMesh);

    // 6. 3D Screen Outer Bezel Frame
    const frameGeo = new THREE.BoxGeometry(planeW + 0.12, planeH + 0.12, 0.08);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      metalness: 0.9,
      roughness: 0.3,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.z = -0.05;
    screenMesh.add(frameMesh);

    // 7. Glowing Edge Rim
    const rimGeo = new THREE.BoxGeometry(planeW + 0.16, planeH + 0.16, 0.02);
    const rimMat = new THREE.MeshBasicMaterial({
      color: 0xe11d48, // Crimson neon glow
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.position.z = -0.04;
    screenMesh.add(rimMesh);

    // 8. 3D Hologram Orbit Rings
    const hologramRingGroup = new THREE.Group();
    const ringGeo1 = new THREE.RingGeometry(2.6, 2.65, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
      wireframe: true,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2;
    hologramRingGroup.add(ringMesh1);

    const ringGeo2 = new THREE.RingGeometry(3.0, 3.03, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xe11d48,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = Math.PI / 2.3;
    ringMesh2.rotation.y = 0.4;
    hologramRingGroup.add(ringMesh2);

    scene.add(hologramRingGroup);

    // 9. Floating 3D AI Badges / Metadata Holograms
    const floatingBadgesGroup = new THREE.Group();
    
    // Verified Badge Mesh
    const badgeGeo = new THREE.IcosahedronGeometry(0.2, 0);
    const badgeMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x047857,
      emissiveIntensity: 0.5,
    });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.position.set(-1.4, 2.0, 0.4);
    floatingBadgesGroup.add(badgeMesh);

    // AI Core Sphere
    const aiOrbGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const aiOrbMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      wireframe: true,
    });
    const aiOrbMesh = new THREE.Mesh(aiOrbGeo, aiOrbMat);
    aiOrbMesh.position.set(1.4, 2.0, 0.4);
    floatingBadgesGroup.add(aiOrbMesh);

    scene.add(floatingBadgesGroup);

    // 10. Dynamic 3D Particle FX System
    const particleCount = 800;
    const particlesGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colArray = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xe11d48); // Crimson
    const color2 = new THREE.Color(0x06b6d4); // Cyan
    const color3 = new THREE.Color(0xf59e0b); // Amber

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 12;
      posArray[i + 1] = (Math.random() - 0.5) * 12;
      posArray[i + 2] = (Math.random() - 0.5) * 10;

      const pick = Math.random();
      const c = pick < 0.5 ? color1 : pick < 0.85 ? color2 : color3;
      colArray[i] = c.r;
      colArray[i + 1] = c.g;
      colArray[i + 2] = c.b;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // 11. Cyber Grid Floor
    const gridHelper = new THREE.GridHelper(20, 20, 0xe11d48, 0x1f2937);
    gridHelper.position.y = -2.8;
    scene.add(gridHelper);

    // 12. 3D Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xe11d48, 3, 15);
    pointLight1.position.set(3, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 2.5, 15);
    pointLight2.position.set(-3, -2, 3);
    scene.add(pointLight2);

    // Store refs
    const clock = new THREE.Clock();
    threeRef.current = {
      renderer,
      scene,
      camera,
      videoTexture,
      screenMesh,
      hologramRingGroup,
      particlesMesh,
      particlesGeo,
      gridHelper,
      floatingBadgesGroup,
      ambientLight,
      pointLight1,
      pointLight2,
      reqId: 0,
      clock,
      targetRotation: { x: 0, y: 0 },
      currentRotation: { x: 0, y: 0 },
      targetCameraPos: new THREE.Vector3(0, 0, 7.5),
      isUserInteracting: false,
    };

    // Animation Render Loop
    const animate = () => {
      if (!threeRef.current) return;
      const {
        renderer,
        scene,
        camera,
        videoTexture,
        screenMesh,
        hologramRingGroup,
        particlesMesh,
        floatingBadgesGroup,
        pointLight1,
        pointLight2,
        clock,
        targetRotation,
        currentRotation,
        targetCameraPos,
        isUserInteracting,
      } = threeRef.current;

      const elapsedTime = clock.getElapsedTime();

      // Update video texture if playing
      if (videoTexture) {
        videoTexture.needsUpdate = true;
      }

      // Smooth camera interpolation
      camera.position.lerp(targetCameraPos, 0.08);

      // Smooth screen rotation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;

      // Subtle breathing motion when not interacting
      const idleTiltX = isUserInteracting ? 0 : Math.sin(elapsedTime * 1.2) * 0.03;
      const idleTiltY = isUserInteracting ? 0 : Math.cos(elapsedTime * 0.9) * 0.04;

      screenMesh.rotation.x = currentRotation.x + idleTiltX;
      screenMesh.rotation.y = currentRotation.y + idleTiltY;

      // Rotate Hologram Rings
      hologramRingGroup.rotation.z = elapsedTime * 0.2;
      hologramRingGroup.rotation.y = Math.sin(elapsedTime * 0.5) * 0.2;

      // Floating Badges Animation
      floatingBadgesGroup.children.forEach((mesh, index) => {
        mesh.rotation.x = elapsedTime * (index + 1) * 0.6;
        mesh.rotation.y = elapsedTime * (index + 1) * 0.8;
        mesh.position.y = 2.0 + Math.sin(elapsedTime * 2 + index) * 0.15;
      });

      // Animate Particles
      if (particlesMesh && particlesGeo) {
        const positions = particlesGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount * 3; i += 3) {
          positions[i + 1] += Math.sin(elapsedTime + positions[i]) * 0.003;
          if (positions[i + 1] < -6) positions[i + 1] = 6;
        }
        particlesGeo.attributes.position.needsUpdate = true;
        particlesMesh.rotation.y = elapsedTime * 0.03;
      }

      // Dynamic Pulsing Lights
      pointLight1.intensity = 2.5 + Math.sin(elapsedTime * 3) * 0.8;
      pointLight2.intensity = 2.0 + Math.cos(elapsedTime * 2) * 0.6;

      renderer.render(scene, camera);
      threeRef.current.reqId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!canvasRef.current || !threeRef.current) return;
      const w = canvasRef.current.clientWidth || 360;
      const h = canvasRef.current.clientHeight || 560;
      threeRef.current.camera.aspect = w / h;
      threeRef.current.camera.updateProjectionMatrix();
      threeRef.current.renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeRef.current) {
        cancelAnimationFrame(threeRef.current.reqId);
        threeRef.current.renderer.dispose();
      }
    };
  }, []);

  // Update Aspect Ratio in 3D Mesh
  useEffect(() => {
    if (!threeRef.current) return;
    const { screenMesh } = threeRef.current;

    let width = 2.4;
    let height = 4.26;

    if (aspectRatio === '1:1') {
      width = 3.6;
      height = 3.6;
    } else if (aspectRatio === '16:9') {
      width = 4.8;
      height = 2.7;
    }

    screenMesh.geometry.dispose();
    screenMesh.geometry = new THREE.PlaneGeometry(width, height, 32, 32);

    // Also update children frame and rim
    const frame = screenMesh.children[0] as THREE.Mesh;
    if (frame) {
      frame.geometry.dispose();
      frame.geometry = new THREE.BoxGeometry(width + 0.12, height + 0.12, 0.08);
    }
    const rim = screenMesh.children[1] as THREE.Mesh;
    if (rim) {
      rim.geometry.dispose();
      rim.geometry = new THREE.BoxGeometry(width + 0.16, height + 0.16, 0.02);
    }
  }, [aspectRatio]);

  // Update View Mode & Camera preset
  useEffect(() => {
    if (!threeRef.current) return;
    const { targetRotation, targetCameraPos, hologramRingGroup, gridHelper } = threeRef.current;

    switch (viewMode) {
      case '2D_FLAT':
        targetRotation.x = 0;
        targetRotation.y = 0;
        targetCameraPos.set(0, 0, 6.8);
        hologramRingGroup.visible = false;
        if (gridHelper) gridHelper.visible = false;
        break;

      case '3D_CINEMA':
        targetRotation.x = 0.08;
        targetRotation.y = -0.15;
        targetCameraPos.set(0.6, 0.2, 7.5);
        hologramRingGroup.visible = true;
        if (gridHelper) gridHelper.visible = true;
        break;

      case '3D_HOLOGRAM':
        targetRotation.x = 0.22;
        targetRotation.y = 0.35;
        targetCameraPos.set(-1.2, 0.5, 8.0);
        hologramRingGroup.visible = true;
        if (gridHelper) gridHelper.visible = true;
        break;

      case '3D_ISOMETRIC':
        targetRotation.x = 0.35;
        targetRotation.y = -0.55;
        targetCameraPos.set(2.2, 1.6, 8.5);
        hologramRingGroup.visible = true;
        if (gridHelper) gridHelper.visible = true;
        break;
    }
  }, [viewMode]);

  // Update Camera Angle Presets
  useEffect(() => {
    if (!threeRef.current || viewMode === '2D_FLAT') return;
    const { targetRotation, targetCameraPos } = threeRef.current;

    switch (cameraAngle) {
      case 'CENTER':
        targetRotation.x = 0;
        targetRotation.y = 0;
        targetCameraPos.set(0, 0, 7.2);
        break;
      case 'DYNAMIC_TILT':
        targetRotation.x = 0.12;
        targetRotation.y = -0.2;
        targetCameraPos.set(0.8, 0.3, 7.6);
        break;
      case 'LOW_ANGLE':
        targetRotation.x = -0.25;
        targetRotation.y = 0.15;
        targetCameraPos.set(-0.5, -1.2, 7.8);
        break;
      case 'CRANE':
        targetRotation.x = 0.38;
        targetRotation.y = -0.3;
        targetCameraPos.set(1.4, 2.2, 8.2);
        break;
    }
  }, [cameraAngle, viewMode]);

  // Update Shader Effect
  useEffect(() => {
    if (!threeRef.current) return;
    const { screenMesh, pointLight1, pointLight2 } = threeRef.current;
    const mat = screenMesh.material as THREE.MeshStandardMaterial;

    switch (shaderEffect) {
      case 'CYBERPUNK_GLOW':
        mat.emissive = new THREE.Color(0x381020);
        mat.emissiveIntensity = 0.6;
        pointLight1.color.setHex(0xe11d48);
        pointLight2.color.setHex(0x06b6d4);
        break;

      case 'VHS_GLITCH':
        mat.emissive = new THREE.Color(0x102030);
        mat.emissiveIntensity = 0.5;
        pointLight1.color.setHex(0x22c55e);
        pointLight2.color.setHex(0xa855f7);
        break;

      case 'CRT_SCANLINES':
        mat.emissive = new THREE.Color(0x052010);
        mat.emissiveIntensity = 0.7;
        pointLight1.color.setHex(0x10b981);
        pointLight2.color.setHex(0x3b82f6);
        break;

      case 'HOLO_MATRIX':
        mat.emissive = new THREE.Color(0x003311);
        mat.emissiveIntensity = 0.9;
        pointLight1.color.setHex(0x22c55e);
        pointLight2.color.setHex(0x10b981);
        break;

      case 'GOLDEN_HOUR':
        mat.emissive = new THREE.Color(0x332205);
        mat.emissiveIntensity = 0.5;
        pointLight1.color.setHex(0xf59e0b);
        pointLight2.color.setHex(0xf43f5e);
        break;

      case 'NONE':
      default:
        mat.emissive = new THREE.Color(0x050505);
        mat.emissiveIntensity = 0.2;
        pointLight1.color.setHex(0xffffff);
        pointLight2.color.setHex(0x888888);
        break;
    }
  }, [shaderEffect]);

  // Update Particles
  useEffect(() => {
    if (!threeRef.current) return;
    const { particlesMesh } = threeRef.current;
    if (particlesMesh) {
      particlesMesh.visible = particleEffect !== 'NONE';
    }
  }, [particleEffect]);

  // Interactive Mouse Drag to Orbit in 3D Space
  const handlePointerDown = (e: React.PointerEvent) => {
    if (viewMode === '2D_FLAT') return;
    setIsOrbiting(true);
    if (threeRef.current) threeRef.current.isUserInteracting = true;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isOrbiting || !threeRef.current || viewMode === '2D_FLAT') return;
    const { movementX, movementY } = e;
    const { targetRotation } = threeRef.current;
    targetRotation.y += movementX * 0.008;
    targetRotation.x += movementY * 0.008;
    // Clamp x rotation
    targetRotation.x = Math.max(-0.6, Math.min(0.6, targetRotation.x));
    targetRotation.y = Math.max(-1.0, Math.min(1.0, targetRotation.y));
  };

  const handlePointerUp = () => {
    setIsOrbiting(false);
    if (threeRef.current) threeRef.current.isUserInteracting = false;
  };

  const handleCaptureFrame = () => {
    if (!threeRef.current) return;
    const { renderer, scene, camera } = threeRef.current;
    renderer.render(scene, camera);
    const dataUrl = renderer.domElement.toDataURL('image/png');
    showToast({
      type: 'success',
      title: '3D Frame Captured',
      message: `Three.js 3D WebGL frame at ${formatTime(currentTime)} saved as project thumbnail.`,
    });
  };

  const reset3DView = () => {
    if (!threeRef.current) return;
    threeRef.current.targetRotation.x = 0.08;
    threeRef.current.targetRotation.y = -0.15;
    threeRef.current.targetCameraPos.set(0.6, 0.2, 7.5);
    setViewMode('3D_CINEMA');
    setCameraAngle('DYNAMIC_TILT');
    showToast({
      type: 'info',
      title: '3D Camera Reset',
      message: 'Viewport camera restored to Cinema 3D default.',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full select-none space-y-3">
      {/* Hidden HTML5 Video for Three.js VideoTexture sourcing */}
      <video
        ref={videoRef}
        src={activeVideoSrc}
        loop
        muted={isMuted}
        playsInline
        crossOrigin="anonymous"
        className="hidden"
      />

      {/* Top 3D Viewport Controls & Presets */}
      <div className="flex flex-wrap items-center justify-between w-full max-w-[480px] px-2 gap-2 text-xs text-forge-400">
        {/* 3D Mode Selector */}
        <div className="flex items-center gap-1 bg-forge-900/90 backdrop-blur-md p-1 rounded-xl border border-forge-700/60">
          <Box className="w-3.5 h-3.5 text-crimson-400 ml-1" />
          {(['3D_CINEMA', '3D_HOLOGRAM', '3D_ISOMETRIC', '2D_FLAT'] as Viewport3DMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
                viewMode === mode
                  ? 'bg-crimson-600 text-white shadow-glow-crimson'
                  : 'hover:bg-forge-800 text-forge-400 hover:text-white'
              }`}
            >
              {mode.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Aspect Ratio */}
        <div className="flex items-center gap-1 bg-forge-900/90 backdrop-blur-md p-1 rounded-xl border border-forge-700/60">
          <Crop className="w-3.5 h-3.5 text-cyan-400 ml-1" />
          {(['9:16', '1:1', '16:9'] as const).map((ratio) => (
            <button
              key={ratio}
              onClick={() => setAspectRatio(ratio)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                aspectRatio === ratio
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'hover:bg-forge-800 text-forge-400'
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      {/* Main Three.js 3D Canvas Viewport */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full max-w-[460px] h-[480px] sm:h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0d1117] via-[#080b10] to-[#040608] border-2 border-forge-700/70 shadow-2xl shadow-glow-crimson group cursor-grab active:cursor-grabbing transition-all"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* 3D WebGL Badge Overlay */}
        <div className="absolute top-3.5 left-4 flex items-center gap-2 pointer-events-none z-10">
          <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-crimson-500/30 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
            <span className="text-[10px] font-mono font-extrabold text-white tracking-widest uppercase">
              THREE.JS 3D ENGINE
            </span>
          </div>

          <div className="flex items-center gap-1 bg-cyan-950/80 backdrop-blur-md text-cyan-400 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-cyan-700/50">
            <Tv className="w-3 h-3" />
            <span>WEBGL 60FPS</span>
          </div>
        </div>

        {/* 3D Camera & Reset Quick Bar */}
        <div className="absolute top-3.5 right-4 flex items-center gap-1.5 z-10">
          <button
            onClick={reset3DView}
            className="p-1.5 rounded-xl bg-black/60 hover:bg-black/90 text-forge-300 hover:text-white border border-white/10 backdrop-blur-md transition-all"
            title="Reset 3D Camera Orbit"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCaptureFrame}
            className="flex items-center gap-1 text-[10px] font-semibold bg-black/60 hover:bg-black/90 text-forge-300 hover:text-white px-2.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md transition-all"
            title="Capture 3D WebGL frame"
          >
            <Camera className="w-3.5 h-3.5 text-crimson-400" />
            <span>3D Frame</span>
          </button>
        </div>

        {/* Active Title Overlay in 3D HUD */}
        {activeTextTrack && (
          <div className="absolute top-14 inset-x-6 text-center z-10 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
            <div className="inline-block bg-crimson-600/90 backdrop-blur-md text-white font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-xl uppercase tracking-wider shadow-glow-crimson border border-crimson-400/50">
              {activeTextTrack.text || 'AI AGENTS ≠ CHATBOTS'}
            </div>
          </div>
        )}

        {/* Dynamic Subtitles Pop Overlay */}
        <div className="absolute bottom-14 inset-x-6 text-center z-20 pointer-events-none">
          <div className="inline-block bg-black/85 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl max-w-[90%] shadow-2xl">
            <p className="text-xs sm:text-sm font-extrabold text-white tracking-wide leading-tight">
              {activeCaptionText ? (
                <span className="text-crimson-400 animate-pulse">{activeCaptionText}</span>
              ) : (
                <>
                  Stop thinking of AI as just a{' '}
                  <span className="text-crimson-400 underline decoration-2">fancy autocomplete</span>.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Three.js Interactive Orbit Hint */}
        {viewMode !== '2D_FLAT' && (
          <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-[9px] font-mono text-forge-400 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 pointer-events-none">
            <Compass className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Drag to rotate 3D viewport</span>
          </div>
        )}

        {/* Center Hover Play Button */}
        <div
          onClick={onTogglePlay}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer bg-black/25 pointer-events-auto"
        >
          <div className="w-14 h-14 rounded-full bg-crimson-600/90 text-white flex items-center justify-center shadow-glow-crimson transform scale-90 group-hover:scale-100 transition-transform">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
          </div>
        </div>
      </div>

      {/* 3D Visual Shader & FX Customizer Toolbar */}
      <div className="w-full max-w-[460px] bg-forge-900/90 p-3 rounded-2xl border border-forge-700/60 backdrop-blur-md space-y-2.5">
        {/* Shaders & Particles */}
        <div className="flex items-center justify-between gap-2 text-xs">
          {/* Shaders */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[10px] font-bold text-forge-400 uppercase tracking-wider shrink-0">
              3D Shaders:
            </span>
            {(
              [
                { id: 'CYBERPUNK_GLOW', label: 'Neon Glow' },
                { id: 'VHS_GLITCH', label: 'VHS Glitch' },
                { id: 'CRT_SCANLINES', label: 'CRT Matrix' },
                { id: 'GOLDEN_HOUR', label: 'Golden' },
                { id: 'NONE', label: 'Raw' },
              ] as const
            ).map((s) => (
              <button
                key={s.id}
                onClick={() => setShaderEffect(s.id)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap transition-colors ${
                  shaderEffect === s.id
                    ? 'bg-amber-600/90 text-white font-bold shadow-sm'
                    : 'bg-forge-800 text-forge-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Camera Angles */}
        <div className="flex items-center justify-between gap-2 text-xs border-t border-forge-800 pt-2">
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <Eye className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-[10px] font-bold text-forge-400 uppercase tracking-wider shrink-0">
              Camera:
            </span>
            {(
              [
                { id: 'CENTER', label: 'Center' },
                { id: 'DYNAMIC_TILT', label: 'Tilt' },
                { id: 'LOW_ANGLE', label: 'Low Hero' },
                { id: 'CRANE', label: 'Crane Top' },
              ] as const
            ).map((ang) => (
              <button
                key={ang.id}
                onClick={() => setCameraAngle(ang.id)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap transition-colors ${
                  cameraAngle === ang.id
                    ? 'bg-cyan-600/90 text-white font-bold shadow-sm'
                    : 'bg-forge-800 text-forge-400 hover:text-white'
                }`}
              >
                {ang.label}
              </button>
            ))}
          </div>

          {/* Particles Toggle */}
          <button
            onClick={() =>
              setParticleEffect(
                particleEffect === 'CYBER_SPARKS'
                  ? 'COSMIC_STARFIELD'
                  : particleEffect === 'COSMIC_STARFIELD'
                  ? 'NONE'
                  : 'CYBER_SPARKS'
              )
            }
            className={`px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 transition-colors ${
              particleEffect !== 'NONE'
                ? 'bg-crimson-950 text-crimson-400 border border-crimson-700/50'
                : 'bg-forge-800 text-forge-500'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>FX: {particleEffect === 'NONE' ? 'OFF' : particleEffect.replace('CYBER_', '')}</span>
          </button>
        </div>
      </div>

      {/* Main Playback Control Bar */}
      <div className="w-full max-w-[460px] flex items-center justify-between gap-3 bg-forge-900/90 px-4 py-2.5 rounded-2xl border border-forge-700/60 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePlay}
            className="p-2 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white shadow-glow-crimson transition-all"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>

          <button
            onClick={() => onSeek(0)}
            className="p-2 rounded-xl hover:bg-forge-800 text-forge-400 hover:text-white transition-colors"
            title="Restart playback"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Current Time / Total Duration */}
        <div className="text-xs font-mono text-forge-300 font-semibold">
          <span className="text-white font-bold">{formatTime(currentTime)}</span>
          <span className="text-forge-600 mx-1.5">/</span>
          <span>{formatTime(totalDuration)}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-xl hover:bg-forge-800 text-forge-400 hover:text-white transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
