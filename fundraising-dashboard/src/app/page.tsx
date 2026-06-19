"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Mail, ArrowRight, CheckCircle2, Bot, Bell, Shield, Smartphone, Briefcase, Code, BarChart, Users } from "lucide-react";

// Social Icons
const InstagramIcon = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const LinkedinIcon = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const TwitterIcon = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden selection:bg-[#00B074] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 px-6 lg:px-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Decorative Grid Background for Hero */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 z-0 pointer-events-none"></div>
        
        {/* Left Column - Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[45%] relative z-10"
        >
          <div className="flex items-center gap-2 mb-6 text-[#00B074] font-bold text-xl tracking-tight">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
            MaveCode AI
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] text-gray-900 mb-6 tracking-tight">
            Automate Your <br/>
            Ideal Business
          </h1>
          <p className="text-gray-500 text-lg mb-10 max-w-md leading-relaxed">
            The digital marketing and automation solution provider for global scale retailers turned to the AI revolution.
          </p>

          {/* Search/CTA Bar */}
          <div className="bg-white rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-2 flex items-center justify-between max-w-md">
            <div className="flex items-center text-gray-400 pl-4">
              <Search size={20} />
              <input 
                type="text" 
                placeholder="Search automation..." 
                className="bg-transparent border-none outline-none pl-3 text-gray-700 w-full"
              />
            </div>
            <Link href="/login" className="bg-[#00B074] hover:bg-[#009b65] text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg shadow-[#00B074]/30">
              Search
            </Link>
          </div>
        </motion.div>

        {/* Right Column - Image & Floating Cards */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[50%] relative h-[500px] lg:h-[600px] z-10"
        >
          {/* Dark Curved Background Element */}
          <div className="absolute top-10 right-0 w-[80%] h-[90%] bg-[#0B2A2D] rounded-bl-[150px] rounded-tr-[50px] rounded-tl-[30px] rounded-br-[30px] z-0"></div>
          
          {/* Main Photo Placeholder (Using a gradient to simulate the professional photo) */}
          <div className="absolute top-0 right-10 w-[75%] h-[95%] bg-gradient-to-tr from-gray-300 to-gray-200 rounded-bl-[130px] rounded-tr-[40px] rounded-tl-[20px] rounded-br-[20px] z-10 overflow-hidden shadow-2xl">
             <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="Professional" className="w-full h-full object-cover opacity-90"/>
          </div>

          {/* Floating Card 1: Notification */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 -left-10 bg-white rounded-2xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.1)] z-20 flex items-center gap-3 border border-gray-50"
          >
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500">
              <Bell size={20} className="fill-yellow-500"/>
            </div>
            <span className="font-bold text-sm text-gray-800">Job Alert Subscribe</span>
          </motion.div>

          {/* Floating Card 2: 5k+ Candidates */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 -left-4 bg-white rounded-2xl p-5 shadow-[0_15px_30px_rgba(0,0,0,0.1)] z-20 border border-gray-50"
          >
            <span className="font-bold text-gray-800 block mb-2">5k+ candidates get job</span>
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                   <img src={`https://i.pravatar.cc/100?img=${i}`} alt="user" className="w-full h-full object-cover"/>
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-[#00B074] text-white flex items-center justify-center font-bold text-xs">
                +
              </div>
            </div>
          </motion.div>

          {/* Floating Card 3: 8M+ Matches */}
          <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-10 left-1/4 bg-[#EAE6FF] rounded-2xl p-6 shadow-[0_15px_30px_rgba(0,0,0,0.05)] z-20 flex items-center gap-5 border border-white"
          >
            <div>
              <div className="text-3xl font-black text-gray-900 leading-none mb-1">8M+</div>
              <div className="text-xs text-gray-600 font-medium">Matches Made</div>
            </div>
            <div className="h-10 w-px bg-gray-300"></div>
            <div>
              <div className="text-sm font-bold text-gray-800 mb-1">Unlocking your<br/>potential</div>
              <div className="text-[10px] text-gray-500 mb-2">Here to help with our logistics</div>
              <a href="#" className="text-[#00B074] text-[10px] font-bold underline">Browse All Categories</a>
            </div>
          </motion.div>

        </motion.div>
      </section>


      {/* 2. WHY CHOOSE US SECTION */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
         {/* Dot Pattern Left */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(#d1d5db_2px,transparent_2px)] [background-size:16px_16px] opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[40%]"
          >
            <div className="bg-[#EAE6FF] text-[#6E50F3] px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-6 tracking-wide uppercase">
              Why Choose Us
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-[1.2]">
              Many Top Companies<br/>Posted Here
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Discover opportunities from leading companies across various industries. Our platform hosts job postings from top-tier organizations, giving freelancers access to high-quality projects and reputable clients. Whether you're looking to work with innovative startups or established global brands.
            </p>
            <Link href="/login" className="bg-[#00B074] hover:bg-[#009b65] text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg shadow-[#00B074]/30 inline-block">
              Explore Opening Jobs
            </Link>
          </motion.div>

          {/* Right Floating Mockups */}
          <div className="w-full lg:w-[60%] relative h-[500px]">
             
             {/* Mockup 1: Pinterest Card */}
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="absolute top-10 right-0 w-[90%] bg-white rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4 z-10"
             >
                <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-bold text-xl">P</div>
                    <span className="font-bold text-gray-800">Pinterest</span>
                  </div>
                  <div className="flex gap-8 text-sm">
                    <div className="text-gray-500"><span className="font-bold text-gray-900">$50.00</span>/hr</div>
                    <div className="text-gray-500">3 hr ago</div>
                    <div className="text-gray-500">Remote</div>
                  </div>
                </div>
                {/* Simulated repetitive rows to match screenshot */}
                <div className="flex items-center justify-between opacity-40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                    <span className="font-bold text-gray-800 blur-[2px]">Pinterest</span>
                  </div>
                  <div className="flex gap-8 text-sm blur-[2px]">
                    <div className="text-gray-500">$50.00/hr</div>
                    <div className="text-gray-500">3 hr ago</div>
                    <div className="text-gray-500">Remote</div>
                  </div>
                </div>
             </motion.div>

             {/* Mockup 2: Top Floating Search Bar */}
             <motion.div 
               initial={{ opacity: 0, y: -30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="absolute -top-6 right-10 bg-white rounded-full p-2 shadow-xl border border-gray-100 flex items-center gap-4 pr-6 z-20"
             >
               <div className="bg-gray-50 px-4 py-2 rounded-full flex items-center gap-2 text-gray-400">
                 <Search size={16} />
                 <span className="text-sm">Search job</span>
               </div>
               <div className="bg-[#00B074] text-white px-6 py-2 rounded-full text-sm font-bold">Search</div>
             </motion.div>

             {/* Mockup 3: LinkedIn Card Overlapping */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="absolute bottom-10 left-10 w-[60%] bg-white rounded-3xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-gray-100 z-30 flex flex-col items-center text-center"
             >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-3">
                  <LinkedinIcon size={32} />
                </div>
                <h3 className="font-bold text-lg text-gray-900">LinkedIn</h3>
                <p className="text-[10px] text-gray-500 mt-2 mb-4 leading-relaxed">
                  Create your free job posting today and start receiving competitive quotes from qualified professionals within just a few hours.
                </p>
                <button className="bg-[#EAE6FF] text-[#6E50F3] w-full py-2.5 rounded-xl text-sm font-bold hover:bg-[#d8d1ff] transition-colors">
                  Apply
                </button>
             </motion.div>

          </div>

        </div>
      </section>


      {/* 3. HOW IT WORKS SECTION (Dark Teal) */}
      <section className="py-24 bg-[#0B2A2D] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[45%]"
          >
            <div className="bg-white/10 text-[#a594fd] px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-6 tracking-wide uppercase backdrop-blur-md">
              How It Works
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-[1.2]">
              Meet with Jobfine's AI<br/>Recruiter Now
            </h2>
            <p className="text-gray-300 mb-10 leading-relaxed font-light text-sm lg:text-base">
              Take the next step in your career journey with Jobfine's cutting-edge AI recruiter. Designed to streamline the hiring process, our AI recruiter provides personalized job matches and helps you connect with top employers instantly. Whether you're an experienced professional or just starting out, Jobfine's AI-powered tool makes job hunting easier, faster, and more efficient.
            </p>
            <Link href="/login" className="bg-[#00B074] hover:bg-[#009b65] text-white px-8 py-4 rounded-full font-semibold transition-all inline-block">
              Discover More
            </Link>
          </motion.div>

          {/* Right Chat UI / Timeline */}
          <div className="w-full lg:w-[55%] relative h-[450px] border-l-2 border-dashed border-white/20 pl-10">
            
            {/* User Avatar on timeline */}
            <div className="absolute top-0 -left-6 w-12 h-12 rounded-full border-4 border-[#0B2A2D] bg-white overflow-hidden">
               <img src="https://i.pravatar.cc/100?img=5" alt="Recruiter" className="w-full h-full object-cover"/>
            </div>
            <div className="text-sm font-bold mb-2">Recruiter</div>
            
            {/* Chat Bubble 1 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white text-gray-800 px-6 py-3 rounded-t-2xl rounded-br-2xl rounded-bl-sm shadow-xl w-fit mb-8"
            >
              Send me candidate who are expert in <span className="bg-yellow-100 text-yellow-800 px-1 rounded font-bold">Figma</span> and understand <span className="bg-orange-100 text-orange-800 px-1 rounded font-bold">HTML</span>.
            </motion.div>

            {/* AI Avatar on timeline */}
            <div className="absolute top-32 -left-6 w-12 h-12 rounded-full border-4 border-[#0B2A2D] bg-[#00B074] flex items-center justify-center text-white">
               <Bot size={20} />
            </div>
            <div className="text-sm font-bold mb-2 text-right text-gray-300">Jobfine's Recruiter</div>
            
            {/* Chat Bubble 2 (Right aligned) */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="bg-[#EAE6FF] text-[#6E50F3] px-6 py-3 rounded-t-2xl rounded-bl-2xl rounded-br-sm shadow-xl w-fit ml-auto mb-8 font-medium"
            >
              Sure! Sending you a list of relevant candidates now
            </motion.div>

            <div className="text-xs text-gray-400 mb-4 font-mono">Searching...</div>
            {/* Avatar Search Row */}
            <div className="flex gap-2 mb-8 opacity-50">
              {[1,2,3,4,5,6,7].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/20 overflow-hidden">
                   <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover"/>
                </div>
              ))}
            </div>

            {/* Timeline Like Icon */}
            <div className="absolute bottom-10 -left-6 w-12 h-12 rounded-full border-4 border-[#0B2A2D] bg-white flex items-center justify-center text-[#00B074]">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
            </div>

            {/* Results Card */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
               className="bg-white rounded-2xl p-5 shadow-2xl text-gray-800 w-[90%]"
            >
               <h4 className="font-bold text-sm mb-4">Your Qualified Candidates Review List</h4>
               
               <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                 <div className="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/100?img=11" className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="font-bold text-xs">John Brooklynn <span className="text-[9px] bg-green-100 text-green-700 px-1 rounded ml-1">Interested</span></div>
                      <div className="text-[10px] text-gray-500">Experience in <span className="bg-yellow-100 text-yellow-800 px-1 rounded font-bold">Figma</span></div>
                    </div>
                 </div>
                 <CheckCircle2 size={16} className="text-[#00B074]"/>
               </div>

               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/100?img=12" className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="font-bold text-xs">Guy Hawkins <span className="text-[9px] bg-green-100 text-green-700 px-1 rounded ml-1">Interested</span></div>
                      <div className="text-[10px] text-gray-500">Experience in <span className="bg-yellow-100 text-yellow-800 px-1 rounded font-bold">Figma</span> and <span className="bg-orange-100 text-orange-800 px-1 rounded font-bold">HTML</span></div>
                    </div>
                 </div>
                 <CheckCircle2 size={16} className="text-[#00B074]"/>
               </div>

            </motion.div>

          </div>
        </div>
      </section>


      {/* 4. MARKETPLACE SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          
          <div className="text-center mb-12">
            <div className="bg-[#EAE6FF] text-[#6E50F3] px-4 py-1.5 rounded-full text-xs font-bold w-fit mx-auto mb-6 tracking-wide uppercase">
              Marketplace
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Check Job of The Day
            </h2>
            <p className="text-gray-500">
              The digital marketing solution provider for Ford Dealers
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <button className="px-5 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2 font-medium">
              <Briefcase size={14}/> Designer
            </button>
            <button className="px-5 py-2 rounded-full border border-[#00B074] bg-green-50 text-[#00B074] flex items-center gap-2 font-bold shadow-sm">
              <Shield size={14}/> Admin Officer
            </button>
            <button className="px-5 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2 font-medium">
              <BarChart size={14}/> Finance Staff
            </button>
            <button className="px-5 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2 font-medium">
              <FileText size={14}/> Content Writer
            </button>
            <button className="px-5 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2 font-medium">
              <Smartphone size={14}/> Technology
            </button>
            <button className="px-5 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2 font-medium">
              <Code size={14}/> Software
            </button>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500 font-black">ci</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Bingo</h4>
                  <p className="text-[10px] text-gray-400">Bandung, Indonesia</p>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Purchasing Staff</h3>
              <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded">Full Time, Remote</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> 2 hours ago</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Create your free job posting today and start receiving competitive quotes from qualified professionals within just a few hours.
              </p>
              <div className="flex items-center gap-2 border-t border-gray-100 pt-4">
                 <span className="text-[9px] bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100">Figma</span>
                 <span className="text-[9px] bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100">Adobe</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-xl">H</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Huawei</h4>
                  <p className="text-[10px] text-gray-400">Jakarta, Indonesia</p>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-3">UI/UX Designer</h3>
              <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded">Full Time, Remote</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> 2 hours ago</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Create your free job posting today and start receiving competitive quotes from qualified professionals within just a few hours.
              </p>
              <div className="flex items-center gap-2 border-t border-gray-100 pt-4">
                 <span className="text-[9px] bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100">Figma</span>
                 <span className="text-[9px] bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100">HTML</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-black text-xs">toggl</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Toggle</h4>
                  <p className="text-[10px] text-gray-400">Bandung, Indonesia</p>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Front-End Developer</h3>
              <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded">Full Time, Remote</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> 2 hours ago</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Create your free job posting today and start receiving competitive quotes from qualified professionals within just a few hours.
              </p>
              <div className="flex items-center gap-2 border-t border-gray-100 pt-4">
                 <span className="text-[9px] bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100">React</span>
                 <span className="text-[9px] bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100">Next.js</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-black"><Bot size={18}/></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Android</h4>
                  <p className="text-[10px] text-gray-400">Yogyakarta, Indonesia</p>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-3">IT Staff</h3>
              <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded">Full Time, Remote</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> 2 hours ago</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Create your free job posting today and start receiving competitive quotes from qualified professionals within just a few hours.
              </p>
              <div className="flex items-center gap-2 border-t border-gray-100 pt-4">
                 <span className="text-[9px] bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100">Kotlin</span>
                 <span className="text-[9px] bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100">Java</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Full background dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_2px,transparent_2px)] [background-size:24px_24px] opacity-40"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          
          <div className="bg-[#EAE6FF] text-[#6E50F3] px-4 py-1.5 rounded-full text-xs font-bold w-fit mx-auto mb-6 tracking-wide uppercase">
            Testimony
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Quotes from Our Customers
          </h2>
          <p className="text-gray-500 mb-16">
            The digital marketing solution provider for Ford Dealers
          </p>

          <div className="relative">
            {/* Center Quote Card */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-gray-100 max-w-3xl mx-auto relative z-20"
            >
              <div className="w-16 h-16 bg-[#00B074] rounded-full text-white flex items-center justify-center absolute -top-8 left-1/2 -translate-x-1/2 shadow-lg shadow-[#00B074]/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M10.33 13.92H6.94c.05-1.92.51-3.6 1.4-5.06a7.1 7.1 0 0 1 3.51-3.14V3c-2.3.62-4.13 1.93-5.46 3.93C5.07 8.92 4.4 11.23 4.4 13.88v6.7h5.93v-6.66zM20.67 13.92h-3.39c.05-1.92.51-3.6 1.4-5.06a7.1 7.1 0 0 1 3.51-3.14V3c-2.3.62-4.13 1.93-5.46 3.93-1.33 1.99-2 4.3-2 6.95v6.7h5.93v-6.66z"/></svg>
              </div>
              <p className="text-xl text-gray-500 leading-relaxed mb-10 pt-4 font-light">
                As a freelancer, I've tried multiple platforms, but none have been as efficient as this one. It's easy to connect with clients, and the payment process is secure and straightforward. Highly recommended!
              </p>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Robert Fox</h4>
                <p className="text-xs text-gray-400">Lead Marketing, Start Up Company</p>
              </div>
            </motion.div>

            {/* Floating Avatars */}
            <motion.img animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} src="https://i.pravatar.cc/100?img=1" className="absolute top-10 left-10 w-16 h-16 rounded-full border-4 border-white shadow-xl opacity-80" />
            <motion.img animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity }} src="https://i.pravatar.cc/100?img=2" className="absolute bottom-20 left-4 w-12 h-12 rounded-full border-4 border-white shadow-xl opacity-60" />
            <motion.img animate={{ y: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity }} src="https://i.pravatar.cc/100?img=3" className="absolute -bottom-10 left-1/4 w-14 h-14 rounded-full border-4 border-white shadow-xl opacity-70" />
            <motion.img animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity }} src="https://i.pravatar.cc/100?img=4" className="absolute top-20 right-10 w-12 h-12 rounded-full border-4 border-white shadow-xl opacity-60" />
            <motion.img animate={{ y: [0, 20, 0] }} transition={{ duration: 5.5, repeat: Infinity }} src="https://i.pravatar.cc/100?img=5" className="absolute bottom-10 right-4 w-16 h-16 rounded-full border-4 border-white shadow-xl opacity-90" />
            
          </div>
          
          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-16">
            <div className="w-2 h-2 rounded-full bg-gray-800"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-[#00B074] font-bold text-xl tracking-tight">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
            MaveCode AI
          </div>
          <p className="text-sm text-gray-400">© 2026 MaveCode AI Automation. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#00B074] hover:bg-green-50 transition-colors">
              <InstagramIcon size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#00B074] hover:bg-green-50 transition-colors">
              <LinkedinIcon size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#00B074] hover:bg-green-50 transition-colors">
              <TwitterIcon size={18} />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
