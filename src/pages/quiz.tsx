import { Grid, Typography, Button } from "@mui/material";
import QuestionComponent from "../components/question";
import "./quiz.css";
import { useState, useContext, useEffect } from "react";
import { QuizContext } from "../Context";
import formatTime from "../utils/formatTime";
import Spacer from "../components/spacer";

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

  const [remainingTime, setRemainingTime] = useState(3600);

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
      <Grid className="text-center pt-32">
        <Typography variant="h5">
          You have finished the quiz! Your score is {score} out of{" "}
          {questions.length}.
        </Typography>
        <Spacer vertical={30} />
        <Button className={`my-button`} variant="text" onClick={handleRestart}>
          {"Restart"}
        </Button>
      </Grid>
    );
  }

  const minutes = Math.floor(remainingTime / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (remainingTime % 60).toString().padStart(2, "0");
  const remainingTimeFormatted = `${minutes}:${seconds}s`;

  console.log(slide);
  return (
    <Grid className="pt-16 text-center">
      <div
        className="flex space-between flex-col w-min m-auto mb-12"
        style={{ gap: "1rem" }}
      >
        <div className="timer flex justify-around">
          <Typography variant="h6">Time remaining</Typography>
          <Typography
            variant="h6"
            color={(remainingTime < 30 && "#DC1B1B") || "#6BE4FF"}
          >
            {formatTime(remainingTime)}
          </Typography>
        </div>

        <div
          className="justify-center items-center flex mb-9"
          style={{ gap: "2rem" }}
        >
          <span>{questions.findIndex((v, i) => i === slide)}</span>
          <div className="flex" style={{ gap: "1rem" }}>
            {[...Array(5).keys()].map((v, i) => (
              <span
                style={{
                  width: "70px",
                  height: "6px",
                  background:
                    (slide - 1 > i * Math.ceil(questions.length / 5) &&
                      "#6BE4FF") ||
                    "#D9D9D9",
                  borderRadius: "8px",
                  display: "block",
                }}
              ></span>
            ))}
          </div>
          <span>{questions?.length! ?? 0}</span>
        </div>
      </div>
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
