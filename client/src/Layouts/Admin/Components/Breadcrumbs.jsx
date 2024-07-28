import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function AdminBreadcrumbs({
  title,
  second,
  secondTitle,
  third,
  thirdTitle,
}) {
  return (
    <Stack spacing={2} sx={{ p: 1 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link
          style={{ color: "black", textDecoration: "none" }}
          to="/admin/Dashboard"
        >
          {title}
        </Link>

        {second && (
          <Typography key="3" color="text.primary">
            {secondTitle}
          </Typography>
        )}

        {third && (
          <Typography key="3" color="text.primary">
            {thirdTitle}
          </Typography>
        )}
      </Breadcrumbs>
    </Stack>
  );
}
