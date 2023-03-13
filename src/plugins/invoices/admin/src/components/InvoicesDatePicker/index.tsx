/*
 *
 * HomePage
 *
 */

import React, {useState} from 'react';
import {
  Grid,
  Typography,
  Select,
  Option,
  GridItem,
  Box,
} from '@strapi/design-system';

type InvoicesDatePickerProps = {
  currentYear: number;
  setCurrentYear: (year: number) => void;
}

const InvoicesDatePicker = ({currentYear, setCurrentYear}: InvoicesDatePickerProps) => {
  const [error, toggleError] = useState();
  const [disabled, toggleDisabled] = useState();
  const years = Array.from({length: 21}, (v, k) => k + 2023 - 2);

  return (
    <Box paddingBottom={4} background={"netural100"}>
      <Grid gap={10} gridCols={2}>
        <GridItem>
          <Box paddingBottom={4}>
            <Typography paddingBottom={4}>Year</Typography>
          </Box>
          <Select placeholder="Choose Year"
                  error={error} value={currentYear}
                  onChange={setCurrentYear} disabled={disabled}>
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </GridItem>
      </Grid>
    </Box>

  );
};

export default InvoicesDatePicker;
