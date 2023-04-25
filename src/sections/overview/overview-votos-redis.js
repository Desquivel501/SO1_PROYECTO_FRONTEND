import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  Box,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CardHeader
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonRunning, faMoon, faHand, faSkull, faEarthAmericas, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from "react"; 
import TableContainer from '@mui/material/TableContainer';

function Row(props) {
  const { value, i } = props;

  return (
    <React.Fragment>
      <TableRow
        hover
        key={i}
      >
        <TableCell>
          {value.sede}
        </TableCell>
        <TableCell>
          {value.municipio}
        </TableCell>
        <TableCell>
        {value.departamento}
        </TableCell>
        <TableCell>
        {value.papeleta}
        </TableCell>
        <TableCell>
        {value.partido}
        </TableCell>
        <TableCell>
        {value.timestamp}
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}


export const OverviewVotosRedis = (props) => {
  const { orders = [], sx } = props;


  const [redis, setRedis] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      var response = await fetch('http://http://35.226.8.72:3000/redis');
      var data = await response.json();
      setRedis(data.data)   
    };

    const interval =  setInterval(() => {
      fetchData()
      
    }, 2000);
    return () => clearInterval(interval);

  },[]);

  return (
    <Card sx={sx}>

      <CardHeader
        title="Datos en Redis"
      />

        <TableContainer sx={{ maxHeight: 800 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ '& > *': { bvalueBottom: 'unset' } }}>
                <TableCell>
                  Sede
                </TableCell>
                <TableCell>
                  Municipio
                </TableCell>
                <TableCell>
                  Departamento
                </TableCell>
                <TableCell>
                  Papeleta
                </TableCell>
                <TableCell>
                  Partido
                </TableCell>
                <TableCell>
                  Timestamp
                </TableCell>
              </TableRow> 
            </TableHead>

            <TableBody>
              {
                // console.log(values)
                redis.map((value, i) => (
                    <Row key={i} value={value} />
                ))
              }

            </TableBody>
          </Table>
        </TableContainer>

      <Divider />
    </Card>
  );
};

OverviewVotosRedis.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
