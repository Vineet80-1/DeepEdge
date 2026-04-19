import { useEffect } from "react";

function GlobalStyles() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap";
    document.head.appendChild(link);

    const s = document.createElement("style");
    s.textContent = `
      *{cursor:crosshair!important;box-sizing:border-box;}
      body,html,#root{margin:0;padding:0;background:#000a00;overflow-x:hidden;}
      input,textarea,button{font-family:'Share Tech Mono',monospace!important;}
      ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#003311;border-radius:2px}
      .font-orb{font-family:'Orbitron',monospace}
      .font-mono{font-family:'Share Tech Mono',monospace}
      @keyframes scanl{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}
      @keyframes pdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
      @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
      @keyframes hflash{0%{background:rgba(255,0,60,.15)}100%{background:rgba(255,0,60,.4)}}
      @keyframes glitch{0%,90%,100%{clip-path:none;transform:none}91%{clip-path:polygon(0 20%,100% 20%,100% 40%,0 40%);transform:translateX(-4px);color:#00f5ff}93%{clip-path:polygon(0 60%,100% 60%,100% 80%,0 80%);transform:translateX(4px);color:#ff003c}95%{clip-path:none;transform:none}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
      @keyframes pulse-border{0%,100%{box-shadow:0 0 0 0 rgba(0,255,65,.4)}50%{box-shadow:0 0 0 4px rgba(0,255,65,.1)}}
      @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      @keyframes progress-fill{from{width:0%}to{width:var(--w)}}
      @keyframes type-cursor{0%,100%{opacity:1}50%{opacity:0}}
      .glitch{animation:glitch 5s linear infinite}
      .scanline::before{content:'';position:absolute;top:0;left:0;width:60%;height:2px;background:linear-gradient(90deg,transparent,rgba(0,255,65,.7),transparent);animation:scanl 3s linear infinite}
      .shimmer-bar::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);animation:shimmer 2s linear infinite}
      .hex-d{animation:hflash 1s ease infinite alternate}
      .fade-up{animation:fadeUp .5s ease both}
      .fade-up-1{animation:fadeUp .5s .1s ease both;opacity:0}
      .fade-up-2{animation:fadeUp .5s .2s ease both;opacity:0}
      .fade-up-3{animation:fadeUp .5s .3s ease both;opacity:0}
      .fade-up-4{animation:fadeUp .5s .4s ease both;opacity:0}
      .fade-up-5{animation:fadeUp .5s .5s ease both;opacity:0}
      .blink{animation:blink 1s step-end infinite}
      .float-anim{animation:float 4s ease-in-out infinite}
      .spin-slow{animation:spin-slow 8s linear infinite}
      .input-cyber{background:rgba(0,255,65,.04)!important;border:1px solid rgba(0,255,65,.25)!important;color:#00ff41!important;outline:none!important;transition:all .3s}
      .input-cyber:focus{border-color:rgba(0,255,65,.7)!important;box-shadow:0 0 0 2px rgba(0,255,65,.1),0 0 15px rgba(0,255,65,.15)!important;}
      .input-cyber::placeholder{color:rgba(0,255,65,.3)!important}
      .input-cyber:-webkit-autofill{-webkit-text-fill-color:#00ff41!important;-webkit-box-shadow:0 0 0 1000px #001a00 inset!important;}
      .btn-cyber{background:rgba(0,255,65,.08);border:1px solid rgba(0,255,65,.5);color:#00ff41;transition:all .3s;position:relative;overflow:hidden;}
      .btn-cyber::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(0,255,65,.12),transparent);transform:translateX(-100%);transition:transform .4s}
      .btn-cyber:hover::before{transform:translateX(100%)}
      .btn-cyber:hover{border-color:#00ff41;box-shadow:0 0 20px rgba(0,255,65,.3),inset 0 0 10px rgba(0,255,65,.05)}
      .btn-cyber:active{transform:scale(.98)}
      .panel-box{background:rgba(0,18,4,.9);border:1px solid rgba(0,255,65,.2);position:relative;overflow:hidden;}
      .panel-box::before{content:'';position:absolute;top:0;left:0;width:60%;height:2px;background:linear-gradient(90deg,transparent,rgba(0,255,65,.6),transparent);animation:scanl 3.5s linear infinite}
      .drop-zone{border:2px dashed rgba(0,255,65,.3);background:rgba(0,255,65,.03);transition:all .3s}
      .drop-zone:hover,.drop-zone.drag-over{border-color:rgba(0,255,65,.7);background:rgba(0,255,65,.07);box-shadow:0 0 20px rgba(0,255,65,.15)}
      .nav-link{color:rgba(0,255,65,.45);transition:all .2s;position:relative;}
      .nav-link:hover,.nav-link.active{color:#00ff41}
      .nav-link.active::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;background:#00ff41;box-shadow:0 0 6px #00ff41}
      .tag-animate{animation:fadeUp .3s ease both}
      /* Hide on mobile */
.hidden-mobile {
  display: flex;
}

/* Hide on desktop */
.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .hidden-mobile {
    display: none !important;
  }

  .mobile-only {
    display: block !important;
  }
}
    `;
    document.head.appendChild(s);
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(s);
    };
  }, []);
  return null;
}

export default GlobalStyles;
