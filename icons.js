/* ==========================================================================
   1º A — CENTRAL DA TURMA
   Ícones em linha (SVG), sem emojis. Traço único, consistente em todo o site.
========================================================================== */

const ICONS = {
  calendar: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.5h17"/><path d="M8 3v4M16 3v4"/></svg>',

  exam: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5h9l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"/><path d="M15 3.5V8h4"/><path d="M8.5 12.5h7M8.5 15.5h7M8.5 9.5h3"/></svg>',

  users: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8.5" r="3"/><path d="M2.8 19c.7-3 3-4.7 6.2-4.7s5.5 1.7 6.2 4.7"/><circle cx="17" cy="9" r="2.3"/><path d="M16 14.5c2.4.2 4 1.7 4.6 4.3"/></svg>',

  book: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.2c2.4-1 5-1.4 8-.4v14.6c-3-1-5.6-.6-8 .4Z"/><path d="M20 5.2c-2.4-1-5-1.4-8-.4v14.6c3-1 5.6-.6 8 .4Z"/></svg>',

  cap: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m2.5 8.5 9.5-4 9.5 4-9.5 4-9.5-4Z"/><path d="M7 10.6v4.3c0 1.5 2.2 2.7 5 2.7s5-1.2 5-2.7v-4.3"/><path d="M21 9.2v5.4"/></svg>',

  flask: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3h4"/><path d="M10.5 3v6.2L5.3 18a2 2 0 0 0 1.7 3h10a2 2 0 0 0 1.7-3l-5.2-8.8V3"/><path d="M7.3 15h9.4"/></svg>',

  flag: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3.5v17"/><path d="M5 4.5c2.5-1.5 4.9-1.5 7.3 0 2.3 1.4 4.6 1.4 6.7-.2V13c-2.1 1.6-4.4 1.6-6.7.2-2.4-1.5-4.8-1.5-7.3 0Z"/></svg>',

  target: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.2"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1"/></svg>',

  pencil: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20.5 4.8 16.6 15.9 5.5a2 2 0 0 1 2.8 0l1 1a2 2 0 0 1 0 2.8L8.6 20.4 4 20.5Z"/><path d="M14.3 7.1l2.6 2.6"/></svg>',

  copy: '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5.5 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v.5"/></svg>',

  external: '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5.5H5.5a2 2 0 0 0-2 2V18.5a2 2 0 0 0 2 2H16a2 2 0 0 0 2-2V15"/><path d="M13.5 3.5H20.5V10.5"/><path d="M20 4 11.5 12.5"/></svg>',

  search: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',

  sun: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.3M12 19.2v2.3M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg>',

  moon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 13.2A9 9 0 1 1 10.8 3a7.2 7.2 0 0 0 10.2 10.2Z"/></svg>',

  clock: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.2"/><path d="M12 7.5V12l3 2"/></svg>',

  next: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4.5v15l11-7.5-11-7.5Z"/><path d="M18 5v14"/></svg>',

  pin: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5c3 0 5.4 2.4 5.4 5.5 0 3.9-5.4 9.8-5.4 9.8S6.6 11.9 6.6 8c0-3.1 2.4-5.5 5.4-5.5Z"/><circle cx="12" cy="8" r="2"/><path d="M9 21.5h6"/></svg>',

  chart: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20.5V10M11 20.5V4M18 20.5v-7"/><path d="M2.5 20.5h19"/></svg>',

  building: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 20.5V6.2L12 2.5l7 3.7v14.3"/><path d="M9 9.3h.01M12 9.3h.01M15 9.3h.01M9 13h.01M12 13h.01M15 13h.01"/><path d="M10 20.5v-4h4v4"/></svg>'
};

function icon(name){
  return ICONS[name] || "";
}
