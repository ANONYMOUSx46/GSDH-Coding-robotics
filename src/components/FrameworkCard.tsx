import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';

interface FrameworkCardProps {
  title: string;
  description: string;
  imageUrl: string;
  color: string;
  learnMoreUrl: string;
}

const FrameworkCard: React.FC<FrameworkCardProps> = ({
  title,
  description,
  imageUrl,
  color,
  learnMoreUrl,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="glass-card rounded-lg overflow-hidden relative h-full"
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center z-0" 
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      <div 
        className="absolute top-0 left-0 w-1 h-full" 
        style={{ backgroundColor: color }}
      />
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="mb-4 w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
          <img src={imageUrl} alt={title} className="w-12 h-12 object-contain" />
        </div>
        
        <h3 className="text-2xl font-bold mb-2 font-display" style={{ color }}>
          {title}
        </h3>
        
        <p className="text-white/80 mb-4 flex-grow">{description}</p>
        
        <a 
          href={learnMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center font-code text-sm group"
        >
          <span className="mr-2 text-white group-hover:text-retro-accent transition-colors">
            LEARN MORE
          </span>
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRightIcon 
              className="w-4 h-4 text-white group-hover:text-retro-accent transition-colors" 
            />
          </motion.div>
        </a>
      </div>
    </motion.div>
  );
};

export default FrameworkCard;
