import React, { useState } from 'react';
import { Paper, TextField, Select, MenuItem, FormControl, InputLabel, Button, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

function ImageUpload({ onChange, value }) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
                border: '1px solid #ccc', // Add an outline border
                borderRadius: '4px', // Add rounded corners
                padding: '8px', // Add padding
            }}
        >
            <InputLabel style={{ marginRight: '16px' }}>Select Vendor Images</InputLabel>
            <input
                type="file"
                accept="image/*" // Allow only image files
                onChange={onChange}
                style={{ display: 'none', marginRight: '16px' }}
                id="image-upload-input"
            />
            <label htmlFor="image-upload-input">
                <Button variant="outlined" component="span">
                    Upload
                </Button>
            </label>
            <div style={{ marginLeft: '16px' }}>{value}</div>
        </div>
    );
}



function Step1({ handleNext }) {
    const { handleSubmit, control, formState: { errors }, setValue, getValues } = useForm();
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
        years.push(year);
    }



    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {

            setValue('image', file.name);
        } else {
            setValue('image', '');
        }
    };

    const onSubmit = (data) => {
        console.log(data);
        handleNext();
    };


    return (
        <Paper elevation={3} style={{ padding: '16px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Venue name is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Venue Name"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            style={{ marginBottom: '16px' }}
                        />
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: ' Venue Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label=" Venue Email"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            style={{ marginBottom: '16px' }}
                        />
                    )}
                />

                <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Venue Address is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Venue Address"
                            fullWidth
                            error={!!errors.address}
                            helperText={errors.address?.message}
                            style={{ marginBottom: '16px' }}
                        />
                    )}
                />

                <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: ' Venue Phone number is required',
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: 'Phone number should be 10 digits long and contain only numbers',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label=" Venue Phone Number"
                            fullWidth
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                            style={{ marginBottom: '16px' }}
                        />
                    )}
                />

                <Controller
                    name="venueType"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <FormControl fullWidth style={{ marginBottom: '16px' }}>
                            {!field.value && <InputLabel>Venue Type</InputLabel>}
                            <Select
                                {...field}
                                id="venue-type"
                                value={field.value}
                            >
                                <MenuItem value="Type1">Type 1</MenuItem>
                                <MenuItem value="Type2">Type 2</MenuItem>
                                <MenuItem value="Type3">Type 3</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name="image"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <ImageUpload onChange={(e) => { field.onChange(e); handleImageUpload(e); }} value={getValues('image')} />
                    )}
                />


                <Controller
                    name="yearOfEstablishment"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Year of Establishment is required' }}
                    render={({ field }) => (
                        <FormControl fullWidth style={{ marginBottom: '16px' }}>
                            {!field.value && <InputLabel>Year Of Establishment</InputLabel>}
                            <Select
                                {...field}
                                value={field.value}
                                onChange={(e) => field.onChange(e)}
                            >
                                {years.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />

                <FormControl component="fieldset" style={{ display: 'flex' }}>
                    <Typography variant="h6">Ownership Type</Typography>
                    <FormGroup >
                        <Controller
                            name="ownershipType.private"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={<Checkbox {...field} />}
                                    label="Private"
                                />
                            )}
                        />
                        <Controller
                            name="ownershipType.governmentOwned"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={<Checkbox {...field} />}
                                    label="Government-Owned"
                                />
                            )}
                        />
                        <Controller
                            name="ownershipType.nonProfit"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={<Checkbox {...field} />}
                                    label="Non-profit"
                                />
                            )}
                        />
                        <Controller
                            name="ownershipType.public"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={<Checkbox {...field} />}
                                    label="Public"
                                />
                            )}
                        />
                    </FormGroup>
                </FormControl>

                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    rules={{
                        validate: (value) => {
                            const wordCount = value.split(/\s+/).length;
                            return wordCount <= 100 || 'Description must be less than or equal to 100 words.';
                        },
                    }}
                    render={({ field }) => (
                        <div>
                            <InputLabel>Description of the Venue</InputLabel>
                            <TextField
                                {...field}
                                fullWidth
                                multiline
                                rows={4}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                style={{ marginBottom: '16px' }}
                            />
                        </div>
                    )}
                />

                <div style={{ textAlign: 'center' }}>
                    <Typography variant="h5" style={{ marginBottom: '16px' }}>
                        Owner/Manager Details
                    </Typography>

                </div>

                <Controller
                    name="ownerManagerName"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Owner/Manager Name is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Owner/Manager Name"
                            fullWidth
                            error={!!errors.ownerManagerName}
                            helperText={errors.ownerManagerName?.message}
                            style={{ marginBottom: '16px' }}
                        />
                    )}
                />

                <Controller
                    name="ownerManagerEmail"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Owner/Manager Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Owner/Manager Email"
                            fullWidth
                            error={!!errors.ownerManagerEmail}
                            helperText={errors.ownerManagerEmail?.message}
                            style={{ marginBottom: '16px' }}
                        />
                    )}
                />

                <Controller
                    name="ownerManagerPhone"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Owner/Manager Phone number is required',
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: 'Phone number should be 10 digits long and contain only numbers',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Owner/Manager Phone Number"
                            fullWidth
                            error={!!errors.ownerManagerPhone}
                            helperText={errors.ownerManagerPhone?.message}
                            style={{ marginBottom: '16px' }}
                        />
                    )}
                />
                 
                 <Button  type={onSubmit} variant="contained" color="primary" onClick={handleNext}>
                Next
            </Button>
            </form>
        </Paper>
    );
}

export default Step1;