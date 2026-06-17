// 互動殼：主題切換、搜尋、複製、平滑捲動、捲動進度
document.addEventListener('DOMContentLoaded', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;

    // 主題：預設跟系統，手動切換存 localStorage
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') root.dataset.theme = saved;

    const actions = document.querySelector('.topbar-actions');

    // 搜尋（過濾 .card）
    const search = document.createElement('input');
    search.type = 'search';
    search.className = 'search-input';
    search.placeholder = '搜尋…';
    search.setAttribute('aria-label', '搜尋內容');
    const cards = [...document.querySelectorAll('.card')];
    let t;
    search.addEventListener('input', () => {
        clearTimeout(t);
        t = setTimeout(() => {
            const q = search.value.trim().toLowerCase();
            cards.forEach(c => { c.style.display = (!q || c.textContent.toLowerCase().includes(q)) ? '' : 'none'; });
        }, 150);
    });

    // 主題切換鈕（文字標籤，無 emoji）
    const themeBtn = document.createElement('button');
    themeBtn.type = 'button';
    themeBtn.className = 'theme-btn';
    const isDark = () =>
        root.dataset.theme === 'dark' ||
        (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const syncLabel = () => {
        const dark = isDark();
        themeBtn.textContent = dark ? '淺色' : '深色';
        themeBtn.setAttribute('aria-label', dark ? '切換為淺色模式' : '切換為深色模式');
    };
    syncLabel();
    themeBtn.addEventListener('click', () => {
        const next = isDark() ? 'light' : 'dark';
        root.dataset.theme = next;
        localStorage.setItem('theme', next);
        syncLabel();
    });

    if (actions) { actions.append(search, themeBtn); }

    // 平滑捲動（避開 sticky topbar）
    document.querySelectorAll('.table-of-contents a').forEach(link => {
        link.addEventListener('click', e => {
            const el = document.getElementById(link.getAttribute('href').slice(1));
            if (!el) return;
            e.preventDefault();
            const y = el.getBoundingClientRect().top + window.pageYOffset - 76;
            window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
        });
    });

    // 程式碼複製鈕
    document.querySelectorAll('pre').forEach(pre => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'copy-btn';
        btn.textContent = '複製';
        btn.addEventListener('click', async () => {
            const text = (pre.querySelector('code') || pre).textContent;
            try { await navigator.clipboard.writeText(text); }
            catch { return; }
            btn.textContent = '已複製';
            btn.classList.add('is-done');
            setTimeout(() => { btn.textContent = '複製'; btn.classList.remove('is-done'); }, 1800);
        });
        pre.appendChild(btn);
    });

    if (reduce) return;

    // 捲動進度
    const bar = document.querySelector('.scroll-progress');
    if (bar) {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = max > 0 ? (window.pageYOffset / max * 100) + '%' : '0';
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // 卡片進場
    const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (en.isIntersecting) { en.target.style.opacity = '1'; en.target.style.transform = 'none'; io.unobserve(en.target); }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    cards.forEach(c => {
        c.style.opacity = '0';
        c.style.transform = 'translateY(20px)';
        c.style.transition = 'opacity .5s ease, transform .5s ease';
        io.observe(c);
    });
});
