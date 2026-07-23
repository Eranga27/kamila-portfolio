// Core Application Logic & Router

const app = {
    fontSize: 1.25, // default rem
    
    init() {
        // Set current year
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        
        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Render all sections for the single-page layout
        this.renderAllSections();

        // Router listeners (handles deep links and back button)
        window.addEventListener('hashchange', this.router.bind(this));
        
        // Smooth scrolling for navigation clicks
        document.body.addEventListener('click', e => {
            const link = e.target.closest('a');
            if (link && link.hash && !link.hasAttribute('data-modal-trigger')) {
                const href = link.getAttribute('href');
                // Standard section navigation (e.g. #about, #lyrics)
                const targetId = href.replace('#/', '').replace('#', '');
                
                // Allow detail paths to pass through to the router
                if (targetId.startsWith('lyrics/')) {
                    return;
                }

                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    
                    // Update location hash silently without triggering router scroll jump
                    window.history.pushState(null, null, '#' + targetId);
                    
                    // Update active class on nav links
                    document.querySelectorAll('.nav-link').forEach(navLink => {
                        navLink.classList.remove('active');
                        const navHref = navLink.getAttribute('href');
                        if (navHref === '#' + targetId || navHref === '#/' + targetId) {
                            navLink.classList.add('active');
                        }
                    });

                    // Close mobile menu if active
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                    }
                }
            }
        });

        // Trigger initial routing
        this.router();
        
        // Setup observer for fade-in animations on scroll
        this.setupScrollObserver();

        // Setup scroll spy for active nav link highlighting
        this.setupScrollSpy();
    },

    renderAllSections() {
        const appContainer = document.getElementById('app');
        
        let html = '';
        html += Pages.renderHome();       // Hero & Featured Excerpts
        html += Pages.renderAbout();      // Biography
        html += Pages.renderLyricsList(); // Lyrics Collection
        html += Pages.renderSongs();      // Songs
        html += Pages.renderAwards();     // Awards
        html += Pages.renderGallery();    // Gallery
        html += Pages.renderContact();    // Contact
        
        appContainer.innerHTML = html;
    },

    router() {
        const hash = window.location.hash;
        const cleanHash = hash.replace('#/', '').replace('#', '');
        
        if (cleanHash.startsWith('lyrics/')) {
            const id = cleanHash.split('/')[1];
            this.openLyricModal(id, true);
        } else {
            // Close lyric modal if navigating back to main content
            const modal = document.getElementById('lyricModal');
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
            
            // Scroll to the active hash section
            if (cleanHash) {
                const targetElement = document.getElementById(cleanHash);
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                }
            }
        }
    },

    // Modal Control functions
    openLyricModal(id, fromRouter = false) {
        const lyricHtml = Pages.renderLyricDetail(id);
        const modalBody = document.getElementById('modalLyricBody');
        const modal = document.getElementById('lyricModal');
        
        if (!modalBody || !modal) return;
        
        modalBody.innerHTML = lyricHtml;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Update URL to match current lyric detail path if opened by user click
        if (!fromRouter) {
            window.location.hash = `/lyrics/${id}`;
        }
    },

    closeLyricModal() {
        const modal = document.getElementById('lyricModal');
        if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Revert hash to the lyrics collection section
            window.location.hash = 'lyrics';
        }
    },

    handleModalCloseClick(e) {
        // Close modal if clicked directly on the overlay backdrop
        if (e.target === document.getElementById('lyricModal')) {
            this.closeLyricModal();
        }
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

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links .nav-link, .brand.nav-link');

        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -50% 0px', // Trigger when section occupies the active focus area
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        const href = link.getAttribute('href');
                        if (href === '#' + id || href === '#/' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
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
        const root = document.documentElement;
        this.fontSize += (direction * 0.25);
        
        // clamp font size between 1rem and 2.5rem
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
