
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import QuizQuestion from '@/components/QuizQuestion';
import { quizQuestions, getPerformanceMessage } from '@/utils/quizData';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

interface QuizResults {
  score: number;
  totalQuestions: number;
  userAnswers: Record<number, number>;
}

interface UserData {
  firstName: string;
  lastName: string;
  age: string;
  grade: string;
}

const ThankYou = () => {
  const navigate = useNavigate();
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Get quiz results and user data from session storage
    const resultsData = sessionStorage.getItem('quizResults');
    const signupData = sessionStorage.getItem('signUpData');
    
    if (!resultsData || !signupData) {
      // Redirect to sign-up page if data is missing
      navigate('/signup');
      return;
    }
    
    const parsedResults = JSON.parse(resultsData);
    const parsedUserData = JSON.parse(signupData);
    
    setQuizResults(parsedResults);
    setUserData(parsedUserData);
    
    // Submit results to Netlify form
    submitToNetlify(parsedUserData, parsedResults);
  }, [navigate]);
  
  const submitToNetlify = async (userData: UserData, quizResults: QuizResults) => {
    if (formSubmitted) return;
    
    try {
      const formData = new FormData();
      formData.append('form-name', 'quiz-results');
      formData.append('formType', 'final-results');
      
      // User info
      formData.append('firstName', userData.firstName);
      formData.append('lastName', userData.lastName);
      formData.append('age', userData.age);
      formData.append('grade', userData.grade);
      
      // Quiz results
      formData.append('score', quizResults.score.toString());
      formData.append('totalQuestions', quizResults.totalQuestions.toString());
      formData.append('percentage', Math.round((quizResults.score / quizResults.totalQuestions) * 100).toString());
      
      // Stringify the user answers object
      formData.append('userAnswers', JSON.stringify(quizResults.userAnswers));
      
      // Submit the form data to Netlify
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (!quizResults || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-retro-accent animate-pulse font-code">Loading results...</div>
      </div>
    );
  }

  const { score, totalQuestions, userAnswers } = quizResults;
  const percentage = Math.round((score / totalQuestions) * 100);
  const performanceMessage = getPerformanceMessage(score);

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      <ParticleBackground />
      
      {/* Hidden form for Netlify */}
      <form name="quiz-results" data-netlify="true" hidden>
        <input type="text" name="firstName" />
        <input type="text" name="lastName" />
        <input type="text" name="age" />
        <input type="text" name="grade" />
        <input type="text" name="score" />
        <input type="text" name="totalQuestions" />
        <input type="text" name="percentage" />
        <input type="text" name="userAnswers" />
        <input type="text" name="formType" />
      </form>
      
      <div className="page-container pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10 reveal-animation">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-retro-accent/20 mb-6">
              <Sparkles className="w-8 h-8 text-retro-accent" />
            </div>
            
            <h1 className="text-4xl font-display font-bold mb-4">
              Thanks for <span className="text-retro-accent">Applying</span>!
            </h1>
            
            <p className="text-white/70 text-lg mb-2">
              {userData.firstName} {userData.lastName}, your application has been received.
            </p>
            
            <p className="text-white/70 mb-8">
              We'll contact you soon with more information about the club's first meeting.
            </p>
            
            <div className="glass-card p-8 rounded-lg mb-10">
              <h2 className="text-2xl font-bold mb-6 font-display">
                Your <span className="text-retro-accent">Quiz Results</span>
              </h2>
              
              <div className="flex justify-center mb-8">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-retro-accent">
                        {score}
                      </span>
                      <span className="text-white text-lg">/</span>
                      <span className="text-white text-lg">
                        {totalQuestions}
                      </span>
                      <p className="text-white/70 text-sm mt-1">
                        {percentage}% Correct
                      </p>
                    </div>
                  </div>
                  
                  <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#172340"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={
                        percentage >= 80
                          ? "#36F9F6"
                          : percentage >= 60
                          ? "#5271FF"
                          : percentage >= 40
                          ? "#FF3864"
                          : "#FF8E3C"
                      }
                      strokeWidth="8"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * percentage) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="text-white/90 mb-8 text-center">
                <h3 className="font-display text-xl mb-2">Assessment</h3>
                <p className="text-white/80">{performanceMessage}</p>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className="retro-button-secondary"
                >
                  {showAnswers ? "Hide Answers" : "Show Answers"}
                </button>
              </div>
            </div>
          </div>

          {showAnswers && (
            <div className="space-y-6 mb-10">
              <h3 className="text-2xl font-bold font-display text-center mb-6">
                Quiz <span className="text-retro-accent">Answers</span>
              </h3>
              
              {quizQuestions.map((question) => (
                <QuizQuestion
                  key={question.id}
                  question={question}
                  onAnswer={() => {}}
                  showResult={true}
                  userAnswer={userAnswers[question.id]}
                />
              ))}
            </div>
          )}
          
          <div className="text-center">
            <a href="/" className="retro-button inline-block">
              Back to Home
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYou;
