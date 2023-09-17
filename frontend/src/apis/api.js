export async function fetchCities() {
    const response = await fetch('http://127.0.0.1:8000/api/cities/');
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    const data = await response.json();
    return data;
}
  
export async function fetchVendorTypes() {
    const response = await fetch('http://127.0.0.1:8000/api/vendor-types/');
    if (!response.ok) {
      throw new Error('Failed to fetch vendor types');
    }
    const data = await response.json();
    return data;
}
  


async function fetchVendorData() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/vendors/');
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch vendor data');
    }
  } catch (error) {
    console.error('Error fetching vendor data:', error);
    throw error;
  }
}

export { fetchVendorData };

// Function to delete a vendor by ID
export async function deleteVendorById(vendorId) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/vendors/${vendorId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // Optionally, you can return a success message or status code
      return 'Vendor deleted successfully';
    } else {
      throw new Error('Failed to delete vendor');
    }
  } catch (error) {
    console.error('Error deleting vendor:', error);
    throw error;
  }
}
