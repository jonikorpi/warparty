//
// Variables

Variables = {};
export default Variables;

Variables.cursorDistance = 6;
Variables.cursorSize = 0.1618;
Variables.cursorThickness = 0.764;
Variables.cursorShrink = 0.618;

Variables.time = 1000;

Variables.springConfig = {stiffness: 300, damping: 30};
Variables.walkingSpeed = 1;

Variables.tileSize = 1;
Variables.tilesPerRow = 13;
Variables.tilesPerColumn = 13;

Variables.cameraAltitude = 8; // 10 is probably max
Variables.cameraOffsetZ = Variables.tilesPerColumn * 0.20;
Variables.cameraPositionAngle = (Math.atan(5/3) * 180 / Math.PI); // https://en.wikipedia.org/wiki/Pythagorean_triple#Examples
Variables.clipRange = 1000;

Variables.shortTime = function(exponent) {
  return Variables.time / Math.pow(1.618, exponent);
}

Variables.longTime = function(exponent) {
  return Variables.time * Math.pow(1.618, exponent);
}

//
// Functions

Variables.sinToDegrees = function(sin) {
  return Math.asin(sin) * 180 / Math.PI;
};

Variables.hypotenuse = function(a, b) {
  return Math.sqrt(a * a + b * b);
};

Variables.rightAngle = function(a, b) {
  const c = Variables.hypotenuse(a, b);
  const sin = b / c;
  let angle = Variables.sinToDegrees(sin);

  if (a < 0 && b < 0) {
    angle = 180 - angle;
  } else if (a < 0 && b >= 0) {
    angle = 180 - angle;
  }

  return angle + 90;
};

Variables.romanize = function(num) {
  var digits, i, key, roman;
  if (!+num) {
    return false;
  }
  digits = String(+num).split('');
  key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM', '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC', '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  roman = '';
  i = 3;
  while (i--) {
    roman = (key[+digits.pop() + i * 10] || '') + roman;
  }
  return Array(+digits.join('') + 1).join('M') + roman;
};
