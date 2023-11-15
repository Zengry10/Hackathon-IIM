import React, { useState, useRef, useEffect } from 'react';
import '../Style/accueil.css';
import '../assets/logo_safran.png';
import logo from '../assets/logo_safran.png';
import Women from '../assets/charlee_safran.png'
import ChatBot from './Chatbot.js';
import Avatar from '../Avatar.js'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export default function Accueil() {
  const canvasRef = useRef();
  let scene, camera, renderer, mesh, mixer, clock;

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Initialisation
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);
    clock = new THREE.Clock();
    const loader = new GLTFLoader();

    if (isActive) {
      setIsActive(false)
    }

    // Loader

    loader.load('anim_2.glb', (gltf) => {
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
    <div className='container'>
      <nav className='container-navbar'>
        <div className='container-navbar__left'>
          <img className='container-accueil__logo' src={logo} alt="logo" />
          <div className='container-navbar__left__part'>
            <p className='container-navbar__left__part__soustitle'>Groupe</p>
            <p className='container-navbar__left__part__soustitle'>Produits et service</p>
            <p className='container-navbar__left__part__soustitle'>Carrières</p>
            <p className='container-navbar__left__part__soustitle'>Finance</p>
            <p className='container-navbar__left__part__soustitle'>Médias</p>
          </div>
        </div>
        <div className='container-navbar__right'>
          <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24">
            <g fill="none" stroke="#ffffff"  strokeWidth="1.5">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z"></path>
              <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"></path>
            </g>
          </svg>
        </div>
      </nav>
      <div>
        <canvas id="canvas" ref={canvasRef} />

        <div>          
            {/* <div className='container-women'>
                <img src='../assets/women_speack.png' alt='avatar'/>
            </div> */}
            <div className='container-chatbot'>
                <p className='container-chatbot_title'>Je suis votre assistant Charlee !</p>
                <ChatBot />
            </div>
        </div>
      </div>
    </div>
  );
} 