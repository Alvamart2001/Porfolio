//App.js
import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [sections, setSections] = useState([
    { id: 'about', visible: false },
    { id: 'projects', visible: false },
    { id: 'contact', visible: false },
    { id: 'skills', visible: false }
  ]);

  const [projects, setProjects] = useState([]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false); // Estado para controlar si el formulario ha sido enviado

  useEffect(() => {
    let scrollTimer;

    const handleScroll = () => {
      clearTimeout(scrollTimer);
      setShowScrollIndicator(true);

      scrollTimer = setTimeout(() => {
        setShowScrollIndicator(false);
      }, 2000); // 2 segundos
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
        const response = await fetch('https://api.github.com/users/Alvamart2001/repos');
        const data = await response.json();
        const projectsWithDetails = await Promise.all(data.map(project => getProjectDetails(project)));
        setProjects(projectsWithDetails);
      } catch (error) {
        console.error('Error fetching data from GitHub:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
  
      const updatedSections = sections.map(section => {
        const sectionElement = document.getElementById(section.id);
        if (sectionElement) {
          const sectionPosition = sectionElement.offsetTop;
          return { ...section, visible: scrollPosition >= sectionPosition - window.innerHeight / 2 };
        }
        return section;
      });
  
      setSections(updatedSections);
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getProjectDetails = async (repo) => {
    try {
      const response = await fetch(`https://api.github.com/repos/Alvamart2001/${repo.name}`);
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
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    formData.append("access_key", "0731b65b-61af-4cda-8701-67d08daceaa9");
  
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
  
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());
  
    if (res.success) {
      console.log("Success", res);
      // Establecer el estado para mostrar el mensaje de formulario enviado
      setFormSubmitted(true); // Cambia el estado a true cuando el formulario se envía con éxito
      event.target.reset();

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
  {formSubmitted ? (
    <div className="form-submitted-message">
    ¡Tu formulario ha sido enviado con éxito!
    </div>
  ) : (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Nombre:</label>
      <input type="text" id="name" name="name" required />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <label htmlFor="message">Mensaje:</label>
      <textarea id="message" name="message" required></textarea>
      <div className="button-container">
        <button type="submit">Enviar</button>
      </div>
    </form>
  )}
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