import { Box } from "@mui/material";
import React from "react";
import AdminBreadcrumbs from "../Components/Breadcrumbs";
import ClientsTable from "../Components/Clients/ClientsTable";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";
import ClientsCard from "../Components/Clients/ClientsCard";

export default function Clients() {
  const { getAllCustomers, customers } = useContext(AdminContext);
  useEffect(() => {
    getAllCustomers();
  }, []);
  // console.log(customers);
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <AdminBreadcrumbs
          title="Dashboard"
          second={true}
          secondTitle="Clients"
          third={false}
          thirdTitle=""
        />
      </Box>
      <Box>
        <ClientsCard data={customers} />
      </Box>
    </Box>
  );
}
