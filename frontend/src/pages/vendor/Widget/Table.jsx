import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { fetchVendorData, deleteVendorById } from "../../../apis/api";

const VendorTable = () => {
  const [editedRow, setEditedRow] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const vendorData = await fetchVendorData();
        setData(vendorData);
        console.log(vendorData);
      } catch (error) {
        // Handle error, e.g., show an error message
      }
    }

    fetchData();
  }, []);

  const handleEdit = (rowIndex) => {
    setEditedRow(rowIndex);
    // You can add your edit logic here
  };

  const handleDelete = async (rowIndex) => {
    try {
      console.log("Data array:", data); // Log the entire data array
      console.log("Row index:", rowIndex); // Log the row index
      if (data[rowIndex] && data[rowIndex]["vendor_id"]) {
        const vendorIdToDelete = data[rowIndex]["vendor_id"];
        await deleteVendorById(vendorIdToDelete);
        const updatedData = [...data];
        updatedData.splice(rowIndex, 1);
        setData(updatedData);
        console.log("Vendor deleted successfully");
      } else {
        console.error("Invalid data or vendor_id not found");
      }
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Vendor Name",
        size: 150,
      },
      {
        accessorKey: "contact_email",
        header: "Email ID",
        size: 150,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 200,
      },
      {
        accessorKey: "website",
        header: "Product",
        size: 150,
      },
      {
        accessorKey: "phone_number",
        header: "Phone No",
        size: 150,
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      editable={true}
      editedRow={editedRow}
      enableRowActions
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          <IconButton
            color="secondary"
            onClick={() => {
              table.setEditingRow(row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={async () => {
              console.log(row["original"]["vendor_id"]);
              const vendorIdToDelete = row["original"]["vendor_id"];
              await deleteVendorById(vendorIdToDelete);
              const updatedData = [...data];
              updatedData.splice(row.index, 1);
              setData(updatedData);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      positionActionsColumn="last"
    />
  );
};

export default VendorTable;
