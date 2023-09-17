import React from 'react';
import MyAppBar from '../../components/from_navbar';
import MyVenueForm from './Widget/form_venue_stepper';
const FromVenue = () => {
  return (
    <div>
       <MyAppBar title="Add Venue" />
      < MyVenueForm/>
    </div>
  )
}

export default FromVenue;