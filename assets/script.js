// ============ NAVBAR: scroll shadow + mobile menu ============
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ============ FADE-UP ON SCROLL ============
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ============ GALLERY LIGHTBOX ============
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  let currentIdx = 0;

  if (galleryItems.length && lightbox) {
    const openLightbox = (idx) => {
      currentIdx = idx;
      lbImg.src = galleryItems[idx].dataset.src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };
    const showNext = () => {
      currentIdx = (currentIdx + 1) % galleryItems.length;
      lbImg.src = galleryItems[currentIdx].dataset.src;
    };
    const showPrev = () => {
      currentIdx = (currentIdx - 1 + galleryItems.length) % galleryItems.length;
      lbImg.src = galleryItems[currentIdx].dataset.src;
    };

    galleryItems.forEach((item, idx) => {
      item.addEventListener('click', () => openLightbox(idx));
    });
    lbClose.addEventListener('click', closeLightbox);
    lbNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    lbPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  }

  // ============ CONTACT FORM (Web3Forms AJAX submission) ============
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const submitBtn = document.getElementById('submitBtn');
    const formResult = document.getElementById('formResult');
    const defaultResultHTML = formResult ? formResult.innerHTML : '';

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const payload = Object.fromEntries(formData);
      const json = JSON.stringify(payload);

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      if (formResult) {
        formResult.textContent = '';
        formResult.style.color = '';
      }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      })
        .then(async (response) => {
          const result = await response.json();
          if (response.status === 200) {
            if (formResult) {
              formResult.textContent = 'Thank you — your inquiry has been sent. We will get back to you shortly.';
              formResult.style.color = 'var(--success)';
            }
            contactForm.reset();
          } else {
            if (formResult) {
              formResult.textContent = result.message || 'Something went wrong. Please email us directly.';
              formResult.style.color = '#e05252';
            }
          }
        })
        .catch(() => {
          if (formResult) {
            formResult.textContent = 'Could not send — please email us directly at sales@subhasiniengg.com.';
            formResult.style.color = '#e05252';
          }
        })
        .then(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Inquiry';
          if (formResult) {
            setTimeout(() => {
              formResult.innerHTML = defaultResultHTML;
              formResult.style.color = '';
            }, 8000);
          }
        });
    });
  }
});
