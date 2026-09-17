'use strict';
(() => {
  const controls=[];
  document.querySelectorAll('select').forEach((select,index)=>{
    const label=select.closest('label');
    if(label){const replacement=document.createElement('div');replacement.className=label.className;label.replaceWith(replacement);while(label.firstChild)replacement.append(label.firstChild)}
    const wrapper=document.createElement('div');wrapper.className='custom-select';select.after(wrapper);
    const trigger=document.createElement('button');trigger.type='button';trigger.className='select-trigger';trigger.setAttribute('role','combobox');trigger.setAttribute('aria-label',select.getAttribute('aria-label')||'Choose an option');trigger.setAttribute('aria-haspopup','listbox');trigger.setAttribute('aria-expanded','false');
    const value=document.createElement('span');value.className='select-value';const chevron=document.createElement('span');chevron.className='select-chevron';chevron.setAttribute('aria-hidden','true');trigger.append(value,chevron);
    const list=document.createElement('div');list.className='select-list';list.id=`select-list-${index}`;list.setAttribute('role','listbox');list.setAttribute('aria-label',trigger.getAttribute('aria-label'));list.hidden=true;trigger.setAttribute('aria-controls',list.id);wrapper.append(trigger,list);
    const options=[...select.options].map((o,i)=>{const option=document.createElement('div');option.className='select-option';option.id=`select-option-${index}-${i}`;option.setAttribute('role','option');option.dataset.value=o.value;option.textContent=o.textContent;list.append(option);option.addEventListener('pointerdown',e=>e.preventDefault());option.addEventListener('click',()=>commit(i));return option});
    let active=select.selectedIndex,search='',searchTimer;
    const isOpen=()=>!list.hidden;
    function render(){value.textContent=select.selectedOptions[0].textContent;options.forEach((o,i)=>{o.setAttribute('aria-selected',String(i===select.selectedIndex));o.classList.toggle('highlighted',i===active)})}
    function close(){list.hidden=true;trigger.setAttribute('aria-expanded','false');trigger.removeAttribute('aria-activedescendant');wrapper.classList.remove('open')}
    function focusOption(i){active=Math.max(0,Math.min(options.length-1,i));render();trigger.setAttribute('aria-activedescendant',options[active].id);options[active].scrollIntoView({block:'nearest'})}
    function open(){controls.forEach(c=>c.close());list.hidden=false;wrapper.classList.add('open');trigger.setAttribute('aria-expanded','true');wrapper.classList.remove('open-up');const r=list.getBoundingClientRect();if(r.bottom>innerHeight&&wrapper.getBoundingClientRect().top>r.height)wrapper.classList.add('open-up');focusOption(select.selectedIndex)}
    function commit(i){select.value=select.options[i].value;select.dispatchEvent(new Event('change',{bubbles:true}));close();trigger.focus()}
    trigger.addEventListener('click',()=>isOpen()?close():open());
    trigger.addEventListener('keydown',event=>{
      const key=event.key;
      if(['ArrowDown','ArrowUp','Home','End','Enter',' ','Escape'].includes(key))event.preventDefault();
      if(key==='Escape'){close();return}if(key==='Tab'){close();return}
      if(key==='Enter'||key===' '){if(isOpen())commit(active);else open();return}
      if(key==='ArrowDown'||key==='ArrowUp'){if(!isOpen())open();else focusOption(active+(key==='ArrowDown'?1:-1));return}
      if(key==='Home'||key==='End'){if(!isOpen())open();focusOption(key==='Home'?0:options.length-1);return}
      if(key.length===1&&!event.ctrlKey&&!event.metaKey){clearTimeout(searchTimer);search+=key.toLowerCase();searchTimer=setTimeout(()=>search='',600);if(!isOpen())open();const i=select.options.length&&[...select.options].findIndex(o=>o.textContent.toLowerCase().startsWith(search));if(i>=0)focusOption(i)}
    });
    wrapper.addEventListener('focusout',event=>{if(!wrapper.contains(event.relatedTarget))close()});
    document.addEventListener('pointerdown',event=>{if(!wrapper.contains(event.target))close()});
    select.addEventListener('change',()=>{active=select.selectedIndex;render()});select.hidden=true;select.tabIndex=-1;select.setAttribute('aria-hidden','true');render();controls.push({close});
  });
})();
