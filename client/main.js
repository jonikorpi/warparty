import React from "react";
import { Router, Route, browserHistory } from "react-router";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import Game from "../imports/client/Game.jsx";

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={Game} />
      <Route path="/:matchID" component={Game} />
    </Router>,
    document.getElementById("game")
  );
});
