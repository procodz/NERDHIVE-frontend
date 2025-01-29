import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* NavBar */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-8 py-16">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <div className="w-64 h-64" dangerouslySetInnerHTML={{
            __html: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><rect width='400' height='400' fill='#1E1E1E'/><defs><linearGradient id='tealOrangeGradient' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:#1E90FF'/><stop offset='100%' style='stop-color:#FF8C00'/></linearGradient><filter id='neonGlow' height='300%' width='300%' x='-75%' y='-75%'><feGaussianBlur stdDeviation='8' result='coloredBlur'/><feMerge><feMergeNode in='coloredBlur'/><feMergeNode in='SourceGraphic'/></feMerge></filter></defs><g transform='translate(200 160)'><g transform='rotate(30)'><path d='M0,-100 L86.6,-50 L86.6,50 L0,100 L-86.6,50 L-86.6,-50 Z' fill='none' stroke='url(#tealOrangeGradient)' stroke-width='3' opacity='0.35'/></g><g transform='rotate(15)'><path d='M0,-90 L77.9,-45 L77.9,45 L0,90 L-77.9,45 L-77.9,-45 Z' fill='none' stroke='url(#tealOrangeGradient)' stroke-width='3' opacity='0.5'/></g><path d='M0,-80 L69.2,-40 L69.2,40 L0,80 L-69.2,40 L-69.2,-40 Z' fill='url(#tealOrangeGradient)' stroke='#1E90FF' stroke-width='2' filter='url(#neonGlow)'/><g fill='none' stroke='#32CD32' stroke-width='2'><path d='M-20,-10 L-30,0 L-20,10' /><path d='M20,-10 L30,0 L20,10' /><line x1='-15' y1='0' x2='15' y2='0' /></g></g><g transform='translate(200 300)'><text x='0' y='0' font-family='Segoe UI, Arial, sans-serif' font-size='40' font-weight='900' text-anchor='middle' fill='#FFFFFF'>NERD<tspan fill='#32CD32'>HIVE</tspan></text><line x1='-110' y1='25' x2='110' y2='25' stroke='url(#tealOrangeGradient)' stroke-width='2' stroke-dasharray='2,6'/></g><g stroke='#32CD32' stroke-width='1.5' fill='none'><circle cx='200' cy='160' r='110' opacity='0.18'/><circle cx='200' cy='160' r='130' opacity='0.1'/></g></svg>`
          }} />

          <h1 className="text-4xl font-extrabold mt-8 text-center">
            Welcome to <span className="text-green-400">NerdHive</span>
          </h1>
          <p className="text-lg mt-4 text-center max-w-2xl">
            Discover, collaborate, and create innovative tech projects with a thriving community of developers.
          </p>

          <div className="mt-8 space-x-4">
            <Link to="/login" className="bg-green-500 hover:bg-green-400 text-white py-2 px-6 rounded-lg shadow-lg">Login/Signup</Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
