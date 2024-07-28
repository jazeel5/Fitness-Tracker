import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  CardActionArea,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Tooltip from "@mui/material/Tooltip";
import moment from "moment";
import BlockIcon from "@mui/icons-material/Block";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";

export default function ClientsCard({ data }) {
  const { updateCustomerStatus } = useContext(AdminContext);
  const handleCustomerStatus = (id, cStatus) => {
    var status = "";
    if (cStatus == "Blocked") {
      status = "Active";
    } else {
      status = "Blocked";
    }
    updateCustomerStatus(id, status);
  };
  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        flexWrap: "wrap",
        padding: "10px",
      }}
    >
      {data?.map((item, index) => {
        const formattedDate = moment(item?.createdAt).format("DD-MM-YYYY");

        return (
          //   <Tooltip  arrow title={`${item?.name}`} placement="right">
          <Card
            key={index}
            sx={{
              minWidth: 345,
              margin: "10px",
            }}
          >
            <CardActionArea>
              <CardMedia
                sx={{ objectFit: "cover", height: "300px" }}
                image={`http://localhost:7000/uploads/customer/${item?.profile}`}
                alt="profile"
              />
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography gutterBottom variant="overline" component="div">
                    {item?.name}
                  </Typography>
                  <Typography gutterBottom variant="overline" component="div">
                    {item?.gender}
                  </Typography>
                </Box>
                <TableContainer size="small" aria-label="client details">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <LocalPhoneIcon sx={{ color: "#618ca6" }} />
                        </TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>{item?.phone}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <EmailIcon sx={{ color: "#618ca6" }} />
                        </TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>{item?.email}</TableCell>
                      </TableRow>
                      {item?.address && (
                        <TableRow>
                          <TableCell>
                            <HomeIcon sx={{ color: "#618ca6" }} />
                          </TableCell>
                          <TableCell>Address</TableCell>
                          <TableCell style={{ width: "100%" }}>
                            {item?.address}
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell>
                          <CalendarMonthIcon sx={{ color: "#618ca6" }} />
                        </TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>{item?.age}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  sx={{
                    //   backgroundColor: "red",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <Typography variant="caption">
                    Registered on {formattedDate}
                  </Typography>
                  {item?.status == "Blocked" ? (
                    <Tooltip title="Unblock" arrow>
                      <IconButton
                        onClick={() =>
                          handleCustomerStatus(item?._id, item?.status)
                        }
                      >
                        <WorkspacePremiumIcon color="success" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Block" arrow>
                      <IconButton
                        onClick={() =>
                          handleCustomerStatus(item?._id, item?.status)
                        }
                      >
                        <BlockIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </div>
  );
}
