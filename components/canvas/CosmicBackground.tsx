"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface CosmicBackgroundProps {
  primaryColor?: string;
  secondaryColor?: string;
}

export default function CosmicBackground({
  primaryColor = "#f5a623",
  secondaryColor = "#3b82f6",
}: CosmicBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      // Scene & Camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 80;

      // Renderer
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
        positions[i * 3] = (Math.random() - 0.5) * 300;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

        // Mix between primary, secondary, and white stars
        const r = Math.random();
        let starColor = white;
        if (r < 0.4) starColor = color1;
        else if (r < 0.7) starColor = color2;

        colors[i * 3] = starColor.r;
        colors[i * 3 + 1] = starColor.g;
        colors[i * 3 + 2] = starColor.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      // Particle Material
      const material = new THREE.PointsMaterial({
        size: 1.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });

      const stars = new THREE.Points(geometry, material);
      scene.add(stars);

      // Nebula Cloud Mesh (Soft glowing distorted sphere)
      const nebulaGeo = new THREE.IcosahedronGeometry(35, 3);
      const nebulaMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(primaryColor),
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      });
      const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
      scene.add(nebula);

      // Mouse Parallax
      let mouseX = 0;
      let mouseY = 0;
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 10;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 10;
      };
      window.addEventListener("mousemove", handleMouseMove);

      // Resize Listener
      const handleResize = () => {
        if (!renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      // Animation Loop
      let clock = new THREE.Clock();
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Slow celestial rotation
        stars.rotation.y = elapsedTime * 0.02 + mouseX * 0.005;
        stars.rotation.x = elapsedTime * 0.01 + mouseY * 0.005;

        nebula.rotation.x = -elapsedTime * 0.03;
        nebula.rotation.y = elapsedTime * 0.04;

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
    } catch {
      // Graceful fallback to CSS background if WebGL fails
    }
  }, [primaryColor, secondaryColor]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: `radial-gradient(circle at 50% 30%, ${primaryColor}15 0%, #04060c 70%)`,
      }}
    />
  );
}

