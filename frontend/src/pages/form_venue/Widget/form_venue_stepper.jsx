import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Paper } from '@mui/material';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';




function MyVenueForm() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Basic Information', 'Social Media', 'Venue Facilities', 'Venue Services', 'Venue Booking Services', 'Past Event Information', 'Legal and Compliance Information', 'Preferred Vendors', 'Confirm'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    
    alert('Venue submitted successfully!');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography variant="h5">Data  Successfully!</Typography>
          </div>
        ) : (
          <div>
            {/* Render different components based on the active step */}
            {activeStep === 0 && <Step1 handleNext={handleNext} />}
            {activeStep === 1 && <Step2 handleNext={handleNext} handleBack={handleBack} />}
            {activeStep === 2 && <Step3 handleNext={handleNext} handleBack={handleBack} />}

            {activeStep !== 0 && activeStep !== 1 && activeStep !== 2 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ marginRight: '16px' }}
                  >
                    Back
                  </Button>
                  <Button variant="contained" onClick={handleFinish}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}



          </div>
        )}
      </div>
    </div>
  );
}

export default MyVenueForm;