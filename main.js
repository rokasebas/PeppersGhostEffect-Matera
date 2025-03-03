import * as THREE from 'three';
			import { PeppersGhostEffect } from 'three/addons/effects/PeppersGhostEffect.js';
            import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

            //Se instancian las variables
			    let container;

			    let camera, scene, renderer, effect;

            //Se crea un contenedor
				container = document.createElement( 'div' );

				document.body.appendChild( container );
 
            //render

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setAnimationLoop( animate );
				container.appendChild( renderer.domElement );

            //Se crea el efecto PeppersGhost
				effect = new PeppersGhostEffect( renderer );
				effect.setSize( window.innerWidth, window.innerHeight );
				effect.cameraDistance = 90;
                
				window.addEventListener( 'resize', onWindowResize );
            //Camara
				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 );

             //   camera.position.set(0, 0, 80);  // Eleva la cámara y la aleja un poco más
                

            //Escena
				scene = new THREE.Scene();

				const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 5 );
				hemiLight.color.setHSL( 10, 10, 10 );
				hemiLight.position.set( 0, 0, 0 );
				scene.add( hemiLight );


                //Comenzamos con el fbx
//var MyObj;

const fbxLoader = new FBXLoader()

fbxLoader.load('assets/indoorplant.fbx',

    (object) => {
        console.log('Modelo cargado:', object);
        
        object.scale.set(0.04, 0.04, 0.04);
        object.position.set(0, -8, 0);
        
        scene.add(object);
        camera.lookAt = object;
        effect.camera.lookAt = object;
        // Verifica qué contiene el modelo
        object.traverse((child) => {
            if (child.isMesh) {
                console.log("Encontrado mesh:", child);
                child.material.wireframe = true; // Prueba visualizar el modelo en modo wireframe
            }
        });
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.error('Error al cargar el modelo:', error);
    }
);

          

            //Ajuste a pantalla

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				effect.setSize( window.innerWidth, window.innerHeight );

			}

            // Animaciones
			function animate() {
                requestAnimationFrame(animate); // Mantiene la animación en bucle
            
                // Hace que cualquier objeto con geometría en la escena rote
                scene.traverse((child) => {
                    if (child.isMesh) {
                        child.rotation.y += 0.0006; // Rota el modelo en el eje Y
                    }
                });
            
                effect.render(scene, camera);
            }
            
