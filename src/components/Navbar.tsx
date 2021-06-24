import React from 'react'
import VideogameAsset from '@material-ui/icons/VideogameAsset'
import { 
  Typography,
  Toolbar,
  AppBar, 
  Theme
} from '@material-ui/core'
import { 
  makeStyles, 
  createStyles 
} from '@material-ui/core/styles'

import CONFIG from '../config/app'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    title: {
      marginLeft: theme.spacing(2)
    }
  })
)

const Navbar = () => {
  const classes = useStyles()

  return (
    <AppBar position='static'>
      <Toolbar>
        <VideogameAsset fontSize={'large'}/>
        <Typography variant='h6' className={classes.title}>
          { CONFIG.APP_NAME }
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar