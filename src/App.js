// src/App.js
import React, { useState, useRef, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import ScrollToTopButton from './ScrollToTopButton';
import { FaCat } from 'react-icons/fa'; // FontAwesome Cat icon
// DeepFake API endpoint
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/predict";


// FadeInSection: Re-triggers fade/slide animation each time its content enters the viewport.
function FadeInSection({ children, className = "" }) {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setVisible(entry.isIntersecting);
      });
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);
  return (
    <div
      ref={domRef}
      className={`${className} transition duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}



function Navbar({ menuOpen, setMenuOpen }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleClick = (hash) => {
    if (isHomePage) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  };

  const fullMenuItems = [
    { label: "Home", hash: "#home" },
    { label: "Skills", hash: "#skills" },
    { label: "Education", hash: "#education" },
    { label: "Experience", hash: "#experience" },
    { label: "Projects", hash: "#projects" },
    { label: "Contact", hash: "#contact" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-2 fixed w-full top-0 z-20 bg-black-900 bg-opacity-99 backdrop-blur">
      <div>
        <div className="text-xl font-bold text-white">Vijay Iyer</div>
        <div className="text-xs md:text-sm text-purple-300 mt-1">
          MSc. Electrical Engineering & Information Technology @ KIT
        </div>
      </div>

      {/* Hamburger button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {!menuOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>

      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-4 text-sm md:text-base">
        {fullMenuItems.map(({ label, hash }) => (
          <li key={label}>
            {isHomePage ? (
              <button
                onClick={() => handleClick(hash)}
                className="text-white aura-effect rounded-full px-3 py-1 border border-transparent inline-flex items-center justify-center"

              >
                {label}
              </button>
            ) : (
              <Link
                to={`/#${hash.slice(1)}`}
                className="text-white aura-effect rounded-full px-3 py-1 border border-transparent inline-flex items-center justify-center"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="flex flex-col space-y-4 bg-[#0a0c10] bg-opacity-90 absolute top-full left-0 w-full p-6 md:hidden text-sm">
          {fullMenuItems.map(({ label, hash }) => (
            <li key={label}>
              {isHomePage ? (
                <button
                  onClick={() => handleClick(hash)}
                  className="text-white aura-effect rounded-full px-3 py-1 border border-transparent inline-flex items-center justify-center"
                >
                  {label}
                </button>
              ) : (
                <Link
                  to={`/#${hash.slice(1)}`}
                  className="text-white aura-effect rounded-full px-3 py-1 border border-transparent inline-flex items-center justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}




// ToolsIcons: Renders tool icons using regular image URLs.
function ToolsIcons() {
  const tools = [
    { key: "git", label: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { key: "linux", label: "Linux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { key: "docker", label: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { key: "matlab", label: "Matlab", src: "https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png" },
    { key: "autocad", label: "AutoCAD", src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Autodesk_AutoCAD_2019_logo.svg" },
  ];
  return (
    <div className="flex flex-wrap justify-evenly gap-6">
      {tools.map((tool) => (
        <div key={tool.key} className="flex flex-col items-center aura-effect">
          <img src={tool.src} alt={tool.label} className="w-16 h-16 mb-2" />
          <span className="mt-2 text-sm font-medium text-white">{tool.label}</span>
        </div>
      ))}
    </div>
  );
}

// MainPage: Contains HERO, SKILLS, EDUCATION, EXPERIENCE, PROJECTS, and CONTACT sections.
function MainPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Scroll smoothly after DOM renders
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 0);
      }
    }
  }, [location]);

  return (
    <div>
      {/* HERO SECTION */}
      <FadeInSection className="pt-24 pb-20">
        <div id="Hero" className="w-full bg-black-900 bg-opacity-20 shadow-md mb-8 p-6">
          <section id="home" className="flex flex-col-reverse md:flex-row items-center scroll-mt-40">
            <div className="w-full md:w-1/2 text-align: justify;">
             <p className="text-xl md:text-2xl mb-8 text-purple-100 text-center md:text-justify">
  <span
    className="block font-bold text-white text-2xl md:text-3xl mb-4"
    style={{
      textShadow: "0 0 6px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.5)",
    }}
  >
   Designing Intelligent Safety Systems & Health Technologies
  </span>
  Graduate engineer specializing in computer vision, machine learning, and embedded systems for intelligent safety and health applications. Experienced in developing and fine-tuning deep learning architectures, transformer models, and end-to-end pipelines. Skilled in transfer learning, signal processing, and deploying optimized models on embedded platforms for real-time, user-centered solutions.
</p>







              <div className="flex gap-4 mt-4">
  <a
    href={require('./media/Vijay_CV.pdf')}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-[16px] px-6 py-3 aura-effect always-aura bg-black-600 text-purple-300 font-bold border border-purple-500 transition-shadow duration-300 ease-in-out"
  >
    My Resume
  </a>
</div>


            </div>
            <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
  <div className="w-80 h-80 overflow-visible rounded-full shadow-[0_0_40px_rgba(255,255,255,0.6)]">
    <img
      src={require('./media/vijay.jpg')}
      alt="Hero"
      className="w-full h-full object-cover rounded-full"
    />
  </div>
</div>


          </section>
        </div>
      </FadeInSection>
 
{/* SKILLS SECTION */}
<FadeInSection className="py-12 md:py-32">


  <div
    id="skills"
    className="scroll-mt-32 w-full bg-black-900 bg-opacity-20 shadow-md mb-8 p-6"
  >
    <h2 className="text-3xl font-bold mb-8 text-white text-center" style={{
      textShadow: "0 0 6px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.5)",
    }}>My Tech Stack</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
      
      {/* AI/ML Card */}
      <div className="bg-transparent bg-opacity-70 rounded-2xl p-6 shadow-lg border-[3px] border-purple-700 shadow-purple-glow h-full">
        <h3 className="text-2xl font-bold text-white mb-4">AI / ML</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python", label: "Python" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", alt: "C++", label: "C++" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", alt: "TensorFlow", label: "TensorFlow" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", alt: "PyTorch", label: "PyTorch" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg", alt: "OpenCV", label: "OpenCV" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", alt: "Pandas", label: "Pandas" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", alt: "NumPy", label: "NumPy" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg", alt: "Matplotlib", label: "Matplotlib" },
            { src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg", alt: "scikit-learn", label: "scikit‑learn" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/qt/qt-original.svg", alt: "Qt", label: "Qt" },
          ].map(({ src, alt, label }) => (
            <div key={label} className="flex flex-col items-center rounded-full p-2 aura-effect hover:shadow-lg hover:shadow-purple-600/60 w-20">
              <img src={src} alt={alt} className="w-8 h-8 mb-1" />
              <p className="text-white font-semibold text-sm text-center">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Web Development Card */}
      <div className="bg-transparent bg-opacity-70 rounded-2xl p-6 shadow-lg border-[3px] border-purple-700 shadow-purple-glow h-full">
        <h3 className="text-2xl font-bold text-white mb-4">Web Development</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript", label: "JavaScript" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React.js", label: "React.js" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js", label: "Node.js" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML", label: "HTML" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS", label: "CSS" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", alt: "MySQL", label: "SQL" },
          ].map(({ src, alt, label }) => (
            <div key={label} className="flex flex-col items-center rounded-full p-2 aura-effect hover:shadow-lg hover:shadow-purple-600/60 w-20">
              <img src={src} alt={alt} className="w-8 h-8 mb-1" />
              <p className="text-white font-semibold text-sm text-center">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Card */}
<div className="bg-transparent bg-opacity-70 rounded-2xl p-6 shadow-lg border-[3px] border-purple-700 shadow-purple-glow h-full">
  <h3 className="text-2xl font-bold text-white mb-4">Tools</h3>
  <div className="flex flex-wrap justify-center gap-4">
    {[
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", alt: "Git", label: "Git" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", alt: "Docker", label: "Docker" },
      { src: "https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png", alt: "MATLAB", label: "MATLAB" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", alt: "Linux", label: "Linux" },
{
  src: "https://img.icons8.com/ios-filled/50/ffffff/brain--v1.png", // brain with network nodes style
  alt: "LLM",
  label: "LLM"
},
      { 
        src: "https://huggingface.co/front/assets/huggingface_logo.svg", 
        alt: "Hugging Face", 
        label: "Hugging Face" 
      },
      { 
        src: "https://img.icons8.com/ios-filled/50/ffffff/pencil-tip.png", 
        alt: "Prompt Engineering", 
        label: "Prompt Engineering" 
      },
    ].map(({ src, alt, label }) => (
      <div key={label} className="flex flex-col items-center rounded-full p-2 aura-effect hover:shadow-lg hover:shadow-purple-600/60 w-20">
        <img src={src} alt={alt} className="w-8 h-8 mb-1" />
        <p className="text-white font-semibold text-sm text-center">{label}</p>
      </div>
    ))}
  </div>
</div>

    </div>
  </div>
</FadeInSection>





{/* EDUCATION SECTION */}
<FadeInSection className="py-20">
  <div id="education" className="scroll-mt-32 w-full bg-black-900 bg-opacity-20 shadow-md mb-8 p-6">
    <h2 className="text-3xl font-bold mb-8 text-white" style={{
      textShadow: "0 0 6px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.5)",
    }}>Education</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 items-start">

      
      {/* KIT Card */}
      <div
        className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer"
        style={{ minHeight: '230px', maxHeight: '230px' }}
      >
        <div className="flex items-center space-x-4">
          <img
            src={require('./media/KIT.webp')}
            alt="KIT Logo"
            className="h-20 w-20 rounded bg-white object-contain"
          />
          <div>
            <h3 className="text-xl font-bold text-white">Karlsruhe Institute of Technology</h3>
            <p className="text-purple-100">M.Sc. in Electrical Engineering and Information Technology</p>
            <p className="text-sm text-purple-100 mt-2">
              May 2022 – July 2025
              <br />
              GPA: 2.3
            </p>
          </div>
        </div>
        
         {/* Hover me button */}
        <button className="absolute bottom-2 right-2 bg-transparent border-2 border-purple-700 text-white px-3 py-1.5 rounded-full text-xs hover:bg-purple-700 transition shadow-[0_0_10px_2px_rgba(126,34,206,0.7)] group-hover:opacity-0 flex items-center">
          <FaCat className="w-4 h-4 mr-1" />
          Hover me
        </button>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-[16px]">
          <h3 className="text-lg font-bold mb-2">Technical Competency</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li><strong>Software Engineering:</strong> Structured software architecture, SDLC methodologies, agile and DevOps integration</li>
            <li><strong>Machine Learning:</strong> Neural network modeling, computer vision, and deep learning optimization techniques</li>
            <li><strong>Networked Systems:</strong> Digital communication protocols, layered network architectures, and QoS assurance</li>
            <li><strong>Control & Optimization:</strong> Model-based dynamic system optimization, predictive control, and state estimation</li>
            <li><strong>Embedded Systems:</strong> Real-time embedded architectures, microcontroller programming, and system integration in energy and autonomous domains</li>
            <li><strong>Rapid Prototyping & Innovation:</strong> Full-cycle system prototyping, HCI-driven interface design, and technology incubation under entrepreneurial frameworks</li>
          </ul>
        </div>
      </div>

      {/* University of Mumbai Card */}
      <div
        className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer"
        style={{ minHeight: '230px', maxHeight: '230px' }}
      >
        <div className="flex items-center space-x-4">
          <img
            src={require('./media/MU.png')}
            alt="MU Logo"
            className="h-20 w-20 rounded bg-white object-contain"
          />
          <div>
            <h3 className="text-xl font-bold text-white">University of Mumbai</h3>
            <p className="text-purple-100">B.Eng. in Electronics Engineering</p>
            <p className="text-sm text-purple-100 mt-2">
              Aug 2017 – May 2021
              <br />
              GPA: 2.8
            </p>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-[16px]">
          <h3 className="text-lg font-bold mb-2">Technical Competency</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li><strong>Signal Processing:</strong> Core understanding of analog/digital signal processing, including filter design and spectral analysis</li>
            <li><strong>Communication Systems:</strong> Modulation schemes, error detection/correction, and telecom fundamentals</li>
            <li><strong>Microelectronics:</strong> Semiconductor theory, logic design, and integrated circuit layout principles</li>
            <li><strong>Embedded Systems:</strong> Basics of embedded C, sensor interfacing, and microcontroller-based projects</li>
            <li><strong>Control Systems:</strong> Classical and modern control techniques, PID tuning, and simulation in MATLAB</li>
            <li><strong>Project Work:</strong> Hands-on academic projects in robotics, automation, and IoT frameworks</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</FadeInSection>







    
     {/* WORK EXPERIENCE SECTION */}
<FadeInSection className="py-20">
  <div id="experience" className="scroll-mt-32 w-full bg-black-900 bg-opacity-20 shadow-md mb-8 p-6">
    <h2 className="text-3xl font-bold mb-8 text-white" style={{
      textShadow: "0 0 6px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.5)",
    }}>Work Experience</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">

      {/* Flowcate*/}
      <div
  className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer mb-8 md:mb-0"
  style={{ minHeight: '230px', maxHeight: '230px' }}
>
        <div className="flex items-center space-x-4">
  <img 
    src={require('./media/Flowcate.jpg')} 
    alt="Flowcate Logo" 
    className="h-20 w-20 rounded bg-white object-contain" 
  />
  <div>
    <h3 className="text-xl font-bold text-white">
      Flowcate GmbH
    </h3>
    <p className="text-purple-100">
      Junior Software Developer (Full-time)
    </p>
    <p className="text-sm text-purple-100 mt-2">
      Jan 2026 – Present
    </p>
  </div>
</div>

        <div className="flex flex-wrap mt-2 gap-1">
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Python</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">C++</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">OpenCV</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Linux</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Docker</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Git</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">LiDAR, GPS, RFID</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Spatial AI</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">IoT</span>
          
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-[16px]">

          <h3 className="text-xl font-bold mb-2">Flowcate GmbH</h3>
          <p className="text-sm">
            <strong>Key Contributions:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Develop and optimize core components of the DeepHub® platform to power Spatial AI applications, delivering robust real-time processing of location and sensor data.</li>
              <li>Build high-performance, scalable, and secure backend services in C++ and Python that enable intelligent spatial understanding and seamless integration with IoT systems.</li>
            </ul>
          </p>
        </div>
      </div>

      {/* FZI */}
      <div
  className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer mb-8 md:mb-0"
  style={{ minHeight: '230px', maxHeight: '230px' }}
>
        <div className="flex items-center space-x-4">
  <img 
    src={require('./media/1524.png')} 
    alt="FZI Logo" 
    className="h-20 w-20 rounded bg-white object-contain" 
  />
  <div>
    <h3 className="text-xl font-bold text-white">
      Forschungszentrum Informatik
    </h3>
    <p className="text-purple-100">
      Research Assistant
    </p>
    <p className="text-sm text-purple-100 mt-2">
      Sept 2025 – Dec 2025
    </p>
  </div>
</div>

        <div className="flex flex-wrap mt-2 gap-1">
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Python</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Signal Processing</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">OpenCV</span>
<span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Deep Learning</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Linux</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Docker</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Git</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">DeepFake</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">rPPG</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">3D-Geometric Facemesh</span>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-[16px]">

          <h3 className="text-xl font-bold mb-2">FZI</h3>
          <p className="text-sm">
            <strong>Key Contributions:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Implement dynamic ROI tracking using 3D geometric facemesh reconstruction and facial landmark localization to improve spatial awareness in DeepFake detection.</li>
              <li>Design an interactive visualization interface that maps artifact energy across facial regions using image-based feature analysis and temporal coherence cues.</li>
              <li>Optimize detection models through transfer learning, fine-tuning and ensemble methods to enhance performance on challenging visual manipulations.</li>
              <li>Contribute significantly to academic discourse through a subsequent research publication.</li>
            </ul>
          </p>
        </div>
      </div>

      {/* TecoLab */}
      <div
  className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer mb-8 md:mb-0"
  style={{ minHeight: '230px', maxHeight: '230px' }}
>
        <div className="flex items-center space-x-4">
          <img src={require('./media/teco_trans.png')} alt="TecoLab Logo" className="h-20 w-20 rounded bg-white object-contain" />
          <div>
            <h3 className="text-xl font-bold text-white">TecoLab</h3>
            <p className="text-purple-100">Working Student</p>
            <p className="text-sm text-purple-100 mt-2">Mar 2023 – Dec 2025</p>
          </div>
        </div>
        <div className="flex flex-wrap mt-2 gap-1">
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Python</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">OpenCV</span>  
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Linux</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Docker</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Git</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">EdgeML</span>      
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">C++</span> 
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">OpenEarable</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Jekyll</span>

        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-[16px]">

          <h3 className="text-xl font-bold mb-2">TecoLab</h3>
          <p className="text-sm">
            <strong>Key Contributions:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>ML4Print: Classification based on printer-specific characteristics and paper substrate type using feature extraction and supervised ML classifiers.</li>
              
              <li>Sensor optimization for open-earables with TinyML and quantized neural networks for on-device inference.</li>
              <li>Heat simulation: utilized regression models and CFD data integration to simulate the thermal behavior of liquids within industrial valves, thereby enhancing predictive maintenance capabilities and system reliability.</li>
            </ul>
          </p>
        </div>
      </div>

      {/* Access@KIT */}
      <div
  className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer mb-8 md:mb-0"
  style={{ minHeight: '230px', maxHeight: '230px' }}
>
        <div className="flex items-center space-x-4">
  <img 
    src={require('./media/6379_access@kit_rgb_dt.png')} 
    alt="Access@KIT Logo" 
    className="h-20 w-20 rounded bg-white object-contain" 
  />
  <div>
    <h3 className="text-xl font-bold text-white">
      Access@KIT
    </h3>
    <p className="text-purple-100">
      Working Student
    </p>
    <p className="text-sm text-purple-100 mt-2">
      Mar 2023 – May 2023
    </p>
  </div>
</div>

        <div className="flex flex-wrap mt-2 gap-1">
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">TTS</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Deep Learning</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Accessibility</span>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-[16px]">

          <h3 className="text-xl font-bold mb-2">Access@KIT</h3>
          <p className="text-sm">
            <strong>Key Contribution:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Implemented a diffusion-based text-to-speech framework leveraging phoneme alignment and acoustic features to generate natural, high-quality speech.</li>
              <li>Optimized the pipeline through data preprocessing, feature extraction, and iterative tuning, improving accessibility tools for visually impaired users.</li>

            </ul>
          </p>
        </div>
      </div>

      {/* Accenture */}
      <div
  className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer mb-8 md:mb-0"
  style={{ minHeight: '230px', maxHeight: '230px' }}
>
        <div className="flex items-center space-x-4">
  <img 
    src={require('./media/Accenture.webp')} 
    alt="Accenture Logo" 
    className="h-20 w-20 rounded bg-white object-contain" 
  />
  <div>
    <h3 className="text-xl font-bold text-white">
      Accenture India
    </h3>
    <p className="text-purple-100">
      Associate SE
    </p>
    <p className="text-sm text-purple-100 mt-2">
      Feb 2022 – Apr 2022
    </p>
  </div>
</div>

        <div className="flex flex-wrap mt-2 gap-1">
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">COBOL</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Mainframe</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Legacy Systems</span>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-[16px]">

          <h3 className="text-xl font-bold mb-2">Accenture India</h3>
          <p className="text-sm">
            <strong>Key Contribution:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Maintained IBM Data-center servers with batch job scheduling and performance monitoring using COBOL scripts.</li>
            </ul>
          </p>
        </div>
      </div>

      {/* Accur Digitus */}
      <div
  className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer"
  style={{ minHeight: '230px', maxHeight: '230px' }}
>
        <div className="flex items-center space-x-4">
  <img 
    src={require('./media/accur_digitus_logo.jpg')} 
    alt="Accur Digitus Logo" 
    className="h-20 w-20 rounded bg-white object-contain" 
  />
  <div>
    <h3 className="text-xl font-bold text-white">
      Accur Digitus
    </h3>
    <p className="text-purple-100">
      Web Development Intern
    </p>
    <p className="text-sm text-purple-100 mt-2">
      Jan 2020 – May 2020
    </p>
  </div>
</div>

        <div className="flex flex-wrap mt-2 gap-1">
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">React.JS</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Tailwind</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Redux</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">HTML</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">CSS</span>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-[16px]">

          <h3 className="text-xl font-bold mb-2">Accur Digitus</h3>
          <p className="text-sm">
            <strong>Key Contributions:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Developed responsive apps using React.JS & Tailwind CSS.</li>
              <li>Integrated scalable RESTful APIs & Redux for state management.</li>
              <li>Enhanced user experience leading to more than 30% engagement increase.</li>
            </ul>
          </p>
        </div>
      </div>

    </div>
  </div>
</FadeInSection>



   {/* PROJECTS SECTION */}
<FadeInSection className="py-20">
  <div id="projects" className="scroll-mt-32 w-full bg-black-900 bg-opacity-20 shadow-md mb-8 p-6">
    <h2 className="text-3xl font-bold mb-8 text-white" style={{
      textShadow: "0 0 6px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.5)",
    }}>Projects</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">

      
      {/* DeepFake Detection */}
      <div
        className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer mb-8 md:mb-0"
        style={{ minHeight: '230px', maxHeight: '230px' }}
      >
        <div className="flex items-center space-x-4">
          <img
            src={require('./media/DEEP.jpg')}
            alt="DeepFake Logo"
            className="h-20 w-20 object-cover rounded-full"
          />
          <div>
            <div>
  <h3 className="text-xl font-bold text-white">DeepFake Detection</h3>
  <p className="text-sm text-purple-100 mt-1">Forschungszentrum Informatik - 2025</p>
</div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Python</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Signal Processing</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">OpenCV</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Deep Learning</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Linux</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Docker</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Git</span>
            </div>
            <p className="text-purple-100 mt-2">rPPG Analysis</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-[16px] flex flex-col">
  <div>
    <h3 className="text-xl font-bold mb-2">DeepFake Detection System</h3>
    <p className="text-sm mb-4"> This Master Thesis aimed to design an end to end pipeline to evaluate the artifacts using rPPG signals. Designed a Fusion Model, concatenating the features from Vision Transformer and CNN for local and long-range dependencies with a custom Fusion-Head for DeepFake classification. Benchmark results under different environmental conditions. </p>
  </div>
  <Link to="/projects/deepfake" className="mt-auto self-start bg-transparent border-2 border-purple-700 text-white px-3 py-1 rounded-full hover:bg-purple-700 transition shadow-[0_0_10px_2px_rgba(126,34,206,0.7)]">
    More Info
  </Link>
</div>

      </div>

      {/* CamCussion */}
      <div
        className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer mb-8 md:mb-0"
        style={{ minHeight: '230px', maxHeight: '230px' }}
      >
        <div className="flex items-center space-x-4">
          <img
            src={require('./media/CCS.jpg')}
            alt="CCS Logo"
            className="h-20 w-20 object-cover rounded-full"
          />
          <div>
            <div>
  <h3 className="text-xl font-bold text-white">CamCussion</h3>
  <p className="text-sm text-purple-100 mt-1">Zeiss Innovation Hub - 2024</p>
</div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Python</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Image Processing</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">ML</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">OpenCV</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Linux</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Git</span>
            </div>
            <p className="text-purple-100 mt-2">Eye Tracking</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-[16px] flex flex-col">
  <div>
    <h3 className="text-xl font-bold mb-2">CamCussion</h3>
    <p className="text-sm mb-4"> Utilized computer-vision to analyze pupil dilation and saccadic eye movements in real time to track and assess eye behavior, contributing to accurate concussion diagnosis. </p>
  </div>
  <Link 
    to="/projects/camcussion"
    className="mt-auto self-start bg-transparent border-2 border-purple-700 text-white px-3 py-1 rounded-full hover:bg-purple-700 transition shadow-[0_0_10px_2px_rgba(126,34,206,0.7)]"
  >
    More Info
  </Link>
</div>

      </div>

      {/* Self-Driving Car */}
      <div
        className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer mb-8 md:mb-0"
        style={{ minHeight: '230px', maxHeight: '230px' }}
      >
        <div className="flex items-center space-x-4">
          <img
            src={require('./media/LiDAR-Technology.png')}
            alt="LiDAR Logo"
            className="h-20 w-20 object-cover rounded-full"
          />
          <div>
            <div>
  <h3 className="text-xl font-bold text-white">Self-Driving Car using LIDAR</h3>
  <p className="text-sm text-purple-100 mt-1">2023</p>
</div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">LIDAR</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Autonomous</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">3D Mapping</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">OpenCV</span>
            </div>
            <p className="text-purple-100 mt-2">Autonomous Nav</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-[16px] flex flex-col">
  <div>
    <h3 className="text-xl font-bold mb-2">Self-Driving Car using LIDAR</h3>
    <p className="text-sm mb-4">
      Developed a solar-powered autonomous vehicle prototype using 360° LIDAR for reliable obstacle detection and safe navigation. Implemented on Arduino with custom chassis and differential drive, aimed at enhancing safety in urban mobility applications.
            </p>
          </div>
          <Link 
            to="/projects/self-driving"
            className="mt-auto self-start bg-transparent border-2 border-purple-700 text-white px-3 py-1 rounded-full hover:bg-purple-700 transition shadow-[0_0_10px_2px_rgba(126,34,206,0.7)]"

          >
            More Info
          </Link>
        </div>
      </div>

      {/* Real-Time Car Accident Alert System */}
      <div
        className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer"
        style={{ minHeight: '230px', maxHeight: '230px' }}
      >
        <div className="flex items-center space-x-4">
          <img
            src={require('./media/RTC.png')}
            alt="RTC Logo"
            className="h-20 w-20 object-cover rounded-full"
          />
          <div>
            <div>
              <h3 className="text-xl font-bold text-white">Real Time Accident Alert System</h3>
              <p className="text-sm text-purple-100 mt-1">2022</p>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Python</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Edge computing</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Embedded</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Sensor Fusion</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Crash Detection</span>
            </div>
            <p className="text-purple-100 mt-2">Crash Detection</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-[16px] flex flex-col">
  <div>
    <h3 className="text-xl font-bold mb-2">Real-Time Car Accident Alert System</h3>
    <p className="text-sm mb-4">
      Developed an embedded vehicle accident warning system to automatically detect crashes, send precise location data, and alert emergency services, family, and friends to improve response times.
    </p>
  </div>
  <Link 
    to="/projects/car-accident"
    className="mt-auto self-start bg-transparent border-2 border-purple-700 text-white px-3 py-1 rounded-full hover:bg-purple-700 transition shadow-[0_0_10px_2px_rgba(126,34,206,0.7)]"

  >
    More Info
  </Link>
</div>

      </div>

    </div>
  </div>
</FadeInSection>

      

 {/* CONTACT SECTION */}
<FadeInSection className="py-20">
  <div id="contact" className="scroll-mt-32 w-full bg-black-900 bg-opacity-20 shadow-md mb-8 p-6">
    <h2 className="text-3xl font-bold mb-4 text-white" style={{
      textShadow: "0 0 6px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.5)",
    }}>Contact Me</h2>
    <p className="text-purple-100 mb-8">
      I'm always up for a wild brainstorming session where we turn pixels into pure magic. Let’s chat if you're as excited about computer vision adventures as I am!
    </p>
    <div className="flex justify-center space-x-6">
      <a
        href="mailto:iyervijay99@gmail.com"
        className="bg-black-600 text-white aura-effect p-4 rounded-full font-bold border border-purple-500 flex items-center justify-center"
      >
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
          <polyline points="3,6 12,13 21,6" />
        </svg>
      </a>
      <a
        href="tel:+4917667345305"
        className="bg-black-600 text-white aura-effect p-4 rounded-full font-bold border border-purple-500 flex items-center justify-center"

      >
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.81 19.81 0 01-8.63-3.19 19.5 19.5 0 01-5.82-5.82 19.81 19.81 0 01-3.19-8.63A2 2 0 014.08 2h3a2 2 0 012 1.72c.14.72.37 1.42.68 2.08a2 2 0 01-.45 2.11L8.09 8.09a16.06 16.06 0 005.82 5.82l1.18-1.18a2 2 0 012.11-.45c.66.31 1.36.54 2.08.68A2 2 0 0122 16.92z" />
        </svg>
      </a>
      <a
        href="https://www.linkedin.com/in/iyer-vijay/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black-600 text-white aura-effect p-4 rounded-full font-bold border border-purple-500 flex items-center justify-center"

      >
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      </a>
    </div>
  </div>
</FadeInSection>

{/* Scroll To Top Button */}
  <ScrollToTopButton />


    
      {/* FOOTER */}
      <footer className="text-center py-4">
        <p className="text-purple-100">
          &copy; {new Date().getFullYear()} Vijay Mohanram Iyer. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

// Dummy detail components for clickable cards.
function TecoLabDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      At TecoLab, I played a pivotal role in integrating advanced machine learning algorithms into our production systems. I spearheaded the development of the ML4Print project—a sophisticated document analysis pipeline that combines OCR, pattern recognition, and custom deep learning models to classify and authenticate printed documents in real time. My contributions involved designing data pre-processing modules using Python and TensorFlow, optimizing neural network architectures to reduce inference latency, and implementing RESTful API endpoints that integrated seamlessly with our existing CMS. Additionally, I engineered a heat simulation module that leverages regression models and recurrent neural networks (RNNs) to simulate the thermal behavior of liquids in industrial valves. This module not only improved our predictive maintenance capabilities but also reduced system downtime by 25%. I also collaborated closely with the DevOps team to containerize our applications using Docker and orchestrate deployments with Kubernetes, ensuring scalability and robust performance in a cloud environment.
    </div>
  );
}
function AccessKITDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      At Access@KIT, my focus was on enhancing digital accessibility and user engagement. I developed a dynamic front-end using React and Material-UI, incorporating ARIA roles and semantic HTML to improve accessibility standards across the platform. I integrated a cutting-edge text-to-speech (TTS) engine using custom Python scripts and third-party APIs, enabling real-time audio rendering of on-screen text for visually impaired users. Additionally, I implemented custom caching and asynchronous data fetching techniques to optimize the performance of the application, reducing load times by nearly 40%. These improvements resulted in a more inclusive and user-friendly interface, setting new benchmarks for accessibility in web applications.
    </div>
  );
}
function AccurDigitusDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      In my role at Accur Digitus, I was responsible for building responsive and scalable web applications using React.js. I developed reusable components that interfaced with complex back-end systems via RESTful APIs, ensuring smooth and efficient data flow. I also introduced state management solutions with Redux to handle application-wide states, improving performance and maintainability. My work involved close collaboration with UI/UX designers to iterate on designs and implement pixel-perfect layouts using Tailwind CSS, ultimately enhancing user engagement and overall web performance.
    </div>
  );
}
function AccentureDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      At Accenture, I contributed to the maintenance and optimization of IBM Mainframe systems, which were critical to supporting enterprise-level business operations. My responsibilities included writing COBOL scripts and implementing system monitoring tools that automated routine maintenance tasks. I collaborated with cross-functional teams to debug and resolve performance bottlenecks, ensuring continuous system reliability and uptime. This role honed my skills in legacy system integration and modernized maintenance practices.
    </div>
  );
}
function CarAccidentDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      <div className="flex flex-col md:flex-row md:space-x-12">
        {/* Left: Text Content */}
    <div className="md:w-1/2 space-y-6">
  <h2 className="text-xl font-semibold">
    Real-Time Car Accident Alert System
  </h2>

  <h3 className="text-lg font-semibold">Overview:</h3>
  <ul className="list-disc ml-6 space-y-1">
    <li>
      Input Video Stream – Raw traffic video is fed into the system and broken into frames using the Video Preprocessor.
    </li>
    <li>
      Object Detection – Each frame is analyzed by YOLOv8, producing bounding boxes around key objects such as cars, buses, and pedestrians. Accident likelihood is tied to object interactions (e.g., two cars colliding).
    </li>
    <li>
      Bounding Box to Mask Conversion – Detected bounding boxes are converted into binary masks. The Image Preprocessor and Mask Generator encode positional information of detected objects, reducing complexity by focusing on movements rather than raw pixels.
    </li>
    <li>
      Sliding Window – Sequential bounding box masks are processed with a sliding window to capture temporal motion patterns.
    </li>
    <li>
      Traffic Accident Detector – A CNN Encoder extracts spatial features while a ConvLSTM2D learns spatio-temporal dynamics (e.g., sudden deceleration, collisions, trajectory overlaps). Final classification outputs Accident (0) or Non-Accident (1).
    </li>
  </ul>

  <h3 className="text-lg font-semibold">Transition to ESP32 + TensorFlow Lite Deployment:</h3>
  <ul className="list-disc ml-6 space-y-1">
    <li>
      Model Simplification – The ConvLSTM2D model is too heavy for ESP32. It is replaced with a compact LSTM/GRU model trained on accelerometer/gyroscope (IMU) data or lightweight object detection features. TensorFlow Lite for Microcontrollers with quantization (INT8/FP16) is used to shrink the model.
    </li>
    <li>
      Hardware Setup – ESP32 microcontroller for real-time inference, MPU6050 accelerometer/gyroscope for impact detection, GPS module for location, and GSM/Wi-Fi for sending alerts.
    </li>
  </ul>
</div>


        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
          <a href={require("./media/Alert.png")} target="_blank" rel="noopener noreferrer">
            <img
  src={require("./media/Alert.png")}
  alt="Accident Alert System Diagram"
  className="rounded shadow-lg"
  style={{ width: '580px', height: 'auto' }}
/>

          </a>
        </div>
      </div>

      {/* GitHub button */}
      <div className="flex justify-center mt-12">
        <a
          href="https://github.com/iyervijay21/car-accident-alert-system"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-3 border border-purple-400 rounded-xl text-purple-200 hover:text-white transition always-aura"
        >
          <svg
            className="w-5 h-5 mr-2 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 ... (shortened) ..." />
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  );
}



function SelfDrivingDetail() {
  return (
    <section className="container mx-auto px-6 py-20 text-purple-200">
      <div className="flex flex-col md:flex-row md:space-x-12">
        {/* Left: Text Content */}
        <article className="md:w-1/2 space-y-6">
          <h2 className="text-xl font-semibold">
            3D LIDAR Vision Transformer for Real-Time Obstacle Detection
          </h2>

          <section>
            <h3 className="text-lg font-semibold">Project Overview:</h3>
            <p>
              Designed a state-of-the-art Vision Transformer (ViT) architecture
              to perform real-time 3D obstacle detection using raw LIDAR point
              cloud data for autonomous driving applications. The system
              voxelizes point clouds into ViT-compatible tokens and employs
              transformer attention to classify and detect surrounding obstacles.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold">Motivation:</h3>
            <p>
              Existing 3D detection methods rely heavily on hand-crafted features
              or CNN-based models, which lack long-range context modeling. Our ViT
              approach captures global spatial dependencies in LIDAR data,
              improving detection accuracy and robustness.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold">Key Features:</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Efficient voxelization preprocessing converting point clouds into tokens.</li>
              <li>Custom Vision Transformer architecture optimized for LIDAR data.</li>
              <li>Standalone training pipeline with validation and performance metrics.</li>
              <li>Real-time inference scripts designed for embedded deployment.</li>
              <li>Modular and extensible codebase with optimized large-scale point cloud processing.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold">Technical Highlights:</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Voxel grid dimensions configurable (e.g., 100x100x20) with fine voxel resolution (0.1m³).</li>
              <li>Embedding dimension of 256 with multi-head attention (8 heads) across 6 transformer layers.</li>
              <li>Training with AdamW optimizer, learning rate 1e-4, and weight decay 1e-4 for regularization.</li>
              <li>Preprocessing normalizes coordinates and incorporates intensity values from LIDAR returns.</li>
              <li>Batch size 8 with efficient data loading and augmentation for large point clouds (100K+ points).</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold">Performance & Impact:</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Achieves ~85% accuracy and ~82% precision on synthetic LIDAR datasets.</li>
            </ul>
          </section>
        </article>

{/* Right: Image */}
<div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
  <a href={require('./media/lidar.png')} target="_blank" rel="noopener noreferrer">
    <img
      src={require('./media/lidar.png')}
      alt="LIDAR Point Cloud Visualization"
      className="rounded shadow-lg w-[900px] h-auto"
    />
  </a>
</div>



      
      </div>

      {/* GitHub button */}
      <div className="flex justify-center mt-12">
        <a
          href="https://github.com/iyervijay21/3d-object-detection-using-LIDAR-for-self-driving-car"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-3 border border-purple-400 rounded-xl text-purple-200 hover:text-white transition always-aura"
          aria-label="View project on GitHub"
        >
          <svg
            className="w-5 h-5 mr-2 fill-current"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M12 0C5.372 0 0 5.372 0 12c0 5.302 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415-.546-1.386-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.76-1.604-2.665-.303-5.466-1.334-5.466-5.933 0-1.311.469-2.381 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.019.005 2.047.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.655 1.653.243 2.874.12 3.176.77.839 1.235 1.909 1.235 3.22 0 4.61-2.807 5.627-5.48 5.922.43.37.814 1.1.814 2.22v3.293c0 .32.217.694.825.576C20.565 21.796 24 17.3 24 12c0-6.628-5.373-12-12-12z" />
          </svg>
          View on GitHub
        </a>
      </div>
    </section>
  );
}

function CamCussionDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      <div className="flex flex-col md:flex-row md:space-x-12">
        {/* Left: Text Content */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-xl font-semibold">CamCussion: Real-Time Eye Tracking for Concussion Diagnosis</h2>

          <h3 className="text-lg font-semibold">Overview:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Developed in collaboration with the Zeiss Innovation Hub to aid in early concussion detection.</li>
            <li>Real-time video capture and pupil tracking implemented using <code>OpenCV</code>.</li>
            <li>Optimized video processing pipeline achieves low latency for live analysis.</li>
          </ul>

          <h3 className="text-lg font-semibold">Key Features:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Advanced feature detection tracks pupil movement and saccadic eye behavior.</li>
            <li>Custom machine learning model analyzes extracted eye metrics to flag potential concussions.</li>
            <li>Temporal feature extraction pipeline measures saccade amplitude, velocity, and fixation patterns.</li>
            <li>Robust performance under varying lighting conditions using adaptive histogram equalization and filtering.</li>
          </ul>

          <h3 className="text-lg font-semibold">Technical Highlights:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Used <code>Haar cascades</code> and gradient-based methods for precise eye region localization.</li>
            <li>Kalman filter applied to stabilize pupil tracking and reduce noise from occlusions.</li>
            <li>Machine learning pipeline built with <code>scikit-learn</code>, trained on annotated saccadic datasets.</li>
            <li>Modular visualization dashboard displays real-time gaze heatmaps and dynamic plots for clinicians.</li>
          </ul>

          <h3 className="text-lg font-semibold">Impact:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Faster, data-driven concussion diagnosis in sports and clinical settings.</li>
            <li>Extensible architecture ready for integration with multimodal physiological sensors.</li>
          </ul>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
         <a href={require('./media/usecase.png')} target="_blank" rel="noopener noreferrer">
  <img
    src={require('./media/usecase.png')}
    alt="Use Case"
    className="rounded shadow-lg max-w-full h-auto"
  />
</a>



        </div>
      </div>

      {/* GitHub button */}
      <div className="flex justify-center mt-12">
        <a
          href="https://github.com/iyervijay21/iyervijay21-Camcussion-eye-tracking-software-for-concussion-diagnosis-"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-3 border border-purple-400 rounded-xl text-purple-200  hover:text-white transition always-aura"

        >
          <svg
            className="w-5 h-5 mr-2 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 ... (shortened) ..." />
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  );
}



 function DeepFakeDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      <div className="flex flex-col md:flex-row md:space-x-12">
        {/* Left: Info Section */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-xl font-semibold">DeepFake Detection System — High‑Level Overview</h2>

          <h3 className="text-lg font-semibold">Video Preprocessing</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Segment input videos into manageable temporal windows for downstream analysis.</li>
            <li>Standardize frame color space and basic normalization; cache windowed batches.</li>
          </ul>

          <h3 className="text-lg font-semibold">Face Analysis</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Detect and track facial regions consistently across frames.</li>
            <li>Define stable regions of interest (ROIs) on skin areas for signal aggregation.</li>
          </ul>

          <h3 className="text-lg font-semibold">Physiological Signal Estimation (rPPG)</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Aggregate per‑region color traces over time.</li>
            <li>Apply a robust projection/combination and light denoising to obtain a pulse‑like trace.</li>
          </ul>

          <h3 className="text-lg font-semibold">Feature Encoding</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Transform temporal traces into compact spatial–temporal summaries ("heatmaps").</li>
            <li>Encode with a lightweight convolutional path and a complementary transformer path.</li>
          </ul>

          <h3 className="text-lg font-semibold">Fusion & Decision</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Fuse encoder representations with regularization.</li>
            <li>Predict the likelihood of manipulation per window; threshold for final label.</li>
          </ul>

          <h3 className="text-lg font-semibold">Notes</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Implementation details, hyperparameters, and architecture specifics are intentionally omitted.</li>
            <li>Content is a generic outline to protect ongoing publication work.</li>
          </ul>
        </div>

        {/* Right: (Intentionally empty — no images for now) */}
        <div className="md:w-1/2 flex flex-col space-y-6 mt-10 md:mt-0">
          <div className="rounded-xl border border-purple-700/30 p-6 text-purple-300/80">
            <p className="text-sm">No visual assets are shown at this time.</p>
          </div>
        </div>
      </div>

      {/* GitHub button */}
      <div className="flex justify-center mt-12">
        <a
          href="https://github.com/iyervijay21/Deepfake_Detection"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-3 border border-purple-400 rounded-xl text-purple-200  hover:text-white transition always-aura"
          aria-label="View Deepfake Detection repository on GitHub"
        >
          <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.38-3.88-1.38-.53-1.33-1.3-1.68-1.3-1.68-1.06-.72.08-.71.08-.71 1.18.08 1.8 1.22 1.8 1.22 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.56-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.2-3.07-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.17a11.02 11.02 0 0 1 5.79 0c2.2-1.48 3.17-1.17 3.17-1.17.63 1.59.23 2.76.11 3.05.75.8 1.2 1.82 1.2 3.07 0 4.4-2.69 5.36-5.25 5.65.42.36.79 1.06.79 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5z"/>
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  );
}




function EducationDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      Detail for Education
    </div>
  );
}

import ScrollToTop from "./ScrollToTop";

function AppRouter() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen w-full bg-gradient-to-tr md:bg-gradient-to-b from-[#4b1a70] via-black to-black md:from-black md:via-[#31004d] md:to-[#0b000e]">
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/experience/tecolab" element={<TecoLabDetail />} />
          <Route path="/experience/accesskit" element={<AccessKITDetail />} />
          <Route path="/experience/accurdigitus" element={<AccurDigitusDetail />} />
          <Route path="/experience/accenture" element={<AccentureDetail />} />
          <Route path="/projects/car-accident" element={<CarAccidentDetail />} />
          <Route path="/projects/self-driving" element={<SelfDrivingDetail />} />
          <Route path="/projects/camcussion" element={<CamCussionDetail />} />
          <Route path="/projects/deepfake" element={<DeepFakeDetail />} />
          <Route path="/education" element={<EducationDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;

