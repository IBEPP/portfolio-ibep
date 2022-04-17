const buttonChangePage = document.getElementById("button");
const body = document.querySelector("body");
const div = document.querySelector(".text-box");
// const index2 = document.querySelector(".test");
const test = document.querySelector(".zoom-in-out-box");
const homePage = document.querySelector(".home-page");

buttonChangePage.addEventListener("click", function () {
  body.classList.add("zoom-in-out-box");
  // remove(body);
  div.remove();
  renderer(homePage);
  // renderer(index2);

  let scene, camera, renderer, star, stars, starGeo;

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    starGeo = new THREE.Geometry();
    for (let i = 0; i < 6000; i++) {
      star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
      star.velocity = 0;
      star.acceleration = 0.02;
      starGeo.vertices.push(star);
    }

    // let sprite = new THREE.TextureLoader().load("star.png");
    let starMaterial = new THREE.PointsMaterial({
      color: "gold",
      size: 1.0,
      // map: sprite,
    });

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    window.addEventListener("resize", onWindowResize, false);

    animate();
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  function animate() {
    starGeo.vertices.forEach((p) => {
      p.velocity += p.acceleration;
      p.y -= p.velocity;

      if (p.y < -200) {
        p.y = 200;
        p.velocity = 0;
      }
    });
    starGeo.verticesNeedUpdate = true;
    stars.rotation.y += 0.002;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  init();
});

// window.transitionToPage = function (href) {
//   document.querySelector("body").style.opacity = 0;
//   setTimeout(function () {
//     window.location.href = href;
//   }, 500);
// };

// document.addEventListener("DOMContentLoaded", function (event) {
//   document.querySelector("body").style.opacity = 1;
// });
