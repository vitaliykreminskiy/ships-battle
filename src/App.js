import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { 
  createStyles,
  makeStyles,
  Theme
} from "@material-ui/core";


import { Welcome, Setup, Game } from "./pages";
import Navbar from "./components/Navbar";

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      padding: theme.spacing(5)
    }
  })
)

export const App = () => {
  const classes = useStyles()
  
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <div className={classes.root}>
          <Route exact path="/" component={Welcome} />
          <Route path="/setup" component={Setup} />
          <Route path="/game" component={Game} />
        </div>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
