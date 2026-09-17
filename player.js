'use strict';
(()=>{
 const stamp=t=>{t=Number.isFinite(t)?Math.max(0,t):0;return `${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,'0')}`};
 document.querySelectorAll('video').forEach(video=>{
  const player=document.createElement('div');player.className='custom-player';video.before(player);player.append(video);
  const bar=document.createElement('div');bar.className='player-controls';
  bar.innerHTML='<button type="button" class="player-play" aria-label="Play video">▶</button><input class="player-seek" type="range" min="0" max="100" step="0.1" value="0" aria-label="Seek video"><output class="player-time">0:00 / 0:00</output><span class="player-speed" aria-label="Playback speed: two times">2x</span><button type="button" class="player-fullscreen" aria-label="Enter fullscreen"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 2H2v4m8-4h4v4M2 10v4h4m8-4v4h-4"/></svg></button><span class="player-error" role="status"></span>';
  player.append(bar);video.controls=false;video.defaultPlaybackRate=2;video.playbackRate=2;
  const play=bar.querySelector('.player-play'),seek=bar.querySelector('.player-seek'),time=bar.querySelector('.player-time'),full=bar.querySelector('.player-fullscreen'),error=bar.querySelector('.player-error');
  const lock=()=>{if(video.defaultPlaybackRate!==2)video.defaultPlaybackRate=2;if(video.playbackRate!==2)video.playbackRate=2};
  const update=()=>{const duration=Number.isFinite(video.duration)?video.duration:0;seek.disabled=!duration;seek.value=duration?video.currentTime/duration*100:0;seek.setAttribute('aria-valuetext',`${stamp(video.currentTime)} of ${stamp(duration)}`);time.textContent=`${stamp(video.currentTime)} / ${stamp(duration)}`;play.textContent=video.paused?'▶':'Ⅱ';play.setAttribute('aria-label',video.paused?'Play video':'Pause video')};
  async function toggle(){error.textContent='';if(video.paused){lock();try{await video.play()}catch(e){if(e.name!=='AbortError')error.textContent='Unable to play. Try again.'}}else video.pause()}
  play.addEventListener('click',toggle);video.addEventListener('click',toggle);
  seek.addEventListener('input',()=>{if(Number.isFinite(video.duration))video.currentTime=Number(seek.value)/100*video.duration;update()});
  full.addEventListener('click',async()=>{try{if(document.fullscreenElement===player)await document.exitFullscreen();else if(player.requestFullscreen)await player.requestFullscreen();else if(video.webkitEnterFullscreen)video.webkitEnterFullscreen()}catch{error.textContent='Fullscreen unavailable.'}});
  document.addEventListener('fullscreenchange',()=>full.setAttribute('aria-label',document.fullscreenElement===player?'Exit fullscreen':'Enter fullscreen'));
  ['play','pause','ended','timeupdate','loadedmetadata','durationchange','emptied'].forEach(event=>video.addEventListener(event,()=>{lock();update()}));
  video.addEventListener('ratechange',lock);video.addEventListener('error',()=>{error.textContent='Unable to load video.'});update();
 });
})();
