// chatbot-widget.js — Boostra Chatbot Widget v1.0
// Drop in one <script> tag. Configure via window.BoostraChatConfig.
// Connects to your n8n Chat Trigger webhook; falls back to demo replies.
//
// QUICK START:
//   <script>
//     window.BoostraChatConfig = {
//       webhookUrl: 'https://your-n8n.app/webhook/abc/chat',
//       botName: 'Acme Support',
//       accent: '#16a34a',
//       logoSrc: '/path/to/logo.png',
//     };
//   </script>
//   <script src="chatbot-widget.js"></script>

(function () {
  'use strict';

  // ── CSS ────────────────────────────────────────────────────────────────────
  var BCG_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.bcg-widget {
  --bcg-accent: #2563eb;
  --bcg-accent-hover: #1d4ed8;
  --bcg-accent-fg: #ffffff;
  --bcg-bg: #ffffff;
  --bcg-bg-panel: #ffffff;
  --bcg-bg-soft: #f8fafc;
  --bcg-fg: #1e293b;
  --bcg-fg-muted: #64748b;
  --bcg-border: #e2e8f0;
  --bcg-bot-bg: #f1f5f9;
  --bcg-bot-fg: #1e293b;
  --bcg-user-bg: var(--bcg-accent);
  --bcg-user-fg: var(--bcg-accent-fg);
  --bcg-header-bg: #ffffff;
  --bcg-header-fg: #1e293b;
  --bcg-header-sub: #64748b;
  --bcg-shadow: 0 24px 60px -12px rgba(15,23,42,.25), 0 8px 24px -8px rgba(15,23,42,.18);
  --bcg-radius-window: 20px;
  --bcg-radius-bubble: 14px;
  --bcg-radius-launcher: 50%;
  --bcg-radius-input: 12px;
  --bcg-font: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --bcg-pad: 16px;
  --bcg-msg-gap: 10px;
  --bcg-msg-pad-y: 10px;
  --bcg-msg-pad-x: 14px;
  --bcg-msg-fs: 14px;
  --bcg-width: 400px;
  --bcg-height: 640px;
  position: fixed; right: 24px; bottom: 24px; z-index: 9999;
  font-family: var(--bcg-font); color: var(--bcg-fg);
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.bcg-widget *, .bcg-widget *::before, .bcg-widget *::after { box-sizing: border-box; }

/* Launcher ---------------------------------------------------------- */
.bcg-launcher {
  width: 60px; height: 60px; border-radius: var(--bcg-radius-launcher);
  background: var(--bcg-accent); color: var(--bcg-accent-fg);
  border: 0; cursor: pointer; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 12px 28px -8px rgba(37,99,235,.55), 0 6px 14px -6px rgba(15,23,42,.25);
  transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
  position: absolute; right: 0; bottom: 0;
}
.bcg-launcher:hover {
  background: var(--bcg-accent-hover); transform: translateY(-2px);
  box-shadow: 0 16px 36px -8px rgba(37,99,235,.6), 0 8px 18px -6px rgba(15,23,42,.3);
}
.bcg-launcher svg { width: 26px; height: 26px; }
.bcg-launcher.is-open .bcg-i-chat,
.bcg-launcher.is-open .bcg-i-spark,
.bcg-launcher.is-open .bcg-i-logo { display: none; }
.bcg-launcher:not(.is-open) .bcg-i-close { display: none; }
.bcg-i-logo { width: 32px; height: 32px; object-fit: contain; border-radius: 4px; }
.bcg-launcher-badge {
  position: absolute; top: -2px; right: -2px; min-width: 18px; height: 18px; padding: 0 5px;
  border-radius: 9px; background: #ef4444; color: #fff; font-size: 11px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 0 2px var(--bcg-bg, #fff);
}

/* Tooltip ----------------------------------------------------------- */
.bcg-tooltip {
  position: absolute; right: 74px; bottom: 10px;
  background: #ffffff; color: #1e293b;
  padding: 10px 14px; border-radius: 12px;
  box-shadow: 0 10px 25px rgba(15,23,42,.15);
  font-size: 13px; font-weight: 500; white-space: nowrap;
  display: flex; align-items: center; gap: 10px;
  animation: bcg-pop .35s cubic-bezier(.2,.9,.3,1.4);
}
.bcg-tooltip::after {
  content: ''; position: absolute; right: -6px; top: 50%; transform: translateY(-50%);
  border: 6px solid transparent; border-left-color: #fff;
}
.bcg-tooltip-x {
  appearance: none; border: 0; background: transparent; color: #94a3b8; cursor: pointer;
  width: 18px; height: 18px; border-radius: 4px;
  display: flex; align-items: center; justify-content: center; padding: 0;
  transition: background .12s ease, color .12s ease;
}
.bcg-tooltip-x:hover { background: #f1f5f9; color: #1e293b; }
@keyframes bcg-pop {
  from { opacity: 0; transform: translateY(6px) scale(.96); }
  to   { opacity: 1; transform: none; }
}

/* Window ------------------------------------------------------------ */
.bcg-window {
  position: absolute; right: 0; bottom: 76px;
  width: var(--bcg-width); height: var(--bcg-height); max-height: calc(100vh - 120px);
  background: var(--bcg-bg-panel);
  border-radius: var(--bcg-radius-window);
  box-shadow: var(--bcg-shadow);
  display: flex; flex-direction: column; overflow: hidden;
  transform-origin: bottom right;
  animation: bcg-in .25s cubic-bezier(.2,.9,.3,1.1);
  border: 1px solid rgba(15,23,42,.06);
}
@keyframes bcg-in {
  from { opacity: 0; transform: translateY(10px) scale(.97); }
  to   { opacity: 1; transform: none; }
}

/* Header ------------------------------------------------------------ */
.bcg-header {
  background: var(--bcg-header-bg); color: var(--bcg-header-fg);
  padding: 14px 16px; display: flex; align-items: center; gap: 12px;
  border-bottom: 1px solid var(--bcg-border); flex-shrink: 0;
}
.bcg-header.is-gradient {
  background: linear-gradient(135deg, var(--bcg-accent) 0%, var(--bcg-accent-hover) 100%);
  color: var(--bcg-accent-fg); border-bottom: 0;
}
.bcg-header.is-solid { background: var(--bcg-accent); color: var(--bcg-accent-fg); border-bottom: 0; }
.bcg-header.is-gradient .bcg-header-sub,
.bcg-header.is-solid   .bcg-header-sub { color: rgba(255,255,255,.78); }
.bcg-header.is-gradient .bcg-header-btn,
.bcg-header.is-solid   .bcg-header-btn { color: rgba(255,255,255,.85); }
.bcg-header.is-gradient .bcg-header-btn:hover,
.bcg-header.is-solid   .bcg-header-btn:hover { background: rgba(255,255,255,.18); }
.bcg-header.is-gradient .bcg-avatar.is-mono,
.bcg-header.is-solid   .bcg-avatar.is-mono { background: rgba(255,255,255,.2); color: #fff; }
.bcg-header.is-gradient .bcg-status-dot,
.bcg-header.is-solid   .bcg-status-dot { box-shadow: 0 0 0 2px var(--bcg-accent); }

.bcg-avatar {
  width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
  background: #e0f2fe; color: var(--bcg-accent);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 15px; overflow: hidden; position: relative;
}
.bcg-avatar img { width: 100%; height: 100%; object-fit: contain; padding: 5px; background: #fff; }
.bcg-avatar.is-mono { background: rgba(37,99,235,.12); color: var(--bcg-accent); }
.bcg-status-dot {
  position: absolute; right: -1px; bottom: -1px; width: 11px; height: 11px;
  border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 2px var(--bcg-bg-panel);
}
.bcg-header-text { flex: 1; min-width: 0; line-height: 1.25; }
.bcg-header-title { font-size: 15px; font-weight: 600; letter-spacing: -.01em; }
.bcg-header-sub {
  font-size: 12px; color: var(--bcg-header-sub);
  display: flex; align-items: center; gap: 5px; margin-top: 2px;
}
.bcg-header-sub::before {
  content: ''; width: 6px; height: 6px; border-radius: 50%;
  background: #22c55e; display: inline-block; flex-shrink: 0;
}
.bcg-header.is-gradient .bcg-header-sub::before,
.bcg-header.is-solid   .bcg-header-sub::before { background: #86efac; }
.bcg-header-actions { display: flex; gap: 4px; }
.bcg-header-btn {
  width: 30px; height: 30px; border-radius: 8px; border: 0; background: transparent;
  color: var(--bcg-fg-muted); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background .15s ease;
}
.bcg-header-btn:hover { background: var(--bcg-bg-soft); color: var(--bcg-fg); }
.bcg-header-btn svg { width: 16px; height: 16px; }

/* Messages ---------------------------------------------------------- */
.bcg-messages {
  flex: 1; overflow-y: auto; overflow-x: hidden;
  padding: var(--bcg-pad); background: var(--bcg-bg);
  display: flex; flex-direction: column; gap: var(--bcg-msg-gap);
  scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent;
}
.bcg-messages::-webkit-scrollbar { width: 6px; }
.bcg-messages::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }

.bcg-msg { display: flex; gap: 8px; max-width: 88%; animation: bcg-msg-in .25s ease; }
@keyframes bcg-msg-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: none; }
}
.bcg-msg-bot  { align-self: flex-start; }
.bcg-msg-user { align-self: flex-end; flex-direction: row-reverse; }
.bcg-msg-avatar {
  width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
  background: var(--bcg-accent); color: var(--bcg-accent-fg);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; overflow: hidden;
  align-self: flex-end; margin-bottom: 2px;
}
.bcg-msg-avatar img { width: 100%; height: 100%; object-fit: contain; padding: 3px; background: #fff; }
.bcg-msg-avatar.is-mono { background: rgba(37,99,235,.12); color: var(--bcg-accent); }

.bcg-bubble {
  padding: var(--bcg-msg-pad-y) var(--bcg-msg-pad-x);
  border-radius: var(--bcg-radius-bubble);
  font-size: var(--bcg-msg-fs); line-height: 1.5;
  word-wrap: break-word; white-space: pre-wrap;
}
.bcg-msg-bot  .bcg-bubble { background: var(--bcg-bot-bg); color: var(--bcg-bot-fg); border-bottom-left-radius: 4px; }
.bcg-msg-user .bcg-bubble { background: var(--bcg-user-bg); color: var(--bcg-user-fg); border-bottom-right-radius: 4px; }
.bcg-msg-time { font-size: 10.5px; color: var(--bcg-fg-muted); margin-top: 3px; padding: 0 4px; letter-spacing: .01em; }
.bcg-msg-user .bcg-msg-time { text-align: right; }

/* Typing indicator ------------------------------------------------- */
.bcg-typing { display: inline-flex; gap: 4px; padding: 14px 14px; align-items: center; }
.bcg-typing span {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--bcg-fg-muted); opacity: .5;
  animation: bcg-bounce 1.2s infinite ease-in-out;
}
.bcg-typing span:nth-child(2) { animation-delay: .15s; }
.bcg-typing span:nth-child(3) { animation-delay: .3s; }
@keyframes bcg-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: .5; }
  30%           { transform: translateY(-5px); opacity: 1; }
}

/* Welcome / empty state -------------------------------------------- */
.bcg-welcome {
  text-align: center; padding: 32px 20px 20px;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
}
.bcg-welcome-avatar {
  width: 56px; height: 56px; border-radius: 50%; background: var(--bcg-accent);
  display: flex; align-items: center; justify-content: center;
  color: var(--bcg-accent-fg); margin-bottom: 6px; overflow: hidden;
}
.bcg-welcome-avatar img { width: 100%; height: 100%; object-fit: contain; padding: 8px; background: #fff; }
.bcg-welcome-title { font-size: 17px; font-weight: 600; color: var(--bcg-fg); margin: 0; letter-spacing: -.01em; }
.bcg-welcome-sub { font-size: 13.5px; color: var(--bcg-fg-muted); margin: 0; line-height: 1.5; max-width: 300px; }

/* Quick reply chips ------------------------------------------------ */
.bcg-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 6px var(--bcg-pad) 0; }
.bcg-chip {
  background: var(--bcg-bg-panel); color: var(--bcg-accent);
  border: 1px solid var(--bcg-border);
  padding: 8px 12px; border-radius: 18px; font-size: 12.5px; font-weight: 500;
  cursor: pointer; transition: all .15s ease;
  font-family: inherit; line-height: 1.3;
}
.bcg-chip:hover {
  background: var(--bcg-accent); color: var(--bcg-accent-fg);
  border-color: var(--bcg-accent); transform: translateY(-1px);
}

/* Input ------------------------------------------------------------ */
.bcg-input-wrap {
  padding: 10px var(--bcg-pad) calc(var(--bcg-pad) - 4px);
  background: var(--bcg-bg-panel); border-top: 1px solid var(--bcg-border); flex-shrink: 0;
}
.bcg-input-row {
  display: flex; gap: 8px; align-items: flex-end;
  background: var(--bcg-bg-soft); border: 1px solid var(--bcg-border);
  border-radius: var(--bcg-radius-input); padding: 6px 6px 6px 12px;
  transition: border-color .15s ease, box-shadow .15s ease;
}
.bcg-input-row:focus-within {
  border-color: var(--bcg-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--bcg-accent) 18%, transparent);
}
.bcg-input {
  flex: 1; border: 0; background: transparent; outline: 0; resize: none;
  font-family: inherit; font-size: 14px; color: var(--bcg-fg);
  line-height: 1.4; padding: 7px 0; min-height: 20px; max-height: 96px;
}
.bcg-input::placeholder { color: var(--bcg-fg-muted); }
.bcg-send {
  width: 34px; height: 34px; border-radius: 8px; border: 0; cursor: pointer;
  background: var(--bcg-accent); color: var(--bcg-accent-fg);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  transition: background .15s ease;
}
.bcg-send:hover:not(:disabled) { background: var(--bcg-accent-hover); }
.bcg-send:disabled { opacity: .4; cursor: not-allowed; }
.bcg-send svg { width: 16px; height: 16px; }
.bcg-footer {
  text-align: center; font-size: 10.5px; color: var(--bcg-fg-muted);
  padding: 8px 0 4px; letter-spacing: .02em;
}
.bcg-footer a { color: var(--bcg-fg-muted); text-decoration: none; font-weight: 500; }
.bcg-footer a:hover { color: var(--bcg-accent); }

/* Error toast ------------------------------------------------------ */
.bcg-error {
  margin: 0 var(--bcg-pad) 8px; padding: 8px 12px; font-size: 12px;
  background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; border-radius: 8px;
}

/* Drawer layout ---------------------------------------------------- */
.bcg-widget.is-drawer .bcg-window {
  right: 0; bottom: 0; top: 0; width: var(--bcg-width);
  height: 100vh; max-height: 100vh;
  border-radius: 0; border-left: 1px solid var(--bcg-border);
  border-top: 0; border-right: 0; border-bottom: 0;
  animation: bcg-slide-in .3s cubic-bezier(.2,.9,.3,1.1);
}
@keyframes bcg-slide-in {
  from { transform: translateX(20px); opacity: 0; }
  to   { transform: none; opacity: 1; }
}

/* Inline layout ---------------------------------------------------- */
.bcg-widget.is-inline { position: relative; right: auto; bottom: auto; }
.bcg-widget.is-inline .bcg-window {
  position: relative; right: auto; bottom: auto; animation: none; box-shadow: var(--bcg-shadow);
}
.bcg-widget.is-inline .bcg-launcher,
.bcg-widget.is-inline .bcg-tooltip { display: none; }
`;

  // ── Default avatar (shown when no logoSrc is set) ─────────────────────────
  // Injected as innerHTML so currentColor inherits the accent automatically.
  var DEFAULT_AVATAR_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" style="width:52%;height:52%"><path d="M12 2l2.4 7.4L22 12l-7.6 2.6L12 22l-2.4-7.4L2 12l7.6-2.6z"/></svg>';

  // ── SVG Icons ──────────────────────────────────────────────────────────────
  var SVG = {
    chat:    '<svg class="bcg-i-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    spark:   '<svg class="bcg-i-spark" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2zM19 16L19.7 18.3L22 19L19.7 19.7L19 22L18.3 19.7L16 19L18.3 18.3L19 16zM5 14L5.5 15.5L7 16L5.5 16.5L5 18L4.5 16.5L3 16L4.5 15.5L5 14z"/></svg>',
    close:   '<svg class="bcg-i-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    send:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    minimize:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 12h12"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15.5-6.4L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.4L3 16M3 21v-5h5"/></svg>',
    xSmall:  '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M2 2l6 6M8 2L2 8"/></svg>',
  };

  // ── Defaults ───────────────────────────────────────────────────────────────
  var DEFAULTS = {
    botName:         'Boostra Assistant',
    tagline:         'Online · Replies instantly',
    welcomeTitle:    'Hi there 👋',
    welcomeSubtitle: "Got a question? Ask away — I'll get you sorted.",
    suggestions:     ['What do you do?', 'How much does it cost?', 'Book a call'],
    accent:          '#2563eb',
    logoSrc:         '',
    webhookUrl:      'https://dev.boostra.co.nz/webhook/4ff30c6c-2479-4921-8d1f-63a8949f7bfe/chat',
    poweredBy:       'Powered by Boostra',
    poweredByUrl:    'https://www.boostra.co.nz',
    layout:          'floating',   // 'floating' | 'drawer' | 'inline'
    headerStyle:     'gradient',   // 'gradient' | 'solid' | 'minimal'
    bubbleShape:     'soft',       // 'soft' | 'pill' | 'square'
    density:         'regular',    // 'compact' | 'regular' | 'comfy'
    launcherIcon:    'chat',       // 'chat' | 'spark' | 'logo'
    showAvatar:      true,
    showSuggestions: true,
    showPoweredBy:   true,
    openByDefault:   false,
    showTooltip:     true,
    tooltipText:     'Need a hand? Ask me anything',
    theme:           {},
  };

  // Canned replies (used when no webhookUrl is set)
  var DEFAULT_REPLIES = [
    [/\b(hi|hello|hey|kia ora)\b/i,            "Kia ora! 👋 How can I help you today?"],
    [/\b(price|cost|how much|pricing)\b/i,     "Our packages start at $299 NZD/month. Want me to walk you through the options?"],
    [/\b(what|who).*(boostra|you|do)\b/i,      "Boostra builds AI automations for SMEs — lead capture, support triage, custom workflows. We handle the tech so you keep the wins."],
    [/\b(lead|leads|outreach)\b/i,             "Our Lead Automations capture, enrich and score every inbound lead, then trigger personalised outreach. Most clients see a 30% lift in conversion."],
    [/\b(support|tickets|chatbot)\b/i,         "Our Support Automations triage and route tickets instantly — 50% faster response times on average."],
    [/\b(call|book|demo|meeting|discovery)\b/i,"Happy to set up a 20-min discovery call. What's your email and a couple of times that work?"],
    [/\b(email|contact)\b/i,                   "Reach us at kia.ora@boostra.co.nz or book directly at boostra.co.nz."],
    [/\b(thanks|cheers|ta)\b/i,               "Anytime! Anything else I can help with?"],
  ];

  // ── Widget instance ────────────────────────────────────────────────────────
  var _el = null;
  var _cfg = null;
  var _state = null;

  function init(userConfig) {
    // Remove existing widget
    if (_el && _el.parentNode) _el.parentNode.removeChild(_el);

    _cfg = Object.assign({}, DEFAULTS, userConfig || window.BoostraChatConfig || {});

    _state = {
      open:             _cfg.openByDefault || _cfg.layout === 'inline',
      tooltipDismissed: _cfg.openByDefault,
      messages:         [],
      typing:           false,
      unread:           0,
      error:            '',
      sessionId:        newSessionId(),
    };

    // Inject CSS once
    if (!document.getElementById('bcg-styles')) {
      var s = document.createElement('style');
      s.id = 'bcg-styles';
      s.textContent = BCG_CSS;
      document.head.appendChild(s);
    }

    _el = document.createElement('div');
    applyTokens(_el);
    document.body.appendChild(_el);
    render();
  }

  function applyTokens(el) {
    var c = _cfg;
    el.className = ['bcg-widget',
      c.layout === 'drawer' ? 'is-drawer' : '',
      c.layout === 'inline' ? 'is-inline' : '',
    ].filter(Boolean).join(' ');

    if (c.accent) {
      el.style.setProperty('--bcg-accent', c.accent);
      el.style.setProperty('--bcg-accent-hover', 'color-mix(in srgb, ' + c.accent + ' 82%, #000)');
    }
    Object.keys(c.theme || {}).forEach(function(k) {
      if (c.theme[k]) el.style.setProperty('--bcg-' + k, c.theme[k]);
    });
    if (c.density === 'compact') {
      el.style.setProperty('--bcg-pad',       '12px');
      el.style.setProperty('--bcg-msg-gap',   '7px');
      el.style.setProperty('--bcg-msg-pad-y', '8px');
      el.style.setProperty('--bcg-msg-pad-x', '12px');
      el.style.setProperty('--bcg-msg-fs',    '13.5px');
    } else if (c.density === 'comfy') {
      el.style.setProperty('--bcg-pad',       '20px');
      el.style.setProperty('--bcg-msg-gap',   '14px');
      el.style.setProperty('--bcg-msg-pad-y', '12px');
      el.style.setProperty('--bcg-msg-pad-x', '16px');
      el.style.setProperty('--bcg-msg-fs',    '14.5px');
    }
    if (c.bubbleShape === 'pill')   el.style.setProperty('--bcg-radius-bubble', '22px');
    else if (c.bubbleShape === 'square') el.style.setProperty('--bcg-radius-bubble', '6px');
    else                            el.style.setProperty('--bcg-radius-bubble', '14px');
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  function render() {
    _el.innerHTML = '';
    if (_state.open) _el.appendChild(buildWindow());
    if (_cfg.layout !== 'inline') {
      if (!_state.open && _cfg.showTooltip && !_state.tooltipDismissed) {
        _el.appendChild(buildTooltip());
      }
      _el.appendChild(buildLauncher());
    }
  }

  function buildWindow() {
    var win = mk('div', 'bcg-window');
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', _cfg.botName + ' chat');

    win.appendChild(buildHeader());

    var msgs = mk('div', 'bcg-messages');
    msgs.id = 'bcg-msgs-' + instanceId;
    if (_state.messages.length === 0) msgs.appendChild(buildWelcome());
    _state.messages.forEach(function(m) { msgs.appendChild(buildMessage(m)); });
    if (_state.typing) msgs.appendChild(buildTypingBubble());
    win.appendChild(msgs);

    if (_state.error) {
      var errEl = mk('div', 'bcg-error');
      errEl.textContent = _state.error;
      win.appendChild(errEl);
    }

    if (_cfg.showSuggestions && _state.messages.length === 0 && _cfg.suggestions && _cfg.suggestions.length) {
      win.appendChild(buildChips());
    }

    win.appendChild(buildInput());
    return win;
  }

  function buildHeader() {
    var c = _cfg;
    var hdr = mk('header', 'bcg-header' +
      (c.headerStyle === 'gradient' ? ' is-gradient' :
       c.headerStyle === 'solid'    ? ' is-solid' : ''));

    var av = mk('div', 'bcg-avatar' + (c.logoSrc ? '' : ' is-mono'));
    if (c.logoSrc) {
      var img = document.createElement('img');
      img.src = c.logoSrc; img.alt = c.botName;
      av.appendChild(img);
    } else {
      av.innerHTML = DEFAULT_AVATAR_SVG;
    }
    av.appendChild(mk('span', 'bcg-status-dot'));
    hdr.appendChild(av);

    var txt = mk('div', 'bcg-header-text');
    var title = mk('div', 'bcg-header-title'); title.textContent = c.botName;
    var sub   = mk('div', 'bcg-header-sub');   sub.textContent   = c.tagline;
    txt.appendChild(title); txt.appendChild(sub);
    hdr.appendChild(txt);

    var acts = mk('div', 'bcg-header-actions');
    if (_state.messages.length > 0) {
      var rb = mk('button', 'bcg-header-btn');
      rb.setAttribute('aria-label', 'New conversation'); rb.title = 'New conversation';
      rb.innerHTML = SVG.refresh;
      rb.addEventListener('click', handleReset);
      acts.appendChild(rb);
    }
    if (c.layout !== 'inline') {
      var cb = mk('button', 'bcg-header-btn');
      cb.setAttribute('aria-label', 'Close'); cb.innerHTML = SVG.minimize;
      cb.addEventListener('click', function() { setOpen(false); });
      acts.appendChild(cb);
    }
    hdr.appendChild(acts);
    return hdr;
  }

  function buildWelcome() {
    var w = mk('div', 'bcg-welcome');
    var av = mk('div', 'bcg-welcome-avatar');
    if (_cfg.logoSrc) {
      var img = document.createElement('img'); img.src = _cfg.logoSrc; img.alt = '';
      av.appendChild(img);
    } else {
      av.innerHTML = DEFAULT_AVATAR_SVG;
    }
    var t = mk('h3', 'bcg-welcome-title'); t.textContent = _cfg.welcomeTitle;
    var s = mk('p', 'bcg-welcome-sub');   s.textContent = _cfg.welcomeSubtitle;
    w.appendChild(av); w.appendChild(t); w.appendChild(s);
    return w;
  }

  function buildMessage(m) {
    var row = mk('div', 'bcg-msg bcg-msg-' + m.role);
    if (_cfg.showAvatar && m.role === 'bot') row.appendChild(msgAvatar());
    var inner  = mk('div', '');
    var bubble = mk('div', 'bcg-bubble'); bubble.textContent = m.text;
    var time   = mk('div', 'bcg-msg-time'); time.textContent = fmtTime(m.ts);
    inner.appendChild(bubble); inner.appendChild(time);
    row.appendChild(inner);
    return row;
  }

  function buildTypingBubble() {
    var row = mk('div', 'bcg-msg bcg-msg-bot');
    if (_cfg.showAvatar) row.appendChild(msgAvatar());
    var b = mk('div', 'bcg-bubble bcg-typing');
    b.innerHTML = '<span></span><span></span><span></span>';
    row.appendChild(b);
    return row;
  }

  function buildChips() {
    var wrap = mk('div', 'bcg-chips');
    _cfg.suggestions.forEach(function(s) {
      var chip = mk('button', 'bcg-chip'); chip.textContent = s;
      chip.addEventListener('click', function() { sendMessage(s); });
      wrap.appendChild(chip);
    });
    return wrap;
  }

  function buildInput() {
    var form = mk('form', 'bcg-input-wrap');
    var row  = mk('div', 'bcg-input-row');

    var ta = document.createElement('textarea');
    ta.className = 'bcg-input';
    ta.placeholder = 'Type your message…';
    ta.rows = 1;
    ta.setAttribute('aria-label', 'Message input');

    var btn = mk('button', 'bcg-send');
    btn.type = 'submit'; btn.innerHTML = SVG.send;
    btn.setAttribute('aria-label', 'Send'); btn.disabled = true;

    ta.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 96) + 'px';
      btn.disabled = !this.value.trim() || _state.typing;
    });
    ta.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(ta.value); }
    });

    row.appendChild(ta); row.appendChild(btn);
    form.appendChild(row);

    if (_cfg.showPoweredBy && _cfg.poweredBy) {
      var footer = mk('div', 'bcg-footer');
      var a = document.createElement('a');
      a.href = _cfg.poweredByUrl || '#'; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.textContent = _cfg.poweredBy;
      footer.appendChild(a); form.appendChild(footer);
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault(); sendMessage(ta.value);
    });
    return form;
  }

  function buildLauncher() {
    var btn = mk('button', 'bcg-launcher' + (_state.open ? ' is-open' : ''));
    btn.setAttribute('aria-label', _state.open ? 'Close chat' : 'Open chat');

    if (_cfg.launcherIcon === 'logo' && _cfg.logoSrc) {
      var img = document.createElement('img');
      img.src = _cfg.logoSrc; img.alt = ''; img.className = 'bcg-i-logo';
      btn.appendChild(img);
    } else if (_cfg.launcherIcon === 'spark') {
      btn.innerHTML = SVG.spark + SVG.close;
    } else {
      btn.innerHTML = SVG.chat + SVG.close;
    }

    if (!_state.open && _state.unread > 0) {
      var badge = mk('span', 'bcg-launcher-badge'); badge.textContent = _state.unread;
      btn.appendChild(badge);
    }

    btn.addEventListener('click', function() { setOpen(!_state.open); });
    return btn;
  }

  function buildTooltip() {
    var tip = mk('div', 'bcg-tooltip');
    tip.appendChild(document.createTextNode(_cfg.tooltipText));
    var x = mk('button', 'bcg-tooltip-x');
    x.setAttribute('aria-label', 'Dismiss'); x.innerHTML = SVG.xSmall;
    x.addEventListener('click', function(e) {
      e.stopPropagation(); _state.tooltipDismissed = true; render();
    });
    tip.appendChild(x);
    return tip;
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  function mk(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  function msgAvatar() {
    var av = mk('div', 'bcg-msg-avatar' + (_cfg.logoSrc ? '' : ' is-mono'));
    if (_cfg.logoSrc) {
      var img = document.createElement('img'); img.src = _cfg.logoSrc; img.alt = '';
      av.appendChild(img);
    } else {
      av.innerHTML = DEFAULT_AVATAR_SVG;
    }
    return av;
  }

  function initials(name) {
    return (name || '').split(' ').slice(0, 2).map(function(s) { return s[0] || ''; }).join('').toUpperCase() || 'B';
  }

  function fmtTime(ts) {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function newSessionId() {
    return 'sess_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  var instanceId = Math.random().toString(36).slice(2, 7);

  function scrollBottom() {
    var msgs = document.getElementById('bcg-msgs-' + instanceId);
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  // ── Actions ────────────────────────────────────────────────────────────────
  function setOpen(val) {
    _state.open = val;
    if (val) { _state.unread = 0; }
    render();
    if (val) {
      setTimeout(function() {
        var ta = _el.querySelector('.bcg-input');
        if (ta) ta.focus();
        scrollBottom();
      }, 50);
    }
  }

  function handleReset() {
    _state.messages = []; _state.error = '';
    _state.sessionId = newSessionId();
    render();
  }

  async function sendMessage(text) {
    var trimmed = (text || '').trim();
    if (!trimmed || _state.typing) return;

    _state.messages.push({ role: 'user', text: trimmed, ts: Date.now() });
    _state.error = '';
    _state.typing = true;
    render(); scrollBottom();

    try {
      var reply;
      if (_cfg.webhookUrl && _cfg.webhookUrl.startsWith('http')) {
        var resp = await fetch(_cfg.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action:    'sendMessage',
            sessionId: _state.sessionId,
            chatInput: trimmed,
          }),
        });
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        var data = await resp.json();
        reply = data.output || data.text || data.message || data.response ||
          (typeof data === 'string' ? data : JSON.stringify(data));
      } else {
        reply = await mockReply(trimmed);
      }
      await delay(350);
      _state.messages.push({ role: 'bot', text: reply, ts: Date.now() });
      if (!_state.open) _state.unread++;
    } catch (err) {
      console.warn('[BoostraChat] send failed:', err);
      _state.error = "Couldn't reach the server. Please check your webhook URL and try again.";
    } finally {
      _state.typing = false;
      render(); scrollBottom();
    }
  }

  async function mockReply(text) {
    await delay(600 + Math.random() * 400);
    var lower = text.toLowerCase();
    for (var i = 0; i < DEFAULT_REPLIES.length; i++) {
      var p = DEFAULT_REPLIES[i][0], r = DEFAULT_REPLIES[i][1];
      if (p.test ? p.test(lower) : lower.includes(p)) {
        return typeof r === 'function' ? r(text) : r;
      }
    }
    return "Thanks for your message! A member of our team will be in touch shortly.";
  }

  function delay(ms) { return new Promise(function(res) { setTimeout(res, ms); }); }

  // ── Boot ───────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { init(); });
  } else {
    init();
  }

  // Public API
  window.BoostraChat = {
    init:        init,
    open:        function() { setOpen(true); },
    close:       function() { setOpen(false); },
    toggle:      function() { setOpen(!_state.open); },
    reset:       handleReset,
    sendMessage: sendMessage,
    getConfig:   function() { return _cfg; },
  };

})();
