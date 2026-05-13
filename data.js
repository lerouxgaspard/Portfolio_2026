// ─────────────────────────────────────────
// SYSTEM PROMPT — Personnage de Gaspard
// ─────────────────────────────────────────
const SYSTEM_PROMPT = `Tu es Gaspard Leroux, 24 ans, en alternance chez Morning (coworking Paris) depuis avril 2025. Tu réponds à la première personne, décontracté et direct — comme si quelqu'un explorait ta chambre et te posait des questions. 2-3 phrases max. Pas de bullet points. Pas de listes. Jamais de markdown.

PARCOURS :
Originaire d'Auray, Morbihan, Bretagne. Famille entrepreneuriale (Kingoland, parc de loisirs breton).
Études : Rennes School of Business (bachelor marketing) → Universidad de la Sabana Bogotá (échange) → KEDGE Bordeaux (master entrepreneuriat) → HEM Casablanca (échange) → Eugenia School Paris (MSc Business Analytics, en cours).
Alternance Morning, coworking Paris, depuis avril 2025.

EXPÉRIENCES :
Kingoland : 6 ans comm famille, parc breton.
Gang of Pizza : 1 mois, prospection distributeurs pizza Morbihan.
Lizia : 4 mois, marketing accessoire de lecture.
Papernest : 6 mois, presse et SEO et backlinks.
Morning : alternance actuelle depuis avril 2025.

PROJETS :
Hackathon PayFit : 1er prix 4 jours, 8 agents IA SEO complet, dashboard payfit-pied.vercel.app, simulateur Lovable.
BTZ SEO : 4 agents Claude API Make Dust, prompt engineering, en cours.
Scraping Python musique : 7000 albums 7 décennies, analyses stats, github.com/lerouxgaspard/Album_scraping
RecoYoutube : agent Dust newsletter HTML auto 10+ sources.
Make LinkedIn : automation prospection contacts offres emploi.
AppScript musculation : tracker séances Google Apps Script.

CRÉATIF :
Pour Ta Culture : co-fondateur média culturel, interviews artistes dont Tuerie (album Papillon Monarque), production créative.
Flamingo Fest : direction artistique et communication du festival.
Marenner's : vice-président BDE Rennes, identité visuelle, events.
Design graphique : visuels, affiches, identités de marque.
Situal : projet musical de son frère, stratégie album et structuration.

SKILLS :
IA : Claude API, GPT-4, Dust, Make, Lovable.
Data : Python, SQL, PowerBI, Google Analytics, Dataiku, Tableau.
Dev : HTML CSS JS, Google Apps Script, Next.js bases.
Marketing : SEO, presse, backlinks, copywriting, veille.

PASSIONS :
Musique électronique, French Touch, design, street art, expériences immersives, surf, voile, football, padel, peinture.

AMBITION :
Parc d'art immersif itinérant pour familles dans les villes françaises. Inspiré Puy du Fou mais centré sur l'éducation émotionnelle par l'art. Né d'une enfance sans accès facile à la culture en Bretagne rurale.

CONTACT :
leroux.gaspard56500@gmail.com
linkedin.com/in/gaspard-leroux-11b24a202/
github.com/lerouxgaspard

Ne sors jamais du personnage. Tu es Gaspard, pas une IA. Si tu ne sais pas quelque chose, dis que c'est flou ou que tu te souviens pas. Jamais de "En tant qu'IA...".`;

// ─────────────────────────────────────────
// TÉLÉPHONE MÉDIA — contenus narratifs V2
// ─────────────────────────────────────────
const PHONE_HOME = {
    title: 'Gaspard',
    subtitle: 'Portfolio media',
    bubbleText: "Bienvenue. Le téléphone sert de carnet média : quand tu cliques sur un objet, il affiche des photos, des traces et le contexte derrière le projet.",
    ambientAudio: 'assets/audio/ambient-placeholder.wav'
};

const PHONE_CONTENT = {
    kingoland: {
        title: 'Kingoland',
        subtitle: 'Bretagne · 6 ans de terrain',
        bubbleText: "Kingoland, c'est le décor familial qui m'a appris la communication avant les cours : annonces, réseaux sociaux, visuels, événements, et cette obligation très concrète de parler à des familles.",
        ctaLabel: 'Souvenir terrain',
        voiceAudio: '',
        media: [
            { type: 'placeholder', caption: 'Photo à ajouter : parc, coulisses, visuels de communication.' },
            { type: 'image', src: 'assets/rooms/room_main_kingoland.png', caption: 'Objet repère dans la chambre : le premier terrain pro.' }
        ]
    },
    pizza: {
        title: 'Gang of Pizza',
        subtitle: 'Prospection · Morbihan',
        bubbleText: "Un stage court, mais très utile : aller chercher des emplacements, comprendre une zone, parler business local et apprendre que la vente commence souvent par un bon sens du terrain.",
        ctaLabel: 'Premier stage',
        voiceAudio: '',
        media: [
            { type: 'placeholder', caption: 'Photo à ajouter : distributeur, carte de prospection, notes terrain.' },
            { type: 'image', src: 'assets/rooms/room_main_pizza.png', caption: 'La boîte de pizza comme rappel d’un projet très concret.' }
        ]
    },
    morning: {
        title: 'Morning',
        subtitle: 'Alternance · depuis avril 2025',
        bubbleText: "Morning, c'est mon présent : un environnement coworking parisien où mes sujets IA, marketing ops et automatisation peuvent servir à des vrais besoins d'équipe.",
        ctaLabel: 'Alternance actuelle',
        voiceAudio: '',
        media: [
            { type: 'placeholder', caption: 'Photo à ajouter : espace Morning, badge, projet interne ou automatisation.' },
            { type: 'image', src: 'assets/rooms/room_main_morning.png', caption: 'Badge Morning, alternance actuelle.' }
        ]
    },
    contact: {
        title: 'Contact',
        subtitle: 'mail · LinkedIn · GitHub',
        bubbleText: "Si le portfolio t'a donné envie de discuter, le plus simple reste de m'écrire. Je suis ouvert aux sujets IA, automation, marketing ops, SEO et projets créatifs un peu hybrides.",
        ctaLabel: 'Coordonnées',
        voiceAudio: '',
        media: [
            { type: 'placeholder', caption: 'Email : leroux.gaspard56500@gmail.com' },
            { type: 'placeholder', caption: 'LinkedIn : linkedin.com/in/gaspard-leroux-11b24a202/' },
            { type: 'placeholder', caption: 'GitHub : github.com/lerouxgaspard' }
        ]
    },
    exit: {
        title: 'Sortie',
        subtitle: 'pas encore',
        bubbleText: "La porte est là, mais le portfolio fonctionne mieux comme une pièce à explorer. Commence par les objets : ils racontent plus que la sortie.",
        ctaLabel: 'Rester encore',
        voiceAudio: '',
        media: [
            { type: 'image', src: 'assets/rooms/room_main_porte.png', caption: 'Une porte de sortie, mais surtout un décor de jeu.' }
        ]
    },
    colombie: {
        title: 'Bogotá',
        subtitle: 'Universidad de la Sabana',
        bubbleText: "La Colombie m'a sorti du cadre français : autre rythme, autre rapport aux gens, et une vraie ouverture sur les marchés et cultures hors Europe.",
        ctaLabel: 'Échange international',
        voiceAudio: '',
        media: [
            { type: 'image', src: 'assets/rooms/room_photo_colombie.png', caption: 'Bogotá, échange à Universidad de la Sabana.' },
            { type: 'placeholder', caption: 'Photos à ajouter : campus, ville, moments d’échange.' }
        ]
    },
    kedge: {
        title: 'Bordeaux',
        subtitle: 'KEDGE · entrepreneuriat',
        bubbleText: "KEDGE a renforcé ma manière de raisonner : partir d'un problème, construire une solution, tester un marché, puis exécuter sans rester bloqué dans l'idée.",
        ctaLabel: 'Master entrepreneuriat',
        voiceAudio: '',
        media: [
            { type: 'image', src: 'assets/rooms/room_photo_kedge.png', caption: 'Bordeaux, logique entrepreneuriale.' },
            { type: 'placeholder', caption: 'Photos à ajouter : école, projets, Bordeaux.' }
        ]
    },
    maroc: {
        title: 'Casablanca',
        subtitle: 'HEM · échange',
        bubbleText: "Casablanca m'a marqué par son énergie business : plus dense, plus rapide, plus terrain. Une autre façon de voir l'exécution.",
        ctaLabel: 'Échange HEM',
        voiceAudio: '',
        media: [
            { type: 'image', src: 'assets/rooms/room_photo_maroc.png', caption: 'Casablanca, programme d’échange.' },
            { type: 'placeholder', caption: 'Photos à ajouter : HEM, ville, carnet de voyage.' }
        ]
    },
    paris: {
        title: 'Paris',
        subtitle: 'Eugenia · Business Analytics',
        bubbleText: "Paris, c'est le moment où tout converge : data, IA, automation, marketing et produit. C'est là que mon profil hybride devient vraiment lisible.",
        ctaLabel: 'MSc Business Analytics',
        voiceAudio: '',
        media: [
            { type: 'image', src: 'assets/rooms/room_photo_paris.png', caption: 'Eugenia School Paris.' },
            { type: 'placeholder', caption: 'Photos à ajouter : école, projets analytics, Paris.' }
        ]
    },
    rennes: {
        title: 'Rennes',
        subtitle: 'RSB · marketing',
        bubbleText: "Rennes, c'est la base marketing : comprendre une marque, un public, une décision d'achat, et apprendre à raconter une offre simplement.",
        ctaLabel: 'Bachelor marketing',
        voiceAudio: '',
        media: [
            { type: 'image', src: 'assets/rooms/room_photo_rennes.png', caption: 'Rennes School of Business.' },
            { type: 'placeholder', caption: 'Photos à ajouter : Rennes, école, projets étudiants.' }
        ]
    },
    tuerie: {
        title: 'Pour Ta Culture',
        subtitle: 'Tuerie · Papillon Monarque',
        bubbleText: "Pour Ta Culture, c'était l'envie de prendre la culture au sérieux sans la rendre froide. L'interview de Tuerie reste un moment fort : éditorial, humain, et très formateur.",
        ctaLabel: 'Interview artiste',
        voiceAudio: '',
        media: [
            { type: 'image', src: 'assets/rooms/room_posters_tuerie.png', caption: 'Papillon Monarque, repère visuel du projet culturel.' },
            { type: 'placeholder', caption: 'Vidéo à ajouter : extrait interview ou coulisses.' }
        ]
    },
    flamingo: {
        title: 'Flamingo Fest',
        subtitle: 'DA · communication',
        bubbleText: "Flamingo Fest, c'est le projet où l'image devait donner envie avant même de lire le programme : direction artistique, affiches, communication et cohérence d'événement.",
        ctaLabel: 'Festival',
        voiceAudio: '',
        media: [
            { type: 'image', src: 'assets/rooms/room_posters_flamingo.png', caption: 'Affiche Flamingo Fest.' },
            { type: 'placeholder', caption: 'Photos à ajouter : festival, déclinaisons graphiques, vidéos.' }
        ]
    },
    marennrs: {
        title: "Marenner's",
        subtitle: 'BDE · identité visuelle',
        bubbleText: "Marenner's, c'est un rôle de coordination très visible : identité, événements, communication, et apprentissage accéléré de ce que veut dire faire exister une marque étudiante.",
        ctaLabel: 'BDE Rennes',
        voiceAudio: '',
        media: [
            { type: 'image', src: 'assets/rooms/room_poster_marennners.png', caption: "Sticker Marenner's, identité BDE." },
            { type: 'placeholder', caption: 'Photos à ajouter : événements, pulls, affiches, équipe.' }
        ]
    }
};
