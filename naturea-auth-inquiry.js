/**
 * NATURÉA — Full Auth + Inquiry System
 * Drop-in script: adds Login, Signup, Dashboard & Inquiry to existing site
 * Uses localStorage for persistence (no backend needed for GitHub Pages)
 */

(function(){
'use strict';

/* ═══════════════════════════════════════════
   1.  CSS INJECTION
═══════════════════════════════════════════ */
const CSS = `
/* ── Shared modal / overlay ── */
.nauth-overlay{
  position:fixed;inset:0;z-index:99000;
  background:rgba(15,12,8,.72);
  backdrop-filter:blur(6px);
  display:flex;align-items:center;justify-content:center;
  opacity:0;visibility:hidden;transition:opacity .35s,visibility .35s;
  padding:1rem;
}
.nauth-overlay.show{opacity:1;visibility:visible}

/* ── Modal card ── */
.nauth-modal{
  background:#fff;width:100%;max-width:460px;
  border-radius:16px;overflow:hidden;
  transform:translateY(28px) scale(.97);
  transition:transform .35s cubic-bezier(.25,.8,.25,1);
  box-shadow:0 32px 80px rgba(0,0,0,.28);
}
.nauth-overlay.show .nauth-modal{transform:none}

/* ── Modal header ── */
.nauth-modal-head{
  padding:2rem 2rem 1.2rem;
  border-bottom:1px solid rgba(154,123,47,.12);
  display:flex;align-items:center;justify-content:space-between;
}
.nauth-modal-logo{
  font-family:'Playfair Display',serif;font-size:1.1rem;
  font-weight:600;color:#181818;letter-spacing:.04em;
  display:flex;align-items:center;gap:.4rem;
}
.nauth-modal-logo span{color:#9A7B2F}
.nauth-modal-close{
  width:32px;height:32px;border-radius:50%;border:none;
  background:rgba(154,123,47,.08);color:#9A7B2F;
  font-size:1rem;cursor:pointer;transition:background .2s;
  display:flex;align-items:center;justify-content:center;
}
.nauth-modal-close:hover{background:rgba(154,123,47,.18)}

/* ── Tab switcher ── */
.nauth-tabs{
  display:flex;border-bottom:1px solid rgba(154,123,47,.12);
}
.nauth-tab{
  flex:1;padding:.85rem;font-family:'Syne',sans-serif;
  font-size:.72rem;font-weight:700;letter-spacing:.12em;
  text-transform:uppercase;background:none;border:none;
  color:#9A9080;cursor:pointer;transition:all .25s;
  border-bottom:2px solid transparent;position:relative;top:1px;
}
.nauth-tab.active{color:#9A7B2F;border-bottom-color:#9A7B2F}

/* ── Form body ── */
.nauth-body{padding:1.8rem 2rem 2rem}
.nauth-title{
  font-family:'Playfair Display',serif;font-size:1.45rem;
  font-weight:700;color:#181818;margin-bottom:.35rem;
}
.nauth-title em{font-style:italic;color:#B8962A}
.nauth-subtitle{
  font-family:'DM Sans',sans-serif;font-size:.83rem;
  color:#6B6457;line-height:1.65;margin-bottom:1.5rem;
}
.nauth-form{display:flex;flex-direction:column;gap:.85rem}
.nauth-field{display:flex;flex-direction:column;gap:.3rem}
.nauth-label{
  font-family:'Syne',sans-serif;font-size:.62rem;font-weight:700;
  letter-spacing:.18em;text-transform:uppercase;color:#6B6457;
}
.nauth-input{
  font-family:'DM Sans',sans-serif;font-size:.9rem;color:#181818;
  background:#F6F1E8;border:1.5px solid rgba(154,123,47,.18);
  padding:.82rem 1rem;border-radius:8px;outline:none;
  transition:border-color .25s,background .25s;
}
.nauth-input:focus{border-color:#9A7B2F;background:#fff}
.nauth-input.error{border-color:#e05a5a;background:#fff8f8}
.nauth-err{
  font-family:'DM Sans',sans-serif;font-size:.75rem;
  color:#e05a5a;margin-top:.1rem;display:none;
}
.nauth-err.show{display:block}
.nauth-row{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
.nauth-pw-wrap{position:relative}
.nauth-pw-wrap .nauth-input{padding-right:2.8rem}
.nauth-pw-toggle{
  position:absolute;right:.8rem;top:50%;transform:translateY(-50%);
  background:none;border:none;cursor:pointer;color:#9A9080;font-size:1rem;
  padding:.2rem;transition:color .2s;
}
.nauth-pw-toggle:hover{color:#9A7B2F}
.nauth-forgot{
  font-family:'DM Sans',sans-serif;font-size:.78rem;
  color:#9A7B2F;text-decoration:none;align-self:flex-end;
  margin-top:-.3rem;cursor:pointer;
}
.nauth-forgot:hover{text-decoration:underline}
.nauth-btn{
  font-family:'Syne',sans-serif;font-size:.76rem;font-weight:700;
  letter-spacing:.14em;text-transform:uppercase;
  background:#181818;color:#fff;border:none;
  padding:.95rem;border-radius:8px;cursor:pointer;
  transition:background .3s;margin-top:.3rem;
}
.nauth-btn:hover{background:#9A7B2F}
.nauth-btn:disabled{background:#ccc;cursor:not-allowed}
.nauth-divider{
  display:flex;align-items:center;gap:.8rem;
  font-family:'DM Sans',sans-serif;font-size:.75rem;color:#9A9080;
}
.nauth-divider::before,.nauth-divider::after{
  content:'';flex:1;height:1px;background:rgba(154,123,47,.15);
}
.nauth-social-btns{display:flex;gap:.7rem}
.nauth-social-btn{
  flex:1;display:flex;align-items:center;justify-content:center;gap:.5rem;
  font-family:'Syne',sans-serif;font-size:.68rem;font-weight:600;
  letter-spacing:.08em;text-transform:uppercase;
  background:#F6F1E8;border:1.5px solid rgba(154,123,47,.18);
  padding:.72rem;border-radius:8px;cursor:pointer;
  color:#181818;transition:all .25s;
}
.nauth-social-btn:hover{border-color:#9A7B2F;background:#fff}
.nauth-success-box{
  text-align:center;padding:1rem 0;display:none;
}
.nauth-success-icon{font-size:3rem;margin-bottom:.8rem;display:block}
.nauth-success-title{
  font-family:'Playfair Display',serif;font-size:1.3rem;
  font-weight:700;color:#181818;margin-bottom:.4rem;
}
.nauth-success-sub{
  font-family:'DM Sans',sans-serif;font-size:.85rem;
  color:#6B6457;line-height:1.65;
}

/* ── Toast notification ── */
.nauth-toast-wrap{
  position:fixed;top:1.2rem;right:1.2rem;z-index:99999;
  display:flex;flex-direction:column;gap:.5rem;
  pointer-events:none;
}
.nauth-toast{
  background:#181818;color:#fff;
  font-family:'DM Sans',sans-serif;font-size:.84rem;
  padding:.75rem 1.2rem;border-radius:8px;
  border-left:3px solid #9A7B2F;
  box-shadow:0 8px 24px rgba(0,0,0,.2);
  transform:translateX(120%);transition:transform .35s cubic-bezier(.25,.8,.25,1);
  display:flex;align-items:center;gap:.6rem;pointer-events:none;
  max-width:320px;
}
.nauth-toast.in{transform:translateX(0)}
.nauth-toast.success{border-left-color:#4CAF50}
.nauth-toast.error{border-left-color:#e05a5a}
.nauth-toast-icon{font-size:1rem;flex-shrink:0}

/* ── Nav user button ── */
.nauth-nav-user{
  display:flex;align-items:center;gap:.55rem;
  font-family:'Syne',sans-serif;font-size:.7rem;font-weight:600;
  letter-spacing:.1em;text-transform:uppercase;
  background:rgba(154,123,47,.1);color:#9A7B2F;
  border:1.5px solid rgba(154,123,47,.25);
  padding:.48rem 1rem;border-radius:30px;cursor:pointer;
  transition:all .25s;
}
.nauth-nav-user:hover{background:rgba(154,123,47,.18)}
.nauth-nav-avatar{
  width:26px;height:26px;border-radius:50%;
  background:#9A7B2F;color:#fff;
  font-family:'Playfair Display',serif;font-size:.85rem;font-weight:700;
  display:flex;align-items:center;justify-content:center;
}
.nauth-nav-login{
  font-family:'Syne',sans-serif;font-size:.7rem;font-weight:700;
  letter-spacing:.1em;text-transform:uppercase;
  background:none;border:1.5px solid rgba(24,24,24,.28);
  color:#181818;padding:.48rem 1rem;border-radius:30px;
  cursor:pointer;transition:all .25s;margin-right:.4rem;
}
.nauth-nav-login:hover{border-color:#9A7B2F;color:#9A7B2F}

/* ── Dashboard dropdown ── */
.nauth-dd-wrap{position:relative}
.nauth-dd{
  position:absolute;top:calc(100% + .5rem);right:0;
  background:#fff;border-radius:12px;
  border:1px solid rgba(154,123,47,.15);
  box-shadow:0 16px 48px rgba(0,0,0,.14);
  min-width:220px;overflow:hidden;
  opacity:0;visibility:hidden;transform:translateY(-8px);
  transition:all .25s;z-index:10000;
}
.nauth-dd-wrap:hover .nauth-dd,.nauth-dd-wrap.open .nauth-dd{
  opacity:1;visibility:visible;transform:none;
}
.nauth-dd-head{
  padding:1rem 1.2rem;border-bottom:1px solid rgba(154,123,47,.1);
  background:#F6F1E8;
}
.nauth-dd-name{
  font-family:'Playfair Display',serif;font-size:.95rem;
  font-weight:700;color:#181818;
}
.nauth-dd-email{
  font-family:'DM Sans',sans-serif;font-size:.72rem;
  color:#9A9080;margin-top:.1rem;
}
.nauth-dd-items{padding:.4rem 0}
.nauth-dd-item{
  display:flex;align-items:center;gap:.7rem;
  padding:.65rem 1.2rem;font-family:'DM Sans',sans-serif;
  font-size:.83rem;color:#2A2A2A;cursor:pointer;
  transition:background .2s;text-decoration:none;
}
.nauth-dd-item:hover{background:#F6F1E8}
.nauth-dd-item.danger{color:#e05a5a}
.nauth-dd-divider{height:1px;background:rgba(154,123,47,.1);margin:.3rem 0}

/* ── My Inquiries panel ── */
.ninq-overlay{
  position:fixed;inset:0;z-index:99500;
  background:rgba(15,12,8,.72);backdrop-filter:blur(6px);
  display:flex;align-items:stretch;justify-content:flex-end;
  opacity:0;visibility:hidden;transition:opacity .35s,visibility .35s;
}
.ninq-overlay.show{opacity:1;visibility:visible}
.ninq-panel{
  background:#fff;width:100%;max-width:520px;
  display:flex;flex-direction:column;
  transform:translateX(100%);transition:transform .4s cubic-bezier(.25,.8,.25,1);
  overflow:hidden;
}
.ninq-overlay.show .ninq-panel{transform:none}
.ninq-head{
  padding:1.5rem 1.8rem;border-bottom:1px solid rgba(154,123,47,.12);
  display:flex;align-items:center;justify-content:space-between;
  background:#F6F1E8;
}
.ninq-head-title{
  font-family:'Playfair Display',serif;font-size:1.2rem;
  font-weight:700;color:#181818;
}
.ninq-head-sub{
  font-family:'DM Sans',sans-serif;font-size:.78rem;
  color:#9A9080;margin-top:.15rem;
}
.ninq-close{
  width:34px;height:34px;border-radius:50%;border:none;
  background:rgba(154,123,47,.1);color:#9A7B2F;
  font-size:1.1rem;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
}
.ninq-close:hover{background:rgba(154,123,47,.2)}
.ninq-body{flex:1;overflow-y:auto;padding:1.5rem 1.8rem}
.ninq-empty{
  text-align:center;padding:3rem 1rem;
  font-family:'DM Sans',sans-serif;font-size:.88rem;color:#9A9080;
}
.ninq-empty-icon{font-size:2.5rem;display:block;margin-bottom:.8rem}
.ninq-card{
  border:1px solid rgba(154,123,47,.15);border-radius:10px;
  padding:1.2rem;margin-bottom:1rem;
  transition:box-shadow .25s;
}
.ninq-card:hover{box-shadow:0 4px 16px rgba(154,123,47,.1)}
.ninq-card-top{
  display:flex;align-items:flex-start;justify-content:space-between;
  margin-bottom:.7rem;
}
.ninq-card-product{
  font-family:'Playfair Display',serif;font-size:.95rem;
  font-weight:700;color:#181818;
}
.ninq-card-status{
  font-family:'Syne',sans-serif;font-size:.58rem;font-weight:700;
  letter-spacing:.14em;text-transform:uppercase;
  padding:.25rem .7rem;border-radius:30px;
}
.ninq-card-status.pending{background:#fff3cd;color:#856404}
.ninq-card-status.reviewed{background:#d1e7dd;color:#0f5132}
.ninq-card-status.contacted{background:#cfe2ff;color:#084298}
.ninq-card-row{
  display:flex;gap:1.5rem;margin-bottom:.5rem;
}
.ninq-card-field{
  display:flex;flex-direction:column;gap:.1rem;flex:1;
}
.ninq-card-lbl{
  font-family:'Syne',sans-serif;font-size:.56rem;font-weight:700;
  letter-spacing:.18em;text-transform:uppercase;color:#9A9080;
}
.ninq-card-val{
  font-family:'DM Sans',sans-serif;font-size:.82rem;color:#2A2A2A;
}
.ninq-card-msg{
  font-family:'DM Sans',sans-serif;font-size:.82rem;
  color:#6B6457;line-height:1.6;
  background:#F6F1E8;padding:.7rem .9rem;border-radius:6px;
  margin-top:.6rem;
}
.ninq-card-date{
  font-family:'DM Sans',sans-serif;font-size:.72rem;
  color:#9A9080;margin-top:.6rem;
}

/* ── Enhanced contact form ── */
.nform-enhanced{display:flex;flex-direction:column;gap:1rem}
.nform-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.nform-group{display:flex;flex-direction:column;gap:.3rem}
.nform-label{
  font-family:'Syne',sans-serif;font-size:.6rem;font-weight:700;
  letter-spacing:.2em;text-transform:uppercase;color:#6B6457;
}
.nform-input,.nform-select,.nform-textarea{
  font-family:'DM Sans',sans-serif;font-size:.88rem;color:#181818;
  background:#fff;border:1.5px solid rgba(154,123,47,.18);
  padding:.88rem 1rem;border-radius:8px;outline:none;
  transition:border-color .25s;
}
.nform-input:focus,.nform-select:focus,.nform-textarea:focus{
  border-color:#9A7B2F;
}
.nform-input.err,.nform-select.err,.nform-textarea.err{border-color:#e05a5a}
.nform-input::placeholder,.nform-textarea::placeholder{color:#c0b8a8}
.nform-textarea{resize:vertical;min-height:110px}
.nform-select{-webkit-appearance:none;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239A9080' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 1rem center}
.nform-row2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.nform-submit{
  font-family:'Syne',sans-serif;font-size:.76rem;font-weight:700;
  letter-spacing:.15em;text-transform:uppercase;
  background:#181818;color:#fff;border:none;
  padding:.95rem 2.5rem;border-radius:8px;cursor:pointer;
  transition:background .3s;align-self:center;margin-top:.4rem;
  display:flex;align-items:center;gap:.5rem;
}
.nform-submit:hover{background:#9A7B2F}
.nform-submit:disabled{background:#ccc;cursor:not-allowed}
.nform-submit .spinner{
  width:14px;height:14px;border:2px solid rgba(255,255,255,.3);
  border-top-color:#fff;border-radius:50%;
  animation:nspin .7s linear infinite;display:none;
}
@keyframes nspin{to{transform:rotate(360deg)}}
.nform-submit.loading .spinner{display:block}
.nform-submit.loading .nform-submit-text{opacity:.6}
.nform-success{
  text-align:center;padding:2.5rem 1rem;display:none;
}
.nform-success-icon{font-size:3rem;display:block;margin-bottom:.8rem}
.nform-success-title{
  font-family:'Playfair Display',serif;font-size:1.4rem;
  font-weight:700;color:#181818;margin-bottom:.5rem;
}
.nform-success-sub{
  font-family:'DM Sans',sans-serif;font-size:.85rem;
  color:#6B6457;line-height:1.7;margin-bottom:1.2rem;
}
.nform-success-inq-id{
  font-family:'Syne',sans-serif;font-size:.7rem;font-weight:700;
  letter-spacing:.15em;text-transform:uppercase;
  background:#F6F1E8;color:#9A7B2F;
  padding:.5rem 1.2rem;border-radius:30px;display:inline-block;
}
.nform-new-btn{
  font-family:'Syne',sans-serif;font-size:.7rem;font-weight:700;
  letter-spacing:.12em;text-transform:uppercase;
  background:none;border:1.5px solid rgba(154,123,47,.3);
  color:#9A7B2F;padding:.65rem 1.5rem;border-radius:8px;
  cursor:pointer;margin-top:.8rem;transition:all .25s;
}
.nform-new-btn:hover{background:rgba(154,123,47,.08)}
.nform-login-prompt{
  font-family:'DM Sans',sans-serif;font-size:.82rem;
  color:#6B6457;text-align:center;padding:.8rem;
  background:#F6F1E8;border-radius:8px;margin-bottom:.5rem;
}
.nform-login-prompt a{color:#9A7B2F;cursor:pointer;font-weight:600}

@media(max-width:600px){
  .nauth-modal{border-radius:12px 12px 0 0}
  .nauth-overlay{align-items:flex-end}
  .ninq-panel{max-width:100%}
  .nform-row,.nform-row2{grid-template-columns:1fr}
  .nauth-row{grid-template-columns:1fr}
}
`;

const styleEl = document.createElement('style');
styleEl.textContent = CSS;
document.head.appendChild(styleEl);

/* ═══════════════════════════════════════════
   2.  STORAGE HELPERS
═══════════════════════════════════════════ */
const DB = {
  getUsers(){ try{return JSON.parse(localStorage.getItem('naturea_users')||'[]')}catch{return[]} },
  saveUsers(u){ localStorage.setItem('naturea_users', JSON.stringify(u)) },
  getSession(){ try{return JSON.parse(localStorage.getItem('naturea_session')||'null')}catch{return null} },
  saveSession(s){ localStorage.setItem('naturea_session', JSON.stringify(s)) },
  clearSession(){ localStorage.removeItem('naturea_session') },
  getInquiries(){ try{return JSON.parse(localStorage.getItem('naturea_inquiries')||'[]')}catch{return[]} },
  saveInquiries(i){ localStorage.setItem('naturea_inquiries', JSON.stringify(i)) },

  addUser(user){
    const users = this.getUsers();
    if(users.find(u=>u.email.toLowerCase()===user.email.toLowerCase())) return false;
    users.push({ ...user, id: Date.now().toString(), createdAt: new Date().toISOString() });
    this.saveUsers(users);
    return true;
  },
  findUser(email, password){
    return this.getUsers().find(u=>u.email.toLowerCase()===email.toLowerCase() && u.password===password) || null;
  },
  addInquiry(inq){
    const inquiries = this.getInquiries();
    inquiries.unshift({ ...inq, id: 'INQ-'+Math.random().toString(36).substr(2,6).toUpperCase(), createdAt: new Date().toISOString(), status:'pending' });
    this.saveInquiries(inquiries);
    return inquiries[0].id;
  },
  getUserInquiries(email){
    return this.getInquiries().filter(i=>i.email.toLowerCase()===email.toLowerCase());
  }
};

/* ═══════════════════════════════════════════
   3.  TOAST SYSTEM
═══════════════════════════════════════════ */
const toastWrap = document.createElement('div');
toastWrap.className = 'nauth-toast-wrap';
document.body.appendChild(toastWrap);

function toast(msg, type='info', icon='🌿'){
  const t = document.createElement('div');
  t.className = `nauth-toast ${type}`;
  t.innerHTML = `<span class="nauth-toast-icon">${icon}</span>${msg}`;
  toastWrap.appendChild(t);
  requestAnimationFrame(()=>{ requestAnimationFrame(()=>t.classList.add('in')); });
  setTimeout(()=>{ t.classList.remove('in'); setTimeout(()=>t.remove(), 400); }, 3400);
}

/* ═══════════════════════════════════════════
   4.  AUTH MODAL HTML
═══════════════════════════════════════════ */
const authHTML = `
<div class="nauth-overlay" id="nauthOverlay">
  <div class="nauth-modal" id="nauthModal" role="dialog" aria-modal="true">
    <div class="nauth-modal-head">
      <div class="nauth-modal-logo">🌿 Natur<span>éa</span></div>
      <button class="nauth-modal-close" id="nauthClose" aria-label="Close">✕</button>
    </div>
    <div class="nauth-tabs">
      <button class="nauth-tab active" id="tabLogin" data-tab="login">Login</button>
      <button class="nauth-tab" id="tabSignup" data-tab="signup">Create Account</button>
    </div>

    <!-- LOGIN FORM -->
    <div class="nauth-body" id="panelLogin">
      <h2 class="nauth-title">Welcome <em>Back</em></h2>
      <p class="nauth-subtitle">Sign in to track your inquiries and manage your account.</p>
      <form class="nauth-form" id="loginForm" novalidate>
        <div class="nauth-field">
          <label class="nauth-label" for="loginEmail">Email Address</label>
          <input class="nauth-input" id="loginEmail" type="email" placeholder="you@company.com" autocomplete="email">
          <div class="nauth-err" id="loginEmailErr">Please enter a valid email address.</div>
        </div>
        <div class="nauth-field">
          <label class="nauth-label" for="loginPw">Password</label>
          <div class="nauth-pw-wrap">
            <input class="nauth-input" id="loginPw" type="password" placeholder="Your password" autocomplete="current-password">
            <button type="button" class="nauth-pw-toggle" data-target="loginPw">👁</button>
          </div>
          <div class="nauth-err" id="loginPwErr">Please enter your password.</div>
        </div>
        <a class="nauth-forgot" id="forgotLink">Forgot password?</a>
        <div class="nauth-err" id="loginGlobalErr" style="text-align:center;margin-top:.2rem"></div>
        <button type="submit" class="nauth-btn" id="loginBtn">Sign In →</button>
        <div class="nauth-divider">or continue with</div>
        <div class="nauth-social-btns">
          <button type="button" class="nauth-social-btn" onclick="nauthGoogleMock('login')">🇬 Google</button>
          <button type="button" class="nauth-social-btn" onclick="nauthLinkedInMock()">💼 LinkedIn</button>
        </div>
      </form>
    </div>

    <!-- SIGNUP FORM -->
    <div class="nauth-body" id="panelSignup" style="display:none">
      <h2 class="nauth-title">Create <em>Account</em></h2>
      <p class="nauth-subtitle">Join Naturéa to request samples and track your inquiries.</p>
      <form class="nauth-form" id="signupForm" novalidate>
        <div class="nauth-row">
          <div class="nauth-field">
            <label class="nauth-label" for="signupFirst">First Name</label>
            <input class="nauth-input" id="signupFirst" type="text" placeholder="First" autocomplete="given-name">
            <div class="nauth-err" id="signupFirstErr">Required.</div>
          </div>
          <div class="nauth-field">
            <label class="nauth-label" for="signupLast">Last Name</label>
            <input class="nauth-input" id="signupLast" type="text" placeholder="Last" autocomplete="family-name">
            <div class="nauth-err" id="signupLastErr">Required.</div>
          </div>
        </div>
        <div class="nauth-field">
          <label class="nauth-label" for="signupEmail">Business Email</label>
          <input class="nauth-input" id="signupEmail" type="email" placeholder="you@company.com" autocomplete="email">
          <div class="nauth-err" id="signupEmailErr">Enter a valid email address.</div>
        </div>
        <div class="nauth-field">
          <label class="nauth-label" for="signupCompany">Company / Brand</label>
          <input class="nauth-input" id="signupCompany" type="text" placeholder="Your company name">
        </div>
        <div class="nauth-field">
          <label class="nauth-label" for="signupPw">Password</label>
          <div class="nauth-pw-wrap">
            <input class="nauth-input" id="signupPw" type="password" placeholder="Min. 8 characters" autocomplete="new-password">
            <button type="button" class="nauth-pw-toggle" data-target="signupPw">👁</button>
          </div>
          <div class="nauth-err" id="signupPwErr">Password must be at least 8 characters.</div>
        </div>
        <div class="nauth-field">
          <label class="nauth-label" for="signupPw2">Confirm Password</label>
          <div class="nauth-pw-wrap">
            <input class="nauth-input" id="signupPw2" type="password" placeholder="Repeat password" autocomplete="new-password">
            <button type="button" class="nauth-pw-toggle" data-target="signupPw2">👁</button>
          </div>
          <div class="nauth-err" id="signupPw2Err">Passwords do not match.</div>
        </div>
        <div class="nauth-err" id="signupGlobalErr" style="text-align:center;margin-top:.2rem"></div>
        <button type="submit" class="nauth-btn" id="signupBtn">Create Account →</button>
        <div class="nauth-divider">or continue with</div>
        <div class="nauth-social-btns">
          <button type="button" class="nauth-social-btn" onclick="nauthGoogleMock('signup')">🇬 Google</button>
          <button type="button" class="nauth-social-btn" onclick="nauthLinkedInMock()">💼 LinkedIn</button>
        </div>
      </form>
      <div class="nauth-success-box" id="signupSuccess">
        <span class="nauth-success-icon">🎉</span>
        <div class="nauth-success-title">Account Created!</div>
        <p class="nauth-success-sub">Welcome to Naturéa. You're now signed in and can start submitting inquiries.</p>
      </div>
    </div>
  </div>
</div>`;

document.body.insertAdjacentHTML('beforeend', authHTML);

/* ═══════════════════════════════════════════
   5.  INQUIRIES PANEL HTML
═══════════════════════════════════════════ */
const inqPanelHTML = `
<div class="ninq-overlay" id="ninqOverlay">
  <div class="ninq-panel">
    <div class="ninq-head">
      <div>
        <div class="ninq-head-title">My Inquiries</div>
        <div class="ninq-head-sub">Track your sample requests and product inquiries</div>
      </div>
      <button class="ninq-close" id="ninqClose">✕</button>
    </div>
    <div class="ninq-body" id="ninqBody">
      <div class="ninq-empty" id="ninqEmpty">
        <span class="ninq-empty-icon">📬</span>
        <strong style="font-family:'Playfair Display',serif;font-size:1rem;display:block;margin-bottom:.4rem;color:#2A2A2A">No inquiries yet</strong>
        Submit a product inquiry from the Contact section to see it here.
      </div>
    </div>
  </div>
</div>`;

document.body.insertAdjacentHTML('beforeend', inqPanelHTML);

/* ═══════════════════════════════════════════
   6.  NAV INJECTION
═══════════════════════════════════════════ */
function buildNavUser(){
  const session = DB.getSession();
  // Find existing nav actions area
  const navActions = document.querySelector('.nav-actions') || document.querySelector('nav .nav-right') || document.querySelector('nav');
  if(!navActions) return;

  // Remove old auth buttons if any
  document.querySelectorAll('.nauth-nav-btn-wrap').forEach(el=>el.remove());

  const wrap = document.createElement('div');
  wrap.className = 'nauth-nav-btn-wrap';
  wrap.style.cssText = 'display:flex;align-items:center;gap:.5rem';

  if(session){
    const initials = (session.firstName||'U')[0].toUpperCase();
    const dd = document.createElement('div');
    dd.className = 'nauth-dd-wrap';
    dd.innerHTML = `
      <button class="nauth-nav-user" id="nauthUserBtn">
        <div class="nauth-nav-avatar">${initials}</div>
        ${session.firstName}
      </button>
      <div class="nauth-dd">
        <div class="nauth-dd-head">
          <div class="nauth-dd-name">${session.firstName} ${session.lastName||''}</div>
          <div class="nauth-dd-email">${session.email}</div>
        </div>
        <div class="nauth-dd-items">
          <a class="nauth-dd-item" onclick="openInqPanel()">📬 My Inquiries</a>
          <a class="nauth-dd-item" onclick="smoothToContact()">✉️ New Inquiry</a>
          <div class="nauth-dd-divider"></div>
          <a class="nauth-dd-item danger" onclick="nauthLogout()">🚪 Sign Out</a>
        </div>
      </div>`;
    wrap.appendChild(dd);
  } else {
    const loginBtn = document.createElement('button');
    loginBtn.className = 'nauth-nav-login';
    loginBtn.textContent = 'Login';
    loginBtn.onclick = ()=>openAuthModal('login');
    wrap.appendChild(loginBtn);
    const signupBtn = document.createElement('button');
    signupBtn.className = 'nav-quote';
    signupBtn.textContent = 'Sign Up';
    signupBtn.onclick = ()=>openAuthModal('signup');
    wrap.appendChild(signupBtn);
  }

  // Insert before menu icon or at end of nav actions
  const menuBtn = navActions.querySelector('.nav-mob-btn') || navActions.querySelector('[aria-label="Menu"]');
  if(menuBtn) navActions.insertBefore(wrap, menuBtn);
  else { navActions.style.gap='0.5rem'; navActions.appendChild(wrap); }
}

function smoothToContact(){
  const el = document.getElementById('contact');
  if(el){ el.scrollIntoView({behavior:'smooth'}); }
}

/* ═══════════════════════════════════════════
   7.  AUTH MODAL LOGIC
═══════════════════════════════════════════ */
function openAuthModal(tab='login'){
  const ov = document.getElementById('nauthOverlay');
  ov.style.display='flex';
  requestAnimationFrame(()=>ov.classList.add('show'));
  switchTab(tab);
  setTimeout(()=>{
    const inp = tab==='login'? document.getElementById('loginEmail') : document.getElementById('signupFirst');
    if(inp) inp.focus();
  }, 350);
}
window.openAuthModal = openAuthModal;

function closeAuthModal(){
  const ov = document.getElementById('nauthOverlay');
  ov.classList.remove('show');
  setTimeout(()=>ov.style.display='none', 380);
}

function switchTab(tab){
  document.querySelectorAll('.nauth-tab').forEach(t=>t.classList.toggle('active', t.dataset.tab===tab));
  document.getElementById('panelLogin').style.display = tab==='login' ? 'block' : 'none';
  document.getElementById('panelSignup').style.display = tab==='signup' ? 'block' : 'none';
}

// Tab clicks
document.querySelectorAll('.nauth-tab').forEach(t=>t.addEventListener('click',()=>switchTab(t.dataset.tab)));

// Close
document.getElementById('nauthClose').onclick = closeAuthModal;
document.getElementById('nauthOverlay').addEventListener('click',e=>{ if(e.target===e.currentTarget) closeAuthModal(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeAuthModal(); });

// Password toggles
document.querySelectorAll('.nauth-pw-toggle').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const inp = document.getElementById(btn.dataset.target);
    if(!inp) return;
    inp.type = inp.type==='password' ? 'text' : 'password';
    btn.textContent = inp.type==='password' ? '👁' : '🙈';
  });
});

/* ─── Forgot password ─── */
document.getElementById('forgotLink').addEventListener('click',()=>{
  toast('Password reset link sent to your email! (demo mode)', 'success', '📧');
});

/* ─── Login form ─── */
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const pw    = document.getElementById('loginPw').value;
  let valid   = true;

  // Validate
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  setErr('loginEmail','loginEmailErr',!emailOk); if(!emailOk) valid=false;
  setErr('loginPw','loginPwErr',!pw); if(!pw) valid=false;
  if(!valid) return;

  const btn = document.getElementById('loginBtn');
  btn.disabled=true; btn.textContent='Signing in…';

  setTimeout(()=>{
    const user = DB.findUser(email, pw);
    if(user){
      const session = {firstName:user.firstName,lastName:user.lastName,email:user.email,company:user.company};
      DB.saveSession(session);
      closeAuthModal();
      buildNavUser();
      toast(`Welcome back, ${user.firstName}! 🌿`, 'success', '✅');
    } else {
      document.getElementById('loginGlobalErr').textContent = 'Incorrect email or password. Please try again.';
      document.getElementById('loginGlobalErr').classList.add('show');
      btn.disabled=false; btn.textContent='Sign In →';
    }
  }, 900);
});

/* ─── Signup form ─── */
document.getElementById('signupForm').addEventListener('submit', function(e){
  e.preventDefault();
  const first   = document.getElementById('signupFirst').value.trim();
  const last    = document.getElementById('signupLast').value.trim();
  const email   = document.getElementById('signupEmail').value.trim();
  const company = document.getElementById('signupCompany').value.trim();
  const pw      = document.getElementById('signupPw').value;
  const pw2     = document.getElementById('signupPw2').value;
  let valid     = true;

  setErr('signupFirst','signupFirstErr',!first); if(!first) valid=false;
  setErr('signupLast','signupLastErr',!last); if(!last) valid=false;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  setErr('signupEmail','signupEmailErr',!emailOk); if(!emailOk) valid=false;
  setErr('signupPw','signupPwErr',pw.length<8); if(pw.length<8) valid=false;
  setErr('signupPw2','signupPw2Err',pw!==pw2); if(pw!==pw2) valid=false;
  if(!valid) return;

  const btn = document.getElementById('signupBtn');
  btn.disabled=true; btn.textContent='Creating account…';

  setTimeout(()=>{
    const ok = DB.addUser({firstName:first,lastName:last,email,company,password:pw});
    if(ok){
      // Auto-login
      DB.saveSession({firstName:first,lastName:last,email,company});
      document.getElementById('signupForm').style.display='none';
      document.getElementById('signupSuccess').style.display='block';
      setTimeout(()=>{
        closeAuthModal();
        buildNavUser();
        toast(`Account created! Welcome, ${first} 🎉`, 'success', '✅');
      }, 2000);
    } else {
      document.getElementById('signupGlobalErr').textContent = 'An account with this email already exists.';
      document.getElementById('signupGlobalErr').classList.add('show');
      btn.disabled=false; btn.textContent='Create Account →';
    }
  }, 1000);
});

function setErr(inputId, errId, show){
  document.getElementById(inputId).classList.toggle('error', show);
  document.getElementById(errId).classList.toggle('show', show);
}

/* ─── Social mock ─── */
window.nauthGoogleMock = function(mode){
  const firstName = ['Alex','Jordan','Morgan','Taylor','Casey'][Math.floor(Math.random()*5)];
  const lastName  = ['Smith','Patel','Johnson','Lee','Chen'][Math.floor(Math.random()*5)];
  const email     = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`;
  if(mode==='signup') DB.addUser({firstName,lastName,email,company:'',password:'google_oauth'});
  DB.saveSession({firstName,lastName,email,company:''});
  closeAuthModal();
  buildNavUser();
  toast(`Signed in with Google as ${firstName} 🌿`, 'success', '✅');
};
window.nauthLinkedInMock = function(){
  toast('LinkedIn OAuth coming soon! Use email signup for now.', 'info', '💼');
};

/* ─── Logout ─── */
window.nauthLogout = function(){
  DB.clearSession();
  buildNavUser();
  toast('You have been signed out. See you soon! 👋', 'info', '🌿');
};

/* ═══════════════════════════════════════════
   8.  INQUIRY PANEL LOGIC
═══════════════════════════════════════════ */
window.openInqPanel = function(){
  const session = DB.getSession();
  if(!session){ openAuthModal('login'); return; }
  renderInqPanel(session.email);
  const ov = document.getElementById('ninqOverlay');
  ov.style.display='flex';
  requestAnimationFrame(()=>ov.classList.add('show'));
};

function renderInqPanel(email){
  const inquiries = DB.getUserInquiries(email);
  const body      = document.getElementById('ninqBody');
  const empty     = document.getElementById('ninqEmpty');

  if(inquiries.length===0){
    empty.style.display='block';
    return;
  }
  empty.style.display='none';

  // Remove old cards
  body.querySelectorAll('.ninq-card').forEach(c=>c.remove());

  const statusMap = {pending:'pending',reviewed:'reviewed',contacted:'contacted'};
  const statusLabel = {pending:'Pending Review',reviewed:'Under Review',contacted:'Contacted'};

  inquiries.forEach(inq=>{
    const card = document.createElement('div');
    card.className = 'ninq-card';
    const d = new Date(inq.createdAt);
    const dateStr = d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
    const status = statusMap[inq.status]||'pending';
    card.innerHTML = `
      <div class="ninq-card-top">
        <div class="ninq-card-product">🌿 ${inq.product||'General Inquiry'}</div>
        <span class="ninq-card-status ${status}">${statusLabel[status]||'Pending'}</span>
      </div>
      <div class="ninq-card-row">
        <div class="ninq-card-field">
          <div class="ninq-card-lbl">Reference ID</div>
          <div class="ninq-card-val" style="font-family:'Syne',sans-serif;font-size:.75rem;font-weight:700;letter-spacing:.1em;color:#9A7B2F">${inq.id}</div>
        </div>
        <div class="ninq-card-field">
          <div class="ninq-card-lbl">Company</div>
          <div class="ninq-card-val">${inq.company||'—'}</div>
        </div>
        <div class="ninq-card-field">
          <div class="ninq-card-lbl">Quantity</div>
          <div class="ninq-card-val">${inq.quantity||'—'}</div>
        </div>
      </div>
      ${inq.message ? `<div class="ninq-card-msg">"${inq.message}"</div>`:''}
      <div class="ninq-card-date">📅 Submitted ${dateStr}</div>`;
    body.appendChild(card);
  });
}

function closeInqPanel(){
  const ov = document.getElementById('ninqOverlay');
  ov.classList.remove('show');
  setTimeout(()=>ov.style.display='none', 420);
}
document.getElementById('ninqClose').onclick = closeInqPanel;
document.getElementById('ninqOverlay').addEventListener('click',e=>{ if(e.target===e.currentTarget) closeInqPanel(); });

/* ═══════════════════════════════════════════
   9.  CONTACT FORM REPLACEMENT
═══════════════════════════════════════════ */
function replaceContactForm(){
  // Find the contact section
  const contactSec = document.getElementById('contact');
  if(!contactSec) return;

  // Find the existing form
  const oldForm = contactSec.querySelector('form');
  if(!oldForm) return;

  const session = DB.getSession();
  const loginPrompt = session ? '' : `
    <div class="nform-login-prompt">
      💡 <a onclick="openAuthModal('login')">Sign in</a> or <a onclick="openAuthModal('signup')">create an account</a> to track your inquiries automatically.
    </div>`;

  const newFormHTML = `
    <div class="nform-login-prompt-wrap">${loginPrompt}</div>
    <form class="nform-enhanced" id="nContactForm" novalidate>
      <div class="nform-row">
        <div class="nform-group">
          <label class="nform-label" for="cf_name">Full Name *</label>
          <input class="nform-input" id="cf_name" type="text" placeholder="Your full name" value="${session?(session.firstName+' '+(session.lastName||'')).trim():''}">
        </div>
        <div class="nform-group">
          <label class="nform-label" for="cf_email">Email Address *</label>
          <input class="nform-input" id="cf_email" type="email" placeholder="you@company.com" value="${session?session.email:''}">
        </div>
      </div>
      <div class="nform-row">
        <div class="nform-group">
          <label class="nform-label" for="cf_company">Company / Brand</label>
          <input class="nform-input" id="cf_company" type="text" placeholder="Your company" value="${session&&session.company?session.company:''}">
        </div>
        <div class="nform-group">
          <label class="nform-label" for="cf_phone">Phone Number</label>
          <input class="nform-input" id="cf_phone" type="tel" placeholder="+91 98765 43210">
        </div>
      </div>
      <div class="nform-row">
        <div class="nform-group">
          <label class="nform-label" for="cf_product">Product of Interest *</label>
          <select class="nform-select" id="cf_product">
            <option value="" disabled selected>Select a product</option>
            <option>Chitosan</option>
            <option>Mango Butter</option>
            <option>Kokum Butter</option>
            <option>All Products</option>
            <option>Custom Blend</option>
          </select>
        </div>
        <div class="nform-group">
          <label class="nform-label" for="cf_quantity">Estimated Quantity</label>
          <select class="nform-select" id="cf_quantity">
            <option value="" disabled selected>Select quantity</option>
            <option>Sample (100g – 500g)</option>
            <option>Small (1 kg – 10 kg)</option>
            <option>Medium (10 kg – 100 kg)</option>
            <option>Large (100 kg – 1 MT)</option>
            <option>Bulk (1 MT+)</option>
          </select>
        </div>
      </div>
      <div class="nform-group">
        <label class="nform-label" for="cf_use">Intended Use / Application</label>
        <input class="nform-input" id="cf_use" type="text" placeholder="e.g. Skincare cream, shampoo formulation...">
      </div>
      <div class="nform-group">
        <label class="nform-label" for="cf_message">Message / Requirements *</label>
        <textarea class="nform-textarea" id="cf_message" placeholder="Tell us about your requirements, certifications needed, delivery timeline..."></textarea>
      </div>
      <button type="submit" class="nform-submit" id="nContactSubmit">
        <div class="spinner"></div>
        <span class="nform-submit-text">Send Inquiry →</span>
      </button>
    </form>
    <div class="nform-success" id="nContactSuccess">
      <span class="nform-success-icon">✅</span>
      <div class="nform-success-title">Inquiry Submitted!</div>
      <p class="nform-success-sub">Thank you! Our team will review your inquiry and get back to you within <strong>24–48 business hours</strong>. You'll receive a confirmation on your registered email.</p>
      <div class="nform-success-inq-id" id="nContactInqId">REF: —</div>
      <br>
      <button class="nform-new-btn" onclick="resetContactForm()">Submit Another Inquiry</button>
    </div>`;

  oldForm.outerHTML = newFormHTML;

  // Attach submit handler
  const newForm = document.getElementById('nContactForm');
  if(newForm) newForm.addEventListener('submit', handleContactSubmit);
}

function handleContactSubmit(e){
  e.preventDefault();
  const name    = document.getElementById('cf_name').value.trim();
  const email   = document.getElementById('cf_email').value.trim();
  const company = document.getElementById('cf_company').value.trim();
  const phone   = document.getElementById('cf_phone').value.trim();
  const product = document.getElementById('cf_product').value;
  const qty     = document.getElementById('cf_quantity').value;
  const useFor  = document.getElementById('cf_use').value.trim();
  const message = document.getElementById('cf_message').value.trim();

  let valid = true;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  markField('cf_name', !name); if(!name) valid=false;
  markField('cf_email', !emailOk); if(!emailOk) valid=false;
  markField('cf_product', !product); if(!product) valid=false;
  markField('cf_message', !message); if(!message) valid=false;
  if(!valid){ toast('Please fill in all required fields.', 'error', '⚠️'); return; }

  const btn = document.getElementById('nContactSubmit');
  btn.classList.add('loading'); btn.disabled=true;

  setTimeout(()=>{
    const inqId = DB.addInquiry({name,email,company,phone,product,quantity:qty,useFor,message});
    btn.classList.remove('loading'); btn.disabled=false;

    document.getElementById('nContactForm').style.display='none';
    document.getElementById('nContactSuccess').style.display='block';
    document.getElementById('nContactInqId').textContent = 'REF: ' + inqId;
    toast(`Inquiry submitted! Reference: ${inqId}`, 'success', '✅');

    // If user is logged in, hint to view inquiries
    const session = DB.getSession();
    if(session){
      setTimeout(()=>toast('View your inquiry in My Inquiries →', 'info', '📬'), 2500);
    }
  }, 1400);
}

function markField(id, isErr){
  const el = document.getElementById(id);
  if(el) el.classList.toggle('err', isErr);
}

window.resetContactForm = function(){
  replaceContactForm();
  const session = DB.getSession();
  const newForm = document.getElementById('nContactForm');
  if(newForm) newForm.addEventListener('submit', handleContactSubmit);
};

/* ═══════════════════════════════════════════
   10.  PRODUCT PAGE SIGNUP BUTTONS
═══════════════════════════════════════════ */
function updateProductPageNavBtns(){
  document.querySelectorAll('.pp-btn-login').forEach(btn=>{
    btn.onclick = ()=>openAuthModal('login');
    btn.style.cursor='pointer';
  });
  document.querySelectorAll('.pp-btn-signup').forEach(btn=>{
    const session = DB.getSession();
    if(session){
      btn.textContent = session.firstName;
      btn.onclick = ()=>openInqPanel();
    } else {
      btn.textContent = 'Sign up';
      btn.onclick = ()=>openAuthModal('signup');
    }
    btn.style.cursor='pointer';
  });
}

/* ═══════════════════════════════════════════
   11.  INIT
═══════════════════════════════════════════ */
function init(){
  buildNavUser();
  replaceContactForm();
  updateProductPageNavBtns();

  // Re-run after product pages open
  const observer = new MutationObserver(()=>updateProductPageNavBtns());
  document.querySelectorAll('.pp').forEach(pp=>observer.observe(pp, {attributes:true, attributeFilter:['class']}));

  // Update contact form login prompt dynamically
  window.addEventListener('nauth_session_change', ()=>{
    replaceContactForm();
    const newForm = document.getElementById('nContactForm');
    if(newForm) newForm.addEventListener('submit', handleContactSubmit);
  });
}

// Wait for DOM
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
