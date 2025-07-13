"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  varying vec2 vUv;
  
  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec2 st = vUv;
    
    // Create circular mask with soft edges
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(st, center);
    float radius = 0.4;
    float softness = 0.3;
    float mask = 1.0 - smoothstep(radius - softness, radius, dist);
    
    // Animated noise layers
    float n1 = snoise(st * 2.0 + vec2(0.0, time * 0.3)) * 0.5 + 0.5;
    float n2 = snoise(st * 4.0 + vec2(time * 0.2, time * 0.1)) * 0.5 + 0.5;
    float n3 = snoise(st * 6.0 - vec2(time * 0.1, time * 0.4)) * 0.5 + 0.5;
    
    // Combine noise layers
    float noise = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2);
    
    // Vertical gradient for flame effect
    float flameGradient = 1.0 - pow(st.y, 1.5);
    
    // Combine effects
    float finalNoise = noise * flameGradient;
    
    // Color gradient from blue to purple
    vec3 color1 = vec3(0.1, 0.3, 1.0); // Deep Blue
    vec3 color2 = vec3(0.7, 0.1, 1.0); // Bright Purple
    vec3 color3 = vec3(1.0, 0.3, 0.8); // Pink highlight
    
    vec3 color = mix(color1, color2, finalNoise * 0.8);
    color = mix(color, color3, pow(finalNoise, 3.0) * 0.5);
    
    // Brighten the core
    float core = 1.0 - smoothstep(0.0, 0.3, dist);
    color += vec3(0.3, 0.2, 0.5) * core;
    
    // Apply mask and ensure visibility
    float alpha = mask;
    
    gl_FragColor = vec4(color * 1.5, alpha);
  }
`;

export default function FlameGradient() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      premultipliedAlpha: false
    });
    renderer.setSize(32, 32);
    renderer.setPixelRatio(1); // Force pixel ratio to 1 for consistent size
    rendererRef.current = renderer;
    
    // Style the canvas
    renderer.domElement.style.width = '32px';
    renderer.domElement.style.height = '32px';
    renderer.domElement.style.display = 'block';
    
    mountRef.current.appendChild(renderer.domElement);

    // Geometry and material
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(32, 32) }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    const animate = (time: number) => {
      frameRef.current = requestAnimationFrame(animate);
      
      // Update time uniform
      material.uniforms.time.value = time * 0.001;
      
      renderer.render(scene, camera);
    };

    animate(0);

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (rendererRef.current && mountRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-8 h-8 relative overflow-hidden"
      style={{ 
        filter: "blur(1px)",
      }}
    />
  );
}