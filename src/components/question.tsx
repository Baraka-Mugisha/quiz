import { Typography, Button } from "@mui/material";
import Options from "./options";
import React, { useEffect, useState } from "react";

interface Option {
  id: string;
  value: string;
  label: string;
}

interface QuizProps {
  question: string;
  options: Array<Option>;
  correctAnswer: string;
  goToNext: (isCorrect: boolean) => void;
  onOptionSelect: (selectedOption: string) => void; // add this line
}

const QuestionComponent = ({
  question,
  options,
  correctAnswer,
  goToNext,
  onOptionSelect,
}: QuizProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const handleAnswer = () => {
    const isCorrect = selectedOption === correctAnswer;
    setIsAnswered(true);
    goToNext(isCorrect);
  };

  useEffect(() => {
    setSelectedOption("");
  }, [question]);

  return (
    <div className="m-auto w-96">
      <Typography variant="h5">{question}</Typography>
      <Options
        className="text-center m-auto"
        options={options}
        selectedOption={selectedOption}
        onChange={(value: string) => {
          setSelectedOption(value);
          onOptionSelect(value);
        }}
        isAnswered={isAnswered}
        correctAnswer={correctAnswer}
      />
      <Button
        className={`my-button ${!selectedOption && "disabled-btn"}`}
        disabled={!selectedOption}
        variant="text"
        onClick={handleAnswer}
      >
        {"Next"}
      </Button>
    </div>
  );
};

export default QuestionComponent;
