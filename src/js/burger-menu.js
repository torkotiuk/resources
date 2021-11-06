document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

const initApp = e => {
  console.log('e initApp>>>', e);
  const menuBtn = document.querySelector('.nav__burger-btn');
  const list = document.querySelector('.nav__list');

  menuBtn.addEventListener('click', toggleButtonAndMenu);
  list.addEventListener('click', toggleButtonAndMenu);
};

const toggleButtonAndMenu = e => {
  console.log('e toggle>>>', e);
  const menuBtn = document.querySelector('.nav__burger-btn');
  const list = document.querySelector('.nav__list');

  menuBtn.classList.toggle('open');
  list.classList.toggle('open');
};
