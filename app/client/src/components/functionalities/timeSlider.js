import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import "./styles.css";

function valueLabelFormat(value) {
    return `${value}`;
  }
  
export default function TimeSlider({setTime}) {
  const [value, setValue] = useState(200);

  // updates map when slider is changed
  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
      setTime(newValue);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
     <p className="filter-components">Time: {value} minutes</p>
      <Slider
      // slider attributes
        value={value}
        min={0}
        step={1}
        max={200}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
  