'use strict';
(()=>{
 const data=window.SOTA_TACTILE;if(!data)return;
 const ns='http://www.w3.org/2000/svg',instances=new Map();
 const clipName=v=>v.querySelector('source')?.getAttribute('src').split('/').pop().replace('.mp4','')||v.getAttribute('src')?.split('/').pop().replace('.mp4','');
 function color(value){const t=Math.max(0,Math.min(1,value/.25));const a=[126,138,127],b=[225,80,109];return `rgb(${a.map((c,i)=>Math.round(c+(b[i]-c)*t)).join(',')})`}
 function mount(video){
  let name=clipName(video),clip=data.clips[name];if(!clip)return;
  const panel=document.createElement('div');panel.className='tactile-panel';panel.setAttribute('aria-label','Recorded tactile signals synchronized to video');
  panel.innerHTML=`<div class="tactile-map"><svg viewBox="0 0 768 768" role="img" aria-label="Recorded activation across 202 tactile sensing points"><image href="assets/tactile-hand.png" width="768" height="768"/><g class="taxels"></g></svg></div><div class="tactile-trace"><div class="signal-label">RECORDED TOUCH <output class="signal-time">0.00 s</output></div><svg viewBox="0 0 240 76" preserveAspectRatio="none" role="img" aria-label="Maximum recorded taxel activation over the episode, with a playback cursor"><line x1="1" x2="239" y1="65" y2="65" stroke="#4b574a"/><path class="signal-path" fill="none" stroke="#e38496" stroke-width="1.5"/><line class="signal-cursor" x1="0" x2="0" y1="4" y2="66" stroke="#d9ed9d" stroke-width="1.5"/><circle class="signal-point" r="3" fill="#d9ed9d"/></svg><div class="signal-scale"><span>0</span><span class="color-ramp" aria-hidden="true"></span><span>≥0.25</span><span>activation</span></div><div class="signal-note">202 taxels · peak activation trace</div></div>`;
  if(video.closest('.hero-media'))video.closest('.hero-media').after(panel);else if(video.closest('.video-shell'))video.closest('.video-shell').after(panel);else video.after(panel);
  const svg=panel.querySelector('.tactile-map svg'),group=panel.querySelector('.taxels');
  const circles=data.xy.map(([x,y])=>{const c=document.createElementNS(ns,'circle');c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r','3.2');c.setAttribute('fill','#7e8a7f');group.append(c);return c});
  let peaks=[],last=-1;
  function load(){name=clipName(video);clip=data.clips[name];if(!clip)return;svg.style.transform=clip.side==='left'?'scaleX(-1)':'';peaks=clip.values.map(a=>Math.max(...a));const path=peaks.map((v,i)=>`${i?'L':'M'}${(i/(peaks.length-1)*238+1).toFixed(2)},${(65-Math.min(v,.25)/.25*59).toFixed(2)}`).join(' ');panel.querySelector('.signal-path').setAttribute('d',path);last=-1;draw(0)}
  function draw(time){const frame=Math.max(0,Math.min(clip.values.length-1,Math.floor(time*clip.fps+1e-4)));if(frame===last)return;last=frame;circles.forEach((c,j)=>c.setAttribute('fill',color(clip.values[frame][j])));const x=frame/(clip.values.length-1)*238+1;panel.querySelector('.signal-cursor').setAttribute('x1',x);panel.querySelector('.signal-cursor').setAttribute('x2',x);panel.querySelector('.signal-point').setAttribute('cx',x);panel.querySelector('.signal-point').setAttribute('cy',65-Math.min(peaks[frame],.25)/.25*59);panel.querySelector('output').textContent=(frame/clip.fps).toFixed(2)+' s';panel.dataset.frame=String(frame);panel.dataset.clip=name}
  if(video.requestVideoFrameCallback){const tick=(now,meta)=>{draw(meta.mediaTime);video.requestVideoFrameCallback(tick)};video.requestVideoFrameCallback(tick)}
  video.addEventListener('timeupdate',()=>draw(video.currentTime));video.addEventListener('seeked',()=>draw(video.currentTime));video.addEventListener('loadedmetadata',()=>draw(video.currentTime));load();instances.set(video,{load,panel});
 }
 document.querySelectorAll('video').forEach(mount);
 document.querySelectorAll('[data-video-select]').forEach(select=>select.addEventListener('change',()=>{const card=select.closest('.demo-card'),video=card.querySelector('video'),name=select.value;video.pause();video.querySelector('source').setAttribute('src',`assets/${name}.mp4`);video.poster=`assets/${name}.webp`;video.setAttribute('aria-label',select.selectedOptions[0].textContent+' successful evaluation');instances.get(video).load();video.load();card.querySelector('.demo-meta span').textContent=(name===select.dataset.videoSelect?'ID':'OOD')+' · SUCCESS'}));
})();
