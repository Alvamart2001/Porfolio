//App.js
import React, { useState, useEffect, useRef } from 'react'; // Añade useRef aquí
import { useForm, ValidationError } from '@formspree/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import './App.css';

function ContactForm() {
  const formRef = useRef(); // Crea la referencia
  const [state, handleSubmit] = useForm(process.env.REACT_APP_FORMSPREE_API_KEY);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccessMessage(true);
      formRef.current.reset(); // Limpia el formulario
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    }
  }, [state.succeeded]);

  return (
    <div>
      {showSuccessMessage && <p>¡Gracias por contactar!</p>}
      <form ref={formRef} onSubmit={handleSubmit}> {/* Asigna la referencia al formulario */}
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
        <label htmlFor="textarea">
          Mesnaje
        </label>
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
    { id: 'skills', visible: false },
    { id: 'blog', visible: false }
  ]);

  const blogPosts = [
    {
      id: 1,
      title: 'Introducción a React',
      content: (
        <div>
          <p>En este primer post, exploraremos los conceptos básicos de React y su importancia en el desarrollo web.</p>
    
          <h3>Ejemplo 1: Componente Funcional con Estado</h3>
          <SyntaxHighlighter language="javascript" style={solarizedlight}>
            {`import React, { useState } from 'react';
    
            function Counter() {
              const [count, setCount] = useState(0);
    
              return (
                <div>
                  <p>Contador: {count}</p>
                  <button onClick={() => setCount(count + 1)}>Incrementar</button>
                </div>
              );
            }`}
          </SyntaxHighlighter>
    
          <p>Este ejemplo muestra un componente funcional llamado Counter que utiliza el hook useState para mantener un estado local 'count'. El componente renderiza un párrafo que muestra el valor del contador y un botón que incrementa el contador en uno cada vez que se hace clic en él.</p>
    
          <h3>Ejemplo 2: Componente de Clase con Ciclo de Vida</h3>
          <SyntaxHighlighter language="javascript" style={solarizedlight}>
            {`import React, { Component } from 'react';
    
            class Timer extends Component {
              constructor(props) {
                super(props);
                this.state = { seconds: 0 };
              }
    
              componentDidMount() {
                this.timerID = setInterval(() => this.tick(), 1000);
              }
    
              componentWillUnmount() {
                clearInterval(this.timerID);
              }
    
              tick() {
                this.setState({ seconds: this.state.seconds + 1 });
              }
    
              render() {
                return (
                  <div>
                    <p>Tiempo transcurrido: {this.state.seconds} segundos</p>
                  </div>
                );
              }
            }`}
          </SyntaxHighlighter>
    
          <p>En este ejemplo, creamos un componente de clase llamado Timer que inicializa un estado local 'seconds' en 0. Utilizamos los métodos del ciclo de vida componentDidMount y componentWillUnmount para iniciar y detener un temporizador que incrementa el estado 'seconds' cada segundo. El componente renderiza un párrafo que muestra el tiempo transcurrido en segundos.</p>
        </div>
      )
    },

      {
        id: 2,
        title: 'Programación con PHP',
        content: (
          <div>
            <p>En este segundo post, exploraremos los fundamentos de la programación con PHP y su utilidad en el desarrollo web.</p>
      
            <h3>Ejemplo: Creación de una Página Web Dinámica</h3>
            <SyntaxHighlighter language="php" style={solarizedlight}>
              {`<!DOCTYPE html>
      <html>
      <head>
          <title>Ejemplo de PHP</title>
      </head>
      <body>
      
      <h1>¡Bienvenido a mi página web!</h1>
      
      <?php
      // Define variables y las inicializa con valores
      $mensaje = "Hola, mundo!";
      $numero = 10;
      
      // Imprime el mensaje
      echo "<p>$mensaje</p>";
      
      // Realiza un bucle para mostrar números
      for ($i = 1; $i <= $numero; $i++) {
          echo "<p>Número: $i</p>";
      }
      ?>
      
      </body>
      </html>`}
            </SyntaxHighlighter>
      
            <p>En este ejemplo, creamos una página web dinámica utilizando PHP. Primero, definimos algunas variables, como $mensaje y $numero, y luego las utilizamos para mostrar un mensaje de bienvenida y una serie de números del 1 al 10 mediante un bucle for. La capacidad de PHP para generar contenido dinámico facilita la creación de aplicaciones web interactivas y personalizadas.</p>
      
            <h3>Ejemplo: Conexión a una Base de Datos MySQL</h3>
            <SyntaxHighlighter language="php" style={solarizedlight}>
              {`<?php
      // Datos de conexión a la base de datos
      $servername = "localhost";
      $username = "usuario";
      $password = "contraseña";
      $database = "basededatos";
      
      // Crear conexión
      $conn = new mysqli($servername, $username, $password, $database);
      
      // Comprobar la conexión
      if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
      }
      
      echo "Conexión exitosa a la base de datos";
      ?>`}
            </SyntaxHighlighter>
      
            <p>En este ejemplo, mostramos cómo conectar PHP a una base de datos MySQL. Es importante proporcionar los datos correctos del servidor, el nombre de usuario, la contraseña y el nombre de la base de datos. Una vez establecida la conexión, podemos realizar consultas y operaciones en la base de datos, lo que permite crear aplicaciones web más sofisticadas con funcionalidades de almacenamiento y recuperación de datos.</p>
          </div>
        )
      },
   
    // Puedes agregar más posts aquí
  ];
    // Puedes agregar más posts aquí

  const [projects, setProjects] = useState([]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [expandedBlogPostId, setExpandedBlogPostId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const updatedSections = sections.map(section => {
        const element = document.getElementById(section.id);
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        // Si el elemento ya es visible, permanece visible
        // Si no, se asigna el valor de isVisible
        return { ...section, visible: section.visible || isVisible };
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

  return (
    <div className="App">
      <header>
      <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      <link href="https://fonts.cdnfonts.com/css/nrk-sans-2" rel="stylesheet"/>   
                
                      
        <h1>Mi Porfolio</h1>
        
      </header>

      <section id="about" className={sections.find(section => section.id === 'about')?.visible ? 'section-visible' : ''}>
        <h2>Acerca de Mí</h2>
        <p>¡Hola! Soy Álvaro, acabo de graduarme como desarrollador web Full Stack y estoy emocionado por unirme al 
          mundo laboral. Durante mi formación, me especialicé en HTML, CSS, JavaScript, React y PHPMyAdmin, adquiriendo 
          habilidades sólidas en cada área. Mi enfoque proactivo y mi pasión por la resolución de problemas me convierten 
          en un recurso valioso para cualquier equipo. Estoy ansioso por enfrentar nuevos desafíos y contribuir al éxito 
          de proyectos innovadores. Si estás buscando un colaborador entusiasta y comprometido, ¡estoy aquí para ayudar!</p>
          <p>
        Puedes descargar mi <a href="/CV.pdf" download>CV</a> aquí.
      </p>
      </section>

      <section id="projects" className={sections.find(section => section.id === 'projects')?.visible ? 'section-visible' : ''}>
  <h2>Proyectos</h2>
  <div className="projects-list">
    {projects.map(project => (
      <div key={project.id} className="project">
        <h3>
          <a href={`${project.html_url}/blob/main/README.md`} target="_blank" rel="noopener noreferrer">
            {project.name}
          </a>
        </h3>
        <p>{project.description}</p>
        {project.image && <img src={project.image} alt={project.name} />}
        <p>Tecnologías utilizadas: {Array.isArray(project.technologies) ? project.technologies.join(', ') : 'No se especifican tecnologías'}</p>
      </div>
    ))}
  </div>
</section>

<section id="blog" className={sections.find(section => section.id === 'blog')?.visible ? 'section-visible' : ''}>
        <h2>Blog</h2>
        {blogPosts.map(post => (
  <div key={post.id} className="blog-post">
    <h3 onClick={() => setExpandedBlogPostId(post.id === expandedBlogPostId ? null : post.id)}>
      {post.title}
    </h3>
    {post.id === expandedBlogPostId && <div>{post.content}</div>}  </div>
))}
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