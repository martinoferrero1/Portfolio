import { useEffect, useRef, useState } from 'react'
import portrait from '../assets/plates/portrait.png'

type Locale = 'en' | 'es'
type Theme = 'dark' | 'light'

const copy = {
  en: {
    navigation: ['Home', 'About', 'Projects', 'Skills', 'Contact'], navLabel: 'Main navigation', languageLabel: 'Choose language', lightTheme: 'Switch to light mode', darkTheme: 'Switch to dark mode', skip: 'Skip to content',
    role: 'Software Engineer · AI & Backend', explore: 'Explore my work',
    about: 'About me', aboutTitle: 'Hi, I’m Martino.', bio1: 'I’m a systems engineer from Tandil, Argentina, focused on backend development and artificial intelligence. I enjoy building innovative software that makes a meaningful, positive difference for the people who use it. I’m also drawn to entrepreneurship and bringing new ideas to life, which has led me to take part in several projects. I’m currently working on two of them.',
    bio2: 'Alongside these projects, I’m pursuing a PhD at INTIA–UNICEN, where I research the use of AI in medical image processing and other related areas.', cv: 'Download my CV', experience: 'Experience', education: 'Education',
    educationItems: ['PhD research in medical imaging and AI', 'Bachelor’s Degree in Systems Engineering', 'University Diploma in Artificial Intelligence'], educationStatus: ['INTIA · UNICEN — In progress', 'UNICEN — 2020–2025', 'UNICEN — 2025'],
    projects: 'Projects', selectedWork: 'Selected work', projectsIntro: 'A selection of projects across software, AI and research.', skills: 'Skills', tools: 'Tools I work with', skillsIntro: 'Technologies and practices from my work and research.',
    contact: 'Contact', contactTitle: 'Let’s get in touch.', contactIntro: 'Have a project, opportunity, or question in mind? I’d be glad to hear from you.', backToTop: 'Back to top', portraitAlt: 'Illustrated portrait of Martino Ferrero',
    projectTypes: ['Health technology · Founding engineer', 'Personal project · In development', 'Team project · In progress', 'Research · INTIA–UNICEN', 'University project'],
    projectDescriptions: [
      'A platform for the management, monitoring and diagnostic evaluation of people with Parkinson’s disease. I work on backend services and contribute to the integration of AI and computer vision for motor assessments.',
      'A platform for discovering personal style, with a conversational assistant that combines natural language, reference images and product search to help users explore garments and outfits.',
      'A project developed with a team of developers, focused on digitizing and automating processes in the quarry industry.',
      'A degree project exploring image processing and deep learning for lumbar spine segmentation on DXA images, with a cross-platform application for the workflow.',
      'A retrieval-augmented application for asking questions about PDF documents in natural language.',
    ], projectDetails: ['Part of IncuBAte. Neurollow was an invited startup at Crossing Over LATAM 2026.', 'The assistant is available in the beta; additional creation and catalog experiences are in development.', '', 'The work was accepted for presentation at SIPAIM 2025 and publication in IEEE Xplore.', ''], projectLinks: ['View repository'],
    experienceRoles: ['AI Backend Engineer', 'PhD Researcher', 'Founding Engineer', 'Algorithmic Trading Developer', 'Computer Vision & Deep Learning Developer'],
    experienceDescriptions: ['Backend services, LLM applications, cloud deployments and production AI workflows.', 'Research in artificial intelligence and medical image processing, including work related to bone health.', 'Backend engineering and AI integration for a Parkinson’s care platform.', 'Trading strategies and internal automation tools for financial clients.', 'Lumbar spine segmentation for osteoporosis assessment using DXA images.'], skillGroups: ['Languages', 'Backend', 'AI & machine learning', 'Data & infrastructure'],
  },
  es: {
    navigation: ['Inicio', 'Sobre mí', 'Proyectos', 'Habilidades', 'Contacto'], navLabel: 'Navegación principal', languageLabel: 'Elegir idioma', lightTheme: 'Cambiar a modo claro', darkTheme: 'Cambiar a modo oscuro', skip: 'Saltar al contenido',
    role: 'Ingeniero de software · IA y backend', explore: 'Ver mis proyectos',
    about: 'Un poco sobre mí', aboutTitle: 'Hola, soy Martino.', bio1: 'Soy ingeniero en sistemas, oriundo de Tandil, Argentina, y me enfoco en el desarrollo backend y la inteligencia artificial. Disfruto crear software innovador que genere un impacto positivo y tangible en las personas que lo usan. También me motiva emprender e impulsar ideas nuevas, algo que me llevó a participar en distintos proyectos. Actualmente trabajo en dos de ellos.',
    bio2: 'A la par de estos proyectos, estoy realizando un doctorado en INTIA–UNICEN, donde investigo el uso de inteligencia artificial para el procesamiento de imágenes médicas y otras áreas relacionadas.', cv: 'Descargar mi CV', experience: 'Experiencia', education: 'Formación',
    educationItems: ['Investigación doctoral en imágenes médicas e IA', 'Ingeniería de Sistemas', 'Diplomatura Universitaria en Inteligencia Artificial'], educationStatus: ['INTIA · UNICEN — En curso', 'UNICEN — 2020–2025', 'UNICEN — 2025'],
    projects: 'Proyectos', selectedWork: 'Proyectos destacados', projectsIntro: 'Una selección de proyectos de software, inteligencia artificial e investigación.', skills: 'Habilidades', tools: 'Tecnologías que utilizo', skillsIntro: 'Tecnologías y prácticas de mi trabajo y mi investigación.',
    contact: 'Contacto', contactTitle: 'Hablemos.', contactIntro: '¿Tenés un proyecto, una oportunidad o alguna consulta? Me gustaría conocerla.', backToTop: 'Volver arriba', portraitAlt: 'Retrato ilustrado de Martino Ferrero',
    projectTypes: ['Tecnología para la salud · Ingeniero fundador', 'Proyecto personal · En desarrollo', 'Proyecto en equipo · En curso', 'Investigación · INTIA–UNICEN', 'Proyecto universitario'],
    projectDescriptions: [
      'Plataforma para la gestión, el seguimiento y la evaluación diagnóstica de personas con enfermedad de Parkinson. Trabajo en servicios backend y en la integración de inteligencia artificial y visión por computadora para evaluar habilidades motoras.',
      'Plataforma para descubrir el estilo personal, con un asistente conversacional que combina lenguaje natural, imágenes de referencia y búsqueda de productos para explorar prendas y conjuntos.',
      'Proyecto realizado junto a un equipo de desarrollo para digitalizar y automatizar procesos de la industria de canteras.',
      'Trabajo final de carrera sobre procesamiento de imágenes y aprendizaje profundo para segmentar la columna lumbar en imágenes DXA, con una aplicación multiplataforma para ese flujo de trabajo.',
      'Aplicación con generación aumentada por recuperación (RAG) para hacer preguntas en lenguaje natural sobre documentos PDF.',
    ], projectDetails: ['Parte de IncuBAte. Neurollow fue una de las startups invitadas a Crossing Over LATAM 2026.', 'El asistente ya está disponible en la versión beta; se están desarrollando nuevas funciones de creación y catálogo.', '', 'El trabajo fue aceptado para su presentación en SIPAIM 2025 y su publicación en IEEE Xplore.', ''], projectLinks: ['Ver repositorio'],
    experienceRoles: ['Ingeniero backend de IA', 'Investigador doctoral', 'Ingeniero fundador', 'Desarrollador de trading algorítmico', 'Desarrollador de visión por computadora y deep learning'],
    experienceDescriptions: ['Servicios backend, aplicaciones con modelos de lenguaje, despliegues en la nube y flujos de IA en producción.', 'Investigación en inteligencia artificial y procesamiento de imágenes médicas, con trabajos relacionados con la salud ósea.', 'Desarrollo backend e integración de IA para una plataforma de atención a personas con Parkinson.', 'Estrategias de trading y herramientas de automatización interna para clientes financieros.', 'Segmentación de la columna lumbar para evaluar osteoporosis mediante imágenes DXA.'], skillGroups: ['Lenguajes', 'Backend', 'IA y aprendizaje automático', 'Datos e infraestructura'],
  },
} as const

const navigation = ['home', 'about', 'projects', 'skills', 'contact'] as const

const projects = [
  {
    name: 'Neurollow', type: 'Health technology · Founding engineer',
    description: 'A platform for the management, monitoring and diagnostic evaluation of people with Parkinson’s disease. I work on backend services and contribute to the integration of AI and computer vision for motor assessments.',
    detail: 'Part of IncuBAte. Neurollow was an invited startup at Crossing Over LATAM 2026.',
    tools: 'TypeScript · Node.js · PostgreSQL · Computer Vision',
    links: [['LinkedIn', 'https://www.linkedin.com/company/neurollow/'], ['Instagram', 'https://www.instagram.com/neurollow/']],
  },
  {
    name: 'Lookeate', type: 'Personal project · In development',
    description: 'A platform for discovering personal style, with a conversational assistant that combines natural language, reference images and product search to help users explore garments and outfits.',
    detail: 'The assistant is available in the beta; additional creation and catalog experiences are in development.',
    tools: 'Python · FastAPI · LangGraph · RAG · Next.js',
    links: [['View repository', 'https://github.com/martinoferrero1/multimodal-clothing-assistance-system']],
  },
  {
    name: 'Quarry process digitization', type: 'Team project · In progress',
    description: 'A project developed with a team of developers, focused on digitizing and automating processes in the quarry industry.',
    detail: '', tools: 'Process digitization · Automation', links: [],
  },
  {
    name: 'Lumbar spine segmentation', type: 'Research · INTIA–UNICEN',
    description: 'A degree project exploring image processing and deep learning for lumbar spine segmentation on DXA images, with a cross-platform application for the workflow.',
    detail: 'The work was accepted for presentation at SIPAIM 2025 and publication in IEEE Xplore.',
    tools: 'Python · PyTorch · U-Net · OpenCV · Electron', links: [],
  },
  {
    name: 'Document assistant', type: 'University project',
    description: 'A retrieval-augmented application for asking questions about PDF documents in natural language.',
    detail: '', tools: 'LangChain · Gemini API · ChromaDB', links: [],
  },
]

const experience = [
  ['2026 — Present', 'AI Backend Engineer', 'PI Data Strategy & Consulting', 'Backend services, LLM applications, cloud deployments and production AI workflows.'],
  ['2026 — Present', 'PhD Researcher', 'INTIA · UNICEN', 'Research in artificial intelligence and medical image processing, including work related to bone health.'],
  ['2025 — Present', 'Founding Engineer', 'Neurollow', 'Backend engineering and AI integration for a Parkinson’s care platform.'],
  ['2025', 'Algorithmic Trading Developer', 'Tradespark', 'Trading strategies and internal automation tools for financial clients.'],
  ['2024 — 2025', 'Computer Vision & Deep Learning Developer', 'INTIA · UNICEN', 'Lumbar spine segmentation for osteoporosis assessment using DXA images.'],
]

const skills = [
  ['Languages', 'Python, TypeScript, JavaScript'],
  ['Backend', 'FastAPI, Flask, Node.js, REST, GraphQL, SQLAlchemy, Prisma'],
  ['AI & machine learning', 'PyTorch, TensorFlow, OpenCV, LangChain, LangGraph, RAG, LLMs'],
  ['Data & infrastructure', 'PostgreSQL, MongoDB, Redis, ChromaDB, Docker, Kubernetes, AWS, Azure'],
]

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Connections({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const themeRef = useRef(theme)
  const redrawRef = useRef<(() => void) | null>(null)
  themeRef.current = theme

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = canvas?.parentElement
    const context = canvas?.getContext('2d')
    if (!canvas || !hero || !context) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = { x: -1000, y: -1000 }
    type Node = { x: number; y: number; vx: number; vy: number; radius: number; hover: number }
    let nodes: Node[] = []
    let width = 0
    let height = 0
    let frame = 0
    let isVisible = true
    const linkDistance = 138
    const hoverRadius = 165
    const hoverLinkDistance = 175

    // Adapted from ThreeUI's MIT-licensed Constellation Field (Meng To):
    // https://github.com/MengTo/threeui/tree/main/src/shaders/constellation-field
    const draw = () => {
      frame = 0
      context.clearRect(0, 0, width, height)
      const light = themeRef.current === 'light'
      context.strokeStyle = light ? '#52649b' : '#7484c9'
      context.lineWidth = 0.8
      context.lineCap = 'round'

      nodes.forEach((node) => {
        const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y)
        const target = reduceMotion.matches ? 0 : Math.max(0, Math.min(1, (hoverRadius - distance) / 35))
        node.hover += (target - node.hover) * 0.12
      })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
          const baseAlpha = distance < linkDistance ? 0.08 + (1 - distance / linkDistance) * 0.22 : 0
          const hoverAlpha = distance < hoverLinkDistance
            ? Math.min(nodes[i].hover, nodes[j].hover) * (0.2 + (1 - distance / hoverLinkDistance) * 0.25)
            : 0
          if (baseAlpha || hoverAlpha > 0.001) {
            context.beginPath()
            context.moveTo(nodes[i].x, nodes[i].y)
            context.lineTo(nodes[j].x, nodes[j].y)
            context.globalAlpha = Math.min(0.55, baseAlpha + hoverAlpha)
            context.stroke()
          }
        }
      }

      context.globalAlpha = 1
      nodes.forEach((node) => {
        if (!reduceMotion.matches) {
          node.x += node.vx
          node.y += node.vy
          if (node.x < 0 || node.x > width) node.vx *= -1
          if (node.y < 0 || node.y > height) node.vy *= -1
        }

        context.beginPath()
        context.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2)
        context.fillStyle = light ? 'rgba(72, 89, 145, 0.12)' : 'rgba(157, 171, 239, 0.12)'
        context.fill()
        context.beginPath()
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        context.fillStyle = light ? 'rgba(72, 89, 145, 0.58)' : 'rgba(174, 187, 246, 0.58)'
        context.fill()
      })

      context.globalAlpha = 1
      if (!reduceMotion.matches && isVisible) frame = window.requestAnimationFrame(draw)
    }

    const resize = () => {
      const bounds = hero.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(18, Math.min(46, Math.round((width * height / 10000) * 0.42)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.58 + 1.15,
        hover: 0,
      }))

      if (reduceMotion.matches) draw()
      else if (isVisible && !frame) frame = window.requestAnimationFrame(draw)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const bounds = hero.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
    }
    const onPointerLeave = () => { pointer.x = -1000; pointer.y = -1000 }
    const onMotionChange = () => {
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      if (reduceMotion.matches) draw()
      else if (isVisible) frame = window.requestAnimationFrame(draw)
    }
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (!isVisible && frame) {
        window.cancelAnimationFrame(frame)
        frame = 0
        onPointerLeave()
      } else if (isVisible && !reduceMotion.matches && !frame) {
        frame = window.requestAnimationFrame(draw)
      }
    })
    const resizeObserver = new ResizeObserver(resize)
    redrawRef.current = () => { if (reduceMotion.matches) draw() }

    resizeObserver.observe(hero)
    visibilityObserver.observe(hero)
    hero.addEventListener('pointermove', onPointerMove)
    hero.addEventListener('pointerleave', onPointerLeave)
    reduceMotion.addEventListener('change', onMotionChange)
    resize()

    return () => {
      redrawRef.current = null
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      hero.removeEventListener('pointermove', onPointerMove)
      hero.removeEventListener('pointerleave', onPointerLeave)
      reduceMotion.removeEventListener('change', onMotionChange)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => { redrawRef.current?.() }, [theme])

  return <canvas ref={canvasRef} className="connections" aria-hidden="true" />
}

function SectionTitle({ children }: { children: string }) {
  return <div className="section-title" data-reveal><h2>{children}</h2><span /></div>
}

function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    try { return window.localStorage.getItem('portfolio-language') === 'es' ? 'es' : 'en' } catch { return 'en' }
  })
  const [active, setActive] = useState('home')
  const [theme, setTheme] = useState<Theme>(() => {
    try { return window.localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark' } catch { return 'dark' }
  })
  const text = copy[locale]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (themeColor) themeColor.content = theme === 'light' ? '#eeedf1' : '#090a0f'
    try { window.localStorage.setItem('portfolio-theme', theme) } catch { /* Preference storage is optional. */ }
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = locale === 'es' ? 'Martino Ferrero — Ingeniero de software' : 'Martino Ferrero — Software Engineer'
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = locale === 'es'
      ? 'Martino Ferrero es ingeniero en sistemas y trabaja en desarrollo backend, inteligencia artificial e investigación en imágenes médicas.'
      : 'Martino Ferrero is a systems engineer working on backend software, artificial intelligence, and medical imaging research.'
    try { window.localStorage.setItem('portfolio-language', locale) } catch { /* Preference storage is optional. */ }
  }, [locale])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!reduce.matches && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' })
      elements.forEach((element) => {
        if (element.getBoundingClientRect().top > window.innerHeight * 0.95) {
          element.classList.add('will-reveal')
          observer.observe(element)
        }
      })
      return () => observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const sections = navigation.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.1, 0.4] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return <>
    <a className="skip-link" href="#about">{text.skip}</a>
    <header className="site-header">
      <div className="header-inner">
        <nav className="navigation" aria-label={text.navLabel}>
          {navigation.map((id, index) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined}>{text.navigation[index]}</a>)}
        </nav>
        <div className="header-controls">
          <div className="language-switch" role="group" aria-label={text.languageLabel}>
            {(['es', 'en'] as const).map((language) => <button key={language} type="button" lang={language} aria-pressed={locale === language} className={locale === language ? 'selected' : ''} onClick={() => setLocale(language)}>{language.toUpperCase()}</button>)}
          </div>
          <button className="theme-switch" type="button" aria-label={theme === 'dark' ? text.lightTheme : text.darkTheme} title={theme === 'dark' ? text.lightTheme : text.darkTheme} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark'
              ? <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42m0-14.14-1.42 1.42M6.35 17.65l-1.42 1.42" /></svg>
              : <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5 8.5 8.5 0 1 0 20.5 14.1Z" /></svg>}
          </button>
        </div>
      </div>
    </header>

    <main>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">Martino Ferrero</h1>
          <p className="hero-role">{text.role}</p>
          <a className="outline-link" href="#projects">{text.explore} <Arrow /></a>
        </div>
        <Connections theme={theme} />
      </section>

      <div className="page-content">
        <section id="about" className="content-section about" aria-labelledby="about-heading">
          <SectionTitle>{text.about}</SectionTitle>
          <div className="about-grid" data-reveal>
            <img className="portrait" src={portrait} alt={text.portraitAlt} width="1254" height="1254" />
            <div className="about-copy">
              <h3 id="about-heading">{text.aboutTitle}</h3>
              <p>{text.bio1}</p>
              <p>{text.bio2}</p>
              <a className="text-link" href="/Martino-Ferrero-CV.pdf" download>{text.cv} <Arrow /></a>
            </div>
          </div>

          <div className="subsection" data-reveal>
            <h3>{text.experience}</h3>
            <div className="timeline">
              {experience.map(([date, , company], index) => <article className="timeline-item" key={`${date}-${company}`} data-reveal>
                <p className="timeline-date">{locale === 'es' ? date.replace('Present', 'Actualidad') : date}</p><div><h4>{text.experienceRoles[index]}</h4><p className="timeline-company">{company}</p><p>{text.experienceDescriptions[index]}</p></div>
              </article>)}
            </div>
          </div>
          <div className="education" data-reveal>
            <h3>{text.education}</h3>
            <div>{text.educationItems.map((item, index) => <p key={item}><strong>{item}</strong><br /><span>{text.educationStatus[index]}</span></p>)}</div>
          </div>
        </section>

        <section id="projects" className="content-section" aria-labelledby="projects-heading">
          <SectionTitle>{text.projects}</SectionTitle>
          <div className="section-intro" data-reveal><h3 id="projects-heading">{text.selectedWork}</h3><p>{text.projectsIntro}</p></div>
          <div className="project-list">
            {projects.map((project, index) => <article className="project" key={project.name} data-reveal>
              <div className="project-heading"><h4>{locale === 'es' ? ['Neurollow', 'Lookeate', 'Digitalización de procesos en canteras', 'Segmentación de columna lumbar', 'Asistente para documentos'][index] : project.name}</h4><p>{text.projectTypes[index]}</p></div>
              <div className="project-body"><p>{text.projectDescriptions[index]}</p>{text.projectDetails[index] && <p>{text.projectDetails[index]}</p>}<p className="project-tools">{locale === 'es' && index === 2 ? 'Digitalización de procesos · Automatización' : project.tools}</p>
                {project.links.length > 0 && <div className="project-links">{project.links.map(([label, href]) => <a className="text-link" key={href} href={href} target="_blank" rel="noreferrer">{locale === 'es' ? text.projectLinks[0] : label} <Arrow /></a>)}</div>}
              </div>
            </article>)}
          </div>
        </section>

        <section id="skills" className="content-section" aria-labelledby="skills-heading">
          <SectionTitle>{text.skills}</SectionTitle>
          <div className="section-intro" data-reveal><h3 id="skills-heading">{text.tools}</h3><p>{text.skillsIntro}</p></div>
          <div className="skills-list">{skills.map(([, items], index) => <div className="skill-row" key={index} data-reveal><h4>{text.skillGroups[index]}</h4><p>{items}</p></div>)}</div>
        </section>

        <section id="contact" className="content-section contact" aria-labelledby="contact-heading">
          <SectionTitle>{text.contact}</SectionTitle>
          <div className="contact-content" data-reveal><h3 id="contact-heading">{text.contactTitle}</h3><p>{text.contactIntro}</p>
            <a className="contact-email" href="mailto:martinoferrero02@gmail.com">martinoferrero02@gmail.com <Arrow /></a>
            <div className="contact-links"><a href="https://www.linkedin.com/in/martino-ferrero-17761121a/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="https://github.com/martinoferrero1" target="_blank" rel="noreferrer">GitHub <Arrow /></a></div>
          </div>
        </section>
      </div>
    </main>
    <footer className="footer"><span>© {new Date().getFullYear()} Martino Ferrero</span><a href="#home">{text.backToTop}</a></footer>
  </>
}

export default App
