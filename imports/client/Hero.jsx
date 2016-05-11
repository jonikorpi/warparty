import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import Aframe from "aframe";
import {Animation, Entity, Scene} from "aframe-react";

import Variables from "../Variables";

import Text from "./Text";
import HeroModel from "./HeroModel";
import Item from "./Item";
import ItemSelector from "./ItemSelector";
import Effect from "./Effect";

export default class Hero extends Component {

  constructor(props) {
    super();

    this.onHeroClick = this.onHeroClick.bind(this);
    this.getItems = this.getItems.bind(this);

    this.state = {
      itemsOpen: false,
    };
  }

  componentDidMount() {

  }

  getEffects(effects) {
    if (effects && effects.length > 0) {
      return effects.map(
        function(effect, i) {
          return (
            <Effect
              data={effect}
              index={i}
              key={i}
            />
          );
        }
      );
    }
  }

  getItems(items, itemsOpen) {
    const that = this;
    if (items && items.length > 0) {
      return items.map(
        function(item, i) {
          return (
            <Item
              data={item}
              slot={i}
              key={i}
              doOnClick={that.onHeroClick}
            />
          );
        }
      );
    }
  }

  getItemSelector(itemsOpen, items, onItemChange, heroID) {
    if (itemsOpen) {
      return (
        <ItemSelector
          items={items}
          heroID={heroID}
          onItemChange={onItemChange}
        />
      );
    }
  }

  getMana(mana) {
    if (mana) {
      return (
        <Text
          text={mana}
          size={Variables.tileSize*0.25}
          position={[
            Variables.tileSize * -0.25,
            0,
            0,
          ]}
          color="cyan"
        />
      );
    }
  }

  getRotation(party) {
    let rotation = 0;

    switch (party) {
      case 0:
        rotation = -90;
        break;
      case 1:
        rotation = 90;
        break;
    }

    return rotation;
  }

  onHeroClick() {
    this.setState({
      itemsOpen: !this.state.itemsOpen,
    });
  }

  onHeroMouseEnter() {

  }

  onHeroMouseLeave() {

  }


  render() {
    return (
      <Motion
        style={{
          heroPositionX: spring(Variables.tileSize * this.props.data.position[0], Variables.springConfig),
          heroPositionY: spring(Variables.tileSize * this.props.data.position[1], Variables.springConfig),
          heroPositionZ: spring(Variables.tileSize * this.props.data.position[2], Variables.springConfig),
        }}
      >
        {interpolation =>
          <Entity
            class="hero"
            position={[
              interpolation.heroPositionX + Variables.tileSize * 0.5,
              interpolation.heroPositionY + Variables.heroHeight * 0.5,
              interpolation.heroPositionZ + Variables.tileSize * 0.5,
            ]}
          >

            <Entity
              class="hero-model"
              onClick={this.onHeroClick}
              onMouseEnter={this.onHeroMouseEnter}
              onMouseLeave={this.onHeroMouseLeave}
              rotation={[
                0,
                this.getRotation(this.props.party),
                0,
              ]}
            >

              <HeroModel/>

            </Entity>

            <Entity
              class="hero-items"
              position={[
                Variables.tileSize,
                0,
                0,
              ]}
              rotation={[
                0,
                this.getRotation(this.props.party),
                0,
              ]}
            >

              {this.getItems(this.props.data.items)}
              {this.getEffects(this.props.data.effects)}
              {this.getMana(this.props.data.mana)}

            </Entity>

            <Entity
              class="hero-overlay"
            >

              {this.getItemSelector(
                this.state.itemsOpen,
                this.props.data.items,
                this.props.onItemChange,
                this.props.heroID
              )}

            </Entity>

          </Entity>
        }
      </Motion>
    );
  }

}
