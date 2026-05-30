/**
 * NATURÉA — Complete Auth + Inquiry + Email + Admin System v3
 * - Fixes product page Login/Signup showing after login
 * - EmailJS integration for real email notifications
 * - Admin panel to manage all inquiries
 * - localStorage as database (no server needed for GitHub Pages)
 */
(function () {
  'use strict';

  /* ═══════════════════════════════════════
     CONFIG — Fill these in
  ═══════════════════════════════════════ */
  const CONFIG = {
    // ── EmailJS (free tier, 200 emails/month) ──
    // Sign up at https://emailjs.com → get these 3 values
    EMAILJS_PUBLIC_KEY: 'STXWDF3PRoosbvX8P',   // Account > API Keys
    EMAILJS_SERVICE_ID: 'service_f2l9kif',            // Email Services tab
    EMAILJS_TEMPLATE_INQUIRY: 'template_79bvv6e',     // Email Templates tab
    EMAILJS_TEMPLATE_CONFIRM: 'template_tccti3p', // confirmation to user

    // ── Admin ──
    ADMIN_EMAIL: 'deveshsawant564@gmail.com',  // ← your email
    ADMIN_PASSWORD: 'Naturea@2005',       // ← change this!
  };

  /* ═══════════════════════════════════════
     INJECT EMAILJS SDK
  ═══════════════════════════════════════ */
  function loadEmailJS() {
    if (window.emailjs) return Promise.resolve();
    return new Promise(resolve => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      s.onload = () => { emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY); resolve(); };
      document.head.appendChild(s);
    });
  }
  loadEmailJS();

  /* ═══════════════════════════════════════
     CSS
  ═══════════════════════════════════════ */
  const CSS = `
/* ── Overlay / Modal ── */
.na-overlay{position:fixed;inset:0;z-index:99000;background:rgba(10,8,5,.75);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:1rem;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}
.na-overlay.show{opacity:1;visibility:visible}
.na-modal{background:#fff;width:100%;max-width:460px;border-radius:18px;overflow:hidden;transform:translateY(24px) scale(.97);transition:transform .35s cubic-bezier(.22,.68,0,1.2);box-shadow:0 40px 100px rgba(0,0,0,.3)}
.na-overlay.show .na-modal{transform:none}
.na-head{padding:1.6rem 2rem 1rem;border-bottom:1px solid #f0e8d8;display:flex;align-items:center;justify-content:space-between}
.na-logo{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:600;color:#181818;letter-spacing:.04em}
.na-logo span{color:#9A7B2F}
.na-x{width:30px;height:30px;border-radius:50%;border:none;background:#f5f0e8;color:#9A7B2F;font-size:.95rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s}
.na-x:hover{background:#e8dfc8}
.na-tabs{display:flex;border-bottom:1px solid #f0e8d8}
.na-tab{flex:1;padding:.8rem;font-family:'Syne',sans-serif;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:none;border:none;color:#9A9080;cursor:pointer;transition:all .2s;border-bottom:2px solid transparent;position:relative;top:1px}
.na-tab.on{color:#9A7B2F;border-bottom-color:#9A7B2F}
.na-body{padding:1.8rem 2rem 2rem}
.na-title{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:#181818;margin-bottom:.3rem}
.na-title em{font-style:italic;color:#B8962A}
.na-sub{font-family:'DM Sans',sans-serif;font-size:.82rem;color:#6B6457;line-height:1.65;margin-bottom:1.4rem}
.na-form{display:flex;flex-direction:column;gap:.8rem}
.na-fl{font-family:'Syne',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#6B6457;display:block;margin-bottom:.28rem}
.na-inp{font-family:'DM Sans',sans-serif;font-size:.88rem;color:#181818;background:#F8F4EE;border:1.5px solid rgba(154,123,47,.2);padding:.8rem 1rem;border-radius:8px;outline:none;transition:border-color .2s,background .2s;width:100%}
.na-inp:focus{border-color:#9A7B2F;background:#fff}
.na-inp.bad{border-color:#e05555;background:#fff8f8}
.na-er{font-family:'DM Sans',sans-serif;font-size:.73rem;color:#e05555;margin-top:.15rem;display:none}
.na-er.on{display:block}
.na-2col{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
.na-pw{position:relative}
.na-pw .na-inp{padding-right:2.6rem}
.na-eye{position:absolute;right:.8rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#9A9080;font-size:.95rem}
.na-eye:hover{color:#9A7B2F}
.na-fgt{font-family:'DM Sans',sans-serif;font-size:.76rem;color:#9A7B2F;align-self:flex-end;cursor:pointer;margin-top:-.2rem}
.na-fgt:hover{text-decoration:underline}
.na-submit{font-family:'Syne',sans-serif;font-size:.74rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;background:#181818;color:#fff;border:none;padding:.9rem;border-radius:8px;cursor:pointer;transition:background .3s;margin-top:.2rem;display:flex;align-items:center;justify-content:center;gap:.5rem}
.na-submit:hover{background:#9A7B2F}
.na-submit:disabled{background:#ccc;cursor:not-allowed}
.na-spin{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:naspin .6s linear infinite;display:none}
@keyframes naspin{to{transform:rotate(360deg)}}
.na-submit.ld .na-spin{display:block}
.na-or{display:flex;align-items:center;gap:.7rem;font-family:'DM Sans',sans-serif;font-size:.73rem;color:#9A9080}
.na-or::before,.na-or::after{content:'';flex:1;height:1px;background:#f0e8d8}
.na-socials{display:flex;gap:.7rem}
.na-soc{flex:1;font-family:'Syne',sans-serif;font-size:.65rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;background:#F8F4EE;border:1.5px solid rgba(154,123,47,.2);padding:.7rem;border-radius:8px;cursor:pointer;color:#181818;transition:all .22s;display:flex;align-items:center;justify-content:center;gap:.4rem}
.na-soc:hover{border-color:#9A7B2F;background:#fff}
.na-glob-er{font-family:'DM Sans',sans-serif;font-size:.78rem;color:#e05555;text-align:center;display:none;padding:.4rem;background:#fff5f5;border-radius:6px}
.na-glob-er.on{display:block}
.na-ok{text-align:center;padding:.5rem 0;display:none}
.na-ok-ico{font-size:2.8rem;display:block;margin-bottom:.6rem}
.na-ok-title{font-family:'Playfair Display',serif;font-size:1.25rem;font-weight:700;color:#181818;margin-bottom:.35rem}
.na-ok-sub{font-family:'DM Sans',sans-serif;font-size:.83rem;color:#6B6457;line-height:1.65}

/* ── Toast ── */
.na-toast-stack{position:fixed;top:1.1rem;right:1.1rem;z-index:999999;display:flex;flex-direction:column;gap:.45rem;pointer-events:none}
.na-toast{background:#181818;color:#fff;font-family:'DM Sans',sans-serif;font-size:.83rem;padding:.7rem 1.1rem;border-radius:8px;border-left:3px solid #9A7B2F;box-shadow:0 8px 28px rgba(0,0,0,.22);transform:translateX(110%);transition:transform .3s cubic-bezier(.22,.68,0,1.2);display:flex;align-items:center;gap:.55rem;max-width:300px;pointer-events:none}
.na-toast.in{transform:none}
.na-toast.ok{border-left-color:#4CAF50}
.na-toast.err{border-left-color:#e05555}

/* ── Main nav user zone ── */
.na-nav-zone{display:flex;align-items:center;gap:.5rem}
.na-nav-login{font-family:'Syne',sans-serif;font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:none;border:1.5px solid rgba(24,24,24,.25);color:#181818;padding:.46rem .95rem;border-radius:30px;cursor:pointer;transition:all .22s}
.na-nav-login:hover{border-color:#9A7B2F;color:#9A7B2F}
.na-nav-signup{font-family:'Syne',sans-serif;font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:#181818;color:#fff;border:none;padding:.46rem 1.1rem;border-radius:30px;cursor:pointer;transition:background .25s}
.na-nav-signup:hover{background:#9A7B2F}
.na-dd-wrap{position:relative}
.na-user-btn{display:flex;align-items:center;gap:.5rem;font-family:'Syne',sans-serif;font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;background:rgba(154,123,47,.1);color:#9A7B2F;border:1.5px solid rgba(154,123,47,.28);padding:.46rem .95rem;border-radius:30px;cursor:pointer;transition:all .22s}
.na-user-btn:hover{background:rgba(154,123,47,.18)}
.na-avatar{width:24px;height:24px;border-radius:50%;background:#9A7B2F;color:#fff;font-family:'Playfair Display',serif;font-size:.78rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.na-dd{position:absolute;top:calc(100% + .45rem);right:0;background:#fff;border-radius:12px;border:1px solid rgba(154,123,47,.15);box-shadow:0 18px 50px rgba(0,0,0,.14);min-width:210px;overflow:hidden;opacity:0;visibility:hidden;transform:translateY(-6px);transition:all .22s;z-index:99010}
.na-dd-wrap:hover .na-dd,.na-dd-wrap.open .na-dd{opacity:1;visibility:visible;transform:none}
.na-dd-top{padding:.9rem 1.1rem;background:#F8F4EE;border-bottom:1px solid rgba(154,123,47,.1)}
.na-dd-name{font-family:'Playfair Display',serif;font-size:.9rem;font-weight:700;color:#181818}
.na-dd-email{font-family:'DM Sans',sans-serif;font-size:.7rem;color:#9A9080;margin-top:.1rem}
.na-dd-list{padding:.35rem 0}
.na-dd-item{display:flex;align-items:center;gap:.65rem;padding:.6rem 1.1rem;font-family:'DM Sans',sans-serif;font-size:.82rem;color:#2A2A2A;cursor:pointer;transition:background .18s}
.na-dd-item:hover{background:#F8F4EE}
.na-dd-item.red{color:#e05555}
.na-dd-sep{height:1px;background:rgba(154,123,47,.1);margin:.25rem 0}

/* ── Product page nav zone (THE FIX) ── */
.na-pp-zone{display:flex;align-items:center;gap:.45rem}
/* logged-in state */
.na-pp-user{display:flex;align-items:center;gap:.45rem;font-family:'Syne',sans-serif;font-size:.66rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;background:rgba(154,123,47,.1);color:#9A7B2F;border:1.5px solid rgba(154,123,47,.25);padding:.4rem .85rem;border-radius:30px;cursor:pointer;transition:all .22s}
.na-pp-user:hover{background:rgba(154,123,47,.2)}
.na-pp-av{width:21px;height:21px;border-radius:50%;background:#9A7B2F;color:#fff;font-family:'Playfair Display',serif;font-size:.72rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
/* logged-out state */
.na-pp-li{font-family:'Syne',sans-serif;font-size:.66rem;font-weight:600;letter-spacing:.07em;color:#555;background:none;border:none;cursor:pointer;padding:.38rem .7rem;transition:color .2s}
.na-pp-li:hover{color:#9A7B2F}
.na-pp-su{font-family:'Syne',sans-serif;font-size:.66rem;font-weight:700;letter-spacing:.07em;background:#181818;color:#fff;border:none;padding:.38rem .9rem;border-radius:3px;cursor:pointer;transition:background .25s}
.na-pp-su:hover{background:#9A7B2F}

/* ── Inquiries side panel ── */
.na-inq-ov{position:fixed;inset:0;z-index:99500;background:rgba(10,8,5,.72);backdrop-filter:blur(6px);display:flex;justify-content:flex-end;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}
.na-inq-ov.show{opacity:1;visibility:visible}
.na-inq-panel{background:#fff;width:100%;max-width:500px;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .38s cubic-bezier(.22,.68,0,1.2)}
.na-inq-ov.show .na-inq-panel{transform:none}
.na-inq-head{padding:1.4rem 1.7rem;border-bottom:1px solid #f0e8d8;display:flex;align-items:center;justify-content:space-between;background:#F8F4EE;flex-shrink:0}
.na-inq-title{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:700;color:#181818}
.na-inq-sub{font-family:'DM Sans',sans-serif;font-size:.75rem;color:#9A9080;margin-top:.12rem}
.na-inq-body{flex:1;overflow-y:auto;padding:1.4rem 1.7rem}
.na-inq-empty{text-align:center;padding:3rem 1rem}
.na-inq-empty-ico{font-size:2.4rem;display:block;margin-bottom:.7rem}
.na-inq-empty-title{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;color:#2A2A2A;margin-bottom:.35rem}
.na-inq-empty-sub{font-family:'DM Sans',sans-serif;font-size:.82rem;color:#9A9080}
.na-inq-card{border:1px solid rgba(154,123,47,.16);border-radius:10px;padding:1.1rem;margin-bottom:.9rem;transition:box-shadow .22s}
.na-inq-card:hover{box-shadow:0 4px 18px rgba(154,123,47,.1)}
.na-inq-card-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.65rem}
.na-inq-prod{font-family:'Playfair Display',serif;font-size:.92rem;font-weight:700;color:#181818}
.na-status{font-family:'Syne',sans-serif;font-size:.56rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;padding:.22rem .65rem;border-radius:30px}
.na-status.pending{background:#fff3cd;color:#856404}
.na-status.reviewed{background:#d1e7dd;color:#0f5132}
.na-status.contacted{background:#cfe2ff;color:#084298}
.na-inq-row{display:flex;gap:1.2rem;margin-bottom:.45rem;flex-wrap:wrap}
.na-inq-f{display:flex;flex-direction:column;gap:.08rem}
.na-inq-fl{font-family:'Syne',sans-serif;font-size:.55rem;font-weight:700;letter-spacing:.17em;text-transform:uppercase;color:#9A9080}
.na-inq-fv{font-family:'DM Sans',sans-serif;font-size:.8rem;color:#2A2A2A}
.na-inq-ref{font-family:'Syne',sans-serif;font-size:.72rem;font-weight:700;letter-spacing:.09em;color:#9A7B2F}
.na-inq-msg{font-family:'DM Sans',sans-serif;font-size:.8rem;color:#6B6457;line-height:1.6;background:#F8F4EE;padding:.65rem .85rem;border-radius:6px;margin-top:.55rem}
.na-inq-date{font-family:'DM Sans',sans-serif;font-size:.7rem;color:#9A9080;margin-top:.55rem}

/* ── Enhanced Contact Form ── */
.na-cf-prompt{font-family:'DM Sans',sans-serif;font-size:.82rem;color:#6B6457;text-align:center;padding:.75rem;background:#F8F4EE;border-radius:8px;margin-bottom:.9rem}
.na-cf-prompt a{color:#9A7B2F;cursor:pointer;font-weight:600;text-decoration:none}
.na-cf-prompt a:hover{text-decoration:underline}
.na-cf{display:flex;flex-direction:column;gap:.9rem}
.na-cf-row{display:grid;grid-template-columns:1fr 1fr;gap:.9rem}
.na-cf-g{display:flex;flex-direction:column;gap:.28rem}
.na-cf-l{font-family:'Syne',sans-serif;font-size:.59rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#6B6457}
.na-cf-inp,.na-cf-sel,.na-cf-ta{font-family:'DM Sans',sans-serif;font-size:.87rem;color:#181818;background:#fff;border:1.5px solid rgba(154,123,47,.2);padding:.85rem 1rem;border-radius:8px;outline:none;transition:border-color .22s;width:100%}
.na-cf-inp:focus,.na-cf-sel:focus,.na-cf-ta:focus{border-color:#9A7B2F}
.na-cf-inp.bad,.na-cf-sel.bad,.na-cf-ta.bad{border-color:#e05555}
.na-cf-inp::placeholder,.na-cf-ta::placeholder{color:#c0b5a0}
.na-cf-ta{resize:vertical;min-height:105px}
.na-cf-sel{-webkit-appearance:none;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%239A9080' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right .9rem center}
.na-cf-sub{font-family:'Syne',sans-serif;font-size:.74rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;background:#181818;color:#fff;border:none;padding:.9rem 2.4rem;border-radius:8px;cursor:pointer;transition:background .3s;align-self:center;margin-top:.3rem;display:flex;align-items:center;gap:.45rem}
.na-cf-sub:hover{background:#9A7B2F}
.na-cf-sub:disabled{background:#ccc;cursor:not-allowed}
.na-cf-sub .na-spin{display:none}
.na-cf-sub.ld .na-spin{display:block}
.na-cf-sub.ld .na-cf-sub-txt{opacity:.6}
.na-cf-done{text-align:center;padding:2.2rem 1rem;display:none}
.na-cf-done-ico{font-size:2.8rem;display:block;margin-bottom:.7rem}
.na-cf-done-title{font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;color:#181818;margin-bottom:.45rem}
.na-cf-done-sub{font-family:'DM Sans',sans-serif;font-size:.84rem;color:#6B6457;line-height:1.7;margin-bottom:1.1rem}
.na-cf-done-ref{font-family:'Syne',sans-serif;font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;background:#F8F4EE;color:#9A7B2F;padding:.45rem 1.1rem;border-radius:30px;display:inline-block}
.na-cf-again{font-family:'Syne',sans-serif;font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:none;border:1.5px solid rgba(154,123,47,.3);color:#9A7B2F;padding:.6rem 1.4rem;border-radius:8px;cursor:pointer;margin-top:.7rem;transition:all .22s}
.na-cf-again:hover{background:rgba(154,123,47,.07)}

/* ── Admin Panel ── */
.na-admin-ov{position:fixed;inset:0;z-index:99900;background:rgba(10,8,5,.85);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:1rem;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}
.na-admin-ov.show{opacity:1;visibility:visible}
.na-admin-panel{background:#fff;width:100%;max-width:900px;max-height:90vh;border-radius:18px;overflow:hidden;display:flex;flex-direction:column;transform:scale(.96);transition:transform .35s cubic-bezier(.22,.68,0,1.2)}
.na-admin-ov.show .na-admin-panel{transform:none}
.na-admin-head{padding:1.2rem 1.8rem;border-bottom:1px solid #f0e8d8;display:flex;align-items:center;justify-content:space-between;background:#F8F4EE;flex-shrink:0}
.na-admin-title{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:700;color:#181818}
.na-admin-title span{font-size:.75rem;font-weight:400;color:#9A9080;font-family:'DM Sans',sans-serif;margin-left:.5rem}
.na-admin-tabs{display:flex;gap:.5rem;padding:.8rem 1.8rem;border-bottom:1px solid #f0e8d8;background:#fff;flex-shrink:0;overflow-x:auto}
.na-admin-tab{font-family:'Syne',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:#F8F4EE;border:1.5px solid rgba(154,123,47,.18);color:#6B6457;padding:.4rem 1rem;border-radius:30px;cursor:pointer;transition:all .2s;white-space:nowrap}
.na-admin-tab.on{background:#9A7B2F;color:#fff;border-color:#9A7B2F}
.na-admin-body{flex:1;overflow-y:auto;padding:1.2rem 1.8rem}
.na-admin-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:.8rem;margin-bottom:1.4rem}
.na-admin-stat{background:#F8F4EE;border-radius:10px;padding:1rem;text-align:center}
.na-admin-stat-num{font-family:'Playfair Display',serif;font-size:2rem;font-weight:700;color:#9A7B2F;line-height:1}
.na-admin-stat-lbl{font-family:'DM Sans',sans-serif;font-size:.72rem;color:#9A9080;margin-top:.25rem}
.na-admin-table{width:100%;border-collapse:collapse}
.na-admin-table th{font-family:'Syne',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#9A9080;padding:.6rem .8rem;text-align:left;border-bottom:2px solid #f0e8d8;white-space:nowrap}
.na-admin-table td{font-family:'DM Sans',sans-serif;font-size:.8rem;color:#2A2A2A;padding:.7rem .8rem;border-bottom:1px solid #f8f4ee;vertical-align:top}
.na-admin-table tr:hover td{background:#fdf9f4}
.na-admin-sel{font-family:'Syne',sans-serif;font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(154,123,47,.3);border-radius:30px;padding:.2rem .6rem;cursor:pointer;outline:none;background:#fff;color:#181818}
.na-admin-empty{text-align:center;padding:3rem;font-family:'DM Sans',sans-serif;font-size:.88rem;color:#9A9080}
.na-admin-users-grid{display:flex;flex-direction:column;gap:.6rem}
.na-admin-user-row{display:flex;align-items:center;justify-content:space-between;padding:.9rem 1rem;border:1px solid #f0e8d8;border-radius:8px;background:#fdfaf6}
.na-admin-user-name{font-family:'Playfair Display',serif;font-size:.88rem;font-weight:700;color:#181818}
.na-admin-user-email{font-family:'DM Sans',sans-serif;font-size:.75rem;color:#9A9080}
.na-admin-user-meta{font-family:'DM Sans',sans-serif;font-size:.72rem;color:#9A7B2F}
.na-email-badge{font-family:'Syne',sans-serif;font-size:.55rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.18rem .5rem;border-radius:30px;background:#F8F4EE;color:#9A7B2F;margin-left:.4rem}

@media(max-width:640px){
  .na-overlay{align-items:flex-end}
  .na-modal{border-radius:18px 18px 0 0;max-height:92vh;overflow-y:auto}
  .na-2col,.na-cf-row{grid-template-columns:1fr}
  .na-inq-panel{max-width:100%}
  .na-admin-panel{max-height:98vh;border-radius:12px 12px 0 0}
  .na-admin-stats{grid-template-columns:repeat(2,1fr)}
  .na-admin-table th:nth-child(n+4),.na-admin-table td:nth-child(n+4){display:none}
}
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  /* ═══════════════════════════════════════
     DATABASE
  ═══════════════════════════════════════ */
  const DB = {
    get users() { try { return JSON.parse(localStorage.getItem('na_users') || '[]') } catch { return [] } },
    set users(v) { localStorage.setItem('na_users', JSON.stringify(v)) },
    get session() { try { return JSON.parse(localStorage.getItem('na_session') || 'null') } catch { return null } },
    set session(v) { if (v) localStorage.setItem('na_session', JSON.stringify(v)); else localStorage.removeItem('na_session') },
    get inquiries() { try { return JSON.parse(localStorage.getItem('na_inquiries') || '[]') } catch { return [] } },
    set inquiries(v) { localStorage.setItem('na_inquiries', JSON.stringify(v)) },

    addUser(u) {
      const list = this.users;
      if (list.find(x => x.email.toLowerCase() === u.email.toLowerCase())) return false;
      list.push({ ...u, id: 'U' + Date.now(), joinedAt: new Date().toISOString() });
      this.users = list; return true;
    },
    findUser(email, pw) {
      return this.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === pw) || null;
    },
    addInquiry(inq) {
      const list = this.inquiries;
      const item = { ...inq, id: 'INQ-' + Math.random().toString(36).substr(2, 6).toUpperCase(), createdAt: new Date().toISOString(), status: 'pending' };
      list.unshift(item); this.inquiries = list; return item;
    },
    updateInquiryStatus(id, status) {
      const list = this.inquiries;
      const i = list.find(x => x.id === id);
      if (i) { i.status = status; this.inquiries = list; }
    },
    userInquiries(email) { return this.inquiries.filter(i => i.email.toLowerCase() === email.toLowerCase()) }
  };

  /* ═══════════════════════════════════════
     TOAST
  ═══════════════════════════════════════ */
  const toastStack = document.createElement('div');
  toastStack.className = 'na-toast-stack';
  document.body.appendChild(toastStack);
  function toast(msg, type = 'info', icon = '🌿') {
    const t = document.createElement('div');
    t.className = `na-toast ${type}`;
    t.innerHTML = `<span>${icon}</span>${msg}`;
    toastStack.appendChild(t);
    requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('in')));
    setTimeout(() => { t.classList.remove('in'); setTimeout(() => t.remove(), 350) }, 3500);
  }

  /* ═══════════════════════════════════════
     EMAIL SENDING via EmailJS
  ═══════════════════════════════════════ */
  async function sendEmails(inq) {
    const isConfigured = !CONFIG.EMAILJS_PUBLIC_KEY.startsWith('YOUR_');
    if (!isConfigured) {
      console.info('[Naturéa] EmailJS not configured yet. Inquiry saved to localStorage.');
      return;
    }
    try {
      await loadEmailJS();
      // Email to admin
      await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_INQUIRY, {
        to_email: CONFIG.ADMIN_EMAIL,
        ref_id: inq.id,
        customer_name: inq.name,
        customer_email: inq.email,
        customer_company: inq.company || 'Not provided',
        customer_phone: inq.phone || 'Not provided',
        product: inq.product,
        quantity: inq.quantity || 'Not specified',
        use_for: inq.useFor || 'Not specified',
        message: inq.message,
        submitted_at: new Date(inq.createdAt).toLocaleString('en-IN'),
      });
      // Confirmation to user
      await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_CONFIRM, {
        to_email: inq.email,
        to_name: inq.name,
        ref_id: inq.id,
        product: inq.product,
      });
    } catch (err) {
      console.warn('[Naturéa] EmailJS error:', err);
    }
  }

  /* ═══════════════════════════════════════
     AUTH MODAL
  ═══════════════════════════════════════ */
  document.body.insertAdjacentHTML('beforeend', `
  <div class="na-overlay" id="naOv">
    <div class="na-modal" role="dialog" aria-modal="true">
      <div class="na-head">
        <div class="na-logo">🌿 Natur<span>éa</span></div>
        <button class="na-x" id="naX">✕</button>
      </div>
      <div class="na-tabs">
        <button class="na-tab on" data-tab="login">Login</button>
        <button class="na-tab" data-tab="signup">Create Account</button>
      </div>

      <!-- LOGIN -->
      <div class="na-body" id="naLogin">
        <h2 class="na-title">Welcome <em>Back</em></h2>
        <p class="na-sub">Sign in to track your inquiries and manage your account.</p>
        <form class="na-form" id="naLoginForm" novalidate>
          <div><label class="na-fl" for="liEmail">Email Address</label>
            <input class="na-inp" id="liEmail" type="email" placeholder="you@company.com" autocomplete="email">
            <div class="na-er" id="liEmailEr">Enter a valid email.</div></div>
          <div><label class="na-fl" for="liPw">Password</label>
            <div class="na-pw"><input class="na-inp" id="liPw" type="password" placeholder="Your password" autocomplete="current-password">
            <button type="button" class="na-eye" data-t="liPw">👁</button></div>
            <div class="na-er" id="liPwEr">Enter your password.</div></div>
          <span class="na-fgt" id="naFgt">Forgot password?</span>
          <div class="na-glob-er" id="liGlobEr"></div>
          <button type="submit" class="na-submit" id="liBt"><div class="na-spin"></div><span>Sign In →</span></button>
          <div class="na-or">or continue with</div>
          <div class="na-socials">
            <button type="button" class="na-soc" id="naGLi">🇬 Google</button>
            <button type="button" class="na-soc" id="naLiLi">💼 LinkedIn</button>
          </div>
        </form>
      </div>

      <!-- SIGNUP -->
      <div class="na-body" id="naSignup" style="display:none">
        <h2 class="na-title">Create <em>Account</em></h2>
        <p class="na-sub">Join Naturéa to request samples and track inquiries.</p>
        <form class="na-form" id="naSignupForm" novalidate>
          <div class="na-2col">
            <div><label class="na-fl" for="suFi">First Name</label>
              <input class="na-inp" id="suFi" type="text" placeholder="First" autocomplete="given-name">
              <div class="na-er" id="suFiEr">Required.</div></div>
            <div><label class="na-fl" for="suLa">Last Name</label>
              <input class="na-inp" id="suLa" type="text" placeholder="Last" autocomplete="family-name">
              <div class="na-er" id="suLaEr">Required.</div></div>
          </div>
          <div><label class="na-fl" for="suEm">Business Email</label>
            <input class="na-inp" id="suEm" type="email" placeholder="you@company.com" autocomplete="email">
            <div class="na-er" id="suEmEr">Enter a valid email.</div></div>
          <div><label class="na-fl" for="suCo">Company / Brand</label>
            <input class="na-inp" id="suCo" type="text" placeholder="Your company name"></div>
          <div><label class="na-fl" for="suPw">Password</label>
            <div class="na-pw"><input class="na-inp" id="suPw" type="password" placeholder="Min. 8 characters" autocomplete="new-password">
            <button type="button" class="na-eye" data-t="suPw">👁</button></div>
            <div class="na-er" id="suPwEr">Min. 8 characters required.</div></div>
          <div><label class="na-fl" for="suPw2">Confirm Password</label>
            <div class="na-pw"><input class="na-inp" id="suPw2" type="password" placeholder="Repeat password" autocomplete="new-password">
            <button type="button" class="na-eye" data-t="suPw2">👁</button></div>
            <div class="na-er" id="suPw2Er">Passwords do not match.</div></div>
          <div class="na-glob-er" id="suGlobEr"></div>
          <button type="submit" class="na-submit" id="suBt"><div class="na-spin"></div><span>Create Account →</span></button>
          <div class="na-or">or continue with</div>
          <div class="na-socials">
            <button type="button" class="na-soc" id="naGSu">🇬 Google</button>
            <button type="button" class="na-soc" id="naLiSu">💼 LinkedIn</button>
          </div>
        </form>
        <div class="na-ok" id="suOk">
          <span class="na-ok-ico">🎉</span>
          <div class="na-ok-title">Account Created!</div>
          <p class="na-ok-sub">Welcome to Naturéa. You're now signed in.</p>
        </div>
      </div>
    </div>
  </div>`);

  function openAuth(tab = 'login') {
    const ov = document.getElementById('naOv');
    ov.style.display = 'flex';
    requestAnimationFrame(() => ov.classList.add('show'));
    switchTab(tab);
    setTimeout(() => (tab === 'login' ? document.getElementById('liEmail') : document.getElementById('suFi'))?.focus(), 320);
  }
  window.openAuth = openAuth;

  function closeAuth() {
    const ov = document.getElementById('naOv');
    ov.classList.remove('show');
    setTimeout(() => ov.style.display = 'none', 320);
  }

  function switchTab(t) {
    document.querySelectorAll('.na-tab').forEach(x => x.classList.toggle('on', x.dataset.tab === t));
    document.getElementById('naLogin').style.display = t === 'login' ? 'block' : 'none';
    document.getElementById('naSignup').style.display = t === 'signup' ? 'block' : 'none';
  }

  document.querySelectorAll('.na-tab').forEach(t => t.addEventListener('click', () => switchTab(t.dataset.tab)));
  document.getElementById('naX').onclick = closeAuth;
  document.getElementById('naOv').addEventListener('click', e => { if (e.target === e.currentTarget) closeAuth() });
  document.querySelectorAll('.na-eye').forEach(b => b.addEventListener('click', () => {
    const inp = document.getElementById(b.dataset.t);
    if (inp) { inp.type = inp.type === 'password' ? 'text' : 'password'; b.textContent = inp.type === 'password' ? '👁' : '🙈'; }
  }));
  document.getElementById('naFgt').onclick = () => toast('Password reset email sent! (demo)', 'ok', '📧');

  function setFV(id, eid, bad) {
    document.getElementById(id)?.classList.toggle('bad', bad);
    document.getElementById(eid)?.classList.toggle('on', bad);
  }

  /* Login */
  document.getElementById('naLoginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const em = document.getElementById('liEmail').value.trim();
    const pw = document.getElementById('liPw').value;
    let ok = true;
    const ve = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    setFV('liEmail', 'liEmailEr', !ve); if (!ve) ok = false;
    setFV('liPw', 'liPwEr', !pw); if (!pw) ok = false;
    if (!ok) return;
    const btn = document.getElementById('liBt');
    btn.classList.add('ld'); btn.disabled = true;
    setTimeout(() => {
      const user = DB.findUser(em, pw);
      if (user) {
        DB.session = { firstName: user.firstName, lastName: user.lastName, email: user.email, company: user.company || '' };
        closeAuth(); onSession();
        toast(`Welcome back, ${user.firstName}! 🌿`, 'ok', '✅');
      } else {
        const ge = document.getElementById('liGlobEr');
        ge.textContent = 'Incorrect email or password. Please try again.'; ge.classList.add('on');
        btn.classList.remove('ld'); btn.disabled = false;
      }
    }, 900);
  });

  /* Signup */
  document.getElementById('naSignupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const fi = document.getElementById('suFi').value.trim();
    const la = document.getElementById('suLa').value.trim();
    const em = document.getElementById('suEm').value.trim();
    const co = document.getElementById('suCo').value.trim();
    const pw = document.getElementById('suPw').value;
    const pw2 = document.getElementById('suPw2').value;
    let ok = true;
    setFV('suFi', 'suFiEr', !fi); if (!fi) ok = false;
    setFV('suLa', 'suLaEr', !la); if (!la) ok = false;
    const ve = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    setFV('suEm', 'suEmEr', !ve); if (!ve) ok = false;
    setFV('suPw', 'suPwEr', pw.length < 8); if (pw.length < 8) ok = false;
    setFV('suPw2', 'suPw2Er', pw !== pw2); if (pw !== pw2) ok = false;
    if (!ok) return;
    const btn = document.getElementById('suBt');
    btn.classList.add('ld'); btn.disabled = true;
    setTimeout(() => {
      const added = DB.addUser({ firstName: fi, lastName: la, email: em, company: co, password: pw });
      if (added) {
        DB.session = { firstName: fi, lastName: la, email: em, company: co };
        document.getElementById('naSignupForm').style.display = 'none';
        document.getElementById('suOk').style.display = 'block';
        setTimeout(() => { closeAuth(); onSession(); toast(`Account created! Welcome, ${fi} 🎉`, 'ok', '✅'); }, 2000);
      } else {
        const ge = document.getElementById('suGlobEr');
        ge.textContent = 'An account with this email already exists.'; ge.classList.add('on');
        btn.classList.remove('ld'); btn.disabled = false;
      }
    }, 1000);
  });

  /* Social mock */
  function googleMock(mode) {
    const pool = [['Alex', 'Sharma'], ['Jordan', 'Patel'], ['Morgan', 'Lee'], ['Taylor', 'Chen'], ['Casey', 'Kumar']];
    const [fi, la] = pool[Math.floor(Math.random() * pool.length)];
    const em = `${fi.toLowerCase()}.${la.toLowerCase()}@gmail.com`;
    if (mode === 'signup') DB.addUser({ firstName: fi, lastName: la, email: em, company: '', password: '__google__' });
    DB.session = { firstName: fi, lastName: la, email: em, company: '' };
    closeAuth(); onSession();
    toast(`Signed in with Google as ${fi}`, 'ok', '✅');
  }
  document.getElementById('naGLi').onclick = () => googleMock('login');
  document.getElementById('naGSu').onclick = () => googleMock('signup');
  document.getElementById('naLiLi').onclick = () => toast('LinkedIn OAuth coming soon!', 'info', '💼');
  document.getElementById('naLiSu').onclick = () => toast('LinkedIn OAuth coming soon!', 'info', '💼');

  /* ═══════════════════════════════════════
     LOGOUT
  ═══════════════════════════════════════ */
  window.naLogout = function () { DB.session = null; onSession(); toast('Signed out. See you soon! 👋', 'info', '🌿'); };

  /* ═══════════════════════════════════════
     INQUIRIES PANEL
  ═══════════════════════════════════════ */
  document.body.insertAdjacentHTML('beforeend', `
  <div class="na-inq-ov" id="naInqOv">
    <div class="na-inq-panel">
      <div class="na-inq-head">
        <div>
          <div class="na-inq-title">My Inquiries</div>
          <div class="na-inq-sub">Track your sample requests and product inquiries</div>
        </div>
        <button class="na-x" id="naInqX">✕</button>
      </div>
      <div class="na-inq-body" id="naInqBody"></div>
    </div>
  </div>`);

  window.openInqPanel = function () {
    const s = DB.session;
    if (!s) { openAuth('login'); return; }
    renderInq(s.email);
    const ov = document.getElementById('naInqOv');
    ov.style.display = 'flex';
    requestAnimationFrame(() => ov.classList.add('show'));
  };
  function closeInqPanel() {
    const ov = document.getElementById('naInqOv');
    ov.classList.remove('show');
    setTimeout(() => ov.style.display = 'none', 380);
  }
  document.getElementById('naInqX').onclick = closeInqPanel;
  document.getElementById('naInqOv').addEventListener('click', e => { if (e.target === e.currentTarget) closeInqPanel() });

  function renderInq(email) {
    const body = document.getElementById('naInqBody');
    body.innerHTML = '';
    const list = DB.userInquiries(email);
    if (!list.length) {
      body.innerHTML = `<div class="na-inq-empty"><span class="na-inq-empty-ico">📬</span><div class="na-inq-empty-title">No inquiries yet</div><div class="na-inq-empty-sub">Submit a product inquiry from the Contact section below.</div></div>`;
      return;
    }
    const lbl = { pending: 'Pending Review', reviewed: 'Under Review', contacted: 'Contacted' };
    list.forEach(inq => {
      const d = new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      const card = document.createElement('div');
      card.className = 'na-inq-card';
      card.innerHTML = `
        <div class="na-inq-card-top">
          <div class="na-inq-prod">🌿 ${inq.product || 'General Inquiry'}</div>
          <span class="na-status ${inq.status || 'pending'}">${lbl[inq.status] || 'Pending Review'}</span>
        </div>
        <div class="na-inq-row">
          <div class="na-inq-f"><div class="na-inq-fl">Reference</div><div class="na-inq-ref">${inq.id}</div></div>
          <div class="na-inq-f"><div class="na-inq-fl">Company</div><div class="na-inq-fv">${inq.company || '—'}</div></div>
          <div class="na-inq-f"><div class="na-inq-fl">Quantity</div><div class="na-inq-fv">${inq.quantity || '—'}</div></div>
        </div>
        ${inq.message ? `<div class="na-inq-msg">"${inq.message}"</div>` : ''}
        <div class="na-inq-date">📅 ${d}</div>`;
      body.appendChild(card);
    });
  }

  /* ═══════════════════════════════════════
     ADMIN PANEL
  ═══════════════════════════════════════ */
  document.body.insertAdjacentHTML('beforeend', `
  <div class="na-admin-ov" id="naAdminOv">
    <div class="na-admin-panel">
      <div class="na-admin-head">
        <div>
          <span class="na-admin-title">Naturéa Admin <span>— Inquiry Management</span></span>
        </div>
        <button class="na-x" id="naAdminX">✕</button>
      </div>
      <div class="na-admin-tabs">
        <button class="na-admin-tab on" data-at="dashboard">📊 Dashboard</button>
        <button class="na-admin-tab" data-at="inquiries">📬 All Inquiries</button>
        <button class="na-admin-tab" data-at="users">👥 Users</button>
      </div>
      <div class="na-admin-body" id="naAdminBody"></div>
    </div>
  </div>`);

  let adminAuthed = false;
  window.openAdmin = function () {
    if (!adminAuthed) {
      const pw = prompt('Admin Password:');
      if (pw !== CONFIG.ADMIN_PASSWORD) { toast('Incorrect admin password.', 'err', '🔒'); return; }
      adminAuthed = true;
    }
    renderAdmin('dashboard');
    const ov = document.getElementById('naAdminOv');
    ov.style.display = 'flex';
    requestAnimationFrame(() => ov.classList.add('show'));
  };

  document.getElementById('naAdminX').onclick = () => {
    const ov = document.getElementById('naAdminOv');
    ov.classList.remove('show');
    setTimeout(() => ov.style.display = 'none', 350);
  };
  document.getElementById('naAdminOv').addEventListener('click', e => { if (e.target === e.currentTarget) { const ov = document.getElementById('naAdminOv'); ov.classList.remove('show'); setTimeout(() => ov.style.display = 'none', 350); } });
  document.querySelectorAll('.na-admin-tab').forEach(t => t.addEventListener('click', () => {
    document.querySelectorAll('.na-admin-tab').forEach(x => x.classList.remove('on'));
    t.classList.add('on');
    renderAdmin(t.dataset.at);
  }));

  function renderAdmin(view) {
    const body = document.getElementById('naAdminBody');
    const inqs = DB.inquiries;
    const users = DB.users;

    if (view === 'dashboard') {
      const pending = inqs.filter(i => i.status === 'pending').length;
      const reviewed = inqs.filter(i => i.status === 'reviewed').length;
      const contacted = inqs.filter(i => i.status === 'contacted').length;
      body.innerHTML = `
        <div class="na-admin-stats">
          <div class="na-admin-stat"><div class="na-admin-stat-num">${inqs.length}</div><div class="na-admin-stat-lbl">Total Inquiries</div></div>
          <div class="na-admin-stat"><div class="na-admin-stat-num" style="color:#856404">${pending}</div><div class="na-admin-stat-lbl">Pending</div></div>
          <div class="na-admin-stat"><div class="na-admin-stat-num" style="color:#0f5132">${reviewed}</div><div class="na-admin-stat-lbl">Under Review</div></div>
          <div class="na-admin-stat"><div class="na-admin-stat-num" style="color:#084298">${contacted}</div><div class="na-admin-stat-lbl">Contacted</div></div>
        </div>
        <div class="na-admin-stat" style="margin-bottom:1rem;border-radius:10px;padding:1rem;background:#F8F4EE;display:flex;align-items:center;justify-content:space-between">
          <div><div style="font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;color:#181818">Registered Users</div><div style="font-family:'DM Sans',sans-serif;font-size:.78rem;color:#9A9080;margin-top:.1rem">${users.length} account${users.length !== 1 ? 's' : ''}</div></div>
          <div style="font-family:'Playfair Display',serif;font-size:2rem;font-weight:700;color:#9A7B2F">${users.length}</div>
        </div>
        <div style="font-family:'Syne',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#9A9080;margin-bottom:.7rem">Recent Inquiries</div>
        ${renderInqTable(inqs.slice(0, 8))}`;
    } else if (view === 'inquiries') {
      body.innerHTML = `
        <div style="margin-bottom:1rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem">
          <div style="font-family:'Syne',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#9A9080">${inqs.length} total inquiries</div>
          <button onclick="exportCSV()" style="font-family:'Syne',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:#9A7B2F;color:#fff;border:none;padding:.42rem 1rem;border-radius:6px;cursor:pointer">⬇ Export CSV</button>
        </div>
        ${renderInqTable(inqs)}`;
    } else if (view === 'users') {
      body.innerHTML = `
        <div style="font-family:'Syne',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#9A9080;margin-bottom:.8rem">${users.length} registered users</div>
        <div class="na-admin-users-grid">
          ${users.length === 0 ? '<div class="na-admin-empty">No registered users yet.</div>' : users.map(u => `
            <div class="na-admin-user-row">
              <div>
                <div class="na-admin-user-name">${u.firstName} ${u.lastName || ''}</div>
                <div class="na-admin-user-email">${u.email} ${u.company ? `<span class="na-email-badge">${u.company}</span>` : ''}</div>
              </div>
              <div class="na-admin-user-meta">${DB.userInquiries(u.email).length} inquir${DB.userInquiries(u.email).length === 1 ? 'y' : 'ies'}</div>
            </div>`).join('')}
        </div>`;
    }
  }

  function renderInqTable(list) {
    if (!list.length) return '<div class="na-admin-empty">No inquiries yet.</div>';
    return `<div style="overflow-x:auto"><table class="na-admin-table">
      <thead><tr><th>Ref ID</th><th>Name</th><th>Email</th><th>Product</th><th>Qty</th><th>Date</th><th>Status</th></tr></thead>
      <tbody>${list.map(inq => {
      const d = new Date(inq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      return `<tr>
          <td style="font-family:'Syne',sans-serif;font-size:.7rem;font-weight:700;color:#9A7B2F;white-space:nowrap">${inq.id}</td>
          <td>${inq.name || '—'}</td>
          <td style="font-size:.75rem">${inq.email}</td>
          <td>${inq.product || '—'}</td>
          <td style="font-size:.75rem">${inq.quantity || '—'}</td>
          <td style="font-size:.72rem;white-space:nowrap">${d}</td>
          <td>
            <select class="na-admin-sel" onchange="updateStatus('${inq.id}',this.value)">
              <option value="pending" ${inq.status === 'pending' ? 'selected' : ''}>⏳ Pending</option>
              <option value="reviewed" ${inq.status === 'reviewed' ? 'selected' : ''}>🔍 Reviewing</option>
              <option value="contacted" ${inq.status === 'contacted' ? 'selected' : ''}>✅ Contacted</option>
            </select>
          </td>
        </tr>`;
    }).join('')}</tbody></table></div>`;
  }

  window.updateStatus = function (id, status) {
    DB.updateInquiryStatus(id, status);
    toast(`Status updated to "${status}"`, 'ok', '✅');
    const curTab = document.querySelector('.na-admin-tab.on')?.dataset.at || 'inquiries';
    renderAdmin(curTab);
  };

  window.exportCSV = function () {
    const rows = [['Ref ID', 'Name', 'Email', 'Company', 'Phone', 'Product', 'Quantity', 'Use For', 'Message', 'Status', 'Date']];
    DB.inquiries.forEach(i => rows.push([i.id, i.name, i.email, i.company || '', i.phone || '', i.product, i.quantity || '', i.useFor || '', (i.message || '').replace(/,/g, ';'), i.status, new Date(i.createdAt).toLocaleString('en-IN')]));
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = `naturea-inquiries-${Date.now()}.csv`;
    a.click();
  };

  /* ═══════════════════════════════════════
     CONTACT FORM REPLACEMENT
  ═══════════════════════════════════════ */
  function buildContactForm() {
    console.log("buildContactForm called");
    const sec = document.getElementById('contact');
    if (!sec) return;
    const s = DB.session;
    const prompt = s ? '' : `<div class="na-cf-prompt">💡 <a onclick="openAuth('login')">Sign in</a> or <a onclick="openAuth('signup')">create an account</a> to auto-track your inquiries.</div>`;
    sec.innerHTML = `
    <div id="naCFWrap">
      ${prompt}
      <form class="na-cf" id="naCF" novalidate>
        <div class="na-cf-row">
          <div class="na-cf-g"><label class="na-cf-l" for="cfName">Full Name *</label><input class="na-cf-inp" id="cfName" type="text" placeholder="Your full name" value="${s ? (s.firstName + ' ' + (s.lastName || '')).trim() : ''}"></div>
          <div class="na-cf-g"><label class="na-cf-l" for="cfEmail">Email Address *</label><input class="na-cf-inp" id="cfEmail" type="email" placeholder="you@company.com" value="${s ? s.email : ''}"></div>
        </div>
        <div class="na-cf-row">
          <div class="na-cf-g"><label class="na-cf-l" for="cfCo">Company / Brand</label><input class="na-cf-inp" id="cfCo" type="text" placeholder="Your company" value="${s && s.company ? s.company : ''}"></div>
          <div class="na-cf-g"><label class="na-cf-l" for="cfPh">Phone Number</label><input class="na-cf-inp" id="cfPh" type="tel" placeholder="+91 98765 43210"></div>
        </div>
        <div class="na-cf-row">
          <div class="na-cf-g"><label class="na-cf-l" for="cfProd">Product of Interest *</label>
            <select class="na-cf-sel" id="cfProd">
              <option value="" disabled selected>Select a product</option>
              <option>Chitosan</option><option>Mango Butter</option><option>Kokum Butter</option><option>All Products</option><option>Custom Blend</option>
            </select></div>
          <div class="na-cf-g"><label class="na-cf-l" for="cfQty">Estimated Quantity</label>
            <select class="na-cf-sel" id="cfQty">
              <option value="" disabled selected>Select quantity</option>
              <option>Sample (100g – 500g)</option><option>Small (1 kg – 10 kg)</option><option>Medium (10 kg – 100 kg)</option><option>Large (100 kg – 1 MT)</option><option>Bulk (1 MT+)</option>
            </select></div>
        </div>
        <div class="na-cf-g"><label class="na-cf-l" for="cfUse">Intended Use / Application</label><input class="na-cf-inp" id="cfUse" type="text" placeholder="e.g. Skincare cream, shampoo formulation..."></div>
        <div class="na-cf-g"><label class="na-cf-l" for="cfMsg">Message / Requirements *</label><textarea class="na-cf-ta" id="cfMsg" placeholder="Tell us about your requirements, certifications needed, delivery timeline..."></textarea></div>
        <button type="submit" class="na-cf-sub" id="naCFSub"><div class="na-spin"></div><span class="na-cf-sub-txt">Send Inquiry →</span></button>
      </form>
      <div class="na-cf-done" id="naCFDone">
        <span class="na-cf-done-ico">✅</span>
        <div class="na-cf-done-title">Inquiry Submitted!</div>
        <p class="na-cf-done-sub">Thank you! Our team will review your inquiry and contact you within <strong>24–48 business hours</strong>. A confirmation has been sent to your email.</p>
        <div class="na-cf-done-ref" id="naCFRef">REF: —</div><br>
        <button class="na-cf-again" onclick="buildContactForm()">Submit Another Inquiry</button>
      </div>
    </div>`;
    document.getElementById('naCF')?.addEventListener('submit', handleCFSubmit);
  }
  async function handleCFSubmit(e) {
    e.preventDefault();
    const g = id => document.getElementById(id)?.value?.trim() || '';
    const name = g('cfName'), email = g('cfEmail'), product = document.getElementById('cfProd')?.value || '', msg = g('cfMsg');
    let ok = true;
    const ve = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    mark('cfName', !name); if (!name) ok = false;
    mark('cfEmail', !ve); if (!ve) ok = false;
    mark('cfProd', !product); if (!product) ok = false;
    mark('cfMsg', !msg); if (!msg) ok = false;
    if (!ok) { toast('Please fill in all required fields.', 'err', '⚠️'); return; }
    const btn = document.getElementById('naCFSub');
    btn.classList.add('ld'); btn.disabled = true;
    const inq = DB.addInquiry({ name, email, company: g('cfCo'), phone: g('cfPh'), product, quantity: document.getElementById('cfQty')?.value || '', useFor: g('cfUse'), message: msg });
    await sendEmails(inq);
    btn.classList.remove('ld'); btn.disabled = false;
    document.getElementById('naCF').style.display = 'none';
    document.getElementById('naCFDone').style.display = 'block';
    document.getElementById('naCFRef').textContent = 'REF: ' + inq.id;
    toast(`Inquiry submitted! Ref: ${inq.id}`, 'ok', '✅');
    const session = DB.session;
    if (session) setTimeout(() => toast('View your inquiry in My Inquiries →', 'info', '📬'), 2500);
  }
  function mark(id, bad) { document.getElementById(id)?.classList.toggle('bad', bad); }

  /* ═══════════════════════════════════════
     MAIN NAV BUILD
  ═══════════════════════════════════════ */
  function buildMainNav() {
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;
    navActions.querySelectorAll('.na-nav-zone').forEach(el => el.remove());
    const origQuote = navActions.querySelector('.nav-quote');
    const menuBtn = navActions.querySelector('.nav-mob-btn, [aria-label="Menu"]');
    const s = DB.session;
    const zone = document.createElement('div');
    zone.className = 'na-nav-zone';
    if (s) {
      const ini = (s.firstName || 'U')[0].toUpperCase();
      zone.innerHTML = `
        <div class="na-dd-wrap">
          <button class="na-user-btn"><div class="na-avatar">${ini}</div>${s.firstName}</button>
          <div class="na-dd">
            <div class="na-dd-top"><div class="na-dd-name">${s.firstName} ${s.lastName || ''}</div><div class="na-dd-email">${s.email}</div></div>
            <div class="na-dd-list">
              <div class="na-dd-item" onclick="openInqPanel()">📬 My Inquiries</div>
              <div class="na-dd-item" onclick="document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})">✉️ New Inquiry</div>
              <div class="na-dd-sep"></div>
              <div class="na-dd-item red" onclick="naLogout()">🚪 Sign Out</div>
            </div>
          </div>
        </div>`;
      if (origQuote) origQuote.style.display = 'none';
    } else {
      zone.innerHTML = `
        <button class="na-nav-login" onclick="openAuth('login')">Login</button>
        <button class="na-nav-signup" onclick="openAuth('signup')">Sign Up</button>`;
      if (origQuote) origQuote.style.display = '';
    }
    if (menuBtn) navActions.insertBefore(zone, menuBtn);
    else navActions.appendChild(zone);
  }

  /* ═══════════════════════════════════════
     PRODUCT PAGE NAV FIX — THE CORE FIX
     Called on every session change AND every
     time any .pp element changes visibility
  ═══════════════════════════════════════ */
  function updatePPNavs() {
    const s = DB.session;
    document.querySelectorAll('.pp-nav').forEach(ppNav => {
      const right = ppNav.querySelector('.pp-nav-right');
      if (!right) return;

      // 1. Always hide the hardcoded Login & Sign up buttons
      right.querySelectorAll('.pp-btn-login, .pp-btn-signup').forEach(b => {
        b.style.setProperty('display', 'none', 'important');
        b.setAttribute('aria-hidden', 'true');
      });

      // 2. Remove any previously injected zone
      right.querySelectorAll('.na-pp-zone').forEach(z => z.remove());

      // 3. Build fresh zone based on current session
      const zone = document.createElement('div');
      zone.className = 'na-pp-zone';

      if (s) {
        const ini = (s.firstName || 'U')[0].toUpperCase();
        zone.innerHTML = `
          <button class="na-pp-user" onclick="openInqPanel()">
            <div class="na-pp-av">${ini}</div>
            ${s.firstName}
          </button>`;
      } else {
        zone.innerHTML = `
          <button class="na-pp-li" onclick="openAuth('login')">Login</button>
          <button class="na-pp-su" onclick="openAuth('signup')">Sign up</button>`;
      }

      // 4. Insert before the close button
      const closeBtn = right.querySelector('.pp-btn-close');
      if (closeBtn) right.insertBefore(zone, closeBtn);
      else right.appendChild(zone);
    });
  }

  /* Watch product pages — fire updatePPNavs whenever any .pp opens */
  function watchPPs() {
    const obs = new MutationObserver(updatePPNavs);
    document.querySelectorAll('.pp').forEach(pp => {
      obs.observe(pp, { attributes: true, attributeFilter: ['style', 'class'] });
    });
    // Also observe body for any dynamically added .pp elements
    new MutationObserver(muts => {
      muts.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType === 1) {
          if (n.classList?.contains('pp')) obs.observe(n, { attributes: true, attributeFilter: ['style', 'class'] });
          n.querySelectorAll?.('.pp').forEach(pp => obs.observe(pp, { attributes: true, attributeFilter: ['style', 'class'] }));
        }
      }));
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* ═══════════════════════════════════════
     SESSION CHANGE HUB
  ═══════════════════════════════════════ */
  function onSession() {
    buildMainNav();
    updatePPNavs();   // ← immediately update ALL product page navs
    buildContactForm();
  }

  /* ═══════════════════════════════════════
     INIT
  ═══════════════════════════════════════ */
  function init() {
    buildMainNav();
    updatePPNavs();
    buildContactForm();
    watchPPs();
    // Add secret admin access: triple-click the footer logo
    document.querySelector('footer')?.addEventListener('click', (function () {
      let clicks = 0, t;
      return () => { clicks++; clearTimeout(t); t = setTimeout(() => clicks = 0, 600); if (clicks >= 3) { clicks = 0; openAdmin(); } };
    })());
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
