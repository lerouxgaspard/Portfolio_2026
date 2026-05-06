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
        image: 'assets/optimized/room_main.jpg',
        imageMobile: 'assets/optimized/room_main_mobile.jpg',
        fallbackImage: 'assets/rooms/room_main.png',
        fallbackImageMobile: 'assets/rooms/room_main_mobile.png',
        introText: "Bienvenue dans mon bureau-chambre.\nChaque objet ouvre une vraie partie de mon parcours : IA, marketing, data, culture.\nClique sur quelque chose.",
        hotspots: [
            {
                id: 'hs-ordinateur',
                visualId: 'visual-ordinateur',
                pngSrc: 'assets/rooms/room_main_ordinateur.png',
                label: "[ INSPECTER L'ORDINATEUR ]",
                action: 'scene:bureau',
                reply: "C'est le coeur du portfolio : agents IA, SEO automation, scraping Python, Make, Dust, Claude API. Clique pour voir les projets construits, pas juste les outils listés.",
                css: { left: '61%', top: '39%', width: '16%', height: '20%' },
                mobileCss: { left: '37%', top: '43%', width: '38%', height: '20%' }
            },
            {
                id: 'hs-posters',
                visualId: 'visual-posters',
                pngSrc: 'assets/rooms/room_main_posters.png',
                label: '[ REGARDER LES POSTERS ]',
                action: 'scene:posters',
                reply: "Le mur créatif : média culturel, interviews, DA de festival, identité BDE. C'est la partie qui explique mon goût pour les expériences qui marquent.",
                css: { left: '19%', top: '31%', width: '11%', height: '21%' },
                mobileCss: { left: '2%', top: '48%', width: '20%', height: '20%' }
            },
            {
                id: 'hs-voyages',
                visualId: 'visual-voyages',
                pngSrc: 'assets/rooms/room_main_voyages.png',
                label: '[ REGARDER LES PHOTOS ]',
                action: 'scene:photos',
                reply: "Rennes, Bogotá, Bordeaux, Casablanca, Paris. Mon parcours n'est pas linéaire, mais il a construit mon côté hybride business, tech et culturel.",
                css: { left: '45%', top: '41%', width: '9%', height: '13%' },
                mobileCss: { left: '28%', top: '48%', width: '18%', height: '14%' }
            },
            {
                id: 'hs-kingoland',
                visualId: 'visual-kingoland',
                pngSrc: 'assets/rooms/room_main_kingoland.png',
                label: '[ PELUCHE KINGOLAND ]',
                action: 'chat',
                reply: "Kingoland, c'est mon premier terrain concret : 6 ans à faire de la comm, des visuels, des réseaux sociaux et des événements pour un parc familial breton.",
                css: { left: '33%', top: '53%', width: '10%', height: '14%' },
                mobileCss: { left: '8%', top: '61%', width: '28%', height: '17%' }
            },
            {
                id: 'hs-pizza',
                visualId: 'visual-pizza',
                pngSrc: 'assets/rooms/room_main_pizza.png',
                label: '[ GANG OF PIZZA ]',
                action: 'chat',
                reply: "Gang of Pizza, c'était court mais formateur : prospection terrain, analyse de zones, premiers réflexes business très concrets dans le Morbihan.",
                css: { left: '44%', top: '71%', width: '10%', height: '10%' },
                mobileCss: { left: '22%', top: '72%', width: '20%', height: '12%' }
            },
            {
                id: 'hs-morning',
                visualId: 'visual-morning',
                pngSrc: 'assets/rooms/room_main_morning.png',
                label: '[ BADGE MORNING ]',
                action: 'chat',
                reply: "Morning, c'est mon alternance actuelle depuis avril 2025 : coworking parisien, marketing ops, automatisation et IA appliquée à des vrais sujets d'équipe.",
                css: { left: '72%', top: '55%', width: '5%', height: '8%' },
                mobileCss: { right: '20%', top: '52%', width: '10%', height: '9%' }
            },
            {
                id: 'hs-telephone',
                visualId: 'visual-telephone',
                pngSrc: 'assets/rooms/room_main_telephone.png',
                label: '[ TÉLÉPHONE ]',
                action: 'chat',
                reply: "Pour me contacter : leroux.gaspard56500@gmail.com. LinkedIn : gaspard-leroux-11b24a202. GitHub : lerouxgaspard.",
                css: { right: '4%', top: '62%', width: '11%', height: '15%', zIndex: '35' },
                mobileCss: { right: '1%', top: '64%', width: '15%', height: '12%', zIndex: '35' }
            },
            {
                id: 'hs-porte',
                visualId: 'visual-porte',
                pngSrc: 'assets/rooms/room_main_porte.png',
                label: '[ SORTIR ]',
                action: 'chat',
                reply: "La sortie existe, mais le plus intéressant est dans la pièce. Commence par l'ordinateur si tu veux comprendre ce que je sais vraiment construire.",
                css: { right: '7%', top: '8%', width: '10%', height: '58%', zIndex: '26' },
                mobileCss: { right: '2%', top: '31%', width: '11%', height: '34%', zIndex: '26' },
                zones: [
                    { css: { right: '7%', top: '8%', width: '10%', height: '58%', zIndex: '26' }, mobileCss: { right: '2%', top: '31%', width: '11%', height: '34%', zIndex: '26' } },
                    { css: { right: '10%', top: '66%', width: '6%', height: '13%', zIndex: '26' }, mobileCss: { right: '8%', top: '65%', width: '6%', height: '12%', zIndex: '26' } }
                ]
            }
        ]
    },

    bureau: {
        image: 'assets/optimized/room_bureau.jpg',
        imageMobile: 'assets/optimized/room_bureau_mobile.jpg',
        fallbackImage: 'assets/rooms/room_bureau.png',
        fallbackImageMobile: 'assets/rooms/room_bureau_mobile.png',
        introText: "Mes projets IA et automation.\nClique sur un fichier pour voir le contexte, la stack et ce que j'ai réellement produit.",
        hotspots: []
    },

    photos: {
        image: 'assets/optimized/room_photos.jpg',
        imageMobile: 'assets/optimized/room_photos_mobile.jpg',
        fallbackImage: 'assets/rooms/room_photos.png',
        fallbackImageMobile: 'assets/rooms/room_photos_mobile.png',
        introText: "Mon parcours géographique.\nChaque ville a ajouté une couche : marketing, entrepreneuriat, ouverture internationale, analytics.",
        hotspots: [
            {
                id: 'hs-colombie',
                visualId: 'visual-colombie',
                pngSrc: 'assets/rooms/room_photo_colombie.png',
                label: '[ COLOMBIE — UNIVERSIDAD DE LA SABANA ]',
                action: 'chat',
                reply: "Universidad de la Sabana, Bogotá. Une expérience qui m'a obligé à sortir du cadre français et à comprendre les marchés, les cultures et les gens autrement.",
                css: { right: '2%', top: '5%', width: '30%', height: '48%' },
                mobileCss: { right: '2%', top: '18%', width: '42%', height: '32%' }
            },
            {
                id: 'hs-kedge',
                visualId: 'visual-kedge',
                pngSrc: 'assets/rooms/room_photo_kedge.png',
                label: '[ BORDEAUX — KEDGE ]',
                action: 'chat',
                reply: "KEDGE Bordeaux, master entrepreneuriat. C'est là que j'ai commencé à raisonner en problème, solution, marché et exécution.",
                css: { left: '5%', top: '35%', width: '32%', height: '45%' },
                mobileCss: { left: '2%', top: '52%', width: '40%', height: '30%' }
            },
            {
                id: 'hs-maroc',
                visualId: 'visual-maroc',
                pngSrc: 'assets/rooms/room_photo_maroc.png',
                label: '[ CASABLANCA — HEM ]',
                action: 'chat',
                reply: "HEM Casablanca, programme d'échange. Une ville dense, rapide, très business, qui m'a donné un autre rapport au terrain.",
                css: { left: '28%', top: '5%', width: '32%', height: '48%' },
                mobileCss: { left: '2%', top: '18%', width: '42%', height: '32%' }
            },
            {
                id: 'hs-paris',
                visualId: 'visual-paris',
                pngSrc: 'assets/rooms/room_photo_paris.png',
                label: '[ PARIS — EUGENIA SCHOOL ]',
                action: 'chat',
                reply: "Eugenia School, MSc Business Analytics. Paris, c'est le moment où mes sujets se rejoignent : data, IA, automation, marketing et produit.",
                css: { left: '42%', top: '10%', width: '20%', height: '25%' },
                mobileCss: { left: '25%', top: '2%', width: '35%', height: '18%' }
            },
            {
                id: 'hs-rennes',
                visualId: 'visual-rennes',
                pngSrc: 'assets/rooms/room_photo_rennes.png',
                label: '[ RENNES — RSB ]',
                action: 'chat',
                reply: "Rennes School of Business, bachelor marketing. Ma base : comprendre les marques, les publics, les décisions et la façon de raconter une offre.",
                css: { right: '8%', top: '42%', width: '35%', height: '50%' },
                mobileCss: { right: '2%', top: '52%', width: '48%', height: '35%' }
            }
        ]
    },

    posters: {
        image: 'assets/optimized/room_posters.jpg',
        imageMobile: 'assets/optimized/room_posters_mobile.jpg',
        fallbackImage: 'assets/rooms/room_posters.png',
        fallbackImageMobile: 'assets/rooms/room_posters_mobile.png',
        introText: "Mes projets créatifs.\nPas des lignes décoratives : des médias, des événements, des identités et des contenus publics.",
        hotspots: [
            {
                id: 'hs-tuerie',
                visualId: 'visual-tuerie',
                pngSrc: 'assets/rooms/room_posters_tuerie.png',
                label: '[ TUERIE — PAPILLON MONARQUE ]',
                action: 'chat',
                reply: "Pour Ta Culture, c'est un média culturel co-fondé avec une vraie envie éditoriale. L'interview de Tuerie autour de Papillon Monarque reste un moment fort.",
                css: { left: '5%', top: '8%', width: '38%', height: '80%' },
                mobileCss: { left: '2%', top: '15%', width: '42%', height: '65%' }
            },
            {
                id: 'hs-flamingo',
                visualId: 'visual-flamingo',
                pngSrc: 'assets/rooms/room_posters_flamingo.png',
                label: '[ FLAMINGO FEST ]',
                action: 'chat',
                reply: "Flamingo Fest : direction artistique, communication, affiches, identité visuelle. Un projet où il fallait donner une vraie présence à un événement.",
                css: { left: '38%', top: '18%', width: '42%', height: '72%' },
                mobileCss: { right: '2%', top: '25%', width: '52%', height: '60%' }
            },
            {
                id: 'hs-marennrs',
                visualId: 'visual-marennrs',
                pngSrc: 'assets/rooms/room_poster_marennners.png',
                label: "[ MARENNER'S BDE ]",
                action: 'chat',
                reply: "Marenner's : vice-présidence BDE, identité visuelle, événements et communication. Un premier rôle de coordination avec des enjeux très visibles.",
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
Problème : industrialiser un pipeline éditorial SEO sans perdre
la qualité, la conformité légale et les signaux EEAT.

Rôle : conception du système multi-agents, orchestration,
prompt engineering, automatisations et démo produit.

Stack : Dust · Lovable · Claude Code · Zapier
8 agents : KPI · Content · Concurrence · Créateur ·
Législatif · EEAT · Backlinks · GEO

Résultat : 1er prix, pipeline SEO complet, dashboard live,
score de conformité par article et simulateur utilisable.

Dashboard  -> payfit-pied.vercel.app
Simulateur -> payfit-calculator-buddy.lovable.app`
    },
    {
        filename: 'btz_seo_agents.exe',
        tag: 'EN COURS',
        detail: `BTZ SEO MULTI-AGENTS — en cours
Problème : structurer la production SEO d'une marque basque
avec une logique plus scalable qu'un simple calendrier éditorial.

Rôle : architecture agentique, prompts, logique éditoriale,
automatisation Make et intégration Claude API / Dust.

Stack : Claude API · Make · Dust
4 agents : Stratège SEO · Planificateur · Rédacteur · Optimiseur

Objectif : passer d'une production manuelle à un système
qui propose, planifie, rédige et optimise avec contrôle humain.`
    },
    {
        filename: 'scraping_musique.py',
        tag: '7000 ALBUMS',
        detail: `WEB SCRAPING MUSIQUE — école
Problème : transformer un grand corpus musical non structuré
en base exploitable pour analyse statistique.

Stack : Python · BeautifulSoup · Pandas · API externe
7 000 albums · 7 décennies · 13 genres · 50+ pays

Analyses : âge d'or critique (1970, score 60.6),
domination Rock (29.6%), mythe britannique des 70s
prouvé statistiquement (ratio UK/US = 3.0 en 1970).
4 artistes sur 7 décennies : Beatles · Bowie ·
Dylan · Rolling Stones.

GitHub -> github.com/lerouxgaspard/Album_scraping`
    },
    {
        filename: 'reco_youtube.dust',
        tag: 'NEWSLETTER AUTO',
        detail: `RECO YOUTUBE — école
Problème : automatiser une veille culturelle utile sans générer
une liste plate de liens.

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
Problème : trouver des contacts pertinents à partir de signaux
faibles comme les offres d'emploi.

Stack : Make · scraping · enrichissement
Scénarios pour identifier des contacts via
les offres d'emploi LinkedIn.

Logique : extraction, qualification, enrichissement,
puis transfert vers un usage commercial ou CRM.`
    },
    {
        filename: 'appscript_muscu.gs',
        tag: 'TRACKER',
        detail: `APPSCRIPT MUSCULATION
Problème : suivre ses séances sans dépendre d'une app lourde
ou d'un outil fermé.

Stack : Google Apps Script
Tracker de séances de musculation.
Interface de saisie, historique, progression.
Déployé en ligne, pensé comme un outil personnel simple
mais réellement utilisé.`
    }
];

// ═══════════════════════════════════════════════════════
// ÉTAT
// ═══════════════════════════════════════════════════════
let currentScene = null;
let conversationHistory = [];
let sceneLoadToken = 0;
const imageCache = new Map();

// ═══════════════════════════════════════════════════════
// CHARGEMENT DE SCÈNE
// ═══════════════════════════════════════════════════════
function getSceneImagePath(scene) {
    const mobile = isMobileView();
    return mobile && scene.imageMobile ? scene.imageMobile : scene.image;
}

function getSceneFallbackPath(scene) {
    const mobile = isMobileView();
    return mobile && scene.fallbackImageMobile ? scene.fallbackImageMobile : scene.fallbackImage;
}

function loadImage(src) {
    if (!src) return Promise.reject(new Error('Image path missing'));
    if (imageCache.has(src)) return imageCache.get(src);

    const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject(new Error('Image failed: ' + src));
        img.src = src;
    });

    imageCache.set(src, promise);
    return promise;
}

async function loadScene(name, options = {}) {
    const scene = SCENES[name];
    if (!scene) return;

    const token = ++sceneLoadToken;
    const showTransition = options.showTransition !== false;
    const transEl = document.getElementById('transition');

    if (showTransition) {
        transEl.classList.add('active');
        await sleep(180);
    }

    await applyScene(name, scene, token);

    if (showTransition && token === sceneLoadToken) {
        requestAnimationFrame(() => transEl.classList.remove('active'));
    }
}

async function applyScene(name, scene, token) {
    currentScene = name;

    document.getElementById('back-btn').style.display =
        name !== 'main' ? 'block' : 'none';

    const bureauOverlay = document.getElementById('bureau-overlay');
    if (name === 'bureau') {
        bureauOverlay.classList.add('visible');
        renderProjectList();
    } else {
        bureauOverlay.classList.remove('visible');
    }

    await loadSceneImage(scene, token);
    if (token !== sceneLoadToken) return;

    renderHotspots(scene.hotspots);
    typewrite(scene.introText);
}

async function loadSceneImage(scene, token) {
    const img    = document.getElementById('scene-image');
    const sceneEl = document.getElementById('scene');

    // Nettoyage placeholder précédent
    const old = document.getElementById('scene-placeholder');
    if (old) old.remove();

    const imagePath = getSceneImagePath(scene);
    const fallbackPath = getSceneFallbackPath(scene);

    img.style.display = 'block';

    try {
        await loadImage(imagePath);
        if (token !== sceneLoadToken) return;
        img.src = imagePath;
    } catch (e) {
        if (fallbackPath) {
            try {
                await loadImage(fallbackPath);
                if (token !== sceneLoadToken) return;
                img.src = fallbackPath;
                return;
            } catch (fallbackError) {
                // Le placeholder ci-dessous prendra le relais.
            }
        }

        img.style.display = 'none';
        const ph = document.createElement('div');
        ph.id = 'scene-placeholder';
        ph.textContent = '[ image indisponible : ' + imagePath.split('/').pop() + ' ]';
        sceneEl.insertBefore(ph, img);
    }
}

function preloadSceneAssets(scene) {
    if (!scene) return;
    loadImage(getSceneImagePath(scene)).catch(() => {
        const fallbackPath = getSceneFallbackPath(scene);
        if (fallbackPath) loadImage(fallbackPath).catch(() => {});
    });
    scene.hotspots.forEach(hs => loadImage(hs.pngSrc).catch(() => {}));
}

function preloadAllAssets() {
    Object.values(SCENES).forEach(scene => preloadSceneAssets(scene));
}

// ═══════════════════════════════════════════════════════
// UTILITAIRE: DÉTECTION MOBILE
// ═══════════════════════════════════════════════════════
function isMobileView() {
    return window.innerWidth <= 767;
}

// ═══════════════════════════════════════════════════════
// HOTSPOTS HYBRIDES — PNG VISUEL + TRIGGER INVISIBLE
// ═══════════════════════════════════════════════════════
let tapLabelTimeout = null;

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
    });

    const showVisual = hs => {
        const v = document.getElementById(hs.visualId);
        if (v) { v.style.opacity = '1'; v.style.filter = 'brightness(1.16) drop-shadow(0 0 7px rgba(0,255,80,0.42))'; }
    };
    const hideVisual = hs => {
        const v = document.getElementById(hs.visualId);
        if (v) { v.style.opacity = '0'; v.style.filter = ''; }
    };

    const hideAllVisuals = () => {
        hotspots.forEach(hs => hideVisual(hs));
    };

    const showLabel = hs => {
        labelHint.textContent = hs.label;
        labelHint.style.opacity = '1';
    };

    const hideLabel = () => {
        labelHint.style.opacity = '0';
    };

    const applyPosition = (el, hs, zone = null) => {
        const source = zone || hs;
        const css = isMobile && source.mobileCss ? source.mobileCss : source.css;
        Object.entries(css).forEach(([prop, value]) => {
            el.style[prop] = value;
        });
    };

    const activate = hs => {
        hideAllVisuals();
        showVisual(hs);
        showLabel(hs);
        typewrite(hs.reply);
    };

    const runAction = hs => {
        if (lastClickedHotspot === hs.id && typewriterActive) return;
        lastClickedHotspot = hs.id;
        if (hs.action.startsWith('scene:')) transitionTo(hs.action.slice(6));
    };

    // ── Créer les triggers invisibles au-dessus des PNG ──────
    hotspots.forEach(hs => {
        const zones = hs.zones && hs.zones.length ? hs.zones : [null];

        zones.forEach((zone, index) => {
        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'hotspot-trigger';
        trigger.id = zone ? hs.id + '-' + index : hs.id;
        trigger.setAttribute('aria-label', hs.label.replace(/[\[\]]/g, '').trim());
        applyPosition(trigger, hs, zone);
        container.appendChild(trigger);

        if (!isMobile) {
            trigger.addEventListener('mouseenter', () => activate(hs));
            trigger.addEventListener('focus', () => activate(hs));
            trigger.addEventListener('mouseleave', () => {
                hideVisual(hs);
                hideLabel();
            });
            trigger.addEventListener('blur', () => {
                hideVisual(hs);
                hideLabel();
            });
        } else {
            trigger.addEventListener('touchstart', () => {
                if (tapLabelTimeout) clearTimeout(tapLabelTimeout);
                activate(hs);
            }, { passive: true });
            trigger.addEventListener('touchend', () => {
                if (tapLabelTimeout) clearTimeout(tapLabelTimeout);
                tapLabelTimeout = setTimeout(() => {
                    hideVisual(hs);
                    hideLabel();
                }, 1200);
            }, { passive: true });
        }

        trigger.addEventListener('click', () => runAction(hs));
        });
    });
}

// ═══════════════════════════════════════════════════════
// TRANSITION ZOOM
// ═══════════════════════════════════════════════════════
async function transitionTo(sceneName) {
    if (sceneName === currentScene) return;

    cleanupLivingEffects();

    const roomBg = document.getElementById('scene-image');
    const overlay = document.getElementById('transition');
    const scene = SCENES[sceneName];
    if (!scene) return;

    const token = ++sceneLoadToken;

    roomBg.style.transition = 'transform 0.18s ease-in, filter 0.18s ease-in';
    roomBg.style.transform = 'scale(1.15)';
    roomBg.style.filter = 'blur(3px) brightness(1.15)';

    overlay.style.background = '#fff';
    overlay.style.transition = 'opacity 0.12s ease';
    overlay.style.opacity = '1';

    await sleep(180);
    await applyScene(sceneName, scene, token);
    if (token !== sceneLoadToken) return;

    roomBg.style.transition = 'none';
    roomBg.style.transform = 'scale(1.15)';
    roomBg.style.filter = 'blur(3px) brightness(1.15)';

    await new Promise(requestAnimationFrame);
    overlay.style.transition = 'opacity 0.22s ease';
    overlay.style.opacity = '0';
    roomBg.style.transition = 'transform 0.25s ease-out, filter 0.25s ease-out';
    roomBg.style.transform = 'scale(1)';
    roomBg.style.filter = 'none';

    if (sceneName === 'main') {
        await sleep(260);
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
    const endpoint = window.CHAT_API_ENDPOINT;
    if (!key && !endpoint) {
        await sleep(260);
        const reply = getLocalReply(userText);
        conversationHistory.push({ role: 'assistant', content: reply });
        typewrite(reply);
        return;
    }

    try {
        const res = await fetch(endpoint || 'https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: endpoint
                ? { 'Content-Type': 'application/json' }
                : {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + key
                },
            body: JSON.stringify(endpoint
                ? { messages: conversationHistory }
                : {
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
        const reply = endpoint
            ? (data.reply || data.message || '').trim()
            : data.choices[0].message.content.trim();

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

function getLocalReply(userText) {
    const text = userText.toLowerCase();

    if (text.includes('contact') || text.includes('mail') || text.includes('email') || text.includes('linkedin')) {
        return "Tu peux m'écrire à leroux.gaspard56500@gmail.com. Sinon je suis sur LinkedIn avec le profil gaspard-leroux-11b24a202, et sur GitHub en lerouxgaspard.";
    }

    if (text.includes('ia') || text.includes('agent') || text.includes('automation') || text.includes('automatisation')) {
        return "Mon angle fort, c'est IA plus marketing ops : agents SEO, workflows Make, Dust, Claude API, scraping et automatisations utiles. Le projet PayFit est le meilleur point d'entrée.";
    }

    if (text.includes('payfit') || text.includes('hackathon')) {
        return "PayFit, c'était 4 jours pour construire un pipeline SEO multi-agents. On a gagné avec 8 agents, un dashboard live et un simulateur utilisable.";
    }

    if (text.includes('morning')) {
        return "Morning, c'est mon alternance actuelle depuis avril 2025. J'y travaille sur des sujets marketing, automation et IA dans un contexte très concret.";
    }

    if (text.includes('cv') || text.includes('parcours') || text.includes('école') || text.includes('ecole')) {
        return "Mon parcours mélange business, international et analytics : Rennes, Bogotá, Bordeaux, Casablanca, puis Paris à Eugenia en MSc Business Analytics.";
    }

    if (text.includes('créatif') || text.includes('culture') || text.includes('festival') || text.includes('design')) {
        return "La partie créative compte beaucoup : Pour Ta Culture, Flamingo Fest, Marenner's, affiches et identités. C'est ce qui donne une direction plus sensible à mes projets tech.";
    }

    return "Je peux te parler de mes projets IA, de mon parcours, de Morning, de mes expériences créatives ou de comment me contacter. Le mode local répond court ; le vrai GPT peut être branché via un endpoint.";
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

document.addEventListener('keydown', e => {
    const activeTag = document.activeElement && document.activeElement.tagName;
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;
    if (e.key.toLowerCase() === 'h') {
        document.body.classList.toggle('debug-hotspots');
    }
});

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
async function initGame() {
    await loadScene('main', { showTransition: false });
    setupLivingEffects();
    requestIdleCallbackSafe(preloadAllAssets);
}

function requestIdleCallbackSafe(callback) {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback, { timeout: 1500 });
    } else {
        setTimeout(callback, 700);
    }
}

initGame();
