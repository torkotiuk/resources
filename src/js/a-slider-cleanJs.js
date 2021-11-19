const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;

// arrange slides one to another
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

// move to the next slide
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
};

const hideOrShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
};

nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;

  // --- refactor to "moveToSlide" fn
  // const amountToMove = nextSlide.style.left;
  // move to the next slide
  // track.style.transform = 'translateX(-' + amountToMove + ')';
  // currentSlide.classList.remove('current-slide');
  // nextSlide.classList.add('current-slide');

  moveToSlide(track, currentSlide, nextSlide);

  // move dots
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  updateDots(currentDot, nextDot);

  // showOrHide arrows
  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  hideOrShowArrows(slides, prevButton, nextButton, nextIndex);
});

prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;

  moveToSlide(track, currentSlide, prevSlide);

  // move dots
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  updateDots(currentDot, prevDot);

  // showOrHide arrows
  const prevIndex = slides.findIndex(slide => slide === prevSlide);
  hideOrShowArrows(slides, prevButton, nextButton, prevIndex);
});

// carousel__nav
dotsNav.addEventListener('click', e => {
  const targetDot = e.target.closest('button');

  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);

  updateDots(currentDot, targetDot);

  hideOrShowArrows(slides, prevButton, nextButton, targetIndex);
});
