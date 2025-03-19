
import { QuizQuestionType } from '@/components/QuizQuestion';

export const quizQuestions: QuizQuestionType[] = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Machine Learning",
      "Hyper Transfer Markup Language", 
      "Home Tool Markup Language"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Which of these is not a programming language?",
    options: ["Python", "Java", "Bootstrap", "JavaScript"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What are the main components of a computer?",
    options: [
      "CPU, Memory, Storage, Input/Output devices",
      "Screen, Keyboard, CPU, Mouse",
      "Motherboard, Windows, Chrome, Antivirus",
      "RAM, Display, Microprocessor, Software"
    ],
    correctAnswer: 0
  },
  {
    id: 4,
    question: "What is the function of a microcontroller in a robot?",
    options: [
      "To provide power to the robot",
      "To act as the robot's brain and control its functions",
      "To connect the robot to the internet",
      "To serve as a physical support structure"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "What does the 'for loop' do in programming?",
    options: [
      "Connects to the internet",
      "Repeats a specific block of code a certain number of times",
      "Creates a user interface",
      "Deletes unwanted files"
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "What is the main purpose of the Scratch programming language?",
    options: [
      "To create professional websites",
      "To teach beginners programming concepts through visual blocks",
      "To program industrial robots",
      "To develop mobile applications"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What does a sensor do in a robot?",
    options: [
      "Provides power to the robot",
      "Controls the motors",
      "Collects information about the environment",
      "Stores the programming code"
    ],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "What is an algorithm?",
    options: [
      "A type of robot",
      "A programming language",
      "A step-by-step procedure to solve a problem",
      "A computer hardware component"
    ],
    correctAnswer: 2
  },
  {
    id: 9,
    question: "What is the MicroBit primarily used for?",
    options: [
      "Playing video games",
      "Educational programming and basic electronics projects",
      "Professional software development",
      "Running home security systems"
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "What does 'debugging' mean in programming?",
    options: [
      "Creating a new program",
      "Finding and fixing errors in code",
      "Removing viruses from a computer",
      "Adding more features to a program"
    ],
    correctAnswer: 1
  }
];

export const calculateScore = (userAnswers: Record<number, number>): number => {
  let score = 0;
  
  quizQuestions.forEach(question => {
    if (userAnswers[question.id] === question.correctAnswer) {
      score++;
    }
  });
  
  return score;
};

export const getPerformanceMessage = (score: number): string => {
  const total = quizQuestions.length;
  const percentage = (score / total) * 100;
  
  if (percentage >= 80) {
    return "Excellent! You have a strong foundation in coding and robotics concepts.";
  } else if (percentage >= 60) {
    return "Good job! You have solid knowledge of coding and robotics basics.";
  } else if (percentage >= 40) {
    return "Not bad! You have some understanding of coding and robotics.";
  } else {
    return "You're at the beginning of your journey. Don't worry, you'll learn a lot in the club!";
  }
};
