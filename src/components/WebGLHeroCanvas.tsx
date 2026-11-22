import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';

interface WebGLHeroCanvasProps {
  accentHex?: string;
  secondaryHex?: string;
  className?: string;
}

const AURORA_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const AURORA_FRAG = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform vec3 uPrimary;
  uniform vec3 uSecondary;

  void main() {
    vec2 aspect = vec2(uRes.x / max(uRes.y, 1.0), 1.0);
    vec2 p = (vUv - 0.5) * aspect;
    vec2 m = (uMouse - 0.5) * aspect;

    float t = uTime * 0.28;
    float distM = length(p - m);

    // Dual harmonic Olympiad interference contours
    float wave1 = sin(p.x * 6.8 + t * 1.4 + sin(p.y * 4.2 - t));
    float wave2 = cos(p.y * 6.2 - t * 1.15 + cos(p.x * 4.8 + t * 0.85));
    float contour = abs(wave1 + wave2);
    float ribbon = smoothstep(0.26, 0.0, contour) * 0.32;

    float radius = length(p);
    float ring = smoothstep(0.03, 0.0, abs(fract(radius * 5.2 - t * 0.22) - 0.5) - 0.486);
    float cursorAura = exp(-distM * 3.1) * 0.28;

    vec3 obsidian = vec3(0.012, 0.020, 0.048);
    vec3 color = obsidian
      + uPrimary * (ribbon * 0.72 + cursorAura * 0.85 + ring * 0.11)
      + uSecondary * (smoothstep(0.95, 0.0, radius) * 0.18 + max(wave1 * wave2, 0.0) * 0.08);

    float vig = smoothstep(1.3, 0.25, length(vUv - 0.5));
    gl_FragColor = vec4(color * (0.64 + 0.36 * vig), 0.96);
  }
`;

function detectSoftwareRenderer(canvas: HTMLCanvasElement): {
  supported: boolean;
  isSoftware: boolean;
} {
  try {
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return {supported: false, isSoftware: false};
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (ext) {
      const renderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '');
      const isSw = /SwiftShader|llvmpipe|Software Rasterizer|Microsoft Basic Render/i.test(renderer);
      return {supported: true, isSoftware: isSw};
    }
    return {supported: true, isSoftware: false};
  } catch {
    return {supported: false, isSoftware: false};
  }
}

export const WebGLHeroCanvas: React.FC<WebGLHeroCanvasProps> = ({
  accentHex = '#00F0FF',
  secondaryHex = '#8B5CF6',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setFallback(true);
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.className = 'block h-full w-full pointer-events-none';
    const glInfo = detectSoftwareRenderer(canvas);
    if (!glInfo.supported) {
      setFallback(true);
      return;
    }

    container.appendChild(canvas);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !glInfo.isSoftware,
        powerPreference: glInfo.isSoftware ? 'low-power' : 'high-performance',
      });
    } catch {
      if (canvas.parentNode === container) container.removeChild(canvas);
      setFallback(true);
      return;
    }

    const maxDpr = glInfo.isSoftware ? 1 : 1.75;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 80);
    camera.position.set(0, 0, 14);

    // 1. Custom GLSL Aurora Backdrop Plane
    const auroraGeo = new THREE.PlaneGeometry(2, 2);
    const primaryColor = new THREE.Color(accentHex);
    const secondaryColor = new THREE.Color(secondaryHex);
    const auroraUniforms = {
      uTime: {value: 0},
      uRes: {value: new THREE.Vector2(1280, 720)},
      uMouse: {value: new THREE.Vector2(0.5, 0.45)},
      uPrimary: {value: new THREE.Vector3(primaryColor.r, primaryColor.g, primaryColor.b)},
      uSecondary: {value: new THREE.Vector3(secondaryColor.r, secondaryColor.g, secondaryColor.b)},
    };
    const auroraMat = new THREE.ShaderMaterial({
      vertexShader: AURORA_VERT,
      fragmentShader: AURORA_FRAG,
      uniforms: auroraUniforms,
      depthTest: false,
      depthWrite: false,
      transparent: true,
    });
    const auroraMesh = new THREE.Mesh(auroraGeo, auroraMat);
    auroraMesh.frustumCulled = false;
    auroraMesh.renderOrder = -1;
    scene.add(auroraMesh);

    // 2. Nested 3D Polyhedral Olympiad Core Group
    const polyGroup = new THREE.Group();
    polyGroup.position.set(2.4, 0.1, 0);
    scene.add(polyGroup);

    const icoGeo = new THREE.IcosahedronGeometry(2.65, 1);
    const icoEdges = new THREE.EdgesGeometry(icoGeo);
    const icoMat = new THREE.LineBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.42,
    });
    const icoWire = new THREE.LineSegments(icoEdges, icoMat);
    polyGroup.add(icoWire);

    const dodecaGeo = new THREE.DodecahedronGeometry(1.75, 0);
    const dodecaEdges = new THREE.EdgesGeometry(dodecaGeo);
    const dodecaMat = new THREE.LineBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: 0.46,
    });
    const dodecaWire = new THREE.LineSegments(dodecaEdges, dodecaMat);
    polyGroup.add(dodecaWire);

    const octGeo = new THREE.OctahedronGeometry(0.95, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const octCore = new THREE.Mesh(octGeo, octMat);
    polyGroup.add(octCore);

    // Orbital telemetry rings
    const ringGeo = new THREE.TorusGeometry(3.45, 0.015, 8, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.28,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI * 0.36;
    ringMesh.rotation.y = Math.PI * 0.12;
    polyGroup.add(ringMesh);

    // 3. 1,200+ Particle Mathematical Constellation (halved cleanly on Software GL)
    const particleCount = glInfo.isSoftware ? 600 : 1260;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const paletteHex = ['#00F0FF', '#8B5CF6', '#F59E0B', '#10B981', '#F43F5E'];
    const paletteColors = paletteHex.map((h) => new THREE.Color(h));

    for (let i = 0; i < particleCount; i++) {
      const spreadX = (Math.random() - 0.5) * 28;
      const spreadY = (Math.random() - 0.5) * 14;
      const spreadZ = (Math.random() - 0.5) * 14 - 2;
      positions[i * 3] = spreadX;
      positions[i * 3 + 1] = spreadY;
      positions[i * 3 + 2] = spreadZ;

      const c = paletteColors[i % paletteColors.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.085,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Connecting mathematical edges across sampled star clusters
    const edgeVertexCount = glInfo.isSoftware ? 160 : 320;
    const linePositions = new Float32Array(edgeVertexCount * 3);
    let writeIdx = 0;
    const hubLimit = Math.min(particleCount, 180);
    for (let i = 0; i < hubLimit && writeIdx + 6 <= linePositions.length; i += 3) {
      for (let j = i + 1; j < hubLimit && writeIdx + 6 <= linePositions.length; j += 11) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < 19.5) {
          linePositions[writeIdx++] = positions[i * 3];
          linePositions[writeIdx++] = positions[i * 3 + 1];
          linePositions[writeIdx++] = positions[i * 3 + 2];
          linePositions[writeIdx++] = positions[j * 3];
          linePositions[writeIdx++] = positions[j * 3 + 1];
          linePositions[writeIdx++] = positions[j * 3 + 2];
        }
      }
    }
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(linePositions.subarray(0, writeIdx), 3));
    const edgeMat = new THREE.LineBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
    });
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edgeLines);

    // Interaction & Lifecycle State (zero per-frame heap allocations)
    let pointerX = 0.5;
    let pointerY = 0.45;
    let targetX = 0.5;
    let targetY = 0.45;
    let scrollFactor = 0;
    let isVisible = true;
    let isTabActive = !document.hidden;
    let contextLost = false;
    let rafId = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      auroraUniforms.uRes.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
      polyGroup.position.x = w < 768 ? 0.2 : 2.6;
      polyGroup.scale.setScalar(w < 640 ? 0.72 : 1.0);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      targetY = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
    };

    const handleScroll = () => {
      scrollFactor = Math.min(1.5, window.scrollY / Math.max(window.innerHeight, 600));
    };

    const handleVisibility = () => {
      isTabActive = !document.hidden;
    };

    const handleContextLost = (ev: Event) => {
      ev.preventDefault();
      contextLost = true;
      setFallback(true);
    };

    canvas.addEventListener('webglcontextlost', handleContextLost);
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              if (entries[0]) isVisible = entries[0].isIntersecting;
            },
            {threshold: 0.01},
          )
        : null;
    io?.observe(container);

    resize();
    handleScroll();
    window.addEventListener('resize', resize, {passive: true});
    window.addEventListener('pointermove', handlePointerMove, {passive: true});
    window.addEventListener('scroll', handleScroll, {passive: true});
    document.addEventListener('visibilitychange', handleVisibility);

    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (contextLost || !isVisible || !isTabActive) return;

      const t = clock.getElapsedTime();
      pointerX += (targetX - pointerX) * 0.06;
      pointerY += (targetY - pointerY) * 0.06;

      auroraUniforms.uTime.value = t;
      auroraUniforms.uMouse.value.set(pointerX, pointerY);

      const mx = (pointerX - 0.5) * 1.4;
      const my = (pointerY - 0.5) * 0.9;

      polyGroup.rotation.y = t * 0.16 + mx * 0.55 + scrollFactor * 0.85;
      polyGroup.rotation.x = t * 0.09 - my * 0.45 + scrollFactor * 0.3;
      dodecaWire.rotation.y = -t * 0.24;
      dodecaWire.rotation.z = t * 0.15;
      octCore.rotation.x = t * 0.42;
      octCore.rotation.y = t * 0.36;
      ringMesh.rotation.z = t * 0.2;

      starPoints.rotation.y = t * 0.025 + mx * 0.18;
      starPoints.rotation.x = my * 0.1 + scrollFactor * 0.15;
      edgeLines.rotation.copy(starPoints.rotation);

      camera.position.x = mx * 0.65;
      camera.position.y = my * 0.45 - scrollFactor * 0.9;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      io?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      canvas.removeEventListener('webglcontextlost', handleContextLost);

      auroraGeo.dispose();
      auroraMat.dispose();
      icoGeo.dispose();
      icoEdges.dispose();
      icoMat.dispose();
      dodecaGeo.dispose();
      dodecaEdges.dispose();
      dodecaMat.dispose();
      octGeo.dispose();
      octMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      renderer.dispose();

      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, [accentHex, secondaryHex]);

  if (fallback) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${className}`}
        style={{
          background: `radial-gradient(ellipse 75% 55% at 25% 20%, ${accentHex}24, transparent 60%), radial-gradient(circle at 80% 35%, ${secondaryHex}20, transparent 55%), #03050c`,
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-webgl-hero=""
      data-accent={accentHex}
      data-secondary={secondaryHex}
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-hidden ${className}`}
    />
  );
};
