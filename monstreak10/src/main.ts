import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="monstreak-layout">
<div class="monstreak-header">
</div class="monstreak-main">
  <div class="slider">
    <div class="slides">
      <section id="slide1" class="slide"></section>
      <section id="slide2" class="slide"></section>
      <section id="slide3" class="slide"></section>
    </div>

    <div class="bullets">
      <span data-index="0" class="bullet active"></span>
      <span data-index="1" class="bullet"></span>
      <span data-index="2" class="bullet"></span>
    </div>
    
  </div>
    <div class="monstreak-footer">
</div>
</div>
`

const bullets = document.querySelectorAll<HTMLSpanElement>('.bullet');
const slides = document.querySelector('.slides') as HTMLElement;
let currentSlide = 0;

function goToSlide(index: number): void {
  currentSlide = index;
  slides.style.transform = `translateY(-${index * 100}vh)`;

  bullets.forEach((b, i) => {
    b.classList.toggle('active', i === index);
  });
}

bullets.forEach((bullet) => {
  bullet.addEventListener('click', () => {
    const index = parseInt(bullet.dataset.index || '0');
    goToSlide(index);
  });
});

window.addEventListener('wheel', (e: WheelEvent) => {
  if (e.deltaY > 0 && currentSlide < 2) {
    goToSlide(currentSlide + 1);
  } else if (e.deltaY < 0 && currentSlide > 0) {
    goToSlide(currentSlide - 1);
  }
});
