
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { CpuIcon, User, BookOpen, CalendarIcon, InfoIcon } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';

// Define validation schema
const signUpSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  age: z.string().min(1, "Age is required")
    .refine(val => !isNaN(Number(val)), "Age must be a number")
    .refine(val => Number(val) >= 8 && Number(val) <= 18, "Age must be between 8 and 18"),
  grade: z.string().min(1, "Grade is required")
    .refine(val => !isNaN(Number(val)), "Grade must be a number")
    .refine(val => Number(val) >= 3 && Number(val) <= 12, "Grade must be between 3 and 12"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    age: '',
    grade: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      signUpSchema.parse(formData);
      
      // Store the form data in session storage to use on quiz and thank you pages
      sessionStorage.setItem('signUpData', JSON.stringify(formData));
      
      // Show success toast
      toast.success("Sign-up successful! Time for a short quiz.", {
        position: "top-center",
      });
      
      // Navigate to quiz page
      setTimeout(() => {
        navigate('/quiz');
      }, 1000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

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
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="page-container pt-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <span className="inline-block bg-retro-accent/20 text-white font-code text-sm px-3 py-1 rounded-md mb-4 border border-retro-accent/30">
              STEP 1 OF 2
            </span>
            
            <h1 className="text-4xl font-display font-bold mb-4">
              Join the <span className="text-retro-accent">Club</span>
            </h1>
            
            <p className="text-white/70">
              Fill out this form to sign up for the Coding & Robotics Club. 
              After signing up, you'll take a short quiz to help us understand your knowledge level.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="glass-card p-8 rounded-lg"
          >
            {/* Hidden form for Netlify */}
            <form name="signup" data-netlify="true" hidden>
              <input type="text" name="firstName" />
              <input type="text" name="lastName" />
              <input type="text" name="age" />
              <input type="text" name="grade" />
              <input type="text" name="formType" />
            </form>

            <form 
              name="signup" 
              method="POST" 
              data-netlify="true"
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              {/* Netlify form requirement */}
              <input type="hidden" name="form-name" value="signup" />
              <input type="hidden" name="formType" value="initial-signup" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-white/80 flex items-center">
                    <User className="w-4 h-4 mr-2 text-retro-accent" />
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`retro-input w-full ${errors.firstName ? 'border-red-500' : ''}`}
                    placeholder="Your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-white/80 flex items-center">
                    <User className="w-4 h-4 mr-2 text-retro-accent" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`retro-input w-full ${errors.lastName ? 'border-red-500' : ''}`}
                    placeholder="Your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="age" className="block text-sm font-medium text-white/80 flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2 text-retro-accent" />
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="8"
                    max="18"
                    className={`retro-input w-full ${errors.age ? 'border-red-500' : ''}`}
                    placeholder="Your age"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="grade" className="block text-sm font-medium text-white/80 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-retro-accent" />
                    Grade
                  </label>
                  <input
                    type="number"
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    min="3"
                    max="12"
                    className={`retro-input w-full ${errors.grade ? 'border-red-500' : ''}`}
                    placeholder="Your grade"
                  />
                  {errors.grade && (
                    <p className="text-red-500 text-xs mt-1">{errors.grade}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-retro-light/10 rounded-md border border-retro-light/20">
                <InfoIcon className="w-5 h-5 text-retro-accent mr-3 flex-shrink-0" />
                <p className="text-sm text-white/70">
                  After submitting this form, you'll take a short 10-question quiz about coding and robotics. No worries if you don't know all the answers!
                </p>
              </div>
              
              <div className="flex justify-center pt-4">
                <button type="submit" className="retro-button flex items-center">
                  <CpuIcon className="w-4 h-4 mr-2" />
                  Continue to Quiz
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;