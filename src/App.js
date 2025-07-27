// src/App.js
import React, { useState, useRef, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

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
        <div className="text-xl font-bold text-white">Vijay Mohanram Iyer</div>
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
                className="text-white aura-effect rounded-full px-3 py-1"
              >
                {label}
              </button>
            ) : (
              <Link
                to={`/#${hash.slice(1)}`}
                className="text-white aura-effect rounded-full px-3 py-1"
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
                  className="text-white aura-effect rounded-full px-3 py-1"
                >
                  {label}
                </button>
              ) : (
                <Link
                  to={`/#${hash.slice(1)}`}
                  className="text-white aura-effect rounded-full px-3 py-1"
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
              <p className="text-xl md:text-2xl mb-6 text-purple-100 text-justify">
                Hey there<span role="img" aria-label="wave">👋</span>! I'm a pixel wizard who sees the world through a quirky lens turning everyday images into a playground of possibilities. I mix creativity with code, teaching machines to interpret the visual world is fun. Whether it’s health tech or autonomous adventures, I’m here to bring a splash of color to computer vision.
              </p>

              <div className="flex gap-4 mt-4">
                <a
                  href={require('./media/Vijay_CV.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-6 py-3 aura-effect always-aura bg-black-600 text-white font-bold border border-purple-500 transition-shadow duration-300 ease-in-out"
                >
                  My Resume
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
  <div className="always-aura circular-aura w-80 h-80 overflow-visible">
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
      <FadeInSection className="py-20">
        <div id="skills" className="scroll-mt-32 w-full bg-black-900 bg-opacity-20 shadow-md mb-8 p-6">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">My Tech Stack</h2>
          
          {/* Language/Frameworks */}
          <div className="mb-12 p-4 rounded">
            <h3 className="text-2xl font-bold text-white mb-4">Language/Frameworks</h3>
            <div className="flex flex-wrap justify-evenly gap-6">
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="python" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">Python</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" alt="OpenCV" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">OpenCV</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/qt/qt-original.svg" alt="qt" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">qt</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">TensorFlow</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">PyTorch</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" alt="NumPy" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">NumPy</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" alt="Pandas" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">Pandas</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" alt="scikit-learn" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">scikit‑learn</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" alt="Matplotlib" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">Matplotlib</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">C++</p>
              </div>
            </div>
          </div>
          
          <div className="mb-12 p-4 rounded">
            <h3 className="text-2xl font-bold text-white mb-4">Web Development</h3>
            <div className="flex flex-wrap justify-evenly gap-6">
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">HTML</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">CSS</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">React.JS</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">JavaScript</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">Node.js</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">MySQL</p>
              </div>
            </div>
          </div>
          
          {/* Tools */}
          <div className="mb-12 p-4 rounded">
            <h3 className="text-2xl font-bold text-white mb-4">Tools</h3>
            <div className="flex flex-wrap justify-evenly gap-6">
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">Git</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">Linux</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">Docker</p>
              </div>
              <div className="flex flex-col items-center rounded-full px-6 py-3 transition-shadow duration-300 ease-in-out aura-effect hover:shadow-lg hover:shadow-purple-600/60">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png" alt="Matlab" className="w-16 h-16 mb-2" />
                <p className="text-white font-semibold">Matlab</p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* EDUCATION SECTION */}
      <FadeInSection className="py-20">
        <div id="education" className="scroll-mt-32 w-full bg-black-900 bg-opacity-20 shadow-md mb-8 p-6">
          <h2 className="text-3xl font-bold mb-6 text-white text-left">
            Education
          </h2>
          <div className="flex flex-col md:flex-row justify-evenly gap-8">
            <div className="bg-transparent p-6 shadow aura-effect w-full md:w-1/3 rounded-none flex items-center space-x-4">
              <img
                src={require('./media/KIT.webp')}
                alt="KIT Logo"
                className="h-20 w-20 rounded bg-white object-contain"
              />
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  Karlsruhe Institute of Technology
                </h3>
                <p className="text-white">
                  M.Sc. in Electrical Engineering and Information Technology
                </p>
                <p className="text-sm text-purple-100 mt-2">
                  May 2022 – July 2025
                  <br />
                  GPA: 2.3
                </p>
              </div>
            </div>
            <div className="bg-transparent p-6 shadow aura-effect w-full md:w-1/3 rounded-none flex items-center space-x-4">
              <img
                src={require('./media/MU.png')}
                alt="MU logo"
                className="h-20 w-20 rounded bg-white object-contain"
              />
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  University of Mumbai
                </h3>
                <p className="text-white">
                  B.Eng. in Electronics Engineering
                </p>
                <p className="text-sm text-purple-100 mt-2">
                  Aug 2017 – May 2021
                  <br />
                  GPA: 2.8
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

     {/* WORK EXPERIENCE SECTION */}
<FadeInSection className="py-20">
  <div id="experience" className="scroll-mt-32 w-full bg-black-900 bg-opacity-20 shadow-md mb-8 p-6">
    <h2 className="text-3xl font-bold mb-8 text-white">Work Experience</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">

      {/* FZI */}
      <div className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer" style={{ minHeight: '230px', maxHeight: '230px' }}>
        <div className="flex items-center space-x-4">
          <img src={require('./media/1524.png')} alt="FZI Logo" className="h-20 w-20 rounded bg-white object-contain" />
          <div>
            <h3 className="text-xl font-bold text-white">FZI</h3>
            <p className="text-purple-100">Research Assistant (Aug 2025 – Nov 2025)</p>
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
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">DeepFake</span>
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">rPPG</span>
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">3D-Geometric Facemesh</span>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-lg">

          <h3 className="text-xl font-bold mb-2">FZI</h3>
          <p className="text-sm">
            <strong>Key Contributions:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Enhance the DeepFake detection framework by incorporating dynamic region-of-interest (ROI) tracking to facilitate real-time deployment.</li>
              <li>Develop an interactive UI that visualizes multiple ROIs, emphasizing regions with elevated artifact energy.</li>
              <li>Fine-tune and cross-validate across diverse DeepFake detection techniques to ensure robustness.</li>
              <li>Contribute significantly to academic discourse through a subsequent research publication.</li>
            </ul>
          </p>
        </div>
      </div>

      {/* TecoLab */}
      <div className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer" style={{ minHeight: '230px', maxHeight: '230px' }}>
        <div className="flex items-center space-x-4">
          <img src={require('./media/teco_trans.png')} alt="TecoLab Logo" className="h-20 w-20 rounded bg-white object-contain" />
          <div>
            <h3 className="text-xl font-bold text-white">TecoLab</h3>
            <p className="text-purple-100">Working Student (Mar 2023 – Sept 2025)</p>
          </div>
        </div>
        <div className="flex flex-wrap mt-2 gap-1">
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Python</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">OpenCV</span>  
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Linux</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Docker</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Git</span>
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">EdgeML</span>      
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">C++</span> 
          <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">OpenEarable</span>
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">Jekyll</span>
          
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-lg">

          <h3 className="text-xl font-bold mb-2">TecoLab</h3>
          <p className="text-sm">
            <strong>Key Contributions:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>ML4Print: analyzed and classified printed documents to detect fakes.</li>
              <li>Heat simulation project using ML for predictive maintenance.</li>
              <li>Sensor optimization for open-earables with edgeML.</li>
              <li>Website performance & SEO optimization using Jekyll & WordPress.</li>
            </ul>
          </p>
        </div>
      </div>

      {/* Access@KIT */}
      <div className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer" style={{ minHeight: '230px', maxHeight: '230px' }}>
        <div className="flex items-center space-x-4">
          <img src={require('./media/6379_access@kit_rgb_dt.png')} alt="Access@KIT Logo" className="h-20 w-20 rounded bg-white object-contain" />
          <div>
            <h3 className="text-xl font-bold text-white">Access@KIT</h3>
            <p className="text-purple-100">Working Student (Mar 2023 – May 2023)</p>
          </div>
        </div>
        <div className="flex flex-wrap mt-2 gap-1">
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">TTS</span>
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">Deep Learning</span>
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">Accessibility</span>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-lg">

          <h3 className="text-xl font-bold mb-2">Access@KIT</h3>
          <p className="text-sm">
            <strong>Key Contribution:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Designed and trained a custom bi-directional RNN for text-to-speech conversion, enhancing accessibility for visually impaired users.</li>
            </ul>
          </p>
        </div>
      </div>

      {/* Accenture */}
      <div className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer" style={{ minHeight: '230px', maxHeight: '230px' }}>
        <div className="flex items-center space-x-4">
          <img src={require('./media/Accenture.webp')} alt="Accenture Logo" className="h-20 w-20 rounded bg-white object-contain" />
          <div>
            <h3 className="text-xl font-bold text-white">Accenture India</h3>
            <p className="text-purple-100">Associate SE (Feb 2022 – Apr 2022)</p>
          </div>
        </div>
        <div className="flex flex-wrap mt-2 gap-1">
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">COBOL</span>
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">Mainframe</span>
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">Legacy Systems</span>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-lg">

          <p className="text-sm">
            <strong>Key Contribution:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Maintained IBM Mainframe systems using custom COBOL scripts, ensuring 99.9% uptime and seamless integration with modern tech.</li>
            </ul>
          </p>
        </div>
      </div>

      {/* Accur Digitus */}
      <div className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer" style={{ minHeight: '230px', maxHeight: '230px' }}>
        <div className="flex items-center space-x-4">
          <img src={require('./media/accur_digitus_logo.jpg')} alt="Accur Digitus Logo" className="h-20 w-20 rounded bg-white object-contain" />
          <div>
            <h3 className="text-xl font-bold text-white">Accur Digitus</h3>
            <p className="text-purple-100">Web Dev Intern (Jan 2020 – May 2020)</p>
          </div>
        </div>
        <div className="flex flex-wrap mt-2 gap-1">
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">React.JS</span>
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">Tailwind</span>
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">Redux</span>
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">HTML</span>
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">CSS</span>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-lg">

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
    <h2 className="text-3xl font-bold mb-6 text-white">Projects</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">

      
      {/* DeepFake Detection */}
      <div
        className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer"
        style={{ minHeight: '230px', maxHeight: '230px' }}
      >
        <div className="flex items-center space-x-4">
          <img
            src={require('./media/DEEP.jpg')}
            alt="DeepFake Logo"
            className="h-20 w-20 object-cover rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold text-white">DeepFake Detection (FZI-2025)</h3>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Python</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">filtering</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">FFT</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">CWT</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">OpenCV</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Deep Learning</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Linux</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Docker</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Git</span>
            </div>
            <p className="text-purple-100 mt-2">rPPG Analysis</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-lg">

          <div>
            <h3 className="text-xl font-bold mb-2">DeepFake Detection System</h3>
            <p className="text-sm mb-4">
             This Master Thesis aimed to design an end to end pipeline to evaluate the artifacts using rPPG signals. Designed a Fusion Model, concatenating the features from Vision Transformer and CNN for local and long-range dependencies with a custom Fusion-Head for DeepFake classification. Benchmark results under different environmental conditions.
            </p>
          </div>
          <Link to="/projects/deepfake" className="mt-2 self-start bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition">
            More Info
          </Link>
        </div>
      </div>

      {/* CamCussion */}
      <div
        className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer"
        style={{ minHeight: '230px', maxHeight: '230px' }}
      >
        <div className="flex items-center space-x-4">
          <img
            src={require('./media/CCS.jpg')}
            alt="CCS Logo"
            className="h-20 w-20 object-cover rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold text-white">CamCussion (Zeiss Innovation Hub-2024)</h3>
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
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-lg">

          <div>
            <h3 className="text-xl font-bold mb-2">CamCussion</h3>
            <p className="text-sm mb-4">
              Utilized computer-vision to analyze pupil dilation and saccadic eye movements in real time to track and assess eye behavior, contributing to accurate concussion diagnosis.
            </p>
          </div>
          <Link 
            to="/projects/camcussion"
            className="mt-2 self-start bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
          >
            More Info
          </Link>
        </div>
      </div>

      {/* Self-Driving Car */}
      <div
        className="relative group bg-transparent p-6 rounded shadow aura-effect cursor-pointer"
        style={{ minHeight: '230px', maxHeight: '230px' }}
      >
        <div className="flex items-center space-x-4">
          <img
            src={require('./media/LiDAR-Technology.png')}
            alt="LiDAR Logo"
            className="h-20 w-20 object-cover rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold text-white">Self-Driving Car using LIDAR (2022)</h3>
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
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-lg">

          <div>
            <h3 className="text-xl font-bold mb-2">Self-Driving Car using LIDAR</h3>
            <p className="text-sm mb-4">
              Developed a solar-powered autonomous vehicle prototype using 360° LIDAR for reliable obstacle detection and safe navigation. Implemented on Arduino with custom chassis and differential drive, aimed at enhancing safety in urban mobility applications.
            </p>
          </div>
          <Link 
            to="/projects/self-driving"
            className="mt-2 self-start bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
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
            <h3 className="text-xl font-bold text-white">Real Time Car Accident Alert System (2021)</h3>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">C++</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Embedded</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Sensor Fusion</span>
              <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">Crash Detection</span>
            </div>
            <p className="text-purple-100 mt-2">Crash Detection</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-full overlay-scrollbar rounded-lg">

          <div>
            <h3 className="text-xl font-bold mb-2">Real-Time Car Accident Alert System</h3>
            <p className="text-sm mb-4">
              Developed an embedded vehicle accident warning system to automatically detect crashes, send precise location data, and alert emergency services, family, and friends to improve response times.
            </p>
          </div>
          <Link 
            to="/projects/car-accident"
            className="mt-2 self-start bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
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
    <h2 className="text-3xl font-bold mb-4 text-white">Contact Me</h2>
    <p className="text-purple-100 mb-6">
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
          <h2 className="text-xl font-semibold">Real-Time Car Accident Alert System</h2>

          <h3 className="text-lg font-semibold">Overview:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Developed an embedded system for automatic accident detection and emergency alerting.</li>
            <li>Implemented using Raspberry Pi 3B+ with MPU6050 accelerometer/gyroscope and SIM7000C 4G/GPS module.</li>
            <li>Reduces emergency response time by automatically notifying authorities with precise location data.</li>
          </ul>

          <h3 className="text-lg font-semibold">Key Features:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Multi-sensor fusion detects impacts using threshold algorithms for acceleration (0.75g) and angular velocity (10°/s).</li>
            <li>15-second manual override window prevents false alerts with physical button interrupt.</li>
            <li>Automated SMS alerts with Google Maps links sent to hospitals, police, and emergency contacts.</li>
            <li>JSON-based database system for dynamically locating nearest emergency services.</li>
          </ul>

          <h3 className="text-lg font-semibold">Technical Highlights:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Python-based sensor fusion algorithm processes MPU6050 data via I²C at 400kHz.</li>
            <li>AT command scripting for SIM7000C module handles GPS fix acquisition and SMS transmission.</li>
            <li>Hardware-optimized design with 15W power requirements and fail-safe shutdown protocols.</li>
            <li>Geopy library calculates nearest facilities using geodesic distance on geographic coordinates.</li>
          </ul>

          <h3 className="text-lg font-semibold">Impact:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Potential to reduce accident fatalities by 6% per minute of improved response time.</li>
            <li>Cost-effective solution deployable in existing vehicles without CAN bus integration.</li>
          </ul>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
          <a href={require('./media/Alert.png')} target="_blank" rel="noopener noreferrer">
  <img
    src={require('./media/Alert.png')}
    alt="Accident Alert System Diagram"
    className="rounded shadow-lg max-w-xs h-auto"
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
          className="inline-flex items-center px-5 py-3 border border-purple-400 rounded-xl text-purple-200 hover:bg-purple-600 hover:text-white transition always-aura"
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
    <div className="container mx-auto px-6 py-20 text-purple-200">
      <div className="flex flex-col md:flex-row md:space-x-12">
        {/* Left: Text Content */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-xl font-semibold">LIDAR-Based Self-Driving Car with Solar Charging</h2>

          <h3 className="text-lg font-semibold">Overview:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Prototype autonomous vehicle using LIDAR for obstacle detection and navigation.</li>
            <li>Implemented on Arduino Uno with custom 3D-printed chassis and solar charging system.</li>
            <li>Designed as cost-effective alternative to commercial autonomous vehicle sensor suites.</li>
          </ul>

          <h3 className="text-lg font-semibold">Key Features:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>360° LIDAR scanning with 2m range and 0.14sec/60° rotation speed for real-time mapping.</li>
            <li>Solar-powered 2200mAh Li-ion battery system with 3.7V nominal voltage and 2C discharge rate.</li>
            <li>Differential drive system using BO motors (150RPM, 0.5Kg-cm torque) with L298P motor shield.</li>
            <li>Weather filtering algorithms distinguish obstacles from rain/snow using point cloud analysis.</li>
          </ul>

          <h3 className="text-lg font-semibold">Technical Highlights:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>I²C-based LIDAR communication with Arduino at 100kHz clock speed.</li>
            <li>Custom PWM control for MG995 servo (2.5kgf-cm torque) handling LIDAR rotation.</li>
            <li>Voltage regulation circuit maintains stable 5V output from solar panel input.</li>
            <li>CorelDraw-designed chassis optimized for sensor placement and weight distribution.</li>
          </ul>

          <h3 className="text-lg font-semibold">Impact:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Demonstrated 90% obstacle detection accuracy in prototype testing.</li>
            <li>Proposed as scalable solution for last-mile delivery robots and urban micro-mobility.</li>
          </ul>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
         <a href={require('./media/lidar.png')} target="_blank" rel="noopener noreferrer">
  <img
    src={require('./media/lidar.png')}
    alt="LIDAR Car Prototype"
    className="rounded shadow-lg w-64 h-auto"
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
          className="inline-flex items-center px-5 py-3 border border-purple-400 rounded-xl text-purple-200 hover:bg-purple-600 hover:text-white transition always-aura"

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
          className="inline-flex items-center px-5 py-3 border border-purple-400 rounded-xl text-purple-200 hover:bg-purple-600 hover:text-white transition always-aura"

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
          <h2 className="text-xl font-semibold">DeepFake Detection System Overview</h2>

          <h3 className="text-lg font-semibold">Video Processing</h3>
          <p>• Videos (.avi, 30 fps, 1920×1080) are split into 10-second windows (300 frames each).</p>
          <p>• Frames converted BGR→RGB using OpenCV; processed as windows <code>W<sub>k</sub></code>.</p>

          <h3 className="text-lg font-semibold">Face Detection & Tracking</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Convert frames to grayscale <code>G<sub>t</sub></code>.</li>
            <li>Detect faces with Dlib; extract 81 landmarks every 6 frames, track in between using correlation tracker.</li>
            <li>Define ROIs: forehead, left cheek, right cheek, subdivided into subregions.</li>
          </ul>

          <h3 className="text-lg font-semibold">rPPG Extraction</h3>
          <p>• Compute mean RGB per subregion <code>¯C<sub>s</sub>(t)</code>.</p>
          <p>• Concatenate 14 subregion traces → matrix <code>C ∈ ℝ<sup>14W×3</sup></code>.</p>

          <h4 className="font-semibold">POS Algorithm</h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>Normalize each channel by mean.</li>
            <li>Project with matrix <code>P = [[0,1,-1], [-2,1,1]]</code>.</li>
            <li>Combine signals to get raw trace <code>h</code>, then sum segments → composite <code>H<sub>k</sub>(t)</code>.</li>
            <li>Filter with detrending & 4th-order Butterworth (0.8–3 Hz).</li>
          </ul>

          <h3 className="text-lg font-semibold">Neural Network</h3>
          <h4 className="font-semibold">CNN Encoder (HeatmapNet)</h4>
          <p>• Input: 2-channel heatmap → conv layers → 64-dim latent <code>f<sub>CNN</sub></code>.</p>

          <h4 className="font-semibold">ViT Encoder</h4>
          <p>• Input: same heatmap split into 16×16 patches → 12 Transformer blocks → <code>f<sub>ViT</sub> ∈ ℝ<sup>768</sup></code>.</p>

          <h4 className="font-semibold">Fusion & Classification</h4>
          <p>• Concatenate features (832-dim) → dropout, LayerNorm, linear → sigmoid → <code>p<sub>k</sub></code>.</p>
          <p>• Classify as <code>fake</code> if <code>p<sub>k</sub> ≥ 0.5</code>.</p>
        </div>

        {/* Right: Image Section */}
        <div className="md:w-1/2 flex flex-col space-y-6 mt-10 md:mt-0">
          <a href={require('./media/pipeline.png')} target="_blank" rel="noopener noreferrer">
  <img
    src={require('./media/pipeline.png')}
    alt="Pipeline Overview"
    className="rounded shadow-lg max-w-full h-auto"
  />
</a>
        </div>
      </div>

      {/* GitHub button */}
      <div className="flex justify-center mt-12">
        <a
          href="https://github.com/iyervijay21/Deepfake_Detection"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-3 border border-purple-400 rounded-xl text-purple-200 hover:bg-purple-600 hover:text-white transition always-aura"

        >
          <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 ... (shortened) ..." />
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
      <div className="min-h-screen bg-gradient-to-b from-purple-950 via-[#1a0028] to-purple-950">

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

