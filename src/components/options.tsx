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
      className={className+ " w-max"}
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
                "& .MuiSvgIcon-root": {
                  fontSize: "32px",
                },
                "&.Mui-checked .MuiSvgIcon-root": {
                  color: "#6BE4FF", // Change the color of the radio icon when checked
                },
              }}
            />
          }
          sx={{
            gap: "20px",
            width: 'fit-content',
            "& .MuiFormControlLabel-label": {
              fontSize: "24px",
            },
          }}
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
};

export default Options;
