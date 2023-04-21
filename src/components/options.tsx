import React from "react";
import { Radio, FormControlLabel, RadioGroup } from "@mui/material";

interface Option {
  id: string;
  value: string;
  label: string;
}

interface Props {
  options: Array<Option>;
  selectedOption?: string;
  onChange?: (value: string) => void;
  className?: string;
  isAnswered?: boolean;
  correctAnswer?: string;
}

const Options = ({
  options = [],
  selectedOption = "",
  onChange = () => {},
  className = "",
}: Props) => {
  return (
    <RadioGroup
      value={selectedOption}
      className={className}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <FormControlLabel
          key={option.id}
          value={option.value}
          control={
            <Radio
              sx={{
                color: "white !important",
              }}
            />
          }
          sx={{
            fontWeight: 400,
            fontSize: "24px !important"
          }}
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
};

export default Options;
