import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Stack, Typography, Divider, Box } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';

export const OverviewProcesos = (props) => {
  const { difference, positive = false, sx, value, title, logo, color} = props;

  return (
    <Box sx={sx}>
      <Card sx={{border: '1px solid #A9A9A9'}}>
        <CardContent>
          <Stack
            // alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            divider={<Divider sx={{borderColor: '#A9A9A9'}} orientation="vertical" flexItem />}
            spacing={2}
          >

            <Avatar
              sx={{
                backgroundColor: color,
                height: 60,
                width: 60
              }}
            >
              {logo}
            </Avatar>

            <Typography variant="h4">
                {value}
            </Typography>


            

          </Stack>
        </CardContent>
      </Card>

    </Box>
    
  );
};

OverviewProcesos.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};
