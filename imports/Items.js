Armor = [
  {
    name: "Default Armor",
    geometry: {
      primitive: "box",
      width: Variables.heroWidth*1.09,
      height: Variables.heroHeight*0.618,
      depth: Variables.heroDepth*1.09,
    },
    material: {
      color: "green",
    },
  },
  {
    name: "Other Armor",
    geometry: {
      primitive: "box",
      width: Variables.heroWidth*1.146,
      height: Variables.heroHeight*0.764,
      depth: Variables.heroDepth*1.146,
    },
    material: {
      color: "green",
    },
  },
];

Left = [
  {
    name: "Default Shield",
    geometry: {
      primitive: "box",
      width: Variables.heroWidth,
      height: Variables.heroWidth,
      depth: Variables.heroWidth*0.056,
    },
    material: {
      color: "blue",
    },
  },
  {
    name: "Other Shield",
    geometry: {
      primitive: "box",
      width: Variables.heroWidth*1.09,
      height: Variables.heroWidth*1.09,
      depth: Variables.heroWidth*0.056,
    },
    material: {
      color: "blue",
    },
  },
];

Right = [
  {
    name: "Default Sword",
    geometry: {
      primitive: "box",
      width: Variables.heroWidth*0.146,
      height: Variables.heroWidth*0.056,
      depth: Variables.heroWidth*1.5,
    },
    material: {
      color: "red",
    },
  },
  {
    name: "Other Sword",
    geometry: {
      primitive: "box",
      width: Variables.heroWidth*0.236,
      height: Variables.heroWidth*0.09,
      depth: Variables.heroWidth*1.618,
    },
    material: {
      color: "red",
    },
  },
];

export {Armor, Left, Right};
