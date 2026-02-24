document.addEventListener('DOMContentLoaded', async ()=>{
  const projects = await fetchProjects()

  // Populate hero carousel if present
  const hero = document.getElementById('hero-carousel')
  if(hero){
    hero.innerHTML = ''
    projects.slice(0,4).forEach((p, i)=>{
      const slide = document.createElement('div')
      slide.className = 'slide'
      const firstImg = (p.images && p.images[0]) || p.image || ''
      slide.innerHTML = `<img src="${firstImg}" alt="${escapeHtml(p.title)}"><div class="slide-caption"><strong>${escapeHtml(p.title)}</strong><p>${escapeHtml(p.description)}</p></div>`
      slide.addEventListener('click', ()=> openProjectModal(p))
      hero.appendChild(slide)
    })
    initCarousel(hero)
  }

  // Populate featured grid on index or full projects grid
  const grid = document.getElementById('projects') || document.getElementById('projects-grid')
  if(grid){
    grid.innerHTML = ''
    projects.forEach(p=>{
      const card = document.createElement('article')
      card.className = 'card'
      const thumb = (p.images && p.images[0]) || p.image || ''
      card.innerHTML = `<img class="thumb" src="${thumb}" alt="${escapeHtml(p.title)}" onerror="this.src='assets/placeholder.svg'"><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.description)}</p><div class="tags">${(p.tags||[]).join(' • ')}</div><p><button class="open" data-id="${escapeHtml(p.title)}">Details</button></p>`
      card.querySelector('button.open').addEventListener('click', ()=> openProjectModal(p))
      grid.appendChild(card)
    })
  }

  // Populate resume projects
  const resumeProjects = document.getElementById('resume-projects')
  if(resumeProjects){
    resumeProjects.innerHTML = ''
    projects.forEach(p=>{
      const proj = document.createElement('article')
      proj.className = 'resume-project'
      proj.innerHTML = `
        <h3>${escapeHtml(p.title)}</h3>
        <p><strong>${p.role||''}${p.year? ` | ${p.year}`:''}</strong></p>
        <p>${escapeHtml(p.long_description||p.description||'')}</p>
        <div class="resume-project-specs">${(p.tags||[]).map(t=>`<span>${escapeHtml(t)}</span>`).join('')}</div>
        ${p.outcome?`<p><strong>Outcome:</strong> ${escapeHtml(p.outcome)}</p>`:''}
      `
      resumeProjects.appendChild(proj)
    })
  }

  // Modal handling
  const modal = document.getElementById('modal')
  if(modal){
    modal.addEventListener('click', (e)=>{
      if(e.target.matches('[data-close]')) closeModal()
    })
  }

  function openProjectModal(p){
    const m = document.getElementById('modal')
    if(!m) return
    const content = m.querySelector('.modal-content')
    // Build project view: title, carousel, long description, specs, links
    const images = p.images && p.images.length ? p.images : (p.image ? [p.image] : [])
    let carouselHtml = ''
    if(images.length){
      carouselHtml = `
        <div class="proj-carousel">
          <div class="carousel-frame"><img src="${images[0]}" alt="${escapeHtml(p.title)}" data-fallback="assets/placeholder.svg"></div>
          <div class="carousel-controls">
            <button class="carousel-prev" aria-label="Previous">◀</button>
            <div class="carousel-dots">${images.map((_, i) => `<button class="dot ${i===0?'active':''}" data-idx="${i}"></button>`).join('')}</div>
            <button class="carousel-next" aria-label="Next">▶</button>
          </div>
        </div>
      `
    }

    content.innerHTML = `
      <header class="proj-header"><h3>${escapeHtml(p.title)}</h3><div class="proj-meta">${p.year?escapeHtml(p.year):''} ${p.role? ' • '+escapeHtml(p.role):''}</div></header>
      ${carouselHtml}
      <div class="proj-body">
        <p class="proj-desc">${escapeHtml(p.long_description||p.description||'')}</p>
        <dl class="proj-specs">
          ${(p.specs? Object.entries(p.specs).map(([k,v])=>`<dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd>`).join('') : '')}
        </dl>
        <p><strong>Outcome:</strong> ${escapeHtml(p.outcome||'')}</p>
        <p class="proj-links"><a href="${p.link||'#'}" target="_blank">Project link</a> ${p.repo? '• <a href="'+p.repo+'" target="_blank">Repo</a>':''}</p>
      </div>
    `

    // setup carousel controls
    if(images.length){
      const frame = content.querySelector('.carousel-frame img')
      const prev = content.querySelector('.carousel-prev')
      const next = content.querySelector('.carousel-next')
      const dots = content.querySelectorAll('.carousel-dots .dot')
      let idx = 0
      function show(i){
        idx = (i+images.length)%images.length
        const src = images[idx]
        frame.src = src
        frame.onerror = ()=> { frame.src = 'assets/placeholder.svg' }
        dots.forEach((d,di) => d.classList.toggle('active', di===idx))
      }
      prev.addEventListener('click', ()=> show(idx-1))
      next.addEventListener('click', ()=> show(idx+1))
      dots.forEach(d => d.addEventListener('click', ()=> show(parseInt(d.dataset.idx,10))))
      // keyboard navigation
      function keynav(e){ if(e.key==='ArrowLeft') show(idx-1); if(e.key==='ArrowRight') show(idx+1); if(e.key==='Escape') closeModal() }
      document.addEventListener('keydown', keynav)
      // cleanup when modal closed
      const cleanup = ()=> document.removeEventListener('keydown', keynav)
      m._cleanup = cleanup
    }

    m.setAttribute('aria-hidden','false')
    m.classList.add('open')
  }

  function closeModal(){
    const m = document.getElementById('modal')
    if(!m) return
    if(m._cleanup) try{ m._cleanup() }catch(e){}
    m.setAttribute('aria-hidden','true')
    m.classList.remove('open')
  }

  // Contact form handler
  const form = document.getElementById('contact-form')
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault()
      const formData = new FormData(form)
      const data = Object.fromEntries(formData)
      // Use fetch to submit to Formspree
      fetch(form.action, {
        method: 'POST',
        headers: {'Accept': 'application/json'},
        body: formData
      }).then(r=>{
        if(r.ok){
          const status = document.getElementById('form-status')
          if(status){
            status.textContent = 'Message sent! I\'ll get back to you soon.'
            status.style.display = 'block'
            status.style.color = '#4ade80'
          }
          form.reset()
          setTimeout(()=>{ if(status) status.style.display = 'none' }, 5000)
        }
      }).catch(e=>{
        console.error('Form submit error:', e)
        const status = document.getElementById('form-status')
        if(status){
          status.textContent = 'Error sending message. Please try emailing zackdell@pm.me directly.'
          status.style.display = 'block'
          status.style.color = '#f87171'
        }
      })
    })
  }

  function initCarousel(container){
    const slides = Array.from(container.querySelectorAll('.slide'))
    if(!slides.length) return
    let idx = 0
    slides.forEach((s,i)=> s.style.transform = `translateX(${i*100}%)`)
    setInterval(()=>{
      idx = (idx+1) % slides.length
      slides.forEach((s,i)=> s.style.transform = `translateX(${(i-idx)*100}%)`)
    }, 3500)
  }

  // Background overlay: navy -> black as you scroll
  const overlay = document.querySelector('.bg-overlay')
  if(overlay){
    const update = ()=>{
      const doc = document.documentElement
      const scrollTop = window.scrollY || window.pageYOffset
      const max = Math.max(1, doc.scrollHeight - window.innerHeight)
      let t = Math.min(1, scrollTop / max)
      // ease a bit
      t = Math.pow(t, 1.2)
      overlay.style.opacity = String(t)
    }
    update()
    window.addEventListener('scroll', update, {passive:true})
    window.addEventListener('resize', update)
  }

  async function fetchProjects(){
    try{
      const r = await fetch('./projects.json')
      if(!r.ok) throw new Error('network')
      return await r.json()
    }catch(e){
      console.error('Failed loading projects', e)
      return []
    }
  }

  function escapeHtml(s){return String(s).replace(/[&<>"']/g, c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"
  }[c]))}

})
