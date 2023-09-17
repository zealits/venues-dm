import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { fetchCities, fetchVendorTypes } from "../../../apis/api";

// Make sure to provide the correct path to the ImageUploader component

const steps = ["Vendor Details", "Addtional Details", "Confirm"];

// Custom component for image upload control
// Custom component for image upload control
function ImageUpload({ onChange, value }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "16px",
        border: "1px solid #ccc", // Add an outline border
        borderRadius: "4px", // Add rounded corners
        padding: "8px", // Add padding
      }}
    >
      <InputLabel style={{ marginRight: "16px" }}>
        Select Vendor Images
      </InputLabel>
      <input
        type="file"
        accept="image/*" // Allow only image files
        onChange={onChange}
        style={{ display: "none", marginRight: "16px" }}
        id="image-upload-input"
      />
      <label htmlFor="image-upload-input">
        <Button variant="outlined" component="span">
          Upload
        </Button>
      </label>
      <div style={{ marginLeft: "16px" }}>{value}</div>
    </div>
  );
}

function LoginForm({
  handleNext,
  cities,
  vendorTypes,
  formData,
  setFormData,
  handleCityChange,
  handleTypeChange,
  updateFormData,
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [vendorType, setVendorType] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const { name, contact_email, vendor_type, products_or_services, city, address, phone_number } =
    formData;

  const onSubmit = (data) => {
    updateFormData(data);
    console.log(data);
    handleNext();
  };

  return (
    <Paper elevation={3} style={{ padding: "16px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue={name}
          rules={{ required: "Vendor name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Vendor Name"
              fullWidth
              error={!!errors.username}
              helperText={errors.name?.message}
              style={{ marginBottom: "16px" }}
            />
          )}
        />
        <Controller
          name="contact_email"
          control={control}
          defaultValue={contact_email}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              error={!!errors.contact_email}
              helperText={errors.contact_email?.message}
            />
          )}
        />

        <FormControl
          fullWidth
          style={{ marginTop: "16px", marginBottom: "16px" }}
        >
          {vendorType ? null : <InputLabel>Vendor Type</InputLabel>}
          <Controller
            name="vendor_type"
            control={control}
            defaultValue={vendor_type}
            render={({ field }) => (
              <Select
                {...field}
                id="vendor-type"
                value={vendor_type}
                onChange={(e) => {
                  field.onChange(e);
                  handleTypeChange(e); // Call the handler to update formData
                }}
              >
                {vendorTypes.map((vendorType) => (
                  <MenuItem
                    key={vendorType.vendor_type_id}
                    value={vendorType.vendor_type_id}
                  >
                    {vendorType.type_name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Controller
          name="products_or_services"
          control={control}
          defaultValue={products_or_services}
          render={({ field }) => (
            <TextField
              {...field}
              label="Product Services"
              fullWidth
              error={!!errors.products_or_services}
              helperText={errors.products_or_services?.message}
              style={{ marginBottom: "16px" }}
            />
          )}
        />

        <FormControl fullWidth style={{ marginBottom: "16px" }}>
          {selectedCity ? null : <InputLabel>City</InputLabel>}
          <Controller
            name="city"
            control={control}
            defaultValue={city}
            render={({ field }) => (
              <Select
                {...field}
                value={city}
                onChange={(e) => {
                  field.onChange(e);
                  handleCityChange(e); // Call the handler to update formData
                }}
              >
                {cities.map((city) => (
                  <MenuItem key={city.city_id} value={city.city_id}>
                    {city.city_name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Controller
          name="address"
          control={control}
          defaultValue={address}
          rules={{ required: "Address is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
              style={{ marginBottom: "16px" }}
            />
          )}
        />

        <Controller
          name="phone_number"
          control={control}
          defaultValue={phone_number}
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message:
                "Phone number should be 10 digits long and contain only numbers",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              fullWidth
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
              style={{ marginBottom: "16px" }}
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
    </Paper>
  );
}

function AdditionalDetails({
  handleNext,
  handleBack,
  formData,
  setFormData,
  updateFormData,
  handleAvailChange,
  selectedImage,
  setSelectedImage,
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const [socialMediaData, setSocialMediaData] = useState([
    { platform: "", url: "" },
  ]);
  const {
    website,
    insurance_coverage,
    licenses_and_permits,
    availability,
    image,
    description,
    facebook_url,
    twitter_url,
    instagram_url,
    linkedin_url,
    youtube_url,
    preferred_venues
  } = formData;

  // Sample list of social media platforms
  const socialMediaPlatforms = [
    "Facebook",
    "Twitter",
    "Instagram",
    "LinkedIn",
    "YouTube",
  ];

  const onSubmit = (data) => {
    console.log(data);
    updateFormData(data);
    handleNext();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        setSelectedImage(file);
        setValue('image', file.name);
    } else {
        setValue('image', '');
        setSelectedImage(null);
    }
};


  const handleSocialMediaChange = (field, value) => {
    // Update the specific field in formData based on the field name
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const [activeStep, setActiveStep] = useState(0);

  // Sample list of preferred venues
  const preferredVenues = [
    "Venue 1",
    "Venue 2",
    "Venue 3",
    "Venue 4",
    "Venue 5",
    "Other",
  ];

  return (
    <Paper elevation={3} style={{ padding: "16px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="website"
          control={control}
          defaultValue={website}
          render={({ field }) => (
            <TextField
              {...field}
              label="Website"
              fullWidth
              error={!!errors.website}
              helperText={errors.website?.message}
              style={{ marginBottom: "16px" }}
            />
          )}
        />
        <Controller
          name="insurance_coverage"
          control={control}
          defaultValue={insurance_coverage}
          render={({ field }) => (
            <TextField
              {...field}
              label="Insurance Coverage"
              fullWidth
              error={!!errors.insurance_coverage}
              helperText={errors.insurance_coverage?.message}
              style={{ marginBottom: "16px" }}
            />
          )}
        />
        <Controller
          name="licenses_and_permits"
          control={control}
          defaultValue={licenses_and_permits}
          render={({ field }) => (
            <TextField
              {...field}
              label="Licenses and Permits"
              fullWidth
              error={!!errors.licenses_and_permits}
              helperText={errors.licenses_and_permits?.message}
              style={{ marginBottom: "16px" }}
            />
          )}
        />

        <Controller
          name="availability"
          control={control}
          defaultValue={availability}
          render={({ field }) => (
            <FormControl fullWidth style={{ marginBottom: "16px" }}>
              {!field.value && <InputLabel> Availability</InputLabel>}
              <Select
                {...field}
                id="availability"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  handleAvailChange(e); // Call the handler to update formData
                }}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false} selected>
                  No
                </MenuItem>
              </Select>
            </FormControl>
          )}
        />

<Controller
          name="preferred_venues"
          control={control}
          defaultValue={preferred_venues}
          render={({ field }) => (
            <TextField
              {...field}
              label="Preferred Venues"
              fullWidth
              error={!!errors.preferred_venues}
              helperText={errors.preferred_venues?.message}
              style={{ marginBottom: "16px" }}
            />
          )}
        />

        <Controller
          name="image"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Controller
                    name="image"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <ImageUpload onChange={(e) => { field.onChange(e); handleImageUpload(e); }} value={getValues('image')} />
                    )}
                />
          )}
        />

        <Controller
          name="facebook_url"
          control={control}
          defaultValue={facebook_url}
          render={({ field }) => (
            <TextField
              {...field}
              label="Facebook_handle"
              fullWidth
              error={!!errors.facebook_url}
              helperText={errors.facebook_url?.message}
              style={{ marginBottom: "16px" }}
            />
          )}
        />

        <Controller
          name="instagram_url"
          control={control}
          defaultValue={instagram_url}
          render={({ field }) => (
            <TextField
              {...field}
              label="Instagram_handle"
              fullWidth
              error={!!errors.instagram_url}
              helperText={errors.instagram_url_url?.message}
              style={{ marginBottom: "16px" }}
            />
          )}
        />

        <Controller
          name="twitter_url"
          control={control}
          defaultValue={twitter_url}
          render={({ field }) => (
            <TextField
              {...field}
              label="Twitter_handle"
              fullWidth
              error={!!errors.twitter_url}
              helperText={errors.twitter_url?.message}
              style={{ marginBottom: "16px" }}
            />
          )}
        />

        <Controller
          name="linkedin_url"
          control={control}
          defaultValue={linkedin_url}
          render={({ field }) => (
            <TextField
              {...field}
              label="Linkedin_handle"
              fullWidth
              error={!!errors.linkedin_url}
              helperText={errors.linkedin_url?.message}
              style={{ marginBottom: "16px" }}
            />
          )}
        />

        <Controller
          name="youtube_url"
          control={control}
          defaultValue={youtube_url}
          render={({ field }) => (
            <TextField
              {...field}
              label="Youtube_handle"
              fullWidth
              error={!!errors.youtube_url}
              helperText={errors.youtube_url?.message}
              style={{ marginBottom: "16px" }}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue={description}
          rules={{
            validate: (value) => {
              const wordCount = value.split(/\s+/).length;
              return (
                wordCount <= 100 ||
                "Description must be less than or equal to 100 words."
              );
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
              style={{ marginBottom: "16px" }}
            />
          )}
        />

        <div>
          <Button disabled={activeStep === 1} onClick={() => handleBack()}>
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </div>
      </form>
    </Paper>
  );
}

function MyVendorForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [cities, setCities] = useState([]);
  const [vendorTypes, setVendorTypes] = useState([]);
  const [vendorCreated, setVendorCreated] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contact_email: "",
    vendor_type: 0,
    products_or_services: "",
    address: "",
    city: 0,
    website: "",
    phone_number: "",
    description: "",
    availability: false,
    insurance_coverage: "",
    licenses_and_permits: "",
    preferred_venues: "",
    facebook_url: "",
    instagram_url: "",
    twitter_url: "",
    linkedin_url: "",
    youtube_url: "",
  });
  // Other form state and functions...

  useEffect(() => {
    // Fetch Cities
    fetchCities()
      .then((data) => setCities(data))
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });

    // Fetch Vendor Types
    fetchVendorTypes()
      .then((data) => setVendorTypes(data))
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  }, []);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      // If it's the last step, send the formData to your API
      try {
        const vendor_data={
            name:formData.name,
            contact_email:formData.contact_email,
            vendor_type:formData.vendor_type,
            products_or_services:formData.products_or_services,
            address:formData.address,
            city:formData.city,
            website:formData.website,
            phone_number:formData.phone_number,
            description:formData.description,
            availability:formData.availability,
            insurance_coverage:formData.insurance_coverage,
            licenses_and_permits:formData.licenses_and_permits,
            preferred_venues:formData.preferred_venues,
            facebook_url:formData.facebook_url,
            instagram_url:formData.instagram_url,
            twitter_url:formData.twitter_url,
            linkedin_url:formData.linkedin_url,
            youtube_url:formData.youtube_url
        };
        console.log(vendor_data);
        const response = await fetch('http://127.0.0.1:8000/api/vendors/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify(vendor_data),
        });
        if (response.ok) {
          const vendorData = await response.json();
          // Vendor created successfully
          setVendorCreated(true);
          uploadImage(vendorData.vendor_id);
  
          // After creating the vendor, you can choose to redirect or perform other actions
          // Here, I'm showing a success message
          console.log('Vendor created successfully');
          navigate('/vendor');
        } else {
          // Handle the error
          console.error('Vendor creation failed');
        }
      } catch (error) {
        console.error('Error creating vendor:', error);

      }

    } else {
      // If it's not the last step, just increment the step
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };


  const uploadImage = async (vendorId) => {
    // Use FormData to construct the image upload request
    const formData1 = new FormData();
    formData1.append('vendor', vendorId); // Include the vendor_id in the request
    formData1.append('photo', selectedImage); // Use 'photo' as the field name
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/vendor-photos/', {
        method: 'POST',
        body: formData1,
      });
      if (response.ok) {
        // Image uploaded successfully
        console.log('Image uploaded successfully');
      } else {
        // Handle the error
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateFormData = (stepData) => {
    // Update the formData with the current step's data
    setFormData((prevData) => ({
      ...prevData,
      ...stepData, // Merge the current step's data into formData
    }));
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      city: selectedCity, // Update the city property in formData
    }));
  };
  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      vendor_type: selectedType, // Update the city property in formData
    }));
  };

  const handleAvailChange = (e) => {
    const selectedAvail = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      availability: selectedAvail, // Update the city property in formData
    }));
  };



  return (
    <div style={{ marginTop: "20px" }}>
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
            <Typography style={{ padding: "16px" }}>
              All Vendor SucessFully
            </Typography>
          </div>
        ) : (
          <div>
            {activeStep === 0 && (
              <LoginForm
                handleNext={handleNext}
                cities={cities} // Pass cities to your form components
                vendorTypes={vendorTypes} // Pass vendorTypes to your form components
                formData={formData}
                setFormData={setFormData}
                updateFormData={updateFormData}
                handleCityChange={handleCityChange}
                handleTypeChange={handleTypeChange}
              />
            )}
            {activeStep === 1 && (
              <AdditionalDetails
                handleNext={handleNext}
                handleBack={handleBack}
                formData={formData}
                setFormData={setFormData}
                updateFormData={updateFormData}
                handleAvailChange={handleAvailChange}
                handleImageChange={handleImageChange}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            )}
            {activeStep !== 0 && activeStep !== 1 && (
              <div>
                <Typography>{steps[activeStep]}</Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 2 }}
                  >
                    Back
                  </Button>
                  <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
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

export default MyVendorForm;
