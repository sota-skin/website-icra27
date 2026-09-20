'use strict';
const tasks=[{name:'Box reorientation',conditions:['ID','OOD-1'],notes:['Training object','2.8× heavier'],indices:[0,1]},{name:'Cup picking',conditions:['ID','OOD-1','OOD-2'],notes:['Training object','Square base','Stack 21 mm higher'],indices:[2,3,4]},{name:'Plug insertion',conditions:['ID','OOD-1','OOD-2'],notes:['Training object','32 g heavier','109 g heavier'],indices:[5,6,7]}];
const methods={vision:{label:'Robot · Robot-only w/o Tactile',color:'#b98556',values:[20,0,13,11,4,0,1,0]},tactile:{label:'Robot · vision + touch',color:'#648fff',values:[27,13,18,7,1,7,0,0]},full:{label:'Human + robot · full method',color:'#c82775',values:[39,28,19,12,8,22,13,6]},robot_aux:{label:'Robot-only auxiliary',color:'#767d73',values:[40,21,9,6,3,13,1,0]},human_vision:{label:'Vision-only auxiliary',color:'#b2b9aa',values:[4,0,5,4,0,6,6,1]}};
const modes={cotrain:['tactile','full'],touch:['vision','tactile'],ablations:['tactile','full','robot_aux','human_vision']};
const takeaways={cotrain:'Full co-training improves every evaluated condition. The five OOD conditions are absent from both human and robot demonstrations.',touch:'Touch improves ID success on all three tasks. OOD effects are mixed: box performance improves, while cup performance decreases.',ablations:'The full method exceeds robot-only auxiliary training in all five OOD conditions. Vision-only auxiliary learning does not reproduce the gains.'};
let mode='touch';
function renderCharts(){
 const percent=document.querySelector('#chart-unit').value==='percent'; const keys=modes[mode];
 document.querySelector('#chart-legend').innerHTML=keys.map(k=>`<span class="legend-item"><span class="legend-swatch" style="--series-color:${methods[k].color}"></span>${methods[k].label}</span>`).join('');
 document.querySelector('#charts').innerHTML=tasks.map(t=>{
  const groupWidth=300/t.indices.length, bw=Math.min(29,(groupWidth-20)/keys.length);
  const bars=t.indices.map((idx,c)=>keys.map((k,j)=>{const m=methods[k],v=m.values[idx],x=25+c*groupWidth+groupWidth/2+(j-keys.length/2)*bw,y=205-v*4.3;return `<g><title>${t.name}, ${t.conditions[c]}: ${m.label}, ${v} of 40 successes</title><rect x="${x}" y="${y}" width="${bw-3}" height="${Math.max(v*4.3,1)}" fill="${m.color}"/><text x="${x+(bw-3)/2}" y="${y-7}" text-anchor="middle" font-size="${keys.length===4?11:14}">${percent?(v*2.5)+'%':v}</text></g>`}).join('')).join('');
  const grid=[0,10,20,30,40].map(v=>`<line x1="25" x2="325" y1="${205-v*4.3}" y2="${205-v*4.3}" stroke="#cbd2c2" stroke-width=".7"/><text x="19" y="${209-v*4.3}" text-anchor="end" font-size="11" fill="#65705d">${percent?v*2.5:v}</text>`).join('');
  const labels=t.conditions.map((c,i)=>`<text x="${25+groupWidth*(i+.5)}" y="228" text-anchor="middle" font-size="12">${c}</text><text x="${25+groupWidth*(i+.5)}" y="246" text-anchor="middle" font-size="11" fill="#65705d">${t.notes[i]}</text>`).join('');
  return `<article class="task-chart"><h3>${t.name}</h3><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 335 265" role="img" aria-label="${t.name} ${percent?'success rates':'successes out of 40'}; exact values available in the table below">${grid}${bars}${labels}</svg></article>`;
 }).join('');
 document.querySelector('#chart-takeaway').textContent=takeaways[mode];
}
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mode;document.querySelectorAll('[data-mode]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});renderCharts()}));
document.querySelector('#chart-unit').addEventListener('change',renderCharts);
document.querySelector('#data-rows').innerHTML=tasks.flatMap(t=>t.indices.map((idx,c)=>`<tr><th scope="row">${t.name} · ${t.conditions[c]}<br><small>${t.notes[c]}</small></th>${Object.keys(methods).map(k=>`<td>${methods[k].values[idx]} / 40</td>`).join('')}</tr>`)).join('');
renderCharts();
document.querySelector('#compare-play').addEventListener('click',async()=>{const videos=[...document.querySelectorAll('.comparison-video')];videos.forEach(v=>{v.pause();v.currentTime=0});await Promise.all(videos.map(v=>new Promise(resolve=>{if(v.readyState>=3)return resolve();v.addEventListener('canplay',resolve,{once:true});v.load()})));await Promise.allSettled(videos.map(v=>v.play()))});
// Playback is opt-in; respect reduced motion and avoid loading off-screen footage.
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)e.target.pause()}),{threshold:0.05});document.querySelectorAll('video').forEach(v=>observer.observe(v));
