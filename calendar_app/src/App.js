import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CalendarApp from "./Components/CalendarApp";
import ViewEvent from "./Components/ViewEvent";
import AddEvent from "./Components/AddEvent";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent } from "./JS/actions/actions";



function App() {

  const events = useSelector(state => state.eventReducer.events)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvent());
  }, [events]);


  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/" component={CalendarApp}/>
        <Route exact path="/AddEvent" component={AddEvent}/>
        <Route exact path="/ViewEvent" component={ViewEvent}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
