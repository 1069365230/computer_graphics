var cone = [
    [1.5, 0, 0],
    [-1.5, 1, 0],
    [-1.5, 0.809017, 0.587785],
    [-1.5, 0.309017, 0.951057],
    [-1.5, -0.309017, 0.951057],
    [-1.5, -0.809017, 0.587785],
    [-1.5, -1, 0],
    [-1.5, -0.809017, -0.587785],
    [-1.5, -0.309017, -0.951057],
    [-1.5, 0.309017, -0.951057],
    [-1.5, 0.809017, -0.587785]
];

var face = [
    0, 1, 2,
    0, 2, 3,
    0, 3, 4,
    0, 4, 5,
    0, 5, 6,
    0, 6, 7,
    0, 7, 8,
    0, 8, 9,
    0, 9, 10,
    0, 10, 1
];

var coneArray = [];
console.log(cone);
for (i = 0; i < face.length; i++) {
    coneArray.push(cone[face[i]]);

}
var color = [1, 0, 0];
for (i = 0; i < coneArray.length; i++) {
    //var color = [Math.random().toString(), Math.random().toString(), Math.random().toString()];
    coneArray[i] = coneArray[i].concat(color);
}


coneArray = [].concat.apply([], coneArray);
console.log(coneArray)



var cube = [
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
    1, 2, 1,        0, 1, 0,
    1, 0, 1,        0, 1, 0,
    1, 0, -1,       0, 1, 0,
    //CIG right2 blue
    1, 0, -1,       0, 1, 0,
    1, 2, -1,       0, 1, 0,
    1, 2, 1,        0, 1, 0,
    //ICD back1 yellow
    1, 2, -1,       1, 1, 0,
    1, 0, -1,       1, 1, 0,
   -1, 0, -1,       1, 1, 0,
    //DHI back2 yellow
   -1, 0, -1,       1, 1, 0,
   -1, 2, -1,       1, 1, 0,
    1, 2, -1,       1, 1, 0,
    //HDA left1 red
   -1, 2, -1,       1, 0, 0,
   -1, 0, -1,       1, 0, 0,
   -1, 0, 1,        1, 0, 0,
    //AFH left2 red
   -1, 0, 1,        1, 0, 0,
   -1, 2, 1,        1, 0, 0,
   -1, 2, -1,       1, 0, 0,
    //ADC bottom1 red
   -1, 0, 1,        1, 0, 1,
   -1, 0, -1,       1, 0, 1,
    1, 0, -1,       1, 0, 1,
    //CBA bottom2 red
    1, 0, -1,       1, 0, 1,
    1, 0, 1,        1, 0, 1,
   -1, 0, 1,        1, 0, 1,
    //HFG top1 red
   -1, 2, -1,       1, 0.5, 1,
   -1, 2, 1,        1, 0.5, 1,
    1, 2, 1,        1, 0.5, 1,
    //GIH top2 red
    1, 2, 1,        1, 0.5, 1,
    1, 2, -1,       1, 0.5, 1,
   -1, 2, -1,       1, 0.5, 1

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

var mynewpyramids = [];

for (i = 0; i < 8; i++) {
    mynewpyramids.push(pyramid);
}
mynewpyramids.push(coneArray);
//front/right/back/left/bottom//18vertices

var pyramidnormal = [
    //front
    0, 0.7071067690849304, 0.7071067690849304,
    0, 0.7071067690849304, 0.7071067690849304,
    0, 0.7071067690849304, 0.7071067690849304,
    //right
    0.7071067690849304, 0.7071067690849304, 0,
    0.7071067690849304, 0.7071067690849304, 0,
    0.7071067690849304, 0.7071067690849304, 0,
    //back
    0, 0.7071067690849304, -0.7071067690849304,
    0, 0.7071067690849304, -0.7071067690849304,
    0, 0.7071067690849304, -0.7071067690849304,
    //left
    -0.7071067690849304, 0.7071067690849304, 0,
    -0.7071067690849304, 0.7071067690849304, 0,
    -0.7071067690849304, 0.7071067690849304, 0,
    //bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0
];


var cubenormal = [
    //front1
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    //front2
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    //right1
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    //right2
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    //back1
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    //back2
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    //left1
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    //left2
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    //bottom1
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    //bottom2
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    //top1
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    //top2
    0, -1, 0,
    0, -1, 0,
    0, -1, 0
];



var mynormals = [];

for (i = 0; i < 8; i++) {
    mynormals.push(pyramidnormal);
}
mynormals.push(cubenormal);

console.log(mynormals)

/*
for (i = 0; i < 6; i++) {
    const crossout = glMatrix.vec3.create();
    const crossout1 = glMatrix.vec3.create();
    var a = glMatrix.vec3.create();
    var b = glMatrix.vec3.create();

    //console.log(crossout);
    glMatrix.vec3.subtract(b, [pyramid[6 + 18 * i], pyramid[7 + 18 * i], pyramid[8 + 18 * i]], [pyramid[0 + 18 * i], pyramid[1 + 18 * i], pyramid[2 + 18 * i]]);
    glMatrix.vec3.subtract(a, [pyramid[12 + 18 * i], pyramid[13 + 18 * i], pyramid[14 + 18 * i]], [pyramid[0 + 18 * i], pyramid[1 + 18 * i], pyramid[2 + 18 * i]]);
    glMatrix.vec3.cross(crossout, b, a);
    //console.log("CROSSOUT");
    glMatrix.vec3.normalize(crossout1, crossout);
    for (j = 0; j < crossout1.length; j++) {
        mynormals.push(crossout1[j]);
    }
    for (j = 0; j < crossout1.length; j++) {
        mynormals.push(crossout1[j]);
    }
    for (j = 0; j < crossout1.length; j++) {
        mynormals.push(crossout1[j]);
    }

    console.log(crossout1);

}


console.log(mynormals)*/































