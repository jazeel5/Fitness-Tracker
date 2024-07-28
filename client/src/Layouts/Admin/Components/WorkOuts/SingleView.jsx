import { Box, Paper } from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});
export default function SingleView({ data }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(parseInt(data?.difficulty));
  }, [data]);

  return (
    <Box>
      <Box
        sx={{
          //   backgroundColor: "yellow",
          //   width: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "column", sm: "column" },
        }}
      >
        <Box
          elevation={0}
          sx={{
            // width: "100%",
            height: { xs: "auto", sm: "60vh" },
            // p: 1,
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${data?.yLink}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </Box>
        <Box>
          <TableContainer component={Paper} elevation={0}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell colSpan={3}>{data?.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Gender</TableCell>
                  <TableCell>{data?.gender}</TableCell>
                  <TableCell>Burn Estimate</TableCell>
                  <TableCell>{data?.burnEstimate} Calories</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Difficulty</TableCell>
                  <TableCell>
                    <StyledRating
                      readOnly
                      name="customized-color"
                      defaultValue={value}
                      getLabelText={(value) =>
                        `${value} Heart${value !== 1 ? "s" : ""}`
                      }
                      // precision={0.5}
                      icon={
                        <WhatshotIcon
                          sx={{ fontSize: { xs: ".8rem", sm: "1rem" } }}
                        />
                      }
                      emptyIcon={
                        <WhatshotOutlinedIcon
                          sx={{ fontSize: { xs: ".8rem", sm: "1rem" } }}
                        />
                      }
                    />
                  </TableCell>
                  <TableCell>Target Muscle</TableCell>
                  <TableCell>{data?.mainMuscle} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Equipments</TableCell>
                  <TableCell>{data?.equipment}</TableCell>
                  <TableCell>Posted On</TableCell>
                  <TableCell>
                    {moment(data?.createdAt).format("DD-MM-YYYY")}{" "}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Warp Up</TableCell>
                  <TableCell colSpan={3}>{data?.warmUps}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Muscle Focus</TableCell>
                  <TableCell colSpan={3}>{data?.muscleFocus}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Training Type</TableCell>
                  <TableCell colSpan={3}>{data?.trainingType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell colSpan={3}>{data?.description1}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Second Description</TableCell>
                  <TableCell colSpan={3}>{data?.description2}</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
