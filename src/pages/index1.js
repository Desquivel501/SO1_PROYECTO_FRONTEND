
import { ButtonGroup, Typography, Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { OverviewProcesos } from 'src/sections/overview/overview-procesos';
import { OverviewListaProcesos } from 'src/sections/overview/overview-lista-procesos';
import { OverviewCpu } from 'src/sections/overview/overview-cpu';
import { OverviewSedes } from 'src/sections/overview/overview-sedes';
import { OverviewVotosRedis } from 'src/sections/overview/overview-votos-redis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from "react";
import { amber, grey, brown } from '@mui/material/colors';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


// const darkTheme = createTheme({
//   palette: {
//     primary: 'blue',
//   }
// });


export default function Home() {

  const [chartdata, setChartdata] = useState([])

  const [mysql, setMysql] = useState([])
  const [departamento, setDepartamento] = useState(["","",""])

  const [values, setValues] = useState([])
  const [labels, setLabels] = useState([])

  const [values2, setValues2] = useState([])
  const [labels2, setLabels2] = useState([])

  const [values3, setValues3] = useState([])
  const [labels3, setLabels3] = useState([])

  const [cpu, setCPU] = useState([50,50])
  const [ram, setRAM] = useState([50,50])
  const [procesos, setProcesos] = useState([0,0,0,0,0])
  const [listp, setListp] = useState([]) 


  useEffect(() => {
    const interval = setInterval(() => {

      fetch('http://http://35.226.8.72:3000/all', {
          method: 'GET',
          headers: {
              'Content-Type':'application/json',
              'Access-Control-Allow-Origin_Origin': '*'
          }
          })
          .then(resp => resp.json())
          .then(data => {
            setMysql(data.data)               
          }).catch(console.error); 

      fetch('http://http://35.226.8.72:3000/departamento', {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin_Origin': '*'
        }
        })
        .then(resp => resp.json())
        .then(data => {

          var primero = data?.length > 0 ? data.data[0].departamento : " "
          var segundo = data?.length > 1 ? data.data[1].departamento : " "
          var tercero = data?.length > 2 ? data.data[2].departamento : " "
          setDepartamento([primero, segundo, tercero])      

        }).catch(console.error); 

      fetch('http://http://35.226.8.72:3000/votos-partido', {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin_Origin': '*'
        }
        })
        .then(resp => resp.json())
        .then(data => {


          let total = 0
          for (let i = 0; i < data.data.length; i++){
            total += data.data[i].cont
          }
          setLabels( data.data.map(item => item.partido))
          setValues( data.data.map(item => Math.floor((item.cont/total)*100)) )
          setChartdata(data.data)
          
          
          
        }).catch(console.error); 

      fetch('http://http://35.226.8.72:3000/votos-muni', {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin_Origin': '*'
        }
        })
        .then(resp => resp.json())
        .then(data => {
          
          console.log(data.data)

          let total = 0
          for (let i = 0; i < data.data.length; i++){
            total += data.data[i].cont
          }
          // setLabels2( data.data.map(item => item.municipio))
          // setValues2( data.data.map(item => Math.floor((item.cont/total)*100)) )
        }).catch(console.error); 
      

      // fetch('http://http://35.226.8.72:3000/votos-partido', {
      //   method: 'GET',
      //   headers: {
      //       'Content-Type':'application/json',
      //       'Access-Control-Allow-Origin_Origin': '*'
      //   }
      //   })
      //   .then(resp => resp.json())
      //   .then(data => {
          
      //     let total = 0
      //     for (let i = 0; i < data.data.length; i++){
      //       total += data.data[i].cont
      //     }
      //     setLabels( data.data.map(item => item.partido))
      //     setValues( data.data.map(item => Math.floor((item.cont/total)*100)) )
      //   }).catch(console.error); 
      

    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // const getList = () => {
  //   fetch('http://34.121.155.122:5000/processes', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type':'application/json',
  //       'Access-Control-Allow-Origin_Origin': '*'
  //   }
  //   })
  //   .then(resp => resp.json())
  //   .then(data => {  
  //     setListp(data.data)
  //     console.log(data.data)         
  //   }).catch(console.error); 
  // }

  // useEffect(() => {
  //   getList()
  // },[]);



  return (
    <div>
    {/* <ThemeProvider theme={darkTheme}>
    <CssBaseline /> */}
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4
      }}
    >
      <Container maxWidth="xl">
        <Grid
            xs={12}
            sm={12}
            lg={12}
          >
          <Typography variant="h3" component="h3">
            Visualizador
          </Typography>
        </Grid>

        <Grid
          container
          spacing={3}
        > 

          <Grid
            xs={12}
            md={6}
            lg={12}
          >
            <OverviewListaProcesos
              values={mysql}
              sx={{ height: '100%' }}
            />
          </Grid> 

          <Grid
            xs={12}
            sm={12}
            lg={12}
          >
           <Typography variant="h5" component="h5">
            Top 3 de departamentos con mas votos para presidente
          </Typography>
          </Grid>

          <Grid
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

          <Grid
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

          <Grid
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


          <Grid
            xs={12}
            sm={12}
            lg={12}
          >
           <Typography variant="h5" component="h5">
            Porcentaje de Votos
          </Typography>
          </Grid>


          <Grid
            xs={12}
            md={6}
            lg={12}
          >
            <OverviewCpu
              chartSeries={values}
              labels={labels}
              title={"Por partido"}
              sx={{ height: '100%', border: '1px solid #A9A9A9'}}
            />
          </Grid>

          <Grid
            xs={12}
            md={6}
            lg={12}
          >
            <OverviewCpu
              chartSeries={values2}
              labels={labels2}
              title={"Por Municipio"}
              sx={{ height: '100%', border: '1px solid #A9A9A9'}}
            />
          </Grid>

          <Grid
            xs={12}
            md={6}
            lg={12}
          >
            <OverviewCpu
              chartSeries={values}
              labels={labels}
              title={"Por Departamento"}
              sx={{ height: '100%', border: '1px solid #A9A9A9'}}
            />
          </Grid>
          
          <Grid
            xs={12}
            lg={12}
          >
            <OverviewSedes
              chartSeries={[
                {
                  data: [{
                          x: 'Apple',
                          y: 54
                        }, {
                          x: 'Orange',
                          y: 66
                        }, {
                          x: 'Banana',
                          y: 33
                        }
                      ]}
              ]}
              sx={{ height: '100%', border: '1px solid #A9A9A9'}}
            />
          </Grid>
          
          <Grid
            xs={12}
            md={6}
            lg={12}
          >
            <OverviewVotosRedis
              orders={listp}
              sx={{ height: '100%' }}
            />
          </Grid> 


        </Grid>
      
      </Container>
    </Box>
    {/* </ThemeProvider> */}
  </div>
  )
}