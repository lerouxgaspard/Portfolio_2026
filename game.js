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

function typewrite(text) {
    const el = document.getElementById('chat-text');
    const token = ++typeToken;
    el.textContent = '';
    let i = 0;
    function tick() {
        if (token !== typeToken) return; // annulé
        if (i < text.length) {
            el.textContent += text[i++];
            setTimeout(tick, 25);
        }
    }
    tick();
}

// ═══════════════════════════════════════════════════════
// DONNÉES DES SCÈNES
// ═══════════════════════════════════════════════════════
const SCENES = {

    main: {
        image: 'assets/rooms/room_main.png',
        introText: "Hé. Tu fouilles dans ma chambre ? Bonne idée —\nc'est comme ça qu'on apprend à se connaître.\nClique sur quelque chose.",
        hotspots: [
            {
                id: 'hs-ordi',
                css: { left: '58%', top: '30%', width: '22%', height: '32%' },
                label: "[ INSPECTER L'ORDINATEUR ]",
                action: 'scene:bureau',
                reply: "Là c'est mon QG. Python, SQL, Claude API, Make, Dust... J'ai construit des trucs qui tournent vraiment. Clique pour voir mes projets."
            },
            {
                id: 'hs-posters',
                css: { left: '16%', top: '18%', width: '18%', height: '42%' },
                label: '[ REGARDER LES POSTERS ]',
                action: 'scene:posters',
                reply: "Mon mur créatif. Papillon Monarque de Tuerie, le Flamingo Fest, Marenner's... C'est la partie de moi que le CV montre pas."
            },
            {
                id: 'hs-photos',
                css: { left: '42%', top: '25%', width: '16%', height: '28%' },
                label: '[ REGARDER LES PHOTOS ]',
                action: 'scene:photos',
                reply: "Rennes, Colombie, Bordeaux, Casablanca, Paris. Chaque ville avait une logique. Clique pour les voir de plus près."
            },
            {
                id: 'hs-lit',
                css: { left: '18%', top: '42%', width: '24%', height: '35%' },
                label: '[ INSPECTER LE LIT ]',
                action: 'chat',
                reply: "Gaspard Leroux, 24 ans, Auray Morbihan. Famille entrepreneuriale — Kingoland c'est le parc de mes parents, j'ai fait la comm pendant 6 ans. Eugenia School maintenant, alternance chez Morning."
            },
            {
                id: 'hs-pizza',
                css: { left: '36%', top: '72%', width: '12%', height: '12%' },
                label: '[ GANG OF PIZZA ]',
                action: 'chat',
                reply: "Un mois à prospecter des zones pour implanter des distributeurs automatiques de pizzas dans le Morbihan. Ouais. C'était mon premier stage."
            },
            {
                id: 'hs-telephone',
                css: { right: '5%', top: '48%', width: '8%', height: '18%' },
                label: '[ TÉLÉPHONE ]',
                action: 'chat',
                reply: "Si t'es arrivé jusqu'ici c'est qu'on a des choses à se dire. leroux.gaspard56500@gmail.com ou LinkedIn : gaspard-leroux-11b24a202"
            },
            {
                id: 'hs-fenetre',
                css: { left: '1%', top: '8%', width: '12%', height: '55%' },
                label: '[ REGARDER PAR LA FENÊTRE ]',
                action: 'chat',
                reply: "Paris de nuit. Je suis breton à la base — Auray, Morbihan. Rennes, Bordeaux, et maintenant Paris. Chaque étape avait une logique."
            },
            {
                id: 'hs-porte',
                css: { right: '1%', top: '5%', width: '9%', height: '65%' },
                label: '[ SORTIR ]',
                action: 'chat',
                reply: "Tu veux partir déjà ? Passe au moins par le téléphone avant de sortir."
            }
        ]
    },

    bureau: {
        image: 'assets/rooms/room_bureau.png',
        introText: "Mon bureau. C'est ici que ça se passe — les agents, les scripts, les pipelines. Clique sur un fichier.",
        hotspots: []
    },

    photos: {
        image: 'assets/rooms/room_photos.png',
        introText: "Mes photos. Chaque ville, une version différente de moi.",
        hotspots: [
            {
                id: 'hs-bordeaux',
                css: { left: '5%', top: '35%', width: '32%', height: '45%' },
                label: '[ BORDEAUX ]',
                action: 'chat',
                reply: "KEDGE Business School, master entrepreneuriat. Bordeaux c'est là où j'ai commencé à vraiment construire des projets."
            },
            {
                id: 'hs-casablanca',
                css: { left: '28%', top: '5%', width: '32%', height: '48%' },
                label: '[ CASABLANCA ]',
                action: 'chat',
                reply: "HEM Business School, programme d'échange. Casablanca m'a surpris — énergie, rythme, culture."
            },
            {
                id: 'hs-colombie',
                css: { right: '2%', top: '5%', width: '30%', height: '48%' },
                label: '[ COLOMBIE ]',
                action: 'chat',
                reply: "Universidad de la Sabana, Bogotá. Six mois à voir le monde autrement. Le genre d'expérience qui recalibre tout."
            },
            {
                id: 'hs-rennes',
                css: { right: '8%', top: '42%', width: '35%', height: '50%' },
                label: '[ RENNES ]',
                action: 'chat',
                reply: "Rennes School of Business, bachelor marketing. Ma première vraie ville. J'ai découvert que j'aimais comprendre pourquoi les gens achètent."
            },
            {
                id: 'hs-paris',
                css: { left: '42%', top: '10%', width: '20%', height: '25%' },
                label: '[ PARIS — EUGENIA ]',
                action: 'chat',
                reply: "Eugenia School, MSc Business Analytics. Et Morning en alternance. Paris c'est maintenant — et c'est exactement là où je voulais être."
            }
        ]
    },

    posters: {
        image: 'assets/rooms/room_posters.png',
        introText: "Mes posters. Ce que j'ai fait en dehors du CV, en dehors des cours.",
        hotspots: [
            {
                id: 'hs-papillon',
                css: { left: '5%', top: '8%', width: '38%', height: '80%' },
                label: '[ TUERIE — PAPILLON MONARQUE ]',
                action: 'chat',
                reply: "J'ai interviewé Tuerie pour Pour Ta Culture, le média qu'on a co-fondé. Papillon Monarque c'est son album. Un artiste qui fait des trucs vraiment intéressants."
            },
            {
                id: 'hs-flamingo',
                css: { left: '38%', top: '18%', width: '42%', height: '72%' },
                label: '[ FLAMINGO FEST ]',
                action: 'chat',
                reply: "J'ai fait la direction artistique et la communication de ce festival. Visuels, affiches, programmation. C'est aussi là que Situal a joué."
            },
            {
                id: 'hs-marennrs',
                css: { left: '3%', bottom: '5%', width: '18%', height: '18%' },
                label: "[ MARENNER'S BDE ]",
                action: 'chat',
                reply: "Vice-président du BDE à Rennes. Identité visuelle, événements, communication. Mon premier rôle de direction."
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

    img.style.display = 'block';
    img.onerror = function () {
        this.style.display = 'none';
        const ph = document.createElement('div');
        ph.id = 'scene-placeholder';
        ph.textContent = '[ place ' + scene.image.split('/').pop() + ' dans assets/rooms/ ]';
        sceneEl.insertBefore(ph, this);
    };
    img.onload = function () {
        this.style.display = 'block';
        const old2 = document.getElementById('scene-placeholder');
        if (old2) old2.remove();
    };
    img.src = scene.image;
}

// ═══════════════════════════════════════════════════════
// UTILITAIRE: DÉTECTION MOBILE
// ═══════════════════════════════════════════════════════
function isMobileView() {
    return window.innerWidth <= 767;
}

// ═══════════════════════════════════════════════════════
// HOTSPOTS
// ═══════════════════════════════════════════════════════
let tapLabelTimeout = null;

function renderHotspots(hotspots) {
    const container = document.getElementById('hotspots-container');
    const labelHint = document.getElementById('label-hint');
    container.innerHTML = '';

    hotspots.forEach(hs => {
        const div = document.createElement('div');
        div.className = 'hotspot';
        div.id = hs.id;

        // Appliquer les styles CSS en %
        Object.entries(hs.css).forEach(([prop, val]) => {
            div.style[prop] = val;
        });

        // COMPORTEMENT DESKTOP (hover)
        if (!isMobileView()) {
            div.addEventListener('mouseenter', () => {
                labelHint.textContent = hs.label;
                labelHint.style.opacity = '1';
                typewrite(hs.reply);
            });

            div.addEventListener('mouseleave', () => {
                labelHint.style.opacity = '0';
            });
        }
        // COMPORTEMENT MOBILE (tap avec délai)
        else {
            div.addEventListener('touchstart', () => {
                // Afficher le label après 1.5s
                if (tapLabelTimeout) clearTimeout(tapLabelTimeout);
                
                tapLabelTimeout = setTimeout(() => {
                    labelHint.textContent = hs.label;
                    labelHint.style.opacity = '1';
                    
                    // Disparaître après 2s supplémentaires
                    setTimeout(() => {
                        labelHint.style.opacity = '0';
                    }, 2000);
                }, 1500);
                
                // Afficher la réplique immédiatement
                typewrite(hs.reply);
            });

            div.addEventListener('touchend', () => {
                if (tapLabelTimeout) clearTimeout(tapLabelTimeout);
            });
        }

        div.addEventListener('click', () => {
            if (hs.action.startsWith('scene:')) {
                loadScene(hs.action.slice(6));
            }
            // action 'chat' : la réplique est déjà affichée au hover/tap
        });

        container.appendChild(div);
    });
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
        typewrite('[ configure config.js avec ta clé API ]');
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
    loadScene('main');
});

// Bouton [X] du bureau
document.getElementById('bureau-close').addEventListener('click', () => {
    loadScene('main');
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
