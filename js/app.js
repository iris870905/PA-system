/**
 * Performance Appraisal Portal - Core Application Logic
 * Modular, clean, modern ES6+ vanilla script.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCountdown();
  initChecklist();
  initModalViewer();
  initFaqAccordion();
  initCopyLink();
  initNavbarScroll();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check persisted or system preference
  const savedTheme = localStorage.getItem('pa_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('pa_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeIcon) themeIcon.textContent = '🌙';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) themeIcon.textContent = '☀️';
    }
  }
}

/* ==========================================================================
   2. Deadline Countdown Timer
   Target: 2026-11-30 23:59:59 (子公司績效考核截止日)
   ========================================================================== */
function initCountdown() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minutesEl = document.getElementById('count-minutes');
  const secondsEl = document.getElementById('count-seconds');

  if (!daysEl) return;

  // Set target date: 2026/11/30 23:59:59
  const targetDate = new Date('2026-11-30T23:59:59').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   3. Interactive Readiness Checklist
   ========================================================================== */
function initChecklist() {
  const checklistItems = document.querySelectorAll('.check-item');
  const progressFill = document.getElementById('checklist-progress-fill');
  const progressPercentText = document.getElementById('checklist-percent-text');
  const checklistStatus = document.getElementById('checklist-status');
  const checklistCtaBtn = document.getElementById('checklist-cta-btn');

  if (!checklistItems.length) return;

  checklistItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('completed');
      const checkbox = item.querySelector('.custom-checkbox');
      const isChecked = item.classList.contains('completed');
      
      if (checkbox) {
        checkbox.innerHTML = isChecked ? '✓' : '';
      }

      updateChecklistProgress();
    });
  });

  function updateChecklistProgress() {
    const total = checklistItems.length;
    const completedCount = document.querySelectorAll('.check-item.completed').length;
    const percent = Math.round((completedCount / total) * 100);

    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressPercentText) progressPercentText.textContent = `${percent}%`;

    if (percent === 100) {
      if (checklistStatus) {
        checklistStatus.textContent = '🎉 太棒了！您已備妥所有自評資訊，可以信心滿滿地填寫表單！';
        checklistStatus.classList.add('ready');
      }
      if (checklistCtaBtn) {
        checklistCtaBtn.classList.remove('btn-secondary');
        checklistCtaBtn.classList.add('btn-primary');
        checklistCtaBtn.innerHTML = `<span>立即前往填寫自評表</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      }
      showToast('準備度 100%！已解鎖填寫考核自評通道');
    } else {
      if (checklistStatus) {
        checklistStatus.textContent = `已準備 ${completedCount} / ${total} 項，建議勾選完成後再進行填寫`;
        checklistStatus.classList.remove('ready');
      }
      if (checklistCtaBtn) {
        checklistCtaBtn.classList.remove('btn-primary');
        checklistCtaBtn.classList.add('btn-secondary');
      }
    }
  }
}

/* ==========================================================================
   4. SurveyCake Modal Viewer
   ========================================================================== */
function initModalViewer() {
  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  const closeModalBtns = document.querySelectorAll('[data-close-modal]');
  const modalOverlay = document.getElementById('survey-modal');
  const iframeLoader = document.getElementById('iframe-loader');
  const surveyIframe = document.getElementById('survey-iframe');

  if (!modalOverlay) return;

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Lazy load iframe content if not loaded yet
    if (surveyIframe && !surveyIframe.src) {
      if (iframeLoader) iframeLoader.style.display = 'flex';
      surveyIframe.src = 'https://www.surveycake.com/s/w3r4q';
      
      surveyIframe.onload = () => {
        if (iframeLoader) {
          iframeLoader.style.opacity = '0';
          setTimeout(() => {
            iframeLoader.style.display = 'none';
          }, 300);
        }
      };
    }
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   5. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close other opened items for a clean accordion effect
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('open')) {
            otherItem.classList.remove('open');
            otherItem.querySelector('.faq-content').style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          content.style.maxHeight = null;
        } else {
          item.classList.add('open');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });
}

/* ==========================================================================
   6. Copy Link & Toast Notification
   ========================================================================== */
function initCopyLink() {
  const copyBtn = document.getElementById('copy-link-btn');
  const linkInput = document.getElementById('survey-link-input');

  if (copyBtn && linkInput) {
    copyBtn.addEventListener('click', () => {
      linkInput.select();
      navigator.clipboard.writeText(linkInput.value).then(() => {
        showToast('🔗 問卷連結已複製至剪貼簿！');
        copyBtn.textContent = '已複製！';
        setTimeout(() => {
          copyBtn.textContent = '複製連結';
        }, 2200);
      }).catch(() => {
        // Fallback
        document.execCommand('copy');
        showToast('🔗 問卷連結已複製！');
      });
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ==========================================================================
   7. Navbar Scroll State & Smooth Active Indicator
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scrollspy indicator
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}
