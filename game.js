// ═══════════════════════════════════════════════════════
// CURSOR
// ═══════════════════════════════════════════════════════
const cursorEl = document.getElementById('cursor');

// Désactiver le curseur custom sur mobile
if (window.innerWidth > 767) {
    cursorEl.innerHTML = `
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <polygon points="3,1 3,20 8,15 11,23 14,22 11,14 18,14" fill="#00ff50"/>
</svg>`;

    document.addEventListener('mousemove', e => {
        cursorEl.style.left = e.clientX + 'px';
        cursorEl.style.top  = e.clientY + 'px';
    });
} else {
    // Sur mobile: cacher le curseur custom et laisser le curseur natif
    cursorEl.style.display = 'none';
}

// ═══════════════════════════════════════════════════════
// TYPEWRITER
// Utilise un token de révocation : chaque appel annule
// le précédent immédiatement via incrémentation du token.
// ═══════════════════════════════════════════════════════
let typeToken = 0;
let typewriterActive = false;

function typewrite(text) {
    const el = document.getElementById('chat-text');
    const token = ++typeToken;
    el.textContent = '';
    typewriterActive = true;
    let i = 0;
    function tick() {
        if (token !== typeToken) {
            typewriterActive = false;
            return; // annulé
        }
        if (i < text.length) {
            el.textContent += text[i++];
            setTimeout(tick, 25);
        } else {
            typewriterActive = false;
            lastClickedHotspot = null;
        }
    }
    tick();
}

// ═══════════════════════════════════════════════════════
// ANTI-REDÉCLENCHEMENT
// ═══════════════════════════════════════════════════════
let lastClickedHotspot = null;

// ═══════════════════════════════════════════════════════
// SLEEP UTILITY
// ═══════════════════════════════════════════════════════
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ═══════════════════════════════════════════════════════
// DONNÉES DES SCÈNES
// ═══════════════════════════════════════════════════════
const SCENES = {

    main: {
        image: 'assets/rooms/room_main.png',
        imageMobile: 'assets/rooms/room_main_mobile.png',
        introText: "Hé. Tu fouilles dans ma chambre ? Bonne idée —\nc'est comme ça qu'on apprend à se connaître.\nClique sur quelque chose.",
        hotspots: [
            {
                id: 'hs-ordinateur',
                visualId: 'visual-ordinateur',
                pngSrc: 'assets/rooms/room_main_ordinateur.png',
                label: "[ INSPECTER L'ORDINATEUR ]",
                action: 'scene:bureau',
                reply: "Là c'est mon QG. Python, SQL, Claude API, Make, Dust... J'ai construit des trucs qui tournent vraiment. Clique pour voir mes projets.",
                css: { left: '58%', top: '28%', width: '20%', height: '35%' },
                mobileCss: { left: '35%', top: '42%', width: '45%', height: '25%' }
            },
            {
                id: 'hs-posters',
                visualId: 'visual-posters',
                pngSrc: 'assets/rooms/room_main_posters.png',
                label: '[ REGARDER LES POSTERS ]',
                action: 'scene:posters',
                reply: "Mon mur créatif. Papillon Monarque de Tuerie, le Flamingo Fest, Marenner's... C'est la partie de moi que le CV montre pas.",
                css: { left: '17%', top: '18%', width: '18%', height: '42%' },
                mobileCss: { left: '2%', top: '48%', width: '20%', height: '20%' }
            },
            {
                id: 'hs-voyages',
                visualId: 'visual-voyages',
                pngSrc: 'assets/rooms/room_main_voyages.png',
                label: '[ REGARDER LES PHOTOS ]',
                action: 'scene:photos',
                reply: "Rennes, Colombie, Bordeaux, Casablanca, Paris. Chaque ville avait une logique. Clique pour voir de plus près.",
                css: { left: '42%', top: '24%', width: '16%', height: '26%' },
                mobileCss: { left: '28%', top: '48%', width: '18%', height: '14%' }
            },
            {
                id: 'hs-kingoland',
                visualId: 'visual-kingoland',
                pngSrc: 'assets/rooms/room_main_kingoland.png',
                label: '[ PELUCHE KINGOLAND ]',
                action: 'chat',
                reply: "Kingoland c'est le parc de loisirs de ma famille en Bretagne. J'ai géré la comm pendant 6 ans — réseaux, visuels, événements, prospection. Mon premier terrain.",
                css: { left: '28%', top: '42%', width: '14%', height: '22%' },
                mobileCss: { left: '2%', top: '58%', width: '38%', height: '22%' }
            },
            {
                id: 'hs-pizza',
                visualId: 'visual-pizza',
                pngSrc: 'assets/rooms/room_main_pizza.png',
                label: '[ GANG OF PIZZA ]',
                action: 'chat',
                reply: "Un mois à prospecter des zones pour implanter des distributeurs automatiques de pizzas dans le Morbihan. Mon premier stage — et j'ai adoré.",
                css: { left: '37%', top: '68%', width: '12%', height: '14%' },
                mobileCss: { left: '22%', top: '72%', width: '20%', height: '12%' }
            },
            {
                id: 'hs-morning',
                visualId: 'visual-morning',
                pngSrc: 'assets/rooms/room_main_morning.png',
                label: '[ BADGE MORNING ]',
                action: 'chat',
                reply: "Morning, coworking à Paris. Mon alternance actuelle depuis avril 2025. Marketing, automation, IA — c'est exactement là où je voulais atterrir.",
                css: { left: '60%', top: '42%', width: '8%', height: '12%' },
                mobileCss: { right: '18%', top: '50%', width: '14%', height: '12%' }
            },
            {
                id: 'hs-telephone',
                visualId: 'visual-telephone',
                pngSrc: 'assets/rooms/room_main_telephone.png',
                label: '[ TÉLÉPHONE ]',
                action: 'chat',
                reply: "Si t'es arrivé jusqu'ici c'est qu'on a des choses à se dire. leroux.gaspard56500@gmail.com ou LinkedIn : gaspard-leroux-11b24a202",
                css: { right: '4%', top: '50%', width: '7%', height: '18%' },
                mobileCss: { right: '2%', top: '58%', width: '15%', height: '14%' }
            },
            {
                id: 'hs-porte',
                visualId: 'visual-porte',
                pngSrc: 'assets/rooms/room_main_porte.png',
                label: '[ SORTIR ]',
                action: 'chat',
                reply: "Tu veux partir déjà ? Passe au moins par le téléphone avant de sortir.",
                css: { right: '1%', top: '5%', width: '9%', height: '78%' },
                mobileCss: { right: '0%', top: '30%', width: '12%', height: '42%' }
            }
        ]
    },

    bureau: {
        image: 'assets/rooms/room_bureau.png',
        imageMobile: 'assets/rooms/room_bureau_mobile.png',
        introText: "Mon bureau. C'est ici que ça se passe — les agents, les scripts, les pipelines. Clique sur un fichier.",
        hotspots: []
    },

    photos: {
        image: 'assets/rooms/room_photos.png',
        imageMobile: 'assets/rooms/room_photos_mobile.png',
        introText: "Mes photos. Chaque ville, une version différente de moi.",
        hotspots: [
            {
                id: 'hs-colombie',
                visualId: 'visual-colombie',
                pngSrc: 'assets/rooms/room_photo_colombie.png',
                label: '[ COLOMBIE — UNIVERSIDAD DE LA SABANA ]',
                action: 'chat',
                reply: "Universidad de la Sabana, Bogotá. Six mois à voir le monde autrement. Le genre d'expérience qui recalibre tout.",
                css: { right: '2%', top: '5%', width: '30%', height: '48%' },
                mobileCss: { right: '2%', top: '18%', width: '42%', height: '32%' }
            },
            {
                id: 'hs-kedge',
                visualId: 'visual-kedge',
                pngSrc: 'assets/rooms/room_photo_kedge.png',
                label: '[ BORDEAUX — KEDGE ]',
                action: 'chat',
                reply: "KEDGE Business School, master entrepreneuriat. Bordeaux c'est là où j'ai commencé à vraiment construire des projets.",
                css: { left: '5%', top: '35%', width: '32%', height: '45%' },
                mobileCss: { left: '2%', top: '52%', width: '40%', height: '30%' }
            },
            {
                id: 'hs-maroc',
                visualId: 'visual-maroc',
                pngSrc: 'assets/rooms/room_photo_maroc.png',
                label: '[ CASABLANCA — HEM ]',
                action: 'chat',
                reply: "HEM Business School, programme d'échange. Casablanca m'a surpris — énergie, rythme, culture. Une ville qui ne ressemble à aucune autre.",
                css: { left: '28%', top: '5%', width: '32%', height: '48%' },
                mobileCss: { left: '2%', top: '18%', width: '42%', height: '32%' }
            },
            {
                id: 'hs-paris',
                visualId: 'visual-paris',
                pngSrc: 'assets/rooms/room_photo_paris.png',
                label: '[ PARIS — EUGENIA SCHOOL ]',
                action: 'chat',
                reply: "Eugenia School, MSc Business Analytics. Et Morning en alternance. Paris c'est maintenant — c'est exactement là où je voulais être.",
                css: { left: '42%', top: '10%', width: '20%', height: '25%' },
                mobileCss: { left: '25%', top: '2%', width: '35%', height: '18%' }
            },
            {
                id: 'hs-rennes',
                visualId: 'visual-rennes',
                pngSrc: 'assets/rooms/room_photo_rennes.png',
                label: '[ RENNES — RSB ]',
                action: 'chat',
                reply: "Rennes School of Business, bachelor marketing. Ma première vraie ville. J'ai découvert que j'aimais comprendre pourquoi les gens achètent.",
                css: { right: '8%', top: '42%', width: '35%', height: '50%' },
                mobileCss: { right: '2%', top: '52%', width: '48%', height: '35%' }
            }
        ]
    },

    posters: {
        image: 'assets/rooms/room_posters.png',
        imageMobile: 'assets/rooms/room_posters_mobile.png',
        introText: "Mes posters. Ce que j'ai fait en dehors du CV, en dehors des cours.",
        hotspots: [
            {
                id: 'hs-tuerie',
                visualId: 'visual-tuerie',
                pngSrc: 'assets/rooms/room_posters_tuerie.png',
                label: '[ TUERIE — PAPILLON MONARQUE ]',
                action: 'chat',
                reply: "J'ai interviewé Tuerie pour Pour Ta Culture, le média qu'on a co-fondé. Papillon Monarque c'est son album — un projet qui m'a vraiment marqué.",
                css: { left: '5%', top: '8%', width: '38%', height: '80%' },
                mobileCss: { left: '2%', top: '15%', width: '42%', height: '65%' }
            },
            {
                id: 'hs-flamingo',
                visualId: 'visual-flamingo',
                pngSrc: 'assets/rooms/room_posters_flamingo.png',
                label: '[ FLAMINGO FEST ]',
                action: 'chat',
                reply: "Direction artistique et communication du Flamingo Fest. Visuels, affiches, programmation. C'est aussi là que Situal a joué.",
                css: { left: '38%', top: '18%', width: '42%', height: '72%' },
                mobileCss: { right: '2%', top: '25%', width: '52%', height: '60%' }
            },
            {
                id: 'hs-marennrs',
                visualId: 'visual-marennrs',
                pngSrc: 'assets/rooms/room_poster_marennners.png',
                label: "[ MARENNER'S BDE ]",
                action: 'chat',
                reply: "Vice-président du BDE à Rennes. Identité visuelle, événements, communication. Mon premier rôle de direction.",
                css: { left: '3%', bottom: '5%', width: '18%', height: '18%' },
                mobileCss: { left: '2%', bottom: '8%', width: '20%', height: '15%' }
            }
        ]
    }
};

// ═══════════════════════════════════════════════════════
// DONNÉES PROJETS (plan bureau)
// ═══════════════════════════════════════════════════════
const PROJECTS = [
    {
        filename: 'hackathon_payfit.exe',
        tag: '1er PRIX — 4 JOURS',
        detail: `HACKATHON PAYFIT — 1er prix / 4 jours
Stack : Dust · Lovable · Claude Code · Zapier
8 agents IA : KPI · Content · Concurrence · Créateur ·
Législatif · EEAT · Backlinks · GEO
Pipeline éditorial SEO entièrement automatisé.
Score conformité légale /100 par article.
Dashboard  → payfit-pied.vercel.app
Simulateur → payfit-calculator-buddy.lovable.app`
    },
    {
        filename: 'btz_seo_agents.exe',
        tag: 'EN COURS',
        detail: `BTZ SEO MULTI-AGENTS — en cours
Stack : Claude API · Make · Dust
4 agents : Stratège SEO · Planificateur · Rédacteur · Optimiseur
Système d'automatisation SEO pour une marque de
vêtements basque. Je gère le prompt engineering
de l'ensemble du pipeline.`
    },
    {
        filename: 'scraping_musique.py',
        tag: '7000 ALBUMS',
        detail: `WEB SCRAPING MUSIQUE — école
Stack : Python · BeautifulSoup · Pandas · API externe
7 000 albums · 7 décennies · 13 genres · 50+ pays
Analyses : âge d'or critique (1970, score 60.6),
domination Rock (29.6%), mythe britannique des 70s
prouvé statistiquement (ratio UK/US = 3.0 en 1970).
4 artistes sur 7 décennies : Beatles · Bowie ·
Dylan · Rolling Stones.
GitHub → github.com/lerouxgaspard/Album_scraping`
    },
    {
        filename: 'reco_youtube.dust',
        tag: 'NEWSLETTER AUTO',
        detail: `RECO YOUTUBE — école
Stack : Dust · HTML
Agent qui scrape 10+ sources culturelles
(Arte · France Culture · Aeon · Open Culture...)
Sélectionne 5-7 vidéos : diversité sujets, durée,
récence 3 mois, max 2 en anglais.
Génère une newsletter HTML prête à envoyer.
Présenté en carrousel LinkedIn.`
    },
    {
        filename: 'make_linkedin.json',
        tag: 'AUTOMATION',
        detail: `AUTOMATION MAKE LINKEDIN
Stack : Make · scraping · enrichissement
Scénarios pour identifier des contacts via
les offres d'emploi LinkedIn.
Extraction automatique + enrichissement +
transfert CRM.`
    },
    {
        filename: 'appscript_muscu.gs',
        tag: 'TRACKER',
        detail: `APPSCRIPT MUSCULATION
Stack : Google Apps Script
Tracker de séances de musculation.
Interface de saisie, historique, progression.
Déployé et accessible en ligne.`
    }
];

// ═══════════════════════════════════════════════════════
// ÉTAT
// ═══════════════════════════════════════════════════════
let currentScene = null;
let conversationHistory = [];

// ═══════════════════════════════════════════════════════
// CHARGEMENT DE SCÈNE
// ═══════════════════════════════════════════════════════
function loadScene(name) {
    const scene = SCENES[name];
    if (!scene) return;

    const transEl = document.getElementById('transition');
    transEl.classList.add('active');

    setTimeout(() => {
        currentScene = name;

        // Bouton retour
        document.getElementById('back-btn').style.display =
            name !== 'main' ? 'block' : 'none';

        // Bureau overlay
        const bureauOverlay = document.getElementById('bureau-overlay');
        if (name === 'bureau') {
            bureauOverlay.classList.add('visible');
            renderProjectList();
        } else {
            bureauOverlay.classList.remove('visible');
        }

        // Image de fond
        loadSceneImage(scene);

        // Hotspots
        renderHotspots(scene.hotspots);

        // Texte d'intro
        typewrite(scene.introText);

        // Fade in
        setTimeout(() => transEl.classList.remove('active'), 50);

    }, 400);
}

function loadSceneImage(scene) {
    const img    = document.getElementById('scene-image');
    const sceneEl = document.getElementById('scene');

    // Nettoyage placeholder précédent
    const old = document.getElementById('scene-placeholder');
    if (old) old.remove();

    // Détecter mobile et charger la bonne image
    const isMobile = window.innerWidth < 768;
    const imagePath = isMobile && scene.imageMobile ? scene.imageMobile : scene.image;

    img.style.display = 'block';
    img.onerror = function () {
        this.style.display = 'none';
        const ph = document.createElement('div');
        ph.id = 'scene-placeholder';
        ph.textContent = '[ place ' + imagePath.split('/').pop() + ' dans assets/rooms/ ]';
        sceneEl.insertBefore(ph, this);
    };
    img.onload = function () {
        this.style.display = 'block';
        const old2 = document.getElementById('scene-placeholder');
        if (old2) old2.remove();
    };
    img.src = imagePath;
}

// ═══════════════════════════════════════════════════════
// UTILITAIRE: DÉTECTION MOBILE
// ═══════════════════════════════════════════════════════
function isMobileView() {
    return window.innerWidth <= 767;
}

// ═══════════════════════════════════════════════════════
// HOTSPOTS — DÉTECTION PIXEL PAR PIXEL (canvas alpha)
// ═══════════════════════════════════════════════════════
let tapLabelTimeout = null;

// Cache des ImageData par src (chargés une seule fois)
const imgDataCache = {};

function preloadImageData(src) {
    if (imgDataCache[src] !== undefined) return;
    imgDataCache[src] = null; // marqué "en cours"
    const tmp = new Image();
    tmp.onload = () => {
        try {
            const cvs = document.createElement('canvas');
            cvs.width  = tmp.naturalWidth;
            cvs.height = tmp.naturalHeight;
            const ctx = cvs.getContext('2d');
            ctx.drawImage(tmp, 0, 0);
            imgDataCache[src] = ctx.getImageData(0, 0, cvs.width, cvs.height);
        } catch(e) { /* CORS ou autre — on laisse null */ }
    };
    tmp.src = src;
}

// Retourne l'alpha (0-255) du pixel sous le curseur
function getAlphaAt(src, imgEl, clientX, clientY) {
    const data = imgDataCache[src];
    if (!data) return 0;
    const rect   = imgEl.getBoundingClientRect();
    const scaleX = data.width  / rect.width;
    const scaleY = data.height / rect.height;
    const x = Math.floor((clientX - rect.left) * scaleX);
    const y = Math.floor((clientY - rect.top)  * scaleY);
    if (x < 0 || y < 0 || x >= data.width || y >= data.height) return 0;
    return data.data[(y * data.width + x) * 4 + 3];
}

function renderHotspots(hotspots) {
    const container = document.getElementById('hotspots-container');
    const labelHint = document.getElementById('label-hint');
    container.innerHTML = '';

    if (hotspots.length === 0) return;

    const isMobile = isMobileView();

    // ── Créer les PNG visuels (pointer-events: none) ──────
    hotspots.forEach(hs => {
        const visual = document.createElement('img');
        visual.className = 'hotspot-visual';
        visual.id = hs.visualId;
        visual.src = hs.pngSrc;
        visual.alt = '';
        container.appendChild(visual);
        preloadImageData(hs.pngSrc); // préchargement canvas
    });

    // Helpers
    const showVisual = hs => {
        const v = document.getElementById(hs.visualId);
        if (v) { v.style.opacity = '1'; v.style.filter = 'brightness(1.4) drop-shadow(0 0 12px rgba(0,255,80,0.5))'; }
    };
    const hideVisual = hs => {
        const v = document.getElementById(hs.visualId);
        if (v) { v.style.opacity = '0'; v.style.filter = ''; }
    };

    // Trouve le hotspot non-transparent sous (cx, cy)
    // Priorité : dernier dans le tableau = le plus petit = au-dessus
    const findAt = (cx, cy) => {
        for (let i = hotspots.length - 1; i >= 0; i--) {
            const hs = hotspots[i];
            const v  = document.getElementById(hs.visualId);
            if (!v) continue;
            if (getAlphaAt(hs.pngSrc, v, cx, cy) > 10) return hs;
        }
        return null;
    };

    // ── OVERLAY unique qui capte tous les événements ──────
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:absolute;inset:0;z-index:25;cursor:none;';
    container.appendChild(overlay);

    if (!isMobile) {
        // ─ DESKTOP ─
        let activeHs = null;

        overlay.addEventListener('mousemove', e => {
            const found = findAt(e.clientX, e.clientY);
            if (found === activeHs) return; // pas de changement

            if (activeHs) hideVisual(activeHs);
            activeHs = found;

            if (found) {
                showVisual(found);
                labelHint.textContent = found.label;
                labelHint.style.opacity = '1';
                typewrite(found.reply);
            } else {
                labelHint.style.opacity = '0';
            }
        });

        overlay.addEventListener('mouseleave', () => {
            if (activeHs) hideVisual(activeHs);
            activeHs = null;
            labelHint.style.opacity = '0';
        });

        overlay.addEventListener('click', e => {
            const found = findAt(e.clientX, e.clientY);
            if (!found) return;
            if (lastClickedHotspot === found.id && typewriterActive) return;
            lastClickedHotspot = found.id;
            if (found.action.startsWith('scene:')) transitionTo(found.action.slice(6));
        });

    } else {
        // ─ MOBILE ─
        overlay.addEventListener('touchstart', e => {
            const t  = e.touches[0];
            const found = findAt(t.clientX, t.clientY);
            if (!found) return;

            if (tapLabelTimeout) clearTimeout(tapLabelTimeout);
            showVisual(found);
            typewrite(found.reply);

            tapLabelTimeout = setTimeout(() => {
                labelHint.textContent = found.label;
                labelHint.style.opacity = '1';
                setTimeout(() => { labelHint.style.opacity = '0'; }, 2000);
            }, 1500);
        }, { passive: true });

        overlay.addEventListener('touchend', e => {
            if (tapLabelTimeout) clearTimeout(tapLabelTimeout);
            setTimeout(() => {
                hotspots.forEach(hs => hideVisual(hs));
            }, 300);
        }, { passive: true });

        overlay.addEventListener('click', e => {
            const found = findAt(e.clientX, e.clientY);
            if (!found) return;
            if (lastClickedHotspot === found.id && typewriterActive) return;
            lastClickedHotspot = found.id;
            if (found.action.startsWith('scene:')) transitionTo(found.action.slice(6));
        });
    }
}

// ═══════════════════════════════════════════════════════
// TRANSITION ZOOM
// ═══════════════════════════════════════════════════════
async function transitionTo(sceneName) {
    cleanupLivingEffects();

    const roomBg = document.getElementById('scene-image');
    const overlay = document.getElementById('transition');

    roomBg.style.transition = 'transform 0.2s ease-in, filter 0.2s ease-in';
    roomBg.style.transform = 'scale(1.15)';
    roomBg.style.filter = 'blur(4px) brightness(1.2)';

    overlay.style.background = '#fff';
    overlay.style.transition = 'opacity 0.15s ease';
    overlay.style.opacity = '1';

    await sleep(350);

    loadScene(sceneName);
    roomBg.style.transition = 'none';
    roomBg.style.transform = 'scale(1.15)';

    await sleep(50);
    overlay.style.transition = 'opacity 0.3s ease';
    overlay.style.opacity = '0';
    roomBg.style.transition = 'transform 0.3s ease-out, filter 0.3s ease-out';
    roomBg.style.transform = 'scale(1)';
    roomBg.style.filter = 'none';

    // Activer les effets vivants après chargement de main
    if (sceneName === 'main') {
        await sleep(500);
        setupLivingEffects();
    }
}

// ═══════════════════════════════════════════════════════
// EFFETS VIVANTS — PLAN MAIN UNIQUEMENT
// ═══════════════════════════════════════════════════════
let particlesEls = [];
let screenGlowEl = null;

function setupLivingEffects() {
    const sceneEl = document.getElementById('scene');

    // A) Glow pulsant écran ordi
    screenGlowEl = document.createElement('div');
    screenGlowEl.id = 'screen-glow';
    sceneEl.appendChild(screenGlowEl);

    // B) 15 particules flottantes — zone droite (ordi)
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const left = 52 + Math.random() * 32;   // 52–84%
        const top  = 8  + Math.random() * 62;   // 8–70%
        const dur  = (8 + Math.random() * 7).toFixed(1);
        const delay = -(Math.random() * 10).toFixed(1);
        p.style.left = left + '%';
        p.style.top  = top  + '%';
        p.style.animationDuration = dur + 's, ' + (parseFloat(dur) * 0.7).toFixed(1) + 's';
        p.style.animationDelay    = delay + 's, ' + delay + 's';
        sceneEl.appendChild(p);
        particlesEls.push(p);
    }

    // C) Glitch au chargement (une seule fois)
    const roomBg = document.getElementById('scene-image');
    roomBg.classList.add('glitch-anim');
    setTimeout(() => roomBg.classList.remove('glitch-anim'), 400);
}

function cleanupLivingEffects() {
    if (screenGlowEl) { screenGlowEl.remove(); screenGlowEl = null; }
    particlesEls.forEach(p => p.remove());
    particlesEls = [];
}

// ═══════════════════════════════════════════════════════
// BUREAU — LISTE DES PROJETS
// ═══════════════════════════════════════════════════════
function renderProjectList() {
    const content = document.getElementById('bureau-content');
    content.innerHTML = '';

    PROJECTS.forEach(proj => {
        const btn = document.createElement('button');
        btn.className = 'project-file';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'project-file-name';
        nameSpan.textContent = '> ' + proj.filename;

        const tagSpan = document.createElement('span');
        tagSpan.className = 'project-file-tag';
        tagSpan.textContent = '[' + proj.tag + ']';

        btn.appendChild(nameSpan);
        btn.appendChild(tagSpan);
        btn.addEventListener('click', () => renderProjectDetail(proj));
        content.appendChild(btn);
    });
}

// ═══════════════════════════════════════════════════════
// BUREAU — DÉTAIL D'UN PROJET
// ═══════════════════════════════════════════════════════
function renderProjectDetail(proj) {
    const content = document.getElementById('bureau-content');
    content.innerHTML = '';

    const backBtn = document.createElement('button');
    backBtn.id = 'project-back';
    backBtn.textContent = '[ \u2190 RETOUR ]';
    backBtn.addEventListener('click', renderProjectList);
    content.appendChild(backBtn);

    const detail = document.createElement('div');
    detail.id = 'project-detail';
    detail.textContent = proj.detail;
    content.appendChild(detail);

    typewrite(proj.filename + ' — ' + proj.tag);
}

// ═══════════════════════════════════════════════════════
// CHATBOT — API OpenAI
// ═══════════════════════════════════════════════════════
async function sendMessage(userText) {
    conversationHistory.push({ role: 'user', content: userText });

    // Garder les 6 derniers échanges (12 messages)
    if (conversationHistory.length > 12) {
        conversationHistory = conversationHistory.slice(-12);
    }

    typewrite('...');

    const key = window.OPENAI_API_KEY;
    if (!key || key === 'REMPLACE_PAR_TA_CLÉ') {
        typewrite('[ configure ta clé API dans index.html ]');
        conversationHistory.pop();
        return;
    }

    try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + key
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                max_tokens: 150,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...conversationHistory
                ]
            })
        });

        if (!res.ok) throw new Error('HTTP ' + res.status);

        const data  = await res.json();
        const reply = data.choices[0].message.content.trim();

        conversationHistory.push({ role: 'assistant', content: reply });
        if (conversationHistory.length > 12) {
            conversationHistory = conversationHistory.slice(-12);
        }

        typewrite(reply);

    } catch (e) {
        typewrite('[ connexion perdue — réessaie ]');
        conversationHistory.pop();
    }
}

// ═══════════════════════════════════════════════════════
// ÉCOUTEURS D'ÉVÉNEMENTS
// ═══════════════════════════════════════════════════════

// Bouton retour principal (hors bureau)
document.getElementById('back-btn').addEventListener('click', () => {
    transitionTo('main');
});

// Bouton [X] du bureau
document.getElementById('bureau-close').addEventListener('click', () => {
    transitionTo('main');
});

// Envoi du chat
function handleSend() {
    const input = document.getElementById('chat-input');
    const msg   = input.value.trim();
    if (!msg) return;
    input.value = '';
    sendMessage(msg);
}

document.getElementById('chat-send').addEventListener('click', handleSend);
document.getElementById('chat-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSend();
});

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
loadScene('main');
setTimeout(setupLivingEffects, 500);
