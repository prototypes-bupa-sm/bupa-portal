(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const COVERS = ['both', 'none'];
  const state = {
    cover: COVERS.includes(localStorage.getItem('cover')) ? localStorage.getItem('cover') : 'both',
    data: localStorage.getItem('data') !== 'empty'
  };
  const NAV = [['home', 'Home'], ['bookings', 'Bookings'], ['cover', 'Cover'], ['claims', 'Claims', 1], ['extras', 'Extras usage', 2], ['services', 'Services'], ['programs', 'Programs'], ['rewards', 'Rewards']];

  // ---------- icon set: outlined, no fill, brand blue (styled in CSS) ----------
  const P = {
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    headset: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z"/><path d="M18 17v1a3 3 0 0 1-3 3h-2"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    dollar: '<path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    video: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h6"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16M10 14.7V17c0 1-.8 1.8-1.8 2.2C7.2 19.6 7 20.5 7 22M14 14.7V17c0 1 .8 1.8 1.8 2.2 1 .4 1.2 1.3 1.2 2.8"/><path d="M18 2H6v7a6 6 0 0 0 12 0z"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    tooth: '<path d="M7 3C4.5 3 3 5 3 7.5c0 2 1 3 1.5 5 .6 2.5.5 8.5 2.5 8.5 1.5 0 1.5-4 2.500-6 .5-1 1.500-1 2 0 1 2 1 6 2.500 6 2 0 1.900-6 2.500-8.500.5-2 1.500-3 1.500-5C21 5 19.500 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.3l8.8-8.9a5.5 5.5 0 0 0 0-7.8z"/>',
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    steth: '<path d="M5 3H4a1 1 0 0 0-1 1v5a5 5 0 0 0 10 0V4a1 1 0 0 0-1-1h-1"/><path d="M8 14v1a5 5 0 0 0 10 0v-2"/><circle cx="18" cy="11" r="2"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
    pill: '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z"/><path d="m8.5 8.5 7 7"/>',
    dna: '<path d="M7 3c0 6 10 6 10 12v6M17 3c0 6-10 6-10 12v6"/><path d="M8 7h8M8 17h8M9.5 12h5"/>',
    ear: '<path d="M6 8.5a6 6 0 0 1 12 0c0 3-2 4-3 5.5-1 1.500-.5 3.500-2 5a3 3 0 0 1-5-1.500"/><path d="M9 9a3 3 0 0 1 6 0c0 1.500-1.500 2-2 3"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 11v6M9 14h6"/>',
    ribbon: '<path d="M12 3c-3 0-5 2-5 5 0 4 5 7 5 7s5-3 5-7c0-3-2-5-5-5z"/><path d="m9 14-3 7 4-2M15 14l3 7-4-2"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 21v-1a6 6 0 0 1 12 0v1"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14a5 5 0 0 1 5 5v2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/>',
    home: '<path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/>',
    flame: '<path d="M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 2-2 3-3 3 0-3-1-6-4-9-1 4-4 6-4 12 0 4 3 8 7 8z"/>',
    scale: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 9a5 5 0 0 1 8 0M12 9l2-2"/>',
    droplet: '<path d="M12 2.5s7 7 7 12a7 7 0 0 1-14 0c0-5 7-12 7-12z"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    mind: '<path d="M8 21v-3.5C5.5 16 4 13.8 4 10.5A8 8 0 0 1 12 3c4 0 7.500 2.800 7.800 6.800L21 12.500l-1.800.8V16a1.500 1.500 0 0 1-1.500 1.500H15V21z"/><path d="M11.500 13.800 8.900 11a1.800 1.800 0 0 1 2.600-2.500 1.800 1.800 0 0 1 2.600 2.500z"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    cross: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/>'
  };
  const svg = (n, c = '') => `<svg class="i ${c}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
  const icon = n => `<span class="icon" aria-hidden="true">${svg(n)}</span>`;

  // ---------- helpers ----------
  const ph = (n = 2) => Array.from({ length: n }, (_, i) => `<div aria-hidden="true" class="ph ${i === n - 1 && n > 1 ? 's' : ''}"></div>`).join('');
  const line = (ic, w) => `<div class="line">${ic ? svg(ic) : ''}<div class="ph" aria-hidden="true" ${w ? `style="flex:none;width:${w}%"` : ''}></div></div>`;
  const btn = (t, act, cls = '') => `<button class="btn ${cls}" data-act="${act}">${t}</button>`;
  const lnk = (t, act) => `<button class="link" data-act="${act}">${t}</button>`;
  const head = (t, right = '') => `<div class="pagehead"><h1>${t}</h1>${right}</div>`;
  const sec = (t, body, right = '') => `<section><div class="sechead"><h2>${t}</h2>${right}</div>${body}</section>`;
  const grid = (cls, items) => `<div class="grid ${cls}">${items.join('')}</div>`;
  const bar = (label, left, pct) => `<div><div class="limit"><span>${label}</span><span>${left}</span></div><div class="bar"><i style="width:${pct}%"></i></div></div>`;
  const tile = (t, ic) => `<div class="card tiles">${icon(ic)}<h3>${t}</h3>${ph(2)}</div>`;
  const cta = (title, label, act) => `<div class="card promo"><h2>${title}</h2>${ph(2)}<div>${btn(label, act, 'w')}</div></div>`;
  const pill = (t, c = '', ic = '') => `<span class="pill ${c}">${ic ? svg(ic) : ''}${t}</span>`;
  const M = () => state.cover !== 'none';
  const E = () => state.cover === 'both';
  const D = () => state.data;
  const POLICY = () => E() ? 'Members First Ultimate' : 'Members First Hospital';
  const empty = (ic, t, label, act) => `<div class="card center" style="align-items:center">${svg(ic)}<b>${t}</b><div class="ph" style="width:40%"></div>${label ? btn(label, act) : ''}</div>`;
  const faq = q => `<div class="toggle"><b>${q}</b>${svg('plus')}</div>`;

  // ---------- pages ----------
  const pages = {};

  function apptCard(title, who) {
    return `<div class="card stacked"><div class="row between"><div class="row">${icon('calendar')}<h3>${title} · ${who}</h3></div><button class="link" data-act="menu" aria-haspopup="menu" aria-expanded="false" aria-label="More options">${svg('more')}</button></div><hr class="rule">${line('calendar', 70)}${line('pin', 85)}${line('dollar', 50)}</div>`;
  }

  const offer = (t, ic, locked) => `<div class="card">${icon(ic)}<h3>${t}</h3>${ph(2)}${locked ? pill('Members only', 'b', 'shield') : btn('Claim offer', 'toast:Offer claimed', 'push')}</div>`;
  const activity = (ic, t, d, label, act) => `<div><span class="icon" aria-hidden="true">${svg(ic)}</span><span class="t"><b>${t}</b><div class="ph s" style="margin-top:8px"></div></span><span class="d" style="text-align:right">${d}</span><span class="a" style="text-align:right">${lnk(label, act)}</span></div>`;

  const slider = items => `<div class="slider">${items.join('')}</div>`;
  const shortcut = (t, ic, act) => `<button class="shortcut" data-act="${act}"><span class="sc-ic" aria-hidden="true">${svg(ic)}</span><span>${t}</span></button>`;
  const supportRow = (t, sub, ic, act) => `<button class="support-row" data-act="${act}">${icon(ic)}<span><b>${t}</b><small>${sub}</small></span>${svg('chev')}</button>`;
  const slide = (inner, cls = '') => `<div class="card slide ${cls}">${inner}</div>`;

  const todoGone = new Set();
  const todoItems = () => HA.filter(r => r[2] === 0 && r[4] > 0 && !todoGone.has(r[0])).sort((x, y) => y[4] - x[4]);
  function todoCard() {
    const all = todoItems();
    return `<div class="card todo-list" id="todoCard">${all.slice(0, 3).map(([n, src, p, t, st, cta, act]) => `<div class="todo-row"><span class="icon" aria-hidden="true">${svg(HA_TYPES.find(x => x[0] === t)[1])}</span><div class="todo-t"><div class="row"><b>${n}</b>${st === 2 ? pill('Due now', 'a', 'alert') : pill('Due soon', 'b', 'clock')}</div><div class="ha-src">${src}</div></div>${btn(cta, act, 'p')}<button class="link" data-act="todo-dismiss:${n}" aria-label="Dismiss ${n}">${svg('x')}</button></div>`).join('')}</div>`;
  }


  const recommended = () => {
    const c = [
      slide(`<div class="row">${icon('tooth')}<h3>Dental check-up</h3></div>${ph(2)}${E() ? bar('General dental', '$520 left', 55) : ''}${btn('Book an appointment', 'book', 'push')}`),
      slide(`<div class="row">${icon('mind')}<h3>Book a psychologist appointment</h3></div>${ph(2)}${btn('Book an appointment', 'book', 'push')}`),
      slide(`<div class="row">${icon('heart')}<h3>Program in progress</h3></div>${ph(2)}${btn('Continue program', 'go:programs', 'push')}`)
    ];
    if (state.cover === 'hospital') c.splice(1, 0, slide(`<div class="row">${icon('shield')}<h3>Add extras cover</h3></div>${ph(2)}${btn('Compare extras', 'go:cover', 'push')}`, 'tint'));
    return sec('Recommended health actions', slider(c), `<a href="#/programs">View programs</a>`);
  };

  const activityList = () => sec('Your activity', `<div class="card"><div class="list">` +
    (M()
      ? activity('shield', 'Cover updated', '31 Aug', 'View policy details', 'go:cover') + activity('calendar', 'Appointment attended', '22 Sep', 'View history', 'go:bookings') + activity('dollar', 'Payment received', '31 Aug', 'View payment history', 'go:account/payment')
      : activity('calendar', 'Previous appointment', '18 Aug', 'View appointment', 'go:bookings') + activity('check', 'Previous claim complete', '9 Jul', 'View claim', 'toast:Claim details') + activity('dna', 'Recent genomics test is ready', '2 Jun', 'View results', 'go:health-profile')) +
    `</div></div>`);

  const offers = () => M()
    ? sec('Member offers', slider([offer('Save 10% on home insurance', 'shield'), offer('10% off travel insurance', 'briefcase'), offer('25% off designer frames and sunglasses', 'eye'), offer('Free 6-monthly dental check-ups and cleans', 'tooth')].map(o => o.replace('class="card"', 'class="card slide"'))), `<a href="#/rewards">View all</a>`)
    : sec('Offers for you', slider([offer('Get a $100 gift card when you refer a friend', 'gift'), offer('12 weeks free health insurance', 'shield'), offer('Free 6-monthly dental check-ups and cleans', 'tooth')].map(o => o.replace('class="card"', 'class="card slide"')))) +
      sec('Unlock these offers as a health insurance member', slider([offer('10% off travel insurance', 'briefcase', 1), offer('25% off designer frames and sunglasses', 'eye', 1), offer('Free 6-monthly dental check-ups and cleans', 'tooth', 1)].map(o => o.replace('class="card"', 'class="card slide"'))), `<a href="#/cover">View all</a>`);

  pages.home = () => {
    const hr = new Date().getHours();
    const greet = hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
    const ctx = M()
      ? `<div class="row ctx"><span>Membership No. 01234567</span>${pill('309 points', 'b', 'star')}<button class="link" data-act="toast:Membership number copied" aria-label="Copy membership number">${svg('clipboard')}</button></div>`
      : `<div class="row ctx">${pill('309 points', 'b', 'star')}${lnk('Earn and spend points', 'go:rewards')}</div>`;
    const shortcuts = M()
      ? [shortcut('Make a claim', 'dollar', 'claim'), shortcut('Update payments', 'card', 'go:account/payment'), E() ? shortcut('Check extras', 'activity', 'go:extras') : shortcut('Check cover', 'shield', 'go:cover'), shortcut('Find provider', 'search', 'go:services')]
      : [shortcut('Compare cover', 'shield', 'go:cover'), shortcut('Update payments', 'card', 'go:account/payment'), shortcut('Book a service', 'calendar', 'book'), shortcut('Find provider', 'search', 'go:services')];
    return `<div class="pagehead home-head"><div><h1>${greet}, John</h1>${ctx}</div></div>` +
      (D() ? (todoItems().length ? sec('<a class="h2link" href="#/health-actions">Health actions (' + todoItems().length + ')' + svg('chev') + '</a>', todoCard(), todoItems().length > 3 ? lnk('View all ' + todoItems().length + ' health actions', 'go:health-actions') : '') : '') : '') +
      `<div class="shortcuts" aria-label="Top task shortcuts">${shortcuts.join('')}</div>` +
      (D() ? sec('Upcoming', grid('g2', [apptCard('Scale and clean', 'Dentist'), apptCard('General consultation', 'GP')]), `<a href="#/bookings">View all appointments</a>`) : '') +
      recommended() +
      (D() ? activityList() : '') +
      offers() +
      sec('Support', `<div class="grid g3">${supportRow('Chat now', 'Live help with Bupa services', 'chat', 'chat')}${supportRow('Contact us', 'Get in touch from home or overseas', 'headset', 'go:help')}${supportRow('Inbox', 'View letters, docs and statements', 'mail', 'toast:Inbox opens here')}</div>`);
  };

  function rebook(name, tag, km) {
    return `<div class="card"><div class="row"><span class="avatar">${svg('user')}</span><div style="flex:1"><h3>${name}</h3><div class="ph" style="margin-top:8px"></div><div style="margin-top:8px">${pill(km + ' km away', 'b', 'pin')}</div>${tag ? `<div class="row" style="margin-top:6px">${svg('shield')}<small>${tag}</small></div>` : ''}</div></div><hr class="rule"><b>@AV@</b><div class="chips">${['12:15pm', '1:30pm', '3:15pm'].map(t => `<button class="chip" data-act="book">${t}</button>`).join('')}${lnk('View all', 'book')}</div></div>`;
  }

  const PAST = [['In-person GP appointment', ['Referral', 'GP chronic condition management plan'], 'Book referral appointment', '18 Aug 2026', '10:30am', 'Chronic condition review', 'Dr. Sarah Chen'],
     ['Telehealth GP appointment', ['eScript'], 'Order medication online', '2 Aug 2026', '4:15pm', 'Prescription renewal', 'Dr. Priya Nair'],
     ['Dental appointment', ['Dental treatment plan', 'X-ray'], 'Book next appointment', '9 Jul 2026', '9:00am', 'Check-up and clean', 'Dr. Mark Torres'],
     ['Optical appointment', ['Optical prescription', 'Vision report'], 'Order eyewear', '21 Jun 2026', '1:45pm', 'Eye test', 'Dr. Ella Jones'],
     ['Hearing test appointment', [], 'View appointment', '2 Jun 2026', '11:00am', 'Hearing assessment', 'Liam Walker, Audiologist'],
     ['Mental health clinic appointment', ['Mental health treatment plan'], 'View appointment', '14 May 2026', '3:30pm', 'Counselling session', 'Dr. Amara Okafor']];
  const slug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const DOCS = {};
  PAST.forEach(r => r[1].forEach(t => { DOCS[slug(t)] = { title: t, appt: r[0], date: r[3], time: r[4], reason: r[5], who: r[6] }; }));
  const docPill = t => `<a class="pill b" href="#/document/${slug(t)}">${svg('file')}${t}</a>`;

  pages.document = id => {
    const d = DOCS[id];
    if (!d) return head('Document not found', btn('Back to bookings', 'go:bookings'));
    return `<nav class="crumbs" aria-label="Breadcrumb"><a href="#/bookings">Bookings</a>${svg('chev')}<span>${d.title}</span></nav>` +
      head(d.title, `<div class="row">${btn('Download', 'toast:Document downloaded')}${btn('Share with a practitioner', 'toast:Document shared')}</div>`) +
      `<div class="split"><div>` +
      sec('Preview', `<div class="card doc">${icon('file')}${ph(1)}${ph(3)}${ph(3)}${ph(2)}${ph(3)}${ph(2)}</div>`) +
      `</div><aside><h2>Details</h2><div class="card"><div class="meta">${svg('calendar')}${d.date} · ${d.time}</div><div class="meta">${svg('clipboard')}${d.reason}</div><div class="meta">${svg('user')}${d.who}</div><hr class="rule"><b>From appointment</b><div>${d.appt}</div>${lnk('Back to bookings', 'go:bookings')}</div><div class="gap"></div><div class="card"><h3>Next steps</h3>${ph(2)}${btn('Book a follow-up', 'book')}</div></aside></div>`;
  };

  pages.bookings = () =>
    (D() ? `<div class="banner"><span class="line" style="flex:1;min-width:200px">${svg('alert')}Metformin prescription expiring soon</span><span class="row"><a href="#/health-profile">View prescription</a><button class="link" data-act="dismiss" aria-label="Dismiss">${svg('x')}</button></span></div>` : '') +
    head('Bookings', btn('Make a new booking', 'book', 'p')) +
    sec('Upcoming appointments ' + (D() ? pill('3', 'b') : ''), !D() ? `<div class="card center" style="align-items:center">${svg('calendar')}<b>No upcoming appointments</b><div class="ph" style="width:40%"></div>${btn('Make a new booking', 'book')}</div>` : grid('g3', [
      `<div class="card"><div class="row between"><div class="row">${icon('tooth')}<h3>Scale and clean · Dentist</h3></div><button class="link" data-act="menu" aria-haspopup="menu" aria-expanded="false" aria-label="More options">${svg('more')}</button></div><hr class="rule">${line('calendar', 70)}${line('pin', 85)}${line('dollar', 50)}<div class="note alert-note"><div class="row">${svg('alert')}<b>Complete new patient form</b></div><div class="ph"></div>${btn('Complete form', 'form')}</div></div>`,
      `<div class="card"><div class="row between"><div class="row">${icon('steth')}<h3>General consultation · GP</h3></div><button class="link" data-act="menu" aria-haspopup="menu" aria-expanded="false" aria-label="More options">${svg('more')}</button></div><hr class="rule">${line('calendar', 70)}${line('pin', 85)}${line('dollar', 50)}</div>`,
      `<div class="card"><div class="row between"><div class="row">${icon('phone')}<h3>Prescription renewal · Online doctor</h3></div><button class="link" data-act="menu" aria-haspopup="menu" aria-expanded="false" aria-label="More options">${svg('more')}</button></div><hr class="rule">${line('calendar', 70)}${line('video', 60)}${line('dollar', 50)}<div class="note">${ph(2)}</div></div>`
    ]), `<a href="#/bookings">View all appointments</a>`) +
    sec('Clinics near you', grid('g3', [
      rebook('Dr. Sarah Chen · GP', '', 1.2).replace('@AV@', 'Available today'),
      rebook('Dr. Mark Torres · Dentist', E() ? 'Members First Ultimate' : '', 2.8).replace('@AV@', 'Available tomorrow'),
      rebook('Dr. Ella Jones · Optician', E() ? 'Members First' : '', 4.5).replace('@AV@', 'Available Monday')
    ])) +
    `<section><h2>Past appointments</h2>` + (!D() ? empty('clock', 'No past appointments or documents', 'Make a new booking', 'book') : `<div class="row between" style="align-items:flex-end;margin-bottom:10px"><label class="field" style="flex:1;min-width:240px">Search past appointments<input placeholder="Service, practitioner or medical record"></label><label class="field">Filter by health service<select><option>All health services</option></select></label><label class="field">Filter by medical record<select><option>All medical records</option></select></label><label class="field">Sort by<select><option>Most recent</option></select></label></div><div class="list">` +
    PAST
      .map(r => `<div><span class="d"><b>${r[3]}</b><div>${r[4]}</div></span><span class="t"><b>${r[0]}</b><div class="meta">${svg('clipboard')}${r[5]}</div><div class="meta">${svg('user')}${r[6]}</div></span><span class="tags">${M() && /^(Dental|Optical|Mental health)/.test(r[0]) ? pill('Claim complete', 'g', 'check') : ''}${r[1].map(docPill).join('')}</span><span class="a">${lnk(r[2], 'book')}</span></div>`).join('') +
    `</div>`) + `</section>`;

  let coverTab = 'hospital';
  const coverMember = () => {
    const sc = [['Manage cover', 'shield', 'toast:Manage cover is not in this prototype'], ['Payments', 'card', 'go:account/payment'], ['Change cover', 'scale', 'toast:Change cover is not in this prototype'], ['Compare cover', 'search', 'quote'], ['Change rebate tier', 'dollar', 'toast:Change rebate tier is not in this prototype'], ['Order card', 'card', 'toast:Membership card ordered'], ['Estimates', 'clipboard', 'toast:Estimates are not in this prototype'], ['Add or remove a person', 'users', 'addfamily']];
    const tab = E() ? coverTab : 'hospital';
    const tabs = E() ? `<div class="tabs" role="group" aria-label="Cover type">${[['hospital', 'Hospital'], ['extras', 'Extras']].map(([k, l]) => `<button aria-pressed="${tab === k}" class="${tab === k ? 'on' : ''}" data-act="ctab:${k}">${l}</button>`).join('')}</div>` : '';
    const inc = tab === 'hospital' ? [tile('Inclusions', 'cross'), tile('Excess and waiting periods', 'clock')] : [tile('Dental', 'tooth'), tile('Optical', 'eye'), tile('Physio and allied health', 'activity'), tile('Mental health', 'mind')];
    return head('Cover') +
      sec('Shortcuts', `<div class="shortcuts" style="margin-bottom:0">${sc.map(([t, i, a]) => shortcut(t, i, a)).join('')}</div>`) +
      sec('Membership details', `<div class="card tint"><div class="row between"><h3>Bronze Plus Simple Hospital $750 Excess</h3>${pill('Active', 'g')}</div><div class="kv">${[['Membership number', '81 968 752'], ['Card number', '9036 0007 5016 9149 387'], ['Membership type', 'Family'], ['Member since', '10 September 2015'], ['Cover last updated', '1 October 2023'], ['Cover until', '22 November 2026'], ['Lifetime health cover loading', '0%'], ['Age based discount', '7%'], ['Your premium', '$262.80 monthly'], ['Last payment received (via Direct Debit)', '16 October 2025'], ['Next payment', '17 November 2025']].map(([k, v]) => `<div><b>${k}</b><div>${v}</div></div>`).join('')}</div><div class="row">${btn('Download policy documents', 'toast:Documents downloaded')}</div></div>`) +
      `<section><h2>Cover details</h2>${tabs}<div class="card" id="coverDetails"><h3>${tab === 'hospital' ? 'Bronze Plus Advantage Hospital' : 'Wellness Extras'}</h3><div><b>Waiting periods:</b> See your policy document</div><div><b>Policy document:</b> ${lnk(tab === 'hospital' ? 'Hospital cover summary (PDF)' : 'Extras cover summary (PDF)', 'toast:Document downloaded')}</div>${grid(tab === 'hospital' ? 'g2' : 'g4', inc)}${lnk('View exclusions', 'toast:Exclusions are not in this prototype')}</div></section>` +
      sec('Who’s covered and how the cover is managed', `<p style="margin:0 0 16px">Notice something wrong? ${lnk('Contact us to make a correction', 'go:help')}.</p>` + grid('g4', [['JS', '00', 'John Smith', 'Contributor', 'Yes', 'No'], ['KS', '01', 'Kelly Smith', 'Wife', 'Yes', 'Yes'], ['LS', '02', 'Leonard Smith', 'Son', 'Yes', 'No'], ['MS', '03', 'Madeline Smith', 'Daughter', 'Yes', 'No']].map(([i, n, nm, rel, oa, cc], k) => `<div class="card"><div class="row"><span class="avatar">${i}</span><div><b>${n} ${nm}</b><div>${rel}</div></div></div><div><b>Online authority</b><div>${oa}${k ? ' ' + lnk('Change', 'toast:Online authority is not in this prototype') : ''}</div></div><div><b>Claims consent</b><div>${cc}${k ? ' ' + lnk('Change', 'toast:Claims consent is not in this prototype') : ''}</div></div></div>`)));
  };
  pages.cover = () => M()
    ? coverMember()
    : head('Cover') +
      `<div class="card promo hero" style="padding:36px"><h1 style="color:#fff">Cover that looks after you</h1>${ph(2)}<div class="row">${btn('Get a quote', 'quote', 'w')}${btn('Compare cover', 'quote', 'w')}</div></div><div style="height:36px"></div>` +
      sec('Choose your cover', grid('g3', [['Hospital cover', 'cross'], ['Extras cover', 'tooth'], ['Hospital and extras', 'heart']].map(([t, i]) => `<div class="card">${icon(i)}<h3>${t}</h3>${ph(3)}${btn('Get a quote', 'quote', i === 'heart' ? 'p push' : 'push')}</div>`))) +
      sec('Why join Bupa?', grid('g3', [tile('Members First providers', 'shield'), tile('Rewards and offers', 'star'), tile('Bupa clinics and online GPs', 'steth')])) +
      sec('What you could be covered for', grid('g4', [['Dental', 'tooth'], ['Optical', 'eye'], ['Physio', 'activity'], ['Mental health', 'mind']].map(([t, i]) => tile(t, i)))) +
      sec('Questions about cover', `<div class="card">${['How does cover work?', 'What are waiting periods?', 'Can I add my family?'].map(faq).join('')}</div>`);

  pages.claims = () => head('Claims', btn('Make a claim', 'claim', 'p')) +
    sec('Claim in progress', D() ? `<div class="card tint"><div class="row between"><h3>Claim #00123</h3>${pill('In review', 'a')}</div>${ph(2)}${lnk('View claim', 'toast:Claim details')}</div>` : empty('dollar', 'No claims in progress', 'Make a claim', 'claim')) +
    sec('Claims history', !D() ? empty('clock', 'No claims to show', 'Make a claim', 'claim') : `<div class="row" style="margin-bottom:10px"><label class="field" style="flex:1;min-width:220px">Search claims<input placeholder="Provider or service"></label><label class="field">Person<select><option>Everyone on policy</option></select></label><label class="field">Period<select><option>Last 12 months</option></select></label></div><div class="list">${['Dental', 'Optical', 'Physio', 'Hospital'].map(r => `<div><span class="d"><div class="ph"></div></span><span class="t"><b>${r} claim</b><div class="ph s" style="margin-top:8px"></div></span><span class="tags">${pill('Paid', 'g', 'check')}</span><span class="a">${lnk('View details', 'toast:Claim details')}</span></div>`).join('')}</div>`) +    sec('Help with claims', grid('g2', [tile('How to claim', 'help'), tile('Claim limits and gaps', 'dollar')]));

  pages.extras = () => head('Extras usage') +
    sec('Annual limits', grid('g2', [
      `<div class="card">${icon('tooth')}<h3>Dental</h3>${bar('General dental', '$520 left', 55)}${bar('Major dental', '$380 left', 70)}${btn('Book a dentist', 'book')}</div>`,
      `<div class="card">${icon('eye')}<h3>Optical</h3>${bar('Optical', '$200 left', 45)}${btn('Book an eye test', 'book')}</div>`,
      `<div class="card">${icon('mind')}<h3>Mental health</h3>${bar('Psychology, counselling and mental health', '$100 left', 65)}${btn('Get mental health support', 'go:services')}</div>`,
      `<div class="card">${icon('activity')}<h3>Physio and allied health</h3>${bar('Physiotherapy', '$300 left', 40)}${btn('Book physio', 'book')}</div>`
    ]), `<label>Person <select><option>John Smith</option><option>Jane Smith</option><option>Sam Smith</option></select></label>`) +
    sec('Limits reset', `<div class="card tint">${ph(2)}</div>`) +
    sec('Recent usage', D() ? `<div class="card"><div class="list">${[1, 2, 3].map(() => `<div><span class="d"><div class="ph"></div></span><span class="t">${ph(2)}</span><span class="a">${ph(1)}</span></div>`).join('')}</div></div>` : empty('clock', 'No recent usage', 'Book a service', 'go:services'));

  function svc(title, ic, pills, bars, label, cov = M()) {
    return `<div class="card"><div class="row">${pills.map((p, i) => pill(p, i === 0 && cov ? 'g' : 'b', i === 0 && cov ? 'check' : '')).join('')}</div><div class="row">${icon(ic)}<h3>${title}</h3></div>${ph(2)}${bars.map(b => bar(...b)).join('')}<div class="push">${btn(label, 'book', 'blk')}<div class="center" style="margin-top:10px">${lnk('Learn more', 'toast:Learn more')}</div></div></div>`;
  }

  pages.services = () => head('Services') +
    `<div class="split"><div>` +
    sec(M() ? 'Get more value with our clinics' : 'Our clinics', grid('g2', [
      svc('Dental', 'tooth', E() ? ['Covered', '2 of 2 check-up and cleans left'] : ['Available to everyone'], E() ? [['General dental', '$520 left', 55], ['Major dental', '$380 left', 70]] : [], 'Book a dentist', E()),
      svc('Optical', 'eye', E() ? ['Covered'] : ['Available to everyone'], E() ? [['Optical', '$200 left', 45]] : [], 'Book an eye test', E()),
      svc('Mental health', 'mind', E() ? ['Covered'] : ['Available to everyone'], E() ? [['Psychology, counselling and mental health limits', '$100 left', 65]] : [], 'Get mental health support', E()),
      svc('In-person GPs', 'steth', M() ? ['Bulk-billed'] : ['Standard fee'], [], 'Book a GP')
    ])) +
    sec('On-demand healthcare', grid('g2', [
      svc('Online GPs', 'phone', M() ? ['2 of 3 free sessions left'] : ['Pay per visit'], [], 'Book an online GP'),
      svc('Order chemist delivery', 'pill', M() ? ['Free delivery'] : ['Delivery fee applies'], [], 'Order chemist delivery')
    ])) +
    sec('Tests and screenings', grid('g4', [['Genomics', 'dna'], ['Nurse-led health checks', 'steth'], ['Hearing test', 'ear'], ['Adult carrier screening test', 'dna']].map(([t, i]) => tile(t, i)))) +
    sec('Ongoing care', grid('g3', [['Hospital at home', 'briefcase'], ['Oncology and cancer', 'ribbon'], ['Aged care', 'users']].map(([t, i]) => tile(t, i)))) +
    sec('Tools and checks', `<div class="link-list">${[['BMI calculator', 'calc'], ['Vision screening', 'eye'], ['Target heart rate', 'activity'], ['Calories burned', 'flame'], ['Ideal weight', 'scale']].map(([t, i]) => `<button class="chip" data-act="toast:${t}">${svg(i)}${t}</button>`).join('')}</div>`) +
    `</div><aside>` +
    (M()
      ? `<h2>Make the most of your cover</h2><div class="card tint"><div class="row">${svg('shield')}<h3>Get more back at a Members First provider</h3></div>${ph(1)}${line('check')}${line('check')}<label class="field">Speciality, practice or practitioner<input placeholder="Dental, Bupa Dental or…"></label><label class="field">Location<input placeholder="Suburb or Postcode"></label>${btn('Search', 'toast:Search opens Members First finder', 'p')}</div>` + (E() ? `<div class="gap"></div><div class="card tint">${pill('Covered', 'g', 'check')}<div class="row">${svg('tooth')}<h3>You’re covered for 2 check-up, cleans and general fillings every 6 months</h3></div>${ph(2)}${line('check')}${line('check')}</div>` : '')
      : `<h2>Save with cover</h2>${cta('Get more back with Bupa cover', 'Compare cover', 'go:cover')}`) +
    `</aside></div>`;

  const COND = ['Mental Health & Wellbeing', 'Musculoskeletal & Joint Health', 'Cardiovascular & Heart Health', 'Oncology & Cancer Care', 'Renal & Kidney Health', 'General Health, Recovery & Palliative Care'];
  const COND_IC = ['mind', 'activity', 'heart', 'ribbon', 'droplet', 'steth'];
  // [title, condition index, icon, in-clinic?, covered?]
  const PROGS = [
    ['Stress and mindfulness', 0, 'mind', 0, 1], ['Anxiety and depression support', 0, 'mind', 1, 0],
    ['Move more', 1, 'activity', 0, 0], ['Back pain management', 1, 'activity', 1, 1],
    ['Healthy heart', 2, 'heart', 0, 1], ['Cardiac rehabilitation', 2, 'heart', 1, 0],
    ['Cancer care navigation', 3, 'shield', 0, 1], ['Chemotherapy support', 3, 'shield', 1, 0],
    ['Kidney health coaching', 4, 'droplet', 0, 1], ['Diabetes support', 4, 'droplet', 1, 0],
    ['Palliative care support', 5, 'heart', 0, 0], ['Post-surgery rehabilitation', 5, 'steth', 1, 1]
  ];
  const progState = { on: new Set(), loc: new Set(), open: null };
  const progCard = ([t, c, ic, clinic, cov]) => `<div class="card">${icon(ic)}<h3>${t}</h3>${ph(2)}<div class="row">${pill(clinic ? 'In-clinic' : 'At-home', '', clinic ? 'pin' : 'home')}${pill('8 weeks')}${M() ? (cov ? pill('Covered by your policy', 'g', 'check') : pill('Not covered', 'a')) : ''}</div>${M() ? btn('Join program', 'join:' + t, 'push') : ''}</div>`;
  const progList = () => {
    const list = PROGS.filter(p => (!progState.on.size || progState.on.has(p[1])) && (!progState.loc.size || progState.loc.has(p[3]))).sort((x, y) => y[4] - x[4]);
    return list.length ? grid('g3', list.map(progCard)) : empty('search', 'No programs match your filters', 'Clear filters', 'prog-clear');
  };
  const LOC = [[0, 'home', 'At-home'], [1, 'pin', 'In-clinic']];
  const dd = (key, ic, label, opts, set, act, st = progState, da = 'dd', noCount = false) => {
    const n = noCount ? 0 : set.size, open = st.open === key;
    return `<div class="dd"><button class="chip ${n ? 'on' : ''}" aria-haspopup="true" aria-expanded="${open}" data-act="${da}:${key}">${svg(ic)}${label}${n ? ' (' + n + ')' : ''}${svg('chev', 'dd-chev')}</button>` +
      (open ? `<div class="card-menu dd-menu" role="group" aria-label="${label}">${opts.map(([v, oi, t]) => `<button aria-pressed="${set.has(v)}" data-act="${act}:${v}">${svg(oi)}<span>${t}</span>${set.has(v) ? svg('check', 'dd-check') : ''}</button>`).join('')}</div>` : '') + `</div>`;
  };
  const progChips = () => `<div class="chips nowrap" role="group" aria-label="Filter programs">${dd('loc', 'home', 'Location', LOC, progState.loc, 'loc')}${dd('cond', 'steth', 'Health condition', COND.map((c, i) => [i, COND_IC[i], c]), progState.on, 'prog')}</div>`;
  pages.programs = () => `<div class="pagehead"><div class="row"><h1>Programs</h1>${M() ? '' : pill('For Bupa health insurance members only', 'b', 'shield')}</div></div>` +
    `<div class="split"><div><section><div class="sechead"><h2>${M() ? 'Health programs for you' : 'Health programs'}</h2></div>${progChips()}<div id="progList" class="prog-list">${progList()}</div></section></div>` +
    `<aside><h2>Your programs</h2>${M() ? `<div class="card"><div class="row between"><h3>Program in progress</h3>${pill('Week 2 of 8', 'b')}</div><div class="bar"><i style="width:25%"></i></div>${ph(2)}${btn('Continue', 'toast:Continue program', 'p')}</div>` : `<div class="card center">${icon('shield')}<h3>No programs yet</h3><p style="margin:0;color:var(--mute)">Health programs are only available to Bupa health insurance members.</p>${btn('Compare cover', 'go:cover', 'p')}</div>`}</aside></div>` +
    (M() ? '' : sec('More with cover', cta('Get more from programs with Bupa cover', 'Compare cover', 'go:cover'))) +
    sec('Completed programs', `<div class="card center"><h3>No completed programs</h3>${ph(1)}</div>`);
  const refreshProgs = () => { const l = $('#progList'); if (!l) return; l.innerHTML = progList(); const c = l.parentElement.querySelector('.chips'); c.outerHTML = progChips(); };

  pages.rewards = () => head('Rewards') +
    grid('g2', [`<div class="card fill"><div class="row">${svg('star')}<b>Points balance</b></div><h2 style="margin:0">309 points</h2></div>`, `<div class="card fill"><div class="row">${svg('award')}<b>Tier level</b></div><h2 style="margin:0">Level 1</h2></div>`]) +
    `<div style="height:32px"></div>` +
    sec('Earn points', grid('g4', [['Complete a health check', 100], ['Log your steps', 20], ['Fill out a patient form', 50], ['Book an appointment', 75]].map(([t, n]) => `<div class="card">${icon('clipboard')}<b>${t}</b><b class="pts">${n} points</b></div>`))) +
    sec('Featured challenges', grid('g4', [['7-day movement streak', 200], ['Join a health program', 150], ['Refer a friend', 500], ['Complete a screening', 250]].map(([t, n]) => `<div class="card">${icon('trophy')}<b>${t}</b><b class="pts">${n} points</b></div>`))) +
    sec('Spend points', grid('g4', ['Gift card', 'Fitness voucher', 'Health product discount', 'Donate to charity'].map(t => `<div class="card">${icon('gift')}<b>${t}</b></div>`))) +
    sec('How points work', grid('g2', [`<div class="card tint"><div class="row">${svg('star')}<b>Earning points</b></div>${ph(2)}</div>`, `<div class="card tint"><div class="row">${svg('award')}<b>Using points</b></div>${ph(2)}</div>`])) +
    sec('Previous activity', `<div class="card center" style="align-items:center">${svg('clock')}<b>No activity to show</b><div class="ph" style="width:40%"></div></div>`);

  const HR_TYPES = [['plan', 'clipboard', 'Treatment plan'], ['referral', 'file', 'Referral'], ['genomics', 'dna', 'Genomics result']];
  // [name, description, ISO date, practitioner, type, tags]
  const HR = [
    ['Physiotherapy treatment plan', 'Six-week plan for lower back pain', '2026-09-14', 'Dr Sarah Lee', 'plan', ['Back', 'Ongoing']],
    ['Mental health care plan', 'Ten sessions with a psychologist', '2026-07-02', 'Dr Sarah Lee', 'plan', ['Mental health']],
    ['Dental treatment plan', 'Filling replacement and clean', '2026-10-03', 'Dr Kim Tran', 'plan', ['Dental']],
    ['Psychologist referral', 'Referral to a registered psychologist', '2026-06-20', 'Dr Sarah Lee', 'referral', ['Mental health']],
    ['Orthopaedic specialist referral', 'Assessment of right knee pain', '2026-08-11', 'Dr Amir Patel', 'referral', ['Knee']],
    ['Pathology referral', 'Annual blood tests', '2026-05-28', 'Dr Sarah Lee', 'referral', []],
    ['Genomic risk screening', 'Results for common hereditary conditions', '2026-03-17', 'Dr Helen Ng', 'genomics', ['Family history']],
    ['Pharmacogenomic test', 'How you may respond to common medicines', '2025-11-09', 'Dr Helen Ng', 'genomics', [] ]
  ];
  const hrState = { type: new Set(), prac: new Set(), tag: new Set(), sort: 'new', open: null, adding: null };
  const hrDate = d => new Date(d + 'T00:00:00').toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
  const hrView = () => {
    const pracs = [...new Set(HR.map(r => r[3]))].sort(), tags = [...new Set(HR.flatMap(r => r[5]))].sort();
    const rows = HR.map((r, i) => [r, i]).filter(([r]) => (!hrState.type.size || hrState.type.has(r[4])) && (!hrState.prac.size || hrState.prac.has(r[3])) && (!hrState.tag.size || r[5].some(t => hrState.tag.has(t))))
      .sort(([x], [y]) => hrState.sort === 'old' ? x[2].localeCompare(y[2]) : hrState.sort === 'name' ? x[0].localeCompare(y[0]) : hrState.sort === 'prac' ? x[3].localeCompare(y[3]) : y[2].localeCompare(x[2]));
    const sortOpts = [['new', 'clock', 'Newest first'], ['old', 'clock', 'Oldest first'], ['name', 'file', 'Name A–Z'], ['prac', 'user', 'Practitioner']];
    const chips = `<div class="chips nowrap" role="group" aria-label="Filter and sort health records">${dd('type', 'file', 'Record type', HR_TYPES, hrState.type, 'hrtype', hrState, 'hrdd')}${dd('prac', 'user', 'Practitioner', pracs.map(p => [p, 'user', p]), hrState.prac, 'hrprac', hrState, 'hrdd')}${tags.length ? dd('tag', 'flame', 'Tag', tags.map(t => [t, 'check', t]), hrState.tag, 'hrtag', hrState, 'hrdd') : ''}${dd('sort', 'scale', 'Sort: ' + sortOpts.find(o => o[0] === hrState.sort)[2], sortOpts, new Set([hrState.sort]), 'hrsort', hrState, 'hrdd', true)}</div>`;
    const item = ([r, i]) => `<div class="hr-item"><span class="icon" aria-hidden="true">${svg(HR_TYPES.find(t => t[0] === r[4])[1])}</span><div class="hr-main"><b>${r[0]}</b><div class="hr-desc">${r[1]}</div><div class="hr-meta"><span>${svg('calendar')}${hrDate(r[2])}</span><span>${svg('user')}${r[3]}</span></div>` +
      `<div class="hr-tags">${r[5].map(t => `<span class="pill b">${t}<button class="tag-x" data-act="hr-rmtag:${i}|${t}" aria-label="Remove tag ${t}">${svg('x')}</button></span>`).join('')}${hrState.adding === i ? `<input class="hr-tag-input" data-i="${i}" aria-label="New tag" placeholder="Tag name" maxlength="24">` : `<button class="tag-add" data-act="hr-addtag:${i}">${svg('plus')}Add tag</button>`}</div></div>${lnk('View and book', 'toast:' + r[0])}</div>`;
    return chips + (rows.length ? `<div class="card hr-card">${rows.map(item).join('')}</div>` : empty('search', 'No health records match your filters', 'Clear filters', 'hr-clear'));
  };
  const refreshHR = () => { const w = $('#hrWrap'); if (!w) return; w.innerHTML = hrView(); const inp = w.querySelector('.hr-tag-input'); if (inp) inp.focus(); };
  pages['health-profile'] = () => head('Health profile') +
    `<div><div>` +
    `<div class="card fill"><div class="row between"><h3>John Smith</h3>${lnk('Edit health details', 'edithealth')}</div><div class="kv">${['Sex assigned at birth', 'Age', 'ATSI', 'BMI', 'Waist', 'Blood type'].map(k => `<div><b>${k}</b><div class="ph" style="margin-top:8px;width:70%"></div></div>`).join('')}</div></div><div style="height:32px"></div>` +
    sec('Health records', D() ? `<div id="hrWrap">${hrView()}</div>` : empty('file', 'No health records to display', 'Book an appointment', 'book')) +
    sec('Non-clinical records', `<div class="card fill"><div class="row">${svg('file')}<b>No non-clinical records to display</b></div>${ph(1)}</div>`) +
    `</div></div>` +
    sec('Assess your risk', `<div class="ph" style="width:45%;margin-bottom:16px"></div>` + grid('g3', [['Type 2 diabetes', 'droplet', 'Start assessment'], ['Musculoskeletal', 'activity', 'Start assessment'], ['Genomics test', 'dna', 'Explore test']].map(([t, i, a]) => `<div class="card">${icon(i)}<h3>${t}</h3>${ph(2)}${lnk(a, 'toast:' + t)}</div>`)));

  const HA_PEOPLE = ['John Smith', 'Emma Smith', 'Liam Smith'];
  const HA_TYPES = [['insurance', 'shield', 'Health insurance'], ['service', 'steth', 'Health service'], ['program', 'activity', 'Health program']];
  // [name, source, person, type, status (2 now, 1 soon, 0 none), cta label, cta action]
  const HA = [
    ['Book psychologist appointment', 'Referred by Dr Sarah Lee', 0, 'service', 2, 'Book', 'book'],
    ['Renew prescription', 'From your GP, Dr Sarah Lee', 0, 'service', 2, 'Renew', 'toast:Renewal request sent'],
    ['Book filling replacement', 'Recommended after your dental check-up', 0, 'service', 1, 'Book', 'book'],
    ['Submit your physio claim', 'From your appointment on 12 Oct', 0, 'insurance', 2, 'Claim now', 'go:claims'],
    ['Review your cover before renewal', 'From your Bupa policy', 0, 'insurance', 1, 'Review cover', 'go:cover'],
    ['Complete week 3 check-in', 'From the Stress and mindfulness program', 0, 'program', 1, 'Continue', 'go:programs'],
    ['Childhood immunisation check', 'From your GP, Dr Sarah Lee', 1, 'service', 1, 'Book', 'book'],
    ['Add bank details for claim payments', 'From your Bupa policy', 1, 'insurance', 0, 'Add details', 'go:account/payment'],
    ['Join Move more program', 'Recommended for you by Bupa', 2, 'program', 0, 'View program', 'go:programs'],
    ['Annual eye test', 'From your optometrist', 2, 'service', 0, 'Book', 'book']
  ];
  const haState = { person: new Set(), type: new Set(), sort: 'due', open: null };
  const haRows = () => HA.filter(r => (!haState.person.size || haState.person.has(r[2])) && (!haState.type.size || haState.type.has(r[3])))
    .sort((x, y) => haState.sort === 'name' ? x[0].localeCompare(y[0]) : haState.sort === 'person' ? x[2] - y[2] || y[4] - x[4] : y[4] - x[4]);
  const haView = () => {
    const rows = haRows();
    const sortOpts = [['due', 'clock', 'Due date'], ['name', 'file', 'Task name'], ['person', 'user', 'Person']];
    const chips = `<div class="chips nowrap" role="group" aria-label="Filter and sort health actions">${dd('person', 'users', 'Person', HA_PEOPLE.map((p, i) => [i, 'user', p]), haState.person, 'hperson', haState, 'hdd')}${dd('type', 'clipboard', 'Task type', HA_TYPES.map(([v, ic, t]) => [v, ic, t]), haState.type, 'htype', haState, 'hdd')}${dd('sort', 'scale', 'Sort: ' + sortOpts.find(o => o[0] === haState.sort)[2], sortOpts, new Set([haState.sort]), 'hsort', haState, 'hdd', true)}</div>`;
    const table = rows.length ? `<table class="ha-table"><thead><tr><th scope="col">Task</th><th scope="col">Person</th><th scope="col">Type</th><th scope="col"><span class="sr">Action</span></th></tr></thead><tbody>${rows.map(([n, src, p, t, st, cta, act]) => `<tr><td data-l="Task"><div class="row"><b>${n}</b>${st === 2 ? pill('Due now', 'a', 'alert') : st === 1 ? pill('Due soon', 'b', 'clock') : ''}</div><div class="ha-src">${src}</div></td><td data-l="Person">${HA_PEOPLE[p]}</td><td data-l="Type">${HA_TYPES.find(x => x[0] === t)[2]}</td><td class="ha-cta">${btn(cta, act, st ? 'p' : '')}</td></tr>`).join('')}</tbody></table>` : empty('search', 'No health actions match your filters', 'Clear filters', 'ha-clear');
    return chips + `<div class="card ha-card">${table}</div>`;
  };
  pages['health-actions'] = () => head('Health actions') + `<div id="haWrap">${haView()}</div>`;
  const refreshHA = () => { const w = $('#haWrap'); if (w) w.innerHTML = haView(); };

  const ACCT = [['settings', 'Account settings'], ['privacy', 'Privacy'], ['payment', 'Payment details'], ['family', 'Family members'], ['contact', 'Contact details']];
  const toggles = list => list.map(t => `<label class="toggle"><span style="flex:1"><b>${t}</b><div class="ph s" style="margin-top:8px"></div></span><input type="checkbox" checked></label>`).join('');
  const acctBody = {
    settings: () => `<h2>Account settings</h2><div class="card"><label class="field">Preferred name<input></label><label class="field">Sign-in email<input></label>${btn('Change password', 'toast:Password change email sent')}</div><div class="gap"></div><div class="card"><h3>Notification preferences</h3>${toggles(['Appointment reminders', 'Health task reminders', 'Rewards updates'])}${btn('Save', 'toast:Preferences saved', 'p')}</div>`,
    privacy: () => `<h2>Privacy</h2><div class="card">${toggles(['Share health records with my practitioners', 'Marketing communications', 'Personalised content'])}${btn('Save', 'toast:Privacy settings saved', 'p')}</div><div class="gap"></div><div class="card"><h3>Your data</h3>${ph(2)}<div class="row">${btn('Download my data', 'toast:Data export requested')}${btn('Delete my account', 'toast:Delete is not in this prototype')}</div></div>`,
    payment: () => `<h2>Payment details</h2><div class="card"><div class="row between"><div class="row">${svg('card')}<h3>Payment card</h3></div>${M() ? pill('Premium payments', 'b') : pill('Used for services', 'b')}</div>${ph(1)}${btn('Update card', 'editpay')}</div><div class="gap"></div>` +
      (M() ? `<div class="card"><div class="row between"><h3>Payment frequency</h3>${lnk('Change', 'toast:Change frequency')}</div>${ph(2)}</div><div class="gap"></div><div class="card"><h3>Bank account for claim payments</h3>${ph(2)}${btn('Update bank account', 'toast:Bank account updated')}</div>` : `<div class="card"><h3>Payment history</h3>${ph(3)}</div>`),
    family: () => M()
      ? `<div class="row between"><h2>Family members on your policy</h2>${btn('Add a family member', 'addfamily', 'p')}</div><div class="card"><div class="list">${[0, 1, 2].map(i => `<div><span class="avatar">${svg('user')}</span><span class="t"><div class="ph m"></div><div class="ph s" style="margin-top:8px"></div></span><span class="a" style="text-align:right">${i ? lnk('Edit', 'toast:Edit member') + ' · ' + lnk('Remove', 'toast:Member removed') : ''}</span></div>`).join('')}</div></div>`
      : `<h2>Family members</h2><div class="card promo"><h3>Add family to a Bupa policy</h3>${ph(2)}${btn('Compare family cover', 'go:cover', 'w')}</div><div class="gap"></div><div class="card"><h3>Linked accounts</h3>${ph(2)}${btn('Link a family member', 'addfamily')}</div>`,
    contact: () => `<h2>Contact details</h2><div class="card"><label class="field">Mobile<input></label><label class="field">Email<input></label><label class="field">Residential address<input></label><label class="field">Postal address<input></label>${btn('Save changes', 'toast:Contact details saved', 'p')}</div>`
  };
  pages.account = (sub = 'settings') => head('Account') + `<div class="side"><nav aria-label="Account">${ACCT.map(([k, l]) => `<a href="#/account/${k}" class="${k === sub ? 'on' : ''}">${l}</a>`).join('')}<a href="#/health-profile">Health profile</a></nav><div>${(acctBody[sub] || acctBody.settings)()}</div></div>`;
  pages.help = () => head('Help and support') + grid('g3', [['Contact us', 'headset'], ['Frequently asked questions', 'help'], ['Find a form', 'file']].map(([t, i]) => tile(t, i)));

  // ---------- modals & actions ----------
  const modal = $('#modal');
  let opener = null;
  const closeM = () => { const was = !modal.hidden; modal.hidden = true; modal.innerHTML = ''; if (was && opener && opener.isConnected) opener.focus(); opener = null; };
  const dlg = html => {
    if (modal.hidden) opener = document.activeElement;
    modal.innerHTML = `<div class="dlg" role="dialog" aria-modal="true" aria-labelledby="dlgTitle">${html}</div>`;
    const h = modal.querySelector('h2'); if (h) h.id = 'dlgTitle';
    modal.hidden = false;
    const d = modal.firstElementChild; d.tabIndex = -1; d.focus();
  };
  modal.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const f = [...modal.querySelectorAll('button,input,select,textarea,a[href]')].filter(x => !x.disabled);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === modal.firstElementChild)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  const toast = msg => { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2500); };
  const opts = (name, list) => list.map((o, i) => `<button class="opt ${i === 0 ? 'on' : ''}" data-opt="${name}">${o}</button>`).join('');

  function bookingFlow(step = 1) {
    const nav = (back, next) => `<div class="row end">${back ? btn('Back', 'step:' + back) : btn('Cancel', 'close')}${btn('Continue', 'step:' + next, 'p')}</div>`;
    const body = {
      1: `<h2>What do you need?</h2>${opts('svc', ['Dentist', 'GP (in-person)', 'Online GP', 'Optical', 'Mental health', 'Hearing test'])}${nav(0, 2)}`,
      2: `<h2>Choose a practitioner</h2>${opts('prac', ['Dr. Sarah Chen · GP', 'Dr. Mark Torres · Dentist', 'Any available practitioner'])}${nav(1, 3)}`,
      3: `<h2>Choose a time</h2>${opts('time', ['Today 12:15pm', 'Today 1:30pm', 'Tomorrow 3:15pm', 'Monday 10:00am'])}${nav(2, 4)}`,
      4: `<h2>Confirm booking</h2><div class="card fill">${line('calendar', 60)}${line('pin', 80)}${line('dollar', 40)}</div><div class="row end">${btn('Back', 'step:3')}${btn('Confirm booking', 'confirm', 'p')}</div>`
    };
    dlg(`<div class="steps">Step ${step} of 4</div>` + body[step]);
  }

  function simpleForm(title, fields, done) {
    dlg(`<h2>${title}</h2>${fields.map(f => `<label class="field">${f}<input></label>`).join('')}<div class="row end">${btn('Cancel', 'close')}${btn('Save', 'save:' + done, 'p')}</div>`);
  }

  function closeCardMenus() {
    document.querySelectorAll('.card-menu').forEach(m => m.remove());
    document.querySelectorAll('[data-act="menu"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
  }
  function toggleCardMenu(btnEl) {
    const wasOpen = btnEl.getAttribute('aria-expanded') === 'true';
    closeCardMenus();
    if (wasOpen) return;
    const host = btnEl.parentElement;
    host.classList.add('menu-host');
    host.insertAdjacentHTML('beforeend', `<div class="card-menu" role="menu">${[['Reschedule', 'calendar', 'Appointment rescheduled'], ['Add to calendar', 'plus', 'Added to calendar'], ['Cancel appointment', 'x', 'Appointment cancelled']].map(([l, ic, m]) => `<button role="menuitem" data-act="cardmenu:${m}">${svg(ic)}${l}</button>`).join('')}</div>`);
    btnEl.setAttribute('aria-expanded', 'true');
    host.querySelector('.card-menu button').focus();
  }
  document.addEventListener('click', e => {
    if (!e.target.closest('.card-menu') && !e.target.closest('[data-act="menu"]')) closeCardMenus();
    const o = e.target.closest('[data-opt]');
    if (o) { o.parentElement.querySelectorAll('.opt').forEach(x => x.classList.remove('on')); o.classList.add('on'); return; }
    if (e.target === modal) return closeM();
    const a = e.target.closest('[data-act]');
    if (!a) return;
    const [act, arg] = a.dataset.act.split(/:(.*)/s);
    switch (act) {
      case 'book': bookingFlow(1); break;
      case 'prog': { const i = +arg; progState.on.has(i) ? progState.on.delete(i) : progState.on.add(i); refreshProgs(); const b = document.querySelector(`[data-act="prog:${i}"]`); if (b) b.focus(); break; }
      case 'loc': { const i = +arg; progState.loc.has(i) ? progState.loc.delete(i) : progState.loc.add(i); refreshProgs(); const b = document.querySelector(`[data-act="loc:${i}"]`); if (b) b.focus(); break; }
      case 'hrdd': hrState.open = hrState.open === arg ? null : arg; refreshHR(); { const b = document.querySelector(`[data-act="hrdd:${arg}"]`); if (b) b.focus(); } break;
      case 'hrtype': case 'hrprac': case 'hrtag': { const s = hrState[act.slice(2)]; s.has(arg) ? s.delete(arg) : s.add(arg); refreshHR(); const b = [...document.querySelectorAll(`[data-act^="${act}:"]`)].find(x => x.dataset.act === a.dataset.act); if (b) b.focus(); break; }
      case 'hrsort': hrState.sort = arg; hrState.open = null; refreshHR(); { const b = document.querySelector('[data-act="hrdd:sort"]'); if (b) b.focus(); } break;
      case 'hr-clear': hrState.type.clear(); hrState.prac.clear(); hrState.tag.clear(); refreshHR(); break;
      case 'hr-addtag': hrState.adding = +arg; refreshHR(); break;
      case 'hr-rmtag': { const [n, t] = [arg.slice(0, arg.indexOf('|')), arg.slice(arg.indexOf('|') + 1)]; const r = HR[+n]; r[5] = r[5].filter(x => x !== t); hrState.tag.delete(t); refreshHR(); break; }
      case 'hdd': haState.open = haState.open === arg ? null : arg; refreshHA(); { const b = document.querySelector(`[data-act="hdd:${arg}"]`); if (b) b.focus(); } break;
      case 'hperson': case 'htype': { const s = act === 'hperson' ? haState.person : haState.type, v = act === 'hperson' ? +arg : arg; s.has(v) ? s.delete(v) : s.add(v); refreshHA(); const b = document.querySelector(`[data-act="${act}:${arg}"]`); if (b) b.focus(); break; }
      case 'hsort': haState.sort = arg; haState.open = null; refreshHA(); { const b = document.querySelector('[data-act="hdd:sort"]'); if (b) b.focus(); } break;
      case 'ha-clear': haState.person.clear(); haState.type.clear(); refreshHA(); break;
      case 'dd': progState.open = progState.open === arg ? null : arg; refreshProgs(); { const b = document.querySelector(`[data-act="dd:${arg}"]`); if (b) b.focus(); } break;
      case 'prog-clear': progState.on.clear(); progState.loc.clear(); refreshProgs(); break;
      case 'chat': chatOpen($('#chatPanel').hidden); break;
      case 'chat-close': chatOpen(false); $('#chatFab').focus(); break;
      case 'step': bookingFlow(+arg); break;
      case 'confirm': closeM(); toast('Booking confirmed'); break;
      case 'close': closeM(); break;
      case 'save': closeM(); toast(arg); break;
      case 'toast': toast(arg); menuOpen(false); break;
      case 'todo-dismiss': { todoGone.add(arg); render(); toast('Task dismissed'); break; }
      case 'cardmenu': closeCardMenus(); toast(arg); break;
      case 'go': location.hash = '#/' + arg; break;
      case 'dismiss': a.closest('.banner').remove(); break;
      case 'menu': toggleCardMenu(a); break;
      case 'form': simpleForm('New patient form', ['Full name', 'Date of birth', 'Medicare number', 'Allergies or conditions'], 'Form submitted'); break;
      case 'claim': dlg(`<h2>Make a claim</h2><label class="field">Who is the claim for?<select><option>John Smith</option><option>Jane Smith</option><option>Sam Smith</option></select></label><label class="field">Service type<select><option>Dental</option><option>Optical</option><option>Physio</option></select></label><label class="field">Date of service<input type="date"></label><label class="field">Amount paid<input placeholder="$"></label><div class="row end">${btn('Cancel', 'close')}${btn('Submit claim', 'save:Claim submitted', 'p')}</div>`); break;
      case 'quote': simpleForm('Get a quote', ['Who is the cover for?', 'Postcode', 'Date of birth', 'Email'], 'Quote request sent'); break;
      case 'addfamily': simpleForm(M() ? 'Add a family member' : 'Link a family member', ['First name', 'Last name', 'Date of birth', 'Relationship'], 'Family member added'); break;
      case 'edithealth': simpleForm('Edit health details', ['Sex assigned at birth', 'Date of birth', 'Height (cm)', 'Weight (kg)', 'Blood type'], 'Health details saved'); break;
      case 'editpay': simpleForm('Update card', ['Name on card', 'Card number', 'Expiry', 'CVV'], 'Payment details updated'); break;
      case 'ctab': { const y = window.scrollY; coverTab = arg; render(); window.scrollTo(0, y); $('[data-act="ctab:' + arg + '"]')?.focus(); break; }
      case 'join': dlg(`<h2>Join “${arg}”</h2>${ph(3)}<div class="row end">${btn('Cancel', 'close')}${btn('Join program', 'save:You’ve joined the program', 'p')}</div>`); break;
    }
  });
  document.addEventListener('click', e => { if (hrState.open && !e.target.closest('[data-act^="hrdd:"],[data-act^="hrtype:"],[data-act^="hrprac:"],[data-act^="hrtag:"],[data-act^="hrsort:"]')) { hrState.open = null; refreshHR(); } });
  document.addEventListener('keydown', e => {
    const t = e.target; if (!t.classList || !t.classList.contains('hr-tag-input')) return;
    if (e.key === 'Enter') { e.preventDefault(); const v = t.value.trim(); const r = HR[+t.dataset.i]; if (v && !r[5].some(x => x.toLowerCase() === v.toLowerCase())) r[5].push(v); hrState.adding = null; refreshHR(); }
    else if (e.key === 'Escape') { e.stopPropagation(); hrState.adding = null; refreshHR(); }
  });
  document.addEventListener('click', e => { if (haState.open && !e.target.closest('[data-act^="hdd:"],[data-act^="hperson:"],[data-act^="htype:"],[data-act^="hsort:"]')) { haState.open = null; refreshHA(); } });
  document.addEventListener('click', e => { if (progState.open && !e.target.closest('[data-act^="dd:"],[data-act^="loc:"],[data-act^="prog:"]')) { progState.open = null; refreshProgs(); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (hrState.open) { hrState.open = null; refreshHR(); } if (haState.open) { haState.open = null; refreshHA(); } if (progState.open) { progState.open = null; refreshProgs(); } const m = document.querySelector('[data-act="menu"][aria-expanded="true"]'); closeCardMenus(); closeM(); menuOpen(false); if (m) m.focus(); } });

  // ---------- chat assistant ----------
  const SVCS = ['Dentist', 'GP (in-person)', 'Online GP', 'Optical', 'Mental health', 'Hearing test'];
  const TIMES = ['Today 12:15pm', 'Today 1:30pm', 'Tomorrow 3:15pm', 'Monday 10:00am'];
  const NOTE = '<small>Example information for this prototype. Check your policy documents for exact terms.</small>';
  const CHAT_NAV = [[/claim/, 'claims', 'Claims', 1], [/extras|limit/, 'extras', 'Extras usage', 2], [/cover|policy/, 'cover', 'Cover'], [/reward|points/, 'rewards', 'Rewards'], [/program/, 'programs', 'Programs'], [/provider|service/, 'services', 'Services'], [/help|contact|support/, 'help', 'Help and support'], [/profile/, 'health-profile', 'Health profile'], [/payment/, 'account/payment', 'Payment details'], [/appointment|booking|document/, 'bookings', 'Bookings']];
  let chatFlow = null;
  const suggest = () => ['Show my upcoming appointments', 'Find my documents', 'What does my cover include?', 'Book an appointment'];
  function chatAdd(who, html) {
    const log = $('#chatLog'), d = document.createElement('div');
    d.className = 'msg ' + who;
    if (who === 'me') d.textContent = html; else d.innerHTML = html;
    log.appendChild(d); log.scrollTop = log.scrollHeight;
  }
  function chatChips(list) {
    $('#chatChips').innerHTML = list.map(c => typeof c === 'string' ? `<button type="button" class="chip" data-chat="${c}">${c}</button>` : `<button type="button" class="chip" data-act="${c[1]}">${c[0]}</button>`).join('');
  }
  const bot = (html, chips) => { chatAdd('bot', html); chatChips(chips || suggest()); };
  function chatReset() {
    chatFlow = null; $('#chatLog').innerHTML = ''; $('#chatChips').innerHTML = '';
    if (!$('#chatPanel').hidden) chatGreet();
  }
  function chatGreet() {
    bot('Hi John, I’m the Bupa assistant. I can find your appointments and documents, answer questions about your cover and help with simple tasks like booking an appointment.');
  }
  function chatOpen(v) {
    $('#chatPanel').hidden = !v; $('#chatFab').setAttribute('aria-expanded', v);
    if (v) { if (!$('#chatLog').children.length) chatGreet(); $('#chatInput').focus(); }
  }
  function coverAnswer(kind) {
    if (!M()) return [`You don’t have Bupa health insurance yet, so there’s no policy to check. Hospital cover generally covers admissions, surgery and theatre fees, and extras cover generally covers everyday services like dental, optical and physio.<br>${NOTE}`, [['Compare cover', 'go:cover'], ['Get a quote', 'quote'], 'Book an appointment']];
    const x = E();
    if (kind === 'waiting') return [`<b>Typical waiting periods</b><ul><li>Hospital services: 2 months</li><li>Pre-existing conditions and pregnancy: 12 months</li>${x ? '<li>General dental, optical and physio: 2 months</li><li>Major dental: 12 months</li>' : ''}</ul>${NOTE}`, ['What does my cover include?', 'What is excluded?', 'Find my documents']];
    if (kind === 'exclusions') return [`<b>What isn’t covered</b><ul><li>Cosmetic procedures that aren’t medically necessary</li><li>Treatment outside Australia</li>${x ? '<li>Services above your annual extras limits</li>' : '<li>Everyday extras like dental, optical and physio</li>'}</ul>${NOTE}`, x ? [['Check extras usage', 'go:extras'], 'What are the waiting periods?'] : [['Compare extras cover', 'go:cover'], 'What are the waiting periods?']];
    return [`<b>Your ${x ? 'Hospital and extras' : 'Hospital only'} cover includes</b><ul><li>Hospital accommodation and theatre fees</li><li>Surgery and in-hospital treatments</li><li>Emergency admissions</li>${x ? '<li>General dental, optical and physio, up to your annual limits ($520 left for general dental)</li>' : ''}</ul>${x ? '' : 'Extras like dental, optical and physio aren’t included.<br>'}${NOTE}`, x ? [['Check extras usage', 'go:extras'], 'What are the waiting periods?', 'What is excluded?'] : [['Compare extras cover', 'go:cover'], 'What are the waiting periods?', 'What is excluded?']];
  }
  function chatBook(t) {
    if (/cancel|never mind|stop|no thanks/.test(t)) { chatFlow = null; return bot('No problem, I’ve cancelled that booking.'); }
    const f = chatFlow;
    if (f.step === 'svc') {
      const s = SVCS.find(o => o.toLowerCase() === t || t.includes(o.toLowerCase().split(' ')[0]));
      if (!s) return bot('Which type of appointment would you like?', [...SVCS, 'Cancel']);
      f.svc = s; f.step = 'time';
      return bot(`When suits you for ${s}?`, [...TIMES, 'Cancel']);
    }
    if (f.step === 'time') {
      const s = TIMES.find(o => o.toLowerCase() === t) || TIMES.find(o => t.length > 2 && o.toLowerCase().includes(t));
      if (!s) return bot('Please pick one of the available times.', [...TIMES, 'Cancel']);
      f.time = s; f.step = 'confirm';
      return bot(`Book <b>${f.svc}</b> for <b>${s}</b>?`, ['Yes, confirm booking', 'Cancel']);
    }
    if (/^(yes|confirm|ok|book)/.test(t)) {
      const d = chatFlow; chatFlow = null; toast('Booking confirmed');
      return bot(`Done. Your ${d.svc} appointment is booked for ${d.time}.`, [['View bookings', 'go:bookings'], ...suggest().slice(0, 3)]);
    }
    bot('Would you like me to confirm this booking?', ['Yes, confirm booking', 'Cancel']);
  }
  function chatReply(q) {
    const t = q.toLowerCase().replace(/[?.!]+$/, '').trim();
    if (chatFlow) return chatBook(t);
    if (/\b(go to|take me|navigate|open)\b/.test(t)) {
      const n = CHAT_NAV.find(r => r[0].test(t));
      if (n) {
        if (n[3] === 1 && !M() || n[3] === 2 && !E()) return bot(`${n[2]} is only available with ${n[3] === 1 ? 'health insurance cover' : 'extras cover'}.`, [['Compare cover', 'go:cover'], ...suggest().slice(0, 2)]);
        return bot(`Here’s a shortcut to ${n[2]}.`, [[`Open ${n[2]}`, 'go:' + n[1]], ...suggest().slice(0, 2)]);
      }
    }
    if (/book|schedule|make an appointment/.test(t)) { chatFlow = { step: 'svc' }; return bot('Happy to help. What type of appointment do you need?', [...SVCS, 'Cancel']); }
    if (/waiting/.test(t)) { const [h, c] = coverAnswer('waiting'); return bot(h, c); }
    if (/exclu|not covered|isn.t covered/.test(t)) { const [h, c] = coverAnswer('exclusions'); return bot(h, c); }
    if (/includ|cover|extras|inclusion|what do i get/.test(t) && !/claim/.test(t)) { const [h, c] = coverAnswer('inclusions'); return bot(h, c); }
    if (/claim/.test(t)) return M() ? bot('I can start a claim for you or take you to your claims.', [['Start a claim', 'claim'], ['View claims', 'go:claims'], ...suggest().slice(0, 2)]) : bot('Claims are available once you have health insurance cover.', [['Compare cover', 'go:cover'], ...suggest().slice(0, 2)]);
    if (/document|referral|script|prescription|x-ray|report|plan|file/.test(t)) {
      if (!D()) return bot('You don’t have any documents yet. Documents from your appointments will show up here.', [['Book an appointment', 'book'], ...suggest().slice(0, 2)]);
      const words = t.split(/\W+/).filter(w => w.length > 3 && !/document|documents|find|show|have|need|looking|plan/.test(w));
      let hits = Object.values(DOCS).filter(d => words.some(w => d.title.toLowerCase().includes(w)));
      const all = !hits.length; if (all) hits = Object.values(DOCS);
      return bot(`${all ? 'Here are your recent documents' : 'I found these documents'}:<div class="chat-pills">${hits.slice(0, 6).map(d => docPill(d.title)).join('')}</div>`, [['View all in Bookings', 'go:bookings'], ...suggest().slice(0, 2)]);
    }
    if (/appointment|booking|upcoming|dentist|gp\b|doctor/.test(t)) {
      if (!D()) return bot('You don’t have any upcoming or past appointments.', [['Book an appointment', 'book'], ...suggest().slice(1, 3)]);
      if (/past|last|previous|history|recent/.test(t)) return bot(`Your most recent appointment was a <b>${PAST[0][0]}</b> on ${PAST[0][3]} at ${PAST[0][4]} with ${PAST[0][6]}.`, [['View past appointments', 'go:bookings'], ...suggest().slice(0, 2)]);
      return bot('<b>Upcoming appointments</b><ul><li>Scale and clean · Dentist</li><li>General consultation · GP</li></ul>', [['View all appointments', 'go:bookings'], 'Book an appointment', 'Find my documents']);
    }
    if (/hello|hi\b|hey/.test(t)) return bot('Hello! How can I help today?');
    bot('I’m not sure about that yet. I can help with appointments, documents, your cover, claims or booking. Try one of these:');
  }
  function chatSend(text) {
    text = text.trim(); if (!text) return;
    chatAdd('me', text);
    setTimeout(() => chatReply(text), 250);
  }
  $('#chatForm').addEventListener('submit', e => { e.preventDefault(); const i = $('#chatInput'); chatSend(i.value); i.value = ''; });
  document.addEventListener('click', e => { const c = e.target.closest('[data-chat]'); if (c) chatSend(c.dataset.chat); });
  $('#chatPanel').addEventListener('keydown', e => { if (e.key === 'Escape') { chatOpen(false); $('#chatFab').focus(); } });

  // ---------- chrome ----------
  document.querySelectorAll('[data-ic]').forEach(el => { el.innerHTML = svg(el.dataset.ic); });

  function menuOpen(v, which = 'acct') {
    ['acct', 'notif'].forEach(k => {
      const open = v && k === which;
      $('#' + k + 'Menu').hidden = !open; $('#' + k + 'Btn').setAttribute('aria-expanded', open);
    });
  }
  $('#acctBtn').onclick = e => { e.stopPropagation(); menuOpen($('#acctMenu').hidden, 'acct'); };
  $('#notifBtn').onclick = e => { e.stopPropagation(); menuOpen($('#notifMenu').hidden, 'notif'); };
  const NOTIFS = [
    { ic: 'file', t: 'Your tax statement is ready', d: '21 Jun', btn: 'Open', act: 'toast:Tax statement opened' },
    { ic: 'calendar', t: 'Book your annual skin check', sub: 'Due September', d: '11 Jul', btn: 'Book', act: 'book' },
    { ic: 'pill', t: 'Your prescription is ready', d: '12 Aug', btn: 'Open', act: 'toast:Prescription opened' },
    { ic: 'dollar', t: 'Your claim has been processed', sub: 'Physiotherapy', d: '21 Oct', btn: 'View', act: 'go:claims', member: 1 },
    { ic: 'heart', t: 'Metabolic health program', sub: 'You’re invited to join', d: '21 Oct', btn: 'Register', act: 'join:Metabolic health program' }
  ];
  const NOTIFS_NM = [
    { ic: 'calendar', t: 'Your dental appointment is tomorrow', sub: 'Bupa Dental · 9:30 am', d: '21 Oct', btn: 'View', act: 'go:bookings' },
    { ic: 'file', t: 'Your invoice is ready', sub: 'Dental · Scale and clean', d: '21 Oct', btn: 'Open', act: 'toast:Invoice opened' },
    { ic: 'clipboard', t: 'Complete your new patient form', sub: 'Due before your visit', d: '19 Oct', btn: 'Complete', act: 'form' },
    { ic: 'file', t: 'Your eye test results are ready', d: '12 Aug', btn: 'Open', act: 'toast:Results opened' },
    { ic: 'calendar', t: 'Book your annual skin check', sub: 'Due September', d: '11 Jul', btn: 'Book', act: 'book' }
  ];
  let notifsDismissed = false;
  function renderNotifs() {
    const list = notifsDismissed || !D() ? [] : (M() ? NOTIFS : NOTIFS_NM);
    $('#notifBtn').classList.toggle('has-new', list.length > 0);
    $('#notifMenu').innerHTML = `<div class="notif-top">${btn('Dismiss all', 'dismissnotifs', 'sm')}</div>` +
      (list.length ? list.map(n => `<div class="notif-item"><span class="icon" aria-hidden="true">${svg(n.ic)}</span><div class="notif-body"><b>${n.t}</b>${n.sub ? `<div class="notif-sub">${n.sub}</div>` : ''}</div><div class="notif-side"><small>${n.d}</small>${btn(n.btn, n.act, 'sm')}</div></div>`).join('')
        : `<div class="notif-empty">${svg('bell')}<b>No notifications</b></div>`);
  }
  $('#notifMenu').addEventListener('click', e => {
    const a = e.target.closest('[data-act]'); if (!a) return;
    if (a.dataset.act === 'dismissnotifs') { notifsDismissed = true; renderNotifs(); return; }
    menuOpen(false);
  });
  document.addEventListener('click', e => { if (!e.target.closest('.acct')) menuOpen(false); });
  $('#burger').onclick = () => { const n = $('#nav'); const o = n.classList.toggle('open'); $('#burger').setAttribute('aria-expanded', o); };

  const allowed = n => !n[2] || (n[2] === 1 ? M() : E());
  function setScenario() {
    localStorage.setItem('cover', state.cover); localStorage.setItem('data', state.data ? 'full' : 'empty');
    document.querySelectorAll('.seg button[data-c]').forEach(b => { const on = b.dataset.c === state.cover; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    document.querySelectorAll('.seg button[data-d]').forEach(b => { const on = (b.dataset.d === 'full') === state.data; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    notifsDismissed = false;
    chatReset();
    render();
  }
  document.querySelectorAll('.seg button[data-c]').forEach(b => b.onclick = () => { state.cover = b.dataset.c; setScenario(); });
  document.querySelectorAll('.seg button[data-d]').forEach(b => b.onclick = () => { state.data = b.dataset.d === 'full'; setScenario(); });

  function render() {
    const [, route = 'home', sub] = location.hash.split('/');
    if (NAV.some(n => n[0] === route && !allowed(n))) { location.hash = '#/home'; return; }
    $('#navRow').innerHTML = NAV.filter(allowed).map(([k, l]) => `<a href="#/${k}" class="${k === route ? 'on' : ''}" ${k === route ? 'aria-current="page"' : ''}>${l}</a>`).join('');
    const tile = (h, l, ic) => `<a class="am-tile" href="#/${h}">${svg(ic)}<span>${l}</span></a>`;
    const row = (h, l) => `<a class="am-row" href="#/${h}">${l}</a>`;
    $('#acctMenu').innerHTML = `<div class="am-head"><b>John Smith</b><span>309 points</span></div><div class="am-tiles">${tile('health-profile', 'Health profile', 'user')}${tile('health-actions', 'Health actions', 'clipboard')}<button class="am-tile" data-act="toast:Inbox opens here">${svg('mail')}<span>Inbox</span></button></div>` +
      row('account/contact', 'Personal details') + row('account/family', 'Family management') + row('account/payment', 'Payments') + row('account/settings', 'Settings') + `<button class="am-row" data-act="toast:Signed out (prototype)">Sign out</button>`;
    renderNotifs();
    $('#nav').classList.remove('open'); menuOpen(false);
    $('#main').innerHTML = route === 'account' ? pages.account(sub) : route === 'document' ? pages.document(sub) : (pages[route] || pages.home)();
    window.scrollTo(0, 0);
    main.classList.toggle('enter', routeChanged); routeChanged = false;
  }
  let routeChanged = false;
  const main = $('#main');
  window.addEventListener('hashchange', () => { routeChanged = true; render(); });
  setScenario();
})();
