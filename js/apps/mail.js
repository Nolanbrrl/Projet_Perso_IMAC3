import { Router } from '../router.js';

const MAILS = [
  {
    id: 'm-hotel',
    from: 'Hôtel Franchi',
    addr: 'reservations@hotel-franchi.fr',
    subject: 'Confirmation de réservation — Nuit du 28 janvier',
    preview: 'Chambre double Supérieure, étage 4, n°12 — Check-in mardi 28 janvier…',
    time: '2025-01-28T14:32:00',
    unread: false,
    avatar: 'HF',
    avatarBg: '#1e6b3a',
    body: `<strong style="font-size:.95rem">Hôtel Franchi — Confirmation de réservation</strong><br><br>

Monsieur Nolan Bourrel,<br><br>

Nous avons le plaisir de confirmer votre réservation à l'Hôtel Franchi.<br><br>

<strong>DÉTAILS DE LA RÉSERVATION</strong><br>
Numéro de réservation : <strong>FR-2025-00847</strong><br>
Chambre : Chambre double Supérieure — Étage 4, n°12<br>
Check-in : Mardi 28 janvier 2025, à partir de 15h00<br>
Check-out : Mercredi 29 janvier 2025, avant 11h00<br>
Durée : 1 nuit<br><br>

<strong>TARIF</strong><br>
Nuit : 145,00 €<br>
Taxe de séjour : 3,30 €<br>
Total : <strong>148,30 €</strong> (réglé en ligne)<br><br>

En cas d'annulation ou de modification, veuillez nous contacter avant le 28 janvier 2025 à 12h00.<br><br>

Au plaisir de vous accueillir,<br>
<em>L'équipe de l'Hôtel Franchi</em><br>
12 rue des Acacias, 75017 Paris<br>
01 47 63 28 90`,
    attachment: null,
  },
  {
    id: 'm-ami',
    from: 'Lucas Mérand',
    addr: 'lucas.merand@gmail.com',
    subject: 'Bonne année ! 🥂',
    preview: 'Yo Nolan ! T\'as passé le réveillon où finalement ? On t\'a attendu chez Mathieu…',
    time: '2025-01-01T00:04:00',
    unread: true,
    avatar: 'LM',
    avatarBg: '#2e86c1',
    body: `Yo Nolan !<br><br>

Bonne année mec 🥂 T'as passé le réveillon où finalement ? On t'a attendu chez Mathieu, on s'est dit que t'allais débarquer à minuit comme d'hab… Résultat on t'a grillé en tout cas 😄<br><br>

Cette année on s'organise mieux, promis. À très vite !<br><br>

Lucas`,
    attachment: null,
  },
  {
    id: 'm-bank',
    from: 'IMACBank',
    addr: 'noreply@imacbank.fr',
    subject: 'Alerte : solde bas sur votre compte',
    preview: 'Votre compte courant (****4521) est passé en dessous du seuil d\'alerte…',
    time: '2025-01-01T09:14:00',
    unread: false,
    avatar: 'IB',
    avatarBg: '#1a4f7a',
    body: `Bonjour Monsieur Bourrel,<br><br>

Nous vous informons que le solde de votre compte courant (<strong>****4521</strong>) est passé en dessous du seuil d'alerte de 200 €.<br><br>

Solde actuel : <strong>87,42 €</strong><br><br>

Pour éviter des frais de découvert, nous vous invitons à effectuer un virement ou à déposer des fonds sur votre compte dans les meilleurs délais.<br><br>

Cordialement,<br>
<em>L'équipe IMACBank</em><br>
Service client : 09 72 14 06 78`,
    attachment: null,
  },
  {
    id: 'm-colis',
    from: 'Colissimo',
    addr: 'noreply@colissimo.fr',
    subject: 'Votre colis est disponible en point relais',
    preview: 'REF : 6Y08129384756 — disponible jusqu\'au 4 janvier au Tabac Presse Le Mistral…',
    time: '2024-12-29T09:18:00',
    unread: false,
    avatar: 'CO',
    avatarBg: '#c0392b',
    body: `Bonjour,<br><br>

Votre colis est disponible en point relais.<br><br>

<strong>Référence :</strong> 6Y08129384756<br>
<strong>Point relais :</strong> Tabac Presse Le Mistral — 14 rue de Rivoli, 75004 Paris<br>
<strong>Disponible jusqu'au :</strong> 4 janvier 2025<br><br>

Pensez à vous munir d'une pièce d'identité et de ce numéro de référence.<br><br>

<em>Colissimo — La Poste</em>`,
    attachment: null,
  },
  {
    id: 'm-partenariat',
    from: 'RYNE Studio',
    addr: 'partnerships@rynestudio.com',
    subject: 'Proposition de collaboration 🤝',
    preview: 'Bonjour Nolan, nous suivons votre contenu depuis plusieurs mois et souhaiterions…',
    time: '2024-12-19T10:44:00',
    unread: false,
    avatar: 'RS',
    avatarBg: '#212121',
    body: `Bonjour Nolan,<br><br>

Nous suivons votre contenu depuis plusieurs mois et votre façon d'aborder la création visuelle nous parle vraiment.<br><br>

Chez <strong>RYNE Studio</strong>, on développe une ligne de vêtements pensée pour les gamers. On aimerait beaucoup vous proposer un partenariat sur 2 à 3 posts + une story, avec envoi d'une sélection de pièces de la collection printemps 2025.<br><br>

Budget prévu : <strong>800 €</strong> + produits offerts.<br><br>

Si ça vous intéresse, on peut caler un appel rapide en janvier ?<br><br>

Cordialement,<br>
<em>Camille Duret — Responsable partenariats, RYNE Studio</em>`,
    attachment: null,
  },
  {
    id: 'm-spotify',
    from: 'Spotify',
    addr: 'noreply@spotify.com',
    subject: 'Votre reçu Spotify — décembre 2024',
    preview: 'Merci pour votre paiement. Abonnement Premium individuel — 10,99 €',
    time: '2024-12-01T08:00:00',
    unread: false,
    avatar: 'SP',
    avatarBg: '#1db954',
    body: `Bonjour Nolan,<br><br>

Merci pour votre paiement. Voici votre reçu pour décembre 2024.<br><br>

<strong>Abonnement Premium individuel</strong><br>
Période : 1 déc. 2024 → 31 déc. 2024<br>
Montant débité : <strong>10,99 €</strong><br>
Carte : Visa ****4521<br><br>

Bonne écoute !<br>
<em>L'équipe Spotify</em>`,
    attachment: null,
  },
  {
    id: 'm-maman',
    from: 'Séverine Bourrel',
    addr: 'severine@mail.com',
    subject: 'Joyeux Noël mon chéri 🎄',
    preview: 'Tu nous as vraiment manqué hier soir. La table était grande sans toi…',
    time: '2024-12-26T11:28:00',
    unread: false,
    avatar: 'SB',
    avatarBg: '#7d3c98',
    body: `Mon chéri,<br><br>

Je t'envoie la photo de famille de ce Noël — ton oncle Gilles a encore insisté pour les pulls assortis, comme d'habitude 😄 Ton père a gardé les lèvres pincées toute la soirée mais je sais qu'au fond il t'attendait.<br><br>

Tu nous as vraiment manqué hier soir. La table était grande sans toi.<br><br>

Au fait, j'ai eu Capucine au téléphone la semaine dernière. Elle a l'air vraiment adorable. Le prochain Noël, tu nous la ramènes, d'accord ? Promis ?<br><br>

Prends bien soin de toi mon grand. On t'aime très fort.<br><br>

Maman ❤️`,
    attachment: { name: 'noel_2024_famille.jpg', size: '3,2 Mo', src: 'assets/icons/photo famille mail maman.JPG' },
  },
];

export const Mail = {
  render(params = {}) {
    if (params.view === 'reader') return _renderMail(params.mailId);
    return _renderInbox();
  },

  init(container, params = {}) {
    if (params.view === 'reader') _initMail(container, params.mailId);
    else _initInbox(container);
  },
};

function _renderInbox() {
  const unread = MAILS.filter(m => m.unread).length;

  const items = MAILS.length
    ? MAILS.map(m => `
        <div class="mail-item" data-mail="${m.id}">
          ${m.unread ? '<div class="mail-unread-dot"></div>' : '<div style="width:9px;flex-shrink:0"></div>'}
          <div style="flex:1;min-width:0">
            <div class="mail-sender" style="${m.unread ? 'font-weight:700' : ''}">${m.from}</div>
            <div class="mail-subject" style="${m.unread ? 'font-weight:600' : ''}">${m.subject}</div>
            <div class="mail-preview">${m.preview}</div>
          </div>
          <span class="mail-time">${_formatTime(m.time)}</span>
        </div>`).join('')
    : '<div style="color:#aaa;font-size:.85rem;padding:24px;text-align:center">Aucun mail</div>';

  return `
  <div id="mail-app">
    <div class="mail-header">
      <button id="mail-back" style="background:none;border:none;color:var(--ios-blue);font-size:.9rem;cursor:pointer">‹ Retour</button>
      <div>
        <div class="mail-header-title">Boîte de réception</div>
        ${unread ? `<div class="mail-count">${unread} non lu${unread > 1 ? 's' : ''}</div>` : ''}
      </div>
      <span style="font-size:1.2rem">✏️</span>
    </div>
    <div>${items}</div>
  </div>`;
}

function _initInbox(container) {
  container.querySelector('#mail-back')?.addEventListener('click', () => Router.back());
  container.querySelectorAll('.mail-item').forEach(item => {
    item.addEventListener('click', () => {
      Router.navigate('mail', { view: 'reader', mailId: item.dataset.mail });
    });
  });
}

function _renderMail(mailId) {
  const mail = MAILS.find(m => m.id === mailId);
  if (!mail) return '<div style="padding:20px">Mail introuvable</div>';

  return `
  <div id="mail-app" style="display:flex;flex-direction:column;height:100%">
    <div class="mail-header">
      <button id="reader-back" style="background:none;border:none;color:var(--ios-blue);font-size:.9rem;cursor:pointer">‹ Boîte</button>
      <div class="mail-header-title">Mail</div>
      <span></span>
    </div>
    <div class="mail-view app-scroll">
      <div class="mail-view-subject">${mail.subject}</div>
      <div class="mail-view-from">
        <div class="mail-avatar" style="background:${mail.avatarBg}">${mail.avatar}</div>
        <div class="mail-from-details">
          <div class="mail-from-name">${mail.from}</div>
          <div class="mail-from-addr">${mail.addr}</div>
          <div class="mail-from-date">${new Date(mail.time).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',hour:'2-digit',minute:'2-digit'})}</div>
        </div>
      </div>
      <div class="mail-body">${mail.body}</div>

      ${mail.attachment ? `
        <div class="mail-attachment" id="mail-attach" style="${mail.attachment.src ? 'cursor:pointer' : ''}">
          <span class="mail-attachment-icon">📎</span>
          <div>
            <div class="mail-attachment-name">${mail.attachment.name}</div>
            <div class="mail-attachment-size">${mail.attachment.size}</div>
          </div>
          ${mail.attachment.src ? '<span style="margin-left:auto;color:var(--ios-blue);font-size:.82rem">Ouvrir</span>' : ''}
        </div>` : ''}
    </div>
  </div>`;
}

function _initMail(container, mailId) {
  const mail = MAILS.find(m => m.id === mailId);
  container.querySelector('#reader-back')?.addEventListener('click', () => Router.back());

  container.querySelector('#mail-attach')?.addEventListener('click', () => {
    if (mail?.attachment?.src) {
      window.open(mail.attachment.src, '_blank');
    }
  });
}

function _formatTime(iso) {
  const d    = new Date(iso);
  const diff = Math.floor((Date.now() - d) / 86400000);
  if (diff === 0) return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  if (diff < 7)  return d.toLocaleDateString('fr-FR', { weekday: 'short' });
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
}