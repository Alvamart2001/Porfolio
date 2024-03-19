//App.js
import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

import './App.css';

function ContactForm() {
  const [state, handleSubmit] = useForm("mleqwnpo");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000); // Desaparece después de 2 segundos
    }
  }, [state.succeeded]);
  
  return (
    <div>
      {showSuccessMessage && <p>¡Gracias por contactar!</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email" 
          name="email"
        />
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
        />
        <textarea
          id="message"
          name="message"
        />
        <ValidationError 
          prefix="Mensaje" 
          field="message"
          errors={state.errors}
        />
        <button type="submit" disabled={state.submitting}>
          Enviar
        </button>
      </form>
    </div>
  );
}

function App() {
  const [sections,setSections] = useState([
    { id: 'about', visible: false },
    { id: 'projects', visible: false },
    { id: 'contact', visible: false },
    { id: 'skills', visible: false }
  ]);

  const [projects, setProjects] = useState([]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const updatedSections = sections.map(section => {
        const element = document.getElementById(section.id);
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        return { ...section, visible: isVisible };
      });
      setSections(updatedSections);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  useEffect(() => {
    let scrollTimer;

    const handleScroll = () => {
      clearTimeout(scrollTimer);
      setShowScrollIndicator(true);

      scrollTimer = setTimeout(() => {
        setShowScrollIndicator(false);
      }, 7000); // 2 segundos
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Primero, obtén la lista de repositorios
        const reposResponse = await fetch(`https://api.github.com/users/Alvamart2001/repos`, {
          headers: {
            'Authorization': `token ${process.env.REACT_APP_GITHUB_API_KEY}`
          }
        });
        if (!reposResponse.ok) {
          throw new Error(`GitHub API responded with status code ${reposResponse.status}`);
        }
    
        const repos = await reposResponse.json();
        console.log('Repos:', repos); // Log repos
        
        // Luego, para cada repositorio, obtén los detalles
        const projectsWithDetails = await Promise.all(repos.map(async repo => {
          try {
            const response = await fetch(`https://api.github.com/repos/Alvamart2001/${repo.name}`, {
              headers: {
                'Authorization': `token ${process.env.REACT_APP_GITHUB_API_KEY}`
              }
            });
            const data = await response.json();
            return {
              id: repo.id,
              name: repo.name,
              description: repo.description,
              html_url: repo.html_url,
              homepage: data.homepage,
              technologies: data.language ? [data.language] : [],
              image: `https://raw.githubusercontent.com/Alvamart2001/${repo.name}/master/image.png`
            };
          } catch (error) {
            console.error('Error fetching project details:', error);
            return {
              id: repo.id,
              name: repo.name,
              description: repo.description,
              html_url: repo.html_url,
              homepage: '',
              technologies: [],
              image: '' // In case of error, image URL will be empty
            };
          }
        }));
        console.log('ProjectsWithDetails:', projectsWithDetails); // Log projectsWithDetails
        setProjects(projectsWithDetails);
      } catch (error) {
        console.error('Error fetching data from GitHub:', error);
      }
    };
    
    fetchData();
  }, []);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    try {
      const response = await fetch("https://formspree.io/f/mleqwnpo", {
        method: "POST",
        body: formData
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok, status code: ${response.status}`);
      }
  
      const res = await response.json();
      console.log('Response:', res); // Log response
  
      if (res.ok) {
        console.log("Success", res);
        // Muestra el mensaje de éxito
        setShowSuccessMessage(true);
        // Oculta el mensaje de éxito después de 3 segundos
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
        event.target.reset(); 
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return (
    <div className="App">
      <header>
      <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      <link href="https://fonts.cdnfonts.com/css/nrk-sans-2" rel="stylesheet"/>   
                
                      
        <h1>Mi Porfolio</h1>
        <nav>
          <ul>
            <li><a href="#blog">Blog</a></li>
            <li><a href="/CV.pdf" download>CV</a></li>
          </ul>
        </nav>
      </header>

      <section id="about" className={sections.find(section => section.id === 'about')?.visible ? 'section-visible' : ''}>
        <h2>Acerca de Mí</h2>
        <p>¡Hola! Soy Álvaro, acabo de graduarme como desarrollador web Full Stack y estoy emocionado por unirme al 
          mundo laboral. Durante mi formación, me especialicé en HTML, CSS, JavaScript, React y PHPMyAdmin, adquiriendo 
          habilidades sólidas en cada área. Mi enfoque proactivo y mi pasión por la resolución de problemas me convierten 
          en un recurso valioso para cualquier equipo. Estoy ansioso por enfrentar nuevos desafíos y contribuir al éxito 
          de proyectos innovadores. Si estás buscando un colaborador entusiasta y comprometido, ¡estoy aquí para ayudar!</p>
      </section>

      <section id="projects" className={sections.find(section => section.id === 'projects')?.visible ? 'section-visible' : ''}>
  <h2>Proyectos</h2>
  <div className="projects-list">
    {projects.map(project => (
      <div key={project.id} className="project">
        <h3><a href={project.html_url} target="_blank" rel="noopener noreferrer">{project.name}</a></h3>
        <p>{project.description}</p>
        {project.image && <img src={project.image} alt={project.name} />}
        <p>Tecnologías utilizadas: {Array.isArray(project.technologies) ? project.technologies.join(', ') : 'No se especifican tecnologías'}</p>
      </div>
    ))}
  </div>
</section>

      <div className="contact-skills-container">
      <section id="contact" className={sections.find(section => section.id === 'contact')?.visible ? 'section-visible' : ''}>
        <h2>Contacto</h2>
        <ContactForm />
      </section>

  <section id="skills" className={sections.find(section => section.id === 'skills')?.visible ? 'section-visible' : ''}>
    <h2>Habilidades</h2>
    <div className="skills-container">
  <i class="devicon-java-plain-wordmark" title="Java"></i>
  <i class="devicon-javascript-plain" title="JavaScript"></i>
  <i class="devicon-json-plain" title="JSON"></i>
  <i class="devicon-html5-plain-wordmark" title="HTML5"></i>
  <i class="devicon-php-plain" title="PHP"></i>
  <i class="devicon-react-original" title="React"></i>
  <i class="devicon-mysql-plain-wordmark" title="MySQL"></i>
  <i class="devicon-css3-plain-wordmark" title="CSS3"></i>
</div>
  </section>
  </div>

      {showScrollIndicator && (
        <div className="scroll-indicator">
          <span className="arrow-down"></span>
        </div>
      )}
    </div>
  );
}

export default App;