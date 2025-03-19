
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FrameworkCard from '@/components/FrameworkCard';
import ParticleBackground from '@/components/ParticleBackground';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Mail, MessageSquare } from 'lucide-react';

const Index = () => {
  // Animation controls for scroll-triggered animations
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <ParticleBackground />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Frameworks Section */}
      <section id="frameworks" className="py-20 page-container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.span variants={itemVariants} className="bg-retro-accent/20 text-white font-code text-sm px-3 py-1 rounded-md inline-block mb-4 border border-retro-accent/30">
            LEARNING FRAMEWORKS
          </motion.span>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-display font-bold mb-4">
            Tools We'll <span className="text-retro-accent">Explore</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-white/70 max-w-2xl mx-auto">
            Our club focuses on these two powerful platforms that make coding and electronics accessible and fun for beginners and experienced programmers alike.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <FrameworkCard
              title="Scratch"
              description="A visual programming language developed by MIT that makes it easy to create interactive stories, games, and animations. Perfect for beginners learning the fundamentals of coding."
              imageUrl="/scratch.png"
              color="#FFD100"
              learnMoreUrl="https://scratch.mit.edu/"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <FrameworkCard
              title="MicroBit"
              description="A tiny programmable computer designed for education. Learn to code hardware projects, from simple LED displays to robots and musical instruments."
              imageUrl="/micro.png"
              color="#1E90FF"
              learnMoreUrl="https://microbit.org/"
            />
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-radial from-retro-accent/5 to-transparent opacity-50"></div>
        
        <div className="page-container relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 rounded-lg text-center max-w-4xl mx-auto"
          >
            <span className="inline-block text-sm font-code text-white bg-retro-secondary/20 px-3 py-1 rounded-md mb-6 border border-retro-secondary/30">
              LIMITED SPOTS AVAILABLE
            </span>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to join the <span className="text-retro-accent">coding revolution</span>?
            </h2>
            
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Apply now to secure your place in our coding and robotics club. Learn to code, build robots, and participate in exciting competitions and projects throughout the school year.
            </p>
            
            <a 
              href="/signup" 
              className="retro-button inline-block"
            >
              Apply Now
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-retro-light/10">
        <div className="page-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold font-code text-white">
                <span className="text-retro-accent">&lt;</span>Code
                <span className="text-retro-secondary">Bots</span>
                <span className="text-retro-accent">/&gt;</span>
              </h3>
              <p className="text-white/60 mt-2">Grassdale High Coding & Robotics Club Fully Developed by Liam De Wet, Co-assiisant Briadon Fieleis</p>
            </div>
            
            <div className="flex gap-4">
              <a href="https://github.com/ANONYMOUSx46" className="text-white/60 hover:text-retro-accent transition-colors p-2">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-retro-light/10 text-center">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Coding & Robotics Club. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
