var cubeVertices = [
    //x, y, z
    //face 1
    -0.5, 0.5, 0,       1, 0, 1,
    -0.5, -0.5, 0,      1, 0, 1,
    0.5, -0.5, 0,       1, 0, 1,
    //second triangle
    -0.5, 0.5, 0,       1, 0, 1,
    0.5, 0.5, 0,        1, 0, 1,
    0.5, -0.5, 0,       1, 0, 1,

    //face 2
    -0.5, 0.5, -1,      1, 0, 0,
    -0.5, 0.5, 0,       1, 0, 0,
    0.5, 0.5, 0,        1, 0, 0,
    //second triangle
    -0.5, 0.5, -1,      1, 0, 0,
    0.5, 0.5, -1,       1, 0, 0,
    0.5, 0.5, 0,        1, 0, 0,


    //face 3
    0.5, 0.5, 0,        1, 1, 0,
    0.5, -0.5, 0,       1, 1, 0,
    0.5, -0.5, -1,      1, 1, 0,
    //second triangle
    0.5, 0.5, 0,        1, 1, 0,
    0.5, 0.5, -1,       1, 1, 0,
    0.5, -0.5, -1,      1, 1, 0,


    //face 4
    -0.5, 0.5, -1,      1, 1, 1,
    -0.5, -0.5, -1,     1, 1, 1,
    0.5, -0.5, -1,      1, 1, 1,
    //second triangle
    -0.5, 0.5, -1,      1, 1, 1,
    0.5, 0.5, -1,       1, 1, 1,
    0.5, -0.5, -1,      1, 1, 1,


    //face 5
    -0.5, 0.5, -1,      0, 1, 1,
    -0.5, -0.5, -1,     0, 1, 1,
    -0.5, -0.5, 0,      0, 1, 1,
    //second triangle
    -0.5, 0.5, -1,      0, 1, 1,
    -0.5, 0.5, 0,       0, 1, 1,
    -0.5, -0.5, 0,      0, 1, 1,


    //face 6
    -0.5, -0.5, -1,     0, 0, 0,
    -0.5, -0.5, 0,      0, 0, 0,
    0.5, -0.5, 0,       0, 0, 0,
    //second triangle
    -0.5, -0.5, -1,     0, 0, 0,
    0.5, -0.5, -1,      0, 0, 0,
    0.5, -0.5, 0,       0, 0, 0,

];

var pyramidVertices = [
    //x, y, z
    //face 1
    0, 0.5, -0.5,       1, 0, 1,
    -0.5, -0.5, 0,      1, 0, 1,
    0.5, -0.5, 0,       1, 0, 1,

    //face 2
    0, 0.5, -0.5,       1, 0, 0,
    0.5, -0.5, 0,       1, 0, 0,
    0.5, -0.5, -1,      1, 0, 0,

    //face 3
    0, 0.5, -0.5,       1, 1, 0,
    0.5, -0.5, -1,      1, 1, 0,
    -0.5, -0.5, -1,     1, 1, 0,

    //face 4
    0, 0.5, -0.5,       1, 1, 1,
    -0.5, -0.5, -1,     1, 1, 1,
    -0.5, -0.5, 0,      1, 1, 1,

    //face 6 bottom 
    -0.5, -0.5, -1,     0, 1, 0,
    -0.5, -0.5, 0,      0, 1, 0,
    0.5, -0.5, 0,       0, 1, 0,
    //second triangle
    -0.5, -0.5, -1,     0, 1, 0,
    0.5, -0.5, -1,      0, 1, 0,
    0.5, -0.5, 0,       0, 1, 0,

];

var gridVertices = [
    //bottom grid
     0,  0,  0,      1, 1, 1, 
     3,  0,  0,      1, 1, 1,

     0,  0,  -1,     1, 1, 1,
     3,  0,  -1,     1, 1, 1,
    
     0,  0,  -2,     1, 1, 1,
     3,  0,  -2,     1, 1, 1,

     0,  0,  -3,     1, 1, 1,
     3,  0,  -3,     1, 1, 1,

     0,  0,   0,     1, 1, 1,
     0,  0,  -3,     1, 1, 1,

     1,  0,   0,     1, 1, 1,
     1,  0,  -3,     1, 1, 1,

     2,  0,   0,     1, 1, 1,
     2,  0,  -3,     1, 1, 1,

     3,  0,   0,     1, 1, 1,
     3,  0,  -3,     1, 1, 1,

     //right side grid
     3,   0,   0,      1, 1, 1,
     3,  10,   0,      1, 1, 1,

     3,   0,   -3,     1, 1, 1,
     3,  10,   -3,     1, 1, 1,

     3,  1,   0,       1, 1, 1,
     3,  1,  -3,       1, 1, 1,

     3,  2,   0,       1, 1, 1,
     3,  2,  -3,       1, 1, 1,

     3,  3,   0,       1, 1, 1,
     3,  3,  -3,       1, 1, 1,

     3,  4,   0,       1, 1, 1,
     3,  4,  -3,       1, 1, 1,

     3,  5,   0,       1, 1, 1,
     3,  5,  -3,       1, 1, 1,

     3,  6,   0,       1, 1, 1,
     3,  6,  -3,       1, 1, 1,

     3,  7,   0,       1, 1, 1,
     3,  7,  -3,       1, 1, 1,

     3,  8,   0,       1, 1, 1,
     3,  8,  -3,       1, 1, 1,

     3,  9,   0,       1, 1, 1,
     3,  9,  -3,       1, 1, 1,

     3,  10,   0,      1, 1, 1,
     3,  10,   -3,     1, 1, 1,

     3,  0,   -1,      1, 1, 1,
     3,  10,   -1,     1, 1, 1,

     3,  0,   -2,      1, 1, 1,
     3,  10,   -2,     1, 1, 1,

     //behind grid
     0,   0,   -3,     1, 1, 1,
     0,  10,   -3,     1, 1, 1,

     3,   0,   -3,     1, 1, 1,
     3,  10,   -3,     1, 1, 1,

     0,  1,  -3,       1, 1, 1,
     3,  1,  -3,       1, 1, 1,

     0,  2,  -3,       1, 1, 1,
     3,  2,  -3,       1, 1, 1,

     0,  3,  -3,       1, 1, 1,
     3,  3,  -3,       1, 1, 1,

     0,  4,  -3,       1, 1, 1,
     3,  4,  -3,       1, 1, 1,

     0,  5,  -3,       1, 1, 1,
     3,  5,  -3,       1, 1, 1,

     0,  6,  -3,       1, 1, 1,
     3,  6,  -3,       1, 1, 1,

     0,  7,  -3,       1, 1, 1,
     3,  7,  -3,       1, 1, 1,

     0,  8,  -3,       1, 1, 1,
     3,  8,  -3,       1, 1, 1,

     0,  9,  -3,       1, 1, 1,
     3,  9,  -3,       1, 1, 1,

     0,  10,  -3,      1, 1, 1,
     3,  10,  -3,      1, 1, 1,

     1,  0,   -3,      1, 1, 1,
     1,  10,  -3,      1, 1, 1,

     2,  0,   -3,      1, 1, 1,
     2,  10,  -3,      1, 1, 1,

];