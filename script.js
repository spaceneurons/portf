(function() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '×' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }));

  const adminMain = document.getElementById('adminMain');
  const adminTabs = document.querySelectorAll('.admin-tab');
  const views = {
    overview: `<div class="admin-content"><div class="admin-heading"><div><h3>Добро пожаловать!</h3><p>Вот что происходит с вашим сайтом.</p></div><button class="admin-mini-btn">Сегодня⌄</button></div><div class="admin-stats"><div class="admin-stat"><span>Посетители</span><strong>2 481</strong><small>↗ 12,8%</small></div><div class="admin-stat"><span>Заявки</span><strong>86</strong><small>↗ 8,2%</small></div><div class="admin-stat"><span>Конверсия</span><strong>3,46%</strong><small>↗ 0,6%</small></div></div><div class="admin-panel"><div class="admin-panel-title"><span>Активность сайта</span><span style="color:var(--muted);font-weight:500">За 7 дней</span></div><div class="chart">${[38,55,46,74,61,90,69,100,78,88].map(h=>`<span class="chart-bar" style="height:${h}%"></span>`).join('')}</div><div class="chart-labels"><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div></div><div class="admin-note"><span>✓</span> Вы можете менять контент в любой момент</div></div>`,
    pages: `<div class="admin-content"><div class="admin-heading"><div><h3>Страницы сайта</h3><p>Управляйте структурой и публикациями.</p></div><button class="admin-mini-btn">＋ Добавить</button></div><div class="admin-panel"><div class="admin-panel-title"><span>Все страницы</span><span style="color:var(--muted);font-weight:500">4 страницы</span></div><div class="admin-list"><div class="admin-row"><b>Главная</b><span>● Опубликована</span></div><div class="admin-row"><b>О компании</b><span>● Опубликована</span></div><div class="admin-row"><b>Услуги</b><span>● Опубликована</span></div><div class="admin-row"><b>Контакты</b><span>● Опубликована</span></div></div></div><div class="admin-note"><span>✎</span> Тексты и изображения можно обновлять без кода</div></div>`,
    projects: `<div class="admin-content"><div class="admin-heading"><div><h3>Ваши проекты</h3><p>Кейсы, которыми хочется делиться.</p></div><button class="admin-mini-btn">＋ Новый кейс</button></div><div class="admin-panel"><div class="admin-panel-title"><span>Последние записи</span><span style="color:var(--muted);font-weight:500">3 кейса</span></div><div class="admin-list"><div class="admin-row"><b>Айдентика Botanica</b><span>Опубликован</span></div><div class="admin-row"><b>Сайт Atelier</b><span>Опубликован</span></div><div class="admin-row"><b>Запуск Forma Health</b><span>Черновик</span></div></div></div><div class="admin-note"><span>＋</span> Добавляйте новые кейсы за пару минут</div></div>`,
    leads: `<div class="admin-content"><div class="admin-heading"><div><h3>Входящие заявки</h3><p>Новые обращения с сайта в одном месте.</p></div><button class="admin-mini-btn">Фильтр⌄</button></div><div class="admin-stats"><div class="admin-stat"><span>Новые</span><strong>4</strong><small>требуют ответа</small></div><div class="admin-stat"><span>В работе</span><strong>12</strong><small>на этой неделе</small></div><div class="admin-stat"><span>Всего</span><strong>86</strong><small>за месяц</small></div></div><div class="admin-panel"><div class="admin-panel-title"><span>Недавние обращения</span></div><div class="admin-list"><div class="admin-row"><b>Мария К.</b><span>10:42 · Новый</span></div><div class="admin-row"><b>Александр П.</b><span>Вчера · В работе</span></div><div class="admin-row"><b>Елена С.</b><span>Вчера · Новый</span></div></div></div></div>`,
    settings: `<div class="admin-content"><div class="admin-heading"><div><h3>Настройки сайта</h3><p>Основная информация и доступы.</p></div></div><div class="admin-panel"><div class="admin-panel-title"><span>Основные параметры</span></div><div class="admin-list"><div class="admin-row"><span>Название сайта</span><b>Ваша компания</b></div><div class="admin-row"><span>Домен</span><b>your-brand.ru</b></div><div class="admin-row"><span>Язык сайта</span><b>Русский</b></div><div class="admin-row"><span>Резервные копии</span><b>Включены ✓</b></div></div></div><div class="admin-note"><span>⚙</span> Настроим доступы и покажем основные действия</div></div>`
  };
  adminTabs.forEach(tab => tab.addEventListener('click', () => {
    adminTabs.forEach(t => t.classList.toggle('active', t === tab));
    adminMain.innerHTML = views[tab.dataset.tab] || views.overview;
  }));

  document.querySelectorAll('.faq-question').forEach(button => button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const opening = !item.classList.contains('open');
    item.classList.toggle('open', opening);
    button.setAttribute('aria-expanded', String(opening));
  }));

  const form = document.getElementById('contactForm');
  const message = document.getElementById('formMessage');
  form.addEventListener('submit', event => {
    event.preventDefault();
    message.classList.add('show');
    message.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block:'nearest'});
  });
  document.querySelectorAll('[data-plan]').forEach(link => link.addEventListener('click', () => {
    const project = document.getElementById('project');
    project.value = 'Интересует формат: ' + link.dataset.plan + '. ' + project.value;
  }));
})();
