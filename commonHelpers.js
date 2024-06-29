import{a as y,S as b,i as l}from"./assets/vendor-5f0e12e0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const w="https://pixabay.com/api/";async function p(n,t){try{return await y.get(w,{params:{key:"44688372-c4a6370de5fd27ba7998065cb",q:n,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:"40",page:t}})}catch(o){console.log(o)}}function c(n,t){n.classList.toggle("hidden",!t)}function g(n){return n.map(({webformatURL:t,largeImageURL:o,tags:a,likes:e,views:r,comments:i,downloads:h})=>`
    <a href="${o}" class="card-link js-card-link">
     <div class="photo-card">
      <img src="${t}" class="card-img"  alt="${a}" loading="lazy" />
       <div class="info">
        <p class="info-item">
            <b>Likes: ${e}</b>
        </p>
        <p class="info-item">
        <b>Views: ${r}</b>
        </p>
        <p class="info-item">
            <b>Comments: ${i}</b>
        </p>
        <p class="info-item">
            <b>Downloads: ${h}</b>
        </p>
    </div>
</div>
</a>`).join("")}function L(){const{height:n}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:n*2,behavior:"smooth"})}const s={form:document.querySelector("#search-form"),input:document.querySelector("input"),gallery:document.querySelector(".gallery"),loadBtn:document.querySelector(".js-load-btn")};s.form.addEventListener("submit",v);s.loadBtn.addEventListener("click",q);c(s.loadBtn,!1);const m=new b(".js-gallery a",{captionDelay:250,captionsData:"alt"});let u="",d=1;async function v(n){n.preventDefault(),c(s.loadBtn,!1);const t=s.input.value.trim().toLowerCase();if(!t){l.show({title:"Ops!",message:"Enter something to search!",position:"topRight"});return}if(u===t){l.show({title:"Sorry!",message:"Rewrite your requests, write something different.!",position:"topRight"});return}u=t,f();try{const o=await p(u,d),a=o.data.totalHits,e=o.data.hits;if(a===0){c(s.loadBtn,!1),l.show({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"});return}s.gallery.insertAdjacentHTML("afterbegin",g(e)),l.show({message:`Hooray! We found ${a} images.`,position:"topRight"}),c(s.loadBtn,!0),m.refresh()}catch(o){console.log(o),f()}}async function q(n){n.preventDefault(),d+=1;try{const t=await p(u,d),o=t.data.hits,a=t.data.totalHits;d<Math.ceil(a/40)||(l.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),c(s.loadBtn,!1)),s.gallery.insertAdjacentHTML("beforeend",g(o)),L(),m.refresh()}catch(t){console.log(t),f()}}function f(){s.gallery.innerHTML="",d=1}
//# sourceMappingURL=commonHelpers.js.map
