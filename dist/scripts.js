function menuInit(){const L=document.querySelector(".icon-menu"),A=document.querySelector(".footer__logo"),E=document.querySelector(".footer__socials");E&&A&&(A.style.width=getComputedStyle(E).width,getComputedStyle(E).width.onchange=()=>{A.style.width=getComputedStyle(E).width}),L&&document.addEventListener("click",function(s){s.target.closest(".icon-menu")&&(document.documentElement.classList.toggle("lock"),document.documentElement.classList.toggle("menu-open")),document.documentElement.classList.contains("menu-open")?(L.setAttribute("aria-label","Close the menu"),L.setAttribute("title","Close the menu"),!s.target.closest(".menu__body")&&!s.target.closest(".icon-menu")&&!s.target.closest(".header")&&(document.documentElement.classList.remove("lock"),document.documentElement.classList.remove("menu-open"))):(L.setAttribute("aria-label","Open the menu"),L.setAttribute("title","Open the menu"))}),document.addEventListener("keydown",function(s){"Escape"===s.key&&(document.documentElement.classList.remove("lock"),document.documentElement.classList.remove("menu-open"))});const a=document.querySelector(".header"),y=document.querySelectorAll("a[href]");if(y.length>0){let s=function(r){const m=r.target.getAttribute("href");if("#"===m&&r.preventDefault(),null===m||"#"!==m[0]||"#"===m)return;r.preventDefault();const p=document.querySelector(m.replace("#",".")).getBoundingClientRect().top+scrollY-a.offsetHeight;document.documentElement.classList.contains("menu-open")&&(document.documentElement.classList.remove("lock"),document.documentElement.classList.remove("menu-open")),window.scrollTo({top:p,behavior:"smooth"}),r.preventDefault()};y.forEach(r=>{r.addEventListener("click",s)})}let C=0;const w=()=>window.pageYOffset||document.documentElement.scrollTop,x=()=>a.classList.contains("hide");window.addEventListener("scroll",()=>{w()>C&&!x()&&w()>0?a.classList.add("hide"):w()<C&&x()&&a.classList.remove("hide"),C=w()});const b=document.querySelector("main");function k(){b.children[0].style.marginTop=getComputedStyle(a).height}b&&(k(),window.matchMedia("(max-width: 767px)").onchange=()=>{k()},window.matchMedia("(max-width: 1024px)").onchange=()=>{k()})}function formInit(){let L=document.querySelectorAll(".form");if(0===L.length)return;let A=document.querySelectorAll(".form__btn");!function E(s){const r=document.querySelectorAll(s);for(let g=0;g<r.length;g++){let $=function(e,n){navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)?e():n()};const p=r[g],h=p.querySelectorAll("option"),u=document.createElement("div"),v=document.createElement("div"),c=document.createElement("div");u.className="custom-select",v.className="custom-select__list custom-scrollbar",c.className="custom-select__current",c.setAttribute("tabindex","0"),u.append(c,v),p.after(u);const q=()=>{const e=document.querySelectorAll(".custom-select__item"),n=document.querySelector(".custom-select__current");u.classList.toggle("custom-select--show");for(let d=0;d<e.length;d++)e[d].classList.remove("focus"),u.classList.contains("custom-select--show")&&e[d].textContent===n.textContent&&e[d].classList.add("focus")},B=()=>{c.addEventListener("click",q)},H=()=>{c.addEventListener("click",q);for(let e=0;e<r.length;e++){let n=r[e];n.addEventListener("change",()=>{n.nextElementSibling.querySelector(".custom-select__current").textContent=n.value})}};((e,n)=>{let d="";for(let f=0;f<h.length;f++)d+=h[f].dataset.country_flag?`<div class="custom-select__item" data-value="${h[f].value}" data-country_flag_url="${h[f].dataset.country_flag}" style="--img-url: url('${h[f].dataset.country_flag}')" data-dial_code="${h[f].dataset.dial_code}" data-country_code="${h[f].dataset.country_code}"><span>${h[f].dataset.country_name}</span><span class="points">${h[f].text}</span></div>`:`<div class="custom-select__item" data-value="${h[f].value}"><span class="points">${h[f].text}</span></div>`;v.innerHTML=d,v.children[0].dataset.country_flag_url?(c.style=`--img-url: url('${v.children[0].dataset.country_flag_url}')`,c.dataset.value=v.children[0].dataset.value,c.textContent="+"+v.children[0].dataset.dial_code):c.innerHTML=`<span class="points">${v.children[0].textContent}</span>`,(()=>{const e=v.children;for(let n=0;n<e.length;n++){let d,f;if(e[n].dataset.country_flag_url?(d=e[n].getAttribute("data-value"),f="+"+e[n].dataset.dial_code):(d=e[n].getAttribute("data-value"),f=`<span class="points">${e[n].textContent}</span>`),(e[n].dataset.value===c.dataset.value||e[n].textContent===c.textContent)&&e[n].classList.add("active"),e[n].addEventListener("click",()=>{u.classList.remove("custom-select--show"),e[n].dataset.country_flag_url&&(c.style=`--img-url: url('${e[n].dataset.country_flag_url}')`,c.dataset.value=e[n].dataset.value),c.innerHTML=f,p.value=d;for(let t=0;t<e.length;t++)if(e[t].dataset.value===c.dataset.value){for(let o=0;o<e.length;o++)e[o].classList.remove("active"),e[o].classList.remove("focus");e[t].classList.add("active")}else if(e[t].textContent===c.textContent){for(let o=0;o<e.length;o++)e[o].classList.remove("active"),e[o].classList.remove("focus");e[t].classList.add("active")}}),document.hasFocus()&&c){const t=document.querySelectorAll(".custom-select__item");c.addEventListener("keydown",o=>{if(u.classList.contains("custom-select--show")){if(" "===o.key||"Enter"===o.key){o.preventDefault();for(let l=0;l<t.length;l++){if(t[l].classList.contains("focus")){for(let i=0;i<t.length;i++)t[i].classList.remove("active");t[l].classList.add("active"),c.innerHTML=`<span class="points">${t[l].textContent}</span>`,p.value=t[l].getAttribute("data-value"),t[l].classList.remove("focus")}u.classList.remove("custom-select--show")}}if("ArrowUp"===o.key||"ArrowDown"===o.key){o.preventDefault();for(let l=0;l<t.length;l++)t[l].classList.contains("focus")&&c.addEventListener("keyup",i=>{if(l>0){if("ArrowUp"===i.key){for(let _=0;_<t.length;_++)t[_].classList.contains("focus")&&t[_].classList.remove("focus");return t[l-1].classList.add("focus")}}else if(0===l&&"ArrowUp"===i.key)return;if(l<t.length-1){if("ArrowDown"===i.key){for(let _=0;_<t.length;_++)t[_].classList.contains("focus")&&t[_].classList.remove("focus");return t[l+1].classList.add("focus")}}else if(l===t.length-1&&"ArrowDown"===i.key)return})}if("Tab"===o.key&&o.preventDefault(),"Escape"===o.key){u.classList.remove("custom-select--show");for(let l=0;l<t.length;l++)t[l].classList.remove("focus")}}else if(!u.classList.contains("custom-select--show")){let l=c;if(" "===o.key){o.preventDefault();for(let i=0;i<t.length;i++)t[i].textContent===l.textContent&&t[i].classList.add("focus"),u.classList.add("custom-select--show")}if("ArrowUp"===o.key||"ArrowDown"===o.key){o.preventDefault();for(let i=0;i<t.length;i++)t[i].textContent===l.textContent&&t[i].classList.add("focus"),u.classList.add("custom-select--show")}}})}}})()})(),document.addEventListener("mouseup",e=>{if(!u.contains(e.target)){u.classList.remove("custom-select--show");const n=v.children;for(let d=0;d<n.length;d++)n[d].classList.remove("focus")}}),$(H,B)}}("select");const a=document.querySelector("#customerName"),y=document.querySelector("#customerEmail");function S(s){s.parentElement.classList.add("error"),s.classList.add("error")}function w(s){s.parentElement.classList.remove("error"),s.classList.remove("error")}document.querySelector("#phone"),a&&(a.addEventListener("input",function(){a.value.match(/[\d=+?/\\|*!$#@%^&()_~",<>\[\]{};:]/g)&&(a.value=a.value.replace(/[\d=+?/\\|*!$#@%^&()_~",<>\[\]{};:]/g,"")),a.value.match(/^[\s]/g)&&(a.value=a.value.replace(/^[\s]/g,""))}),a.addEventListener("blur",()=>{a.value.length>0&&(a.value.replace(/[\s]/g,"").length<2?S(a):a.value.replace(/[\s]/g,"").length>=2&&w(a),a.value=a.value.replace(/\s{2,1000}/g," "))})),y&&y.addEventListener("blur",()=>{y.value.length>0&&(function x(s){return!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(s.value)}(y)?S(y):y.value.length>=6&&w(y))});for(let s=0;s<L.length;s++)A[s].addEventListener("click",function(r){r.preventDefault(),0===b(L[s])&&D(L[s])});function b(s){const r=s.querySelectorAll("input");let m=0;return r.forEach(g=>{(g.value.length<1||g.classList.contains("error"))&&(S(g),m++)}),m}function D(s){let r=function k(s){let r=s.querySelectorAll("select, input, textarea"),m=s.querySelector(".iti__selected-dial-code"),g="";for(let p=0;p<r.length;p++){let h=r[p],u=h.name,v=h.value;v&&("Customer_phone"===u&&(v=m.textContent+" "+v),g+=(0===p?"":"&")+u+"="+v)}return g}(s);console.log(r),s.reset();let m=s.querySelector(".btn");const g=m.textContent;m.textContent="Thank You",setTimeout(function(){m.textContent=g},2e3)}}