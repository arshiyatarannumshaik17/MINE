"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { UniverseId } from "@/lib/types";

interface CosmicBackgroundProps {
  primaryColor?: string;
  secondaryColor?: string;
  universeId?: UniverseId;
}

export default function CosmicBackground({
  primaryColor = "#f5a623",
  secondaryColor = "#3b82f6",
  universeId = "abbu",
}: CosmicBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 80;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      currentMount.appendChild(renderer.domElement);

      // Starfield Particle Geometry
      const starCount = 1800;
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);

      const color1 = new THREE.Color(primaryColor);
      const color2 = new THREE.Color(secondaryColor);
      const white = new THREE.Color("#ffffff");

      for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 320;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 320;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 220;

        const r = Math.random();
        let starColor = white;
        if (r < 0.45) starColor = color1;
        else if (r < 0.75) starColor = color2;

        colors[i * 3] = starColor.r;
        colors[i * 3 + 1] = starColor.g;
        colors[i * 3 + 2] = starColor.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 1.25,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });

      const stars = new THREE.Points(geometry, material);
      scene.add(stars);

      // Nebula Cloud Mesh
      const nebulaGeo = new THREE.IcosahedronGeometry(36, 2);
      const nebulaMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(primaryColor),
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      });
      const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
      scene.add(nebula);

      // Bespoke Environmental Accents per Universe
      const envGroup = new THREE.Group();
      scene.add(envGroup);

      if (universeId === "afrid") {
        // Shooting Star Trails for 7 Years
        const trailGeo = new THREE.CylinderGeometry(0.05, 0.2, 18, 8);
        const trailMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(primaryColor),
          transparent: true,
          opacity: 0.4,
        });
        const shootingStar = new THREE.Mesh(trailGeo, trailMat);
        shootingStar.rotation.z = Math.PI / 4;
        shootingStar.position.set(-30, 20, -10);
        envGroup.add(shootingStar);
      } else if (universeId === "abbu") {
        // Golden Dawn Rising Rays
        const ringGeo = new THREE.TorusGeometry(45, 0.3, 16, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(primaryColor),
          transparent: true,
          opacity: 0.15,
        });
        const halo = new THREE.Mesh(ringGeo, ringMat);
        halo.position.set(0, -20, -40);
        envGroup.add(halo);
      } else if (universeId === "mubeena") {
        // Equalizer Rhythm Bars
        for (let i = 0; i < 7; i++) {
          const barGeo = new THREE.BoxGeometry(1.5, 8 + i * 2, 1.5);
          const barMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(primaryColor),
            transparent: true,
            opacity: 0.2,
          });
          const bar = new THREE.Mesh(barGeo, barMat);
          bar.position.set((i - 3) * 6, -25, -20);
          envGroup.add(bar);
        }
      } else if (universeId === "sana") {
        // Concentric Zen Water Rings
        for (let i = 1; i <= 3; i++) {
          const zenGeo = new THREE.TorusGeometry(i * 12, 0.1, 16, 64);
          const zenMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(secondaryColor),
            transparent: true,
            opacity: 0.12,
          });
          const zenRing = new THREE.Mesh(zenGeo, zenMat);
          zenRing.rotation.x = Math.PI / 2.2;
          zenRing.position.set(0, -15, -20);
          envGroup.add(zenRing);
        }
      }

      // Parallax Mouse Interaction
      let mouseX = 0;
      let mouseY = 0;
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 12;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 12;
      };
      window.addEventListener("mousemove", handleMouseMove);

      const handleResize = () => {
        if (!renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      // Render Loop
      const clock = new THREE.Clock();
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        stars.rotation.y = elapsed * 0.015;
        stars.rotation.x = elapsed * 0.008;

        nebula.rotation.y = -elapsed * 0.02;
        nebula.rotation.z = elapsed * 0.01;

        envGroup.rotation.y = elapsed * 0.01;

        // Smooth Camera Parallax
        camera.position.x += (mouseX - camera.position.x) * 0.03;
        camera.position.y += (-mouseY - camera.position.y) * 0.03;
        camera.lookAt(scene.position);

        renderer?.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
        if (renderer && currentMount.contains(renderer.domElement)) {
          currentMount.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    } catch {}
  }, [primaryColor, secondaryColor, universeId]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 20%, ${primaryColor}18 0%, #03050c 80%)`,
      }}
    />
  );
}
