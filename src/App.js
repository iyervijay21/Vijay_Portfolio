// src/App.js
import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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

// Navbar with transparent background and white text.
function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 absolute w-full top-0 z-20">
      <div className="text-2xl font-bold text-white">Vijay Mohanram Iyer</div>
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {!menuOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>
      <ul className="hidden md:flex space-x-6">
        <li><a href="#home" className="text-white hover-glow">Home</a></li>
        <li><a href="#skills" className="text-white hover-glow">Skills</a></li>
        <li><a href="#education" className="text-white hover-glow">Education</a></li>
        <li><a href="#experience" className="text-white hover-glow">Experience</a></li>
        <li><a href="#projects" className="text-white hover-glow">Projects</a></li>
        <li><a href="#contact" className="text-white hover-glow">Contact</a></li>
      </ul>
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
        <div key={tool.key} className="flex flex-col items-center hover-glow">
          <img src={tool.src} alt={tool.label} className="w-16 h-16 mb-2" />
          <span className="mt-2 text-sm font-medium text-white">{tool.label}</span>
        </div>
      ))}
    </div>
  );
}

// MainPage: Contains HERO, SKILLS, EDUCATION, EXPERIENCE, PROJECTS, and CONTACT sections.
function MainPage() {
  return (
    <div>
      {/* HERO SECTION */}
      <FadeInSection className="pt-24 pb-20">
        <div id="home" className="w-full bg-gray-800 shadow-md mb-8 p-6 border-b border-gray-700">
          <section className="flex flex-col-reverse md:flex-row items-center">
            <div className="w-full md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-300">
                Hi, I'm Vijay <span role="img" aria-label="wave">👋</span>
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-purple-200">
                A dedicated AI/ML/OpenCV Engineer specializing in advanced machine learning solutions for the health sector.
              </p>
              <div className="space-x-4">
                <a href="#contact" className="bg-purple-600 text-white hover-glow px-4 py-2 rounded font-bold">
                  Contact Me
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
              <img src="/media/hero.jpg" alt="Hero" className="max-w-xs md:max-w-sm rounded-full" />
            </div>
          </section>
        </div>
      </FadeInSection>

      {/* SKILLS SECTION */}
      <FadeInSection className="py-20">
      <div id="skills" className="w-full bg-gray-800 shadow-md mb-8 p-6">

          <h2 className="text-3xl font-bold mb-6 text-purple-300 text-center">My Tech Stack</h2>
          
          
          
          {/* AI/ML */}
          <div className="mb-12 p-4 border rounded border-gray-700">
            <h3 className="text-2xl font-bold text-purple-200 mb-4">AI/ML</h3>
            <div className="flex flex-wrap justify-evenly gap-6">
            <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" alt="OpenCV" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">OpenCV</p>
              </div>
              <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/qt/qt-original.svg" alt="qt" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">qt</p>
              </div>
              <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">TensorFlow</p>
              </div>
              <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">PyTorch</p>
              </div>
              <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" alt="NumPy" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">NumPy</p>
              </div>
              <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" alt="Pandas" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">Pandas</p>
              </div>
              <div className="flex flex-col items-center hover-glow">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" alt="scikit-learn" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">scikit‑learn</p>
              </div>
              <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" alt="Matplotlib" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">Matplotlib</p>
              </div>
            </div>
          </div>
          
          {/* Web Development */}
          <div className="mb-12 p-4 border rounded border-gray-700">
            <h3 className="text-2xl font-bold text-purple-200 mb-4">Web Development</h3>
            <div className="flex flex-wrap justify-evenly gap-6">
              <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">HTML5</p>
              </div>
              <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">CSS3</p>
              </div>
              <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg" alt="Bootstrap" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">Bootstrap</p>
              </div>
              <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">React</p>
              </div>
              <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">JavaScript</p>
              </div>
            </div>
          </div>
          
          {/* Tools */}
          <div className="p-4 border rounded border-gray-700">
            <h3 className="text-2xl font-bold text-purple-200 mb-4">Tools</h3>
            <div className="flex flex-wrap justify-evenly gap-6">
              <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">Git</p>
              </div>
              <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">Linux</p>
              </div>
              <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">Docker</p>
              </div>
              <div className="flex flex-col items-center hover-glow">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png" alt="Matlab" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">Matlab</p>
              </div>
              
            </div>
          </div>
        </div>
      </FadeInSection>

    {/* EDUCATION SECTION */}
<FadeInSection className="py-20">
  <div id="education" className="w-full bg-gray-800 shadow-md mb-8 p-6">
    <h2 className="text-3xl font-bold mb-6 text-purple-300 text-left">
      Education
    </h2>
    <div className="flex flex-col md:flex-row justify-evenly gap-8">
      <div className="bg-transparent p-6 shadow hover-glow w-full md:w-1/3 rounded-none">
        <h3 className="text-xl font-bold mb-2 text-white">
          Karlsruhe Institute of Technology
        </h3>
        <p className="text-white">
          M.Sc. in Electrical Engineering and Information Technology
        </p>
        <p className="text-sm text-purple-200 mt-2">
          May 2022 – Present
        </p>
      </div>
      <div className="bg-transparent p-6 shadow hover-glow w-full md:w-1/3 rounded-none">
        <h3 className="text-xl font-bold mb-2 text-white">
          Thakur College of Engineering and Technology
        </h3>
        <p className="text-white">
          B.Eng. in Electronics Engineering
        </p>
        <p className="text-sm text-purple-200 mt-2">
          Aug 2017 – May 2021
        </p>
      </div>
    </div>
  </div>
</FadeInSection>





      {/* WORK EXPERIENCE SECTION */}
      <FadeInSection className="py-20">
        <div id="experience" className="w-full bg-gray-800 shadow-md mb-8 p-6">
          <h2 className="text-3xl font-bold mb-8 text-purple-300">Work Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <Link to="/experience/tecolab" className="block bg-transparent p-6 rounded shadow hover-glow">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 flex items-center justify-center rounded bg-purple-600 text-white font-bold">
                  T
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">TecoLab</h3>
                  <p className="text-purple-200">Working Student (Mar 2023 – Present)</p>
                </div>
              </div>
              <div className="mt-4 text-white">
                Built and optimized websites using Jekyll &amp; WordPress. Contributed to ML4Print and performed predictive maintenance simulations.
              </div>
            </Link>
            <Link to="/experience/accesskit" className="block bg-transparent p-6 rounded shadow hover-glow">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 flex items-center justify-center rounded bg-purple-600 text-white font-bold">
                  A
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Access@KIT</h3>
                  <p className="text-purple-200">Working Student (Mar 2023 – May 2023)</p>
                </div>
              </div>
              <div className="mt-4 text-white">
                Designed accessible UIs with Material-UI and integrated a TTS model.
              </div>
            </Link>
            <Link to="/experience/accurdigitus" className="block bg-transparent p-6 rounded shadow hover-glow">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 flex items-center justify-center rounded bg-purple-600 text-white font-bold">
                  AD
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Accur Digitus</h3>
                  <p className="text-purple-200">Web Dev (Jan 2020 – May 2020)</p>
                </div>
              </div>
              <div className="mt-4 text-white">
                Developed responsive React.js web apps and implemented RESTful APIs.
              </div>
            </Link>
            <Link to="/experience/accenture" className="block bg-transparent p-6 rounded shadow hover-glow">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 flex items-center justify-center rounded bg-purple-600 text-white font-bold">
                  AC
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Accenture India</h3>
                  <p className="text-purple-200">Associate SE (Feb 2022 – Apr 2022)</p>
                </div>
              </div>
              <div className="mt-4 text-white">
                Maintained IBM Mainframe servers and ensured system reliability.
              </div>
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* PROJECTS SECTION */}
      <FadeInSection className="py-20">
        <div id="projects" className="w-full bg-gray-800 shadow-md mb-8 p-6">
          <h2 className="text-3xl font-bold mb-6 text-purple-300">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <Link to="/projects/car-accident" className="block bg-transparent p-6 rounded shadow hover-glow">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 flex items-center justify-center rounded bg-purple-600 text-white font-bold">
                  Car
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Car Accident Alert</h3>
                  <p className="text-purple-200">Crash Detection</p>
                </div>
              </div>
              <div className="mt-4 text-white">
                Real-time crash detection using sensor integration and auto alerts.
              </div>
            </Link>
            <Link to="/projects/self-driving" className="block bg-transparent p-6 rounded shadow hover-glow">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 flex items-center justify-center rounded bg-purple-600 text-white font-bold">
                  SDC
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Self-Driving Car</h3>
                  <p className="text-purple-200">Autonomous Nav</p>
                </div>
              </div>
              <div className="mt-4 text-white">
                3D mapping with LIDAR &amp; camera inputs and sensor fusion.
              </div>
            </Link>
            <Link to="/projects/camcussion" className="block bg-transparent p-6 rounded shadow hover-glow">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 flex items-center justify-center rounded bg-purple-600 text-white font-bold">
                  CC
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">CamCussion</h3>
                  <p className="text-purple-200">Eye Tracking</p>
                </div>
              </div>
              <div className="mt-4 text-white">
                Analyzes pupil dilation &amp; saccadic movements for concussion diagnosis.
              </div>
            </Link>
            <Link to="/projects/deepfake" className="block bg-transparent p-6 rounded shadow hover-glow">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 flex items-center justify-center rounded bg-purple-600 text-white font-bold">
                  DF
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">DeepFake Detection</h3>
                  <p className="text-purple-200">rPPG Analysis</p>
                </div>
              </div>
              <div className="mt-4 text-white">
                Leverages subtle facial color variations to enhance media security.
              </div>
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* CONTACT SECTION */}
      <FadeInSection className="py-20">
        <div id="contact" className="w-full bg-gray-800 shadow-md mb-8 p-6">
          <h2 className="text-3xl font-bold mb-4 text-purple-300">Contact Me</h2>
          <p className="text-purple-200 mb-6">
            I'm eager to discuss opportunities and collaborations in AI, ML, and Computer Vision.
          </p>
          <div className="space-y-3">
            <div>
              <a href="mailto:iyervijay99@gmail.com" className="flex items-center space-x-2 text-purple-300 hover-glow">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
                  <polyline points="3,6 12,13 21,6" />
                </svg>
                <span>iyervijay99@gmail.com</span>
              </a>
            </div>
            <div>
              <a href="tel:+4917667345305" className="flex items-center space-x-2 text-purple-300 hover-glow">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.81 19.81 0 01-8.63-3.19 19.5 19.5 0 01-5.82-5.82 19.81 19.81 0 01-3.19-8.63A2 2 0 014.08 2h3a2 2 0 012 1.72c.14.72.37 1.42.68 2.08a2 2 0 01-.45 2.11L8.09 8.09a16.06 16.06 0 005.82 5.82l1.18-1.18a2 2 0 012.11-.45c.66.31 1.36.54 2.08.68A2 2 0 0122 16.92z" />
                </svg>
                <span>+49-17667345305</span>
              </a>
            </div>
            <div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Tennesseeallee%2020%2C%20Karlsruhe%2C%2076149%2C%20Germany"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-purple-300 hover-glow"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Tennesseeallee 20, Karlsruhe, 76149, Germany</span>
              </a>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* FOOTER */}
      <footer className="text-center py-4">
        <p className="text-purple-200">
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
      Detail for TecoLab
    </div>
  );
}
function AccessKITDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      Detail for Access@KIT
    </div>
  );
}
function AccurDigitusDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      Detail for Accur Digitus
    </div>
  );
}
function AccentureDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      Detail for Accenture India
    </div>
  );
}
function CarAccidentDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      Detail for Car Accident Alert System
    </div>
  );
}
function SelfDrivingDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      Detail for Self-Driving Car
    </div>
  );
}
function CamCussionDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      Detail for CamCussion
    </div>
  );
}
function DeepFakeDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      Detail for DeepFake Detection
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

function AppRouter() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen">
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
