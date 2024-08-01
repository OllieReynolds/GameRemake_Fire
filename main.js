"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __importStar(require("three"));
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var paddleGeometry = new THREE.BoxGeometry(1, 0.2, 0.2);
var paddleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var leftPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
var rightPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
scene.add(leftPaddle);
scene.add(rightPaddle);
leftPaddle.position.x = -4;
rightPaddle.position.x = 4;
var firemanGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
var firemanMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var fireman = new THREE.Mesh(firemanGeometry, firemanMaterial);
scene.add(fireman);
fireman.position.y = 2;
var people = [];
var peopleGeometry = new THREE.SphereGeometry(0.1, 32, 32);
var peopleMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
for (var i = 0; i < 3; i++) {
    var person = new THREE.Mesh(peopleGeometry, peopleMaterial);
    scene.add(person);
    people.push(person);
    person.position.set(Math.random() * 8 - 4, Math.random() * 4 - 2, 0);
}
camera.position.z = 5;
var leftPaddleDirection = 0;
var rightPaddleDirection = 0;
var firemanDirection = 1;
var speed = 0.02;
document.addEventListener('keydown', function (event) {
    if (event.key === 'a')
        leftPaddleDirection = -1;
    if (event.key === 'd')
        leftPaddleDirection = 1;
    if (event.key === 'j')
        rightPaddleDirection = -1;
    if (event.key === 'l')
        rightPaddleDirection = 1;
});
document.addEventListener('keyup', function (event) {
    if (event.key === 'a' || event.key === 'd')
        leftPaddleDirection = 0;
    if (event.key === 'j' || event.key === 'l')
        rightPaddleDirection = 0;
});
function animate() {
    requestAnimationFrame(animate);
    leftPaddle.position.x += leftPaddleDirection * speed;
    rightPaddle.position.x += rightPaddleDirection * speed;
    fireman.position.y += firemanDirection * speed;
    if (fireman.position.y > 2 || fireman.position.y < -2)
        firemanDirection *= -1;
    for (var _i = 0, people_1 = people; _i < people_1.length; _i++) {
        var person = people_1[_i];
        person.position.y -= speed;
        if (person.position.y < -2)
            person.position.y = 2;
        if (person.position.distanceTo(leftPaddle.position) < 0.5 || person.position.distanceTo(rightPaddle.position) < 0.5) {
            person.position.y = 2;
        }
    }
    renderer.render(scene, camera);
}
animate();
