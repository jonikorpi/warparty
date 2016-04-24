import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import Game from "../imports/client/Game.jsx";

Meteor.startup(() => {
  render( <Game/>, document.getElementById("game") );
});
