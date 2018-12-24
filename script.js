// Scene
const scene = new THREE.Scene();

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

// Camera
const camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight, 1, 1000);
camera.position.z = 75;
scene.add(camera);


// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.AmbientLight( 0xffffff, 0.75 ); // soft white light
scene.add(light);
const light1 = new THREE.PointLight( 0xFFFFFF, 1, 100 );
light1.position.z = 50;
light1.position.x = 0;
scene.add( light1 );

// Sphere
const geometry = new THREE.SphereGeometry( 15, 32, 32 );
const material = new THREE.MeshPhongMaterial( {
  color: 0xffffff,
  specular: 0x050505,
  shininess: 50,
  map: new THREE.TextureLoader().load('textures/eye2.jpg')
} );
// modify UVs to accommodate MatCap texture
var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
for ( i = 0; i < faceVertexUvs.length; i ++ ) {
  var uvs = faceVertexUvs[ i ];
  var face = geometry.faces[ i ];

  for ( var j = 0; j < 3; j ++ ) {
    uvs[ j ].x = face.vertexNormals[ j ].x * 0.5 + 0.5;
    uvs[ j ].y = face.vertexNormals[ j ].y * 0.5 + 0.5;
  }
}
const sphere = new THREE.Mesh( geometry, material );
const origin = new THREE.Vector3(0, 0, 75);
sphere.position.x = 0;
sphere.position.z = 0;
sphere.lookAt(origin);
scene.add( sphere );

window.addEventListener("mousemove", onmousemove, false);

var target = new THREE.Vector3();
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function onmousemove(event) {
  mouseX = ( event.clientX - windowHalfX );
  mouseY = ( event.clientY - windowHalfY );
}

function lookAtMouse() {
  target.x += ( mouseX - target.x ) * 0.04;
  target.y += ( - mouseY - target.y ) * 0.04;
  target.z = 75*5; // assuming the camera is located at ( 0, 0, z );

  sphere.lookAt( target );
}

function animate() {
  requestAnimationFrame(animate);

  lookAtMouse();

  //controls.update();
  renderer.render(scene, camera);
}
animate();
