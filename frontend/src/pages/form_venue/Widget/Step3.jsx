import React, { useState } from 'react';
import { Paper, TextField, FormControl, InputLabel, Typography, Button, RadioGroup, FormControlLabel, RadioFormGroup, Checkbox, FormGroup, Radio } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

function Step3({ handleNext, handleBack }) {
    const { handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        handleNext();
    };


    const technicalEquipmentOptions = [
        'Sound System',
        'Lighting',
        'Projectors',
        'Screens',
        'Microphones',
        'DJ Equipment',
        'Video Recording Equipment',
    ];

    const [parkingFacilitiesValue, setParkingFacilitiesValue] = useState("");
    const [showParkingCapacityField, setShowParkingCapacityField] = useState(false);

    const handleParkingFacilitiesChange = (event) => {
        setParkingFacilitiesValue(event.target.value);

        // Show the Parking Capacity field only when "Yes" is chosen
        setShowParkingCapacityField(event.target.value === 'Yes');
    };

    return (
        <Paper elevation={3} style={{ padding: '16px' }}>

            <form onSubmit={handleSubmit(onSubmit)}>



                <Controller
                    name="venueTotalArea"
                    control={control}
                    defaultValue=""
                    rules={{
                        pattern: {
                            value: /^[0-9]*\.?[0-9]*$/, // Regular expression for decimal numbers
                            message: 'Enter a valid decimal number',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Venue Total Area"
                            fullWidth
                            style={{ marginBottom: '16px' }}
                            error={!!errors.venueTotalArea}
                            helperText={errors.venueTotalArea?.message}
                        />
                    )}
                />

                <Controller
                    name="indoorArea"
                    control={control}
                    defaultValue=""
                    rules={{
                        pattern: {
                            value: /^[0-9]*\.?[0-9]*$/, // Regular expression for decimal numbers
                            message: 'Enter a valid decimal number',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Indoor Area"
                            fullWidth
                            style={{ marginBottom: '16px' }}
                            error={!!errors.indoorArea}
                            helperText={errors.indoorArea?.message}
                        />
                    )}
                />

                <Controller
                    name="outdoorArea"
                    control={control}
                    defaultValue=""
                    rules={{
                        pattern: {
                            value: /^[0-9]*\.?[0-9]*$/, // Regular expression for decimal numbers
                            message: 'Enter a valid decimal number',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Outdoor Area"
                            fullWidth
                            style={{ marginBottom: '16px' }}
                            error={!!errors.outdoorArea}
                            helperText={errors.outdoorArea?.message}
                        />
                    )}
                />

                <Controller
                    name="seatingCapacity"
                    control={control}
                    defaultValue=""
                    rules={{
                        pattern: {
                            value: /^[0-9]*\.?[0-9]*$/, // Regular expression for decimal numbers
                            message: 'Enter a valid decimal number',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Seating Capacity"
                            fullWidth
                            style={{ marginBottom: '16px' }}
                            error={!!errors.seatingCapacity}
                            helperText={errors.seatingCapacity?.message}
                        />
                    )}
                />

                <Controller
                    name="standingCapacity"
                    control={control}
                    defaultValue=""
                    rules={{
                        pattern: {
                            value: /^[0-9]*\.?[0-9]*$/,
                            message: 'Enter a valid number',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Standing Capacity"
                            fullWidth
                            style={{ marginBottom: '16px' }}
                            error={!!errors.standingCapacity}
                            helperText={errors.standingCapacity?.message}
                        />
                    )}
                />

                <Controller
                    name="numberOfRoomsSpaces"
                    control={control}
                    defaultValue=""
                    rules={{
                        pattern: {
                            value: /^[0-9]+$/, // Regular expression for integers
                            message: 'Enter a valid integer',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Number of Rooms/Spaces"
                            fullWidth
                            style={{ marginBottom: '16px' }}
                            error={!!errors.numberOfRoomsSpaces}
                            helperText={errors.numberOfRoomsSpaces?.message}
                        />
                    )}
                />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControl component="fieldset">
                        <Typography variant="subtitle1">Stage Availability</Typography>
                        <Controller
                            name="stageAvailability"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <RadioGroup {...field}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <FormControlLabel
                                            value="Yes"
                                            control={<Radio />}
                                            label={<Typography variant="body1">Yes</Typography>}
                                        />
                                        <FormControlLabel
                                            value="No"
                                            control={<Radio />}
                                            label={<Typography variant="body1">No</Typography>}
                                        />
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControl component="fieldset">
                        <Typography variant="subtitle1">Podium Availability</Typography>
                        <Controller
                            name="podiumAvailability"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <RadioGroup {...field}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <FormControlLabel
                                            value="Yes"
                                            control={<Radio />}
                                            label={<Typography variant="body1">Yes</Typography>}
                                        />
                                        <FormControlLabel
                                            value="No"
                                            control={<Radio />}
                                            label={<Typography variant="body1">No</Typography>}
                                        />
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                </div>

                <FormControl component="fieldset" style={{ display: 'flex' }}>
                    <Typography variant="h6">Technical Equipment</Typography>
                    <FormGroup>
                        {technicalEquipmentOptions.map((option) => (
                            <Controller
                                key={option}
                                name={`technicalEquipment.${option}`}
                                control={control}
                                defaultValue={false}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox {...field} />}
                                        label={option}
                                    />
                                )}
                            />
                        ))}
                    </FormGroup>
                </FormControl>



                <FormControl component="fieldset" style={{ marginBottom: '16px' }}>
                    <Typography variant="subtitle1">Parking Facilities</Typography>
                    <Controller
                        name="parkingFacilities"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <RadioGroup {...field} onChange={handleParkingFacilitiesChange}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                </div>
                            </RadioGroup>
                        )}
                    />
                </FormControl>

                {showParkingCapacityField && (
                    <Controller
                        name="parkingCapacity"
                        control={control}
                        defaultValue=""
                        rules={{
                            validate: (value) => /^\d+$/.test(value) || 'Add a Valid Number',
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Parking Capacity"
                                fullWidth
                                error={!!errors.parkingCapacity}
                                helperText={errors.parkingCapacity?.message}
                                style={{ marginBottom: '16px' }}
                            />
                        )}
                    />
                )}

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControl component="fieldset">
                        <Typography variant="subtitle1">Valet Parking Availability</Typography>
                        <Controller
                            name="valetParkingAvailability"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <RadioGroup {...field}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <FormControlLabel
                                            value="Yes"
                                            control={<Radio />}
                                            label={<Typography variant="body1">Yes</Typography>}
                                        />
                                        <FormControlLabel
                                            value="No"
                                            control={<Radio />}
                                            label={<Typography variant="body1">No</Typography>}
                                        />
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                </div>
                <Controller
                    name="proximityToPublicTransport"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Proximity to Public Transport"
                            fullWidth
                            style={{ marginBottom: '16px' }}
                        />
                    )}
                />

                <Controller
                    name="proximityToMajorRoads"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Proximity to Major Roads"
                            fullWidth
                            style={{ marginBottom: '16px' }}
                        />
                    )}
                />

                <Controller
                    name="proximityToAirport"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Proximity to Airport"
                            fullWidth
                            style={{ marginBottom: '16px' }}
                        />
                    )}
                />

                <Controller
                    name="surroundingEnvironment"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Surrounding Environment"
                            fullWidth
                            style={{ marginBottom: '16px' }}
                        />
                    )}
                />

                <Controller
                    name="noiseRestrictions"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Noise Restrictions"
                            fullWidth
                            style={{ marginBottom: '16px' }}
                        />
                    )}
                />

                <Controller
                    name="ceilingHeight"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Ceiling Height"
                            fullWidth
                            style={{ marginBottom: '16px' }}
                        />
                    )}
                />







                <div style={{ display: 'flex', marginTop: '16px' }}>
                    <Button variant="contained" onClick={handleBack} style={{ marginLeft: '8px' }}>
                        Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={onSubmit} style={{ marginLeft: '8px' }}>
                        Save
                    </Button>
                    <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '8px' }}>
                        Next
                    </Button>
                </div>
            </form>
        </Paper>
    );
}

export default Step3;