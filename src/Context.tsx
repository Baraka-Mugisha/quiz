import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface QuizContextInterface {
  questions: Question[];
  isLoading: boolean;
  error: string;
}

interface Question {
  id: number;
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
}

export const QuizContext = createContext<QuizContextInterface>({
  questions: [],
  isLoading: true,
  error: "",
});

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://the-trivia-api.com/v2/questions"
        );
        setQuestions(
          response.data.map(
            ({ correctAnswer, incorrectAnswers, id, question }: any) => {
              return {
                question: question.text,
                id,
                incorrectAnswers,
                correctAnswer,
              };
            }
          )
        );
        console.log(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider value={{ questions, isLoading, error }}>
      {children}
    </QuizContext.Provider>
  );
};
