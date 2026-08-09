const stage = document.querySelector('.swipe-page');
const slides = document.querySelector('.slides');

if (stage && slides) {
  let current = 0;
  let startY = 0;
  let tracking = false;
  let wheelLocked = false;

  const choiceImage = stage.querySelector('.slide:first-child .artboard');
  const choiceLinks = [...stage.querySelectorAll('.answer')];
  const resultImage = stage.querySelector('.slide:nth-child(2) .artboard');
  const resultChoices = [...stage.querySelectorAll('.result-choice')];
  const nextImage = stage.querySelector('.slide:nth-child(3) .artboard');
  const nextChoices = [...stage.querySelectorAll('.next-choice')];
  const fourthImage = stage.querySelector('.slide:nth-child(4) .artboard');
  const fourthChoices = [...stage.querySelectorAll('.fourth-choice')];
  const fifthImage = stage.querySelector('.slide:nth-child(5) .artboard');
  const fifthChoices = [...stage.querySelectorAll('.fifth-choice')];
  const resultLink = stage.querySelector('.result-link');
  const personalityImage = stage.querySelector('.slide:nth-child(6) .artboard');
  const retryLink = stage.querySelector('.retry-link');
  const backLink = stage.querySelector('.back-link');
  const answers = [null, null, null, null, null];

  const show = (index) => {
    const next = Math.max(0, Math.min(5, index));
    if (next === current) return;
    current = next;
    slides.classList.toggle('is-result', current === 1);
    slides.classList.toggle('is-next', current === 2);
    slides.classList.toggle('is-fourth', current === 3);
    slides.classList.toggle('is-fifth', current === 4);
    slides.classList.toggle('is-personality', current === 5);
    stage.classList.toggle('showing-personality', current === 5);
  };

  choiceLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const imageName = link.dataset.image;
      if (!imageName || !choiceImage) return;

      const nextSrc = `./assets/svg/${imageName}.svg`;
      choiceImage.src = nextSrc;
      choiceImage.alt = `${link.getAttribute('aria-label')} 结果`;
      choiceLinks.forEach((item) => item.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'true');
      answers[0] = link.dataset.answer;
      document.title = '干饭人格 MBTI 测试';
      show(0);
    });
  });

  resultChoices.forEach((choice) => {
    choice.addEventListener('click', (event) => {
      event.preventDefault();
      const imageName = choice.dataset.image;
      if (!imageName || !resultImage) return;

      const nextSrc = `./assets/svg/${imageName}.svg`;
      resultImage.src = nextSrc;
      resultChoices.forEach((item) => item.removeAttribute('aria-current'));
      choice.setAttribute('aria-current', 'true');
      answers[1] = choice.dataset.answer;
    });
  });

  nextChoices.forEach((choice) => {
    choice.addEventListener('click', (event) => {
      event.preventDefault();
      const imageName = choice.dataset.image;
      if (!imageName || !nextImage) return;

      nextImage.src = `./assets/svg/${imageName}.svg`;
      nextChoices.forEach((item) => item.removeAttribute('aria-current'));
      choice.setAttribute('aria-current', 'true');
      answers[2] = choice.dataset.answer;
    });
  });

  fourthChoices.forEach((choice) => {
    choice.addEventListener('click', (event) => {
      event.preventDefault();
      const imageName = choice.dataset.image;
      if (!imageName || !fourthImage) return;

      fourthImage.src = `./assets/svg/${imageName}.svg`;
      fourthChoices.forEach((item) => item.removeAttribute('aria-current'));
      choice.setAttribute('aria-current', 'true');
      answers[3] = choice.dataset.answer;
    });
  });

  fifthChoices.forEach((choice) => {
    choice.addEventListener('click', (event) => {
      event.preventDefault();
      const imageName = choice.dataset.image;
      if (!imageName || !fifthImage) return;

      fifthImage.src = `./assets/svg/${imageName}.svg`;
      fifthChoices.forEach((item) => item.removeAttribute('aria-current'));
      choice.setAttribute('aria-current', 'true');
      answers[4] = choice.dataset.answer;
    });
  });

  resultLink?.addEventListener('click', (event) => {
    event.preventDefault();
    if (answers.some((answer) => !answer) || !personalityImage) return;

    const counts = answers.reduce((result, answer) => {
      result[answer] += 1;
      return result;
    }, { A: 0, B: 0, C: 0, D: 0 });

    const winner = Object.keys(counts).find((answer) => counts[answer] >= 3);
    const resultImages = {
      A: './assets/images/result-crispy-pork.png',
      B: './assets/images/result-chili.png',
      C: './assets/images/result-taro-roll.png',
      D: './assets/images/result-oyster.png',
      balanced: './assets/images/result-shrimp.png',
    };

    personalityImage.src = resultImages[winner || 'balanced'];
    show(5);
  });

  retryLink?.addEventListener('click', (event) => {
    event.preventDefault();
    const destination = retryLink.getAttribute('href') || './index.html';
    stage.classList.add('is-leaving');
    window.setTimeout(() => {
      window.location.href = destination;
    }, 460);
  });

  backLink?.addEventListener('click', (event) => {
    event.preventDefault();
    if (current > 0) {
      show(current - 1);
      return;
    }
    const destination = backLink.getAttribute('href') || './index.html';
    stage.classList.add('is-leaving');
    window.setTimeout(() => {
      window.location.href = destination;
    }, 460);
  });

  stage.addEventListener('pointerdown', (event) => {
    if (current === 5) return;
    if (event.target.closest('a')) return;
    tracking = true;
    startY = event.clientY;
    stage.setPointerCapture(event.pointerId);
  });

  stage.addEventListener('pointerup', (event) => {
    if (!tracking) return;
    tracking = false;
    const distance = event.clientY - startY;
    if (distance < -45) show(current + 1);
    if (distance > 45) show(current - 1);
  });

  stage.addEventListener('pointercancel', () => {
    tracking = false;
  });

  stage.addEventListener('wheel', (event) => {
    if (current === 5) return;
    event.preventDefault();
    if (wheelLocked || Math.abs(event.deltaY) < 8) return;
    show(current + (event.deltaY > 0 ? 1 : -1));
    wheelLocked = true;
    window.setTimeout(() => { wheelLocked = false; }, 700);
  }, { passive: false });

  window.addEventListener('keydown', (event) => {
    if (['ArrowDown', 'PageDown', ' '].includes(event.key)) show(current + 1);
    if (['ArrowUp', 'PageUp'].includes(event.key)) show(current - 1);
  });
}
