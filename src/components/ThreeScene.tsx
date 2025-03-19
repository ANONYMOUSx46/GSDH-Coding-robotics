
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cubes: THREE.Mesh[];
    frameId: number | null;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0c1221');
    
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 15;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create lighting
    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x36f9f6, 1);
    directionalLight.position.set(2, 2, 5);
    scene.add(directionalLight);

    const secondLight = new THREE.DirectionalLight(0xff3864, 1);
    secondLight.position.set(-2, -2, 5);
    scene.add(secondLight);

    // Create circuit board base
    const planeGeometry = new THREE.PlaneGeometry(20, 20, 10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0x172340,
      wireframe: true,
      emissive: 0x36f9f6,
      emissiveIntensity: 0.2,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -4;
    scene.add(plane);

    // Create cubes
    const cubes: THREE.Mesh[] = [];
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    
    for (let i = 0; i < 20; i++) {
      const material = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x36f9f6 : 0xff3864,
        metalness: 0.5,
        roughness: 0.2,
      });
      
      const cube = new THREE.Mesh(cubeGeometry, material);
      cube.position.x = (Math.random() - 0.5) * 10;
      cube.position.y = (Math.random() - 0.5) * 10;
      cube.position.z = (Math.random() - 0.5) * 10;
      cube.scale.set(
        0.5 + Math.random() * 0.5,
        0.5 + Math.random() * 0.5,
        0.5 + Math.random() * 0.5
      );
      
      scene.add(cube);
      cubes.push(cube);
    }

    sceneRef.current = {
      scene,
      camera,
      renderer,
      cubes,
      frameId: null,
    };

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;
      
      const { cubes, camera, renderer, scene } = sceneRef.current;
      
      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.01 * (index % 3 === 0 ? 1 : -1);
        cube.rotation.y += 0.01 * (index % 2 === 0 ? 1 : -1);
        
        // Add some floating motion
        cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
      });
      
      plane.rotation.z += 0.001;
      
      renderer.render(scene, camera);
      sceneRef.current.frameId = requestAnimationFrame(animate);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (sceneRef.current?.frameId) {
        cancelAnimationFrame(sceneRef.current.frameId);
      }
      
      if (containerRef.current && sceneRef.current?.renderer) {
        containerRef.current.removeChild(sceneRef.current.renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default ThreeScene;
