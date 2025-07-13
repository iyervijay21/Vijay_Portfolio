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
      <div id="Hero" className="w-full bg-gray-800 shadow-md mb-8 p-6">

          <section id="home" className="flex flex-col-reverse md:flex-row items-center">
            <div className="w-full md:w-1/2 text-align: justify;">
              
              <p className="text-xl md:text-2xl mb-6 text-purple-200">
              Hey there<span role="img" aria-label="wave">👋</span>! I'm a pixel wizard who sees the world through a quirky lens turning everyday images into a playground of possibilities.  I mix creativity with code, teaching machines to interpret the visual world in fun, unexpected ways. Whether it’s health tech or autonomous adventures, I’m here to bring a splash of color to computer vision.
            
              </p>
              
              <div className="space-x-4">
                <a href="#contact" className="bg-purple-600 text-white hover-glow px-4 py-2 rounded font-bold">
                  Contact Me
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <img
  src={require('./media/vijay.jpg')}
  alt="Hero"
  className="w-80 h-80 object-cover rounded-full"
/>



</div>

          </section>
        </div>
      </FadeInSection>

      {/* SKILLS SECTION */}
      <FadeInSection className="py-20">
      <div id="skills" className="w-full bg-gray-800 shadow-md mb-8 p-6">

          <h2 className="text-3xl font-bold mb-6 text-purple-300 text-center">My Tech Stack</h2>
          
          
          
          {/* Language/Frameworks */}
          <div className="mb-12 p-4 border rounded border-gray-700">
            <h3 className="text-2xl font-bold text-purple-200 mb-4">Language/Frameworks</h3>
            <div className="flex flex-wrap justify-evenly gap-6">
            <div className="flex flex-col items-center hover-glow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="python" className="w-16 h-16 mb-2" />
                <p className="text-purple-300 font-semibold">python</p>
              </div>
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
      <div className="bg-transparent p-6 shadow hover-glow w-full md:w-1/3 rounded-none flex items-center space-x-4">
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
        <p className="text-sm text-purple-200 mt-2">
          May 2022 – July 2025
          <br />
          GPA: 2.3
        </p>
      </div>
      </div>
      <div className="bg-transparent p-6 shadow hover-glow w-full md:w-1/3 rounded-none flex items-center space-x-4">
      <img
        src={require('./media/booklogo.png')}
        alt="TCET logo"
        className="h-20 w-20 rounded bg-white object-contain"
      />
      <div>
<h3 className="text-xl font-bold mb-2 text-white">
          Thakur College of Engineering and Technology
        </h3>
        <p className="text-white">
          B.Eng. in Electronics Engineering
        </p>
        <p className="text-sm text-purple-200 mt-2">
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
  <div id="experience" className="w-full bg-gray-800 shadow-md mb-8 p-6">
    <h2 className="text-3xl font-bold mb-8 text-purple-300">Work Experience</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {/* FZI */}
      <div className="relative group bg-transparent p-6 rounded shadow hover-glow cursor-pointer">
        <div className="flex items-center space-x-4">
          <img
  src={require('./media/1524.png')}
  alt="FZI Logo"
  className="h-20 w-20 rounded bg-white object-contain"
/>
          <div>
            <h3 className="text-xl font-bold text-white">FZI</h3>
            <p className="text-purple-200">Working Student (Sept 2025 – Dec 2025)</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-hidden group-hover:overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-64 overlay-scrollbar">
          <h3 className="text-xl font-bold mb-2">FZI</h3>
          <p className="text-sm">
            Focused on digital accessibility improvements by crafting intuitive UIs with Material-UI and React. Integrated a real-time text-to-speech engine using Python-based microservices to deliver dynamic audio feedback, ensuring the platform was fully accessible to visually impaired users. Optimized asynchronous data flows to reduce load times by nearly 40%.
          </p>
        </div>
      </div>
      
      {/* TecoLab */}
      <div className="relative group bg-transparent p-6 rounded shadow hover-glow cursor-pointer">
        <div className="flex items-center space-x-4">
          <img
  src={require('./media/teco_trans.png')}
  alt="TecoLab Logo"
  className="h-20 w-20 rounded bg-white object-contain"
/>
          <div>
            <h3 className="text-xl font-bold text-white">TecoLab</h3>
            <p className="text-purple-200">Working Student (Mar 2023 – Present)</p>
          </div>
        </div>
        {/* Hover overlay with max height and scrolling */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-hidden group-hover:overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-64 overlay-scrollbar">
          <h3 className="text-xl font-bold mb-2">TecoLab</h3>
          <p className="text-sm">
            Led the ML4Print project, where I designed a robust document analysis pipeline using OCR and deep neural networks to classify printed materials in real time. I developed custom pre-processing modules in Python and fine-tuned TensorFlow models to minimize inference latency. Additionally, I built a heat simulation module leveraging RNNs to model thermal behavior in industrial valves, significantly reducing downtime. My role also included containerizing applications with Docker and orchestrating deployments via Kubernetes.
          </p>
        </div>
      </div>
      
      {/* Access@KIT */}
      <div className="relative group bg-transparent p-6 rounded shadow hover-glow cursor-pointer">
        <div className="flex items-center space-x-4">
          <img
  src={require('./media/6379_access@kit_rgb_dt.png')}
  alt="Access@KIT Logo"
  className="h-20 w-20 rounded bg-white object-contain"
/>
          <div>
            <h3 className="text-xl font-bold text-white">Access@KIT</h3>
            <p className="text-purple-200">Working Student (Mar 2023 – May 2023)</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-hidden group-hover:overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-64 overlay-scrollbar">
          <h3 className="text-xl font-bold mb-2">Access@KIT</h3>
          <p className="text-sm">
            Focused on digital accessibility improvements by crafting intuitive UIs with Material-UI and React. Integrated a real-time text-to-speech engine using Python-based microservices to deliver dynamic audio feedback, ensuring the platform was fully accessible to visually impaired users. Optimized asynchronous data flows to reduce load times by nearly 40%.
          </p>
        </div>
      </div>
      
      {/* Accur Digitus */}
<div className="relative group bg-transparent p-6 rounded shadow hover-glow cursor-pointer">
  <div className="flex items-center space-x-4">
    <img
  src={require('./media/accur_digitus_logo.jpg')}
  alt="Accur Digitus Logo"
  className="h-20 w-20 rounded bg-white object-contain"
/>
    <div>
      <h3 className="text-xl font-bold text-white">Accur Digitus</h3>
      <p className="text-purple-200">Web Developer (Jan 2020 – May 2020)</p>
    </div>
  </div>
  <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-hidden group-hover:overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-64 overlay-scrollbar">
    <h3 className="text-xl font-bold mb-2">Accur Digitus</h3>
    <p className="text-sm">
      Engineered responsive web applications using React and Tailwind CSS. Developed scalable RESTful API integrations and implemented Redux for state management, streamlining data flow across components. Collaborated closely with designers to create a pixel-perfect user experience that increased engagement by over 30%.
    </p>
  </div>
</div>

      
      {/* Accenture */}
      <div className="relative group bg-transparent p-6 rounded shadow hover-glow cursor-pointer">
        <div className="flex items-center space-x-4">
          <img
  src={require('./media/Accenture.webp')}
  alt="Accenture Logo"
  className="h-20 w-20 rounded bg-white object-contain"
/>
          <div>
            <h3 className="text-xl font-bold text-white">Accenture India</h3>
            <p className="text-purple-200">Associate SE (Feb 2022 – Apr 2022)</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-hidden group-hover:overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-64 overlay-scrollbar">
          <h3 className="text-xl font-bold mb-2">Accenture India</h3>
          <p className="text-sm">
            Maintained critical IBM Mainframe systems through custom COBOL scripts and proactive monitoring tools. Collaborated with cross-functional teams to diagnose performance bottlenecks, ensuring 99.9% uptime and efficient legacy system integration with modern technologies.
          </p>
        </div>
      </div>
      
    </div>
  </div>
</FadeInSection>

{/* PROJECTS SECTION */}
<FadeInSection className="py-20">
  <div id="projects" className="w-full bg-gray-800 shadow-md mb-8 p-6">
    <h2 className="text-3xl font-bold mb-6 text-purple-300">Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      
      {/* Real-Time Car Accident Alert System */}
      <div className="relative group bg-transparent p-6 rounded shadow hover-glow cursor-pointer">
        <div className="flex items-center space-x-4">
           <img
  src={require('./media/RTC.png')}
  alt="RTC Logo"
  className="h-20 w-20 object-cover rounded-full"
/>
          <div>
            <h3 className="text-xl font-bold text-white"> Real Time Car Accident Alert System</h3>
            <p className="text-purple-200">Crash Detection</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-hidden group-hover:overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-64 overlay-scrollbar">
          <h3 className="text-xl font-bold mb-2">Real-Time Car Accident Alert System</h3>
          <p className="text-sm">
            Developed an embedded system integrating accelerometer, gyroscope, and video data streams to detect collisions in real time. Employed a custom CNN model alongside sensor fusion algorithms to trigger precise geolocation-based alerts, dramatically reducing emergency response times.
          </p>
        </div>
      </div>
      
      {/* Self-Driving Car */}
      <div className="relative group bg-transparent p-6 rounded shadow hover-glow cursor-pointer">
        <div className="flex items-center space-x-4">
           <img
  src={require('./media/LiDAR-Technology.png')}
  alt="LiDAR Logo"
  className="h-20 w-20 object-cover rounded-full"
/>
          <div>
            <h3 className="text-xl font-bold text-white">Self-Driving Car using LIDAR</h3>
            <p className="text-purple-200">Autonomous Nav</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-hidden group-hover:overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-64 overlay-scrollbar">
          <h3 className="text-xl font-bold mb-2">Self-Driving Car using LIDAR</h3>
          <p className="text-sm">
            Engineered an autonomous navigation system by integrating LIDAR, radar, and camera inputs to generate real-time 3D maps. Applied YOLO for rapid obstacle detection and used reinforcement learning algorithms to refine path planning in dynamic urban environments.
          </p>
        </div>
      </div>
      
      {/* CamCussion */}
      <div className="relative group bg-transparent p-6 rounded shadow hover-glow cursor-pointer">
        <div className="flex items-center space-x-4">
           <img
  src={require('./media/CCS.jpg')}
  alt="CCS Logo"
  className="h-20 w-20 object-cover rounded-full"
/>
          <div>
            <h3 className="text-xl font-bold text-white">CamCussion (Zeiss Innovation Hub)</h3>
            <p className="text-purple-200">Eye Tracking</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-hidden group-hover:overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-64 overlay-scrollbar">
          <h3 className="text-xl font-bold mb-2">CamCussion</h3>
          <p className="text-sm">
            In collaboration with industry partners, developed a real-time eye tracking solution using OpenCV. The system analyzes pupil dilation and saccadic movements to provide early indicators for concussion diagnosis, employing advanced feature detection and machine learning for accurate measurement.
          </p>
        </div>
      </div>
      
      {/* DeepFake Detection */}
      <div className="relative group bg-transparent p-6 rounded shadow hover-glow cursor-pointer">
        <div className="flex items-center space-x-4">
           <img
  src={require('./media/DEEP.jpg')}
  alt="DeepFake Logo"
  className="h-20 w-20 object-cover rounded-full"
/>
          <div>
            <h3 className="text-xl font-bold text-white">DeepFake Detection (FZI)</h3>
            <p className="text-purple-200">rPPG Analysis</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-4 opacity-0 overflow-y-hidden group-hover:overflow-y-auto group-hover:opacity-100 transition-all duration-300 max-h-64 overlay-scrollbar">
          <h3 className="text-xl font-bold mb-2">DeepFake Detection System</h3>
          <p className="text-sm">
            Currently under development, this system harnesses rPPG signals to capture subtle facial blood flow patterns. By employing attention-based neural networks and multi-region analysis, it distinguishes authentic video content from deepfakes, providing a critical layer of security in digital media verification.
          </p>
        </div>
      </div>
      
    </div>
  </div>
</FadeInSection>



      {/* CONTACT SECTION */}
      <FadeInSection className="py-20">
        <div id="contact" className="w-full bg-gray-800 shadow-md mb-8 p-6">
          <h2 className="text-3xl font-bold mb-4 text-purple-300">Contact Me</h2>
          <p className="text-purple-200 mb-6">
          I'm always up for a wild brainstorming session where we turn pixels into pure magic—let’s chat if you're as excited about playful AI, ML, and computer vision adventures as I am!
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
     I engineered a real-time embedded system designed to detect vehicle collisions using a combination of accelerometers, gyroscopes, and computer vision techniques. The system utilizes a fusion algorithm implemented in Python that aggregates sensor data and processes video streams using OpenCV. A custom deep learning model—trained on thousands of simulated accident scenarios—detects impact events and triggers an immediate alert, complete with geolocation data retrieved via GPS modules. The backend, developed in Node.js, communicates with emergency services and dispatches notifications to a mobile application within seconds. This project required meticulous calibration of sensor fusion parameters and optimization of convolutional neural networks (CNNs) to balance accuracy with latency.
    </div>
  );
}
function SelfDrivingDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      For the autonomous navigation project, I developed a robust computer vision system that integrates data from LIDAR, radar, and high-resolution cameras to construct detailed 3D environmental maps in real time. I implemented sensor fusion algorithms that merge disparate data sources into a unified spatial model, using techniques such as Kalman filtering and point cloud processing. A deep learning model based on YOLO (You Only Look Once) was integrated to identify obstacles and dynamic objects, while reinforcement learning algorithms optimized navigation decisions under uncertain conditions. The project also involved significant work on simulation environments, where I used MATLAB and Python to validate the system under varying conditions and improve model accuracy. The outcome was a self-driving prototype capable of autonomous navigation in complex urban settings, demonstrating state-of-the-art performance in obstacle detection and path planning.
    </div>
  );
}
function CamCussionDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      In collaboration with the Zeiss Innovation Hub, I developed an eye tracking solution to aid in the diagnosis of concussions. Using OpenCV, I built a system that captures real-time video of a subject’s face and employs advanced feature detection to track pupil movement and saccadic behavior. The software incorporates a custom machine learning model that analyzes these metrics to provide early indicators of concussion. This project involved optimizing video processing pipelines for real-time analysis and integrating statistical methods to ensure robust performance under varied lighting conditions. The results have the potential to transform how concussions are diagnosed, making the process faster and more reliable.
    </div>
  );
}
function DeepFakeDetail() {
  return (
    <div className="container mx-auto px-6 py-20 text-purple-200">
      Currently under development, this project focuses on creating a robust system to detect deepfakes by analyzing subtle facial cues. The system employs remote photoplethysmography (rPPG) to capture minute variations in facial blood flow—a signal that deepfake algorithms often fail to replicate accurately. Using a combination of attention-based neural networks and multi-region analysis, the system processes video inputs and flags inconsistencies that indicate tampering. I’ve experimented with several deep learning architectures and loss functions to fine-tune the detection accuracy. The project aims to provide a critical tool for digital media security, ensuring authenticity in an era of increasingly sophisticated manipulation techniques.
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
    <Router basename="/Vijay_portfolio">
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