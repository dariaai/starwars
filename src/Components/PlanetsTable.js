import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  Container,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Skeleton,
  Paper,
  TableFooter,
  IconButton,
  Box,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const tableHeaders = ["Planet name", "Diameter", "Climate", "Terrain"];
const tableRowKeys = ["name", "diameter", "climate", "terrain"];

const PlanetsTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const pageNumber = parseInt(searchParams.get("page")) || 1;

  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [maxPagination, setMaxPagination] = useState(null);
  const [page, setPage] = useState(pageNumber);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://swapi.dev/api/planets/?page=${page}`
        );
        setPlanets(response.data.results);
        setMaxPagination(Math.floor(response.data.count / 10));
      } catch (error) {
        alert(`Somerthing went wrong: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanets();
    navigate(`/?page=${page}`);
  }, [page, navigate]);

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((tableHeader) => {
                return (
                  <TableCell key={tableHeader} sx={{ fontWeight: "bold" }}>
                    {tableHeader}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (
              <>
                {planets.map((planet, i) => {
                  const planetIndex = i;
                  return (
                    <TableRow
                      key={i}
                      sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                    >
                      {tableRowKeys.map((tableRowKey, i) => {
                        return (
                          <TableCell
                            key={tableRowKey}
                            sx={
                              tableRowKey === "name"
                                ? {
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                  }
                                : null
                            }
                            onClick={() => {
                              if (tableRowKey === "name") {
                                navigate(
                                  `/details/${
                                    (page - 1) * 10 + planetIndex + 1
                                  }`
                                );
                              }
                            }}
                          >
                            {planet[tableRowKey]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </>
            ) : (
              <TableRow>
                {tableRowKeys.map((tableRowKey, i) => {
                  return (
                    <TableCell key={i}>
                      <Skeleton width="100%" height={100} animation="wave" />
                      <Skeleton width="100%" height={100} animation="wave" />
                      <Skeleton width="100%" height={100} animation="wave" />
                      <Skeleton width="100%" height={100} animation="wave" />
                      <Skeleton width="100%" height={100} animation="wave" />
                    </TableCell>
                  );
                })}
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <Box>
                <IconButton
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <KeyboardArrowLeft />
                </IconButton>
                {page}
                <IconButton
                  disabled={page === maxPagination}
                  onClick={() => setPage(page + 1)}
                >
                  <KeyboardArrowRight />
                </IconButton>
              </Box>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PlanetsTable;
