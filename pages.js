// Pages generation logic

const Pages = {
    renderHome: () => `
        <section id="home" class="hero container animate-on-scroll visible">
            <div class="hero-content">
                <div class="hero-text">
                    <h1>${siteData.hero.name}</h1>
                    <p class="hero-tagline">${siteData.hero.tagline}</p>
                    <a href="#lyrics" class="btn btn-primary">Explore Lyrics</a>
                    <a href="#about" class="btn btn-outline" style="margin-left: 1rem;">Read Biography</a>
                </div>
                <div class="hero-image-wrapper">
                    <div class="hero-decoration"></div>
                    <img src="images/kamila-garden.png" alt="Kamila Ratnayake Portrait" class="hero-image">
                </div>
            </div>
        </section>

        <section class="container animate-on-scroll">
            <div class="section-header">
                <h2>Featured Excerpts</h2>
            </div>
            <div class="grid-3">
                ${siteData.lyrics.slice(0, 3).map(lyric => `
                    <div class="card lyric-item" onclick="app.openLyricModal('${lyric.id}')">
                        <h3 class="lyric-title-si">${lyric.title_si}</h3>
                        <p class="lyric-meta">${lyric.title_en} • ${lyric.year}</p>
                        <hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--clr-border);">
                        <p class="font-serif-si" style="white-space: pre-line; color: var(--clr-text-muted); font-size: 1.1rem;">${lyric.excerpt}</p>
                        <p style="margin-top: 1.5rem; font-size: 0.9rem; color: var(--clr-accent);">Read Full Lyric &rarr;</p>
                    </div>
                `).join('')}
            </div>
            <div class="text-center" style="margin-top: 3rem;">
                <a href="#lyrics" class="btn btn-outline">View All Lyrics</a>
            </div>
        </section>
    `,

    renderAbout: () => `
        <section id="about" class="container animate-on-scroll">
            <div class="section-header">
                <h2>Biography</h2>
            </div>
            <div class="grid-2">
                <div style="position: relative;">
                    <img src="images/kamila-indoor.png" alt="Kamila Ratnayake" style="width: 100%; border-radius: var(--radius-lg); position: sticky; top: 120px;">
                </div>
                <div style="font-size: 1.1rem; line-height: 1.9;">
                    <p class="font-serif" style="font-size: 1.5rem; color: var(--clr-accent); margin-bottom: 2rem;">"Words are not merely sounds; they are the vessels of our shared human experience."</p>
                    <p>I am a professional lyricist, actively creating lyrics since 2005. Over the years, my deep appreciation for classical literature and understanding of human experiences have allowed me to weave emotions into words that resonate across generations.</p>
                    <p>I specialize in creating lyrics tailored to any given concept, music track, and visual. Whether working with legendary veterans or emerging contemporary voices in the Sri Lankan music industry, I am fully capable of adapting my writing style to suit any musician or singer perfectly.</p>
                    <p>Throughout my career, this adaptability and dedication to the craft have been recognized with numerous accolades. A proud milestone was winning the Best Song Award at the Rajya Sammana Ulele in 2015 for the lyrics of "Paata Sihine," sung by Darshana Pramod.</p>
                    <p>Today, my digital archive serves as a repository for my life's work. I continue to explore new melodies and concepts, always eager to bring fresh musical visions to life through evocative Sinhala lyricism.</p>
                </div>
            </div>
        </section>
    `,

    renderLyricsList: () => `
        <section id="lyrics" class="container animate-on-scroll">
            <div class="section-header">
                <h2>Lyrics Collection</h2>
                <p class="text-muted" style="margin-top: 1rem;">Explore the complete archive of songs penned by Kamila Ratnayake.</p>
            </div>
            
            <div class="filter-bar">
                <input type="text" id="searchLyrics" class="filter-input" placeholder="Search by title or lyrics..." oninput="app.filterLyrics()">
                <select id="filterSinger" class="filter-select" onchange="app.filterLyrics()">
                    <option value="">All Singers</option>
                    ${[...new Set(siteData.lyrics.map(l => l.singer))].map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
                <select id="filterComposer" class="filter-select" onchange="app.filterLyrics()">
                    <option value="">All Composers</option>
                    ${[...new Set(siteData.lyrics.map(l => l.composer))].map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <select id="filterGenre" class="filter-select" onchange="app.filterLyrics()">
                    <option value="">All Genres</option>
                    ${[...new Set(siteData.lyrics.map(l => l.genre))].map(g => `<option value="${g}">${g}</option>`).join('')}
                </select>
                <select id="filterAlbum" class="filter-select" onchange="app.filterLyrics()">
                    <option value="">All Albums</option>
                    ${[...new Set(siteData.lyrics.map(l => l.album))].map(a => `<option value="${a}">${a}</option>`).join('')}
                </select>
                <select id="filterYear" class="filter-select" onchange="app.filterLyrics()">
                    <option value="">All Years</option>
                    ${[...new Set(siteData.lyrics.map(l => l.year))].map(y => `<option value="${y}">${y}</option>`).join('')}
                </select>
            </div>

            <div class="grid-3" id="lyricsGrid">
                ${siteData.lyrics.map(lyric => `
                    <div class="card lyric-item" onclick="app.openLyricModal('${lyric.id}')" data-title="${lyric.title_en.toLowerCase()} ${lyric.title_si}" data-singer="${lyric.singer}" data-composer="${lyric.composer}" data-genre="${lyric.genre}" data-album="${lyric.album}" data-year="${lyric.year}">
                        <h3 class="lyric-title-si">${lyric.title_si}</h3>
                        <p class="lyric-meta">${lyric.title_en}</p>
                        <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--clr-text-muted);">
                            <div>🎤 ${lyric.singer}</div>
                            <div>🎵 ${lyric.composer}</div>
                            <div>📅 ${lyric.year}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div id="noResults" style="display: none; text-align: center; padding: 3rem; color: var(--clr-text-muted);">
                No lyrics found matching your criteria.
            </div>
        </section>
    `,

    renderLyricDetail: (id) => {
        const lyric = siteData.lyrics.find(l => l.id === id);
        if(!lyric) return `<div class="section-header"><h2>Lyric Not Found</h2></div>`;
        
        return `
            <div style="margin-bottom: 2rem;">
                <button onclick="app.closeLyricModal()" class="btn btn-outline" style="padding: 0.5rem 1rem;">&larr; Back to Collection</button>
            </div>
            
            <div class="reader-mode-controls">
                <button class="control-btn" onclick="app.toggleDarkMode()" aria-label="Toggle Dark Mode">🌙 Dark Mode</button>
                <button class="control-btn" onclick="app.adjustFontSize(1)" aria-label="Increase Font Size">A+</button>
                <button class="control-btn" onclick="app.adjustFontSize(-1)" aria-label="Decrease Font Size">A-</button>
                <button class="control-btn" onclick="window.print()" aria-label="Print">🖨️ Print</button>
            </div>

            <div class="lyric-content-container">
                <h1 class="lyric-title-si" style="font-size: 3rem; margin-bottom: 0.5rem;">${lyric.title_si}</h1>
                <p class="font-sans" style="font-size: 1.2rem; color: var(--clr-text-muted); margin-bottom: 2rem;">${lyric.title_en}</p>
                
                <div style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 3rem; flex-wrap: wrap; font-size: 0.95rem;">
                    <div><strong style="color: var(--clr-accent);">Singer:</strong> ${lyric.singer}</div>
                    <div><strong style="color: var(--clr-accent);">Composer:</strong> ${lyric.composer}</div>
                    <div><strong style="color: var(--clr-accent);">Album:</strong> ${lyric.album}</div>
                    <div><strong style="color: var(--clr-accent);">Year:</strong> ${lyric.year}</div>
                </div>

                <div class="lyric-text">${lyric.content.replace(/\n/g, '<br>')}</div>
                
                <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--clr-border);">
                    <h3 class="font-serif">Share this lyric</h3>
                    <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem;">
                        <button class="btn btn-outline" onclick="navigator.clipboard.writeText('${window.location.origin}${window.location.pathname}#/lyrics/${lyric.id}'); alert('Link copied!')">Copy Link</button>
                    </div>
                </div>
            </div>
        `;
    },

    renderSongs: () => `
        <section id="songs" class="container animate-on-scroll">
            <div class="section-header">
                <h2>Featured Songs</h2>
                <p class="text-muted" style="margin-top: 1rem;">Listen to the melodies that carry Kamila's words.</p>
            </div>
            
            <div class="grid-2">
                ${siteData.lyrics.map(lyric => `
                    <div class="card">
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/${lyric.youtube_id}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <h3 class="lyric-title-si" style="font-size: 1.3rem;">${lyric.title_si} (${lyric.title_en})</h3>
                        <p class="text-muted" style="font-size: 0.9rem;">Singer: ${lyric.singer} | Composer: ${lyric.composer}</p>
                        <a href="javascript:void(0)" onclick="app.openLyricModal('${lyric.id}')" class="text-accent" style="display: inline-block; margin-top: 1rem; font-size: 0.9rem;">View Lyrics &rarr;</a>
                    </div>
                `).join('')}
            </div>
        </section>
    `,

    renderAwards: () => `
        <section id="awards" class="container animate-on-scroll">
            <div class="section-header">
                <h2>Awards & Recognition</h2>
                <p class="text-muted" style="margin-top: 1rem;">Honoring a legacy of lyrical excellence.</p>
            </div>
            
            <div class="timeline">
                ${siteData.awards.map((award, index) => `
                    <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
                        <div class="timeline-content card">
                            <div class="timeline-year">${award.year}</div>
                            <h3>${award.title}</h3>
                            <p class="text-muted" style="margin-top: 0.5rem; font-size: 0.95rem;">${award.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `,

    renderGallery: () => `
        <section id="gallery" class="container animate-on-scroll">
            <div class="section-header">
                <h2>Gallery</h2>
                <p class="text-muted" style="margin-top: 1rem;">Moments captured in time.</p>
            </div>
            
            <div class="gallery-grid">
                ${siteData.gallery.map(img => `
                    <div class="gallery-img-wrapper card" style="padding: 0;">
                        <img src="${img.url}" alt="${img.caption}" class="gallery-img">
                        <div style="position: absolute; bottom: 0; left: 0; width: 100%; background: rgba(253, 251, 247, 0.9); padding: 1rem; text-align: center; border-top: 1px solid var(--clr-border);">
                            <p style="margin: 0; font-size: 0.9rem; font-weight: 500;">${img.caption}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `,

    renderContact: () => `
        <section id="contact" class="container animate-on-scroll">
            <div class="section-header">
                <h2>Get in Touch</h2>
                <p class="text-muted" style="margin-top: 1rem;">For professional inquiries and collaborations.</p>
            </div>
            
            <div class="grid-2" style="max-width: 900px; margin: 0 auto; gap: 4rem;">
                <div>
                    <h3 class="font-serif" style="font-size: 1.8rem; margin-bottom: 1.5rem;">Contact Information</h3>
                    <p style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem;">
                        <span style="font-size: 1.5rem;">📍</span>
                        <span>Colombo 07, Sri Lanka</span>
                    </p>
                    <p style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem;">
                        <span style="font-size: 1.5rem;">✉️</span>
                        <span>contact@kamilaratnayake.lk</span>
                    </p>
                    <p style="margin-bottom: 2rem; display: flex; align-items: center; gap: 1rem;">
                        <span style="font-size: 1.5rem;">📞</span>
                        <span>+94 77 123 4567</span>
                    </p>
                    
                    <div style="margin-top: 3rem;">
                        <h4 class="font-sans" style="margin-bottom: 1rem; color: var(--clr-text-muted);">Custom Lyric Writing</h4>
                        <p>I am capable of creating lyrics adjusting to any musician or singer according to a given concept, music track, and visual. <strong>Charges are negotiable.</strong> Please reach out to discuss your project.</p>
                    </div>
                </div>
                
                <div class="card">
                    <form onsubmit="event.preventDefault(); alert('Message sent successfully!');">
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Name</label>
                            <input type="text" required style="width: 100%; padding: 0.8rem; border: 1px solid var(--clr-border); border-radius: var(--radius-sm); font-family: inherit; background: transparent; color: inherit;">
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email</label>
                            <input type="email" required style="width: 100%; padding: 0.8rem; border: 1px solid var(--clr-border); border-radius: var(--radius-sm); font-family: inherit; background: transparent; color: inherit;">
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Message</label>
                            <textarea required rows="5" style="width: 100%; padding: 0.8rem; border: 1px solid var(--clr-border); border-radius: var(--radius-sm); font-family: inherit; resize: vertical; background: transparent; color: inherit;"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    `
};
