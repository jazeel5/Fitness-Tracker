import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useContext } from "react";
import { CstContext } from "../../Context/CustomerContext";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ff000036",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableView({ hData, option }) {
  const { deleteCustomerHeightRecord, deleteCustomerWeightRecord } =
    useContext(CstContext);

  const WeightTable = () => {
    return (
      <TableContainer sx={{ height: "50vh" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Weight (kg)</StyledTableCell>
              <StyledTableCell>Remove</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hData?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row?.date}
                </StyledTableCell>
                <StyledTableCell>{row?.weight}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => deleteCustomerWeightRecord(row?.date)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  const HeightTable = () => {
    return (
      <TableContainer sx={{ height: "50vh" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Month</StyledTableCell>
              <StyledTableCell>Height (cm)</StyledTableCell>
              <StyledTableCell>Remove</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hData?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row?.month}
                </StyledTableCell>
                <StyledTableCell>{row?.height}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => deleteCustomerHeightRecord(row?.month)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  return <Box>{option == "Height" ? <HeightTable /> : <WeightTable />}</Box>;
}
