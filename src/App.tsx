import { useEffect, useState } from 'react'
import portrait from '../assets/plates/portrait.png'

const navigation = [
  ['Home', 'home'], ['About', 'about'], ['Projects', 'projects'],
  ['Skills', 'skills'], ['Contact', 'contact'],
] as const

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

function Connections() {
  return <svg className="connections" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
    <path d="M-40 80 C180 25 310 90 510 145 S920 170 1480 22" />
    <path d="M-30 135 C260 65 350 95 565 160 S1000 165 1475 78" />
    <path d="M-20 70 C250 55 330 110 560 164 S1100 145 1460 20" />
    <g><circle cx="250" cy="92" r="2.6"/><circle cx="389" cy="139" r="2"/><circle cx="1184" cy="141" r="2.4"/><circle cx="1303" cy="92" r="2.8"/></g>
  </svg>
}

function SectionTitle({ children }: { children: string }) {
  return <div className="section-title" data-reveal><h2>{children}</h2><span /></div>
}

function App() {
  const [active, setActive] = useState('home')

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
    const sections = navigation.map(([, id]) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.1, 0.4] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return <>
    <a className="skip-link" href="#about">Skip to content</a>
    <header className="site-header">
      <nav className="navigation" aria-label="Main navigation">
        {navigation.map(([label, id]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined}>{label}</a>)}
      </nav>
    </header>

    <main>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">Martino Ferrero</h1>
          <p className="hero-role">Software Engineer · AI &amp; Backend</p>
          <p className="hero-intro">I build software and work on applied AI and medical imaging research.</p>
          <a className="outline-link" href="#projects">Explore my work <Arrow /></a>
        </div>
        <Connections />
      </section>

      <div className="page-content">
        <section id="about" className="content-section about" aria-labelledby="about-heading">
          <SectionTitle>About</SectionTitle>
          <div className="about-grid" data-reveal>
            <img className="portrait" src={portrait} alt="Illustrated portrait of Martino Ferrero" width="1254" height="1254" />
            <div className="about-copy">
              <h3 id="about-heading">Hi, I’m Martino.</h3>
              <p>I’m a systems engineer from Tandil, Argentina, focused on backend development and artificial intelligence. I enjoy building software that brings research and practical needs together.</p>
              <p>Alongside my work as an AI backend engineer, I’m pursuing a PhD at INTIA–UNICEN, researching AI for medical image processing and related projects in the research group.</p>
              <a className="text-link" href="/Martino-Ferrero-CV.pdf" download>Download my CV <Arrow /></a>
            </div>
          </div>

          <div className="subsection" data-reveal>
            <h3>Experience</h3>
            <div className="timeline">
              {experience.map(([date, role, company, description]) => <article className="timeline-item" key={`${role}-${company}`} data-reveal>
                <p className="timeline-date">{date}</p><div><h4>{role}</h4><p className="timeline-company">{company}</p><p>{description}</p></div>
              </article>)}
            </div>
          </div>
          <div className="education" data-reveal>
            <h3>Education</h3>
            <div><p><strong>PhD research in medical imaging and AI</strong><br /><span>INTIA · UNICEN — In progress</span></p>
              <p><strong>Bachelor’s Degree in Systems Engineering</strong><br /><span>UNICEN — 2020–2025</span></p>
              <p><strong>University Diploma in Artificial Intelligence</strong><br /><span>UNICEN — 2025</span></p></div>
          </div>
        </section>

        <section id="projects" className="content-section" aria-labelledby="projects-heading">
          <SectionTitle>Projects</SectionTitle>
          <div className="section-intro" data-reveal><h3 id="projects-heading">Selected work</h3><p>A selection of projects across software, AI and research.</p></div>
          <div className="project-list">
            {projects.map((project) => <article className="project" key={project.name} data-reveal>
              <div className="project-heading"><h4>{project.name}</h4><p>{project.type}</p></div>
              <div className="project-body"><p>{project.description}</p>{project.detail && <p>{project.detail}</p>}<p className="project-tools">{project.tools}</p>
                {project.links.length > 0 && <div className="project-links">{project.links.map(([label, href]) => <a className="text-link" key={href} href={href} target="_blank" rel="noreferrer">{label} <Arrow /></a>)}</div>}
              </div>
            </article>)}
          </div>
        </section>

        <section id="skills" className="content-section" aria-labelledby="skills-heading">
          <SectionTitle>Skills</SectionTitle>
          <div className="section-intro" data-reveal><h3 id="skills-heading">Tools I work with</h3><p>Technologies and practices from my work and research.</p></div>
          <div className="skills-list">{skills.map(([name, items]) => <div className="skill-row" key={name} data-reveal><h4>{name}</h4><p>{items}</p></div>)}</div>
        </section>

        <section id="contact" className="content-section contact" aria-labelledby="contact-heading">
          <SectionTitle>Contact</SectionTitle>
          <div className="contact-content" data-reveal><h3 id="contact-heading">Let’s get in touch.</h3><p>Have a project, opportunity, or question in mind? I’d be glad to hear from you.</p>
            <a className="contact-email" href="mailto:martinoferrero02@gmail.com">martinoferrero02@gmail.com <Arrow /></a>
            <div className="contact-links"><a href="https://www.linkedin.com/in/martino-ferrero-17761121a/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="https://github.com/martinoferrero1" target="_blank" rel="noreferrer">GitHub <Arrow /></a></div>
          </div>
        </section>
      </div>
    </main>
    <footer className="footer"><span>© {new Date().getFullYear()} Martino Ferrero</span><a href="#home">Back to top</a></footer>
  </>
}

export default App
