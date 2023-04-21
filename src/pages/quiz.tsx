import { Grid, Typography } from "@mui/material";
import QuestionComponent from "../components/question";
import "./quiz.css";
import { useState, useContext, useEffect } from "react";
import { QuizContext } from "../Context";

interface QuizQuestion {
  id: number;
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
}

const Quiz = () => {
  const { questions, isLoading, error } = useContext(QuizContext);
  const [slide, setSlide] = useState<number>(
    parseInt(localStorage.getItem("currentSlide") || "0", 10)
  );
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>();
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestion(questions[slide]);
    }
  }, [questions, slide]);

  const handleGoToNext = () => {
    if (slide < questions.length - 1) {
      setSlide((prevSlide) => prevSlide + 1);
    } else {
      setFinished(true);
    }
  };

  const handleOptionSelect = (selectedOption: string) => {
    if (selectedOption === currentQuestion?.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleRestart = () => {
    setSlide(0);
    setScore(0);
    setFinished(false);
  };

  if (isLoading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h5">Error: {error}</Typography>;
  }

  if (finished) {
    return (
      <Grid className="text-center">
        <Typography variant="h5">
          You have finished the quiz! Your score is {score} out of{" "}
          {questions.length}.
        </Typography>
        <button onClick={handleRestart}>Restart</button>
      </Grid>
    );
  }

  return (
    <Grid className="text-center">
      <Grid className="d-flex space-between">
        <Typography variant="h6">Time remaining</Typography>
        <Typography variant="h6">10:23s</Typography>
      </Grid>
      {currentQuestion && (
        <QuestionComponent
          question={currentQuestion.question}
          options={[
            ...currentQuestion.incorrectAnswers.map((answer) => ({
              label: answer,
              id: answer,
              value: answer,
            })),
            {
              label: currentQuestion.correctAnswer,
              id: currentQuestion.correctAnswer,
              value: currentQuestion.correctAnswer,
            },
          ]}
          onOptionSelect={handleOptionSelect}
          goToNext={handleGoToNext}
          correctAnswer={currentQuestion.correctAnswer}
        />
      )}
    </Grid>
  );
};

export default Quiz;
