document.addEventListener('DOMContentLoaded', () => {
      const slider = document.getElementById('product-slider');
      const slides = Array.from(document.querySelectorAll('.product-slide'));
      const prev = document.querySelector('.nav-btn.prev');
      const next = document.querySelector('.nav-btn.next');

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

      function start() {
        stop(); // 多重起動防止
        timerId = setInterval(() => move(1), INTERVAL);
      }

      function stop() {
        if (timerId) {
          clearInterval(timerId);
          timerId = null;
        }
      }

      prev.addEventListener('click', () => move(-1));
      next.addEventListener('click', () => move(1));

      // ホバーで一時停止／離れたら再開
      slider.addEventListener('mouseenter', stop);
      slider.addEventListener('mouseleave', start);

      // タブが非表示の間は停止（省電力 & 安定）
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop(); else start();
      });

      // 初期表示 & 自動再生
      show(0);
      start();
    });