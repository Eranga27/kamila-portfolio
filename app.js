// Core Application Logic & Router

const app = {
    fontSize: 1.25, // default rem
    
    init() {
        // Set current year
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        
        // Mobile Menu
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Router listeners
        window.addEventListener('hashchange', this.router.bind(this));
        
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]') || e.target.closest('[data-link]')) {
                e.preventDefault();
                const link = e.target.matches('[data-link]') ? e.target : e.target.closest('[data-link]');
                this.navigate(link.href);
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });

        // Initial Route
        this.router();
        
        // Setup observer for scroll animations
        this.setupScrollObserver();
    },

    navigate(url) {
        window.location.hash = url.startsWith('#') ? url : '#' + url;
    },

    async router() {
        // Fallback to '/' if no hash is present
        const hash = window.location.hash;
        const path = hash ? hash.slice(1) : '/';
        
        let html = '';

        // Simple Router
        if (path === '/' || path === '/index.html') {
            html = Pages.renderHome();
        } else if (path === '/about') {
            html = Pages.renderAbout();
        } else if (path === '/lyrics') {
            html = Pages.renderLyricsList();
        } else if (path.startsWith('/lyrics/')) {
            const id = path.split('/')[2];
            html = Pages.renderLyricDetail(id);
        } else if (path === '/songs') {
            html = Pages.renderSongs();
        } else if (path === '/awards') {
            html = Pages.renderAwards();
        } else if (path === '/gallery') {
            html = Pages.renderGallery();
        } else if (path === '/contact') {
            html = Pages.renderContact();
        } else {
            html = `<section class="container"><div class="section-header"><h2>404 - Page Not Found</h2></div></section>`;
        }

        // Active Link state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + path || (path.startsWith('/lyrics') && href === '#/lyrics')) {
                link.classList.add('active');
            }
        });

        // Page Transition
        const appContainer = document.getElementById('app');
        appContainer.classList.add('fade-out');
        
        await new Promise(r => setTimeout(r, 200)); // wait for fade out
        
        appContainer.innerHTML = html;
        window.scrollTo(0, 0);
        
        appContainer.classList.remove('fade-out');
        
        // Re-trigger scroll observer for new elements
        setTimeout(() => {
            this.setupScrollObserver();
        }, 100);
    },

    setupScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll:not(.visible)').forEach(el => {
            observer.observe(el);
        });
    },

    // Lyrics filtering logic
    filterLyrics() {
        const searchTerm = document.getElementById('searchLyrics')?.value.toLowerCase() || '';
        const singerTerm = document.getElementById('filterSinger')?.value || '';
        const composerTerm = document.getElementById('filterComposer')?.value || '';
        const genreTerm = document.getElementById('filterGenre')?.value || '';
        const albumTerm = document.getElementById('filterAlbum')?.value || '';
        const yearTerm = document.getElementById('filterYear')?.value || '';
        
        const items = document.querySelectorAll('.lyric-item');
        let visibleCount = 0;
        
        items.forEach(item => {
            const title = item.dataset.title?.toLowerCase() || '';
            const singer = item.dataset.singer || '';
            const composer = item.dataset.composer || '';
            const genre = item.dataset.genre || '';
            const album = item.dataset.album || '';
            const year = item.dataset.year || '';
            
            const matchesSearch = title.includes(searchTerm);
            const matchesSinger = singerTerm === '' || singer === singerTerm;
            const matchesComposer = composerTerm === '' || composer === composerTerm;
            const matchesGenre = genreTerm === '' || genre === genreTerm;
            const matchesAlbum = albumTerm === '' || album === albumTerm;
            const matchesYear = yearTerm === '' || year === yearTerm;
            
            if (matchesSearch && matchesSinger && matchesComposer && matchesGenre && matchesAlbum && matchesYear) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        const noResults = document.getElementById('noResults');
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }
    },

    // Reader Mode functions
    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    },

    adjustFontSize(direction) {
        // direction: 1 for increase, -1 for decrease
        const root = document.documentElement;
        this.fontSize += (direction * 0.25);
        
        // clamp font size between 1rem and 2rem
        if (this.fontSize < 1) this.fontSize = 1;
        if (this.fontSize > 2.5) this.fontSize = 2.5;
        
        root.style.setProperty('--lyric-font-size', `${this.fontSize}rem`);
        root.style.setProperty('--lyric-line-height', `${this.fontSize > 1.5 ? 1.8 : 2}`);
    }
};

// Start App when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}
