import React from 'react'
import {
  createStyles,
  makeStyles,
  Grid,
  Paper,
  Theme
} from '@material-ui/core'

import SeaMapSetup from '../components/SeaMapSetup'

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    paper: {
      width: '100%',
      margin: theme.spacing(2),
      padding: theme.spacing(3),
      minHeight: 100
    }
  })
))

export const Setup = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid container id='fields-area' lg={8}>
        <Paper className={classes.paper} elevation={3}>
          <Grid container direction='row'>
            <SeaMapSetup />
          </Grid>
        </Paper>
      </Grid>
      <Grid container id='status-bar' lg={4}>
        <Paper className={classes.paper} elevation={3}>
        </Paper>
      </Grid>
    </Grid>
  )
}