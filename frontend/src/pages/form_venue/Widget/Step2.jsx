import React from 'react';
import { TextField, Typography, Button, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

function Step2({ handleNext, handleBack, handleSave }) {
    const { handleSubmit, control } = useForm();

    const onSubmit = (data) => {
        console.log(data); // Handle the form submission data
        handleNext();
    };

    return (
        <div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} style={{ marginTop: '1px' }}>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="facebook"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Facebook"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="twitter"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Twitter"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="facebook"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Instagram"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="twitter"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Youtube"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                </Grid>
                <div style={{ marginTop: '16px' }}>
                    <Button  onClick={handleBack}>
                        Back
                    </Button>
                    <Button variant="contained" color="primary" style={{ marginLeft: '8px' }} onClick={handleSave}>
                        Save
                    </Button>
                    <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '8px' }}>
                        Next
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Step2;