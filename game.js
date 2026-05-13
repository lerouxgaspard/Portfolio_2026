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
    const el = document.getElementById('phone-bubble-text') || document.getElementById('chat-text');
    if (!el) return;
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
        staticLayers: [
            {
                id: 'layer-main-meuble',
                src: 'assets/rooms/room_main_meuble.png',
                mobileSrc: 'assets/rooms/room_main_mobile_meuble.png',
                zIndex: 18
            },
            {
                id: 'layer-main-livres',
                src: 'assets/rooms/room_main_livres.png',
                mobileSrc: 'assets/rooms/room_main_mobile_meuble_livres.png',
                zIndex: 40
            }
        ],
        introText: "Bienvenue dans mon bureau-chambre.\nChaque objet ouvre une vraie partie de mon parcours : IA, marketing, data, culture.\nClique sur quelque chose.",
        hotspots: [
            {
                id: 'hs-ordinateur',
                visualId: 'visual-ordinateur',
                pngSrc: 'assets/rooms/room_main_ordinateur.png',
                mobilePngSrc: 'assets/rooms/room_main_mobile_ordinateur.png',
                label: "[ INSPECTER L'ORDINATEUR ]",
                action: 'scene:bureau',
                reply: "C'est le coeur du portfolio : agents IA, SEO automation, scraping Python, Make, Dust, Claude API. Clique pour voir les projets construits, pas juste les outils listés.",
                css: { left: '61%', top: '39%', width: '16%', height: '20%' },
                mobileCss: { left: '60%', top: '48%', width: '15%', height: '10%' }
            },
            {
                id: 'hs-posters',
                visualId: 'visual-posters',
                pngSrc: 'assets/rooms/room_main_posters.png',
                mobilePngSrc: 'assets/rooms/room_main_mobile_posters.png',
                label: '[ REGARDER LES POSTERS ]',
                action: 'scene:posters',
                reply: "Le mur créatif : média culturel, interviews, DA de festival, identité BDE. C'est la partie qui explique mon goût pour les expériences qui marquent.",
                css: { left: '19%', top: '31%', width: '11%', height: '21%' },
                mobileCss: { left: '18%', top: '43%', width: '14%', height: '11%' }
            },
            {
                id: 'hs-voyages',
                visualId: 'visual-voyages',
                pngSrc: 'assets/rooms/room_main_voyages.png',
                mobilePngSrc: 'assets/rooms/room_main_mobile_voyages.png',
                label: '[ REGARDER LES PHOTOS ]',
                action: 'scene:photos',
                reply: "Rennes, Bogotá, Bordeaux, Casablanca, Paris. Mon parcours n'est pas linéaire, mais il a construit mon côté hybride business, tech et culturel.",
                css: { left: '45%', top: '41%', width: '9%', height: '13%' },
                mobileCss: { left: '45%', top: '48%', width: '13%', height: '8%' }
            },
            {
                id: 'hs-kingoland',
                visualId: 'visual-kingoland',
                pngSrc: 'assets/rooms/room_main_kingoland.png',
                mobilePngSrc: 'assets/rooms/room_main_mobile_kingoland.png',
                label: '[ PELUCHE KINGOLAND ]',
                action: 'phone:kingoland',
                reply: "Kingoland, c'est mon premier terrain concret : 6 ans à faire de la comm, des visuels, des réseaux sociaux et des événements pour un parc familial breton.",
                css: { left: '33%', top: '53%', width: '10%', height: '14%' },
                mobileCss: { left: '28%', top: '57%', width: '15%', height: '11%' }
            },
            {
                id: 'hs-pizza',
                visualId: 'visual-pizza',
                pngSrc: 'assets/rooms/room_main_pizza.png',
                mobilePngSrc: 'assets/rooms/room_main_mobile_pizza.png',
                label: '[ GANG OF PIZZA ]',
                action: 'phone:pizza',
                reply: "Gang of Pizza, c'était court mais formateur : prospection terrain, analyse de zones, premiers réflexes business très concrets dans le Morbihan.",
                css: { left: '44%', top: '71%', width: '10%', height: '10%' },
                mobileCss: { left: '43%', top: '60%', width: '14%', height: '8%' }
            },
            {
                id: 'hs-morning',
                visualId: 'visual-morning',
                pngSrc: 'assets/rooms/room_main_morning.png',
                mobilePngSrc: 'assets/rooms/room_main_mobile_morning.png',
                visualZIndex: 38,
                triggerZIndex: 48,
                label: '[ BADGE MORNING ]',
                action: 'phone:morning',
                reply: "Morning, c'est mon alternance actuelle depuis avril 2025 : coworking parisien, marketing ops, automatisation et IA appliquée à des vrais sujets d'équipe.",
                baseOpacity: 1,
                css: { left: '72%', top: '55%', width: '5%', height: '8%' },
                mobileCss: { left: '70%', top: '50%', width: '7%', height: '6%' }
            },
            {
                id: 'hs-telephone',
                visualId: 'visual-telephone',
                pngSrc: 'assets/rooms/room_main_telephone.png',
                mobilePngSrc: 'assets/rooms/room_main_mobile_telephone.png',
                baseOpacity: 1,
                baseOpacityMobile: 0,
                visualZIndex: 36,
                triggerZIndex: 49,
                label: '[ TÉLÉPHONE ]',
                action: 'ios',
                reply: "Attends, laisse-moi chercher mon téléphone...",
                css: { right: '4%', top: '62%', width: '11%', height: '15%', zIndex: '35' },
                mobileCss: { right: '4%', top: '56%', width: '14%', height: '10%', zIndex: '35' }
            },
            {
                id: 'hs-porte',
                visualId: 'visual-porte',
                pngSrc: 'assets/rooms/room_main_porte.png',
                mobilePngSrc: 'assets/rooms/room_main_mobile_porte.png',
                label: '[ SORTIR ]',
                action: 'phone:exit',
                reply: "La sortie existe, mais le plus intéressant est dans la pièce. Commence par l'ordinateur si tu veux comprendre ce que je sais vraiment construire.",
                css: { right: '7%', top: '8%', width: '10%', height: '58%', zIndex: '26' },
                mobileCss: { right: '7%', top: '36%', width: '13%', height: '29%', zIndex: '26' },
                zones: [
                    { css: { right: '7%', top: '8%', width: '10%', height: '58%', zIndex: '26' }, mobileCss: { right: '7%', top: '36%', width: '13%', height: '29%', zIndex: '26' } },
                    { css: { right: '10%', top: '66%', width: '6%', height: '13%', zIndex: '26' }, mobileCss: { right: '11%', top: '58%', width: '7%', height: '8%', zIndex: '26' } }
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
                mobilePngSrc: 'assets/rooms/room_photos_mobile_colombie.png',
                label: '[ COLOMBIE — UNIVERSIDAD DE LA SABANA ]',
                action: 'phone:colombie',
                reply: "Universidad de la Sabana, Bogotá. Une expérience qui m'a obligé à sortir du cadre français et à comprendre les marchés, les cultures et les gens autrement.",
                css: { right: '2%', top: '5%', width: '30%', height: '48%' },
                mobileCss: { right: '2%', top: '18%', width: '42%', height: '32%' }
            },
            {
                id: 'hs-kedge',
                visualId: 'visual-kedge',
                pngSrc: 'assets/rooms/room_photo_kedge.png',
                mobilePngSrc: 'assets/rooms/room_photos_mobile_kedge.png',
                label: '[ BORDEAUX — KEDGE ]',
                action: 'phone:kedge',
                reply: "KEDGE Bordeaux, master entrepreneuriat. C'est là que j'ai commencé à raisonner en problème, solution, marché et exécution.",
                css: { left: '5%', top: '35%', width: '32%', height: '45%' },
                mobileCss: { left: '2%', top: '52%', width: '40%', height: '30%' }
            },
            {
                id: 'hs-maroc',
                visualId: 'visual-maroc',
                pngSrc: 'assets/rooms/room_photo_maroc.png',
                mobilePngSrc: 'assets/rooms/room_photos_mobile_maroc.png',
                label: '[ CASABLANCA — HEM ]',
                action: 'phone:maroc',
                reply: "HEM Casablanca, programme d'échange. Une ville dense, rapide, très business, qui m'a donné un autre rapport au terrain.",
                css: { left: '28%', top: '5%', width: '32%', height: '48%' },
                mobileCss: { left: '2%', top: '18%', width: '42%', height: '32%' }
            },
            {
                id: 'hs-paris',
                visualId: 'visual-paris',
                pngSrc: 'assets/rooms/room_photo_paris.png',
                mobilePngSrc: 'assets/rooms/room_photos_mobile_paris.png',
                label: '[ PARIS — EUGENIA SCHOOL ]',
                action: 'phone:paris',
                reply: "Eugenia School, MSc Business Analytics. Paris, c'est le moment où mes sujets se rejoignent : data, IA, automation, marketing et produit.",
                css: { left: '42%', top: '10%', width: '20%', height: '25%' },
                mobileCss: { left: '25%', top: '2%', width: '35%', height: '18%' }
            },
            {
                id: 'hs-rennes',
                visualId: 'visual-rennes',
                pngSrc: 'assets/rooms/room_photo_rennes.png',
                mobilePngSrc: 'assets/rooms/room_photos_mobile_rennes.png',
                label: '[ RENNES — RSB ]',
                action: 'phone:rennes',
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
        staticLayers: [
            {
                id: 'layer-posters-flamingo',
                src: 'assets/rooms/room_posters_flamingo.png',
                mobileSrc: 'assets/rooms/room_posters_mobile_flamingo.png',
                zIndex: 24
            },
            {
                id: 'layer-posters-marennrs',
                src: 'assets/rooms/room_poster_marennners.png',
                mobileSrc: 'assets/rooms/room_posters_mobile_marenners.png',
                zIndex: 34
            }
        ],
        introText: "Mes projets créatifs.\nPas des lignes décoratives : des médias, des événements, des identités et des contenus publics.",
        hotspots: [
            {
                id: 'hs-tuerie',
                visualId: 'visual-tuerie',
                pngSrc: 'assets/rooms/room_posters_tuerie.png',
                mobilePngSrc: 'assets/rooms/room_posters_mobile_tuerie.png',
                label: '[ TUERIE — PAPILLON MONARQUE ]',
                action: 'phone:tuerie',
                reply: "Pour Ta Culture, c'est un média culturel co-fondé avec une vraie envie éditoriale. L'interview de Tuerie autour de Papillon Monarque reste un moment fort.",
                css: { left: '5%', top: '8%', width: '38%', height: '80%' },
                mobileCss: { left: '2%', top: '15%', width: '42%', height: '65%' }
            },
            {
                id: 'hs-flamingo',
                visualId: 'visual-flamingo',
                pngSrc: 'assets/rooms/room_posters_flamingo.png',
                mobilePngSrc: 'assets/rooms/room_posters_mobile_flamingo.png',
                visualZIndex: 25,
                label: '[ FLAMINGO FEST ]',
                action: 'phone:flamingo',
                reply: "Flamingo Fest : direction artistique, communication, affiches, identité visuelle. Un projet où il fallait donner une vraie présence à un événement.",
                css: { left: '38%', top: '18%', width: '42%', height: '72%' },
                mobileCss: { right: '2%', top: '25%', width: '52%', height: '60%' }
            },
            {
                id: 'hs-marennrs',
                visualId: 'visual-marennrs',
                pngSrc: 'assets/rooms/room_poster_marennners.png',
                mobilePngSrc: 'assets/rooms/room_posters_mobile_marenners.png',
                visualZIndex: 35,
                triggerZIndex: 45,
                label: "[ MARENNER'S BDE ]",
                action: 'phone:marennrs',
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
let currentMobileMode = null;
const phoneState = {
    currentContentId: null,
    mediaIndex: 0,
    ambientPlaying: false,
    voicePlaying: false
};

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

function getLayerSrc(layer) {
    const mobile = isMobileView();
    return mobile && layer.mobileSrc ? layer.mobileSrc : layer.src;
}

function getHotspotSrc(hs) {
    const mobile = isMobileView();
    return mobile && hs.mobilePngSrc ? hs.mobilePngSrc : hs.pngSrc;
}

function getHotspotBaseOpacity(hs) {
    const mobile = isMobileView();
    if (mobile && hs.baseOpacityMobile !== undefined) return hs.baseOpacityMobile;
    return hs.baseOpacity || 0;
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

    renderStaticLayers(scene.staticLayers || []);
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
    (scene.staticLayers || []).forEach(layer => {
        loadImage(layer.src).catch(() => {});
        if (layer.mobileSrc) loadImage(layer.mobileSrc).catch(() => {});
    });
    scene.hotspots.forEach(hs => {
        loadImage(hs.pngSrc).catch(() => {});
        if (hs.mobilePngSrc) loadImage(hs.mobilePngSrc).catch(() => {});
    });
}

function preloadAllAssets() {
    Object.values(SCENES).forEach(scene => preloadSceneAssets(scene));
}

// ═══════════════════════════════════════════════════════
// PHONE MODULE — HUB MÉDIA NARRATIF
// ═══════════════════════════════════════════════════════
function getPhoneContent(contentId) {
    return PHONE_CONTENT && PHONE_CONTENT[contentId] ? PHONE_CONTENT[contentId] : null;
}

function setPhoneBubble(text) {
    const bubbleText = document.getElementById('phone-bubble-text');
    if (!bubbleText) return;
    typewrite(text || PHONE_HOME.bubbleText);
}

function setPhoneOpen(isOpen) {
    const module = document.getElementById('phone-module');
    if (!module) return;
    module.classList.toggle('is-open', isOpen);
}

function setPhoneMode(mode) {
    const module = document.getElementById('phone-module');
    if (!module) return;
    module.classList.toggle('is-home', mode === 'home');
    module.classList.toggle('is-content', mode === 'content');
}

function renderPhoneHome() {
    const screen = document.getElementById('phone-screen');
    const template = document.getElementById('phone-home-template');
    if (!screen || !template) return;

    phoneState.currentContentId = null;
    phoneState.mediaIndex = 0;
    stopVoiceAudio();
    setPhoneMode('home');

    screen.innerHTML = template.innerHTML;
    const title = screen.querySelector('.phone-home-title');
    const subtitle = screen.querySelector('.phone-home-subtitle');
    if (title) title.textContent = PHONE_HOME.title;
    if (subtitle) subtitle.textContent = PHONE_HOME.subtitle;

    const ambient = document.getElementById('ambient-audio');
    if (ambient && PHONE_HOME.ambientAudio && ambient.getAttribute('src') !== PHONE_HOME.ambientAudio) {
        ambient.src = PHONE_HOME.ambientAudio;
    }

    const toggle = document.getElementById('ambient-toggle');
    if (toggle) {
        toggle.addEventListener('click', toggleAmbientAudio);
        updateAmbientButton();
    }

    const minimize = document.getElementById('phone-minimize');
    if (minimize) {
        minimize.addEventListener('click', () => setPhoneOpen(false));
    }

    setPhoneBubble(PHONE_HOME.bubbleText);
}

function openPhoneContent(contentId) {
    const content = getPhoneContent(contentId);
    if (!content) {
        renderPhoneHome();
        setPhoneOpen(true);
        return;
    }

    phoneState.currentContentId = contentId;
    phoneState.mediaIndex = 0;
    setPhoneOpen(true);
    setPhoneMode('content');
    renderPhoneMedia(contentId);
    setPhoneBubble(content.bubbleText);
}

function renderPhoneMedia(contentId) {
    const content = getPhoneContent(contentId);
    const screen = document.getElementById('phone-screen');
    if (!content || !screen) return;

    const media = content.media && content.media.length ? content.media : [{ type: 'placeholder', caption: 'Média à ajouter.' }];
    const index = Math.max(0, Math.min(phoneState.mediaIndex, media.length - 1));
    phoneState.mediaIndex = index;
    const item = media[index];

    screen.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'phone-content';

    const header = document.createElement('div');
    header.className = 'phone-content-header';

    const top = document.createElement('div');
    top.className = 'phone-content-top';

    const title = document.createElement('div');
    title.className = 'phone-content-title';
    title.textContent = content.title;

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'phone-close-button';
    close.textContent = 'HOME';
    close.addEventListener('click', () => {
        setPhoneOpen(false);
        renderPhoneHome();
    });

    top.appendChild(title);
    top.appendChild(close);

    const subtitle = document.createElement('div');
    subtitle.className = 'phone-content-subtitle';
    subtitle.textContent = content.subtitle || '';

    header.appendChild(top);
    header.appendChild(subtitle);

    const frame = document.createElement('div');
    frame.className = 'phone-media-frame';

    if (item.type === 'image' && item.src) {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.caption || content.title;
        img.loading = 'lazy';
        frame.appendChild(img);
    } else if (item.type === 'video' && item.src) {
        const video = document.createElement('video');
        video.src = item.src;
        video.controls = true;
        video.preload = 'metadata';
        video.playsInline = true;
        frame.appendChild(video);
    } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'phone-placeholder';
        placeholder.textContent = item.caption || 'Photo ou vidéo à ajouter.';
        frame.appendChild(placeholder);
    }

    const caption = document.createElement('div');
    caption.className = 'phone-caption';
    caption.textContent = item.caption || content.ctaLabel || '';

    const controls = document.createElement('div');
    controls.className = 'phone-controls';

    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'phone-nav-button';
    prev.textContent = '<';
    prev.disabled = media.length < 2;
    prev.addEventListener('click', () => {
        phoneState.mediaIndex = (phoneState.mediaIndex - 1 + media.length) % media.length;
        renderPhoneMedia(contentId);
    });

    const counter = document.createElement('span');
    counter.className = 'phone-counter';
    counter.textContent = (index + 1) + ' / ' + media.length;

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'phone-nav-button';
    next.textContent = '>';
    next.disabled = media.length < 2;
    next.addEventListener('click', () => {
        phoneState.mediaIndex = (phoneState.mediaIndex + 1) % media.length;
        renderPhoneMedia(contentId);
    });

    const voice = document.createElement('button');
    voice.type = 'button';
    voice.className = 'phone-voice-button';
    voice.textContent = phoneState.voicePlaying ? 'STOP VOIX' : 'VOIX';
    voice.disabled = !content.voiceAudio;
    voice.addEventListener('click', () => toggleVoiceAudio(contentId));

    controls.appendChild(prev);
    controls.appendChild(counter);
    controls.appendChild(next);
    controls.appendChild(voice);

    wrapper.appendChild(header);
    wrapper.appendChild(frame);
    wrapper.appendChild(caption);
    wrapper.appendChild(controls);
    screen.appendChild(wrapper);
}

async function toggleAmbientAudio() {
    const ambient = document.getElementById('ambient-audio');
    if (!ambient) return;

    if (!ambient.src && PHONE_HOME.ambientAudio) {
        ambient.src = PHONE_HOME.ambientAudio;
    }

    try {
        if (ambient.paused) {
            await ambient.play();
            phoneState.ambientPlaying = true;
        } else {
            ambient.pause();
            phoneState.ambientPlaying = false;
        }
    } catch (e) {
        phoneState.ambientPlaying = false;
    }

    updateAmbientButton();
}

function updateAmbientButton() {
    const ambient = document.getElementById('ambient-audio');
    const toggle = document.getElementById('ambient-toggle');
    if (!toggle || !ambient) return;
    phoneState.ambientPlaying = !ambient.paused;
    toggle.textContent = phoneState.ambientPlaying ? 'PAUSE' : 'PLAY';
    toggle.classList.toggle('is-playing', phoneState.ambientPlaying);
}

async function toggleVoiceAudio(contentId) {
    const content = getPhoneContent(contentId);
    const voice = document.getElementById('voice-audio');
    if (!content || !content.voiceAudio || !voice) return;

    if (voice.src && !voice.paused) {
        stopVoiceAudio();
        renderPhoneMedia(contentId);
        return;
    }

    voice.src = content.voiceAudio;
    try {
        await voice.play();
        phoneState.voicePlaying = true;
    } catch (e) {
        phoneState.voicePlaying = false;
    }
    renderPhoneMedia(contentId);
}

function stopVoiceAudio() {
    const voice = document.getElementById('voice-audio');
    if (!voice) return;
    voice.pause();
    voice.removeAttribute('src');
    phoneState.voicePlaying = false;
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

function renderStaticLayers(layers) {
    const container = document.getElementById('hotspots-container');
    container.querySelectorAll('.scene-static-layer').forEach(layer => layer.remove());

    layers.forEach(layer => {
        const img = document.createElement('img');
        img.className = 'scene-static-layer';
        img.id = layer.id;
        img.src = getLayerSrc(layer);
        img.alt = '';
        img.style.zIndex = layer.zIndex || 18;
        container.appendChild(img);
    });
}

function renderHotspots(hotspots) {
    const container = document.getElementById('hotspots-container');
    const labelHint = document.getElementById('label-hint');
    container.querySelectorAll('.hotspot-visual, .hotspot-trigger').forEach(el => el.remove());

    if (hotspots.length === 0) return;

    const isMobile = isMobileView();

    // ── Créer les PNG visuels (pointer-events: none) ──────
    hotspots.forEach(hs => {
        const visual = document.createElement('img');
        visual.className = 'hotspot-visual';
        visual.id = hs.visualId;
        visual.src = getHotspotSrc(hs);
        visual.alt = '';
        const baseOpacity = getHotspotBaseOpacity(hs);
        visual.dataset.baseOpacity = String(baseOpacity);
        visual.style.opacity = baseOpacity;
        visual.style.zIndex = hs.visualZIndex || 15;
        container.appendChild(visual);
    });

    const showVisual = hs => {
        const v = document.getElementById(hs.visualId);
        if (v) { v.style.opacity = '1'; v.style.filter = 'brightness(1.16) drop-shadow(0 0 7px rgba(0,255,80,0.42))'; }
    };
    const hideVisual = hs => {
        const v = document.getElementById(hs.visualId);
        if (v) { v.style.opacity = v.dataset.baseOpacity || '0'; v.style.filter = ''; }
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

    const previewHotspot = hs => {
        hideAllVisuals();
        showVisual(hs);
        showLabel(hs);
    };

    const runAction = hs => {
        if (lastClickedHotspot === hs.id && typewriterActive) return;
        lastClickedHotspot = hs.id;
        previewHotspot(hs);

        if (hs.action === 'chat') {
            setPhoneOpen(true);
            setPhoneBubble(hs.reply);
            return;
        }

        if (hs.action === 'ios') {
            showIphone();
            return;
        }

        if (hs.action.startsWith('phone:')) {
            openPhoneContent(hs.action.slice(6));
            return;
        }

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
        trigger.style.zIndex = hs.triggerZIndex || 25;
        container.appendChild(trigger);

        if (!isMobile) {
            trigger.addEventListener('mouseenter', () => previewHotspot(hs));
            trigger.addEventListener('focus', () => previewHotspot(hs));
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
                previewHotspot(hs);
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

    // B) Particules flottantes — ambiance chambre entière
    const PARTICLE_CONFIGS = [
        // Micro poussières vertes autour de l'ordi (zone droite)
        { count: 12, leftRange: [50, 85], topRange: [10, 72], sizeRange: [2, 3.5], color: 'rgba(0,255,80,', opacRange: [0.25, 0.55] },
        // Particules diffuses côté gauche (posters)
        { count: 6,  leftRange: [5, 40],  topRange: [15, 65], sizeRange: [1.5, 2.5], color: 'rgba(0,200,255,', opacRange: [0.1, 0.3] },
        // Grosses particules lumineuses rares
        { count: 3,  leftRange: [20, 80], topRange: [20, 60], sizeRange: [4, 6], color: 'rgba(0,255,80,', opacRange: [0.08, 0.2] },
    ];

    PARTICLE_CONFIGS.forEach(cfg => {
        for (let i = 0; i < cfg.count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const left  = cfg.leftRange[0] + Math.random() * (cfg.leftRange[1] - cfg.leftRange[0]);
            const top   = cfg.topRange[0]  + Math.random() * (cfg.topRange[1]  - cfg.topRange[0]);
            const size  = (cfg.sizeRange[0] + Math.random() * (cfg.sizeRange[1] - cfg.sizeRange[0])).toFixed(1);
            const maxOp = (cfg.opacRange[0] + Math.random() * (cfg.opacRange[1] - cfg.opacRange[0])).toFixed(2);
            const dur   = (9 + Math.random() * 8).toFixed(1);
            const delay = -(Math.random() * 12).toFixed(1);
            p.style.left   = left + '%';
            p.style.top    = top  + '%';
            p.style.width  = size + 'px';
            p.style.height = size + 'px';
            p.style.background = cfg.color + maxOp + ')';
            p.style.boxShadow  = `0 0 ${parseFloat(size) * 2.5}px ${cfg.color + maxOp + ')'}`;
            p.style.animationDuration = dur + 's, ' + (parseFloat(dur) * 0.8).toFixed(1) + 's';
            p.style.animationDelay    = delay + 's, ' + delay + 's';
            sceneEl.appendChild(p);
            particlesEls.push(p);
        }
    });

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
// IPHONE 3GS — OVERLAY IOS
// ═══════════════════════════════════════════════════════

let iphoneBuilt = false;
let iosClockInterval = null;

const IOS_APPS = [
    { icon: '📞', label: 'Appeler',   bg: 'linear-gradient(160deg,#34c759,#1d7b33)', action: 'tel:+33600000000' },
    { icon: '✉️', label: 'Mail',      bg: 'linear-gradient(160deg,#3b87f5,#0a52d4)', action: 'mailto:leroux.gaspard56500@gmail.com' },
    { icon: 'in', label: 'LinkedIn',  bg: 'linear-gradient(160deg,#0b7bb5,#084e76)', action: 'https://linkedin.com/in/gaspard-leroux-11b24a202/' },
    { icon: '⌨',  label: 'GitHub',   bg: 'linear-gradient(160deg,#444,#111)',        action: 'https://github.com/lerouxgaspard' },
    { icon: '🤖', label: 'Agents IA', bg: 'linear-gradient(160deg,#7b5ea7,#4a3068)', action: 'reply:J\'ai construit 8 agents IA pour le hackathon PayFit — pipeline SEO entier, 1er prix. Dust, Claude API, Make. C\'est mon terrain de jeu.' },
    { icon: '🎨', label: 'Design',    bg: 'linear-gradient(160deg,#ff6b35,#c43b00)', action: 'reply:Flamingo Fest, Pour Ta Culture, Marenner\'s... Le design c\'est comme la musique : soit ça claque, soit ça claque pas.' },
    { icon: '🌊', label: 'Surf',      bg: 'linear-gradient(160deg,#00b4d8,#0077b6)', action: 'reply:Auray, Bretagne. J\'ai grandi avec l\'océan à 20 minutes. Le surf c\'est le seul moment où mon cerveau ferme vraiment sa gueule.' },
    { icon: '🏗',  label: 'Projet',   bg: 'linear-gradient(160deg,#f9c74f,#c47a00)', action: 'reply:Un parc d\'art immersif itinérant pour les familles — éducation émotionnelle par l\'art dans les villes françaises. Inspiré du Puy du Fou mais centré sur la culture. C\'est mon ambition.' },
];

const IOS_DOCK = [
    { icon: '💬', label: 'Messages', bg: 'linear-gradient(160deg,#34c759,#1d7b33)', action: 'reply:Tu peux m\'écrire à leroux.gaspard56500@gmail.com. Je réponds vite.' },
    { icon: '🌐', label: 'Safari',   bg: 'linear-gradient(160deg,#3b87f5,#0a52d4)', action: 'https://lerouxgaspard.github.io/Portfolio_2026/' },
    { icon: '🎵', label: 'Musique',  bg: 'linear-gradient(160deg,#ff3b30,#c0392b)', action: 'reply:French Touch, électro, tout ce qui a une texture. Daft Punk, Gesaffelstein, Polo & Pan. La musique me sert d\'architecture mentale.' },
    { icon: '📷', label: 'Photos',   bg: 'linear-gradient(160deg,#aaa,#555)',       action: 'scene:photos' },
];

function buildIphoneContent() {
    if (iphoneBuilt) return;
    iphoneBuilt = true;

    const grid  = document.getElementById('ios-app-grid');
    const dock  = document.getElementById('ios-dock-icons');

    const makeIcon = (app) => {
        const wrap = document.createElement('div');
        wrap.className = 'ios-icon';

        const inner = document.createElement('div');
        inner.className = 'ios-icon-inner';
        inner.style.background = app.bg;

        const emoji = document.createElement('span');
        emoji.className = 'ios-icon-emoji';
        emoji.textContent = app.icon;

        const gloss = document.createElement('div');
        gloss.className = 'ios-icon-gloss';

        inner.appendChild(emoji);
        inner.appendChild(gloss);

        const label = document.createElement('span');
        label.className = 'ios-icon-label';
        label.textContent = app.label;

        wrap.appendChild(inner);
        wrap.appendChild(label);

        wrap.addEventListener('click', e => {
            e.stopPropagation();
            handleIosAction(app.action);
        });

        return wrap;
    };

    IOS_APPS.forEach(app => grid.appendChild(makeIcon(app)));
    IOS_DOCK.forEach(app => dock.appendChild(makeIcon(app)));

    updateIosClock();
}

function handleIosAction(action) {
    if (action.startsWith('reply:')) {
        typewrite(action.slice(6));
        hideIphone();
    } else if (action.startsWith('scene:')) {
        hideIphone();
        transitionTo(action.slice(6));
    } else if (action.startsWith('http') || action.startsWith('mailto:') || action.startsWith('tel:')) {
        window.open(action, '_blank');
    }
}

function updateIosClock() {
    const el = document.getElementById('ios-time');
    if (!el) return;
    const now = new Date();
    el.textContent = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
}

function showIphone() {
    buildIphoneContent();
    const overlay = document.getElementById('iphone-overlay');
    overlay.classList.add('visible');
    typewrite("Attends, laisse-moi chercher mon téléphone...");
    if (iosClockInterval) clearInterval(iosClockInterval);
    iosClockInterval = setInterval(updateIosClock, 30000);
}

function hideIphone() {
    const overlay = document.getElementById('iphone-overlay');
    overlay.classList.remove('visible');
    if (iosClockInterval) { clearInterval(iosClockInterval); iosClockInterval = null; }
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

const chatSendButton = document.getElementById('chat-send');
const chatInput = document.getElementById('chat-input');
if (chatSendButton && chatInput) {
    chatSendButton.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleSend();
    });
}

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
    currentMobileMode = isMobileView();
    renderPhoneHome();
    const phoneShell = document.getElementById('phone-shell');
    const phoneModule = document.getElementById('phone-module');
    if (phoneShell && phoneModule) {
        phoneShell.addEventListener('click', event => {
            if (event.target.closest('button')) return;
            if (!phoneModule.classList.contains('is-open')) setPhoneOpen(true);
        });
    }
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

let resizeSceneTimer = null;
window.addEventListener('resize', () => {
    const nextMobileMode = isMobileView();
    if (nextMobileMode === currentMobileMode) return;
    currentMobileMode = nextMobileMode;
    clearTimeout(resizeSceneTimer);
    resizeSceneTimer = setTimeout(() => {
        if (currentScene && SCENES[currentScene]) {
            loadScene(currentScene, { showTransition: false });
        }
    }, 120);
});

initGame();
