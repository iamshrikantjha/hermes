import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-base-300 via-base-200 to-base-100 border-t border-base-300/50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Left Section - Project & Personal Brand */}
          <div className="space-y-6 order-2 md:order-1">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Hermes
                  </h3>
                  <p className="text-xs sm:text-sm text-base-content/70">Real-time Collaboration Platform</p>
                </div>
              </div>
              
              <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">
                Built with cutting-edge technologies including WebRTC, Gun.js, and Monaco Editor. 
                Designed for seamless real-time code collaboration with enterprise-grade performance.
              </p>
            </div>

            {/* Tech Stack Badges */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm sm:text-base text-base-content/90">Built with</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['React', 'TypeScript', 'TailwindCSS', 'WebRTC', 'Gun.js', 'Monaco Editor', 'Vite'].map((tech) => (
                  <span key={tech} className="badge badge-outline badge-xs sm:badge-sm hover:badge-primary transition-all duration-200 cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* GitHub Stats */}
            <div className="card bg-base-100/50 backdrop-blur-sm border border-base-300/30 shadow-sm">
              <div className="card-body p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-base-content/70" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-xs sm:text-sm font-medium">Open Source</span>
                  </div>
                  <a href="https://github.com/iamshrikantjha/hermes" target="_blank" rel="noopener noreferrer" 
                     className="btn btn-ghost btn-xs hover:btn-primary">
                    View Code
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Developer Profile */}
          <div className="space-y-6 order-1 md:order-2">
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center shadow-xl ring ring-primary/20 ring-offset-base-100 ring-offset-2 sm:ring-offset-4">
                <span className="text-2xl sm:text-3xl font-bold text-primary-content">SJ</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Shrikant Jha</h2>
              <p className="text-base sm:text-lg text-primary font-semibold mb-3">Full Stack Developer</p>
              <p className="text-sm sm:text-base text-base-content/70 max-w-sm mx-auto leading-relaxed">
                Passionate about building scalable applications and seeking opportunities at FAANG companies 
                to solve complex problems at scale.
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h4 className="font-semibold text-center text-sm sm:text-base">Core Skills</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                {[
                  'JavaScript/TypeScript', 'React/Next.js', 
                  'Node.js/Express', 'Python/Django',
                  'AWS/Docker', 'MongoDB/PostgreSQL',
                  'WebRTC/WebSockets', 'System Design'
                ].map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-xs sm:text-sm">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-success rounded-full"></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-3 sm:gap-4">
              <a href="https://github.com/iamshrikantjha" target="_blank" rel="noopener noreferrer" 
                 className="btn btn-circle btn-sm sm:btn-md btn-outline hover:btn-primary transition-all duration-200">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/iamshrikantjha" target="_blank" rel="noopener noreferrer" 
                 className="btn btn-circle btn-sm sm:btn-md btn-outline hover:btn-primary transition-all duration-200">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://twitter.com/iamshrikantjha" target="_blank" rel="noopener noreferrer" 
                 className="btn btn-circle btn-sm sm:btn-md btn-outline hover:btn-primary transition-all duration-200">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="mailto:shrikantjha11@gmail.com" 
                 className="btn btn-circle btn-sm sm:btn-md btn-outline hover:btn-primary transition-all duration-200">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Section - Call to Action & Info */}
          <div className="space-y-6 order-3 md:col-span-2 xl:col-span-1">
            {/* FAANG Ambition Card */}
            <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <div className="card-body p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-primary">FAANG Ready</h3>
                </div>
                <p className="text-xs sm:text-sm text-base-content/80 mb-4 leading-relaxed">
                  This project demonstrates my ability to build scalable, real-time applications using modern technologies. 
                  I'm actively seeking opportunities at top tech companies.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" 
                     className="btn btn-primary btn-sm flex-1">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    View Resume
                  </a>
                  <a href="mailto:shrikantjha11@gmail.com?subject=Job Opportunity" 
                     className="btn btn-outline btn-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    Hire Me
                  </a>
                </div>
              </div>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="stat bg-base-100/50 backdrop-blur-sm shadow-lg rounded-box p-4 border border-base-300/30">
                <div className="stat-figure text-primary">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <div className="stat-title text-xs sm:text-sm">Project Complexity</div>
                <div className="stat-value text-primary text-lg sm:text-2xl">High</div>
                <div className="stat-desc text-xs">Real-time sync, WebRTC, P2P</div>
              </div>
              
              <div className="stat bg-base-100/50 backdrop-blur-sm shadow-lg rounded-box p-4 border border-base-300/30">
                <div className="stat-figure text-secondary">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
                <div className="stat-title text-xs sm:text-sm">Development Cost</div>
                <div className="stat-value text-secondary text-lg sm:text-2xl">$0</div>
                <div className="stat-desc text-xs">Built with passion</div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm sm:text-base">Quick Links</h4>
              <div className="space-y-1.5 sm:space-y-2">
                <a href="/docs" className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm hover:text-primary transition-colors">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Documentation
                </a>
                <a href="/api" className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm hover:text-primary transition-colors">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  API Reference
                </a>
                <a href="https://github.com/iamshrikantjha/hermes/issues" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm hover:text-primary transition-colors">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                  </svg>
                  Report Issues
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300/50 bg-base-100/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs sm:text-sm text-base-content/70 text-center sm:text-left">
              <span>© {currentYear} Hermes. Built with ❤️ for the future.</span>
              <div className="flex gap-3 sm:gap-4">
                <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
                <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-base-content/70">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-success rounded-full animate-pulse"></div>
                <span>System Status: Operational</span>
              </div>
              <div className="badge badge-outline badge-xs sm:badge-sm">
                v1.0.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}