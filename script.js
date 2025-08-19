document.addEventListener('DOMContentLoaded', () => {

  // ===== 商品スライダー（取扱商品ページのみ） =====
  const slider = document.getElementById('product-slider');
  if (slider) {
    const slides = Array.from(slider.querySelectorAll('.product-slide'));
    const prev = slider.querySelector('.nav-btn.prev');
    const next = slider.querySelector('.nav-btn.next');
    let index = 0;
    let timerId = null;
    const INTERVAL = 3000; // 3秒

    function show(i) {
      slides.forEach((s, n) => s.classList.toggle('active', n === i));
      index = i;
    }

    function move(delta) {
      const i = (index + delta + slides.length) % slides.length;
      show(i);
    }

    function start() { stop(); timerId = setInterval(() => move(1), INTERVAL); }
    function stop() { if (timerId) { clearInterval(timerId); timerId = null; } }

    prev.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', () => { document.hidden ? stop() : start(); });

    show(0);
    start();
  }

  // ===== ハンバーガーメニュー（全ページ共通） =====
  const navList = document.querySelector('nav ul');
  if (navList) {

    // 二重生成防止
    if (!document.querySelector('.nav-toggle')) {
      const toggleBtn = document.createElement('button');
      toggleBtn.textContent = '☰';
      toggleBtn.classList.add('nav-toggle');
      toggleBtn.style.fontSize = '24px';
      toggleBtn.style.background = 'none';
      toggleBtn.style.border = 'none';
      toggleBtn.style.color = 'white';
      toggleBtn.style.cursor = 'pointer';
      navList.parentNode.insertBefore(toggleBtn, navList);

      // ボタンクリックでメニュー開閉
      toggleBtn.addEventListener('click', () => navList.classList.toggle('open'));

      // 初期表示 & リサイズ対応
      function checkWidth() {
        if (window.innerWidth > 768) {
          navList.classList.remove('open');
          toggleBtn.style.display = 'none';
        } else {
          toggleBtn.style.display = 'inline-block';
        }
      }

      checkWidth();
      window.addEventListener('resize', checkWidth);
    }

  }

});