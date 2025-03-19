
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CpuIcon, Code, Zap } from 'lucide-react';
import ThreeScene from './ThreeScene';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const fullText = 'CODE + ROBOTICS';
  
  useEffect(() => {
    let typingTimer: ReturnType<typeof setTimeout>;
    let currentIndex = 0;
    
    const typeNextCharacter = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        
        // Random typing speed between 100-200ms
        const typingSpeed = 100 + Math.random() * 100;
        typingTimer = setTimeout(typeNextCharacter, typingSpeed);
      } else {
        setTypingComplete(true);
      }
    };
    
    // Start typing after a delay
    const startDelay = setTimeout(() => {
      typeNextCharacter();
    }, 500);
    
    return () => {
      clearTimeout(startDelay);
      clearTimeout(typingTimer);
    };
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center pt-20 pb-10 px-6 md:px-12 overflow-hidden">
      {/* Text Content */}
      <motion.div 
        className="z-20 md:w-1/2 md:pr-8 mb-12 md:mb-0 text-center md:text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="inline-block bg-retro-accent/20 px-3 py-1 rounded-md mb-4 border border-retro-accent/30"
          variants={itemVariants}
        >
          <span className="font-code text-sm flex items-center">
            <Zap className="w-4 h-4 mr-2 text-retro-accent" />
            <span className="text-white">GRASSDALE HIGH SCHOOL CLUB</span>
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 font-display tracking-tight"
          variants={itemVariants}
        >
          <span className="relative">
            <span className="text-white">Join Our </span>
            <div className="relative inline">
              <span className="text-retro-accent font-code">{typedText}</span>
              {!typingComplete && (
                <span className="absolute -right-4 top-0 h-full w-2 bg-retro-accent animate-pulse"></span>
              )}
            </div> 
            <span className="text-white"> Club</span>
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl md:mx-0 mx-auto"
          variants={itemVariants}
        >
          Explore the exciting world of coding and robotics in our after-school program.
          Learn to create programs, build robots, and solve real-world problems with technology.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          variants={itemVariants}
        >
          <Link to="/signup" className="retro-button flex items-center justify-center">
            <CpuIcon className="w-4 h-4 mr-2" />
            Join The Club
          </Link>
          <a href="#frameworks" className="retro-button-secondary flex items-center justify-center">
            <Code className="w-4 h-4 mr-2" />
            Learn More
          </a>
        </motion.div>
        
        <motion.div 
          className="mt-12 flex items-center justify-center md:justify-start space-x-8"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center md:items-start">
            <span className="text-retro-accent font-bold text-3xl font-display">2</span>
            <span className="text-white/60 text-sm">Frameworks</span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-retro-secondary font-bold text-3xl font-display">10+</span>
            <span className="text-white/60 text-sm">Projects</span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-retro-tertiary font-bold text-3xl font-display">20+</span>
            <span className="text-white/60 text-sm">Competitions</span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* 3D Animation */}
      <motion.div 
        className="z-20 md:w-1/2 h-[300px] md:h-[500px] w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          transition: { delay: 0.3, duration: 0.8 } 
        }}
      >
        <ThreeScene />
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-retro-accent/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-retro-secondary/10 rounded-full filter blur-3xl" />
    </div>
  );
};

export default Hero;
