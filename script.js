// --- Cookie Banner ---
const cookieBanner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('accept-cookies');

window.addEventListener('load', () => {
  if(localStorage.getItem('cookiesAccepted') === 'true'){
    cookieBanner.style.display = 'none';
  }
});

acceptBtn.addEventListener('click', () => {
  cookieBanner.style.display = 'none';
  localStorage.setItem('cookiesAccepted', 'true');
});

// --- Futuristischer Partikel-Hintergrund ---
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Partikel-Setup
const particles = [];
const numParticles = 80;
for(let i=0; i<numParticles; i++){
  particles.push({
    x: Math.random()*width,
    y: Math.random()*height,
    vx: (Math.random()-0.5)*0.5,
    vy: (Math.random()-0.5)*0.5,
    size: Math.random()*2 + 1,
    alpha: Math.random()*0.5 + 0.3
  });
}

function draw() {
  ctx.fillStyle = 'rgba(13,13,13,0.3)';
  ctx.fillRect(0,0,width,height);

  // Linien zwischen Partikeln
  for(let i=0; i<particles.length; i++){
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

    if(p.x < 0 || p.x > width) p.vx *= -1;
    if(p.y < 0 || p.y > height) p.vy *= -1;

    ctx.fillStyle = `rgba(0,255,255,${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
    ctx.fill();

    // Linien
    for(let j=i+1; j<particles.length; j++){
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 150){
        ctx.strokeStyle = `rgba(0,255,255,${0.1})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}
draw();
