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
} from "@mui/material";
import axios from "axios";

const PlanetsTable = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  const tableHeaders = ["Planet name", "Diameter", "Climate", "Terrain"];
  const tableRowKeys = ["name", "diameter", "climate", "terrain"];

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://swapi.dev/api/planets/?page=1"
        );
        setPlanets(response.data.results);
      } catch (error) {
        alert(`Somerthing went wrong: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanets();
  }, []);

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((tableHeader) => {
                return (
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {tableHeader}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (
              <>
                {planets.map((planet) => {
                  return (
                    <TableRow>
                      {tableRowKeys.map((tableRowKey) => {
                        return <TableCell>{planet[tableRowKey]}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
              </>
            ) : (
              <TableRow>
                {tableRowKeys.map((tableRowKey) => {
                  return (
                    <TableCell>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={60}
                        animation="wave"
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PlanetsTable;
