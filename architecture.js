'use strict';
(()=>{
 const figure=document.querySelector('.architecture-graphic');
 const captions={pretrain:'Pre-training: human and robot observations supervise task-phase prediction. The action branch is frozen and receives no action supervision.',finetune:'Fine-tuning: human and robot observations supervise the auxiliary phase objective. Robot demonstrations additionally supervise action prediction through flow matching; human data does not contribute to the action loss.',inference:'Inference: robot observations and the task prompt condition the action expert. Human demonstrations and the auxiliary language branch are not used.'};
 document.querySelectorAll('[data-architecture-stage]').forEach(button=>button.addEventListener('click',()=>{const stage=button.dataset.architectureStage;figure.dataset.stage=stage;document.querySelectorAll('[data-architecture-stage]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});document.querySelector('#architecture-stage-caption').textContent=captions[stage]}));
})();
