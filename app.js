/* ==========================================================================
   1º A — CENTRAL DA TURMA
   Lógica do aplicativo (tema, contadores, filtros, busca, checklist, cópia)
========================================================================== */

(function () {
  "use strict";

  /* ---------------------- utilidades de data (fuso de São Paulo, UTC-3) --------------------- */
  function parseDateSP(dateStr, endOfDay) {
    const [y, m, d] = dateStr.split("-").map(Number);
    const hour = endOfDay ? 23 : 0;
    const minute = endOfDay ? 59 : 0;
    const second = endOfDay ? 59 : 0;
    return new Date(Date.UTC(y, m - 1, d, hour + 3, minute, second));
  }

  function nowSP() {
    return new Date();
  }

  function daysBetween(from, to) {
    const MS = 1000 * 60 * 60 * 24;
    const a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const b = new Date(to.getFullYear(), to.getMonth(), to.getDate());
    return Math.round((b - a) / MS);
  }

  function formatDateLong(dateStr) {
    const [y, m, d] = dateStr.split("-").map(Number);
    const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    return d + " de " + meses[m - 1] + " de " + y;
  }

  function formatDateShort(dateStr) {
    const [y, m, d] = dateStr.split("-").map(Number);
    return String(d).padStart(2, "0") + "/" + String(m).padStart(2, "0") + "/" + y;
  }

  function eventEndDate(ev) {
    return ev.endDate || ev.date;
  }

  const PRIORITY_LABEL = {
    urgente: "Urgente",
    importante: "Importante",
    lembrete: "Lembrete",
    informacao: "Informação",
    concluido: "Concluído"
  };

  function badgeHtml(priority) {
    const label = PRIORITY_LABEL[priority] || "Informação";
    return '<span class="badge badge-' + priority + '"><span class="bdot"></span>' + label + '</span>';
  }

  /* ================================ TEMA ================================ */
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeBtn.innerHTML = theme === "dark" ? icon("sun") : icon("moon");
    try { localStorage.setItem("centralTurma:theme", theme); } catch (e) {}
  }

  (function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem("centralTurma:theme"); } catch (e) {}
    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }
  })();

  themeBtn.addEventListener("click", function () {
    const current = root.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  /* ================================ DATA CHIP ================================ */
  (function initDateChip() {
    const chip = document.getElementById("todayChip");
    const dias = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
    const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    const now = nowSP();
    chip.textContent = dias[now.getDay()] + ", " + now.getDate() + " " + meses[now.getMonth()];
  })();

  /* ================================ CHECKLIST (localStorage) ================================ */
  (function initTasks() {
    const key = "centralTurma:tasks";
    let done = {};
    try { done = JSON.parse(localStorage.getItem(key) || "{}"); } catch (e) { done = {}; }

    const checkBtn = document.getElementById("taskCheckPortugues");
    const titleEl = document.getElementById("taskTitlePortugues");
    const badgeEl = document.getElementById("taskBadgePortugues");

    function render() {
      const isDone = !!done["licao-portugues"];
      checkBtn.classList.toggle("checked", isDone);
      checkBtn.setAttribute("aria-pressed", String(isDone));
      checkBtn.innerHTML = isDone
        ? '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l5 5 10-11"/></svg>'
        : "";
      titleEl.classList.toggle("done", isDone);
      badgeEl.outerHTML = isDone ? badgeHtmlWithId("concluido") : badgeHtmlWithId("lembrete");
    }

    function badgeHtmlWithId(priority) {
      const label = PRIORITY_LABEL[priority];
      return '<span class="badge badge-' + priority + '" id="taskBadgePortugues"><span class="bdot"></span>' + label + '</span>';
    }

    checkBtn.addEventListener("click", function () {
      done["licao-portugues"] = !done["licao-portugues"];
      try { localStorage.setItem(key, JSON.stringify(done)); } catch (e) {}
      render();
    });

    render();
  })();

  /* ================================ COPIAR CÓDIGO ================================ */
  (function initCopyCode() {
    const btn = document.getElementById("copyCodeBtn");
    const feedback = document.getElementById("copyFeedback");
    const codeText = document.getElementById("classroomCode").textContent.trim();

    function showFeedback() {
      feedback.classList.add("show");
      setTimeout(function () { feedback.classList.remove("show"); }, 1800);
    }

    function fallbackCopy(text) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
    }

    btn.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeText).then(showFeedback).catch(function () {
          fallbackCopy(codeText);
          showFeedback();
        });
      } else {
        fallbackCopy(codeText);
        showFeedback();
      }
    });
  })();

  /* ================================ BOTÃO ETEC ================================ */
  (function initEtecBtn() {
    const btn = document.getElementById("etecLinkBtn");
    if (ETEC_LINK) {
      btn.setAttribute("href", ETEC_LINK);
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener");
      return;
    }
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const original = btn.textContent;
      btn.textContent = "Link ainda não disponível";
      setTimeout(function () { btn.textContent = original; }, 2200);
    });
  })();

  /* ================================ ENEM: LINKS DE CURSINHOS ================================ */
  (function renderEnemLinks() {
    const container = document.getElementById("enemLinksList");
    container.innerHTML = "";
    ENEM_LINKS.forEach(function (item) {
      const row = document.createElement(item.url ? "a" : "div");
      row.className = "link-placeholder";
      if (item.url) {
        row.href = item.url;
        row.target = "_blank";
        row.rel = "noopener";
      }
      row.innerHTML = item.label + "<span>" + (item.url ? icon("external") : "em breve") + "</span>";
      container.appendChild(row);
    });
  })();

  /* ================================ PREPARAÇÃO ETEC: CHIPS ================================ */
  (function renderEtecPrep() {
    const container = document.getElementById("etecPrepList");
    container.innerHTML = "";
    ETEC_PREP.forEach(function (item) {
      const el = document.createElement(item.url ? "a" : "span");
      el.className = "chip";
      if (item.url) {
        el.href = item.url;
        el.target = "_blank";
        el.rel = "noopener";
      }
      el.textContent = item.label;
      container.appendChild(el);
    });
  })();

  /* ================================ GOOGLE SALA DE AULA ================================ */
  (function renderClassroom() {
    document.getElementById("classroomSubject").textContent = CLASSROOM.subject;
    document.getElementById("classroomCode").textContent = CLASSROOM.code;
    const openBtn = document.getElementById("openClassroomBtn");
    openBtn.href = CLASSROOM.url;
  })();

  /* ================================ PRÓXIMO EVENTO ================================ */
  function getUpcomingEvents() {
    const now = nowSP();
    return EVENTS
      .filter(function (ev) { return parseDateSP(eventEndDate(ev), true) >= now; })
      .sort(function (a, b) { return parseDateSP(a.date, false) - parseDateSP(b.date, false); });
  }

  function renderNextEvent() {
    const upcoming = getUpcomingEvents();
    const titleEl = document.getElementById("nextEventTitle");
    const dateEl = document.getElementById("nextEventDate");
    const daysEl = document.getElementById("nextEventDays");
    const daysLabelEl = document.getElementById("nextEventDaysLabel");

    if (upcoming.length === 0) {
      titleEl.textContent = "Nenhum evento futuro cadastrado";
      dateEl.textContent = "";
      daysEl.textContent = "–";
      daysLabelEl.textContent = "";
      return;
    }

    const next = upcoming[0];
    const now = nowSP();
    const d = daysBetween(now, parseDateSP(next.date, false));

    titleEl.textContent = next.title;
    dateEl.textContent = next.endDate
      ? formatDateLong(next.date) + " e " + next.endDate.split("-")[2] + " (dois dias)"
      : formatDateLong(next.date);

    if (d <= 0) {
      daysEl.textContent = "Hoje";
      daysLabelEl.textContent = "";
    } else {
      daysEl.textContent = d;
      daysLabelEl.textContent = d === 1 ? "dia" : "dias";
    }
  }

  /* ================================ LISTA DE PROVAS ================================ */
  function renderExamList() {
    const list = document.getElementById("examList");
    list.innerHTML = "";
    const now = nowSP();
    const exams = EVENTS.filter(function (ev) { return ev.showInExamList; })
      .sort(function (a, b) { return parseDateSP(a.date, false) - parseDateSP(b.date, false); });

    exams.forEach(function (ev) {
      const d = daysBetween(now, parseDateSP(ev.date, false));
      const dateLabel = ev.endDate
        ? formatDateShort(ev.date) + " e " + formatDateShort(ev.endDate).slice(0, 2)
        : formatDateShort(ev.date);

      const el = document.createElement("div");
      el.className = "exam-card";
      el.setAttribute("data-card", "");
      el.setAttribute("data-cat", ev.category + " eventos");
      el.setAttribute("data-search", ev.title.toLowerCase());

      let daysText, daysUnit;
      if (d > 0) { daysText = d; daysUnit = d === 1 ? "dia" : "dias"; }
      else if (d === 0) { daysText = "Hoje"; daysUnit = ""; }
      else { daysText = "Concluído"; daysUnit = ""; }

      el.innerHTML =
        '<div class="exam-icon">' + icon(ev.icon) + '</div>' +
        '<div class="exam-info">' +
          '<div class="name">' + ev.title + '</div>' +
          '<div class="date">' + dateLabel + '</div>' +
        '</div>' +
        '<div class="exam-days"><div class="n">' + daysText + '</div><div class="u">' + daysUnit + '</div></div>';

      list.appendChild(el);
    });
  }

  /* ================================ CONTADOR PROVÃO PAULISTA ================================ */
  function initProvaoCountdown() {
    const provao = EVENTS.find(function (ev) { return ev.id === "provao-paulista"; });
    const start = parseDateSP(provao.date, false);
    const end = parseDateSP(provao.endDate, true);
    const wrap = document.getElementById("provaoCountdownWrap");

    function tick() {
      const now = nowSP();

      if (now < start) {
        const diff = start - now;
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById("cdDays").textContent = String(d);
        document.getElementById("cdHours").textContent = String(h).padStart(2, "0");
        document.getElementById("cdMinutes").textContent = String(m).padStart(2, "0");
        document.getElementById("cdSeconds").textContent = String(s).padStart(2, "0");
      } else if (now >= start && now <= end) {
        wrap.innerHTML = '<div class="countdown-done">O Provão Paulista começou.</div>';
        clearInterval(timer);
      } else {
        wrap.innerHTML = '<div class="countdown-done">Provão Paulista concluído.</div>';
        clearInterval(timer);
      }
    }

    tick();
    const timer = setInterval(tick, 1000);
  }

  /* ================================ CALENDÁRIO ================================ */
  function renderCalendar() {
    const container = document.getElementById("calendarTimeline");
    container.innerHTML = "";
    const now = nowSP();

    const rows = [];
    EVENTS.slice()
      .sort(function (a, b) { return parseDateSP(a.date, false) - parseDateSP(b.date, false); })
      .forEach(function (ev) {
        if (ev.endDate) {
          rows.push({ date: ev.date, label: ev.title + " — dia 1" });
          rows.push({ date: ev.endDate, label: ev.title + " — dia 2" });
        } else {
          rows.push({ date: ev.date, label: ev.title });
        }
      });

    rows.forEach(function (row) {
      const isPast = parseDateSP(row.date, true) < now;
      const item = document.createElement("div");
      item.className = "timeline-item" + (isPast ? " past" : "");
      item.innerHTML =
        '<div class="timeline-date">' + formatDateShort(row.date) + '</div>' +
        '<div class="timeline-title">' + row.label + '</div>';
      container.appendChild(item);
    });
  }

  /* ================================ ESTATÍSTICAS ================================ */
  function renderStats() {
    const now = nowSP();
    const upcoming = getUpcomingEvents();

    const nextProva = upcoming.find(function (ev) { return ev.category === "provas"; });
    const nextTrabalho = upcoming.find(function (ev) { return ev.category === "trabalhos"; });
    const provao = EVENTS.find(function (ev) { return ev.id === "provao-paulista"; });
    const diasProvao = daysBetween(now, parseDateSP(provao.date, false));

    const stats = [
      { k: "Próxima avaliação", v: nextProva ? nextProva.title : "—" },
      { k: "Próximo trabalho/apresentação", v: nextTrabalho ? nextTrabalho.title : "—" },
      { k: "Próximo grande exame", v: "Provão Paulista" },
      { k: "Dias até o Provão", v: diasProvao > 0 ? diasProvao + (diasProvao === 1 ? " dia" : " dias") : "Em andamento ou concluído" }
    ];

    const grid = document.getElementById("statsGrid");
    grid.innerHTML = "";
    stats.forEach(function (s) {
      const el = document.createElement("div");
      el.className = "stat-card";
      el.innerHTML = '<div class="k">' + s.k + '</div><div class="v">' + s.v + '</div>';
      grid.appendChild(el);
    });
  }

  /* ================================ FILTROS + BUSCA ================================ */
  function initFilters() {
    const buttons = document.querySelectorAll(".filter-chip");
    let activeFilter = "todos";

    function applyFilters() {
      const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
      const cards = document.querySelectorAll("[data-card]");

      cards.forEach(function (card) {
        const cats = (card.getAttribute("data-cat") || "").split(" ");
        const searchable = ((card.getAttribute("data-search") || "") + " " + card.textContent).toLowerCase();

        const matchesFilter = activeFilter === "todos" || cats.indexOf(activeFilter) !== -1;
        const matchesSearch = !searchTerm || searchable.indexOf(searchTerm) !== -1;

        card.classList.toggle("hidden-by-filter", !(matchesFilter && matchesSearch));
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeFilter = btn.getAttribute("data-filter");
        applyFilters();
      });
    });

    document.getElementById("searchInput").addEventListener("input", applyFilters);
  }

  /* ================================ ÍCONES ESTÁTICOS DO MARKUP ================================ */
  function renderStaticIcons() {
    document.querySelectorAll("[data-icon]").forEach(function (el) {
      el.innerHTML = icon(el.getAttribute("data-icon"));
    });
  }

  /* ================================ INICIALIZAÇÃO ================================ */
  renderStaticIcons();
  renderNextEvent();
  renderExamList();
  initProvaoCountdown();
  renderCalendar();
  renderStats();
  initFilters();

})();
