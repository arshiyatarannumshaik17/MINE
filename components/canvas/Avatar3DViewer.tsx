"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CharacterConcept, UniverseId } from "@/lib/types";
import { Sparkles, Quote, User, Heart } from "lucide-react";
import { soundEngine } from "@/lib/audio/sound-engine";

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
  universeId = "abbu",
}: Avatar3DViewerProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [viewMode, setViewMode] = useState<"recipient" | "arshiya">("recipient");

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
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
      scene.add(ambientLight);

      const activeColor = viewMode === "arshiya" ? "#ec4899" : themeColor;
      const activeAccent = viewMode === "arshiya" ? "#fde047" : accentColor;

      const keyLight = new THREE.PointLight(new THREE.Color(activeColor), 3.0, 25);
      keyLight.position.set(4, 4, 5);
      scene.add(keyLight);

      const rimLight = new THREE.PointLight(new THREE.Color(activeAccent), 2.5, 25);
      rimLight.position.set(-4, -2, -3);
      scene.add(rimLight);

      // Group for Character Model
      const avatarGroup = new THREE.Group();
      scene.add(avatarGroup);

      // Material tailored to theme
      const heroMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(activeColor),
        emissive: new THREE.Color(activeColor),
        emissiveIntensity: 0.35,
        roughness: 0.2,
        metalness: 0.45,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      });

      const accentMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(activeAccent),
        transparent: true,
        opacity: 0.85,
      });

      if (viewMode === "arshiya") {
        // ARSHIYA'S RECURRING 3D CHARACTER DESIGN (Consistent across all 12 universes)
        // Cute celestial storyteller with floating star crown, scarf, and starlight orb
        const headGeo = new THREE.SphereGeometry(1.0, 32, 32);
        const headMesh = new THREE.Mesh(headGeo, heroMaterial);
        avatarGroup.add(headMesh);

        // Starry Hair Clip / Tiara
        const starClipGeo = new THREE.OctahedronGeometry(0.35, 0);
        const starClip = new THREE.Mesh(starClipGeo, accentMaterial);
        starClip.position.set(0.65, 0.75, 0.65);
        avatarGroup.add(starClip);

        // Flowing Celestial Scarf / Duppata Rings
        const scarfGeo1 = new THREE.TorusGeometry(1.4, 0.08, 16, 64);
        const scarf1 = new THREE.Mesh(scarfGeo1, accentMaterial);
        scarf1.rotation.x = Math.PI / 3;
        scarf1.rotation.y = Math.PI / 6;
        avatarGroup.add(scarf1);

        const scarfGeo2 = new THREE.TorusGeometry(1.8, 0.05, 16, 64);
        const scarf2 = new THREE.Mesh(scarfGeo2, heroMaterial);
        scarf2.rotation.x = -Math.PI / 4;
        avatarGroup.add(scarf2);

        // Floating Starlight Lantern of Memories
        const lanternGeo = new THREE.DodecahedronGeometry(0.4, 0);
        const lantern = new THREE.Mesh(lanternGeo, accentMaterial);
        lantern.position.set(-1.3, -0.6, 0.8);
        avatarGroup.add(lantern);

        // Waving Hand Sparkle
        const handGeo = new THREE.SphereGeometry(0.2, 16, 16);
        const hand = new THREE.Mesh(handGeo, accentMaterial);
        hand.position.set(1.4, 0.4, 0.5);
        avatarGroup.add(hand);
      } else {
        // RECIPIENT'S BESPOKE 3D GEOMETRY FOR ALL 12 UNIVERSES
        switch (universeId) {
          case "abbu": {
            // Abbu: Royal Lantern of Protection & Guidance
            const baseGeo = new THREE.CylinderGeometry(0.7, 0.95, 1.6, 8);
            const capGeo = new THREE.ConeGeometry(1.15, 0.65, 8);
            const baseMesh = new THREE.Mesh(baseGeo, heroMaterial);
            const capMesh = new THREE.Mesh(capGeo, heroMaterial);
            capMesh.position.y = 1.05;
            avatarGroup.add(baseMesh);
            avatarGroup.add(capMesh);

            const ringGeo = new THREE.TorusGeometry(2.0, 0.04, 16, 64);
            const ring = new THREE.Mesh(ringGeo, accentMaterial);
            ring.rotation.x = Math.PI / 2;
            avatarGroup.add(ring);
            break;
          }
          case "afrid": {
            // Afrid: Celestial Compass & 7 Orbiting Starlight Diamonds
            const starGeo = new THREE.OctahedronGeometry(1.2, 0);
            const starMesh = new THREE.Mesh(starGeo, heroMaterial);
            avatarGroup.add(starMesh);

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
            break;
          }
          case "sameer": {
            // Sameer: Playful Comic Ice Cube & Flying Cold Water Bottle
            const cubeGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
            const cubeMesh = new THREE.Mesh(cubeGeo, heroMaterial);
            avatarGroup.add(cubeMesh);

            const bottleGeo = new THREE.CylinderGeometry(0.2, 0.2, 1.4, 16);
            const bottle = new THREE.Mesh(bottleGeo, accentMaterial);
            bottle.position.set(1.3, 0.8, 0.5);
            bottle.rotation.z = Math.PI / 4;
            avatarGroup.add(bottle);

            const shardGeo = new THREE.TetrahedronGeometry(0.35);
            for (let i = 0; i < 4; i++) {
              const shard = new THREE.Mesh(shardGeo, accentMaterial);
              shard.position.set((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2);
              avatarGroup.add(shard);
            }
            break;
          }
          case "jhansi": {
            // Jhansi: Fierce Wanderlust Prism & Travel Compass
            const prismGeo = new THREE.ConeGeometry(1.3, 2.0, 4);
            const prismMesh = new THREE.Mesh(prismGeo, heroMaterial);
            avatarGroup.add(prismMesh);

            const ringGeo = new THREE.TorusGeometry(1.9, 0.04, 16, 64);
            const ring = new THREE.Mesh(ringGeo, accentMaterial);
            ring.rotation.x = Math.PI / 4;
            avatarGroup.add(ring);
            break;
          }
          case "awez": {
            // Awez: Emerald & Gold Royal Brotherhood Shield Crest
            const shieldGeo = new THREE.CylinderGeometry(1.2, 0.4, 1.8, 6);
            const shieldMesh = new THREE.Mesh(shieldGeo, heroMaterial);
            shieldMesh.rotation.y = Math.PI / 6;
            avatarGroup.add(shieldMesh);

            const starGeo = new THREE.OctahedronGeometry(0.4, 0);
            const star = new THREE.Mesh(starGeo, accentMaterial);
            star.position.set(0, 1.2, 0.3);
            avatarGroup.add(star);
            break;
          }
          case "manohar": {
            // Manohar: Stand-Up Comedy Retro Megaphone & Spotlight Stage
            const hornGeo = new THREE.ConeGeometry(1.2, 1.8, 16);
            const horn = new THREE.Mesh(hornGeo, heroMaterial);
            horn.rotation.z = -Math.PI / 2;
            avatarGroup.add(horn);

            const micBase = new THREE.CylinderGeometry(0.25, 0.25, 1.0, 16);
            const handle = new THREE.Mesh(micBase, accentMaterial);
            handle.position.set(-0.8, -0.6, 0);
            avatarGroup.add(handle);

            const soundwave = new THREE.TorusGeometry(1.6, 0.04, 16, 64);
            const wave = new THREE.Mesh(soundwave, accentMaterial);
            wave.position.x = 0.9;
            wave.rotation.y = Math.PI / 2;
            avatarGroup.add(wave);
            break;
          }
          case "mubeena": {
            // Mubeena: Bollywood Disco Shimmer & Jingling Ghungroo Petals
            const lotusGeo = new THREE.TorusKnotGeometry(0.9, 0.3, 64, 16);
            const lotus = new THREE.Mesh(lotusGeo, heroMaterial);
            avatarGroup.add(lotus);

            for (let i = 0; i < 6; i++) {
              const angle = (i / 6) * Math.PI * 2;
              const bellGeo = new THREE.SphereGeometry(0.18, 16, 16);
              const bell = new THREE.Mesh(bellGeo, accentMaterial);
              bell.position.set(Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0);
              avatarGroup.add(bell);
            }
            break;
          }
          case "qurayba": {
            // Qurayba: Fairytale Princess Tiara & Star Marker Wand
            const crownBase = new THREE.CylinderGeometry(1.1, 1.0, 0.6, 5);
            const crown = new THREE.Mesh(crownBase, heroMaterial);
            avatarGroup.add(crown);

            const wandGeo = new THREE.OctahedronGeometry(0.4, 0);
            const wand = new THREE.Mesh(wandGeo, accentMaterial);
            wand.position.set(1.2, 0.8, 0.4);
            avatarGroup.add(wand);
            break;
          }
          case "wafeeqa": {
            // Wafeeqa: Soft Marshmallow Blossom Cloud & Angel Wings
            const cloudCenter = new THREE.SphereGeometry(0.8, 24, 24);
            const cloudC = new THREE.Mesh(cloudCenter, heroMaterial);
            avatarGroup.add(cloudC);

            const cloudLeft = new THREE.SphereGeometry(0.6, 24, 24);
            const cloudL = new THREE.Mesh(cloudLeft, heroMaterial);
            cloudL.position.set(-0.7, -0.1, 0);
            avatarGroup.add(cloudL);

            const cloudRight = new THREE.SphereGeometry(0.65, 24, 24);
            const cloudR = new THREE.Mesh(cloudRight, heroMaterial);
            cloudR.position.set(0.7, -0.05, 0);
            avatarGroup.add(cloudR);

            const butterflyGeo = new THREE.OctahedronGeometry(0.25, 0);
            const butterfly = new THREE.Mesh(butterflyGeo, accentMaterial);
            butterfly.position.set(0, 1.1, 0.3);
            avatarGroup.add(butterfly);
            break;
          }
          case "shahid": {
            // Shahid: Vintage 70s Broadcast Cylinder Mic & Warm Acoustic Ripples
            const micCapsule = new THREE.CylinderGeometry(0.6, 0.6, 1.4, 16);
            const mic = new THREE.Mesh(micCapsule, heroMaterial);
            avatarGroup.add(mic);

            const standBase = new THREE.CylinderGeometry(0.9, 0.9, 0.2, 24);
            const stand = new THREE.Mesh(standBase, accentMaterial);
            stand.position.y = -1.0;
            avatarGroup.add(stand);

            const acousticRing = new THREE.TorusGeometry(1.7, 0.03, 16, 64);
            const aRing = new THREE.Mesh(acousticRing, accentMaterial);
            aRing.rotation.x = Math.PI / 3;
            avatarGroup.add(aRing);
            break;
          }
          case "muskan": {
            // Muskan: Cute Chaos Boba Cup & Twin Smiling Heart Prisms
            const cupGeo = new THREE.CylinderGeometry(0.7, 0.5, 1.6, 16);
            const cup = new THREE.Mesh(cupGeo, heroMaterial);
            avatarGroup.add(cup);

            const strawGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.0, 8);
            const straw = new THREE.Mesh(strawGeo, accentMaterial);
            straw.position.set(0.2, 0.5, 0);
            straw.rotation.z = -0.3;
            avatarGroup.add(straw);

            const twinHeartGeo = new THREE.OctahedronGeometry(0.3, 0);
            const heart1 = new THREE.Mesh(twinHeartGeo, accentMaterial);
            heart1.position.set(-1.2, 0.5, 0.5);
            avatarGroup.add(heart1);
            break;
          }
          case "sana": {
            // Sana: Elegant Lavender Crystal Obelisk & Zen Water Ripple Rings
            const obeliskGeo = new THREE.ConeGeometry(0.9, 2.4, 6);
            const obelisk = new THREE.Mesh(obeliskGeo, heroMaterial);
            avatarGroup.add(obelisk);

            const ripple1 = new THREE.TorusGeometry(1.5, 0.03, 16, 64);
            const r1 = new THREE.Mesh(ripple1, accentMaterial);
            r1.rotation.x = Math.PI / 2;
            avatarGroup.add(r1);

            const ripple2 = new THREE.TorusGeometry(2.1, 0.02, 16, 64);
            const r2 = new THREE.Mesh(ripple2, accentMaterial);
            r2.rotation.x = Math.PI / 2;
            avatarGroup.add(r2);
            break;
          }
          default: {
            const coreGeo = new THREE.DodecahedronGeometry(1.4, 1);
            const coreMesh = new THREE.Mesh(coreGeo, heroMaterial);
            avatarGroup.add(coreMesh);
            break;
          }
        }
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
        color: new THREE.Color(activeAccent),
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
  }, [themeColor, accentColor, universeId, viewMode]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* View Toggle: Recipient Avatar vs Recurring Arshiya 3D Character */}
      <div className="flex items-center gap-2 mb-3 p-1 rounded-full bg-slate-900/80 border border-white/10 text-xs">
        <button
          onClick={() => {
            soundEngine.playSuccessChime();
            setViewMode("recipient");
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
            viewMode === "recipient"
              ? "bg-white/20 text-white font-bold shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>{character.name}&apos;s 3D Avatar</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playSuccessChime();
            setViewMode("arshiya");
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
            viewMode === "arshiya"
              ? "bg-pink-600 text-white font-bold shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span>Arshiya (3D Storyteller)</span>
        </button>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={canvasRef}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        className="relative w-64 h-72 sm:w-80 sm:h-80 cursor-grab active:cursor-grabbing flex items-center justify-center transition-transform duration-300"
      >
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: viewMode === "arshiya" ? "#ec4899" : themeColor }}
        />
        {/* Drag Hint overlay */}
        <div className="absolute bottom-2 flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs text-slate-300 pointer-events-none">
          <Sparkles className="w-3.5 h-3.5" style={{ color: viewMode === "arshiya" ? "#ec4899" : themeColor }} />
          <span>Drag to inspect in 3D</span>
        </div>
      </div>

      {/* Character Profile Card */}
      <div className="mt-4 max-w-sm w-full glass-panel rounded-2xl p-4 sm:p-5 text-center relative overflow-hidden">
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
          style={{ backgroundColor: viewMode === "arshiya" ? "#ec4899" : themeColor }}
        />

        {viewMode === "arshiya" ? (
          <div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-2xl">✨</span>
              <h3 className="font-cinematic text-lg sm:text-xl font-bold tracking-wide text-white">
                Arshiya
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-medium mb-3 text-pink-400">
              The Storyteller &amp; Creator of the 12 Universes
            </p>
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-200 mb-3 italic bg-slate-950/60 py-2 px-3 rounded-lg border border-white/5">
              <Quote className="w-3 h-3 flex-shrink-0 text-pink-400" />
              <span>&ldquo;I designed this entire world just for you. Every star is a memory.&rdquo;</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300">
                Starry Clip
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300">
                Celestial Scarf
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300">
                Memory Lantern
              </span>
            </div>
          </div>
        ) : (
          <div>
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
        )}
      </div>
    </div>
  );
}
