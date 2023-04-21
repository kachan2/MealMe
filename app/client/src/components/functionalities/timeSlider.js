import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valueLabelFormat(value) {
    return `${value}`;
  }
  
export default function TimeSlider({setTime}) {
  const [value, setValue] = useState(0);

  // updates map when slider is changed
  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
      setTime(newValue);
    }
  };

  return (
    <Box sx={{ width: 150 }}>
      Time: {value} minutes
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
  