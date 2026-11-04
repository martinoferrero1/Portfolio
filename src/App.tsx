import { type FormEvent, useEffect, useRef, useState } from 'react'
import { LuMail } from 'react-icons/lu'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import portrait from '../assets/plates/portrait.png'

type Locale = 'en' | 'es'
type Theme = 'dark' | 'light'

const copy = {
  en: {
    navigation: ['Home', 'About', 'Projects', 'Skills', 'Contact'], navLabel: 'Main navigation', languageLabel: 'Choose language', lightTheme: 'Switch to light mode', darkTheme: 'Switch to dark mode', skip: 'Skip to content',
    role: 'Software Engineer · AI & Backend', explore: 'Explore my work',
    about: 'About me', aboutTitle: 'Hi, I’m Martino.', bio1: 'I’m a systems engineer from Tandil, Argentina, focused on backend development and artificial intelligence. I enjoy building innovative software that makes a meaningful, positive difference for the people who use it. I’m also drawn to entrepreneurship and bringing new ideas to life, which has led me to take part in several projects. I’m currently working on two of them.',
    bio2: 'Alongside these projects, I’m pursuing a PhD at INTIA–UNICEN, where I research the use of AI in medical image processing and other related areas.', cv: 'Download my CV', experience: 'Experience', education: 'Education', certifications: 'Licenses & certifications',
    educationItems: ['PhD research in medical imaging and AI', 'Bachelor’s Degree in Systems Engineering', 'University Diploma in Artificial Intelligence'], educationStatus: ['INTIA · UNICEN — In progress', 'UNICEN — 2020–2025', 'UNICEN — 2025'],
    projects: 'Projects', selectedWork: 'Selected work', projectsIntro: 'A selection of projects across software, AI and research.', skills: 'Skills', tools: 'Tools I work with', skillsIntro: 'Technologies and practices from my work and research.',
    contact: 'Contact', contactFormIntro: 'Fill out the form and your email app will open with the message ready to send.', fullName: 'Full name', company: 'Company', emailAddress: 'Email address', message: 'Message', namePlaceholder: 'Your name', companyPlaceholder: 'Your company', emailPlaceholder: 'you@example.com', messagePlaceholder: 'Write your message here...', send: 'Send message', contactTitle: 'Let’s get in touch!', contactIntro: 'Have a project, opportunity, or question in mind? I’d be glad to hear from you.', backToTop: 'Back to top', portraitAlt: 'Illustrated portrait of Martino Ferrero',
    projectTypes: ['Health technology · Co-founder', 'Personal project · In progress', 'Team project · In progress', 'Research · INTIA–UNICEN', 'University project', 'University project', 'Private clinic'],
    projectDescriptions: [
      'A platform for the management, monitoring and diagnostic evaluation of people with Parkinson’s disease. I work on backend services and contribute to the integration of AI and computer vision for motor assessments.',
      'A platform for discovering personal style, with a conversational assistant that combines natural language, reference images and product search to help users explore garments and outfits.',
      'A project developed with a team of developers, focused on digitizing and automating processes in the quarry industry.',
      'A degree project exploring image processing and deep learning for lumbar spine segmentation on DXA images, with a cross-platform application for the workflow.',
      'A specialized, multi-domain RAG assistant for asking a wide range of questions about all kinds of specialized documents, organized by chat.',
      'A custom compiler covering lexical, syntactic and semantic analysis through assembly code generation.',
      'A WhatsApp chatbot for parents of pediatric patients that automates registration, appointments and FAQs, integrating with clinic systems for staff availability and patient data.',
    ], projectDetails: ['Part of IncuBAte. Neurollow was an invited startup at Crossing Over LATAM 2026.', 'The assistant is available in the beta; additional creation and catalog experiences are in development.', 'An S&E project. The repositories are private.', 'The work was accepted for presentation at SIPAIM 2025 and publication in IEEE Xplore.', '', '', ''], projectLinks: ['View repository'],
    experienceRoles: ['AI Backend Engineer', 'PhD Researcher', 'Co-founder', 'Co-founder', 'Algorithmic Trading Developer', 'Computer Vision & Deep Learning Developer'],
    experienceDescriptions: ['Backend services, LLM applications, cloud deployments and production AI workflows.', 'Research in artificial intelligence and medical image processing, including work related to bone health.', 'Co-founded a company with a team of developers to digitize and automate processes for businesses in specialized industries.', 'Backend engineering and AI integration for a Parkinson’s care platform.', 'Trading strategies and internal automation tools for financial clients.', 'Lumbar spine segmentation for osteoporosis assessment using DXA images.'], skillGroups: ['Languages', 'Backend', 'AI & machine learning', 'Data & infrastructure', 'Architecture & integration', 'AI systems & practices'], approachItems: ['Hexagonal architecture, microservices, event-driven systems, Kafka, WebSockets, external API integration', 'AI agents and orchestration, retrieval-augmented generation (RAG), vector search, agent guardrails, evaluation, operations and observability, image processing'],
  },
  es: {
    navigation: ['Inicio', 'Sobre mí', 'Proyectos', 'Habilidades', 'Contacto'], navLabel: 'Navegación principal', languageLabel: 'Elegir idioma', lightTheme: 'Cambiar a modo claro', darkTheme: 'Cambiar a modo oscuro', skip: 'Saltar al contenido',
    role: 'Ingeniero de software · IA y backend', explore: 'Ver mis proyectos',
    about: 'Un poco sobre mí', aboutTitle: 'Hola, soy Martino.', bio1: 'Soy ingeniero en sistemas, oriundo de Tandil, Argentina, y me enfoco en el desarrollo backend y la inteligencia artificial. Disfruto crear software innovador que genere un impacto positivo y tangible en las personas que lo usan. También me motiva emprender e impulsar ideas nuevas, algo que me llevó a participar en distintos proyectos. Actualmente trabajo en dos de ellos.',
    bio2: 'A la par de estos proyectos, estoy realizando un doctorado en INTIA–UNICEN, donde investigo el uso de inteligencia artificial para el procesamiento de imágenes médicas y otras áreas relacionadas.', cv: 'Descargar mi CV', experience: 'Experiencia', education: 'Formación', certifications: 'Licencias y certificaciones',
    educationItems: ['Investigación doctoral en imágenes médicas e IA', 'Ingeniería de Sistemas', 'Diplomatura Universitaria en Inteligencia Artificial'], educationStatus: ['INTIA · UNICEN — En curso', 'UNICEN — 2020–2025', 'UNICEN — 2025'],
    projects: 'Proyectos', selectedWork: 'Proyectos destacados', projectsIntro: 'Una selección de proyectos de software, inteligencia artificial e investigación.', skills: 'Habilidades', tools: 'Tecnologías que utilizo', skillsIntro: 'Tecnologías y prácticas de mi trabajo y mi investigación.',
    contact: 'Contacto', contactFormIntro: 'Completá el formulario y se abrirá un correo con el mensaje listo para enviar.', fullName: 'Nombre y apellido', company: 'Empresa', emailAddress: 'Correo electrónico', message: 'Mensaje', namePlaceholder: 'Tu nombre', companyPlaceholder: 'Tu empresa', emailPlaceholder: 'vos@ejemplo.com', messagePlaceholder: 'Escribí tu mensaje acá...', send: 'Enviar mensaje', contactTitle: 'Hablemos!', contactIntro: '¿Tenés un proyecto, una oportunidad o alguna consulta? Me gustaría conocerla.', backToTop: 'Volver arriba', portraitAlt: 'Retrato ilustrado de Martino Ferrero',
    projectTypes: ['Tecnología para la salud · Cofundador', 'Proyecto personal · En curso', 'Proyecto en equipo · En curso', 'Investigación · INTIA–UNICEN', 'Proyecto universitario', 'Proyecto universitario', 'Clínica privada'],
    projectDescriptions: [
      'Plataforma para la gestión, el seguimiento y la evaluación diagnóstica de personas con enfermedad de Parkinson. Trabajo en servicios backend y en la integración de inteligencia artificial y visión por computadora para evaluar habilidades motoras.',
      'Plataforma para descubrir el estilo personal, con un asistente conversacional que combina lenguaje natural, imágenes de referencia y búsqueda de productos para explorar prendas y conjuntos.',
      'Proyecto realizado junto a un equipo de desarrollo para digitalizar y automatizar procesos de la industria de canteras.',
      'Trabajo final de carrera sobre procesamiento de imágenes y aprendizaje profundo para segmentar la columna lumbar en imágenes DXA, con una aplicación multiplataforma para ese flujo de trabajo.',
      'Asistente RAG especializado y multirubro para realizar consultas variadas sobre todo tipo de documentos especializados, organizadas por chat.',
      'Compilador desarrollado desde cero que abarca el análisis léxico, sintáctico y semántico hasta la generación de código assembler.',
      'Chatbot de WhatsApp para familias de pacientes pediátricos que automatiza el registro, los turnos y las preguntas frecuentes, integrado con los sistemas de la clínica para consultar disponibilidad y datos de pacientes.',
    ], projectDetails: ['Parte de IncuBAte. Neurollow fue una de las startups invitadas a Crossing Over LATAM 2026.', 'El asistente ya está disponible en la versión beta; se están desarrollando nuevas funciones de creación y catálogo.', 'Un proyecto de S&E. Los repositorios son privados.', 'El trabajo fue aceptado para su presentación en SIPAIM 2025 y su publicación en IEEE Xplore.', '', '', ''], projectLinks: ['Ver repositorio'],
    experienceRoles: ['Ingeniero backend de IA', 'Investigador doctoral', 'Cofundador', 'Cofundador', 'Desarrollador de trading algorítmico', 'Desarrollador de visión por computadora y deep learning'],
    experienceDescriptions: ['Servicios backend, aplicaciones con modelos de lenguaje, despliegues en la nube y flujos de IA en producción.', 'Investigación en inteligencia artificial y procesamiento de imágenes médicas, con trabajos relacionados con la salud ósea.', 'Empresa fundada junto a un equipo de desarrolladores para digitalizar y automatizar procesos en empresas de rubros específicos.', 'Desarrollo backend e integración de IA para una plataforma de atención a personas con Parkinson.', 'Estrategias de trading y herramientas de automatización interna para clientes financieros.', 'Segmentación de la columna lumbar para evaluar osteoporosis mediante imágenes DXA.'], skillGroups: ['Lenguajes', 'Backend', 'IA y aprendizaje automático', 'Datos e infraestructura', 'Arquitectura e integración', 'Sistemas y prácticas de IA'], approachItems: ['Arquitectura hexagonal, microservicios, sistemas orientados a eventos, Kafka, WebSockets, integración con APIs externas', 'Agentes de IA y orquestación, generación aumentada por recuperación (RAG), búsqueda vectorial, controles de seguridad, evaluación, operación y observabilidad de agentes, procesamiento de imágenes'],
  },
} as const

const navigation = ['home', 'about', 'projects', 'skills', 'contact'] as const

const projects = [
  {
    name: 'Neurollow', type: 'Health technology · Co-founder',
    description: 'A platform for the management, monitoring and diagnostic evaluation of people with Parkinson’s disease. I work on backend services and contribute to the integration of AI and computer vision for motor assessments.',
    detail: 'Part of IncuBAte. Neurollow was an invited startup at Crossing Over LATAM 2026.',
    tools: 'TypeScript · Node.js · PostgreSQL · Deep Learning · Computer Vision · AWS · Docker · Kubernetes',
    links: [['Website', 'https://neurollow-precise-motion-insights.vercel.app/'], ['LinkedIn', 'https://www.linkedin.com/company/neurollow/'], ['Instagram', 'https://www.instagram.com/neurollow/']],
  },
  {
    name: 'Lookeate', type: 'Personal project · In progress',
    description: 'A platform for discovering personal style, with a conversational assistant that combines natural language, reference images and product search to help users explore garments and outfits.',
    detail: 'The assistant is available in the beta; additional creation and catalog experiences are in development.',
    tools: 'Python · FastAPI · LangGraph · RAG · Next.js · PostgreSQL · SQLite · FAISS',
    links: [['View repository', 'https://github.com/martinoferrero1/multimodal-clothing-assistance-system']],
  },
  {
    name: 'Quarry process digitization', type: 'Team project · In progress',
    description: 'A project developed with a team of developers, focused on digitizing and automating processes in the quarry industry.',
    detail: 'An S&E project. The repositories are private.', tools: 'React · TypeScript · Flutter · Dart · PostgreSQL · AWS', links: [],
  },
  {
    name: 'DXA spine segmenter', type: 'Research · INTIA–UNICEN',
    description: 'A degree project exploring image processing and deep learning for lumbar spine segmentation on DXA images, with a cross-platform application for the workflow.',
    detail: 'The work was accepted for presentation at SIPAIM 2025 and publication in IEEE Xplore.',
    tools: 'Python · JavaScript · OpenCV · NumPy · Matplotlib · PyTorch · U-Net · Flask · React · Electron', links: [['View repository', 'https://github.com/martinoferrero1/DXA-Segmentation-Desktop-Application']],
  },
  {
    name: 'Chat-anne', type: 'University project',
    description: 'A specialized, multi-domain RAG assistant for asking a wide range of questions about all kinds of specialized documents, organized by chat.',
    detail: '', tools: 'LangChain · Gemini API · ChromaDB', links: [['View repository', 'https://github.com/martinoferrero1/Chat-anne']],
  },

  {
    name: 'My own compiler', type: 'University project',
    description: 'A custom compiler covering lexical, syntactic and semantic analysis through assembly code generation.',
    detail: '', tools: 'Java · YACC · Assembly', links: [['View repository', 'https://github.com/martinoferrero1/Compiler']],
  },
  {
    name: 'Pediatric clinic chatbot', type: 'Private clinic',
    description: 'A WhatsApp chatbot for parents of pediatric patients that automates registration, appointments and FAQs, integrating with clinic systems for staff availability and patient data.',
    detail: '', tools: 'Python · Rasa · NLTK · Twilio WhatsApp API · PostgreSQL · Docker · Nginx', links: [],
  },
]

const experience = [
  ['2026 — Present', 'AI Backend Engineer', 'PI Data Strategy & Consulting', 'Backend services, LLM applications, cloud deployments and production AI workflows.'],
  ['2026 — Present', 'PhD Researcher', 'INTIA · UNICEN', 'Research in artificial intelligence and medical image processing, including work related to bone health.'],
  ['2026 — Present', 'Co-founder', 'S&E', 'Co-founded a company with a team of developers to digitize and automate processes for businesses in specialized industries.'],
  ['2025 — Present', 'Co-founder', 'Neurollow', 'Backend engineering and AI integration for a Parkinson’s care platform.'],
  ['2025', 'Algorithmic Trading Developer', 'Tradespark', 'Trading strategies and internal automation tools for financial clients.'],
  ['2024 — 2025', 'Computer Vision & Deep Learning Developer', 'INTIA · UNICEN', 'Lumbar spine segmentation for osteoporosis assessment using DXA images.'],
]

const skills = [
  ['Languages', 'Python, TypeScript, JavaScript'],
  ['Backend', 'FastAPI, Flask, Node.js, REST, GraphQL, SQLAlchemy, Prisma'],
  ['AI & machine learning', 'PyTorch, TensorFlow, OpenCV, LangChain, LangGraph, RAG, LLMs'],
  ['Data & infrastructure', 'PostgreSQL, MongoDB, Redis, ChromaDB, Docker, Kubernetes, AWS, Azure'],
  ['Architecture & integration', ''],
  ['AI systems & practices', ''],
]

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

const contactLinks = [
  { label: 'Email', href: 'mailto:martinoferrero02@gmail.com', icon: 'mail' },
  { label: 'GitHub', href: 'https://github.com/martinoferrero1', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/martino-ferrero-17761121a/', icon: 'linkedin' },
] as const

function ContactIcon({ name }: { name: (typeof contactLinks)[number]['icon'] }) {
  const icons = { mail: LuMail, github: FaGithub, linkedin: FaLinkedinIn }
  const Icon = icons[name]
  return <Icon className="contact-icon" aria-hidden="true" focusable="false" />
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
  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const name = String(values.get('name') ?? '')
    const company = String(values.get('company') ?? '')
    const email = String(values.get('email') ?? '')
    const message = String(values.get('message') ?? '')
    const subject = locale === 'es' ? `Mensaje de ${name}` : `Message from ${name}`
    const body = `${text.fullName}: ${name}\n${text.company}: ${company || '—'}\n${text.emailAddress}: ${email}\n\n${message}`
    window.location.href = `mailto:martinoferrero02@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

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
          <nav className="header-social" aria-label={locale === 'es' ? 'Enlaces de contacto' : 'Contact links'}>
            {contactLinks.map(({ label, href, icon }) => <a key={icon} href={href} aria-label={label} title={label} {...(icon === 'mail' ? {} : { target: '_blank', rel: 'noreferrer' })}><ContactIcon name={icon} /></a>)}
          </nav>
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
          <div className="education" data-reveal>
            <h3>{text.certifications}</h3>
            <div>{['NVIDIA Fundamentals of Deep Learning', 'Building Transformer-Based Natural Language Processing Applications'].map((item) => <p key={item}><strong>{item}</strong></p>)}</div>
          </div>
        </section>

        <section id="projects" className="content-section" aria-labelledby="projects-heading">
          <SectionTitle>{text.projects}</SectionTitle>
          <div className="section-intro" data-reveal><h3 id="projects-heading">{text.selectedWork}</h3><p>{text.projectsIntro}</p></div>
          <div className="project-list">
            {projects.map((project, index) => <article className="project" key={project.name} data-reveal>
              <div className="project-heading"><h4>{locale === 'es' ? ['Neurollow', 'Lookeate', 'Digitalización de procesos en canteras', 'Segmentador DXA de columna vertebral', 'Chat-anne', 'Mi propio compilador', 'Chatbot para clínica pediátrica'][index] : project.name}</h4><p>{text.projectTypes[index]}</p></div>
              <div className="project-body"><p>{text.projectDescriptions[index]}</p>{text.projectDetails[index] && <p>{text.projectDetails[index]}</p>}<p className="project-tools">{project.tools}</p>
                {project.links.length > 0 && <div className="project-links">{project.links.map(([label, href]) => <a className="text-link" key={href} href={href} target="_blank" rel="noreferrer">{locale === 'es' && label === 'View repository' ? text.projectLinks[0] : locale === 'es' && label === 'Website' ? 'Sitio web' : label} <Arrow /></a>)}</div>}
              </div>
            </article>)}
          </div>
        </section>

        <section id="skills" className="content-section" aria-labelledby="skills-heading">
          <SectionTitle>{text.skills}</SectionTitle>
          <div className="section-intro" data-reveal><h3 id="skills-heading">{text.tools}</h3><p>{text.skillsIntro}</p></div>
          <div className="skills-list">{skills.map(([, items], index) => <div className="skill-row" key={index} data-reveal><h4>{text.skillGroups[index]}</h4><p>{index < 4 ? items : text.approachItems[index - 4]}</p></div>)}</div>
        </section>

        <section id="contact" className="content-section contact" aria-labelledby="contact-heading">
          <SectionTitle>{text.contact}</SectionTitle>
          <div className="section-intro contact-intro" data-reveal><h3 id="contact-heading">{text.contactTitle}</h3><p>{text.contactIntro}</p></div>
          <div className="contact-card" data-reveal>
            <div className="contact-card-header"><p>{text.contactFormIntro}</p></div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="contact-form-fields">
                <label className="contact-field" htmlFor="contact-name">{text.fullName}<input id="contact-name" name="name" type="text" autoComplete="name" placeholder={text.namePlaceholder} required /></label>
                <label className="contact-field" htmlFor="contact-company">{text.company}<input id="contact-company" name="company" type="text" autoComplete="organization" placeholder={text.companyPlaceholder} /></label>
                <label className="contact-field contact-field-wide" htmlFor="contact-email">{text.emailAddress}<input id="contact-email" name="email" type="email" autoComplete="email" placeholder={text.emailPlaceholder} required /></label>
                <label className="contact-field contact-field-wide" htmlFor="contact-message">{text.message}<textarea id="contact-message" name="message" rows={4} placeholder={text.messagePlaceholder} required /></label>
              </div>
              <button className="contact-submit" type="submit"><span>{text.send}</span><Arrow /></button>
            </form>
            <footer className="contact-card-footer">
              <a className="contact-email" href="mailto:martinoferrero02@gmail.com"><ContactIcon name="mail" /><span>martinoferrero02@gmail.com</span></a>
              <div className="contact-links" aria-label={locale === 'es' ? 'Redes profesionales' : 'Professional profiles'}>{contactLinks.filter(({ icon }) => icon !== 'mail').map(({ label, href, icon }) => <a key={icon} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}><ContactIcon name={icon} /><span>{label}</span></a>)}</div>
            </footer>
          </div>
        </section>
      </div>
    </main>
    <footer className="footer"><span>© {new Date().getFullYear()} Martino Ferrero</span><a href="#home">{text.backToTop}</a></footer>
  </>
}

export default App
