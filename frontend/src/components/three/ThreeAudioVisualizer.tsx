import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeAudioVisualizerProps {
  isPlaying: boolean;
  frequencyData?: number[];
  color?: string;
  height?: number;
}

export const ThreeAudioVisualizer: React.FC<ThreeAudioVisualizerProps> = ({
  isPlaying,
  color = '#e11d48',
  height = 140,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    barsGroup: THREE.Group;
    orbMesh: THREE.Mesh;
    reqId: number;
    clock: THREE.Clock;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 300;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Center Pulsing Audio Core
    const orbGeo = new THREE.IcosahedronGeometry(0.8, 1);
    const orbMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const orbMesh = new THREE.Mesh(orbGeo, orbMat);
    scene.add(orbMesh);

    // 2. Circular 3D Spectrum Bars
    const barsGroup = new THREE.Group();
    const barCount = 32;
    const radius = 2.0;

    for (let i = 0; i < barCount; i++) {
      const angle = (i / barCount) * Math.PI * 2;
      const barGeo = new THREE.BoxGeometry(0.08, 0.6, 0.08);
      const barMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? new THREE.Color(color) : new THREE.Color(0x06b6d4),
        transparent: true,
        opacity: 0.7,
      });
      const barMesh = new THREE.Mesh(barGeo, barMat);
      barMesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      barMesh.rotation.z = angle - Math.PI / 2;
      barsGroup.add(barMesh);
    }
    scene.add(barsGroup);

    const clock = new THREE.Clock();
    threeRef.current = {
      renderer,
      scene,
      camera,
      barsGroup,
      orbMesh,
      reqId: 0,
      clock,
    };

    let reqId: number;
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (isPlaying) {
        orbMesh.rotation.x = elapsed * 1.2;
        orbMesh.rotation.y = elapsed * 1.5;
        const scale = 1 + Math.sin(elapsed * 8) * 0.25;
        orbMesh.scale.set(scale, scale, scale);

        barsGroup.rotation.z = elapsed * 0.4;
        barsGroup.children.forEach((bar, idx) => {
          const wave = Math.sin(elapsed * 10 + idx * 0.4) * 0.8 + 1.0;
          bar.scale.set(1, wave, 1);
        });
      } else {
        orbMesh.rotation.x = elapsed * 0.2;
        orbMesh.rotation.y = elapsed * 0.2;
        orbMesh.scale.set(1, 1, 1);
        barsGroup.children.forEach((bar) => {
          bar.scale.set(1, 0.4, 1);
        });
      }

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container || !threeRef.current) return;
      const w = container.clientWidth || 300;
      threeRef.current.camera.aspect = w / height;
      threeRef.current.camera.updateProjectionMatrix();
      threeRef.current.renderer.setSize(w, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color, height, isPlaying]);

  return (
    <div
      ref={mountRef}
      className="w-full flex items-center justify-center overflow-hidden rounded-xl bg-black/40 border border-forge-800"
      style={{ height: `${height}px` }}
    />
  );
};
