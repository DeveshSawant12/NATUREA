/**
 * NATURÉA — Auth + Inquiry System v4
 * Built from live HTML inspection of https://deveshsawant12.github.io/NATUREA/
 * 
 * Main nav structure:
 *   nav#mainNav > .nav-actions > [.nav-quote "Get a Quote"] [.nav-mob-btn "☰"]
 *
 * Product page nav structure:
 *   .pp-nav > .pp-nav-right > [.pp-btn-login "Login"] [.pp-btn-signup "Sign up"] [.pp-btn-close "✕ Back"]
 */
(function () {
  'use strict';

  /* ─── EmailJS Config — fill these in ─── */
  var CFG = {
    // ── EmailJS (free tier, 200 emails/month) ──
    // Sign up at https://emailjs.com → get these 3 values
    EMAILJS_PUBLIC_KEY: 'YSTXWDF3PRoosbvX8P',   // Account > API Keys
    EMAILJS_SERVICE_ID: 'service_f2l9kif',            // Email Services tab
    EMAILJS_TEMPLATE_INQUIRY: 'template_79bvv6e',     // Email Templates tab
    EMAILJS_TEMPLATE_CONFIRM: 'template_tccti3p', // confirmation to user

    // ── Admin ──
    ADMIN_EMAIL: 'deveshsawant564@gmail.com',  // ← your email
    ADMIN_PASSWORD: 'Nature@2005',       // ← change this!
  };

  /* ─── Load EmailJS SDK ─── */
  function loadEJS(cb) {
    if (window.emailjs) { emailjs.init(CFG.EMAILJS_KEY); return cb(); }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.onload = function () { emailjs.init(CFG.EMAILJS_KEY); cb(); };
    document.head.appendChild(s);
  }

  /* ═══════════════════ CSS ═══════════════════ */
  var CSS = [
    /* overlay */
    '.nv-ov{position:fixed;inset:0;z-index:99000;background:rgba(10,8,5,.78);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:1rem;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}',
    '.nv-ov.show{opacity:1;visibility:visible}',
    /* modal */
    '.nv-modal{background:#fff;width:100%;max-width:450px;border-radius:18px;overflow:hidden;transform:translateY(22px) scale(.97);transition:transform .35s cubic-bezier(.22,.68,0,1.2);box-shadow:0 40px 100px rgba(0,0,0,.3)}',
    '.nv-ov.show .nv-modal{transform:none}',
    /* head */
    '.nv-mhead{padding:1.5rem 1.8rem .9rem;border-bottom:1px solid #f0e8d8;display:flex;align-items:center;justify-content:space-between}',
    '.nv-mlogo{font-family:"Playfair Display",serif;font-size:1.05rem;font-weight:600;color:#181818;letter-spacing:.04em}',
    '.nv-mlogo b{color:#9A7B2F;font-weight:600}',
    '.nv-mx{width:28px;height:28px;border-radius:50%;border:none;background:#f5f0e8;color:#9A7B2F;font-size:.9rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s}',
    '.nv-mx:hover{background:#e8dfc8}',
    /* tabs */
    '.nv-tabs{display:flex;border-bottom:1px solid #f0e8d8}',
    '.nv-tab{flex:1;padding:.78rem;font-family:"Syne",sans-serif;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:none;border:none;color:#9A9080;cursor:pointer;border-bottom:2px solid transparent;position:relative;top:1px;transition:all .2s}',
    '.nv-tab.on{color:#9A7B2F;border-bottom-color:#9A7B2F}',
    /* body */
    '.nv-mbody{padding:1.6rem 1.8rem 1.8rem}',
    '.nv-mtitle{font-family:"Playfair Display",serif;font-size:1.35rem;font-weight:700;color:#181818;margin-bottom:.3rem}',
    '.nv-mtitle i{font-style:italic;color:#B8962A}',
    '.nv-msub{font-family:"DM Sans",sans-serif;font-size:.82rem;color:#6B6457;line-height:1.65;margin-bottom:1.3rem}',
    /* form */
    '.nv-form{display:flex;flex-direction:column;gap:.75rem}',
    '.nv-lbl{font-family:"Syne",sans-serif;font-size:.58rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#6B6457;display:block;margin-bottom:.25rem}',
    '.nv-inp{font-family:"DM Sans",sans-serif;font-size:.87rem;color:#181818;background:#F8F4EE;border:1.5px solid rgba(154,123,47,.2);padding:.78rem .95rem;border-radius:8px;outline:none;transition:border-color .2s,background .2s;width:100%;box-sizing:border-box}',
    '.nv-inp:focus{border-color:#9A7B2F;background:#fff}',
    '.nv-inp.bad{border-color:#e05555;background:#fff8f8}',
    '.nv-er{font-family:"DM Sans",sans-serif;font-size:.71rem;color:#e05555;margin-top:.12rem;display:none}',
    '.nv-er.on{display:block}',
    '.nv-2c{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}',
    '.nv-pw{position:relative}',
    '.nv-pw .nv-inp{padding-right:2.5rem}',
    '.nv-eye{position:absolute;right:.75rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#9A9080;font-size:.9rem;padding:0}',
    '.nv-eye:hover{color:#9A7B2F}',
    '.nv-fgt{font-family:"DM Sans",sans-serif;font-size:.75rem;color:#9A7B2F;align-self:flex-end;cursor:pointer;margin-top:-.15rem}',
    '.nv-fgt:hover{text-decoration:underline}',
    '.nv-ger{font-family:"DM Sans",sans-serif;font-size:.77rem;color:#e05555;text-align:center;padding:.38rem;background:#fff5f5;border-radius:6px;display:none}',
    '.nv-ger.on{display:block}',
    '.nv-btn{font-family:"Syne",sans-serif;font-size:.72rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;background:#181818;color:#fff;border:none;padding:.88rem;border-radius:8px;cursor:pointer;transition:background .3s;display:flex;align-items:center;justify-content:center;gap:.45rem;margin-top:.2rem}',
    '.nv-btn:hover{background:#9A7B2F}',
    '.nv-btn:disabled{background:#ccc;cursor:not-allowed}',
    '.nv-spin{width:13px;height:13px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:nvspin .6s linear infinite;display:none}',
    '@keyframes nvspin{to{transform:rotate(360deg)}}',
    '.nv-btn.ld .nv-spin{display:block}',
    '.nv-or{display:flex;align-items:center;gap:.65rem;font-family:"DM Sans",sans-serif;font-size:.72rem;color:#9A9080}',
    '.nv-or::before,.nv-or::after{content:"";flex:1;height:1px;background:#f0e8d8}',
    '.nv-socs{display:flex;gap:.65rem}',
    '.nv-soc{flex:1;font-family:"Syne",sans-serif;font-size:.63rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;background:#F8F4EE;border:1.5px solid rgba(154,123,47,.2);padding:.68rem;border-radius:8px;cursor:pointer;color:#181818;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:.38rem}',
    '.nv-soc:hover{border-color:#9A7B2F;background:#fff}',
    '.nv-ok{text-align:center;padding:.5rem 0;display:none}',
    '.nv-ok-ico{font-size:2.6rem;display:block;margin-bottom:.55rem}',
    '.nv-ok-t{font-family:"Playfair Display",serif;font-size:1.2rem;font-weight:700;color:#181818;margin-bottom:.3rem}',
    '.nv-ok-s{font-family:"DM Sans",sans-serif;font-size:.82rem;color:#6B6457;line-height:1.65}',
    /* toast */
    '.nv-toasts{position:fixed;top:1rem;right:1rem;z-index:999999;display:flex;flex-direction:column;gap:.4rem;pointer-events:none}',
    '.nv-toast{background:#181818;color:#fff;font-family:"DM Sans",sans-serif;font-size:.82rem;padding:.65rem 1rem;border-radius:8px;border-left:3px solid #9A7B2F;box-shadow:0 8px 28px rgba(0,0,0,.22);transform:translateX(110%);transition:transform .3s cubic-bezier(.22,.68,0,1.2);display:flex;align-items:center;gap:.5rem;max-width:290px;pointer-events:none}',
    '.nv-toast.in{transform:none}',
    '.nv-toast.ok{border-left-color:#4CAF50}',
    '.nv-toast.err{border-left-color:#e05555}',
    /* ── MAIN NAV BUTTONS ── */
    '.nv-nav-zone{display:flex;align-items:center;gap:.45rem}',
    /* logged out */
    '.nv-nav-li{font-family:"Syne",sans-serif;font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:none;border:1.5px solid rgba(24,24,24,.25);color:#181818;padding:.44rem .9rem;border-radius:30px;cursor:pointer;transition:all .22s;white-space:nowrap}',
    '.nv-nav-li:hover{border-color:#9A7B2F;color:#9A7B2F}',
    '.nv-nav-su{font-family:"Syne",sans-serif;font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:#181818;color:#fff;border:none;padding:.44rem 1.05rem;border-radius:30px;cursor:pointer;transition:background .25s;white-space:nowrap}',
    '.nv-nav-su:hover{background:#9A7B2F}',
    /* logged in — dropdown */
    '.nv-dd{position:relative}',
    '.nv-dd-btn{display:flex;align-items:center;gap:.45rem;font-family:"Syne",sans-serif;font-size:.66rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;background:rgba(154,123,47,.1);color:#9A7B2F;border:1.5px solid rgba(154,123,47,.28);padding:.44rem .9rem;border-radius:30px;cursor:pointer;transition:all .22s;white-space:nowrap}',
    '.nv-dd-btn:hover{background:rgba(154,123,47,.18)}',
    '.nv-av{width:22px;height:22px;border-radius:50%;background:#9A7B2F;color:#fff;font-family:"Playfair Display",serif;font-size:.75rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}',
    '.nv-dd-menu{position:absolute;top:calc(100% + .4rem);right:0;background:#fff;border-radius:12px;border:1px solid rgba(154,123,47,.15);box-shadow:0 16px 48px rgba(0,0,0,.14);min-width:205px;overflow:hidden;opacity:0;visibility:hidden;transform:translateY(-6px);transition:all .22s;z-index:99010}',
    '.nv-dd:hover .nv-dd-menu{opacity:1;visibility:visible;transform:none}',
    '.nv-dd-top{padding:.85rem 1.05rem;background:#F8F4EE;border-bottom:1px solid rgba(154,123,47,.1)}',
    '.nv-dd-name{font-family:"Playfair Display",serif;font-size:.88rem;font-weight:700;color:#181818}',
    '.nv-dd-email{font-family:"DM Sans",sans-serif;font-size:.69rem;color:#9A9080;margin-top:.08rem;word-break:break-all}',
    '.nv-dd-list{padding:.3rem 0}',
    '.nv-dd-item{display:flex;align-items:center;gap:.6rem;padding:.58rem 1.05rem;font-family:"DM Sans",sans-serif;font-size:.81rem;color:#2A2A2A;cursor:pointer;transition:background .18s}',
    '.nv-dd-item:hover{background:#F8F4EE}',
    '.nv-dd-item.red{color:#e05555}',
    '.nv-dd-sep{height:1px;background:rgba(154,123,47,.1);margin:.25rem 0}',
    /* ── PRODUCT PAGE NAV ZONE ── */
    '.nv-pp-zone{display:flex;align-items:center;gap:.4rem}',
    /* product page logged out */
    '.nv-pp-li{font-family:"Syne",sans-serif;font-size:.66rem;font-weight:600;letter-spacing:.07em;color:#555;background:none;border:none;cursor:pointer;padding:.35rem .65rem;transition:color .2s;white-space:nowrap}',
    '.nv-pp-li:hover{color:#9A7B2F}',
    '.nv-pp-su{font-family:"Syne",sans-serif;font-size:.66rem;font-weight:700;letter-spacing:.07em;background:#181818;color:#fff;border:none;padding:.35rem .85rem;border-radius:3px;cursor:pointer;transition:background .25s;white-space:nowrap}',
    '.nv-pp-su:hover{background:#9A7B2F}',
    /* product page logged in */
    '.nv-pp-user{display:flex;align-items:center;gap:.4rem;font-family:"Syne",sans-serif;font-size:.64rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;background:rgba(154,123,47,.1);color:#9A7B2F;border:1.5px solid rgba(154,123,47,.25);padding:.35rem .8rem;border-radius:30px;cursor:pointer;transition:all .22s;white-space:nowrap}',
    '.nv-pp-user:hover{background:rgba(154,123,47,.2)}',
    '.nv-pp-av{width:20px;height:20px;border-radius:50%;background:#9A7B2F;color:#fff;font-family:"Playfair Display",serif;font-size:.7rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}',
    /* inquiry panel */
    '.nv-inq-ov{position:fixed;inset:0;z-index:99500;background:rgba(10,8,5,.72);backdrop-filter:blur(6px);display:flex;justify-content:flex-end;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}',
    '.nv-inq-ov.show{opacity:1;visibility:visible}',
    '.nv-inq-panel{background:#fff;width:100%;max-width:480px;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .38s cubic-bezier(.22,.68,0,1.2)}',
    '.nv-inq-ov.show .nv-inq-panel{transform:none}',
    '.nv-inq-head{padding:1.3rem 1.6rem;border-bottom:1px solid #f0e8d8;display:flex;align-items:center;justify-content:space-between;background:#F8F4EE;flex-shrink:0}',
    '.nv-inq-title{font-family:"Playfair Display",serif;font-size:1.1rem;font-weight:700;color:#181818}',
    '.nv-inq-sub{font-family:"DM Sans",sans-serif;font-size:.73rem;color:#9A9080;margin-top:.1rem}',
    '.nv-inq-body{flex:1;overflow-y:auto;padding:1.3rem 1.6rem}',
    '.nv-inq-empty{text-align:center;padding:2.5rem 1rem;font-family:"DM Sans",sans-serif;font-size:.85rem;color:#9A9080}',
    '.nv-inq-card{border:1px solid rgba(154,123,47,.16);border-radius:10px;padding:1.05rem;margin-bottom:.8rem}',
    '.nv-inq-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.6rem}',
    '.nv-inq-prod{font-family:"Playfair Display",serif;font-size:.9rem;font-weight:700;color:#181818}',
    '.nv-badge{font-family:"Syne",sans-serif;font-size:.54rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.2rem .6rem;border-radius:30px}',
    '.nv-badge.pending{background:#fff3cd;color:#856404}',
    '.nv-badge.reviewed{background:#d1e7dd;color:#0f5132}',
    '.nv-badge.contacted{background:#cfe2ff;color:#084298}',
    '.nv-inq-ref{font-family:"Syne",sans-serif;font-size:.7rem;font-weight:700;letter-spacing:.09em;color:#9A7B2F}',
    '.nv-inq-row{display:flex;gap:1.1rem;flex-wrap:wrap;margin-bottom:.4rem}',
    '.nv-inq-f{display:flex;flex-direction:column;gap:.06rem}',
    '.nv-inq-fl{font-family:"Syne",sans-serif;font-size:.53rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#9A9080}',
    '.nv-inq-fv{font-family:"DM Sans",sans-serif;font-size:.79rem;color:#2A2A2A}',
    '.nv-inq-msg{font-family:"DM Sans",sans-serif;font-size:.79rem;color:#6B6457;line-height:1.6;background:#F8F4EE;padding:.6rem .8rem;border-radius:6px;margin-top:.5rem}',
    '.nv-inq-date{font-family:"DM Sans",sans-serif;font-size:.69rem;color:#9A9080;margin-top:.5rem}',
    /* contact form */
    '.nv-cf-prompt{font-family:"DM Sans",sans-serif;font-size:.81rem;color:#6B6457;text-align:center;padding:.72rem;background:#F8F4EE;border-radius:8px;margin-bottom:.8rem}',
    '.nv-cf-prompt a{color:#9A7B2F;cursor:pointer;font-weight:600}',
    '.nv-cf-prompt a:hover{text-decoration:underline}',
    '.nv-cf{display:flex;flex-direction:column;gap:.85rem}',
    '.nv-cf-row{display:grid;grid-template-columns:1fr 1fr;gap:.85rem}',
    '.nv-cf-g{display:flex;flex-direction:column;gap:.26rem}',
    '.nv-cf-l{font-family:"Syne",sans-serif;font-size:.57rem;font-weight:700;letter-spacing:.19em;text-transform:uppercase;color:#6B6457}',
    '.nv-cf-inp,.nv-cf-sel,.nv-cf-ta{font-family:"DM Sans",sans-serif;font-size:.86rem;color:#181818;background:#fff;border:1.5px solid rgba(154,123,47,.2);padding:.82rem .95rem;border-radius:8px;outline:none;transition:border-color .22s;width:100%;box-sizing:border-box}',
    '.nv-cf-inp:focus,.nv-cf-sel:focus,.nv-cf-ta:focus{border-color:#9A7B2F}',
    '.nv-cf-inp.bad,.nv-cf-sel.bad,.nv-cf-ta.bad{border-color:#e05555}',
    '.nv-cf-inp::placeholder,.nv-cf-ta::placeholder{color:#c0b5a0}',
    '.nv-cf-ta{resize:vertical;min-height:100px}',
    '.nv-cf-sel{-webkit-appearance:none;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'11\' height=\'7\'%3E%3Cpath d=\'M1 1l4.5 4.5L10 1\' stroke=\'%239A9080\' stroke-width=\'1.5\' fill=\'none\'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right .85rem center}',
    '.nv-cf-sub{font-family:"Syne",sans-serif;font-size:.72rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;background:#181818;color:#fff;border:none;padding:.88rem 2.2rem;border-radius:8px;cursor:pointer;transition:background .3s;align-self:center;margin-top:.3rem;display:flex;align-items:center;gap:.4rem}',
    '.nv-cf-sub:hover{background:#9A7B2F}',
    '.nv-cf-sub:disabled{background:#ccc;cursor:not-allowed}',
    '.nv-cf-sub .nv-spin{display:none}',
    '.nv-cf-sub.ld .nv-spin{display:block}',
    '.nv-cf-sub.ld .nv-cf-sub-t{opacity:.6}',
    '.nv-cf-done{text-align:center;padding:2rem 1rem;display:none}',
    '.nv-cf-done-ico{font-size:2.6rem;display:block;margin-bottom:.65rem}',
    '.nv-cf-done-t{font-family:"Playfair Display",serif;font-size:1.3rem;font-weight:700;color:#181818;margin-bottom:.42rem}',
    '.nv-cf-done-s{font-family:"DM Sans",sans-serif;font-size:.83rem;color:#6B6457;line-height:1.7;margin-bottom:1rem}',
    '.nv-cf-done-ref{font-family:"Syne",sans-serif;font-size:.66rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;background:#F8F4EE;color:#9A7B2F;padding:.42rem 1rem;border-radius:30px;display:inline-block}',
    '.nv-cf-again{font-family:"Syne",sans-serif;font-size:.66rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:none;border:1.5px solid rgba(154,123,47,.3);color:#9A7B2F;padding:.58rem 1.3rem;border-radius:8px;cursor:pointer;margin-top:.65rem;transition:all .22s;display:inline-block}',
    '.nv-cf-again:hover{background:rgba(154,123,47,.07)}',
    /* admin */
    '.nv-adm-ov{position:fixed;inset:0;z-index:99900;background:rgba(10,8,5,.85);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:1rem;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}',
    '.nv-adm-ov.show{opacity:1;visibility:visible}',
    '.nv-adm{background:#fff;width:100%;max-width:880px;max-height:88vh;border-radius:18px;overflow:hidden;display:flex;flex-direction:column;transform:scale(.96);transition:transform .35s cubic-bezier(.22,.68,0,1.2)}',
    '.nv-adm-ov.show .nv-adm{transform:none}',
    '.nv-adm-head{padding:1.1rem 1.6rem;border-bottom:1px solid #f0e8d8;display:flex;align-items:center;justify-content:space-between;background:#F8F4EE;flex-shrink:0}',
    '.nv-adm-title{font-family:"Playfair Display",serif;font-size:1.1rem;font-weight:700;color:#181818}',
    '.nv-adm-tabs{display:flex;gap:.45rem;padding:.75rem 1.6rem;border-bottom:1px solid #f0e8d8;flex-shrink:0;overflow-x:auto}',
    '.nv-adm-tab{font-family:"Syne",sans-serif;font-size:.63rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:#F8F4EE;border:1.5px solid rgba(154,123,47,.18);color:#6B6457;padding:.38rem .9rem;border-radius:30px;cursor:pointer;transition:all .2s;white-space:nowrap}',
    '.nv-adm-tab.on{background:#9A7B2F;color:#fff;border-color:#9A7B2F}',
    '.nv-adm-body{flex:1;overflow-y:auto;padding:1.1rem 1.6rem}',
    '.nv-adm-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:.75rem;margin-bottom:1.2rem}',
    '.nv-adm-stat{background:#F8F4EE;border-radius:10px;padding:.9rem;text-align:center}',
    '.nv-adm-sn{font-family:"Playfair Display",serif;font-size:1.9rem;font-weight:700;color:#9A7B2F;line-height:1}',
    '.nv-adm-sl{font-family:"DM Sans",sans-serif;font-size:.7rem;color:#9A9080;margin-top:.22rem}',
    '.nv-tbl{width:100%;border-collapse:collapse}',
    '.nv-tbl th{font-family:"Syne",sans-serif;font-size:.58rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9A9080;padding:.55rem .75rem;text-align:left;border-bottom:2px solid #f0e8d8;white-space:nowrap}',
    '.nv-tbl td{font-family:"DM Sans",sans-serif;font-size:.79rem;color:#2A2A2A;padding:.65rem .75rem;border-bottom:1px solid #f8f4ee;vertical-align:top}',
    '.nv-tbl tr:hover td{background:#fdf9f4}',
    '.nv-adm-sel{font-family:"Syne",sans-serif;font-size:.56rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;border:1px solid rgba(154,123,47,.3);border-radius:30px;padding:.18rem .55rem;cursor:pointer;outline:none;background:#fff;color:#181818}',
    '.nv-adm-empty{text-align:center;padding:2.5rem;font-family:"DM Sans",sans-serif;font-size:.86rem;color:#9A9080}',
    '.nv-adm-urow{display:flex;align-items:center;justify-content:space-between;padding:.85rem .95rem;border:1px solid #f0e8d8;border-radius:8px;background:#fdfaf6;margin-bottom:.55rem}',
    '.nv-adm-un{font-family:"Playfair Display",serif;font-size:.86rem;font-weight:700;color:#181818}',
    '.nv-adm-ue{font-family:"DM Sans",sans-serif;font-size:.73rem;color:#9A9080}',
    '.nv-adm-um{font-family:"DM Sans",sans-serif;font-size:.71rem;color:#9A7B2F}',
    '@media(max-width:600px){',
    '  .nv-ov{align-items:flex-end}',
    '  .nv-modal{border-radius:18px 18px 0 0;max-height:90vh;overflow-y:auto}',
    '  .nv-2c,.nv-cf-row{grid-template-columns:1fr}',
    '  .nv-inq-panel,.nv-adm{max-width:100%}',
    '  .nv-adm-stats{grid-template-columns:repeat(2,1fr)}',
    '  .nv-adm{border-radius:12px 12px 0 0;max-height:96vh}',
    '}'
  ].join('');

  var s = document.createElement('style');
  s.textContent = CSS;
  document.head.appendChild(s);

  /* ═══════════════════ DB ═══════════════════ */
  var DB = {
    get users() { try { return JSON.parse(localStorage.getItem('nv_users') || '[]') } catch (e) { return [] } },
    set users(v) { localStorage.setItem('nv_users', JSON.stringify(v)) },
    get session() { try { return JSON.parse(localStorage.getItem('nv_session') || 'null') } catch (e) { return null } },
    set session(v) { v ? localStorage.setItem('nv_session', JSON.stringify(v)) : localStorage.removeItem('nv_session') },
    get inquiries() { try { return JSON.parse(localStorage.getItem('nv_inquiries') || '[]') } catch (e) { return [] } },
    set inquiries(v) { localStorage.setItem('nv_inquiries', JSON.stringify(v)) },
    addUser: function (u) {
      var list = this.users;
      if (list.find(function (x) { return x.email.toLowerCase() === u.email.toLowerCase() })) return false;
      list.push(Object.assign({}, u, { id: 'U' + Date.now(), at: new Date().toISOString() }));
      this.users = list; return true;
    },
    findUser: function (email, pw) {
      return this.users.find(function (u) { return u.email.toLowerCase() === email.toLowerCase() && u.password === pw }) || null;
    },
    addInquiry: function (inq) {
      var list = this.inquiries;
      var item = Object.assign({}, inq, { id: 'INQ-' + Math.random().toString(36).substr(2, 6).toUpperCase(), at: new Date().toISOString(), status: 'pending' });
      list.unshift(item); this.inquiries = list; return item;
    },
    setStatus: function (id, status) {
      var list = this.inquiries;
      var i = list.find(function (x) { return x.id === id });
      if (i) { i.status = status; this.inquiries = list; }
    },
    myInquiries: function (email) {
      return this.inquiries.filter(function (i) { return i.email.toLowerCase() === email.toLowerCase() });
    }
  };

  /* ═══════════════════ TOAST ═══════════════════ */
  var toastWrap = document.createElement('div');
  toastWrap.className = 'nv-toasts';
  document.body.appendChild(toastWrap);
  function toast(msg, type, icon) {
    type = type || 'info'; icon = icon || '🌿';
    var t = document.createElement('div');
    t.className = 'nv-toast ' + type;
    t.innerHTML = '<span>' + icon + '</span>' + msg;
    toastWrap.appendChild(t);
    requestAnimationFrame(function () { requestAnimationFrame(function () { t.classList.add('in') }) });
    setTimeout(function () { t.classList.remove('in'); setTimeout(function () { t.remove() }, 350) }, 3500);
  }

  /* ═══════════════════ EMAIL ═══════════════════ */
  function sendEmail(inq) {
    if (CFG.EMAILJS_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') return;
    loadEJS(function () {
      emailjs.send(CFG.EMAILJS_SERVICE, CFG.EMAILJS_ADMIN, {
        to_email: CFG.ADMIN_EMAIL, ref_id: inq.id,
        customer_name: inq.name, customer_email: inq.email,
        customer_company: inq.company || '—', customer_phone: inq.phone || '—',
        product: inq.product, quantity: inq.quantity || '—',
        use_for: inq.useFor || '—', message: inq.message,
        submitted_at: new Date(inq.at).toLocaleString('en-IN')
      }).catch(function (e) { console.warn('EmailJS admin:', e) });
      emailjs.send(CFG.EMAILJS_SERVICE, CFG.EMAILJS_CONFIRM, {
        to_email: inq.email, to_name: inq.name,
        ref_id: inq.id, product: inq.product
      }).catch(function (e) { console.warn('EmailJS confirm:', e) });
    });
  }

  /* ═══════════════════ AUTH MODAL ═══════════════════ */
  document.body.insertAdjacentHTML('beforeend',
    '<div class="nv-ov" id="nvOv">' +
    '<div class="nv-modal" role="dialog">' +
    '<div class="nv-mhead"><div class="nv-mlogo">🌿 Natur<b>éa</b></div><button class="nv-mx" id="nvX">✕</button></div>' +
    '<div class="nv-tabs"><button class="nv-tab on" data-t="li">Login</button><button class="nv-tab" data-t="su">Create Account</button></div>' +
    // LOGIN PANEL
    '<div class="nv-mbody" id="nvLi">' +
    '<div class="nv-mtitle">Welcome <i>Back</i></div>' +
    '<div class="nv-msub">Sign in to track your inquiries and manage your account.</div>' +
    '<form class="nv-form" id="nvLiF" novalidate>' +
    '<div><label class="nv-lbl" for="li_em">Email Address</label><input class="nv-inp" id="li_em" type="email" placeholder="you@company.com"><div class="nv-er" id="li_em_er">Enter a valid email address.</div></div>' +
    '<div><label class="nv-lbl" for="li_pw">Password</label><div class="nv-pw"><input class="nv-inp" id="li_pw" type="password" placeholder="Your password"><button type="button" class="nv-eye" data-t="li_pw">👁</button></div><div class="nv-er" id="li_pw_er">Enter your password.</div></div>' +
    '<span class="nv-fgt" id="nvFgt">Forgot password?</span>' +
    '<div class="nv-ger" id="li_ger"></div>' +
    '<button type="submit" class="nv-btn" id="li_btn"><div class="nv-spin"></div><span>Sign In →</span></button>' +
    '<div class="nv-or">or continue with</div>' +
    '<div class="nv-socs"><button type="button" class="nv-soc" id="nvGLi">🇬 Google</button><button type="button" class="nv-soc" id="nvLinLi">💼 LinkedIn</button></div>' +
    '</form></div>' +
    // SIGNUP PANEL
    '<div class="nv-mbody" id="nvSu" style="display:none">' +
    '<div class="nv-mtitle">Create <i>Account</i></div>' +
    '<div class="nv-msub">Join Naturéa to request samples and track inquiries.</div>' +
    '<form class="nv-form" id="nvSuF" novalidate>' +
    '<div class="nv-2c">' +
    '<div><label class="nv-lbl" for="su_fi">First Name</label><input class="nv-inp" id="su_fi" type="text" placeholder="First"><div class="nv-er" id="su_fi_er">Required.</div></div>' +
    '<div><label class="nv-lbl" for="su_la">Last Name</label><input class="nv-inp" id="su_la" type="text" placeholder="Last"><div class="nv-er" id="su_la_er">Required.</div></div>' +
    '</div>' +
    '<div><label class="nv-lbl" for="su_em">Business Email</label><input class="nv-inp" id="su_em" type="email" placeholder="you@company.com"><div class="nv-er" id="su_em_er">Enter a valid email.</div></div>' +
    '<div><label class="nv-lbl" for="su_co">Company / Brand</label><input class="nv-inp" id="su_co" type="text" placeholder="Your company name"></div>' +
    '<div><label class="nv-lbl" for="su_pw">Password</label><div class="nv-pw"><input class="nv-inp" id="su_pw" type="password" placeholder="Min. 8 characters"><button type="button" class="nv-eye" data-t="su_pw">👁</button></div><div class="nv-er" id="su_pw_er">Min. 8 characters required.</div></div>' +
    '<div><label class="nv-lbl" for="su_pw2">Confirm Password</label><div class="nv-pw"><input class="nv-inp" id="su_pw2" type="password" placeholder="Repeat password"><button type="button" class="nv-eye" data-t="su_pw2">👁</button></div><div class="nv-er" id="su_pw2_er">Passwords do not match.</div></div>' +
    '<div class="nv-ger" id="su_ger"></div>' +
    '<button type="submit" class="nv-btn" id="su_btn"><div class="nv-spin"></div><span>Create Account →</span></button>' +
    '<div class="nv-or">or continue with</div>' +
    '<div class="nv-socs"><button type="button" class="nv-soc" id="nvGSu">🇬 Google</button><button type="button" class="nv-soc" id="nvLinSu">💼 LinkedIn</button></div>' +
    '</form>' +
    '<div class="nv-ok" id="su_ok"><span class="nv-ok-ico">🎉</span><div class="nv-ok-t">Account Created!</div><p class="nv-ok-s">Welcome to Naturéa. You\'re now signed in.</p></div>' +
    '</div>' +
    '</div></div>'
  );

  function openAuth(tab) {
    var ov = document.getElementById('nvOv');
    ov.style.display = 'flex';
    requestAnimationFrame(function () { ov.classList.add('show') });
    switchTab(tab || 'li');
    setTimeout(function () {
      var el = document.getElementById(tab === 'su' ? 'su_fi' : 'li_em');
      if (el) el.focus();
    }, 340);
  }
  window.openAuth = openAuth;

  function closeAuth() {
    var ov = document.getElementById('nvOv');
    ov.classList.remove('show');
    setTimeout(function () { ov.style.display = 'none' }, 320);
  }

  function switchTab(t) {
    document.querySelectorAll('.nv-tab').forEach(function (x) { x.classList.toggle('on', x.dataset.t === t) });
    document.getElementById('nvLi').style.display = t === 'li' ? 'block' : 'none';
    document.getElementById('nvSu').style.display = t === 'su' ? 'block' : 'none';
  }

  document.querySelectorAll('.nv-tab').forEach(function (t) {
    t.addEventListener('click', function () { switchTab(t.dataset.t) });
  });
  document.getElementById('nvX').addEventListener('click', closeAuth);
  document.getElementById('nvOv').addEventListener('click', function (e) { if (e.target === e.currentTarget) closeAuth() });
  document.getElementById('nvFgt').addEventListener('click', function () { toast('Password reset email sent! (demo)', 'ok', '📧') });

  document.querySelectorAll('.nv-eye').forEach(function (b) {
    b.addEventListener('click', function () {
      var el = document.getElementById(b.dataset.t);
      if (!el) return;
      el.type = el.type === 'password' ? 'text' : 'password';
      b.textContent = el.type === 'password' ? '👁' : '🙈';
    });
  });

  function fv(id, eid, bad) {
    var el = document.getElementById(id); if (el) el.classList.toggle('bad', bad);
    var er = document.getElementById(eid); if (er) er.classList.toggle('on', bad);
  }

  /* Login form */
  document.getElementById('nvLiF').addEventListener('submit', function (e) {
    e.preventDefault();
    var em = document.getElementById('li_em').value.trim();
    var pw = document.getElementById('li_pw').value;
    var ok = true;
    var ve = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    fv('li_em', 'li_em_er', !ve); if (!ve) ok = false;
    fv('li_pw', 'li_pw_er', !pw); if (!pw) ok = false;
    if (!ok) return;
    var btn = document.getElementById('li_btn');
    btn.classList.add('ld'); btn.disabled = true;
    setTimeout(function () {
      var user = DB.findUser(em, pw);
      if (user) {
        DB.session = { firstName: user.firstName, lastName: user.lastName || '', email: user.email, company: user.company || '' };
        closeAuth(); onSession();
        toast('Welcome back, ' + user.firstName + '! 🌿', 'ok', '✅');
      } else {
        var ge = document.getElementById('li_ger');
        ge.textContent = 'Incorrect email or password. Please try again.';
        ge.classList.add('on');
        btn.classList.remove('ld'); btn.disabled = false;
      }
    }, 900);
  });

  /* Signup form */
  document.getElementById('nvSuF').addEventListener('submit', function (e) {
    e.preventDefault();
    var fi = document.getElementById('su_fi').value.trim();
    var la = document.getElementById('su_la').value.trim();
    var em = document.getElementById('su_em').value.trim();
    var co = document.getElementById('su_co').value.trim();
    var pw = document.getElementById('su_pw').value;
    var pw2 = document.getElementById('su_pw2').value;
    var ok = true;
    fv('su_fi', 'su_fi_er', !fi); if (!fi) ok = false;
    fv('su_la', 'su_la_er', !la); if (!la) ok = false;
    var ve = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    fv('su_em', 'su_em_er', !ve); if (!ve) ok = false;
    fv('su_pw', 'su_pw_er', pw.length < 8); if (pw.length < 8) ok = false;
    fv('su_pw2', 'su_pw2_er', pw !== pw2); if (pw !== pw2) ok = false;
    if (!ok) return;
    var btn = document.getElementById('su_btn');
    btn.classList.add('ld'); btn.disabled = true;
    setTimeout(function () {
      var added = DB.addUser({ firstName: fi, lastName: la, email: em, company: co, password: pw });
      if (added) {
        DB.session = { firstName: fi, lastName: la, email: em, company: co };
        document.getElementById('nvSuF').style.display = 'none';
        document.getElementById('su_ok').style.display = 'block';
        setTimeout(function () { closeAuth(); onSession(); toast('Account created! Welcome, ' + fi + ' 🎉', 'ok', '✅') }, 1800);
      } else {
        var ge = document.getElementById('su_ger');
        ge.textContent = 'An account with this email already exists.';
        ge.classList.add('on');
        btn.classList.remove('ld'); btn.disabled = false;
      }
    }, 1000);
  });

  /* Social */
  function googleMock(mode) {
    var pool = [['Alex', 'Sharma'], ['Jordan', 'Patel'], ['Morgan', 'Lee'], ['Taylor', 'Chen'], ['Casey', 'Kumar']];
    var pick = pool[Math.floor(Math.random() * pool.length)];
    var fi = pick[0], la = pick[1], em = fi.toLowerCase() + '.' + la.toLowerCase() + '@gmail.com';
    if (mode === 'su') DB.addUser({ firstName: fi, lastName: la, email: em, company: '', password: '__google__' });
    DB.session = { firstName: fi, lastName: la, email: em, company: '' };
    closeAuth(); onSession();
    toast('Signed in with Google as ' + fi, 'ok', '✅');
  }
  document.getElementById('nvGLi').addEventListener('click', function () { googleMock('li') });
  document.getElementById('nvGSu').addEventListener('click', function () { googleMock('su') });
  document.getElementById('nvLinLi').addEventListener('click', function () { toast('LinkedIn OAuth coming soon!', 'info', '💼') });
  document.getElementById('nvLinSu').addEventListener('click', function () { toast('LinkedIn OAuth coming soon!', 'info', '💼') });

  window.nvLogout = function () { DB.session = null; onSession(); toast('Signed out. See you soon! 👋', 'info', '🌿') };

  /* ═══════════════════ INQUIRIES PANEL ═══════════════════ */
  document.body.insertAdjacentHTML('beforeend',
    '<div class="nv-inq-ov" id="nvInqOv">' +
    '<div class="nv-inq-panel">' +
    '<div class="nv-inq-head"><div><div class="nv-inq-title">My Inquiries</div><div class="nv-inq-sub">Track your sample requests</div></div><button class="nv-mx" id="nvInqX">✕</button></div>' +
    '<div class="nv-inq-body" id="nvInqBody"></div>' +
    '</div></div>'
  );

  window.openInqPanel = function () {
    var s = DB.session;
    if (!s) { openAuth('li'); return; }
    renderInq(s.email);
    var ov = document.getElementById('nvInqOv');
    ov.style.display = 'flex';
    requestAnimationFrame(function () { ov.classList.add('show') });
  };
  document.getElementById('nvInqX').addEventListener('click', function () {
    var ov = document.getElementById('nvInqOv');
    ov.classList.remove('show');
    setTimeout(function () { ov.style.display = 'none' }, 380);
  });
  document.getElementById('nvInqOv').addEventListener('click', function (e) {
    if (e.target === e.currentTarget) { this.classList.remove('show'); var self = this; setTimeout(function () { self.style.display = 'none' }, 380) }
  });

  function renderInq(email) {
    var body = document.getElementById('nvInqBody');
    body.innerHTML = '';
    var list = DB.myInquiries(email);
    if (!list.length) {
      body.innerHTML = '<div class="nv-inq-empty"><span style="font-size:2.2rem;display:block;margin-bottom:.6rem">📬</span><strong style="font-family:\'Playfair Display\',serif;color:#2A2A2A;display:block;margin-bottom:.35rem">No inquiries yet</strong>Submit a product inquiry from the Contact section.</div>';
      return;
    }
    var lbl = { pending: 'Pending Review', reviewed: 'Under Review', contacted: 'Contacted' };
    list.forEach(function (inq) {
      var d = new Date(inq.at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      var card = document.createElement('div');
      card.className = 'nv-inq-card';
      card.innerHTML =
        '<div class="nv-inq-top"><div class="nv-inq-prod">🌿 ' + (inq.product || 'General Inquiry') + '</div><span class="nv-badge ' + (inq.status || 'pending') + '">' + (lbl[inq.status] || 'Pending Review') + '</span></div>' +
        '<div class="nv-inq-row"><div class="nv-inq-f"><div class="nv-inq-fl">Reference</div><div class="nv-inq-ref">' + inq.id + '</div></div><div class="nv-inq-f"><div class="nv-inq-fl">Company</div><div class="nv-inq-fv">' + (inq.company || '—') + '</div></div><div class="nv-inq-f"><div class="nv-inq-fl">Qty</div><div class="nv-inq-fv">' + (inq.quantity || '—') + '</div></div></div>' +
        (inq.message ? '<div class="nv-inq-msg">"' + inq.message + '"</div>' : '') +
        '<div class="nv-inq-date">📅 ' + d + '</div>';
      body.appendChild(card);
    });
  }

  /* ═══════════════════ ADMIN ═══════════════════ */
  document.body.insertAdjacentHTML('beforeend',
    '<div class="nv-adm-ov" id="nvAdmOv">' +
    '<div class="nv-adm">' +
    '<div class="nv-adm-head"><div class="nv-adm-title">🌿 Naturéa Admin Panel</div><button class="nv-mx" id="nvAdmX">✕</button></div>' +
    '<div class="nv-adm-tabs"><button class="nv-adm-tab on" data-av="dash">📊 Dashboard</button><button class="nv-adm-tab" data-av="inq">📬 Inquiries</button><button class="nv-adm-tab" data-av="users">👥 Users</button></div>' +
    '<div class="nv-adm-body" id="nvAdmBody"></div>' +
    '</div></div>'
  );

  var admAuthed = false;
  window.openAdmin = function () {
    if (!admAuthed) {
      var pw = prompt('Admin Password:');
      if (pw !== CFG.ADMIN_PASS) { toast('Incorrect admin password.', 'err', '🔒'); return; }
      admAuthed = true;
    }
    renderAdm('dash');
    var ov = document.getElementById('nvAdmOv');
    ov.style.display = 'flex';
    requestAnimationFrame(function () { ov.classList.add('show') });
  };

  function closeAdm() {
    var ov = document.getElementById('nvAdmOv');
    ov.classList.remove('show');
    setTimeout(function () { ov.style.display = 'none' }, 350);
  }
  document.getElementById('nvAdmX').addEventListener('click', closeAdm);
  document.getElementById('nvAdmOv').addEventListener('click', function (e) { if (e.target === e.currentTarget) closeAdm() });
  document.querySelectorAll('.nv-adm-tab').forEach(function (t) {
    t.addEventListener('click', function () {
      document.querySelectorAll('.nv-adm-tab').forEach(function (x) { x.classList.remove('on') });
      t.classList.add('on'); renderAdm(t.dataset.av);
    });
  });

  function renderAdm(view) {
    var body = document.getElementById('nvAdmBody');
    var inqs = DB.inquiries, users = DB.users;
    var pending = inqs.filter(function (i) { return i.status === 'pending' }).length;
    var reviewed = inqs.filter(function (i) { return i.status === 'reviewed' }).length;
    var contacted = inqs.filter(function (i) { return i.status === 'contacted' }).length;
    if (view === 'dash') {
      body.innerHTML =
        '<div class="nv-adm-stats">' +
        '<div class="nv-adm-stat"><div class="nv-adm-sn">' + inqs.length + '</div><div class="nv-adm-sl">Total Inquiries</div></div>' +
        '<div class="nv-adm-stat"><div class="nv-adm-sn" style="color:#856404">' + pending + '</div><div class="nv-adm-sl">Pending</div></div>' +
        '<div class="nv-adm-stat"><div class="nv-adm-sn" style="color:#0f5132">' + reviewed + '</div><div class="nv-adm-sl">Reviewing</div></div>' +
        '<div class="nv-adm-stat"><div class="nv-adm-sn" style="color:#084298">' + contacted + '</div><div class="nv-adm-sl">Contacted</div></div>' +
        '</div>' +
        '<div style="font-family:\'Syne\',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#9A9080;margin-bottom:.65rem">Recent Inquiries</div>' +
        inqTable(inqs.slice(0, 6));
    } else if (view === 'inq') {
      body.innerHTML =
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.9rem;flex-wrap:wrap;gap:.5rem">' +
        '<div style="font-family:\'Syne\',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#9A9080">' + inqs.length + ' inquiries</div>' +
        '<button onclick="nvExportCSV()" style="font-family:\'Syne\',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;background:#9A7B2F;color:#fff;border:none;padding:.38rem .9rem;border-radius:6px;cursor:pointer">⬇ Export CSV</button>' +
        '</div>' + inqTable(inqs);
    } else {
      body.innerHTML = '<div style="font-family:\'Syne\',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#9A9080;margin-bottom:.75rem">' + users.length + ' users</div>' +
        (users.length === 0 ? '<div class="nv-adm-empty">No registered users yet.</div>' :
          users.map(function (u) {
            return '<div class="nv-adm-urow"><div><div class="nv-adm-un">' + u.firstName + ' ' + (u.lastName || '') + '</div><div class="nv-adm-ue">' + u.email + (u.company ? ' · ' + u.company : '') + '</div></div><div class="nv-adm-um">' + DB.myInquiries(u.email).length + ' inq.</div></div>';
          }).join(''));
    }
  }

  function inqTable(list) {
    if (!list.length) return '<div class="nv-adm-empty">No inquiries yet.</div>';
    return '<div style="overflow-x:auto"><table class="nv-tbl"><thead><tr><th>Ref</th><th>Name</th><th>Email</th><th>Product</th><th>Date</th><th>Status</th></tr></thead><tbody>' +
      list.map(function (inq) {
        var d = new Date(inq.at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        return '<tr>' +
          '<td style="font-family:\'Syne\',sans-serif;font-size:.68rem;font-weight:700;color:#9A7B2F;white-space:nowrap">' + inq.id + '</td>' +
          '<td>' + (inq.name || '—') + '</td>' +
          '<td style="font-size:.74rem">' + inq.email + '</td>' +
          '<td>' + (inq.product || '—') + '</td>' +
          '<td style="font-size:.71rem;white-space:nowrap">' + d + '</td>' +
          '<td><select class="nv-adm-sel" onchange="nvSetStatus(\'' + inq.id + '\',this.value)">' +
          '<option value="pending"' + (inq.status === 'pending' ? ' selected' : '') + '>⏳ Pending</option>' +
          '<option value="reviewed"' + (inq.status === 'reviewed' ? ' selected' : '') + '>🔍 Reviewing</option>' +
          '<option value="contacted"' + (inq.status === 'contacted' ? ' selected' : '') + '>✅ Contacted</option>' +
          '</select></td></tr>';
      }).join('') + '</tbody></table></div>';
  }

  window.nvSetStatus = function (id, status) {
    DB.setStatus(id, status);
    toast('Status updated to "' + status + '"', 'ok', '✅');
    var cur = document.querySelector('.nv-adm-tab.on');
    if (cur) renderAdm(cur.dataset.av);
  };
  window.nvExportCSV = function () {
    var rows = [['Ref ID', 'Name', 'Email', 'Company', 'Phone', 'Product', 'Quantity', 'Use For', 'Message', 'Status', 'Date']];
    DB.inquiries.forEach(function (i) {
      rows.push([i.id, i.name, i.email, i.company || '', i.phone || '', i.product, i.quantity || '', i.useFor || '', (i.message || '').replace(/,/g, ';'), i.status, new Date(i.at).toLocaleString('en-IN')]);
    });
    var csv = rows.map(function (r) { return r.map(function (c) { return '"' + c + '"' }).join(',') }).join('\n');
    var a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = 'naturea-inquiries-' + Date.now() + '.csv';
    a.click();
  };

  /* ═══════════════════ CONTACT FORM ═══════════════════ */
  function buildCF() {
    var sec = document.getElementById('contact');
    if (!sec) return;
    var old = sec.querySelector('form');
    if (!old) return;
    var s = DB.session;
    var prompt = s ? '' :
      '<div class="nv-cf-prompt">💡 <a onclick="openAuth(\'li\')">Sign in</a> or <a onclick="openAuth(\'su\')">create account</a> to track your inquiries automatically.</div>';
    old.outerHTML =
      '<div id="nvCFWrap">' + prompt +
      '<form class="nv-cf" id="nvCF" novalidate>' +
      '<div class="nv-cf-row">' +
      '<div class="nv-cf-g"><label class="nv-cf-l" for="cf_nm">Full Name *</label><input class="nv-cf-inp" id="cf_nm" type="text" placeholder="Your full name" value="' + (s ? (s.firstName + ' ' + s.lastName).trim() : '') + '"></div>' +
      '<div class="nv-cf-g"><label class="nv-cf-l" for="cf_em">Email Address *</label><input class="nv-cf-inp" id="cf_em" type="email" placeholder="you@company.com" value="' + (s ? s.email : '') + '"></div>' +
      '</div><div class="nv-cf-row">' +
      '<div class="nv-cf-g"><label class="nv-cf-l" for="cf_co">Company / Brand</label><input class="nv-cf-inp" id="cf_co" type="text" placeholder="Your company" value="' + (s && s.company ? s.company : '') + '"></div>' +
      '<div class="nv-cf-g"><label class="nv-cf-l" for="cf_ph">Phone Number</label><input class="nv-cf-inp" id="cf_ph" type="tel" placeholder="+91 98765 43210"></div>' +
      '</div><div class="nv-cf-row">' +
      '<div class="nv-cf-g"><label class="nv-cf-l" for="cf_pr">Product of Interest *</label><select class="nv-cf-sel" id="cf_pr"><option value="" disabled selected>Select a product</option><option>Chitosan</option><option>Mango Butter</option><option>Kokum Butter</option><option>All Products</option><option>Custom Blend</option></select></div>' +
      '<div class="nv-cf-g"><label class="nv-cf-l" for="cf_qt">Estimated Quantity</label><select class="nv-cf-sel" id="cf_qt"><option value="" disabled selected>Select quantity</option><option>Sample (100g–500g)</option><option>Small (1–10 kg)</option><option>Medium (10–100 kg)</option><option>Large (100 kg–1 MT)</option><option>Bulk (1 MT+)</option></select></div>' +
      '</div>' +
      '<div class="nv-cf-g"><label class="nv-cf-l" for="cf_use">Intended Use / Application</label><input class="nv-cf-inp" id="cf_use" type="text" placeholder="e.g. Skincare cream, shampoo formulation..."></div>' +
      '<div class="nv-cf-g"><label class="nv-cf-l" for="cf_msg">Message / Requirements *</label><textarea class="nv-cf-ta" id="cf_msg" placeholder="Tell us about your requirements, certifications needed, delivery timeline..."></textarea></div>' +
      '<button type="submit" class="nv-cf-sub" id="nvCFBtn"><div class="nv-spin"></div><span class="nv-cf-sub-t">Send Inquiry →</span></button>' +
      '</form>' +
      '<div class="nv-cf-done" id="nvCFDone"><span class="nv-cf-done-ico">✅</span><div class="nv-cf-done-t">Inquiry Submitted!</div><p class="nv-cf-done-s">Our team will contact you within <strong>24–48 business hours</strong>.</p><div class="nv-cf-done-ref" id="nvCFRef">REF: —</div><br><button class="nv-cf-again" onclick="buildCF()">Submit Another</button></div>' +
      '</div>';
    var form = document.getElementById('nvCF');
    if (form) form.addEventListener('submit', handleCF);
  }

  function handleCF(e) {
    e.preventDefault();
    function g(id) { var el = document.getElementById(id); return el ? el.value.trim() : '' }
    var nm = g('cf_nm'), em = g('cf_em');
    var pr = document.getElementById('cf_pr') ? document.getElementById('cf_pr').value : '';
    var msg = g('cf_msg');
    var ok = true;
    var ve = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    mark('cf_nm', !nm); if (!nm) ok = false;
    mark('cf_em', !ve); if (!ve) ok = false;
    mark('cf_pr', !pr); if (!pr) ok = false;
    mark('cf_msg', !msg); if (!msg) ok = false;
    if (!ok) { toast('Please fill all required fields.', 'err', '⚠️'); return; }
    var btn = document.getElementById('nvCFBtn');
    btn.classList.add('ld'); btn.disabled = true;
    var inq = DB.addInquiry({ name: nm, email: em, company: g('cf_co'), phone: g('cf_ph'), product: pr, quantity: g('cf_qt'), useFor: g('cf_use'), message: msg });
    sendEmail(inq);
    setTimeout(function () {
      btn.classList.remove('ld'); btn.disabled = false;
      var f = document.getElementById('nvCF'); if (f) f.style.display = 'none';
      var d = document.getElementById('nvCFDone'); if (d) d.style.display = 'block';
      var r = document.getElementById('nvCFRef'); if (r) r.textContent = 'REF: ' + inq.id;
      toast('Inquiry submitted! Ref: ' + inq.id, 'ok', '✅');
      var s = DB.session; if (s) setTimeout(function () { toast('View in My Inquiries →', 'info', '📬') }, 2500);
    }, 1400);
  }
  function mark(id, bad) { var el = document.getElementById(id); if (el) el.classList.toggle('bad', bad) }
  window.buildCF = buildCF;

  /* ═══════════════════ NAV BUILDERS ═══════════════════ */

  /* ── Main site nav ── */
  function buildMainNav() {
    var navActions = document.querySelector('.nav-actions');
    if (!navActions) return;
    /* Remove anything we injected before */
    navActions.querySelectorAll('.nv-nav-zone').forEach(function (el) { el.remove() });
    /* Hide original "Get a Quote" button */
    var origQuote = navActions.querySelector('.nav-quote');
    var menuBtn = navActions.querySelector('.nav-mob-btn') || navActions.querySelector('[aria-label="Menu"]');
    var s = DB.session;
    var zone = document.createElement('div');
    zone.className = 'nv-nav-zone';
    if (s) {
      var ini = (s.firstName || 'U')[0].toUpperCase();
      zone.innerHTML =
        '<div class="nv-dd">' +
        '<button class="nv-dd-btn"><div class="nv-av">' + ini + '</div>' + s.firstName + ' ▾</button>' +
        '<div class="nv-dd-menu">' +
        '<div class="nv-dd-top"><div class="nv-dd-name">' + s.firstName + ' ' + s.lastName + '</div><div class="nv-dd-email">' + s.email + '</div></div>' +
        '<div class="nv-dd-list">' +
        '<div class="nv-dd-item" onclick="openInqPanel()">📬 My Inquiries</div>' +
        '<div class="nv-dd-item" onclick="document.getElementById(\'contact\').scrollIntoView({behavior:\'smooth\'})">✉️ New Inquiry</div>' +
        '<div class="nv-dd-sep"></div>' +
        '<div class="nv-dd-item red" onclick="nvLogout()">🚪 Sign Out</div>' +
        '</div></div></div>';
      if (origQuote) origQuote.style.display = 'none';
    } else {
      zone.innerHTML =
        '<button class="nv-nav-li" onclick="openAuth(\'li\')">Login</button>' +
        '<button class="nv-nav-su" onclick="openAuth(\'su\')">Sign Up</button>';
      if (origQuote) origQuote.style.display = '';
    }
    if (menuBtn) navActions.insertBefore(zone, menuBtn);
    else navActions.appendChild(zone);
  }

  /* ── Product page navs — THE CORE FIX ── */
  function buildPPNavs() {
    var s = DB.session;
    /* Find ALL product page navs */
    document.querySelectorAll('.pp-nav').forEach(function (ppNav) {
      var right = ppNav.querySelector('.pp-nav-right');
      if (!right) return;

      /* Step 1: Hide hardcoded Login + Sign up buttons with !important */
      right.querySelectorAll('.pp-btn-login, .pp-btn-signup').forEach(function (b) {
        b.style.cssText = 'display:none!important;visibility:hidden!important;width:0!important;height:0!important;overflow:hidden!important;position:absolute!important;pointer-events:none!important';
      });

      /* Step 2: Remove old injected zone */
      right.querySelectorAll('.nv-pp-zone').forEach(function (z) { z.remove() });

      /* Step 3: Create new zone */
      var zone = document.createElement('div');
      zone.className = 'nv-pp-zone';
      if (s) {
        var ini = (s.firstName || 'U')[0].toUpperCase();
        zone.innerHTML =
          '<button class="nv-pp-user" onclick="openInqPanel()">' +
          '<div class="nv-pp-av">' + ini + '</div>' + s.firstName +
          '</button>';
      } else {
        zone.innerHTML =
          '<button class="nv-pp-li" onclick="openAuth(\'li\')">Login</button>' +
          '<button class="nv-pp-su" onclick="openAuth(\'su\')">Sign up</button>';
      }

      /* Step 4: Insert before the ✕ Back button */
      var closeBtn = right.querySelector('.pp-btn-close');
      if (closeBtn) right.insertBefore(zone, closeBtn);
      else right.appendChild(zone);
    });
  }

  /* ── Observe .pp elements so we fire buildPPNavs whenever one opens ── */
  function watchPPs() {
    function obs(el) {
      new MutationObserver(function () { buildPPNavs() })
        .observe(el, { attributes: true, attributeFilter: ['style', 'class'] });
    }
    document.querySelectorAll('.pp').forEach(obs);
    /* Also handle any openPP calls by patching window.openPP */
    var _orig = window.openPP;
    window.openPP = function (id) {
      if (_orig) _orig(id);
      /* fire after the page becomes visible */
      setTimeout(buildPPNavs, 30);
      setTimeout(buildPPNavs, 150);
    };
  }

  /* ═══════════════════ SESSION HUB ═══════════════════ */
  function onSession() {
    buildMainNav();
    buildPPNavs();
    buildCF();
  }

  /* ─── Secret admin: triple-click footer ─── */
  var _clicks = 0, _ct;
  document.addEventListener('click', function (e) {
    if (!document.querySelector('footer')?.contains(e.target)) return;
    _clicks++;
    clearTimeout(_ct);
    _ct = setTimeout(function () { _clicks = 0 }, 600);
    if (_clicks >= 3) { _clicks = 0; openAdmin(); }
  });

  /* ═══════════════════ INIT ═══════════════════ */
  function init() {
    buildMainNav();
    buildPPNavs();
    buildCF();
    watchPPs();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
