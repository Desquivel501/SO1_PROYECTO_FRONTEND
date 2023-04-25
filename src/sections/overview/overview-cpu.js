import PropTypes from 'prop-types';
import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
import DeviceTabletIcon from '@heroicons/react/24/solid/DeviceTabletIcon';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
  ButtonGroup,
  Button,
  Grid
} from '@mui/material';
import { Chart } from 'src/components/chart';
import React, { useEffect, useState, useRef } from "react"; 

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    labels,
    legend: {
      show: true
    },
    plotOptions: {
      pie: {
        expandOnClick: false
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      fillSeriesColor: false
    }
  };
};

export const OverviewCpu = (props) => {
  const {sx, title} = props;
  
  const [state, setState] = useState({'state':0, 'titulo':"Votos por partido",'url':"http://http://35.226.8.72:3000/votos-partido"})
  const [graph, setGraph] = useState({'labels':[],'values':[]})


  const chartOptions = useChartOptions(graph.labels);

  useEffect(() => {

    const fetchData = async () => {

      // Obtener top 3 de departamentos con mas votos para presidente
      const response = await fetch(state.url);
      const data = await response.json();
      console.log(state)

      let total = 0
      for (let i = 0; i < data.data.length; i++){
        total += data.data[i].cont
      }

      

      // const temp_labels = data.data.map(item => item.partido)
      // const temp_values = data.data.map(item => Math.floor((item.cont/total)*100))

      // console.log({'labels':temp_labels,'values':temp_values})

      // setGraph({'labels':temp_labels,'values':temp_values})

          // setLabels( data.data.map(item => item.partido))
          // setValues( data.data.map(item => Math.floor((item.cont/total)*100)) )


      

      // // Se coloca una cadena vacia si no existe el departamento
      // var primero = dep_data?.length > 0 ? dep_data[0].departamento : " "
      // var segundo = dep_data?.length > 1 ? dep_data[1].departamento : " "
      // var tercero = dep_data?.length > 2 ? dep_data[2].departamento : " "
      // // const departamento_temp = [primero,  segundo, tercero]
      // setDepartamento([primero,  segundo, tercero])
    };

    const interval =  setInterval(() => {
      fetchData()
      
    }, 2000);
    return () => clearInterval(interval);

  },[state]);

  return (

    <Grid container 
      spacing={2} 
      sx={sx}
    >    
      <Grid item
        xs={12}
        sm={12}
        lg={12}
      >
      {/* <Typography variant="h5" component="h5" >
          {state.titulo}
      </Typography> */}
      </Grid>

      <Grid item
        xs={12}
        sm={12}
        lg={12}
        justifyContent="center"
        
      >

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
          <ButtonGroup variant="contained" aria-label="outlined primary button group" >
            <Button onClick={() => setState({'state':0, 'titulo':"Votos por Partido",'url':"http://http://35.226.8.72:3000/votos-partido"})}>Por Partido</Button>
            <Button onClick={() => setState({'state':0, 'titulo':"Votos por Municipio",'url':"http://http://35.226.8.72:3000/votos-muni"})}>Por Municipio</Button>
            <Button onClick={() => setState({'state':0, 'titulo':"Votos por Departamento",'url':"http://http://35.226.8.72:3000/votos-partido"})}>Por Departamento</Button>
          </ButtonGroup>
        </Box>
      </Grid>

      <Grid item
        xs={12}
        sm={12}
        lg={12}
      >
        <Card sx={sx} variant="outlined">
          <CardContent>

            <CardHeader
              title={state.titulo}
            />

            <Chart
              height={300}
              options={chartOptions}
              series={graph.values}
              type="donut"
              width="100%"
            />
            

            
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    
  );
};

OverviewCpu.propTypes = {
  sx: PropTypes.object
};
