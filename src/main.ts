import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const paddleGeometry = new THREE.BoxGeometry(1, 0.2, 0.2);
const paddleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const leftPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
const rightPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
scene.add(leftPaddle);
scene.add(rightPaddle);
leftPaddle.position.x = -4;
rightPaddle.position.x = 4;

const firemanGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const firemanMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const fireman = new THREE.Mesh(firemanGeometry, firemanMaterial);
scene.add(fireman);
fireman.position.y = 2;

const people: THREE.Mesh[] = [];
const peopleGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const peopleMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });

for (let i = 0; i < 3; i++) {
    const person = new THREE.Mesh(peopleGeometry, peopleMaterial);
    scene.add(person);
    people.push(person);
    person.position.set(Math.random() * 8 - 4, Math.random() * 4 - 2, 0);
}

camera.position.z = 5;

let leftPaddleDirection = 0;
let rightPaddleDirection = 0;
let firemanDirection = 1;
let speed = 0.02;

document.addEventListener('keydown', (event) => {
    if (event.key === 'a') leftPaddleDirection = -1;
    if (event.key === 'd') leftPaddleDirection = 1;
    if (event.key === 'j') rightPaddleDirection = -1;
    if (event.key === 'l') rightPaddleDirection = 1;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'a' || event.key === 'd') leftPaddleDirection = 0;
    if (event.key === 'j' || event.key === 'l') rightPaddleDirection = 0;
});

function animate() {
    requestAnimationFrame(animate);

    leftPaddle.position.x += leftPaddleDirection * speed;
    rightPaddle.position.x += rightPaddleDirection * speed;

    fireman.position.y += firemanDirection * speed;
    if (fireman.position.y > 2 || fireman.position.y < -2) firemanDirection *= -1;

    for (const person of people) {
        person.position.y -= speed;
        if (person.position.y < -2) person.position.y = 2;
        if (person.position.distanceTo(leftPaddle.position) < 0.5 || person.position.distanceTo(rightPaddle.position) < 0.5) {
            person.position.y = 2;
        }
    }

    renderer.render(scene, camera);
}

animate();
