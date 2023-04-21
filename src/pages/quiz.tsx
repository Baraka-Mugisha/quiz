import { Grid, Typography } from "@mui/material";
import QuestionComponent from "../components/question";
import "./quiz.css";
import { useState, useContext, useEffect } from "react";
import { QuizContext } from "../Context";
import formatTime from "../utils/formatTime";

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

  const [remainingTime, setRemainingTime] = useState(60);

  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestion(questions[slide]);
    }
  }, [questions, slide]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setFinished(true);
    }

    return () => clearInterval(interval);
  }, [remainingTime]);

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
    setRemainingTime(60);
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

  const minutes = Math.floor(remainingTime / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (remainingTime % 60).toString().padStart(2, "0");
  const remainingTimeFormatted = `${minutes}:${seconds}s`;

  return (
    <Grid className="text-center">
      <Grid className="d-flex space-between">
        <Typography variant="h6">Time remaining</Typography>
        <Typography variant="h6">{formatTime(remainingTime)}</Typography>
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
