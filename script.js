document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  // 2. Dark / Light Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('meta_theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('meta_theme', isDark ? 'dark' : 'light');
      themeToggle.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    });
  }

  // 3. Animated Counters
  const counters = document.querySelectorAll('.counter');
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1600;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + (target === 87 ? '%' : '+');
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  };
  animateCounters();

  // 4. Course Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Select Course Button -> Scroll to Form & Auto-select
  const selectCourseBtns = document.querySelectorAll('.select-course-btn');
  const courseSelect = document.getElementById('courseSelect');
  const registerSection = document.getElementById('register');

  selectCourseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const chosenCourse = btn.getAttribute('data-course');
      if (courseSelect) {
        courseSelect.value = chosenCourse;
      }
      if (registerSection) {
        registerSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 6. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // 7. Registration Form Submission
  const registerForm = document.getElementById('registerForm');
  const formSuccess = document.getElementById('formSuccess');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formSuccess) {
        formSuccess.classList.add('show');
      }
      registerForm.reset();
      setTimeout(() => {
        if (formSuccess) formSuccess.classList.remove('show');
      }, 5000);
    });
  }
});
