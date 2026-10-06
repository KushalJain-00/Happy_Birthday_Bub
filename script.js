/* ===================================================
   Birthday Website — Interactivity
   =================================================== */

/**
 * ============================================
 *  GALLERY PHOTOS — EDIT THIS ARRAY TO ADD PHOTOS
 * ============================================
 *
 * To add your photos:
 * 1. Place image files in the photos/ folder
 * 2. Add entries to this array:
 *    { src: 'photos/filename.jpg', caption: 'Your caption' }
 * 3. The gallery will automatically display them!
 *
 * Example:
 *   { src: 'photos/us-at-beach.jpg', caption: 'Beach day 🏖️' },
 *   { src: 'photos/dinner-date.jpg', caption: 'Our favorite restaurant 🍕' },
 */
const GALLERY_PHOTOS = [
  { src: 'photos/WhatsApp%20Image%202026-10-06%20at%202.44.05%20AM%20(1).jpeg', caption: 'Love 💕' },
  { src: 'photos/WhatsApp%20Image%202026-10-06%20at%202.44.05%20AM%20(2).jpeg', caption: 'Us 🌟' },
  { src: 'photos/WhatsApp%20Image%202026-10-06%20at%202.44.05%20AM%20(3).jpeg', caption: 'Always smiling 😄' },
  { src: 'photos/WhatsApp%20Image%202026-10-06%20at%202.44.05%20AM.jpeg', caption: 'My favorite person 🩷' },
  { src: 'photos/WhatsApp%20Image%202026-10-06%20at%202.44.06%20AM%20(1).jpeg', caption: 'Adventures together 🌈' },
  { src: 'photos/WhatsApp%20Image%202026-10-06%20at%202.44.06%20AM%20(2).jpeg', caption: 'Making memories 📸' },
  { src: 'photos/WhatsApp%20Image%202026-10-06%20at%202.44.06%20AM%20(3).jpeg', caption: 'Happy days 🌞' },
  { src: 'photos/WhatsApp%20Image%202026-10-06%20at%202.44.06%20AM%20(4).jpeg', caption: 'The best moments 🥳' },
  { src: 'photos/WhatsApp%20Image%202026-10-06%20at%202.44.06%20AM.jpeg', caption: 'You and me ✨' },
  { src: 'photos/WhatsApp%20Image%202026-10-06%20at%202.45.23%20AM.jpeg', caption: 'Forever 💖' },
];

/* ===================================================
   SLIDE NAVIGATION
   =================================================== */

const slides = document.querySelectorAll('.slide');
let currentSlide = 'slide-1';

function showSlide(targetId) {
  const current = document.getElementById(currentSlide);
  const target = document.getElementById(targetId);

  if (!current || !target || currentSlide === targetId) return;

  // Exit current
  current.classList.add('slide-exit');
  current.classList.remove('active');

  // After transition, clean up
  setTimeout(() => {
    current.classList.remove('slide-exit');
  }, 600);

  // Enter target
  setTimeout(() => {
    target.classList.add('active');
    currentSlide = targetId;

    // Trigger special effects for specific slides
    if (targetId === 'slide-4') {
      startConfetti('confetti-container');
    }
    if (targetId === 'slide-6') {
      populateGallery();
    }
    if (targetId === 'slide-8') {
      startConfetti('confetti-final');
    }
    if (targetId === 'slide-3') {
      checkProgression();
    }
  }, 150);
}

/* ===================================================
   BUTTON HANDLERS
   =================================================== */

// Slide 1: YES button → Go to slide 3 (choose penguin)
document.getElementById('btn-yes').addEventListener('click', () => {
  showSlide('slide-3');
});

// Slide 1: NO button → Go to slide 2 (why did you click no)
document.getElementById('btn-no').addEventListener('click', () => {
  showSlide('slide-2');
});

// Slide 2: TRY AGAIN → Back to slide 1
document.getElementById('btn-try-again').addEventListener('click', () => {
  showSlide('slide-1');
});

// Progress Tracking
let visited1 = false;
let visited2 = false;
let visited3 = false;

function checkProgression() {
  if (visited1 && visited2 && visited3) {
    const nextBtn = document.getElementById('btn-next-final');
    if (nextBtn && nextBtn.classList.contains('hidden-btn')) {
      nextBtn.classList.remove('hidden-btn');
      nextBtn.classList.add('fade-in');
    }
  }
}

// Slide 3: Penguin 1 (Wish/Celebration)
document.getElementById('btn-penguin-1').addEventListener('click', () => {
  visited1 = true;
  const btn = document.getElementById('btn-penguin-1');
  btn.style.animation = 'penguinBounce 0.3s ease-out';
  setTimeout(() => showSlide('slide-4'), 300);
});

// Slide 3: Penguin 2 (Memories Gallery)
document.getElementById('btn-penguin-2').addEventListener('click', () => {
  visited2 = true;
  const btn = document.getElementById('btn-penguin-2');
  btn.style.animation = 'penguinBounce 0.3s ease-out';
  setTimeout(() => showSlide('slide-6'), 300);
});

// Slide 3: Penguin 3 (Voice Note)
document.getElementById('btn-penguin-3').addEventListener('click', () => {
  visited3 = true;
  const btn = document.getElementById('btn-penguin-3');
  btn.style.animation = 'penguinBounce 0.3s ease-out';
  setTimeout(() => showSlide('slide-7'), 300);
});

// Slide 3: Next Surprise
const nextFinalBtn = document.getElementById('btn-next-final');
if (nextFinalBtn) {
  nextFinalBtn.addEventListener('click', () => {
    showSlide('slide-8');
  });
}

// Slide 4: CLICK ME → Go to slide 5 (birthday message)
document.getElementById('btn-click-me').addEventListener('click', () => {
  showSlide('slide-5');
});

// Slide 5: Back to Penguins
document.getElementById('btn-back-to-penguins-from-msg').addEventListener('click', () => {
  showSlide('slide-3');
});

// Slide 6: Back to Penguins
document.getElementById('btn-back-to-penguins-from-gallery').addEventListener('click', () => {
  showSlide('slide-3');
});

// Slide 7: Back to Penguins (and pause audio)
document.getElementById('btn-back-to-penguins-from-voice').addEventListener('click', () => {
  const audio = document.getElementById('voice-note');
  if (audio) audio.pause();
  showSlide('slide-3');
});

/* ===================================================
   CONFETTI SYSTEM
   =================================================== */

function startConfetti(containerId = 'confetti-container') {
  const container = document.getElementById(containerId);
  if (!container || container.children.length > 0) return;
  const colors = [
    '#ff6b9d', '#c44dff', '#6ec6ff', '#ffd93d',
    '#ff91a4', '#b8e6b8', '#ffb74d', '#e1bee7',
    '#ffcdd2', '#bbdefb', '#c8e6c9', '#fff9c4'
  ];
  const shapes = ['circle', 'square', 'strip'];

  function createConfetti() {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');

    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = Math.random() * 8 + 5;
    const left = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 0.5;

    piece.style.left = `${left}%`;
    piece.style.width = `${size}px`;
    piece.style.height = shape === 'strip' ? `${size * 2.5}px` : `${size}px`;
    piece.style.backgroundColor = color;
    piece.style.borderRadius = shape === 'circle' ? '50%' : shape === 'strip' ? '2px' : '2px';
    piece.style.animationDuration = `${duration}s`;
    piece.style.animationDelay = `${delay}s`;

    container.appendChild(piece);

    // Remove after animation
    setTimeout(() => {
      piece.remove();
    }, (duration + delay) * 1000 + 500);
  }

  // Initial burst
  for (let i = 0; i < 50; i++) {
    setTimeout(createConfetti, i * 50);
  }

  // Continuous light confetti
  const confettiInterval = setInterval(() => {
    if (currentSlide !== 'slide-4') {
      clearInterval(confettiInterval);
      return;
    }
    for (let i = 0; i < 3; i++) {
      createConfetti();
    }
  }, 400);
}

/* ===================================================
   GALLERY SYSTEM
   =================================================== */

let galleryPopulated = false;

function populateGallery() {
  if (galleryPopulated || GALLERY_PHOTOS.length === 0) return;
  galleryPopulated = true;

  const grid = document.getElementById('gallery-grid');

  // Remove placeholders if we have real photos
  const placeholders = grid.querySelectorAll('.placeholder-item');
  placeholders.forEach((p) => p.remove());

  // Add real photos
  GALLERY_PHOTOS.forEach((photo) => {
    const item = document.createElement('div');
    item.classList.add('gallery-item');

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.caption || 'Gallery photo';
    img.loading = 'lazy';

    const caption = document.createElement('div');
    caption.classList.add('gallery-caption');
    caption.textContent = photo.caption || '';

    item.appendChild(img);
    if (photo.caption) {
      item.appendChild(caption);
    }

    grid.appendChild(item);
  });

  // Re-attach lightbox listeners
  attachGalleryListeners();
}

/* ===================================================
   LIGHTBOX
   =================================================== */

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let lightboxImages = [];
let lightboxIndex = 0;

function attachGalleryListeners() {
  const items = document.querySelectorAll('.gallery-item:not(.placeholder-item)');
  lightboxImages = [];

  items.forEach((item, index) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption');

    if (img) {
      lightboxImages.push({
        src: img.src,
        caption: caption ? caption.textContent : '',
      });

      item.addEventListener('click', () => {
        openLightbox(index);
      });
    }
  });
}

function openLightbox(index) {
  if (lightboxImages.length === 0) return;

  lightboxIndex = index;
  updateLightboxImage();

  lightbox.removeAttribute('hidden');
  // Force reflow for transition
  void lightbox.offsetWidth;
  lightbox.classList.add('open');

  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  setTimeout(() => {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }, 300);
}

function updateLightboxImage() {
  const img = lightboxImages[lightboxIndex];
  if (!img) return;

  lightboxImg.src = img.src;
  lightboxImg.alt = img.caption || 'Gallery photo';
  lightboxCaption.textContent = img.caption || '';

  // Hide nav if only one image
  lightboxPrev.style.display = lightboxImages.length <= 1 ? 'none' : '';
  lightboxNext.style.display = lightboxImages.length <= 1 ? 'none' : '';
}

function nextLightboxImage() {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  updateLightboxImage();
}

function prevLightboxImage() {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  updateLightboxImage();
}

// Lightbox event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextLightboxImage);
lightboxPrev.addEventListener('click', prevLightboxImage);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextLightboxImage();
  if (e.key === 'ArrowLeft') prevLightboxImage();
});

/* ===================================================
   INITIALIZATION
   =================================================== */

// Attach gallery listeners on load (for any pre-existing images)
document.addEventListener('DOMContentLoaded', () => {
  attachGalleryListeners();
});
