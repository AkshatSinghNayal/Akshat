let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
};

const sr = ScrollReveal({
  distance: '60px',
  duration: 2500,
  reset: true,
});

sr.reveal('.home-text', { delay: 200, origin: 'top' });
sr.reveal('.home-img', { delay: 400, origin: 'top' });
sr.reveal('.about, .cta, .resume, .contact, .footer', { delay: 200, origin: 'top' });

const typedGreetingEl = document.querySelector('#typed-greeting');
const typedNameEl = document.querySelector('#typed-name');
const typedTextEl = document.querySelector('#typed-text');
const typingLineContainer = document.querySelector('.typing-line');
const greetingText = "Hello, I'm";
const nameText = 'Akshat Singh Nayal';
const typingSentence = 'an aspiring Software Development Engineer focused on AI-driven backend systems, scalable APIs, and real-world problem solving.';
const highlightedRole = 'Software Development Engineer';

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderTypedSentence(visibleText) {
  if (!typedTextEl) return;

  const roleStart = typingSentence.indexOf(highlightedRole);

  if (roleStart === -1) {
    typedTextEl.textContent = visibleText;
    return;
  }

  const roleEnd = roleStart + highlightedRole.length;
  const visibleLength = visibleText.length;

  const before = visibleText.slice(0, Math.min(visibleLength, roleStart));
  const highlighted = visibleText.slice(Math.min(visibleLength, roleStart), Math.min(visibleLength, roleEnd));
  const after = visibleText.slice(Math.min(visibleLength, roleEnd));

  typedTextEl.innerHTML = `${escapeHtml(before)}<span class="typed-highlight">${escapeHtml(highlighted)}</span>${escapeHtml(after)}`;
}

function startIntroTypingOnce(onComplete) {
  if (!typedGreetingEl || !typedNameEl) {
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedGreetingEl.textContent = greetingText;
    typedNameEl.textContent = nameText;
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  let greetingIndex = 0;
  let nameIndex = 0;

  const typeName = () => {
    typedNameEl.textContent = nameText.substring(0, nameIndex);

    if (nameIndex < nameText.length) {
      nameIndex += 1;
      setTimeout(typeName, 55);
      return;
    }

    if (typeof onComplete === 'function') onComplete();
  };

  const typeGreeting = () => {
    typedGreetingEl.textContent = greetingText.substring(0, greetingIndex);

    if (greetingIndex < greetingText.length) {
      greetingIndex += 1;
      setTimeout(typeGreeting, 65);
      return;
    }

    setTimeout(typeName, 120);
  };

  typeGreeting();
}

function setTypingLineHeight() {
  if (!typedTextEl || !typingLineContainer) return;

  const currentText = typedTextEl.textContent;
  renderTypedSentence(typingSentence);
  typingLineContainer.style.minHeight = `${Math.ceil(typingLineContainer.getBoundingClientRect().height)}px`;
  renderTypedSentence(currentText);
}

function startTypingEffect() {
  if (!typedTextEl) return;

  setTypingLineHeight();
  window.addEventListener('resize', setTypingLineHeight);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    renderTypedSentence(typingSentence);
    return;
  }

  let charIndex = 0;
  let deleting = false;

  const type = () => {
    renderTypedSentence(typingSentence.substring(0, charIndex));

    if (!deleting && charIndex < typingSentence.length) {
      charIndex += 1;
      setTimeout(type, 55);
      return;
    }

    if (!deleting && charIndex === typingSentence.length) {
      deleting = true;
      setTimeout(type, 1400);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(type, 25);
      return;
    }

    deleting = false;
    setTimeout(type, 350);
  };

  type();
}

startIntroTypingOnce(startTypingEffect);
