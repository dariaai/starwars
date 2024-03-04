import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Paper,
  Chip,
} from "@mui/material";
const PlanetDetails = () => {
  const { planetNumber } = useParams();

  const [loading, setLoading] = useState(true);
  const [planetDetails, setPlanetDetails] = useState(null);

  const detailsNames = [
    "Name",
    "Diameter",
    "Climate",
    "Terrain",
    "Gravity",
    "Population",
    "Orbital period",
  ];
  const detailsKeys = [
    "name",
    "diameter",
    "climate",
    "terrain",
    "gravity",
    "population",
    "orbital_period",
  ];

  useEffect(() => {
    let residentsNames = [];
    const fetchPlanets = async () => {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/planets/${planetNumber}/`
        );
        const residentsLinks = response.data?.residents;
        const residentsRequests = residentsLinks.map((residentLink) => {
          return axios.get(residentLink);
        });
        const residentsResponses = await Promise.all(residentsRequests);
        residentsNames = residentsResponses.map((residentsResponse) => {
          return residentsResponse.data.name;
        });

        setPlanetDetails({ ...response.data, residents: residentsNames });
      } catch (error) {
        alert(`Somerthing went wrong: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{ marginTop: 5, padding: "10px 0" }}
      component={Paper}
    >
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {detailsNames.map((detailsName, index) => (
            <Typography key={index}>
              <strong>{detailsName}: </strong>
              {planetDetails[detailsKeys[index]]}
            </Typography>
          ))}
          {planetDetails?.residents.length > 0 ? (
            <Typography>
              <strong>Residents: </strong>
              {planetDetails.residents.map((resident) => {
                return <Chip label={resident} sx={{ margin: 0.5 }} />;
              })}
            </Typography>
          ) : null}
        </>
      )}
    </Container>
  );
};

export default PlanetDetails;
