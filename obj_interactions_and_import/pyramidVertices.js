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
mynewpyramids.push(cube);




































