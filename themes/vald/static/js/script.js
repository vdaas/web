// initial sidebar
window.onload = () => {
  initSidebar();
}

(function() {

// hamburger menu
const $wrapper = document.getElementById('menu');
const $navBtn = document.getElementById('nav-btn');
const $ancorLink = document.querySelectorAll('a[href^="#"]');
$ancorLink.forEach(function(
    button) { button.addEventListener('click', navClose); });

$navBtn.addEventListener('click', navToggle);

function navToggle() {
  if ($wrapper.classList.contains('header__list--open')) {
    navClose();
  } else {
    navOpen();
  }
}

function navOpen() { $wrapper.classList.add('header__list--open'); }

function navClose() { $wrapper.classList.remove('header__list--open'); }

// toc toggle
const tocWrap = document.getElementById('current');
document.addEventListener('click', tocWrap, currentToggle);

function currentToggle() {
  if (tocWrap.classList.contains('open')) {
    tocClose();
  } else {
    tocOpen();
  }
}

function tocOpen() { tocWrap.classList.add('open'); }

function tocClose() { tocWrap.classList.remove('open'); }

// smooth scroll
const headerHight = document.getElementById('header').offsetHeight;

let smoothScroll = (target, offset) => {
  let toY;
  let nowY = window.pageYOffset;
  const divisor = 8;
  const range = (divisor / 2) + 1;

  const targetRect = target.getBoundingClientRect();
  const targetY = targetRect.top + nowY - offset;

  (function() {
    let thisFunc = arguments.callee;
    toY = nowY + Math.round((targetY - nowY) / divisor);
    window.scrollTo(0, toY);
    nowY = toY;

    if (document.body.clientHeight - window.innerHeight < toY) {
      window.scrollTo(0, document.body.clientHeight);
      return;
    }
    if (toY >= targetY + range || toY <= targetY - range) {
      window.setTimeout(thisFunc, 10);

    } else {
      window.scrollTo(0, targetY);
    }
  })();
};

const smoothOffset = headerHight;
const links = document.querySelectorAll('a[href*="#"]');
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function(e) {
    const href = e.currentTarget.getAttribute('href');
    const splitHref = href.split('#');
    const targetID = splitHref[1];
    const target = document.getElementById(targetID);

    if (target) {
      smoothScroll(target, smoothOffset);
    } else {
      return true;
    }
    return false;
  });
}
})();

// initialize sidebar style
const initSidebar = () => {
  const sidebar = document.getElementById('list-body');
  if (sidebar) {
    for (let child of sidebar.children) {
      let isOpen = false;
      let category = document.getElementById(child.id);
      const contents = category.getElementsByTagName('li');
      for (const link of category.getElementsByTagName('li')) {
        if (link.className === 'view') isOpen = !isOpen;
      }
      if (isOpen) {
        category.className = "withchild open"
      }
    }
  }
}

// toggle all by click
const toggleAll = () => {
  let sidebar = document.getElementById('list-body');
  if (sidebar) {
    if (sidebar.style.display.length > 0) {
      sidebar.style.display = '';
    } else if (sidebar.style.length === 0) {
      sidebar.style.display = 'none';
    }
  }
}

// toggle each category by click
const toggleSidebar = (id) => {
  let elem = document.getElementById(id);
  const className = elem.className;
  if (className.includes('open')) {
    elem.className = className.split(' ')[0];
  } else {
    elem.className += ' open';
  }
}
