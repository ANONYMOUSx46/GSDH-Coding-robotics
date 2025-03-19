
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import QuizQuestion from '@/components/QuizQuestion';
import { quizQuestions, calculateScore } from '@/utils/quizData';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronLeft, ChevronRight, FileQuestion, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user came from sign-up page
    const signUpData = sessionStorage.getItem('signUpData');
    
    if (!signUpData) {
      // Redirect to sign-up page if no data is found
      navigate('/signup');
      return;
    }
    
    setUserData(JSON.parse(signUpData));
    setLoading(false);
  }, [navigate]);

  const handleAnswer = (questionId: number, selectedAnswer: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const score = calculateScore(userAnswers);
    const totalQuestions = quizQuestions.length;
    
    // Store quiz results in session storage
    sessionStorage.setItem('quizResults', JSON.stringify({
      score,
      totalQuestions,
      userAnswers,
    }));
    
    // Show success toast
    toast.success(`Quiz completed! Your score: ${score}/${totalQuestions}`, {
      position: "top-center",
    });
    
    setShowResults(true);
  };

  const handleViewResults = () => {
    navigate('/thankyou');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-retro-accent animate-spin" />
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isCurrentQuestionAnswered = userAnswers[currentQuestion.id] !== undefined;
  const allQuestionsAnswered = quizQuestions.every(q => userAnswers[q.id] !== undefined);

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="page-container pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <span className="inline-block bg-retro-accent/20 text-white font-code text-sm px-3 py-1 rounded-md mb-4 border border-retro-accent/30">
              STEP 2 OF 2
            </span>
            
            <h1 className="text-4xl font-display font-bold mb-4">
              Knowledge <span className="text-retro-accent">Quiz</span>
            </h1>
            
            <p className="text-white/70 mb-6">
              Hi {userData?.firstName}, let's see what you already know about coding and robotics!
              Don't worry if you don't know all the answers - this helps us tailor the club activities.
            </p>
            
            <div className="w-full bg-retro-light/10 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-retro-accent"
                initial={{ width: `${(currentQuestionIndex / quizQuestions.length) * 100}%` }}
                animate={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-white/60 text-sm mt-2">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </p>
          </div>

          {showResults ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 rounded-lg text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-retro-accent/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-retro-accent" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2 font-display">Quiz Complete!</h2>
              
              <p className="text-white/70 mb-6">
                You've answered all the questions. Let's see how well you did!
              </p>
              
              <button
                onClick={handleViewResults}
                className="retro-button"
              >
                View Results
              </button>
            </motion.div>
          ) : (
            <>
              <QuizQuestion
                question={currentQuestion}
                onAnswer={handleAnswer}
                showResult={false}
                userAnswer={userAnswers[currentQuestion.id] !== undefined ? userAnswers[currentQuestion.id] : null}
              />
              
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                    currentQuestionIndex === 0
                      ? 'text-white/30 cursor-not-allowed'
                      : 'text-white/70 hover:text-retro-accent hover:bg-retro-light/5'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                
                {currentQuestionIndex === quizQuestions.length - 1 ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={!allQuestionsAnswered}
                    className={`retro-button flex items-center ${
                      !allQuestionsAnswered ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    disabled={!isCurrentQuestionAnswered}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                      !isCurrentQuestionAnswered
                        ? 'bg-retro-accent/30 text-white/50 cursor-not-allowed'
                        : 'bg-retro-accent text-retro-dark font-bold hover:brightness-110'
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="mt-8 flex flex-wrap gap-2 justify-center">
                {quizQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-xs transition-all ${
                      index === currentQuestionIndex
                        ? 'bg-retro-accent text-retro-dark'
                        : userAnswers[quizQuestions[index].id] !== undefined
                        ? 'bg-retro-light/20 text-white'
                        : 'bg-retro-light/5 text-white/50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Quiz;
