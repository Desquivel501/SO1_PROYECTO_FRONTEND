import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  Grid
} from '@mui/material';
import { Chart } from 'src/components/chart';
import React, { useEffect, useState } from "react"; 

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

export const OverviewGraph = (props) => {
  const {sx, title, url} = props;
  
  // const [state, setState] = useState({'state':0, 'titulo':"Votos por partido",'url':"https://35.226.8.72:3000/votos-muni"})
  const [graph, setGraph] = useState({'labels':[],'values':[]})


  const chartOptions = useChartOptions(graph.labels);

  useEffect(() => {

    const fetchData = async () => {

      const response = await fetch(url);
      const data = await response.json();

      let total = 0
      for (let i = 0; i < data.data.length; i++){
        total += data.data[i].cont
      }

      const temp_labels = data.data.map(item => item.name)
      const temp_values = data.data.map(item => Math.floor((item.cont/total)*100))
      setGraph({'labels':temp_labels,'values':temp_values})

    };

    const interval =  setInterval(() => {
      fetchData()
      
    }, 2000);
    return () => clearInterval(interval);

  },[]);

  return (

    <Card sx={sx}>
      <CardContent>

        <CardHeader
          title={title}
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


    
  );
};

OverviewGraph.propTypes = {
  sx: PropTypes.object
};
