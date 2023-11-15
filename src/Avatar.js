import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const Avatar = () => {
  const canvasRef = useRef();
  let scene, camera, renderer, mesh, mixer, clock;

  useEffect(() => {
    // Initialisation
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    clock = new THREE.Clock();
    const loader = new GLTFLoader();

    // Loader
    loader.load('anim_2.glb', (gltf) => {
      console.log('test')

      mesh = gltf.scene;

      scene.add(mesh);

      mesh.position.set(0, 0, 0); 

      // Lumières
      const ambientLight = new THREE.AmbientLight(0x8189F0, 1);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(5, 5, 5);

      scene.add(ambientLight);
      scene.add(directionalLight);

      // Animation
      mixer = new THREE.AnimationMixer(mesh);
      const animation = gltf.animations[0];

      const animationAction = mixer.clipAction(animation);
      animationAction.play();

      // Matériel
      const material = new THREE.MeshToonMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
      });
      renderer.sortObjects = false;

      if (material instanceof THREE.MeshToonMaterial) {
        // Traitement supplémentaire si le matériau est de type MeshToonMaterial
      }

      // Position de la caméra
      camera.position.set(0, 1.4, 1);

      // Boucle d'animation
      const animate = () => {
        requestAnimationFrame(animate);

        // Mettez à jour le mixer pour l'animation
        if (mixer) {
          mixer.update(clock.getDelta());
        }

        // Mettez à jour le rendu
        renderer.render(scene, camera);
      };

      animate();
    });
  }, []);

  return (
    <canvas id="canvas" ref={canvasRef} />
  )
};

export default Avatar;