gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("cyber-intro");
const context = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;


const frameCount = 180;


const currentFrame = index => (
  `BgImage/male${(index + 1).toString().padStart(4, '0')}.png`
);

const images = [];
let imagesLoaded = 0;

const cyberfiction = {
  frame: 0
};

// PRELOAD
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);

  img.onload = () => {
    imagesLoaded++;

    // quando tutte le immagini sono cariche → start
    if (imagesLoaded === frameCount) {
      startAnimation();
    }
  };

  images.push(img);
}

// 🚀 START ANIMAZIONE SOLO DOPO PRELOAD
function startAnimation() {

  render(); // primo frame

  gsap.to(cyberfiction, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 1.5
    },
    onUpdate: render
  });
}

// 🔥 OTTIMIZZAZIONE RENDER (no redraw inutili)
let lastFrame = -1;

function render() {
  if (cyberfiction.frame === lastFrame) return;

  lastFrame = cyberfiction.frame;

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.drawImage(
    images[cyberfiction.frame],
    0,
    0,
    canvas.width,
    canvas.height
  );
}
