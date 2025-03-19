
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export interface QuizQuestionType {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (questionId: number, selectedAnswer: number) => void;
  showResult: boolean;
  userAnswer: number | null;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  showResult,
  userAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(userAnswer);

  // Update selected option when userAnswer prop changes
  useEffect(() => {
    setSelectedOption(userAnswer);
  }, [userAnswer]);

  const handleOptionSelect = (optionIndex: number) => {
    // Don't allow changing answer if showing results
    if (showResult) return;
    
    setSelectedOption(optionIndex);
    onAnswer(question.id, optionIndex);
  };

  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <motion.div 
      className="glass-card p-6 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl text-white font-code font-medium mb-6">
        <span className="text-retro-accent mr-2">{question.id}.</span>
        {question.question}
      </h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.div
            key={index}
            className={`
              relative p-4 rounded-md border cursor-pointer transition-all duration-300
              ${selectedOption === index ? 'border-retro-accent' : 'border-retro-light/20'}
              ${
                showResult && index === question.correctAnswer
                  ? 'border-green-500 bg-green-500/10'
                  : showResult && selectedOption === index && selectedOption !== question.correctAnswer
                  ? 'border-red-500 bg-red-500/10'
                  : 'hover:border-retro-accent/50 hover:bg-retro-light/5'
              }
            `}
            whileHover={!showResult ? { scale: 1.02 } : {}}
            onClick={() => handleOptionSelect(index)}
          >
            <div className="flex justify-between items-center">
              <span className={`
                ${
                  showResult && index === question.correctAnswer
                    ? 'text-green-400'
                    : showResult && selectedOption === index && selectedOption !== question.correctAnswer
                    ? 'text-red-400'
                    : 'text-white'
                }
              `}>
                {option}
              </span>
              
              {showResult && index === question.correctAnswer && (
                <span className="bg-green-500/20 p-1 rounded-full">
                  <Check className="w-4 h-4 text-green-500" />
                </span>
              )}
              
              {showResult && selectedOption === index && selectedOption !== question.correctAnswer && (
                <span className="bg-red-500/20 p-1 rounded-full">
                  <X className="w-4 h-4 text-red-500" />
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuizQuestion;
