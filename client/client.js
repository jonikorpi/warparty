import React from "react";
import { Router, Route, browserHistory } from "react-router";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import Game from "../imports/client/Game.jsx";

window.onerror = function(msg, url, lineNo, columnNo, error) {
  document.getElementById("error-container").innerHTML = `
    <strong class="size-2">${msg}</strong>
    <div class="size-0">${url}:${lineNo}</div>
  `;
  document.body.className = "has-errors"
}

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={Game} />
      <Route path="/:matchID" component={Game} />
    </Router>,
    document.getElementById("game")
  );
});
