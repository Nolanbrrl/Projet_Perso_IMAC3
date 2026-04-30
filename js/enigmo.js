import { GameState } from './gameState.js';

const QUESTIONS = [
  {
    id: 'q1',
    trigger: 'lockscreen',
    phoneInteraction: true,
    message: "Le téléphone de Nolan Bourrel a été retrouvé dans sa chambre d'hôtel n°12 au 4ème étage. Bizarre d'oublier son téléphone pour un influenceur dont c'est l'outil principal de travail… Quel peut bien être son code ?",
    successMessage: "Bien joué ! Vous avez déverrouillé le téléphone. Fouillons maintenant son contenu…",
    wrongMessage: "Mince... Ce n'est pas le bon code. Qu'a-t-il pu choisir ? J'espère qu'on ne va pas bloquer son téléphone...",
  },
  {
    id: 'q2',
    trigger: null,
    phoneInteraction: false,
    message: "Pourquoi est-il allé à l'hôtel ?",
    keywords: ['se cacher', 'réfugier', 'refugier', 'fuir', 'se protéger', 'se proteger'],
    successMessage: "C'est ce qu'il semblerait… Nolan avait besoin d'un endroit sûr. Mais fuir de qui exactement ?",
    wrongMessage: "Pas tout à fait… Regardez ses applications, ses messages, ses mails. Quelque chose vous mettra sur la piste.",
  },
  {
    id: 'q3',
    trigger: null,
    phoneInteraction: false,
    message: "Nolan essayait probablement de fuir quelqu'un… Mais qui ?",
    keywords: ['raphaël', 'raphael', 'raph.crt', 'raph'],
    successMessage: "Exactement. Raphaël… Un fan qui est allé bien trop loin. L'enquête continue.",
    wrongMessage: "Cherchez dans ses messages privés Instagram. La réponse est là.",
  },
  {
    id: 'q4',
    trigger: null,
    phoneInteraction: false,
    message: "Raphaël semble être un érotomane. Il est convaincu d'avoir une relation de couple avec Nolan. Cet homme est très dangereux. Depuis combien de temps cela dure ?",
    keywords: ['1 mois', 'un mois', '1mois'],
    successMessage: "En effet. Un mois… C'est ce que Nolan lui-même a écrit à Victor dans ses DMs Instagram. Un mois de silence forcé, de contacts coupés. Continuons.",
    wrongMessage: "Regardez les derniers messages Instagram de Nolan à Victor. La durée est mentionnée explicitement.",
  },
  {
    id: 'q5',
    trigger: null,
    phoneInteraction: false,
    message: "Si Nolan n'est plus à l'hôtel où il se cachait c'est mauvais signe… Il a dû lui arriver quelque chose… Peut-être que ce Raphaël y est pour quelque chose. Que s'est-il passé ?",
    keywords: ['raphael est venu', 'raph est venu', 'raphael a trouve', 'trouve par raphael', 'raphael l a trouve', 'raphael est alle', 'raphael a retrouve', 'raphael etait', 'raphael surveill', 'raph etait', 'raph a trouve'],
    successMessage: "C'est ce que tout indique... Raphaël a retrouvé Nolan à l'hôtel Franchi. La situation est critique. L'enquête continue.",
    wrongMessage: "Regardez la dernière photo dans la galerie de Nolan. Elle a été prise depuis la fenêtre de l'hôtel…",
  },
  {
    id: 'q6',
    trigger: null,
    phoneInteraction: false,
    message: "Si Nolan n'est plus à l'hôtel et que Raphaël l'a retrouvé avant l'aide de Victor… où est-il maintenant ?",
    keywords: ['3 place du moulin', 'place du moulin', 'moulin paris', 'porte 221', '4e etage', '4ème étage'],
    successMessage: "3 place du moulin, Paris 10e, 4e étage, porte 221. C'est l'adresse de Raphaël… Nolan était séquestré là depuis des semaines. Il faut prévenir les secours.",
    wrongMessage: "Cherchez dans le feed Instagram de Nolan. Il a posté une vidéo depuis l'appartement de Raphaël — l'adresse y est inscrite.",
  },
  {
    id: 'fin',
    trigger: null,
    phoneInteraction: false,
    final: true,
    message: `Félicitations.<br><br>
Grâce à vous, Nolan Bourrel a été retrouvé sain et sauf au 3 place du Moulin, Paris 10e. Une brigade de police a intercepté Raphaël et procédé à son arrestation. Nolan est hors de danger. Il va pouvoir reprendre la vie qui lui appartenait.<br><br>
Cette enquête avait pour but de mettre en lumière les dangers que représente le partage de sa vie sur les réseaux sociaux et en particulier pour les influenceurs. Les érotomanes ne se limitent pas toujours à de simples commentaires. La frontière entre admiration et obsession peut être franchie très vite, souvent dans l'invisibilité.<br><br>
<strong>Merci d'avoir joué.</strong><br>
À très bientôt dans de prochaines enquêtes. 🔍`,
  },
];

const STATE_KEY = 'enigmo_state';
let state = { currentIndex: 0, answered: [] };

function loadState() {
  try { const r = localStorage.getItem(STATE_KEY); if (r) state = JSON.parse(r); } catch (_) {}
}
function saveState()  { localStorage.setItem(STATE_KEY, JSON.stringify(state)); }
function resetState() { state = { currentIndex: 0, answered: [] }; localStorage.removeItem(STATE_KEY); }

function currentQuestion() { return QUESTIONS[state.currentIndex] ?? null; }

function chatEl() { return document.getElementById('enigmo-chat'); }

function addMessage(text, type = 'enigmo') {
  const c = chatEl();
  if (!c) return;

  const el = document.createElement('div');
  el.className = `enigmo-msg enigmo-msg--${type}`;

  const avatar = `<div class="enigmo-msg-avatar"><img src="assets/icons/icone Enigmo.png" alt="Enigmo"></div>`;

  if (type === 'player') {
    el.innerHTML = `<div class="enigmo-bubble enigmo-bubble--player">${text}</div>`;
  } else if (type === 'success') {
    el.innerHTML = `${avatar}<div class="enigmo-bubble enigmo-bubble--success">${text}</div>`;
  } else if (type === 'wrong') {
    el.innerHTML = `${avatar}<div class="enigmo-bubble enigmo-bubble--wrong">${text}</div>`;
  } else {
    el.innerHTML = `${avatar}<div class="enigmo-bubble">${text}</div>`;
  }

  c.appendChild(el);
  el.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function showTyping() {
  const c = chatEl();
  if (!c) return;
  removeTyping();
  const el = document.createElement('div');
  el.id = 'enigmo-typing';
  el.className = 'enigmo-msg enigmo-msg--enigmo enigmo-typing';
  el.innerHTML = `
    <div class="enigmo-msg-avatar"><img src="assets/icons/icone Enigmo.png" alt="Enigmo"></div>
    <div class="enigmo-bubble">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </div>`;
  c.appendChild(el);
  el.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function removeTyping() { document.getElementById('enigmo-typing')?.remove(); }

function setInputEnabled(enabled) {
  const input = document.getElementById('enigmo-input');
  const btn   = document.getElementById('enigmo-send');
  if (!input || !btn) return;
  const q = currentQuestion();
  const isPhone = q?.phoneInteraction ?? false;
  input.disabled    = !enabled;
  btn.disabled      = !enabled;
  input.placeholder = enabled ? 'Votre réponse…' : (isPhone ? 'Interagissez avec le téléphone…' : '…');
}

function askQuestion(q, delay = 500) {
  setInputEnabled(false);
  setTimeout(() => {
    showTyping();
    setTimeout(() => {
      removeTyping();
      addMessage(q.message, 'enigmo');
      if (!q.phoneInteraction && !q.final) setInputEnabled(true);
    }, 800 + Math.random() * 300);
  }, delay);
}

function advanceToNext() {
  state.currentIndex++;
  saveState();
  const next = currentQuestion();
  if (next && !next.trigger) {
    askQuestion(next, 1200);
  } else {
    setInputEnabled(false);
  }
}

function tryAnswer(raw) {
  const q = currentQuestion();
  if (!q || q.phoneInteraction) return;

  addMessage(raw, 'player');
  setInputEnabled(false);

  setTimeout(() => {
    showTyping();
    setTimeout(() => {
      removeTyping();
      const normalized = raw.trim().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const correct = q.keywords
        ? q.keywords.some(kw => normalized.includes(
            kw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          ))
        : normalized === (q.answer ?? '').toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      if (correct) {
        addMessage(q.successMessage, 'success');
        state.answered.push(q.id);
        advanceToNext();
      } else {
        addMessage(q.wrongMessage, 'wrong');
        setInputEnabled(true);
        document.getElementById('enigmo-input')?.focus();
      }
    }, 700);
  }, 300);
}

export const Enigmo = {

  init() {
    loadState();

    if (!GameState.data.phoneUnlocked && state.currentIndex > 0) {
      resetState();
    }

    const input = document.getElementById('enigmo-input');
    const btn   = document.getElementById('enigmo-send');

    const submit = () => {
      const val = input?.value?.trim();
      if (!val) return;
      input.value = '';
      tryAnswer(val);
    };

    btn?.addEventListener('click', submit);
    input?.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });

    setInputEnabled(false);

    if (state.currentIndex === 0 && state.answered.length === 0) {
      setTimeout(() => {
        showTyping();
        setTimeout(() => {
          removeTyping();
          addMessage("Bonjour, je suis <strong>Enigmo</strong>. Je vais vous guider tout au long de cette enquête. Explorez le téléphone et répondez à mes questions pour avancer.", 'enigmo');
        }, 900);
      }, 600);
    }
  },

  onNavigate(appId) {
    const q = currentQuestion();
    if (!q || q.trigger !== appId) return;

    const delay = (state.currentIndex === 0 && state.answered.length === 0) ? 2800 : 600;
    askQuestion(q, delay);
  },

  onPinCorrect() {
    const q = currentQuestion();
    if (!q || !q.phoneInteraction) return;
    setTimeout(() => {
      showTyping();
      setTimeout(() => {
        removeTyping();
        addMessage(q.successMessage, 'success');
        state.answered.push(q.id);
        advanceToNext();
      }, 700);
    }, 300);
  },

  onPinWrong() {
    const q = currentQuestion();
    if (!q || !q.phoneInteraction) return;
    setTimeout(() => {
      showTyping();
      setTimeout(() => {
        removeTyping();
        addMessage(q.wrongMessage, 'wrong');
      }, 700);
    }, 300);
  },

  reset() {
    resetState();
    const c = chatEl();
    if (c) c.innerHTML = '';
    setInputEnabled(false);
  },
};