
import { ButtonGroup, Typography, Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { OverviewProcesos } from 'src/sections/overview/overview-procesos';
import { OverviewDepartamentos } from 'src/sections/overview/overview-departamentos';
import { OverviewListaProcesos } from 'src/sections/overview/overview-lista-procesos';
import { OverviewCpu } from 'src/sections/overview/overview-cpu';
import { OverviewGraph } from 'src/sections/overview/overview-graph';
import { OverviewSedes } from 'src/sections/overview/overview-sedes';
import { OverviewVotosRedis } from 'src/sections/overview/overview-votos-redis';

import React, { useState } from "react";


export default function Home() {

  const [listp, setListp] = useState([]) 


  return (
    <div>
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
              sx={{ height: '100%' }}
            />
          </Grid> 


          <Grid
            xs={12}
            md={6}
            lg={12}
          >
            <OverviewDepartamentos
              sx={{ height: '100%' }}
            />
          </Grid> 

          <Grid
            xs={12}
            md={6}
            lg={12}
          >
            <OverviewGraph
              title={"Votos por Partido"}
              url={"http://localhost:5000/votos-partido"}
              sx={{ height: '100%', border: '1px solid #A9A9A9'}}
            />
          </Grid>

          <Grid
            xs={12}
            md={6}
            lg={12}
          >
            <OverviewGraph
              title={"Votos por Municipio"}
              url={"http://localhost:5000/votos-muni"}
              sx={{ height: '100%', border: '1px solid #A9A9A9'}}
            />
          </Grid>


          <Grid
            xs={12}
            md={6}
            lg={12}
          >
            <OverviewGraph
              title={"Votos por Departamento"}
              url={"http://localhost:5000/votos-depa"}
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

  </div>
  )
}