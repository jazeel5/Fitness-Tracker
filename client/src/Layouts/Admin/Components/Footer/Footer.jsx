import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f2f2f2",
        padding: "20px",
        marginTop: "1%",
      }}
    >
      <div className="d-sm-flex justify-content-center justify-content-sm-between">
        <div className="text-muted d-block text-center text-sm-left d-sm-inline-block">
          <Typography variant="body2" color="textSecondary" component="span">
            Copyright © VFitNess.com 2024
            <br />
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
