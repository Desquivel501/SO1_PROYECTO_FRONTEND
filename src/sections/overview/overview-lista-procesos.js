import { format } from 'date-fns';
import PropTypes from 'prop-types';
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
          {"#"}
        </TableCell>
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
      </TableRow>
    </React.Fragment>
  )
}


export const OverviewListaProcesos = (props) => {
  const { sx } = props;

  const [mysql, setMysql] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      var response = await fetch('http://http://35.226.8.72:3000/all');
      var data = await response.json();
      setMysql(data.data)   
    };

    const interval =  setInterval(() => {
      fetchData()
      
    }, 2000);
    return () => clearInterval(interval);

  },[]);


  return (
    <Card sx={sx}>

      <CardHeader
        title="Datos en MySQL"
      />

        <TableContainer sx={{ maxHeight: 800 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ '& > *': { bvalueBottom: 'unset' } }}>
                <TableCell>
                  Id
                </TableCell>
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
                mysql.map((value, i) => (
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

OverviewListaProcesos.prototype = {
  sx: PropTypes.object
};
