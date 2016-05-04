import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";
import {Armor, Left, Right} from "../Items";

import Text from "./Text";
import Item from "./Item";

export default class ItemSelector extends Component {

  constructor(props) {
    super();

    this.getItemLists = this.getItemLists.bind(this);
  }

  componentDidMount() {

  }

  getItemLists(equippedItems) {
    const that = this;

    return [Armor, Left, Right].map(
      function(category, categoryID) {
        return category.map(
          function(item, itemID) {
            return (
              <Entity
                class="listed-item"
              >

                <Item
                  data={itemID}
                  slot={categoryID}
                  heroID={that.props.heroID}
                  key={itemID}
                  doOnClick={that.props.onItemChange}
                  position={[
                    Variables.tileSize * (itemID + 1),
                    0,
                    Variables.tileSize * (0 - categoryID),
                  ]}
                  highlight={equippedItems[categoryID] == itemID}
                  spinning={true}
                />

              </Entity>
            );
          }
        );
      }
    );
  }

  render() {
    return (
      <Entity
        class="item-selector"
      >

        {this.getItemLists(this.props.items)}

      </Entity>
    );
  }

}
