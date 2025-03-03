import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    cta: false
  });

  useEffect(() => {
    // Use requestAnimationFrame for smoother animations
    let rafId;
    
    // Trigger animations on component mount with optimized timing
    rafId = requestAnimationFrame(() => {
      setIsVisible(prev => ({ ...prev, hero: true }));
      
      // Reduce the number of state updates by using fewer timeouts
      const timeouts = [
        setTimeout(() => {
          requestAnimationFrame(() => {
            setIsVisible(prev => ({ 
              ...prev, 
              features: true,
              cta: true 
            }));
          });
        }, 400)
      ];
      
      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
        cancelAnimationFrame(rafId);
      };
    });
    
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content overflow-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className={`transition-all duration-700 transform ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ willChange: 'transform, opacity' }}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Where <span className="text-gradient">Code</span> Meets <span className="text-accent">Community</span>
              </h1>
              <p className="text-lg md:text-xl text-base-content/80 mb-8 max-w-2xl">
                NerdHive is the premier platform for developers to connect, collaborate, and create amazing projects together. Join our community of tech enthusiasts today.
              </p>
              <div className="cta-buttons">
                <Link to="/login" className="btn home-btn">
                  Get Started
                </Link>
                <a href="#features" className="btn bg-base-200 hover:bg-base-300 text-base-content px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all">
                  Learn More
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="w-full h-80 md:h-96 relative">
                {/* Code editor mockup */}
                <div className="absolute inset-0 code-editor rounded-lg shadow-2xl overflow-hidden">
                  <div className="terminal-header p-2 bg-base-300 flex items-center">
                    <div className="terminal-dot terminal-dot-red"></div>
                    <div className="terminal-dot terminal-dot-yellow"></div>
                    <div className="terminal-dot terminal-dot-green"></div>
                    <div className="ml-4 text-xs text-base-content/70">connect.js</div>
                  </div>
                  <div className="p-6 font-mono text-sm overflow-hidden">
                    <div className="flex">
                      <span className="code-line-numbers mr-4">1</span>
                      <span><span className="text-blue-400">import</span> <span className="text-green-400">{'{'} connect {'}'}</span> <span className="text-blue-400">from</span> <span className="text-orange-400">'nerdhive'</span>;</span>
                    </div>
                    <div className="flex">
                      <span className="code-line-numbers mr-4">2</span>
                      <span></span>
                    </div>
                    <div className="flex">
                      <span className="code-line-numbers mr-4">3</span>
                      <span><span className="text-purple-400">async</span> <span className="text-yellow-400">function</span> <span className="text-green-400">findCollaborators</span>() {'{'}</span>
                    </div>
                    <div className="flex">
                      <span className="code-line-numbers mr-4">4</span>
                      <span>&nbsp;&nbsp;<span className="text-blue-400">const</span> developers = <span className="text-blue-400">await</span> connect.<span className="text-yellow-400">search</span>({'{'}</span>
                    </div>
                    <div className="flex">
                      <span className="code-line-numbers mr-4">5</span>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;skills: [<span className="text-orange-400">'React'</span>, <span className="text-orange-400">'Node.js'</span>, <span className="text-orange-400">'MongoDB'</span>],</span>
                    </div>
                    <div className="flex">
                      <span className="code-line-numbers mr-4">6</span>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;availability: <span className="text-orange-400">'part-time'</span>,</span>
                    </div>
                    <div className="flex">
                      <span className="code-line-numbers mr-4">7</span>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;interests: [<span className="text-orange-400">'AI'</span>, <span className="text-orange-400">'Web3'</span>]</span>
                    </div>
                    <div className="flex">
                      <span className="code-line-numbers mr-4">8</span>
                      <span>&nbsp;&nbsp;{'}'});</span>
                    </div>
                    <div className="flex">
                      <span className="code-line-numbers mr-4">9</span>
                      <span></span>
                    </div>
                    <div className="flex">
                      <span className="code-line-numbers mr-4">10</span>
                      <span>&nbsp;&nbsp;<span className="text-blue-400">return</span> developers.<span className="text-yellow-400">filter</span>(dev ={">"} dev.rating {">"} <span className="text-purple-400">4.5</span>);</span>
                    </div>
                    <div className="flex">
                      <span className="code-line-numbers mr-4">11</span>
                      <span>{'}'}</span>
                    </div>
                    <div className="flex">
                      <span className="code-line-numbers mr-4">12</span>
                      <span></span>
                    </div>
                    <div className="flex">
                      <span className="code-line-numbers mr-4">13</span>
                      <span><span className="text-green-400">findCollaborators</span>().<span className="text-yellow-400">then</span>(devs ={">"} console.<span className="text-yellow-400">log</span>(<span className="text-orange-400">'Found teammates!'</span>));</span>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className={`transition-all duration-700 delay-200 transform ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ willChange: 'transform, opacity' }}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Developers, by Developers</h2>
            <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
              NerdHive provides all the tools you need to connect with like-minded developers and build amazing projects together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card hover:shadow-lg transition-all duration-300 bg-base-200 hover:bg-base-300">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect with Peers</h3>
                <p className="text-base-content/70">
                  Find and connect with developers who share your interests, tech stack, and project goals.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card hover:shadow-lg transition-all duration-300 bg-base-200 hover:bg-base-300">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Collaborate on Projects</h3>
                <p className="text-base-content/70">
                  Create or join projects, coordinate with team members, and build your portfolio together.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card hover:shadow-lg transition-all duration-300 bg-base-200 hover:bg-base-300">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Communication</h3>
                <p className="text-base-content/70">
                  Chat with connections, discuss ideas, and coordinate project tasks in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className={`transition-all duration-700 delay-400 transform ${isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ willChange: 'transform, opacity' }}>
          <div className="glass-effect rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/30 rounded-full blur-xl"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to join our developer community?</h2>
              <p className="text-lg text-base-content/80 mb-8 max-w-2xl mx-auto">
                Create your profile, connect with fellow developers, and start building amazing projects together.
              </p>
              <div className="cta-buttons">
                <Link to="/signup" className="btn home-btn">
                  Join NerdHive Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
