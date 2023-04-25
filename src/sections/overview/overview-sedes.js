import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';
import React, { useEffect, useState } from "react"; 

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
            position: 'bottom'
        },
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      type: 'category',
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const OverviewSedes = (props) => {
  const { sx } = props;
  const chartOptions = useChartOptions();


  const chartSeries = [{
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
          ]}]


  const [series, setSeries] = useState([{ data: [{
                                              x: 'Apple',
                                              y: 54
                                            }, {
                                              x: 'Orange',
                                              y: 66
                                            }, {
                                              x: 'Banana',
                                              y: 33
                                            }
                                          ]}])

  useEffect(() => {

    const fetchData = async () => {

      const response = await fetch("https://35.226.8.72:3000/sedes");
      const data = await response.json();

      setSeries([{ data: data.data }])

      console.log(data.data)

    };

    const interval =  setInterval(() => {
      fetchData()
      
    }, 2000);
    return () => clearInterval(interval);

  },[]);

  return (
    <Card sx={sx} variant="outlined">
      <CardHeader
        title="Sedes con mas votos almacenados"
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={series}
          type="bar"
          width="100%"
        />
      </CardContent>
    </Card>
  );
};

OverviewSedes.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object
};