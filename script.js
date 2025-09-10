const APP_VERSION = 'v1.3-imgs';
const $ = s=>document.querySelector(s);
const daysEl = $('#days');
const tabsEl = $('#tabs');
const planPick = $('#planPick');
const datePick = $('#datePick');
const saveFlag = $('#saveFlag');

function todayStr(){ const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` }
function keyBase(){ return `planner_${APP_VERSION}_${planPick.value}_${datePick.value||todayStr()}` }
function flashSaved(){ saveFlag.textContent='✔ salvo'; clearTimeout(window._t); window._t=setTimeout(()=>saveFlag.textContent=' ',1500); }

function ex(name, sets, reps, img){ return {name, sets, reps, img} }

// ===== Templates 4 dias =====
const T4 = [
  { title:"Upper A (Peito/Costas/Tríceps)", items:[
    ex("Supino inclinado (halteres)",4,"8–10","img/supino_inclinado.jpg"),
    ex("Remada curvada (barra)",4,"8–10","img/remada_curvada.jpg"),
    ex("Supino reto (halteres)",3,"8–10","img/supino_reto_halteres.jpg"),
    ex("Barra fixa / Puxada pronada",3,"6–10","img/barra_fixa.jpg"),
    ex("Crucifixo máquina / Crossover",3,"12","img/crucifixo.jpg"),
    ex("Tríceps testa (barra EZ)",3,"10–12","img/triceps_testa.jpg"),
    ex("Tríceps pulley (corda)",2,"12–15","img/triceps_pulley.jpg")
  ]},
  { title:"Lower A (Quadríceps/Glúteo + Core)", items:[
    ex("Agachamento livre / Spanish squat / Leg press",4,"6–8","img/agachamento.jpg"),
    ex("Leg press 45°",3,"10–12","img/leg_press.jpg"),
    ex("Passada (walking lunges)",3,"10 c/perna","img/passada.jpg"),
    ex("Mesa flexora",3,"12","img/mesa_flexora.jpg"),
    ex("Elevação panturrilha em pé",4,"15","img/panturrilha_pe.jpg"),
    ex("Panturrilha sentado",3,"20","img/panturrilha_sentado.jpg"),
    ex("Prancha (s)",3,"30–45s","img/prancha.jpg")
  ]},
  { title:"Upper B (Ombros/Costas/Bíceps)", items:[
    ex("Desenvolvimento ombros (halteres)",4,"8–10","img/desenvolvimento_ombros.jpg"),
    ex("Barra fixa supinada / Puxada fechada",3,"6–10","img/puxada_fechada.jpg"),
    ex("Remada unilateral (halter)",3,"10 c/braço","img/remada_unilateral.jpg"),
    ex("Elevação lateral",3,"12","img/elevacao_lateral.jpg"),
    ex("Face pull",3,"12","img/face_pull.jpg"),
    ex("Rosca direta (barra)",3,"8–10","img/rosca_direta.jpg"),
    ex("Rosca concentrada",2,"12","img/rosca_concentrada.jpg")
  ]},
  { title:"Lower B (Posterior/Glúteo + Core)", items:[
    ex("Levantamento terra (convencional/romeno)",4,"5–6","img/levantamento_terra.jpg"),
    ex("Bulgarian split squat",3,"8 c/perna","img/bulgarian_split.jpg"),
    ex("Cadeira flexora",3,"12","img/cadeira_flexora.jpg"),
    ex("Hip thrust",3,"10","img/hip_thrust.jpg"),
    ex("Panturrilha donkey / em pé",4,"15–20","img/panturrilha_donkey.jpg"),
    ex("Crunch com peso",3,"12","img/crunch_peso.jpg")
  ]}
];

// ===== Templates 3 dias =====
const T3 = [
  { title:"Full Body A", items:[
    ex("Supino reto (halteres)",4,"8–10","img/supino_reto_halteres.jpg"),
    ex("Agachamento livre / Leg press",4,"6–8","img/agachamento.jpg"),
    ex("Remada curvada (barra)",3,"8–10","img/remada_curvada.jpg"),
    ex("Barra fixa / Puxada",3,"6–10","img/barra_fixa.jpg"),
    ex("Elevação lateral",3,"12","img/elevacao_lateral.jpg"),
    ex("Tríceps testa",2,"10–12","img/triceps_testa.jpg"),
    ex("Rosca direta",2,"10","img/rosca_direta.jpg"),
    ex("Prancha (s)",3,"30–45s","img/prancha.jpg")
  ]},
  { title:"Full Body B", items:[
    ex("Supino inclinado (halteres)",4,"8–10","img/supino_inclinado.jpg"),
    ex("Levantamento terra (romeno)",4,"6–8","img/levantamento_terra.jpg"),
    ex("Passada / Bulgarian",3,"8–10 c/perna","img/bulgarian_split.jpg"),
    ex("Remada unilateral",3,"10 c/braço","img/remada_unilateral.jpg"),
    ex("Face pull",3,"12","img/face_pull.jpg"),
    ex("Rosca martelo",2,"12","img/rosca_martelo.jpg"),
    ex("Pulley tríceps",2,"12–15","img/triceps_pulley.jpg"),
    ex("Elevação de pernas",3,"12–15","img/elevacao_pernas.jpg")
  ]},
  { title:"Full Body C", items:[
    ex("Desenvolvimento ombros (halteres)",4,"8–10","img/desenvolvimento_ombros.jpg"),
    ex("Leg press 45°",4,"10–12","img/leg_press.jpg"),
    ex("Cadeira/mesa flexora",3,"12","img/mesa_flexora.jpg"),
    ex("Puxada pronada",3,"8–10","img/puxada_pronada.jpg"),
    ex("Crucifixo máquina",3,"12","img/crucifixo.jpg"),
    ex("Panturrilha em pé",4,"15–20","img/panturrilha_pe.jpg"),
    ex("Crunch com peso",3,"12","img/crunch_peso.jpg")
  ]}
];

// ===== Templates 5 dias =====
const T5 = JSON.parse(JSON.stringify(T4)).concat([
  { title:"Extra (Braços/Core/Cardio)", items:[
    ex("Supino pegada fechada (tríceps)",3,"6–8","img/supino_fechado.jpg"),
    ex("Dips (paralelas) / banco",3,"8–12","img/dips.jpg"),
    ex("Rosca barra EZ",3,"8–10","img/rosca_ez.jpg"),
    ex("Rosca martelo",2,"12","img/rosca_martelo.jpg"),
    ex("Panturrilha (livre)",3,"15–20","img/panturrilha_pe.jpg"),
    ex("Core circuito (prancha/leg raise)",2,"2–3 voltas","img/prancha.jpg"),
    ex("Cardio moderado ou HIIT",1,"20–30min","img/cardio.jpg")
  ]}
]);

const templates = {"3d":T3,"4d":T4,"5d":T5};

function save(){
  const data = [...daysEl.querySelectorAll('.day')].map(day=>({
    title: day.querySelector('h3').textContent,
    items: [...day.querySelectorAll('.ex')].map(ex=>({
      name: ex.querySelector('.name').value,
      target: ex.querySelector('.target').value,
      sets: [...ex.querySelectorAll('.set')].map(s=>({
        done: s.querySelector('input[type=checkbox]').checked,
        load: s.querySelector('.load').value,
        reps: s.querySelector('.reps').value,
        rpe: s.querySelector('.rpe').value
      })),
      notes: ex.querySelector('.notes').value
    }))
  }));
  localStorage.setItem(keyBase(), JSON.stringify(data));
  flashSaved();
}

function load(){
  const raw = localStorage.getItem(keyBase());
  if(!raw) return;
  try{
    const data = JSON.parse(raw);
    [...daysEl.querySelectorAll('.day')].forEach((day,i)=>{
      const d=data[i]; if(!d) return;
      day.querySelector('h3').textContent = d.title;
      [...day.querySelectorAll('.ex')].forEach((exEl,j)=>{
        const it=d.items[j]; if(!it) return;
        exEl.querySelector('.name').value = it.name;
        exEl.querySelector('.target').value = it.target||exEl.querySelector('.target').value;
        [...exEl.querySelectorAll('.set')].forEach((sEl,k)=>{
          const s=it.sets&&it.sets[k]; if(!s) return;
          sEl.querySelector('input[type=checkbox]').checked = !!s.done;
          sEl.querySelector('.load').value = s.load||'';
          sEl.querySelector('.reps').value = s.reps||'';
          sEl.querySelector('.rpe').value = s.rpe||'';
        });
        exEl.querySelector('.notes').value = it.notes||'';
      });
    });
  }catch(e){console.warn('Erro ao carregar',e)}
}

function buildEx(it){
  const sets = Number(String(it.sets).toString().split(' ')[0])||3;
  let setsHtml = '';
  for(let i=1;i<=sets;i++){
    setsHtml += `<label class="set badge">S${i} <input type="checkbox"/></label>
    <input class="load" type="number" placeholder="kg" inputmode="decimal" />
    <input class="reps" type="number" placeholder="reps" inputmode="numeric" />
    <input class="rpe" type="number" placeholder="RPE/RIR" inputmode="decimal" />`;
  }
  const imgTag = it.img ? `<img class="thumb" src="${it.img}" alt="${it.name}" onerror="this.style.display='none'"/>` : '';
  return `<div class="ex">${imgTag}
    <input class="name" type="text" value="${it.name}" />
    <input class="target" type="text" value="${it.reps}" />
    <span class="badge">séries: ${it.sets}</span>
    <button class="ghost" onclick="removeEx(this)">Remover</button>
    <div class="sets">${setsHtml}</div>
    <input class="notes opt" type="text" placeholder="Observações / dor / ajuste" />
  </div>`
}

function render(){
  tabsEl.innerHTML='';
  daysEl.innerHTML='';
  const plan = templates[planPick.value];
  plan.forEach((d,idx)=>{
    const t = document.createElement('button');
    t.className='tab'+(idx===0?' active':'');
    t.textContent = `Dia ${idx+1}`;
    t.addEventListener('click',()=>switchDay(idx));
    tabsEl.appendChild(t);

    const day = document.createElement('div');
    day.className='day';
    day.dataset.idx=idx;
    day.innerHTML = `<h3>${d.title}</h3>` + d.items.map(buildEx).join('') + `
      <div class="footer">
        <div class="hint">Dica: segure no topo da faixa de reps antes de subir a carga.</div>
        <div class="row">
          <button class="ghost" onclick="duplicateDay(${idx})">Duplicar dia</button>
          <button class="primary" onclick="save()">Salvar</button>
          <button class="ghost" id="toggleImgs">Mostrar/Ocultar imagens</button>
        </div>
      </div>`;
    daysEl.appendChild(day);
  });
  switchDay(0);
  load();
}

function switchDay(idx){
  [...tabsEl.children].forEach((el,i)=>el.classList.toggle('active',i===idx));
  [...daysEl.children].forEach((el,i)=>el.style.display = (i===idx?'block':'none'));
  const btn = document.querySelector('#toggleImgs');
  if(btn){ btn.onclick=()=>document.body.classList.toggle('hide-thumb'); }
}

function duplicateDay(idx){
  const d = daysEl.children[idx];
  const clone = d.cloneNode(true);
  clone.querySelectorAll('input').forEach(i=>{
    if(i.type==="checkbox") i.checked=false;
    else if(!i.classList.contains('name') && !i.classList.contains('target')) i.value='';
  });
  daysEl.appendChild(clone);
  const n = daysEl.children.length;
  const t = document.createElement('button'); t.className='tab'; t.textContent = `Dia ${n}`; t.onclick=()=>switchDay(n-1); tabsEl.appendChild(t);
  save();
}

function removeEx(btn){
  const ex = btn.closest('.ex'); ex.parentElement.removeChild(ex); save();
}

function exportCSV(){
  const data = JSON.parse(localStorage.getItem(keyBase())||'[]');
  if(!data.length){alert('Nada para exportar hoje.');return}
  const rows = [['data','plano','dia','exercicio','alvo','serie','feito','carga','reps','RPE','obs']];
  data.forEach((d,i)=>{
    d.items.forEach(it=>{
      it.sets.forEach((s,si)=>{
        rows.push([datePick.value||todayStr(), planPick.value, `Dia ${i+1}`, it.name, it.target, `S${si+1}`, s.done?'1':'0', s.load||'', s.reps||'', s.rpe||'', (it.notes||'').replace(/,/g,';')])
      })
    })
  })
  const csv = rows.map(r=>r.join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `treino_${planPick.value}_${datePick.value||todayStr()}.csv`;
  a.click();
}

// events
planPick.addEventListener('change', ()=>{render(); save()});
['input','change'].forEach(ev=>document.addEventListener(ev, e=>{ if(e.target.closest('.day')) save(); }));
document.getElementById('exportCsv').addEventListener('click', exportCSV);
document.getElementById('clearDay').addEventListener('click', ()=>{
  if(!confirm('Limpar todos os campos do dia atual?')) return;
  const idx=[...tabsEl.children].findIndex(t=>t.classList.contains('active'));
  const day=daysEl.children[idx];
  day.querySelectorAll('input').forEach(i=>{
    if(i.type==='checkbox') i.checked=false;
    else if(!i.classList.contains('name') && !i.classList.contains('target')) i.value='';
  });
  save();
});
document.getElementById('compactBtn').addEventListener('click', ()=>{ document.body.classList.toggle('compact'); });

(function(){
  datePick.value = todayStr();
  render();
})();
