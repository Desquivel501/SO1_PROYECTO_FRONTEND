import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Stack, Typography, Divider, Box, Grid, Container } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import React, { useEffect, useState } from "react"; 
import { OverviewProcesos } from 'src/sections/overview/overview-procesos';
import { amber, grey, brown } from '@mui/material/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal } from '@fortawesome/free-solid-svg-icons'

export const OverviewDepartamentos = (props) => {
  const { difference, positive = false, sx} = props;
  const [departamento, setDepartamento] = useState(["","",""])

  useEffect(() => {

    const fetchData = async () => {

      // Obtener top 3 de departamentos con mas votos para presidente
      var response = await fetch('https://34.68.198.104:3000/departamento');
      var data = await response.json();
      var dep_data = data.data

      // Se coloca una cadena vacia si no existe el departamento
      var primero = dep_data?.length > 0 ? dep_data[0].departamento : " "
      var segundo = dep_data?.length > 1 ? dep_data[1].departamento : " "
      var tercero = dep_data?.length > 2 ? dep_data[2].departamento : " "
      // const departamento_temp = [primero,  segundo, tercero]
      setDepartamento([primero,  segundo, tercero])
    };

    const interval =  setInterval(() => {
      fetchData()
      
    }, 2000);
    return () => clearInterval(interval);

  },[]);
  

  return (
    
    <Grid container spacing={2} sx={sx}>
     
      <Grid item
        xs={12}
        sm={12}
        lg={12}
      >
      <Typography variant="h5" component="h5">
        Top 3 de departamentos con mas votos para presidente
      </Typography>
      </Grid>

      <Grid item
        xs={12}
        sm={12}
        lg={4}
      >
        <OverviewProcesos
          difference={12}
          positive
          sx={{ height: '100%'}}
          value={departamento[0]}
          color={amber[500]}
          title="En Ejecución"
          logo={<FontAwesomeIcon icon={faMedal} size = '2x'/>}
        />
      </Grid>

      <Grid item
        xs={12}
        sm={12}
        lg={4}
      >
        <OverviewProcesos
          difference={12}
          positive
          sx={{ height: '100%' }}
          value={departamento[1]}
          color={grey[500]}
          title="Suspendidos"
          logo={<FontAwesomeIcon icon={faMedal} size = '2x' />}
        />
      </Grid>

      <Grid item
        xs={12}
        sm={12}
        lg={4}
      >
        <OverviewProcesos
          difference={12}
          positive
          sx={{ height: '100%'}}
          value={departamento[2]}
          color={brown[500]}
          title="Detenidos"
          logo={<FontAwesomeIcon icon={faMedal} size = '2x' />}
        />
      </Grid>

      </Grid>
    
  );
};

OverviewDepartamentos.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object
};
