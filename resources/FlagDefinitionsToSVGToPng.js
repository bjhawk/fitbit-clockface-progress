const jsdom = require("jsdom");
const sharp = require('sharp');
const buffer = require('buffer')

// Get a "document" to work with
const { JSDOM } = jsdom;
const { document } = (new JSDOM('<!DOCTYPE html>')).window;

const flagDefinitions = [
  {
    "name": "Gilbert Baker Pride",
    "colors": [
      "hotpink",
      "red",
      "orange",
      "yellow",
      "limegreen",
      "mediumturquoise",
      "indigo",
      "darkmagenta"
    ]
  },
  {
    "name": "Gilbert Baker Diversity Pride",
    "colors": [
      "lightlavender",
      "hotpink",
      "red",
      "orange",
      "yellow",
      "limegreen",
      "mediumturquoise",
      "indigo",
      "darkmagenta"
    ]
  },
  {
    "name": "Pride 1978",
    "colors": [
      "red",
      "orange",
      "yellow",
      "limegreen",
      "mediumturquoise",
      "indigo",
      "darkmagenta"
    ]
  },
  {
    "name": "Pride",
    "colors": [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "purple"
    ]
  },
  {
    "name": "Agender",
    "colors": [
      "black",
      "lightgray",
      "white",
      "greenyellow",
      "white",
      "lightgray",
      "black"
    ]
  },
  {
    "name": "Aromantic",
    "colors": [
      "limegreen",
      "greenyellow",
      "white",
      "lightgray",
      "black"
    ]
  },
  {
    "name": "Asexual",
    "colors": [
      "black",
      "lightgray",
      "white",
      "purple"
    ]
  },
  {
    "name": "Bisexual",
    "colors": [
      "mediumvioletred",
      "mediumvioletred",
      "mediumorchid",
      "mediumblue",
      "mediumblue"
    ]
  },
  {
    "name": "Genderfluid",
    "colors": [
      "carnation",
      "white",
      "darkviolet",
      "black",
      "mediumblue"
    ]
  },
  {
    "name": "Genderqueer",
    "colors": [
      "lavender",
      "lavender",
      "white",
      "white",
      "forestgreen",
      "forestgreen"
    ]
  },
  {
    "name": "Intersex",
    "colors": [
      "gold",
      "gold",
      "gold",
      "gold"
    ],
    finalize(newFlag) {
      console.log('Adding circle to intersex flag');
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', 51);
      circle.setAttribute('cy', 100);
      circle.setAttribute('r', 40);
      circle.setAttribute('fill', 'purple');

      const innerCircle = circle.cloneNode('true');
      innerCircle.setAttribute('fill', 'gold');
      innerCircle.setAttribute('r', '28');

      newFlag.appendChild(circle);
      newFlag.appendChild(innerCircle);
    }
  },
  {
    "name": "Gay Mens' Pride",
    "colors": [
      "darkcyan",
      "mediumaquamarine",
      "seafoam",
      "white",
      "lightskyblue",
      "royalblue",
      "midnightslate",
    ]
  },
  {
    "name": "Lesbian",
    "colors": [
      "orangered",
      "darkorange",
      "white",
      "violet",
      "mediumvioletred"
    ]
  },
  {
    "name": "Lesbian Labrys",
    "colors": [
      "mediumorchid",
    ]
  },
  {
    "name": "Non-binary",
    "colors": [
      "yellow",
      "white",
      "purple",
      "black"
    ]
  },
  {
    "name": "Pansexual",
    "colors": [
      "hotpink",
      "hotpink",
      "gold",
      "gold",
      "deepskyblue",
      "deepskyblue"
    ]
  },
  {
    "name": "Polysexual",
    "colors": [
      "magenta",
      "magenta",
      "limegreen",
      "limegreen",
      "dodgerblue",
      "dodgerblue"
    ]
  },
  {
    "name": "Transgender",
    "colors": [
      "lightskyblue",
      "lightpink",
      "white",
      "lightpink",
      "lightskyblue"
    ]
  },
  {
    "name": "Bear Pride",
    "colors": [
      "saddlebrown",
      "chocolate",
      "gold",
      "bisque",
      "white",
      "darkgray",
      "black"
    ]
  },
  {
    "name": "Leather Pride",
    "colors": [
      "black",
      "darkblue",
      "black",
      "darkblue",
      "white",
      "darkblue",
      "black",
      "darkblue",
      "black"
    ]
  },
  {
    "name": "Lipstick Lesbian",
    "colors": [
      "mediumvioletred",
      "mediumorchid",
      "orchid",
      "white",
      "plum",
      "indianred",
      "maroon"
    ]
  },
  {
    "name": "Polyamory",
    "colors": [
      "blue",
      "blue",
      "red",
      "red",
      "black",
      "black"
    ]
  },
  {
    "name": "Philadelphia Pride",
    "colors": [
      "black",
      "saddlebrown",
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "purple"
    ]
  },
  {
    "name": "Ally",
    "colors": [
      "black",
      "white",
      "black",
      "white",
      "black",
      "white",
    ]
  },
  {
    "name": "Pup Pride",
    "colors": [
      "black",
    ],
    finalize(newFlag) {
      console.log('Drawing Pup Pride triangles');
      const minx = 0;
      const miny = 0;
      const maxx = 336;
      const maxy = 201;

      const triangleColors = ["white", "blue", "black", "blue", "black"];
      for (index = 0; index < triangleColors.length; index += 1) {
        const whiteOffset = triangleColors[index] === 'white' ? 1 : 0;

        const topRightPoints = [
          [maxx, miny],
          [minx + ((index / 5) * maxx) - whiteOffset, miny],
          [maxx, maxy - ((index / 5) * maxy) + whiteOffset]
        ];
        const topRightPointsString = topRightPoints.reduce((pointString, newPoint) => {
          return `${pointString} ${newPoint[0]},${newPoint[1]}`;
        }, '').trim();
        const topRight = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        topRight.setAttribute('fill', triangleColors[index]);
        topRight.setAttribute('points', topRightPointsString);
        newFlag.appendChild(topRight);

        const bottomLeftPoints = [
          [minx, maxy],
          [maxx - ((index / 5) * maxx), maxy],
          [minx, miny + ((index / 5) * maxy)]
        ];
        const bottomLeftPointsString = bottomLeftPoints.reduce((pointString, newPoint) => {
          return `${pointString} ${newPoint[0]},${newPoint[1]}`;
        }, '').trim();
        const bottomLeft = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        bottomLeft.setAttribute('fill', triangleColors[index]);
        bottomLeft.setAttribute('points', bottomLeftPointsString);
        newFlag.appendChild(bottomLeft);
      }
      

      return;
    }
  }
];

const customColors = {
  'carnation': '#F778A1',
  'lavender': '#A74AC7',
  'lightlavender': '#CD66FF',
  'black': '#1C1C1C',
  'seafoam': '#99E8C2',
  'midnightslate': '#382070',
};

const flagHeight = 201;
const flagWidth = 336;

flagDefinitions.forEach((definition) => {
  drawFlag(definition);
});

function drawFlag(flagDefinition) {
  const flagName = flagDefinition.name.replace(/[ |']/g, '');
  console.log('Making flag: ' + flagName);
  const newFlag = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  newFlag.setAttribute('height', `${flagHeight}px`);
  newFlag.setAttribute('width', `${flagWidth}px`);

  const stripeHeight = Math.floor(flagHeight / flagDefinition.colors.length);
  const middleBumper = flagHeight - (stripeHeight * flagDefinition.colors.length);
  
  flagDefinition.colors.forEach((color, colorIndex) => {  
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', 0);
    
    if (colorIndex > flagDefinition.colors.length/2) {
      rect.setAttribute('y', (stripeHeight * colorIndex) + middleBumper);
    } else {
      rect.setAttribute('y', (stripeHeight * colorIndex));
    }
    
    if (colorIndex === Math.floor(flagDefinition.colors.length / 2)) {
      rect.setAttribute('height', `${stripeHeight + middleBumper}px`);
    } else {
      rect.setAttribute('height', `${stripeHeight}px`);
    }
    
    if (color in customColors) {
      rect.setAttribute('fill', customColors[color]);
    } else {
      rect.setAttribute('fill', color);
    }

    rect.setAttribute('width', `${flagWidth}px`);
    rect.classList.add(color);
    
    newFlag.appendChild(rect);
  });

  // any special handling is in a `finalize()` function on the flag def
  if (flagDefinition.hasOwnProperty('finalize')) {
    flagDefinition.finalize(newFlag);
  }

  // console.log(newFlag.outerHTML);
  sharp(Buffer.from(newFlag.outerHTML))
    .resize(336, 201)
    .toFile(`./resources/flags/${flagName}.png`, function(err) {
      if (err) { console.log(err); }
    });
}