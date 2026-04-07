
// Virtual map: 0=Hero,1=qp0,2-7=About subs,8=IL1,9=Projects,10=IL2,11=Creds,12=IL3,13=Contact
var VMAP = [
  's0',
  'qp0',
  's1','s1','s1','s1','s1','s1',
  'il1',
  's5',
  'il2',
  's6',
  'il3',
  's7'
];
var VNAV = [
  0, // s0
  0, // qp0

  1,1,1,1,1,1, // s1 subpages

  2, // il1
  2, // s5 (Projects)

  3, // il2
  3, // s6 (Credentials)

  4, // il3
  4  // s7 (Contact)
];
var TOTAL=14, cur=0, trans=false, wl=false, dark=false;

var ALL_IDS=['s0','qp0','s1','il1','s5','il2','s6','il3','s7'];
var nls=document.querySelectorAll('.nl');
var prog=document.getElementById('prog');
var ov=document.getElementById('ov');
var subctr=document.getElementById('subctr');
var s1track=document.getElementById('s1-track');

var SUBLBLS=['','','About · Me','About · The Work','I · DIABLO','II · Market Intelligence','III · Career Copilot','IV · Code Intelligence','','','','','',''];

function el(id){return document.getElementById(id)}

function updateUI(){
  prog.style.width=(cur/(TOTAL-1)*100)+'%';
  nls.forEach(function(n,j){n.classList.toggle('on',j===VNAV[cur]);});
  el('btnprev').style.opacity=cur===0?'0.2':'1';
  el('btnnext').style.opacity=cur===TOTAL-1?'0.2':'1';
  var lbl=SUBLBLS[cur]||'';
  subctr.textContent=lbl;
  subctr.style.opacity=lbl?'1':'0';
}

var il1State = 0; // 0=quote, 1=tech

function resetIL1(){
  il1State = 0;
  var q = document.getElementById('il1-quote');
  var t = document.getElementById('il1-tech');
  if(q){ q.style.opacity='1'; q.style.pointerEvents='all'; q.style.transform='translateY(0)'; }
  if(t){ t.style.opacity='0'; t.style.pointerEvents='none'; t.style.transform='translateY(40px)'; }
}

function showIL1Tech(){
  il1State = 1;
  var q = document.getElementById('il1-quote');
  var t = document.getElementById('il1-tech');
  if(q){ q.style.transition='opacity .5s,transform .5s'; q.style.opacity='0'; q.style.transform='translateY(-30px)'; q.style.pointerEvents='none'; }
  if(t){ t.style.transition='opacity .6s .15s,transform .6s .15s'; t.style.opacity='1'; t.style.transform='translateY(0)'; t.style.pointerEvents='all'; }
}

function toggleTech(card){
  var detail = card.querySelector('.il1-card-detail');
  var isOpen = card.classList.contains('open');
  document.querySelectorAll('.il1-card.open').forEach(function(c){
    c.classList.remove('open');
    c.querySelector('.il1-card-detail').style.maxHeight='0';
    c.querySelector('.il1-card-detail').style.opacity='0';
  });
  if(!isOpen){
    card.classList.add('open');
    detail.style.maxHeight='120px';
    detail.style.opacity='1';
  }
}

var il1State = 0;

function resetIL1(){
  il1State = 0;
  var q = document.getElementById('il1-quote');
  var t = document.getElementById('il1-tech');
  if(q){ q.style.transition='opacity .5s,transform .5s'; q.style.opacity='1'; q.style.pointerEvents='all'; q.style.transform='translateY(0)'; }
  if(t){ t.style.transition='opacity .4s,transform .4s'; t.style.opacity='0'; t.style.pointerEvents='none'; t.style.transform='translateY(40px)'; }
}

function showIL1Tech(){
  il1State = 1;
  var q = document.getElementById('il1-quote');
  var t = document.getElementById('il1-tech');
  if(q){ q.style.transition='opacity .5s,transform .5s'; q.style.opacity='0'; q.style.transform='translateY(-30px)'; q.style.pointerEvents='none'; }
  if(t){ t.style.transition='opacity .6s .15s,transform .6s .15s'; t.style.opacity='1'; t.style.transform='translateY(0)'; t.style.pointerEvents='all'; }
}

function toggleTech(card){
  var detail = card.querySelector('.il1-card-detail');
  var isOpen = card.classList.contains('open');
  document.querySelectorAll('.il1-card.open').forEach(function(c){
    c.classList.remove('open');
    c.querySelector('.il1-card-detail').style.maxHeight='0';
    c.querySelector('.il1-card-detail').style.opacity='0';
  });
  if(!isOpen){
    card.classList.add('open');
    detail.style.maxHeight='120px';
    detail.style.opacity='1';
  }
}


var il3FlickerTimer = null;

function startIL3Flicker(){
  stopIL3Flicker();
  function flicker(){
    // Switch to opposite of current mode
    var isDark = document.documentElement.getAttribute('data-mode') === 'dark';
    // Flicker to opposite
    document.documentElement.setAttribute('data-mode', isDark ? 'light' : 'dark');
    setTimeout(function(){
      // Hold for 1.8s then switch back
      document.documentElement.setAttribute('data-mode', isDark ? 'dark' : 'light');
    }, 5000);
    // Schedule next flicker in 6-7s
    il3FlickerTimer = setTimeout(flicker, 6000 + Math.random() * 1000);
  }
  il3FlickerTimer = setTimeout(flicker, 1500);
}

function stopIL3Flicker(){
  if(il3FlickerTimer){ clearTimeout(il3FlickerTimer); il3FlickerTimer = null; }
  // Restore actual dark state
  document.documentElement.setAttribute('data-mode', dark ? 'dark' : 'light');
}

function triggerFlip(){
  var cards=document.querySelectorAll('.flip-card');
  cards.forEach(function(c){
    c.style.animation='none';
    void c.offsetWidth;
    c.style.animation='';
  });
}

function goTo(i){
  if(trans||i===cur||i<0||i>=TOTAL)return;
  trans=true;
  var fid=VMAP[cur],tid=VMAP[i],dir=i>cur?1:-1;

  // Both in s1 — vertical sub-scroll only
  if(fid==='s1'&&tid==='s1'){
    s1track.style.transform='translateY(-'+((i-2)*(window.innerHeight-50))+'px)';
    cur=i; updateUI();
    if(cur===3) setTimeout(triggerFlip, 300);
    trans=false; return;
  }

  var fe=el(fid),te=el(tid);

  // Entering s1 — set sub position first
  if(tid==='s1'){
    var aboutStart = VMAP.indexOf('s1');
    var sub = Math.max(0, Math.min(5, i - aboutStart));
    s1track.style.transition='none';
    s1track.style.transform='translateY(-'+(sub*(window.innerHeight-50))+'px)';
    setTimeout(function(){s1track.style.transition='transform .65s cubic-bezier(0.76,0,0.24,1)';},100);
  }

  te.style.transition = 'none';

// 🔥 FORCE CLEAN START
  te.style.transform = '';
  te.style.left = '0';

  te.style.transform = (dir > 0 ? 'translateX(100%)' : 'translateX(-100%)');
  te.style.opacity = '1';

  te.classList.add('on');
  te.getBoundingClientRect();

  var ease='cubic-bezier(0.76,0,0.24,1)',d='.62s';
  fe.style.transition='transform '+d+' '+ease+',opacity '+d+' '+ease;
  te.style.transition ='transform '+d+' '+ease+',opacity '+d+' '+ease;
  fe.style.transform = 'translateX(' + (-dir * 0.28 * window.innerWidth) + 'px)'; 
  fe.style.opacity='0';
  te.style.transform='translateX(0)';

    cur=i; updateUI();
setTimeout(function(){
  fe.classList.remove('on');
  if(fid==='s7'){
  fe.style.transform='';
  fe.style.opacity='';
  fe.style.transition='';
}else{
  fe.style.cssText='';
}
  te.style.transition='';
  te.style.transform='';
  te.style.left='';
  if(cur===3) triggerFlip();
  if(fid==='il1') resetIL1();
  if(fid==='il3') stopIL3Flicker();
  if(tid==='il3') setTimeout(startIL3Flicker, 400);
  trans=false;
},660);
}

function next(){goTo(cur+1);}
function prev(){goTo(cur-1);}

function toggleMode(){
  dark=!dark;
  document.documentElement.setAttribute('data-mode',dark?'dark':'light');
  el('tlbl').textContent=dark?'DARK':'LIGHT';
  el('fname').textContent=dark?'© MMXXVI · Lucifer':'© MMXXVI · Siddhaarth Chandran';
  el('fbuilt').textContent=dark?'// forged where heaven cannot see':'Designed & built from nothing';
}

var CD=[
  {n:'I',title:'Google Data Analytics Professional Certificate',by:'Coursera · Google',date:'December 12, 2024',
   sub:'8-course certificate · Spreadsheets, SQL, Tableau, R',
   desc:'Completed all 8 Google-developed courses: Foundations, Ask Questions to Make Data-Driven Decisions, Prepare Data for Exploration, Process Data from Dirty to Clean, Analyze Data to Answer Questions, Share Data Through Visualization, Data Analysis with R Programming, and Capstone Case Study.',
   link:'https://coursera.org/verify/professional-cert/2M2NSFAO3VA0',verify:'2M2NSFAO3VA0'},
  {n:'II',title:'Databases and SQL for Data Science with Python',by:'IBM · Coursera',date:'December 25, 2024',
   sub:'Completed WITH HONORS',
   desc:'IBM-authorized course covering relational databases, SQL fundamentals, advanced SQL, Python DB-API, SQLite integration, and real-world datasets. Completed with honors. Verified by Coursera.',
   link:'https://coursera.org/verify/6NEKRIMMFOML',verify:'6NEKRIMMFOML'},
  {n:'III',title:'Oracle AI Autonomous Database 2025 Certified Professional',by:'Oracle University',date:'June 24, 2025',
   sub:'Oracle Certified Professional · Valid until June 24, 2027',
   desc:'OCP credential validating expertise in Oracle Cloud AI, autonomous database provisioning, ML integrations, and intelligent data management. Signed by Damien Carey, SVP Oracle University. ID: 101735026OADBC25CP.',
   link:'https://education.oracle.com',verify:'101735026OADBC25CP'},
  {n:'PUB',title:'Study on Quantum Computing',by:'IJIRSET · Vol. 13, Issue 11',date:'November 2024',
   sub:'Peer-reviewed research publication',
   desc:'Published research on quantum computing principles, architectures, and applications — quantum gates, superposition, entanglement, and implications for cryptography, optimization, and AI.',
   link:'https://www.ijirset.com',verify:'Vol. 13 · Issue 11'}
];

function openCert(i){
  var c=CD[i];
  el('ovn').textContent=c.date;
  el('ovt').textContent=c.title;
  el('ovq').textContent=c.sub;
  el('ovd').textContent=c.desc;
  el('ovtags').innerHTML='<span class="ovtag">'+c.verify+'</span>';
  var lnk=el('ovlnk');
  lnk.href=c.link;
  lnk.textContent=i===3?'View Publication ↗':'Verify Certificate ↗';
  ov.classList.add('on');
}
function closeOv(){ov.classList.remove('on');}

document.addEventListener('keydown',function(e){
  if(ov.classList.contains('on')){if(e.key==='Escape')closeOv();return;}
  if(e.key==='ArrowDown'||e.key===' '){e.preventDefault();next();}
  else if(e.key==='ArrowUp'){e.preventDefault();prev();}
});

function onW(e){
  if(ov.classList.contains('on'))return;
  if(wl||trans)return;var d=e.deltaY||0;
  if(Math.abs(d)<8)return;wl=true;
  // IL1 internal state intercept
  if(VMAP[cur]==='il1' && d>0 && il1State===0){
    showIL1Tech();
    setTimeout(function(){wl=false;},820);
    return;
  }
  if(VMAP[cur]==='il1' && d<0 && il1State===1){
    resetIL1();
    setTimeout(function(){wl=false;},820);
    return;
  }
  if(d>0)next();else prev();
  setTimeout(function(){wl=false;},820);
}
document.addEventListener('wheel',onW,{passive:true});
window.addEventListener('wheel',onW,{passive:true});

var ty=0;
document.addEventListener('touchstart',function(e){ty=e.touches[0].clientY;},{passive:true});
document.addEventListener('touchend',function(e){
  var d=ty-e.changedTouches[0].clientY;
  if(Math.abs(d)>44){if(d>0)next();else prev();}
},{passive:true});

// Nav clicks
document.querySelectorAll('.nl')[0].onclick=function(){goTo(0);};   // Hero
document.querySelectorAll('.nl')[1].onclick=function(){goTo(2);};   // About
document.querySelectorAll('.nl')[2].onclick=function(){goTo(9);};  // Projects
document.querySelectorAll('.nl')[3].onclick=function(){goTo(11);};  // Credentials
document.querySelectorAll('.nl')[4].onclick=function(){goTo(13);};  // Contact

// Project rows
var prows=document.querySelectorAll('.prow');
if(prows[0])prows[0].onclick=function(){goTo(4);};
if(prows[1])prows[1].onclick=function(){goTo(5);};
if(prows[2])prows[2].onclick=function(){goTo(6);};
if(prows[3])prows[3].onclick=function(){goTo(7);};

// Init
updateUI();
el('btnprev').style.opacity='0.2';
subctr.style.opacity='0';

