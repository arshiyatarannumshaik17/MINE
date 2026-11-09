"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CharacterConcept, UniverseId } from "@/lib/types";
import { Sparkles, Quote } from "lucide-react";

interface Avatar3DViewerProps {
  character: CharacterConcept;
  themeColor: string;
  accentColor: string;
  universeId?: UniverseId;
}

export default function Avatar3DViewer({
  character,
  themeColor,
  accentColor,
  universeId,
}: Avatar3DViewerProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    let animId: number;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      const width = container.clientWidth || 320;
      const height = container.clientHeight || 360;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 7;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Lighting Rig
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const keyLight = new THREE.PointLight(new THREE.Color(themeColor), 2.8, 20);
      keyLight.position.set(4, 4, 5);
      scene.add(keyLight);

      const rimLight = new THREE.PointLight(new THREE.Color(accentColor), 2.2, 20);
      rimLight.position.set(-4, -2, -3);
      scene.add(rimLight);

      // Group for Character Model
      const avatarGroup = new THREE.Group();
      scene.add(avatarGroup);

      // Material tailored to theme
      const heroMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(themeColor),
        emissive: new THREE.Color(themeColor),
        emissiveIntensity: 0.35,
        roughness: 0.15,
        metalness: 0.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      });

      const accentMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(accentColor),
        transparent: true,
        opacity: 0.85,
      });

      // Bespoke Geometries per Universe
      if (universeId === "abbu") {
        // Abbu: Royal Lantern of Protection & Guidance
        const lanternBase = new THREE.CylinderGeometry(0.7, 0.95, 1.6, 8);
        const lanternCap = new THREE.ConeGeometry(1.15, 0.65, 8);
        const baseMesh = new THREE.Mesh(lanternBase, heroMaterial);
        const capMesh = new THREE.Mesh(lanternCap, heroMaterial);
        capMesh.position.y = 1.05;
        avatarGroup.add(baseMesh);
        avatarGroup.add(capMesh);

        // Protective aura rings
        const ringGeo = new THREE.TorusGeometry(2.0, 0.04, 16, 64);
        const ring = new THREE.Mesh(ringGeo, accentMaterial);
        ring.rotation.x = Math.PI / 2;
        avatarGroup.add(ring);
      } else if (universeId === "afrid") {
        // Afrid: Celestial Star & Compass of 7 Years
        const starGeo = new THREE.OctahedronGeometry(1.2, 0);
        const starMesh = new THREE.Mesh(starGeo, heroMaterial);
        avatarGroup.add(starMesh);

        // 7 Orbiting Diamond Stars (Year 1 to Year 7)
        for (let i = 0; i < 7; i++) {
          const angle = (i / 7) * Math.PI * 2;
          const miniStarGeo = new THREE.OctahedronGeometry(0.18, 0);
          const miniMesh = new THREE.Mesh(miniStarGeo, accentMaterial);
          miniMesh.position.set(Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0);
          avatarGroup.add(miniMesh);
        }

        const compassRingGeo = new THREE.TorusGeometry(2.2, 0.03, 16, 64);
        const compassRing = new THREE.Mesh(compassRingGeo, accentMaterial);
        avatarGroup.add(compassRing);
      } else if (universeId === "sameer") {
        // Sameer: Playful Comic Ice Cube (Cold Water Bottle Vault)
        const cubeGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
        const cubeMesh = new THREE.Mesh(cubeGeo, heroMaterial);
        avatarGroup.add(cubeMesh);

        // Comic energy shards
        const shardGeo = new THREE.TetrahedronGeometry(0.35);
        for (let i = 0; i < 4; i++) {
          const shard = new THREE.Mesh(shardGeo, accentMaterial);
          shard.position.set((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2);
          avatarGroup.add(shard);
        }
      } else if (universeId === "jhansi") {
        // Jhansi: Fierce Wanderlust Prism
        const prismGeo = new THREE.ConeGeometry(1.3, 2.0, 4);
        const prismMesh = new THREE.Mesh(prismGeo, heroMaterial);
        avatarGroup.add(prismMesh);

        const ringGeo = new THREE.TorusGeometry(1.9, 0.04, 16, 64);
        const ring = new THREE.Mesh(ringGeo, accentMaterial);
        ring.rotation.x = Math.PI / 4;
        avatarGroup.add(ring);
      } else {
        // Default Starlight Dodecahedron Core
        const coreGeo = new THREE.DodecahedronGeometry(1.4, 1);
        const coreMesh = new THREE.Mesh(coreGeo, heroMaterial);
        avatarGroup.add(coreMesh);

        const ringGeo = new THREE.TorusGeometry(2.1, 0.04, 16, 64);
        const ring1 = new THREE.Mesh(ringGeo, accentMaterial);
        ring1.rotation.x = Math.PI / 3;
        avatarGroup.add(ring1);
      }

      // Orbiting Sparkle Particles
      const particleCount = 45;
      const particleGeo = new THREE.BufferGeometry();
      const pPositions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const radius = 2.4 + Math.random() * 0.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        pPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        pPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        pPositions[i * 3 + 2] = radius * Math.cos(phi);
      }
      particleGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));

      const particleMat = new THREE.PointsMaterial({
        color: new THREE.Color(accentColor),
        size: 0.09,
        transparent: true,
        opacity: 0.9,
      });
      const sparkles = new THREE.Points(particleGeo, particleMat);
      avatarGroup.add(sparkles);

      // Mouse Drag / Tilt Interactivity
      let isDragging = false;
      let prevMouseX = 0;
      let prevMouseY = 0;

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      };
      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        avatarGroup.rotation.y += deltaX * 0.01;
        avatarGroup.rotation.x += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      };
      const onMouseUp = () => {
        isDragging = false;
      };

      container.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);

      // Animation Loop
      const clock = new THREE.Clock();
      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Idle levitation
        avatarGroup.position.y = Math.sin(elapsed * 1.5) * 0.15;
        if (!isDragging) {
          avatarGroup.rotation.y += 0.008;
        }

        sparkles.rotation.y = -elapsed * 0.2;

        renderer?.render(scene, camera);
      };
      animate();

      return () => {
        container.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        cancelAnimationFrame(animId);
        if (renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    } catch {}
  }, [themeColor, accentColor, universeId]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={canvasRef}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        className="relative w-64 h-72 sm:w-80 sm:h-80 cursor-grab active:cursor-grabbing flex items-center justify-center transition-transform duration-300"
      >
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: themeColor }}
        />
        {/* Character Icon Badge overlay */}
        <div className="absolute bottom-2 flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs text-slate-300 pointer-events-none">
          <Sparkles className="w-3.5 h-3.5" style={{ color: themeColor }} />
          <span>Drag to inspect 3D Avatar</span>
        </div>
      </div>

      {/* Character Profile Card */}
      <div className="mt-4 max-w-sm w-full glass-panel rounded-2xl p-4 sm:p-5 text-center relative overflow-hidden">
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
          style={{ backgroundColor: themeColor }}
        />

        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-2xl">{character.avatarIcon}</span>
          <h3 className="font-cinematic text-lg sm:text-xl font-bold tracking-wide text-white">
            {character.name}
          </h3>
        </div>

        <p className="text-xs sm:text-sm font-medium mb-3" style={{ color: themeColor }}>
          {character.subtitle}
        </p>

        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300 mb-3 italic bg-slate-950/60 py-2 px-3 rounded-lg border border-white/5">
          <Quote className="w-3 h-3 flex-shrink-0 text-slate-400" />
          <span>&ldquo;{character.signatureQuote}&rdquo;</span>
        </div>

        {/* Accessories Tags */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
          {character.accessories.map((item, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
