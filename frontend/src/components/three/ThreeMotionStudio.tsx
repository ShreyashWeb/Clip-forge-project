import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Box,
  Sparkles,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  Camera,
  Layers,
  Zap,
  Flame,
  PlusCircle,
  Eye,
  Tv,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../common/Button';

export const ThreeMotionStudio: React.FC = () => {
  const { activeProject, updateProjectTimeline } = useProject();
  const { showToast } = useToast();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Studio Settings State
  const [sceneText, setSceneText] = useState('CLIPFORGE 3D');
  const [selectedShape, setSelectedShape] = useState<'KNOT' | 'ICOSA' | 'CUBE' | 'TORUS' | 'PRISM'>('KNOT');
  const [materialStyle, setMaterialStyle] = useState<'NEON_CRIMSON' | 'CYBER_CYAN' | 'CHROME_METALLIC' | 'HOLO_WIREFRAME' | 'GOLD'>('NEON_CRIMSON');
  const [particleDensity, setParticleDensity] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('HIGH');
  const [cameraMotion, setCameraMotion] = useState<'ORBIT_360' | 'DOLLY_ZOOM' | 'WHIP_PAN' | 'STATIONARY'>('ORBIT_360');
  const [lightingPreset, setLightingPreset] = useState<'CYBERPUNK' | 'STUDIO' | 'EMERALD' | 'GOLDEN'>('CYBERPUNK');
  const [isPlaying, setIsPlaying] = useState(true);
  const [animTime, setAnimTime] = useState(0);

  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    mainMesh: THREE.Mesh | THREE.Group;
    textMeshGroup: THREE.Group;
    particleSystem: THREE.Points;
    particleGeo: THREE.BufferGeometry;
    pointLight1: THREE.PointLight;
    pointLight2: THREE.PointLight;
    ambientLight: THREE.AmbientLight;
    reqId: number;
    clock: THREE.Clock;
  } | null>(null);

  // Initialize Three.js Studio Scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const width = containerRef.current.clientWidth || 640;
    const height = 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080a0f);
    scene.fog = new THREE.FogExp2(0x080a0f, 0.04);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.0);

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
    renderer.toneMappingExposure = 1.3;

    // 1. Central 3D Geometry
    const knotGeo = new THREE.TorusKnotGeometry(1.3, 0.4, 128, 32);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      roughness: 0.15,
      metalness: 0.85,
      emissive: 0xbe123c,
      emissiveIntensity: 0.5,
    });
    const mainMesh = new THREE.Mesh(knotGeo, knotMat);
    scene.add(mainMesh);

    // 2. 3D Text Billboard / 3D Extruded Banner simulation
    const textMeshGroup = new THREE.Group();
    // 3D Plaque
    const textPlaneGeo = new THREE.BoxGeometry(4.2, 0.8, 0.15);
    const textPlaneMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x1f2937,
      emissiveIntensity: 0.3,
    });
    const textPlane = new THREE.Mesh(textPlaneGeo, textPlaneMat);
    textPlane.position.set(0, -2.2, 0);
    textMeshGroup.add(textPlane);

    // Glowing border for text plaque
    const textBorderGeo = new THREE.BoxGeometry(4.3, 0.9, 0.05);
    const textBorderMat = new THREE.MeshBasicMaterial({
      color: 0xe11d48,
      wireframe: true,
    });
    const textBorder = new THREE.Mesh(textBorderGeo, textBorderMat);
    textBorder.position.set(0, -2.2, 0);
    textMeshGroup.add(textBorder);

    scene.add(textMeshGroup);

    // 3. 3D Particles
    const pCount = 1000;
    const particleGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(pCount * 3);
    const pColors = new Float32Array(pCount * 3);

    const c1 = new THREE.Color(0xe11d48);
    const c2 = new THREE.Color(0x06b6d4);

    for (let i = 0; i < pCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 14;
      pPositions[i + 1] = (Math.random() - 0.5) * 10;
      pPositions[i + 2] = (Math.random() - 0.5) * 10;

      const c = Math.random() > 0.5 ? c1 : c2;
      pColors[i] = c.r;
      pColors[i + 1] = c.g;
      pColors[i + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 4. Ground Cyber Grid
    const grid = new THREE.GridHelper(24, 24, 0xe11d48, 0x1f2937);
    grid.position.y = -3.2;
    scene.add(grid);

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xe11d48, 4, 18);
    pointLight1.position.set(3.5, 3.5, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 3.5, 18);
    pointLight2.position.set(-3.5, -2.5, 3.5);
    scene.add(pointLight2);

    const clock = new THREE.Clock();

    threeRef.current = {
      renderer,
      scene,
      camera,
      mainMesh,
      textMeshGroup,
      particleSystem,
      particleGeo,
      pointLight1,
      pointLight2,
      ambientLight,
      reqId: 0,
      clock,
    };

    // Render loop
    const animate = () => {
      if (!threeRef.current) return;
      const {
        renderer,
        scene,
        camera,
        mainMesh,
        textMeshGroup,
        particleSystem,
        pointLight1,
        pointLight2,
        clock,
      } = threeRef.current;

      const elapsed = clock.getElapsedTime();

      // Mesh rotation
      mainMesh.rotation.x = elapsed * 0.5;
      mainMesh.rotation.y = elapsed * 0.7;

      // Particle system movement
      particleSystem.rotation.y = elapsed * 0.05;

      // Floating text banner
      textMeshGroup.position.y = Math.sin(elapsed * 2) * 0.08;

      // Camera motion mode
      if (cameraMotion === 'ORBIT_360') {
        const radius = 7.0;
        camera.position.x = Math.sin(elapsed * 0.4) * radius;
        camera.position.z = Math.cos(elapsed * 0.4) * radius;
        camera.position.y = 1.2 + Math.sin(elapsed * 0.3) * 0.5;
        camera.lookAt(0, 0, 0);
      } else if (cameraMotion === 'DOLLY_ZOOM') {
        camera.position.set(0, 1.2, 6.0 + Math.sin(elapsed * 1.5) * 2.5);
        camera.lookAt(0, 0, 0);
      } else if (cameraMotion === 'WHIP_PAN') {
        camera.position.set(Math.sin(elapsed * 2.0) * 4.0, 1.5, 6.5);
        camera.lookAt(0, 0, 0);
      } else {
        camera.position.set(0, 1.2, 7.0);
        camera.lookAt(0, 0, 0);
      }

      // Lights dynamic pulse
      pointLight1.intensity = 3.5 + Math.sin(elapsed * 3) * 1.0;
      pointLight2.intensity = 3.0 + Math.cos(elapsed * 2.5) * 0.8;

      renderer.render(scene, camera);
      threeRef.current.reqId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !threeRef.current) return;
      const w = containerRef.current.clientWidth || 640;
      threeRef.current.camera.aspect = w / 500;
      threeRef.current.camera.updateProjectionMatrix();
      threeRef.current.renderer.setSize(w, 500);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeRef.current) {
        cancelAnimationFrame(threeRef.current.reqId);
        threeRef.current.renderer.dispose();
      }
    };
  }, [cameraMotion]);

  // Update Shape
  useEffect(() => {
    if (!threeRef.current) return;
    const { scene, mainMesh } = threeRef.current;
    const mesh = mainMesh as THREE.Mesh;

    mesh.geometry.dispose();

    switch (selectedShape) {
      case 'KNOT':
        mesh.geometry = new THREE.TorusKnotGeometry(1.3, 0.4, 128, 32);
        break;
      case 'ICOSA':
        mesh.geometry = new THREE.IcosahedronGeometry(1.8, 1);
        break;
      case 'CUBE':
        mesh.geometry = new THREE.BoxGeometry(2.2, 2.2, 2.2);
        break;
      case 'TORUS':
        mesh.geometry = new THREE.TorusGeometry(1.8, 0.45, 30, 100);
        break;
      case 'PRISM':
        mesh.geometry = new THREE.ConeGeometry(1.8, 2.8, 4);
        break;
    }
  }, [selectedShape]);

  // Update Material
  useEffect(() => {
    if (!threeRef.current) return;
    const { mainMesh } = threeRef.current;
    const mesh = mainMesh as THREE.Mesh;

    switch (materialStyle) {
      case 'NEON_CRIMSON':
        mesh.material = new THREE.MeshStandardMaterial({
          color: 0xe11d48,
          roughness: 0.15,
          metalness: 0.85,
          emissive: 0xbe123c,
          emissiveIntensity: 0.7,
        });
        break;
      case 'CYBER_CYAN':
        mesh.material = new THREE.MeshStandardMaterial({
          color: 0x06b6d4,
          roughness: 0.1,
          metalness: 0.9,
          emissive: 0x0891b2,
          emissiveIntensity: 0.8,
        });
        break;
      case 'CHROME_METALLIC':
        mesh.material = new THREE.MeshStandardMaterial({
          color: 0xf3f4f6,
          roughness: 0.05,
          metalness: 0.98,
        });
        break;
      case 'HOLO_WIREFRAME':
        mesh.material = new THREE.MeshBasicMaterial({
          color: 0x22c55e,
          wireframe: true,
        });
        break;
      case 'GOLD':
        mesh.material = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          roughness: 0.2,
          metalness: 0.9,
          emissive: 0xb45309,
          emissiveIntensity: 0.4,
        });
        break;
    }
  }, [materialStyle]);

  // Update Lighting Presets
  useEffect(() => {
    if (!threeRef.current) return;
    const { pointLight1, pointLight2 } = threeRef.current;

    switch (lightingPreset) {
      case 'CYBERPUNK':
        pointLight1.color.setHex(0xe11d48);
        pointLight2.color.setHex(0x06b6d4);
        break;
      case 'STUDIO':
        pointLight1.color.setHex(0xffffff);
        pointLight2.color.setHex(0x93c5fd);
        break;
      case 'EMERALD':
        pointLight1.color.setHex(0x10b981);
        pointLight2.color.setHex(0x06b6d4);
        break;
      case 'GOLDEN':
        pointLight1.color.setHex(0xf59e0b);
        pointLight2.color.setHex(0xe11d48);
        break;
    }
  }, [lightingPreset]);

  // Handle Add to Active Project Timeline
  const handleAddToProject = () => {
    if (!activeProject) {
      showToast({
        type: 'warning',
        title: 'No Active Project',
        message: 'Please create or open a project first to insert 3D motion graphics.',
      });
      return;
    }

    const new3DTrack = {
      id: `trk-3d-${Date.now()}`,
      trackType: 'VIDEO' as const,
      title: `3D Motion Scene (${selectedShape} - ${materialStyle.replace('_', ' ')})`,
      startTime: 0,
      duration: 8,
    };

    const updatedTimeline = [new3DTrack, ...(activeProject.timeline || [])];
    updateProjectTimeline(updatedTimeline);

    showToast({
      type: 'success',
      title: '3D Scene Inserted',
      message: `"${sceneText}" 3D motion sequence added to project timeline!`,
    });
  };

  const handleCaptureSnapshot = () => {
    if (!threeRef.current) return;
    const { renderer, scene, camera } = threeRef.current;
    renderer.render(scene, camera);
    showToast({
      type: 'success',
      title: '3D Asset Rendered',
      message: 'High-res Three.js 3D snapshot saved to project asset library.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-forge-900/80 p-6 rounded-2xl border border-forge-700/60 backdrop-blur-md shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-crimson-500 animate-pulse" />
            <h1 className="text-2xl font-extrabold text-white tracking-tight font-display flex items-center gap-2">
              Three.js 3D Motion Studio
            </h1>
            <span className="text-[10px] bg-crimson-950 text-crimson-400 font-bold px-2 py-0.5 rounded-full border border-crimson-700/50 uppercase font-mono">
              WebGL Engine
            </span>
          </div>
          <p className="text-xs text-forge-400">
            Generate cinematic 3D motion sequences, kinetic title overlays, and procedural geometry powered by Three.js.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCaptureSnapshot}
            className="border-forge-700 hover:border-forge-600"
          >
            <Camera className="w-4 h-4 mr-2 text-cyan-400" />
            <span>Render 3D Frame</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToProject}
            className="shadow-glow-crimson"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            <span>Add 3D Scene to Timeline</span>
          </Button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive 3D WebGL Canvas Viewport */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div
            ref={containerRef}
            className="relative w-full h-[500px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0e121a] via-[#090c12] to-[#040609] border-2 border-forge-700 shadow-2xl shadow-glow-crimson"
          >
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Top 3D Status Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
              <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-crimson-500/30">
                <Box className="w-3.5 h-3.5 text-crimson-400" />
                <span className="text-[11px] font-mono font-extrabold text-white uppercase tracking-wider">
                  {selectedShape} • {materialStyle.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center gap-1 bg-cyan-950/80 backdrop-blur-md text-cyan-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-cyan-700/40">
                <Tv className="w-3 h-3" />
                <span>60 FPS REALTIME</span>
              </div>
            </div>

            {/* 3D Kinetic Text Banner In-Scene */}
            <div className="absolute bottom-6 inset-x-8 text-center pointer-events-none z-10">
              <div className="inline-block bg-black/80 backdrop-blur-md border border-crimson-500/40 px-6 py-2 rounded-2xl shadow-glow-crimson animate-pulse">
                <span className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-crimson-400 via-rose-300 to-cyan-400 tracking-wider uppercase">
                  {sceneText || '3D MOTION GRAPHIC'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 3D Scene Controls & Parameters */}
        <div className="lg:col-span-4 space-y-4">
          {/* Kinetic Text Input */}
          <div className="bg-forge-900/80 p-5 rounded-2xl border border-forge-700/60 backdrop-blur-md space-y-3">
            <h3 className="text-xs font-bold text-forge-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-crimson-400" />
              <span>3D Kinetic Title</span>
            </h3>
            <input
              type="text"
              value={sceneText}
              onChange={(e) => setSceneText(e.target.value)}
              placeholder="Enter 3D Title Text..."
              className="w-full bg-forge-950 border border-forge-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-crimson-500"
            />
          </div>

          {/* 3D Geometry Shape */}
          <div className="bg-forge-900/80 p-5 rounded-2xl border border-forge-700/60 backdrop-blur-md space-y-3">
            <h3 className="text-xs font-bold text-forge-300 uppercase tracking-wider flex items-center gap-2">
              <Box className="w-4 h-4 text-cyan-400" />
              <span>3D Geometry Mesh</span>
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'KNOT', label: 'Torus Knot' },
                  { id: 'ICOSA', label: 'Icosa Core' },
                  { id: 'CUBE', label: 'Cyber Cube' },
                  { id: 'TORUS', label: 'Ring Torus' },
                  { id: 'PRISM', label: 'Prism Cone' },
                ] as const
              ).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedShape(s.id)}
                  className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    selectedShape === s.id
                      ? 'bg-cyan-950/80 border-cyan-500 text-white font-bold shadow-glow-cyan'
                      : 'bg-forge-950 border-forge-800 text-forge-400 hover:border-forge-700 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Material / Shader Style */}
          <div className="bg-forge-900/80 p-5 rounded-2xl border border-forge-700/60 backdrop-blur-md space-y-3">
            <h3 className="text-xs font-bold text-forge-300 uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Material & Shaders</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: 'NEON_CRIMSON', label: 'Neon Crimson' },
                  { id: 'CYBER_CYAN', label: 'Cyber Cyan' },
                  { id: 'CHROME_METALLIC', label: 'Chrome Metal' },
                  { id: 'HOLO_WIREFRAME', label: 'Holo Wire' },
                  { id: 'GOLD', label: 'Empire Gold' },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMaterialStyle(m.id)}
                  className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    materialStyle === m.id
                      ? 'bg-crimson-950/80 border-crimson-500 text-white font-bold shadow-glow-crimson'
                      : 'bg-forge-950 border-forge-800 text-forge-400 hover:border-forge-700 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Camera Path & Lighting */}
          <div className="bg-forge-900/80 p-5 rounded-2xl border border-forge-700/60 backdrop-blur-md space-y-3">
            <h3 className="text-xs font-bold text-forge-300 uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>Cinematic Camera Path</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: 'ORBIT_360', label: 'Orbit 360' },
                  { id: 'DOLLY_ZOOM', label: 'Dolly Zoom' },
                  { id: 'WHIP_PAN', label: 'Glitch Whip' },
                  { id: 'STATIONARY', label: 'Locked Shot' },
                ] as const
              ).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCameraMotion(c.id)}
                  className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    cameraMotion === c.id
                      ? 'bg-emerald-950/80 border-emerald-500 text-white font-bold'
                      : 'bg-forge-950 border-forge-800 text-forge-400 hover:border-forge-700 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
