var cube_bright = [
    //cube 1
    //FAB front1 green
   -1, 2, 1,        0, 0, 1,
   -1, 0, 1,        0, 0, 1,
    1, 0, 1,        0, 0, 1,
    //BGF front2 green
    1, 0, 1,        0, 0, 1,
    1, 2, 1,        0, 0, 1,
   -1, 2, 1,        0, 0, 1,
    //GBC right1 blue
    1, 2, 1,        0, 0, 1,
    1, 0, 1,        0, 0, 1,
    1, 0, -1,       0, 0, 1,
    //CIG right2 blue
    1, 0, -1,       0, 0, 1,
    1, 2, -1,       0, 0, 1,
    1, 2, 1,        0, 0, 1,
    //ICD back1 yellow
    1, 2, -1,       0, 0, 1,
    1, 0, -1,       0, 0, 1,
   -1, 0, -1,       0, 0, 1,
    //DHI back2 yellow
   -1, 0, -1,       0, 0, 1,
   -1, 2, -1,       0, 0, 1,
    1, 2, -1,       0, 0, 1,
    //HDA left1 red
   -1, 2, -1,       0, 0, 1,
   -1, 0, -1,       0, 0, 1,
   -1, 0, 1,        0, 0, 1,
    //AFH left2 red
   -1, 0, 1,        0, 0, 1,
   -1, 2, 1,        0, 0, 1,
   -1, 2, -1,       0, 0, 1,
    //ADC bottom1 red
   -1, 0, 1,        0, 0, 1,
   -1, 0, -1,       0, 0, 1,
    1, 0, -1,       0, 0, 1,
    //CBA bottom2 red
    1, 0, -1,       0, 0, 1,
    1, 0, 1,        0, 0, 1,
   -1, 0, 1,        0, 0, 1,
    //HFG top1 red
   -1, 2, -1,       0, 0, 1,
   -1, 2, 1,        0, 0, 1,
    1, 2, 1,        0, 0, 1,
    //GIH top2 red
    1, 2, 1,        0, 0, 1,
    1, 2, -1,       0, 0, 1,
   -1, 2, -1,       0, 0, 1

];

var cube_dark = [
    //cube 1
    //FAB front1 green
   -1, 2, 1,        0, 0, 0.6,
   -1, 0, 1,        0, 0, 0.6,
    1, 0, 1,        0, 0, 0.6,
    //BGF front2 green
    1, 0, 1,        0, 0, 0.6,
    1, 2, 1,        0, 0, 0.6,
   -1, 2, 1,        0, 0, 0.6,
    //GBC right1 blue
    1, 2, 1,        0, 0, 0.6,
    1, 0, 1,        0, 0, 0.6,
    1, 0, -1,       0, 0, 0.6,
    //CIG right2 blue
    1, 0, -1,       0, 0, 0.6,
    1, 2, -1,       0, 0, 0.6,
    1, 2, 1,        0, 0, 0.6,
    //ICD back1 yellow
    1, 2, -1,       0, 0, 0.6,
    1, 0, -1,       0, 0, 0.6,
   -1, 0, -1,       0, 0, 0.6,
    //DHI back2 yellow
   -1, 0, -1,       0, 0, 0.6,
   -1, 2, -1,       0, 0, 0.6,
    1, 2, -1,       0, 0, 0.6,
    //HDA left1 red
   -1, 2, -1,       0, 0, 0.6,
   -1, 0, -1,       0, 0, 0.6,
   -1, 0, 1,        0, 0, 0.6,
    //AFH left2 red
   -1, 0, 1,        0, 0, 0.6,
   -1, 2, 1,        0, 0, 0.6,
   -1, 2, -1,       0, 0, 0.6,
    //ADC bottom1 red
   -1, 0, 1,        0, 0, 0.6,
   -1, 0, -1,       0, 0, 0.6,
    1, 0, -1,       0, 0, 0.6,
    //CBA bottom2 red
    1, 0, -1,       0, 0, 0.6,
    1, 0, 1,        0, 0, 0.6,
   -1, 0, 1,        0, 0, 0.6,
    //HFG top1 red
   -1, 2, -1,       0, 0, 0.6,
   -1, 2, 1,        0, 0, 0.6,
    1, 2, 1,        0, 0, 0.6,
    //GIH top2 red
    1, 2, 1,        0, 0, 0.6,
    1, 2, -1,       0, 0, 0.6,
   -1, 2, -1,       0, 0, 0.6

];
var plane = [
    //FAB front1 green
    0,  0,  0,       0.45, 0.11, 0.45,
    32, 0, 0,        0.45, 0.11, 0.45,
    0, 0, -34,       0.45, 0.11, 0.45,

    32, 0, -34,      0.45, 0.11, 0.45,
    32, 0,  0,       0.45, 0.11, 0.45,
    0,  0, -34,      0.45, 0.11, 0.45

  
];
var pyramid = [
//pyramid 8
	//EAB front green
	0, 1, 0,          0, 0, 1,
	-1, 0, 1,         0, 0, 1,
	1, 0, 1,          0, 0, 1,
	//EBC right blue
	0, 1, 0,          0, 1, 0,
	1, 0, 1,          0, 1, 0,
	1, 0, -1,         0, 1, 0,
	//ECD back yellow
	0, 1, 0,          1, 1, 0,
	1, 0, -1,         1, 1, 0,
	-1, 0, -1,        1, 1, 0,
	//EDA left red
	0, 1, 0,          1, 0, 0,
	-1, 0, -1,        1, 0, 0,
	-1, 0, 1,         1, 0, 0,
	//BCA bottom1 red
	1, 0, 1,          1, 0, 1,
	1, 0, -1,         1, 0, 1,
	-1, 0, 1,         1, 0, 1,
	//DAC bottom2 red
	-1, 0, -1,        1, 0, 1,
	-1, 0, 1,         1, 0, 1,
	1, 0, -1,         1, 0, 1

];

var map = [];
var mapPlane = [];
var mapFirstCol = [];
var mapSecCol = [];
var mapThirdCol = [];
var mapFourthCol = [];
var mapFifthCol = [];
var mapSixthCol = [];
var mapSeventhCol = [];
var mapEighthCol = [];
var mapNinethCol = [];
var mapTenthCol = [];
var mapEleventhCol = [];
var mapTwlvethCol = [];
var mapThirteenthCol = [];
var mapFourteenCol = [];
var mapFifteenCol = [];

var pacmanUpper = [];
var pacmanBottom = [];

pacmanUpper.push(topSphere);
pacmanUpper.push(leftEye);
pacmanUpper.push(rightEye);
pacmanBottom.push(bottomSphere);

//var pacmanlength = pacmanUpper.length + pacmanBottom.length;
var pacman = pacmanUpper.concat(pacmanBottom);
var pacmanlength = topSphere.length + leftEye.length + rightEye.length + bottomSphere.length;

for (i = 0; i < 67; i++) {
    if (i % 2 == 0) {
        map.push(cube_bright);
    } else {
        map.push(cube_dark);
    }
    
}

mapPlane.push(plane);


for (i = 0; i < 8; i++) {
    if (i % 2 == 0) {
        mapFirstCol.push(cube_dark);
    } else {
        mapFirstCol.push(cube_bright);
    }
}

for (i = 0; i < 7; i++) {
    if (i % 2 == 0) {
        mapSecCol.push(cube_dark);
    } else {
        mapSecCol.push(cube_bright);
    }
}

for (i = 0; i < 4; i++) {
    if (i % 2 == 0) {
        mapThirdCol.push(cube_dark);
    } else {
        mapThirdCol.push(cube_bright);
    }
}

for (i = 0; i < 11; i++) {
    if (i % 2 == 0) {
        mapFourthCol.push(cube_dark);
    } else {
        mapFourthCol.push(cube_bright);
    }
}

for (i = 0; i < 5; i++) {
    if (i % 2 == 0) {
        mapFifthCol.push(cube_dark);
    } else {
        mapFifthCol.push(cube_bright);
        
    }
}

for (i = 0; i < 3; i++) {
    if (i % 2 == 0) {
        mapSixthCol.push(cube_bright);
    } else {
        mapSixthCol.push(cube_dark);
       
    }
}

for (i = 0; i < 12; i++) {
    if (i % 2 == 0) {
        mapSeventhCol.push(cube_dark);
    } else {
        mapSeventhCol.push(cube_bright);
    }
}

mapEighthCol.push(cube_bright);

for (i = 0; i < 11; i++) {
    if (i % 2 == 0) {
        mapNinethCol.push(cube_dark);
        
    } else {
        mapNinethCol.push(cube_bright);
    }
}

for (i = 0; i < 2; i++) {
    if (i % 2 == 0) {
        mapTenthCol.push(cube_bright);
        
    } else {
        mapTenthCol.push(cube_dark);
       
    }
}

for (i = 0; i < 8; i++) {
    if (i % 2 == 0) {
        mapEleventhCol.push(cube_dark);
    } else {
        mapEleventhCol.push(cube_bright);
    }
}

for (i = 0; i < 4; i++) {
    if (i % 2 == 0) {
        mapTwlvethCol.push(cube_dark);
    } else {
        mapTwlvethCol.push(cube_bright);
    }
}

for (i = 0; i < 8; i++) {
    if (i % 2 == 0) {
        mapThirteenthCol.push(cube_dark);
        
    } else {

        mapThirteenthCol.push(cube_bright);
    }
}

for (i = 0; i < 2; i++) {
    if (i % 2 == 0) {
        mapFourteenCol.push(cube_bright);
    } else {
        
        mapFourteenCol.push(cube_dark);
    }
}

for (i = 0; i < 7; i++) {
    if (i % 2 == 0) {
        mapFifteenCol.push(cube_dark);
    } else {
        mapFifteenCol.push(cube_bright);
    }
}

var totalbuffer = mapFirstCol.length + mapSecCol.length + mapThirdCol.length + mapFourthCol.length + mapFifthCol.length + mapSixthCol.length + mapSeventhCol.length + mapEighthCol.length + mapNinethCol.length + mapTenthCol.length
    + mapEleventhCol.length + mapTwlvethCol.length + mapThirteenthCol.length + mapFourteenCol.length + mapFifteenCol.length; 


var totalblocks = mapFirstCol.concat(mapSecCol, mapThirdCol, mapFourthCol, mapFifthCol, mapSixthCol, mapSeventhCol, mapEighthCol, mapNinethCol, mapTenthCol,
    mapEleventhCol, mapTwlvethCol, mapThirteenthCol, mapFourteenCol, mapFifteenCol);

/*console.log(mapPlane.length)
console.log(mapPlane.length + map.length + totalblocks.length)
*/
//front/right/back/left/bottom//18vertices


//pacman 
var pacmanModelMatrixArray = [];
for (i = 0; i < pacman.length; i++) {
    var ObjMatrix = glMatrix.mat4.create();
    ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [2, 1, -2]);
    pacmanModelMatrixArray.push(ObjMatrix);
}


console.log(mapFifteenCol.length)




//border of the walls 
var ModelMatrixArray = [];
//border of the walls matrix
for (i = 0; i < 17; i++) {

    var ObjMatrix = glMatrix.mat4.create();
    ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [0, 0, -2 * i]);

    ModelMatrixArray.push(ObjMatrix);
}
for (i = 17; i < 33; i++) {

    var ObjMatrix = glMatrix.mat4.create();
    ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [2 * (i - 17), 0, 0]);
    ModelMatrixArray.push(ObjMatrix);
}
for (i = 33; i < 49; i++) {

    var ObjMatrix = glMatrix.mat4.create();
    ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [2 * (i - 33), 0, -17 * 2]);

    ModelMatrixArray.push(ObjMatrix);
}
for (i = 49; i < 67; i++) {

    var ObjMatrix = glMatrix.mat4.create();
    ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [16 * 2, 0, -2 * (i - 49)]);

    ModelMatrixArray.push(ObjMatrix);
}

//plane matrix
for (i = 0; i < mapPlane.length; i++) {
    var ObjMatrix = glMatrix.mat4.create();
    ModelMatrixArray.push(ObjMatrix);

}
//blocks on map (maze creation)

console.log(ModelMatrixArray.length + "before blocks")


for (i = 0; i < mapFirstCol.length; i++) {
    if (i == 7) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [2, 0, -16]);
        ModelMatrixArray.push(ObjMatrix);
    } else {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [2, 0, -2 * i - 20]);
        ModelMatrixArray.push(ObjMatrix);

    }
}

for (i = 0; i < mapSecCol.length; i++) {
    if (i == 6) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [4, 0, -16]);
        ModelMatrixArray.push(ObjMatrix);
    } else {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [4, 0, -2 * i - 2]);
        ModelMatrixArray.push(ObjMatrix);

    }
}

for (i = 0; i < mapThirdCol.length; i++) {
    if (i == 0) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [6, 0, -6]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i == 1) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [6, 0, -16]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i == 2) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [6, 0, -20]);
        ModelMatrixArray.push(ObjMatrix);
    }
    if (i == 3) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [6, 0, - 24]);
        ModelMatrixArray.push(ObjMatrix);

    }
}

for (i = 0; i < mapFourthCol.length; i++) {
    if (i <= 4) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [8, 0, -2 * i - 24]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i == 5) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [8, 0, -20]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i >= 6 && i < 10) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [8, 0, i * -2 + 2]);
        ModelMatrixArray.push(ObjMatrix);

    }

    if (i == 10) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [8, 0, -6]);
        ModelMatrixArray.push(ObjMatrix);

    }
}

for (i = 0; i < mapFifthCol.length; i++) {
    if (i == 0) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [10, 0, -28]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i == 1) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [10, 0, -24]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i == 2) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [10, 0, -20]);
        ModelMatrixArray.push(ObjMatrix);
    }
    if (i == 3) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [10, 0, -10]);
        ModelMatrixArray.push(ObjMatrix);
    }
    if (i == 4) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [10, 0, - 6]);
        ModelMatrixArray.push(ObjMatrix);

    }
}

for (i = 0; i < mapSixthCol.length; i++) {
    if (i == 0) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [12, 0, -28]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i == 1) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [12, 0, -24]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i == 2) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [12, 0, -20]);
        ModelMatrixArray.push(ObjMatrix);
    }

}

for (i = 0; i < mapSeventhCol.length; i++) {
    if (i == 0) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [14, 0, -28]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i == 1) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [14, 0, -24]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i > 1) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [14, 0, - 2 * i + 2]);
        ModelMatrixArray.push(ObjMatrix);

    }
}

for (i = 0; i < mapEighthCol.length; i++) {
    var ObjMatrix = glMatrix.mat4.create();
    ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [16, 0, -28]);
    ModelMatrixArray.push(ObjMatrix);

}

for (i = 0; i < mapNinethCol.length; i++) {
    var ObjMatrix = glMatrix.mat4.create();
    ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [18, 0, -2 * i - 8]);
    ModelMatrixArray.push(ObjMatrix);

}

for (i = 0; i < mapTenthCol.length; i++) {
    if (i == 0) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [20, 0, -22]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i == 1) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [20, 0, -18]);
        ModelMatrixArray.push(ObjMatrix);
    }
}

for (i = 0; i < mapEleventhCol.length; i++) {
    if (i < 7) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [22, 0, -2 * i - 2]);
        ModelMatrixArray.push(ObjMatrix);
    }
    else {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [22, 0, -18]);
        ModelMatrixArray.push(ObjMatrix);
    }
}

for (i = 0; i < mapTwlvethCol.length; i++) {
    if (i == 0) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [24, 0, -30]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i == 1) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [24, 0, -24]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i == 2) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [24, 0, -18]);
        ModelMatrixArray.push(ObjMatrix);
    }
    if (i == 3) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [24, 0, -14]);
        ModelMatrixArray.push(ObjMatrix);
    }
}

for (i = 0; i < mapThirteenthCol.length; i++) {
    if (i == 0) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [26, 0, -14]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i == 1) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [26, 0, -24]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i == 2) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [26, 0, -30]);
        ModelMatrixArray.push(ObjMatrix);
    }
    if (i > 2) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [26, 0, -2 * i + 4]);
        ModelMatrixArray.push(ObjMatrix);
    }
}

for (i = 0; i < mapFourteenCol.length; i++) {
    if (i == 0) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [28, 0, -30]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i == 1) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [28, 0, -24]);
        ModelMatrixArray.push(ObjMatrix);
    }
}

for (i = 0; i < mapFifteenCol.length; i++) {
    if (i == 0) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [30, 0, -24]);
        ModelMatrixArray.push(ObjMatrix);
    }

    if (i > 0) {
        var ObjMatrix = glMatrix.mat4.create();
        ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [30, 0, -2 * i - 6]);
        ModelMatrixArray.push(ObjMatrix);
    }
}



console.log(ModelMatrixArray.length + "after blocks")









