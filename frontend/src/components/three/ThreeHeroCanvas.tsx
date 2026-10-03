import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06070a, 0.045);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 9);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Central 3D Cyber Core (Icosahedron with wireframe + inner glowing sphere)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(2.8, 0.5, 0);

    const icosaGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const icosaMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0xbe123c,
      emissiveIntensity: 0.8,
    });
    const icosaMesh = new THREE.Mesh(icosaGeo, icosaMat);
    coreGroup.add(icosaMesh);

    // Inner glowing core
    const innerGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Outer Orbiting Hologram Rings
    const ringGroup = new THREE.Group();
    for (let r = 0; r < 3; r++) {
      const ringGeo = new THREE.TorusGeometry(2.6 + r * 0.5, 0.02, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: r === 0 ? 0x06b6d4 : r === 1 ? 0xe11d48 : 0xf59e0b,
        transparent: true,
        opacity: 0.6,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / (2 + r);
      ring.rotation.y = (r * Math.PI) / 4;
      ringGroup.add(ring);
    }
    coreGroup.add(ringGroup);

    // Orbiting AI Nodes
    const nodeGroup = new THREE.Group();
    for (let n = 0; n < 8; n++) {
      const nodeGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x0891b2,
        emissiveIntensity: 0.9,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (n / 8) * Math.PI * 2;
      const radius = 3.2;
      nodeMesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.4, Math.sin(angle) * radius);
      nodeGroup.add(nodeMesh);
    }
    coreGroup.add(nodeGroup);

    scene.add(coreGroup);

    // 2. Interactive 3D Particle Swarm
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cCrimson = new THREE.Color(0xe11d48);
    const cCyan = new THREE.Color(0x06b6d4);
    const cAmber = new THREE.Color(0xf59e0b);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 22;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 12;

      const pick = Math.random();
      const col = pick < 0.5 ? cCrimson : pick < 0.8 ? cCyan : cAmber;
      colors[i] = col.r;
      colors[i + 1] = col.g;
      colors[i + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // 3. Cyber Grid Terrain
    const gridGeo = new THREE.PlaneGeometry(30, 30, 40, 40);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI / 2.4;
    gridMesh.position.y = -3.5;
    scene.add(gridMesh);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xe11d48, 5, 20);
    pointLight1.position.set(3, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 4, 20);
    pointLight2.position.set(-4, -2, 3);
    scene.add(pointLight2);

    // Mouse Interaction Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      targetMouseY = -(((e.clientY - rect.top) / height) * 2 - 1);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Render loop
    const clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Parallax camera
      camera.position.x = mouseX * 1.5;
      camera.position.y = mouseY * 1.0;
      camera.lookAt(0, 0, 0);

      // Core rotation
      icosaMesh.rotation.x = elapsedTime * 0.3;
      icosaMesh.rotation.y = elapsedTime * 0.4;
      innerMesh.rotation.x = -elapsedTime * 0.4;
      innerMesh.rotation.z = elapsedTime * 0.2;

      ringGroup.rotation.z = elapsedTime * 0.15;
      ringGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.3;

      nodeGroup.rotation.y = elapsedTime * 0.5;

      // Breathing scale
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.05;
      coreGroup.scale.set(scale, scale, scale);

      // Particle motion
      particlePoints.rotation.y = elapsedTime * 0.03;
      particlePoints.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;

      // Grid wave
      const pos = gridGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length; i += 3) {
        const u = pos[i];
        const v = pos[i + 1];
        pos[i + 2] = Math.sin(u * 0.5 + elapsedTime * 1.5) * Math.cos(v * 0.5 + elapsedTime * 1.5) * 0.4;
      }
      gridGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 700;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
};
