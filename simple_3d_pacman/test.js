
class Model {
    modelmat;
    transmat;
    rotatemat;
    xrotatemat
    yrotatemat
    zrotatemat
    scalemat;
    xdegree = 0;
    ydegree = 0;
    zdegree = 0;
    width = 1;
    height = 1;
    depth = 1;
    xtrans = 0;
    ytrans = 0;
    ztrans = 0;


    constructor(modelmat, transmat, rotatemat, xrotatemat, yrotatemat, zrotatemat, scalemat) {
        this.modelmat = modelmat;
        this.transmat = transmat;
        this.rotatemat = rotatemat;
        this.xrotatemat = xrotatemat;
        this.yrotatemat = yrotatemat;
        this.zrotatemat = zrotatemat;
        this.scalemat = scalemat;
        //this.move = move;
    }
}

var Initializer = function () {
    var canvas = document.getElementById('surface');
    var gl = canvas.getContext('webgl');

    if (!gl) {
        console.log('shit aint working')
    }
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    //load shader set up
    var program = gl.createProgram();

    var vshader;
    var fshader;
    var vsource;
    var fsource;

    const vsNormal = gl.createShader(gl.VERTEX_SHADER);
    const fsNormal = gl.createShader(gl.FRAGMENT_SHADER);

    vshader = vsNormal;
    fshader = fsNormal;
    vsource = vertexShaderSource;
    fsource = fragmentShaderSource;

    shadersetup(gl, program, fshader, vshader, fsource, vsource);

    //buffer for GPU
    var positionLoc = gl.getAttribLocation(program, 'vertPosition');
    var colorLoc = gl.getAttribLocation(program, 'vertColor');

    //var objbufferArray = [];
    var bufferArray = [];
    var pacmanbufferArray = [];
    //buffer for border
    for (i = 0; i < map.length; i++) {
        var newBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, newBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(map[i]), gl.STATIC_DRAW);
        bufferArray.push(newBuffer);
    };
    console.log(bufferArray.length)
    //buffer for plane
    for (i = 0; i < mapPlane.length; i++) {
        var newBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, newBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mapPlane[i]), gl.STATIC_DRAW);
        bufferArray.push(newBuffer);
    };
    //buffer for maze
    for (i = 0; i < totalblocks.length; i++) {
        var newBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, newBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(totalblocks[i]), gl.STATIC_DRAW);
        bufferArray.push(newBuffer);
    };  
    //buffer for pacman
    for (i = 0; i < pacman.length; i++) {
        var newBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, newBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pacman[i]), gl.STATIC_DRAW);
        pacmanbufferArray.push(newBuffer);
    }
    /////////////////////////////////////////

    /////////////////////////////////////////
    function drawOne(number) {
        console.log("drawOne called");
        normaldraw(gl, program, bufferArray[number], positionLoc, colorLoc);
    }

    function drawPacmam(number) {
        console.log("pacman called");
        objdraw(gl, program, pacmanbufferArray[number], positionLoc, colorLoc, pacmanlength);
        //normaldraw(gl, program, pacmanbufferArray[number], positionLoc, colorLoc);
    }


    gl.useProgram(program);

    var matWorldUniformLocation = gl.getUniformLocation(program, 'worldMatrix');
    var matViewUniformLocation = gl.getUniformLocation(program, 'viewMatrix');
    var matProjUniformLocation = gl.getUniformLocation(program, 'projectionMatrix');
    //var matObjUniformLocation = gl.getUniformLocation(program, 'objectMatrix');
    //const unit = glMatrix.mat4.create();

    const ProjMatrix = glMatrix.mat4.create();
    const ViewMatrix = glMatrix.mat4.create();
    const WorldMatrix = glMatrix.mat4.create();

    //where i used to have all the ModelMatrixArray
    //moved to other file now
    //eye//center
    //glMatrix.mat4.lookAt(ViewMatrix, [19, 26, 1], [16, 0, -16], [0, 1, 0]);//camera//version 2.0
    //glMatrix.mat4.lookAt(ViewMatrix, [23, 30, 3], [16, 0, -16], [0, 1, 0]);//camera // version 1.0
    glMatrix.mat4.lookAt(ViewMatrix, [3, 6, 3], [2, 0, -2], [0, 1, 0]);//camera // focus on pacman


    //glMatrix.mat4.perspective(ProjMatrix, glMatrix.glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);
    glMatrix.mat4.ortho(ProjMatrix, -9, 9, -9, 9, 0.1, 1000.0);


    var right = 1;
    var left = -1;
    var top = 1;
    var bottom = -1;
    var near = 0.1;
    var far = 1000;
    
    /*const ProjMatrix = [
        2 / (right - left), 0, 0, -(left + right) / (right - left),
        0, 2 / (top - bottom), 0, -(top + bottom) / (top - bottom),
        0, 0, -2 / (far - near), - (far + near) / (far - near),
        0, 0, 0, 1
    ];*/
    /*
    var anglez = glMatrix.glMatrix.toRadian(0);
    var outz = glMatrix.mat4.create();
    glMatrix.mat4.rotate(outz, unit, anglez, [0, 1, 0]);

    glMatrix.mat4.mul(ProjMatrix, ProjMatrixtemp, outz);
    */
    /*var temptransMatrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        -1, 0, 0, 1
    ];
    var out = glMatrix.mat4.create();
    var rotate = glMatrix.mat4.create();
    var outx = glMatrix.mat4.create();
    var outy = glMatrix.mat4.create();
    var outz = glMatrix.mat4.create();
    var outr = glMatrix.mat4.create();
    var angley = glMatrix.glMatrix.toRadian(0);
    var anglex = glMatrix.glMatrix.toRadian(0);
    var anglez = glMatrix.glMatrix.toRadian(0);
    glMatrix.mat4.rotate(outy, ProjMatrixp, angley, [0, 1, 0]);
    glMatrix.mat4.rotate(outx, ProjMatrixp, anglex, [1, 0, 0]);
    glMatrix.mat4.rotate(outz, ProjMatrixp, anglez, [0, 0, 1]);

    glMatrix.mat4.mul(out, outy, outx);
    glMatrix.mat4.mul(rotate, unit, out);
    glMatrix.mat4.mul(ProjMatrix, ProjMatrixp, rotate);*/
    //ProjMatrix = out;

    //glMatrix.mat4.rotate(ProjMatrix, temp, 9, [1, 0, 0]);

    //first run
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, WorldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, ViewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, ProjMatrix);

    //draw, stack every model on screen
    //store each model matrix into an array
    var modelArray = [];
    for (i = 0; i < ModelMatrixArray.length; i++) {
        var identityMatrix = glMatrix.mat4.create();
        const model = new Model(identityMatrix, identityMatrix, identityMatrix, identityMatrix, identityMatrix, identityMatrix, identityMatrix);
        modelArray.push(model);
        var matObjUniformLocation = gl.getUniformLocation(program, 'objectMatrix');
        gl.uniformMatrix4fv(matObjUniformLocation, gl.FALSE, ModelMatrixArray[i]);
        //gl.uniformMatrix4fv(matObjUniformLocation, gl.FALSE, identityMatrix);
        drawOne(i);
    }

    var pacmanmodelArray = [];
    for (i = 0; i < pacmanModelMatrixArray.length; i++) {
        var identityMatrix = glMatrix.mat4.create();
        const model = new Model(identityMatrix, identityMatrix, identityMatrix, identityMatrix, identityMatrix, identityMatrix, identityMatrix);
        pacmanmodelArray.push(model);
        var matObjUniformLocation = gl.getUniformLocation(program, 'objectMatrix');
        gl.uniformMatrix4fv(matObjUniformLocation, gl.FALSE, pacmanModelMatrixArray[i]);
        //gl.uniformMatrix4fv(matObjUniformLocation, gl.FALSE, identityMatrix);
        drawPacmam(i);
    }



    function stackanddraw() {
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        for (i = 0; i < modelArray.length; i++) {
            var temp = glMatrix.mat4.create();
            glMatrix.mat4.mul(temp, ModelMatrixArray[i], modelArray[i].modelmat);
            var matObjUniformLocation = gl.getUniformLocation(program, 'objectMatrix');
            gl.uniformMatrix4fv(matObjUniformLocation, gl.FALSE, temp);
            drawOne(i);
        }

        for (i = 0; i < pacmanmodelArray.length; i++) {
            var temp = glMatrix.mat4.create();
            glMatrix.mat4.mul(temp, pacmanModelMatrixArray[i], pacmanmodelArray[i].modelmat);
            var matObjUniformLocation = gl.getUniformLocation(program, 'objectMatrix');
            gl.uniformMatrix4fv(matObjUniformLocation, gl.FALSE, temp);
            drawPacmam(i);
        }

    }

    //console.log(modelArray)

    //transformation section
    //needed matrixs that carry all the transformation
    //var identityMatrix = glMatrix.mat4.create();
    //rotation xyz degree
    var worldrotation = glMatrix.mat4.create();
    var worldscale = glMatrix.mat4.create();
    var worldtrans = glMatrix.mat4.create();
    worldx = 0;
    worldy = 0;
    worldz = 0;

    function rotation(zAngle, yAngle, xAngle, whichone) {
        var identityMatrix = glMatrix.mat4.create();

        var xRotateMatrix = glMatrix.mat4.create();
        var yRotateMatrix = glMatrix.mat4.create();
        var zRotateMatrix = glMatrix.mat4.create();
        var rotationMatrix = glMatrix.mat4.create();

        console.log(yAngle)
        var xangle = glMatrix.glMatrix.toRadian(xAngle);
        var yangle = glMatrix.glMatrix.toRadian(yAngle);
        var zangle = glMatrix.glMatrix.toRadian(zAngle);

        glMatrix.mat4.rotate(xRotateMatrix, identityMatrix, xangle, [1, 0, 0]);
        glMatrix.mat4.rotate(yRotateMatrix, identityMatrix, yangle, [0, 1, 0]);
        glMatrix.mat4.rotate(zRotateMatrix, identityMatrix, zangle, [0, 0, 1]);
        if (whichone == -1) {
            var bridge = glMatrix.mat4.create();
            glMatrix.mat4.mul(bridge, yRotateMatrix, zRotateMatrix);
            glMatrix.mat4.mul(rotationMatrix, xRotateMatrix, bridge);
            worldrotation = rotationMatrix;
            var finalMatrix = glMatrix.mat4.create();
            var prefinalMatrix = glMatrix.mat4.create();

            glMatrix.mat4.mul(prefinalMatrix, worldrotation, worldscale);
            glMatrix.mat4.mul(finalMatrix, worldtrans, prefinalMatrix);
            var matWorldUniformLocation = gl.getUniformLocation(program, 'worldMatrix');
            gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, finalMatrix);

        } else {
           
            pacmanmodelArray[whichone].xrotatemat = xRotateMatrix;
            pacmanmodelArray[whichone].yrotatemat = yRotateMatrix;
            pacmanmodelArray[whichone].zrotatemat = zRotateMatrix;
            var bridge = glMatrix.mat4.create();

            glMatrix.mat4.mul(bridge, pacmanmodelArray[whichone].xrotatemat, pacmanmodelArray[whichone].zrotatemat);
            glMatrix.mat4.mul(rotationMatrix, pacmanmodelArray[whichone].yrotatemat, bridge);

            pacmanmodelArray[whichone].rotatemat = rotationMatrix;

            var finalMatrix = glMatrix.mat4.create();
            var prefinalMatrix = glMatrix.mat4.create();

            glMatrix.mat4.mul(prefinalMatrix, pacmanmodelArray[whichone].rotatemat, pacmanmodelArray[whichone].scalemat);
            glMatrix.mat4.mul(finalMatrix, pacmanmodelArray[whichone].transmat, prefinalMatrix);
            pacmanmodelArray[whichone].modelmat = finalMatrix;
            //console.log(modelArray[whichone])
            //console.log(finalMatrix)
        }

        stackanddraw()
    };

  
    worldxtrans = 0;
    worldytrans = 0;
    worldztrans = 0;
    
    //transfomation object movement
    function transformation(xtransValue, ytransValue, ztransValue, whichone) {
        if (whichone == -1) {
            var transformationMatrix = glMatrix.mat4.create();
            worldxtrans = xtransValue;
            worldytrans = ytransValue;
            worldztrans = ztransValue;
            var temptransMatrix = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                worldxtrans, worldytrans, worldztrans, 1
            ];

            glMatrix.mat4.mul(transformationMatrix, identityMatrix, temptransMatrix);

            worldtrans = transformationMatrix;
            var finalMatrix = glMatrix.mat4.create();
            var prefinalMatrix = glMatrix.mat4.create();

            glMatrix.mat4.mul(prefinalMatrix, worldrotation, worldscale);
            glMatrix.mat4.mul(finalMatrix, worldtrans, prefinalMatrix);
            var matWorldUniformLocation = gl.getUniformLocation(program, 'worldMatrix');
            gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, finalMatrix);
        } else {
            var transformationMatrix = glMatrix.mat4.create();

            pacmanmodelArray[whichone].xtrans = xtransValue;
            pacmanmodelArray[whichone].ytrans = ytransValue;
            pacmanmodelArray[whichone].ztrans = ztransValue;
            console.log(pacmanmodelArray[0].xtrans);
            var temptransMatrix = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                pacmanmodelArray[whichone].xtrans, pacmanmodelArray[whichone].ytrans, pacmanmodelArray[whichone].ztrans, 1
            ];


            glMatrix.mat4.mul(transformationMatrix, identityMatrix, temptransMatrix);
            pacmanmodelArray[whichone].transmat = transformationMatrix;

            var finalMatrix = glMatrix.mat4.create();
            var prefinalMatrix = glMatrix.mat4.create();

            glMatrix.mat4.mul(prefinalMatrix, pacmanmodelArray[whichone].rotatemat, pacmanmodelArray[whichone].scalemat);
            glMatrix.mat4.mul(finalMatrix, pacmanmodelArray[whichone].transmat, prefinalMatrix);

            pacmanmodelArray[whichone].modelmat = finalMatrix;
            console.log(pacmanmodelArray[whichone].modelmat);
        }

        stackanddraw()
    };

    //camera movement left right up down
    //default angle
    var x = 0;
    var y = 0;
    function movecamera(xValue, yValue) {
        x = xValue;
        y = yValue;
        //glMatrix.mat4.lookAt(ViewMatrix, [16, 46, 9], [x, y, -9], [0, 1, 0]); ori
        glMatrix.mat4.lookAt(ViewMatrix, [3+x, 6+y, 3], [2+x, 0+y, -2], [0, 1, 0])

        var matViewUniformLocation = gl.getUniformLocation(program, 'viewMatrix');
        gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, ViewMatrix);

        stackanddraw()

    };


    //interaction section
    //all transformation except arrow keys

    function Basic(script, modelNumber) {
        console.log("ENTERED Basic");
        if (modelNumber == -1) {
            switch (script.keyCode) {
                case 87:
                    worldx = worldx - 30;
                    rotation(worldz, worldy, worldx, modelNumber);
                    break;
                case 83:
                    worldx = worldx + 30;
                    rotation(worldz, worldy, worldx, modelNumber);
                    break;
                case 69:
                    worldy = worldy - 30;
                    rotation(worldz, worldy, worldx, modelNumber);
                    break;
                case 81:
                    worldy = worldy + 30;
                    rotation(worldz, worldy, worldx, modelNumber);
                    break;
                case 68:
                    worldz = worldz - 30;
                    rotation(worldz, worldy, worldx, modelNumber);
                    break;
                case 65:
                    worldz = worldz + 30;
                    rotation(worldz, worldy, worldx, modelNumber);
                    break;
            }
        } else {
            switch (script.keyCode) {
                case 87:
                    console.log("W key");
                    modelArray[modelNumber].xdegree = modelArray[modelNumber].xdegree - 30;
                    console.log(modelArray[modelNumber].xdegree);
                    rotation(modelArray[modelNumber].zdegree, modelArray[modelNumber].ydegree, modelArray[modelNumber].xdegree, modelNumber);
                    break;
                case 83:
                    console.log("S key");
                    modelArray[modelNumber].xdegree = modelArray[modelNumber].xdegree + 30;
                    console.log(modelArray[modelNumber].xdegree);
                    rotation(modelArray[modelNumber].zdegree, modelArray[modelNumber].ydegree, modelArray[modelNumber].xdegree, modelNumber);
                    break;
                case 69:
                    console.log("E key");
                    modelArray[modelNumber].ydegree = modelArray[modelNumber].ydegree - 30;
                    console.log(modelArray[modelNumber].ydegree);
                    rotation(modelArray[modelNumber].zdegree, modelArray[modelNumber].ydegree, modelArray[modelNumber].xdegree, modelNumber);
                    break;
                case 81:
                    console.log("Q key");
                    modelArray[modelNumber].ydegree = modelArray[modelNumber].ydegree + 30;
                    console.log(modelArray[modelNumber].ydegree);
                    rotation(modelArray[modelNumber].zdegree, modelArray[modelNumber].ydegree, modelArray[modelNumber].xdegree, modelNumber);
                    break;
                case 68:
                    console.log("D key");
                    modelArray[modelNumber].zdegree = modelArray[modelNumber].zdegree - 30;
                    console.log(modelArray[modelNumber].zdegree);
                    rotation(modelArray[modelNumber].zdegree, modelArray[modelNumber].ydegree, modelArray[modelNumber].xdegree, modelNumber);
                    break;
                case 65:
                    console.log("A key");
                    modelArray[modelNumber].zdegree = modelArray[modelNumber].zdegree + 30;
                    console.log(modelArray[modelNumber].zdegree);
                    rotation(modelArray[modelNumber].zdegree, modelArray[modelNumber].ydegree, modelArray[modelNumber].xdegree, modelNumber);
                    break; 
            }
        }   
    };
    //arrow keys camera activated
    function cameraArrow(script) {
        switch (script.keyCode) {
            case 39:
                console.log("Right key");
                x = x + 1;
                console.log(x);
                movecamera(x, y);
                break;
            case 37:
                console.log("Left key");
                x = x - 1;
                console.log(x);
                movecamera(x, y);
                break;
            case 38:
                console.log("Up key");
                y = y + 1;
                console.log(y);
                movecamera(x, y);
                break;
            case 40:
                console.log("Down key");
                y = y - 1;
                console.log(y);
                movecamera(x, y);
                break;

        }
    };
    //arrow keys camera deactivated
    var mouthopen = 1;
    function addmouth() {
        mouthopen = mouthopen + 1;
    }

    function getmouth() {
        return mouthopen;
    }
    function translationArrow(script, modelNumber) {
        //moutopen++;
        if (modelNumber == -1) {
            switch (script.keyCode) {
                case 39:
                    worldxtrans = worldxtrans + 1;
                    transformation(worldxtrans, worldytrans, worldztrans, modelNumber);
                    break;
                case 37:
                    worldxtrans = worldxtrans - 1;
                    transformation(worldxtrans, worldytrans, worldztrans, modelNumber);
                    break;
                case 38:
                    worldytrans = worldytrans + 1;
                    transformation(worldxtrans, worldytrans, worldztrans, modelNumber);
                    break;
                case 40:
                    worldytrans = worldytrans - 1;
                    transformation(worldxtrans, worldytrans, worldztrans, modelNumber);
                    break;
                case 188:
                    worldztrans = worldztrans + 1;
                    transformation(worldxtrans, worldytrans, worldztrans, modelNumber);
                    break;
                case 190:
                    worldztrans = worldztrans - 1;
                    transformation(worldxtrans, worldytrans, worldztrans, modelNumber);
                    break;
            }
        } else {
            //objVertexArray
            switch (script.keyCode) {
                case 39:
                    console.log("Right key");
                    pacmanmodelArray[0].xtrans = pacmanmodelArray[0].xtrans + 1;
                    pacmanmodelArray[1].xtrans = pacmanmodelArray[1].xtrans + 1;
                    pacmanmodelArray[2].xtrans = pacmanmodelArray[2].xtrans + 1;
                    pacmanmodelArray[3].xtrans = pacmanmodelArray[3].xtrans + 1;
                    transformation(pacmanmodelArray[0].xtrans, pacmanmodelArray[0].ytrans, pacmanmodelArray[0].ztrans, 0);
                    transformation(pacmanmodelArray[1].xtrans, pacmanmodelArray[1].ytrans, pacmanmodelArray[1].ztrans, 1);
                    transformation(pacmanmodelArray[2].xtrans, pacmanmodelArray[2].ytrans, pacmanmodelArray[2].ztrans, 2);
                    transformation(pacmanmodelArray[3].xtrans, pacmanmodelArray[3].ytrans, pacmanmodelArray[3].ztrans, 3);
                    //rotation part
                    pacmanmodelArray[0].ydegree = -90;
                    pacmanmodelArray[1].ydegree = -90;
                    pacmanmodelArray[2].ydegree = -90;
                    pacmanmodelArray[3].ydegree = -90;
                    if (getmouth() % 2 != 0) {
                        pacmanmodelArray[0].xdegree = 45;
                        pacmanmodelArray[1].xdegree = 45;
                        pacmanmodelArray[2].xdegree = 45;
                        pacmanmodelArray[3].xdegree = -45;

                    } else {
                        pacmanmodelArray[0].xdegree = 0;
                        pacmanmodelArray[1].xdegree = 0;
                        pacmanmodelArray[2].xdegree = 0;
                        pacmanmodelArray[3].xdegree = 0;
                  
                    }
                    rotation(pacmanmodelArray[0].zdegree, pacmanmodelArray[0].ydegree, pacmanmodelArray[0].xdegree, 0);
                    rotation(pacmanmodelArray[1].zdegree, pacmanmodelArray[1].ydegree, pacmanmodelArray[1].xdegree, 1);
                    rotation(pacmanmodelArray[2].zdegree, pacmanmodelArray[2].ydegree, pacmanmodelArray[2].xdegree, 2);
                    rotation(pacmanmodelArray[3].zdegree, pacmanmodelArray[3].ydegree, pacmanmodelArray[3].xdegree, 3);
                    addmouth();
                    console.log("mouth number"+getmouth());
                    break;
                case 37:
                    console.log("Left key");
                    pacmanmodelArray[0].xtrans = pacmanmodelArray[0].xtrans - 1;
                    pacmanmodelArray[1].xtrans = pacmanmodelArray[1].xtrans - 1;
                    pacmanmodelArray[2].xtrans = pacmanmodelArray[2].xtrans - 1;
                    pacmanmodelArray[3].xtrans = pacmanmodelArray[3].xtrans - 1;
                    transformation(pacmanmodelArray[0].xtrans, pacmanmodelArray[0].ytrans, pacmanmodelArray[0].ztrans, 0);
                    transformation(pacmanmodelArray[1].xtrans, pacmanmodelArray[1].ytrans, pacmanmodelArray[1].ztrans, 1);
                    transformation(pacmanmodelArray[2].xtrans, pacmanmodelArray[2].ytrans, pacmanmodelArray[2].ztrans, 2);
                    transformation(pacmanmodelArray[3].xtrans, pacmanmodelArray[3].ytrans, pacmanmodelArray[3].ztrans, 3);

                    pacmanmodelArray[0].ydegree = 90;
                    pacmanmodelArray[1].ydegree = 90;
                    pacmanmodelArray[2].ydegree = 90;
                    pacmanmodelArray[3].ydegree = 90;
                    if (getmouth() % 2 != 0) {
                        pacmanmodelArray[0].xdegree = 45;
                        pacmanmodelArray[1].xdegree = 45;
                        pacmanmodelArray[2].xdegree = 45;
                        pacmanmodelArray[3].xdegree = -45;
                    } else {
                        pacmanmodelArray[0].xdegree = 0;
                        pacmanmodelArray[1].xdegree = 0;
                        pacmanmodelArray[2].xdegree = 0;
                        pacmanmodelArray[3].xdegree = 0;
                    }
                    rotation(pacmanmodelArray[0].zdegree, pacmanmodelArray[0].ydegree, pacmanmodelArray[0].xdegree, 0);
                    rotation(pacmanmodelArray[1].zdegree, pacmanmodelArray[1].ydegree, pacmanmodelArray[1].xdegree, 1);
                    rotation(pacmanmodelArray[2].zdegree, pacmanmodelArray[2].ydegree, pacmanmodelArray[2].xdegree, 2);
                    rotation(pacmanmodelArray[3].zdegree, pacmanmodelArray[3].ydegree, pacmanmodelArray[3].xdegree, 3);
                    addmouth();
                    console.log(pacmanmodelArray[0].xtrans);
                    break;
                case 38:
                    console.log("Up key");
                    pacmanmodelArray[0].ztrans = pacmanmodelArray[0].ztrans - 1;
                    pacmanmodelArray[1].ztrans = pacmanmodelArray[1].ztrans - 1;
                    pacmanmodelArray[2].ztrans = pacmanmodelArray[2].ztrans - 1;
                    pacmanmodelArray[3].ztrans = pacmanmodelArray[3].ztrans - 1;
                    transformation(pacmanmodelArray[0].xtrans, pacmanmodelArray[0].ytrans, pacmanmodelArray[0].ztrans, 0);
                    transformation(pacmanmodelArray[1].xtrans, pacmanmodelArray[1].ytrans, pacmanmodelArray[1].ztrans, 1);
                    transformation(pacmanmodelArray[2].xtrans, pacmanmodelArray[2].ytrans, pacmanmodelArray[2].ztrans, 2);
                    transformation(pacmanmodelArray[3].xtrans, pacmanmodelArray[3].ytrans, pacmanmodelArray[3].ztrans, 3);

                    pacmanmodelArray[0].ydegree = 0;
                    pacmanmodelArray[1].ydegree = 0;
                    pacmanmodelArray[2].ydegree = 0;
                    pacmanmodelArray[3].ydegree = 0;
                    if (getmouth() % 2 != 0) {
                        pacmanmodelArray[0].xdegree = 45;
                        pacmanmodelArray[1].xdegree = 45;
                        pacmanmodelArray[2].xdegree = 45;
                        pacmanmodelArray[3].xdegree = -45;
                    } else {
                        pacmanmodelArray[0].xdegree = 0;
                        pacmanmodelArray[1].xdegree = 0;
                        pacmanmodelArray[2].xdegree = 0;
                        pacmanmodelArray[3].xdegree = 0;
                    }
                    rotation(pacmanmodelArray[0].zdegree, pacmanmodelArray[0].ydegree, pacmanmodelArray[0].xdegree, 0);
                    rotation(pacmanmodelArray[1].zdegree, pacmanmodelArray[1].ydegree, pacmanmodelArray[1].xdegree, 1);
                    rotation(pacmanmodelArray[2].zdegree, pacmanmodelArray[2].ydegree, pacmanmodelArray[2].xdegree, 2);
                    rotation(pacmanmodelArray[3].zdegree, pacmanmodelArray[3].ydegree, pacmanmodelArray[3].xdegree, 3);
                    addmouth();
                    console.log(pacmanmodelArray[0].ytrans);

                    break;
                case 40:
                    console.log("Down key");
                    pacmanmodelArray[0].ztrans = pacmanmodelArray[0].ztrans + 1;
                    pacmanmodelArray[1].ztrans = pacmanmodelArray[1].ztrans + 1;
                    pacmanmodelArray[2].ztrans = pacmanmodelArray[2].ztrans + 1;
                    pacmanmodelArray[3].ztrans = pacmanmodelArray[3].ztrans + 1;
                    transformation(pacmanmodelArray[0].xtrans, pacmanmodelArray[0].ytrans, pacmanmodelArray[0].ztrans, 0);
                    transformation(pacmanmodelArray[1].xtrans, pacmanmodelArray[1].ytrans, pacmanmodelArray[1].ztrans, 1);
                    transformation(pacmanmodelArray[2].xtrans, pacmanmodelArray[2].ytrans, pacmanmodelArray[2].ztrans, 2);
                    transformation(pacmanmodelArray[3].xtrans, pacmanmodelArray[3].ytrans, pacmanmodelArray[3].ztrans, 3);


                    pacmanmodelArray[0].ydegree = 180;
                    pacmanmodelArray[1].ydegree = 180;
                    pacmanmodelArray[2].ydegree = 180;
                    pacmanmodelArray[3].ydegree = 180;
                    if (getmouth() % 2 != 0) {
                        pacmanmodelArray[0].xdegree = 45;
                        pacmanmodelArray[1].xdegree = 45;
                        pacmanmodelArray[2].xdegree = 45;
                        pacmanmodelArray[3].xdegree = -45;

                    } else {
                        pacmanmodelArray[0].xdegree = 0;
                        pacmanmodelArray[1].xdegree = 0;
                        pacmanmodelArray[2].xdegree = 0;
                        pacmanmodelArray[3].xdegree = 0;
                    }
                    rotation(pacmanmodelArray[0].zdegree, pacmanmodelArray[0].ydegree, pacmanmodelArray[0].xdegree, 0);
                    rotation(pacmanmodelArray[1].zdegree, pacmanmodelArray[1].ydegree, pacmanmodelArray[1].xdegree, 1);
                    rotation(pacmanmodelArray[2].zdegree, pacmanmodelArray[2].ydegree, pacmanmodelArray[2].xdegree, 2);
                    rotation(pacmanmodelArray[3].zdegree, pacmanmodelArray[3].ydegree, pacmanmodelArray[3].xdegree, 3);
                    addmouth();
                    console.log(pacmanmodelArray[0].ytrans);
                    break;

            }
        }
    };

    //all together with functions in interaction section
    //for everything, just in case
    var modelNumber = -2;
    document.addEventListener("keydown", function (numberScript) {
        if (numberScript.keyCode == 48) {
            modelNumber = -1;
        }

        //hit enter to start game
        if (numberScript.keyCode == 13) {
            modelNumber = 0;
            console.log(modelNumber);
        }

    });
    //
    function mybasic(e) { Basic(e, modelNumber); }
    function myOtherfunction(e) { translationArrow(e, modelNumber); };
    function myfunction(e) { cameraArrow(e); };


    document.addEventListener("keydown", function (newScript) {

        document.addEventListener("keydown", mybasic(newScript));
        document.addEventListener("keydown", myOtherfunction(newScript));
        document.addEventListener("keydown", myfunction(newScript));


    });





}
