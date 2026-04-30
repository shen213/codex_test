// ==================== 共享组件注入 ====================
function injectComponents() {
    const currentPage = location.pathname.split('/').pop() || 'index.html';

    // 导航栏
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.id = 'navbar';
    nav.innerHTML = `
        <div class="nav-container">
            <a href="index.html" class="logo">
                <span class="logo-icon">✈</span>
                <span class="logo-text">行者无疆</span>
            </a>
            <ul class="nav-links" id="navLinks">
                <li><a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">首页</a></li>
                <li><a href="destinations.html" class="${currentPage === 'destinations.html' ? 'active' : ''}">热门目的地</a></li>
                <li><a href="features.html" class="${currentPage === 'features.html' ? 'active' : ''}">为什么选择我们</a></li>
                <li><a href="gallery.html" class="${currentPage === 'gallery.html' ? 'active' : ''}">旅行相册</a></li>
                <li><a href="reviews.html" class="${currentPage === 'reviews.html' ? 'active' : ''}">旅客评价</a></li>
                <li><a href="contact.html" class="${currentPage === 'contact.html' ? 'active' : ''}">联系我们</a></li>
            </ul>
            <button class="nav-toggle" id="navToggle" aria-label="菜单">
                <span></span><span></span><span></span>
            </button>
        </div>
    `;
    document.body.prepend(nav);

    // 页脚
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
        <div class="footer-grid">
            <div class="footer-col">
                <div class="footer-logo">
                    <span class="logo-icon">✈</span>
                    <span class="logo-text">行者无疆</span>
                </div>
                <p>让每一次旅行都成为生命中最美好的记忆。我们相信，旅行不只是移动身体，更是放飞心灵。</p>
                <div class="social-links">
                    <a href="#" aria-label="微信">💬</a>
                    <a href="#" aria-label="微博">📱</a>
                    <a href="#" aria-label="小红书">📕</a>
                    <a href="#" aria-label="抖音">🎵</a>
                </div>
            </div>
            <div class="footer-col">
                <h4>热门目的地</h4>
                <ul>
                    <li><a href="destinations.html">日本旅行</a></li>
                    <li><a href="destinations.html">欧洲深度游</a></li>
                    <li><a href="destinations.html">东南亚海岛</a></li>
                    <li><a href="destinations.html">澳洲探险</a></li>
                    <li><a href="destinations.html">马尔代夫度假</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>旅行服务</h4>
                <ul>
                    <li><a href="features.html">定制旅行</a></li>
                    <li><a href="features.html">跟团游</a></li>
                    <li><a href="features.html">自由行套餐</a></li>
                    <li><a href="features.html">签证服务</a></li>
                    <li><a href="features.html">旅行保险</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>联系我们</h4>
                <ul class="contact-info">
                    <li>📍 北京市朝阳区建国路88号</li>
                    <li>📞 400-888-9999</li>
                    <li>📧 hello@travel.com</li>
                    <li>⏰ 周一至周日 9:00-21:00</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>© 2026 行者无疆旅行网 All Rights Reserved | <a href="#">隐私政策</a> | <a href="#">服务条款</a></p>
        </div>
    `;

    // 回到顶部
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.id = 'backToTop';
    backToTop.setAttribute('aria-label', '回到顶部');
    backToTop.textContent = '↑';

    document.body.appendChild(footer);
    document.body.appendChild(backToTop);
}

// ==================== 导航栏滚动效果 ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 移动端菜单
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ==================== 滚动入场动画 ====================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
}

// ==================== 数字滚动动画 ====================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats') || document.querySelector('.stats-bar');
    if (statsSection) observer.observe(statsSection);
}

function animateCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(counter => {
        if (counter.dataset.animated) return;
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(update);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        counter.dataset.animated = 'true';
        update();
    });
}

// ==================== Toast 提示 ====================
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: var(--dark);
        color: var(--white);
        padding: 16px 28px;
        border-radius: 12px;
        font-size: 0.95rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 90vw;
        text-align: center;
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==================== 平滑滚动 ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ==================== 汉堡菜单动画样式 ====================
function injectMenuAnimationStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-toggle.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .nav-toggle.active span:nth-child(2) { opacity: 0; }
        .nav-toggle.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
    `;
    document.head.appendChild(style);
}

// ==================== 首页专用逻辑 ====================
function initHomePage() {
    // 搜索
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    if (searchInput && searchBtn) {
        const destinations = ['瑞士', '阿尔卑斯', '日本', '东京', '马尔代夫', '巴黎', '法国', '泰国', '普吉岛', '澳大利亚', '大堡礁', '新西兰', '冰岛', '希腊', '挪威', '巴厘岛', '夏威夷', '埃及', '土耳其'];

        const doSearch = () => {
            const query = searchInput.value.trim();
            if (!query) return;
            const match = destinations.find(d => d.includes(query) || query.includes(d));
            if (match) {
                showToast(`正在为您查找 "${match}" 相关的旅行方案...`);
                setTimeout(() => location.href = 'destinations.html', 1500);
            } else {
                showToast(`暂未找到 "${query}" 的结果，试试热门目的地吧！`);
            }
        };

        searchBtn.addEventListener('click', doSearch);
        searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') doSearch(); });
    }
}

// ==================== 目的地页专用逻辑 ====================
function initDestinationsPage() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.dest-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const region = btn.dataset.region;

            cards.forEach(card => {
                if (region === 'all' || card.dataset.region === region) {
                    card.style.display = '';
                    setTimeout(() => card.classList.add('visible'), 50);
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => card.style.display = 'none', 400);
                }
            });
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            showToast(`正在查看 "${title}" 的详细信息...`);
        });
    });
}

// ==================== 相册页专用逻辑 ====================
function initGalleryPage() {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const items = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.category;

            items.forEach(item => {
                if (cat === 'all' || item.dataset.category === cat) {
                    item.style.display = '';
                    setTimeout(() => item.classList.add('visible'), 50);
                } else {
                    item.classList.remove('visible');
                    setTimeout(() => item.style.display = 'none', 400);
                }
            });
        });
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    if (lightbox) {
        items.forEach(item => {
            item.addEventListener('click', () => {
                const url = item.style.backgroundImage.replace(/url\(['"]?(.+?)['"]?\)/, '$1');
                const caption = item.querySelector('span')?.textContent || '';
                lightboxImg.src = url.replace('w=600', 'w=1200').replace('w=800', 'w=1200');
                lightboxCaption.textContent = caption;
                lightbox.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });
    }
}

// ==================== 评价页专用逻辑 ====================
function initReviewsPage() {
    // 轮播
    const track = document.getElementById('reviewsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    if (!track) return;

    const cards = track.querySelectorAll('.review-card');
    let current = 0;
    let perView = 3;

    function updatePerView() {
        if (window.innerWidth <= 768) perView = 1;
        else if (window.innerWidth <= 1024) perView = 2;
        else perView = 3;
    }

    function maxSlide() {
        return Math.max(0, cards.length - perView);
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i <= maxSlide(); i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === current) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        }
    }

    function goTo(index) {
        current = Math.max(0, Math.min(index, maxSlide()));
        const w = cards[0].offsetWidth + 16;
        track.style.transform = `translateX(-${current * w}px)`;
        dotsContainer.querySelectorAll('.slider-dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    let auto = setInterval(() => goTo(current >= maxSlide() ? 0 : current + 1), 5000);
    track.addEventListener('mouseenter', () => clearInterval(auto));
    track.addEventListener('mouseleave', () => {
        auto = setInterval(() => goTo(current >= maxSlide() ? 0 : current + 1), 5000);
    });

    let tx = 0;
    track.addEventListener('touchstart', e => { tx = e.changedTouches[0].screenX; clearInterval(auto); }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = tx - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
        auto = setInterval(() => goTo(current >= maxSlide() ? 0 : current + 1), 5000);
    }, { passive: true });

    updatePerView();
    createDots();
    window.addEventListener('resize', () => { updatePerView(); createDots(); goTo(Math.min(current, maxSlide())); });
}

// ==================== 联系页专用逻辑 ====================
function initContactPage() {
    const form = document.getElementById('contactForm');
    if (form) {
        const submitBtn = form.querySelector('.btn-submit');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const originalText = submitBtn?.textContent || '提交咨询';
            const payload = {
                name: document.getElementById('name')?.value.trim() || '',
                phone: document.getElementById('phone')?.value.trim() || '',
                email: document.getElementById('email')?.value.trim() || '',
                destination: document.getElementById('destination')?.value.trim() || '',
                message: document.getElementById('message')?.value.trim() || '',
            };

            if (!payload.name || !payload.phone || !payload.message) {
                showToast('请补全必填字段后再提交咨询。');
                return;
            }

            try {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = '提交中...';
                }

                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(data.error || '提交失败');
                }

                showToast('提交成功！我们会尽快与您联系。');
                form.reset();
            } catch (error) {
                console.error('Contact form submit failed:', error);
                showToast(error instanceof Error ? error.message : '提交失败，请稍后再试。');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }
        });
    }

    // FAQ 手风琴
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });
}

// ==================== 订阅表单（通用） ====================
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input').value;
            if (email) {
                showToast('订阅成功！感谢您的关注，我们会定期为您发送旅行资讯 🎉');
                form.reset();
            }
        });
    }
}

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    injectComponents();
    initNavbar();
    initScrollAnimations();
    initCounters();
    initSmoothScroll();
    initNewsletter();
    injectMenuAnimationStyle();

    const page = location.pathname.split('/').pop() || 'index.html';
    if (page === 'index.html' || page === '') initHomePage();
    if (page === 'destinations.html') initDestinationsPage();
    if (page === 'gallery.html') initGalleryPage();
    if (page === 'reviews.html') initReviewsPage();
    if (page === 'contact.html') initContactPage();
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
