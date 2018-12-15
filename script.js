// Scene
const scene = new THREE.Scene();

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

// Camera
const camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight, 1, 1000);
camera.position.z = 75;
scene.add(camera);

const controls = new THREE.OrbitControls( camera );
controls.minDistance = 75;
controls.maxDistance = 200;
controls.enablePan = false;

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

// Cube
// const geometry = new THREE.BoxGeometry(1,1,1);
// const material = new THREE.MeshLambertMaterial({color: 0xaa77ff});
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// Line
// const material = new THREE.LineBasicMaterial({color:0xaaaaff});
// const geometry = new THREE.Geometry();
// geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
// geometry.vertices.push(new THREE.Vector3(0, 10, 0));
// geometry.vertices.push(new THREE.Vector3(10, 0, 0));
// const line = new THREE.Line(geometry, material);
// scene.add(line);

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
sphere.position.x = 0;
sphere.position.z = 0;
sphere.lookAt(new THREE.Vector3(0, 0, 0));
scene.add( sphere );

var marker = new THREE.Mesh(new THREE.SphereGeometry(0.062, 4, 2), new THREE.MeshBasicMaterial({
  color: "red"
}));
scene.add(marker);

window.addEventListener("mousemove", onmousemove, false);

var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersectPoint = new THREE.Vector3();

function onmousemove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, intersectPoint);
  intersectPoint.z = 75;
  sphere.lookAt(intersectPoint);
  marker.position.copy(intersectPoint);
}

function animate() {
  requestAnimationFrame(animate);

  //sphere.rotation.x += 0.01;
  //sphere.rotation.y += 0.01;

  //controls.update();
  renderer.render(scene, camera);
}
animate();
