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
    //<script src="shadersetupPhong.js"></script>
    //<script src="shadersetup.js"></script>

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
    
    var objbufferArray = [];
    var bufferArray = [];
    
    for (i = 0; i < mynewpyramids.length; i++) {
        var newBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, newBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mynewpyramids[i]), gl.STATIC_DRAW);
        bufferArray.push(newBuffer);
    };
    
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pyramidnormal), gl.STATIC_DRAW);


    console.log(bufferArray)
    /////////////////////////////////////////

    /////////////////////////////////////////
    function drawOne(number) {
        console.log("drawOne called");
        normaldraw(gl, program, bufferArray[number], positionLoc, colorLoc);
        //shadedraw(gl, program, normalArray[number], normalLoc);
    }
    
   
    var length = 0;
    function drawObj() {
        if (objVertexArray.length != 0) {
            console.log(objVertexArray.length);
            console.log("draw OBJ begin");

            stackanddraw()
            console.log(objbufferArray)

            for (i = 0; i < objbufferArray.length; i++) {
                var temp = glMatrix.mat4.create();
                var matObjUniformLocation = gl.getUniformLocation(program, 'objectMatrix');
                gl.uniformMatrix4fv(matObjUniformLocation, gl.FALSE, temp);
                objdraw(gl, program, objbufferArray[i], positionLoc, colorLoc, length);
            };
        } else {
            return;
        };

    }

    gl.useProgram(program);

    var matWorldUniformLocation = gl.getUniformLocation(program, 'worldMatrix');
    var matViewUniformLocation = gl.getUniformLocation(program, 'viewMatrix');
    var matProjUniformLocation = gl.getUniformLocation(program, 'projectionMatrix');
    //var matObjUniformLocation = gl.getUniformLocation(program, 'objectMatrix');

    const ProjMatrix = glMatrix.mat4.create();
    const ViewMatrix = glMatrix.mat4.create();
    const WorldMatrix = glMatrix.mat4.create();

    //draw 8 different pyramids at different location on world, their transformation is stored in the ModelMatrix
    var ModelMatrixArray = [];
    for (i = 0; i < mynewpyramids.length; i++) {
        if (i > 4) {
            var ObjMatrix = glMatrix.mat4.create();
            ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [3, 0, -6 * i + 30]);
        } else {
            var ObjMatrix = glMatrix.mat4.create();
            ObjMatrix = glMatrix.mat4.translate(ObjMatrix, ObjMatrix, [0, 0, -6 * i]);
        }
        ModelMatrixArray.push(ObjMatrix);
    }

    console.log(ModelMatrixArray)
    glMatrix.mat4.lookAt(ViewMatrix, [3, 3, 9], [0, 0, 0], [0, 1, 0]);//camera
    glMatrix.mat4.perspective(ProjMatrix, glMatrix.glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);

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
        drawOne(i);
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

    }

    console.log(modelArray)

    function uniforms() {
        gl.useProgram(program);

        var matWorldUniformLocation = gl.getUniformLocation(program, 'worldMatrix');
        var matViewUniformLocation = gl.getUniformLocation(program, 'viewMatrix');
        var matProjUniformLocation = gl.getUniformLocation(program, 'projectionMatrix');
        //var matObjUniformLocation = gl.getUniformLocation(program, 'objectMatrix');
        
        var matLightUniformLocation = gl.getUniformLocation(program, 'lightVec');
        var LightMatrixT = [lightX, lightY, lightZ];
        gl.uniform3fv(matLightUniformLocation, LightMatrixT);

        const ProjMatrix = glMatrix.mat4.create();
        const ViewMatrix = glMatrix.mat4.create();
        const WorldMatrix = glMatrix.mat4.create();

        console.log(ModelMatrixArray)
        glMatrix.mat4.lookAt(ViewMatrix, [3, 3, 9], [0, 0, 0], [0, 1, 0]);//camera
        glMatrix.mat4.perspective(ProjMatrix, glMatrix.glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);

        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, WorldMatrix);
        gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, ViewMatrix);
        gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, ProjMatrix);
        //world matrix stored separately than models--have to update the worldmatrix separatly
        var finalMatrix = glMatrix.mat4.create();
        var prefinalMatrix = glMatrix.mat4.create();

        glMatrix.mat4.mul(prefinalMatrix, worldrotation, worldscale);
        glMatrix.mat4.mul(finalMatrix, worldtrans, prefinalMatrix);
        var matWorldUniformLocation = gl.getUniformLocation(program, 'worldMatrix');
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, finalMatrix);

        glMatrix.mat4.lookAt(ViewMatrix, [3, 3, 9], [x, y, 0], [0, 1, 0]);
        var matViewUniformLocation = gl.getUniformLocation(program, 'viewMatrix');
        gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, ViewMatrix);


        stackanddraw();
        drawObj();
        
    }


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
            if (modelArray[whichone].xdegree == 360 || modelArray[whichone].xdegree == -360) {
                modelArray[whichone].xdegree = 0;
            }
            if (modelArray[whichone].ydegree == 360 || modelArray[whichone].ydegree == -360) {
                modelArray[whichone].ydegree = 0;
            }
            if (modelArray[whichone].zdegree == 360 || modelArray[whichone].zdegree == -360) {
                modelArray[whichone].zdegree = 0;
            }
            modelArray[whichone].xrotatemat = xRotateMatrix;
            modelArray[whichone].yrotatemat = yRotateMatrix;
            modelArray[whichone].zrotatemat = zRotateMatrix;

            var bridge = glMatrix.mat4.create();
            glMatrix.mat4.mul(bridge, modelArray[whichone].yrotatemat, modelArray[whichone].zrotatemat);
            glMatrix.mat4.mul(rotationMatrix, modelArray[whichone].xrotatemat, bridge);

            modelArray[whichone].rotatemat = rotationMatrix;

            var finalMatrix = glMatrix.mat4.create();
            var prefinalMatrix = glMatrix.mat4.create();
            glMatrix.mat4.mul(prefinalMatrix, modelArray[whichone].rotatemat, modelArray[whichone].scalemat);
            glMatrix.mat4.mul(finalMatrix, modelArray[whichone].transmat, prefinalMatrix);
            modelArray[whichone].modelmat = finalMatrix;
            //console.log(modelArray[whichone])
            //console.log(finalMatrix)
        }

        stackanddraw()
        drawObj();
    };

    //scaling width height depth
    worldwidth = 1;
    worldheight = 1;
    worlddepth = 1;

    function scaling(widthValue, heightValue, depthValue, whichone) {     
        if (whichone == -1) {
            var scalingMatrix = glMatrix.mat4.create();
            worldwidth = widthValue;
            worldheight = heightValue;
            worlddepth = depthValue;
            var tempscalingMatrix = [
                worldwidth, 0, 0, 0,
                0, worldheight, 0, 0,
                0, 0, worlddepth, 0,
                0, 0, 0, 1
            ];
            glMatrix.mat4.mul(scalingMatrix, identityMatrix, tempscalingMatrix);

            worldscale = scalingMatrix;
            var finalMatrix = glMatrix.mat4.create();
            var prefinalMatrix = glMatrix.mat4.create();

            glMatrix.mat4.mul(prefinalMatrix, worldrotation, worldscale);
            glMatrix.mat4.mul(finalMatrix, worldtrans, prefinalMatrix);
            var matWorldUniformLocation = gl.getUniformLocation(program, 'worldMatrix');
            gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, finalMatrix);
        } else {
            var scalingMatrix = glMatrix.mat4.create();
            modelArray[whichone].width = widthValue;
            modelArray[whichone].height = heightValue;
            modelArray[whichone].depth = depthValue;
            var tempscalingMatrix = [
                modelArray[whichone].width, 0, 0, 0,
                0, modelArray[whichone].height, 0, 0,
                0, 0, modelArray[whichone].depth, 0,
                0, 0, 0, 1
            ];
            glMatrix.mat4.mul(scalingMatrix, identityMatrix, tempscalingMatrix);
            modelArray[whichone].scalemat = scalingMatrix;

            var finalMatrix = glMatrix.mat4.create();
            var prefinalMatrix = glMatrix.mat4.create();
            glMatrix.mat4.mul(prefinalMatrix, modelArray[whichone].rotatemat, modelArray[whichone].scalemat);
            glMatrix.mat4.mul(finalMatrix, modelArray[whichone].transmat, prefinalMatrix);
            modelArray[whichone].modelmat = finalMatrix;
        }

        stackanddraw()
        drawObj();
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
            modelArray[whichone].xtrans = xtransValue;
            modelArray[whichone].ytrans = ytransValue;
            modelArray[whichone].ztrans = ztransValue;
            var temptransMatrix = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                modelArray[whichone].xtrans, modelArray[whichone].ytrans, modelArray[whichone].ztrans, 1
            ];

            glMatrix.mat4.mul(transformationMatrix, identityMatrix, temptransMatrix);
            modelArray[whichone].transmat = transformationMatrix;

            var finalMatrix = glMatrix.mat4.create();
            var prefinalMatrix = glMatrix.mat4.create();
            glMatrix.mat4.mul(prefinalMatrix, modelArray[whichone].rotatemat, modelArray[whichone].scalemat);
            glMatrix.mat4.mul(finalMatrix, modelArray[whichone].transmat, prefinalMatrix);
            modelArray[whichone].modelmat = finalMatrix;
        }

        stackanddraw()
        drawObj();
    };

    //camera movement left right up down
    var x = 0;
    var y = 0;
    function movecamera(xValue, yValue) {
        x = xValue;
        y = yValue;
        glMatrix.mat4.lookAt(ViewMatrix, [3, 3, 9], [x, y, 0], [0, 1, 0]);
        var matViewUniformLocation = gl.getUniformLocation(program, 'viewMatrix');
        gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, ViewMatrix);

        stackanddraw()
        drawObj();

    };
    var lightX = 0;
    var lightY = 0;
    var lightZ = 0;
    function movelight(xlight, ylight, zlight) {
        lightX = xlight;
        lightY = ylight;
        lightZ = zlight;

        var matLightUniformLocation = gl.getUniformLocation(program, 'lightVec');
        var LightMatrixT = [lightX, lightY, lightZ];
        gl.uniform3fv(matLightUniformLocation, LightMatrixT);
        stackanddraw()
        drawObj();

    }

    //interaction section
    //all transformation except arrow keys



    function Basic(script, modelNumber) {
        console.log("ENTERED Basic");
        if (modelNumber == -1) {
            switch (script.keyCode) {
                case (script.shiftKey == true && 88):
                    worldwidth = worldwidth * 1.1;
                    scaling(worldwidth, worldheight, worlddepth, modelNumber);
                    break;
                case 88:
                    worldwidth = worldwidth * 0.9;
                    scaling(worldwidth, worldheight, worlddepth, modelNumber);
                    break;
                case (script.shiftKey == true && 89):
                    worldheight = worldheight * 1.1;
                    scaling(worldwidth, worldheight, worlddepth, modelNumber);
                    break;
                case 89:
                    worldheight = worldheight * 0.9;
                    scaling(worldwidth, worldheight, worlddepth, modelNumber);
                    break;
                case (script.shiftKey == true && 90):
                    worlddepth = worlddepth * 1.1;
                    scaling(worldwidth, worldheight, worlddepth, modelNumber);
                    break;
                case 90:
                    worlddepth = worlddepth * 0.9;
                    scaling(worldwidth, worldheight, worlddepth, modelNumber);
                    break;
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
                case (script.shiftKey == true && 88):
                    console.log("upper X key");
                    modelArray[modelNumber].width = modelArray[modelNumber].width * 1.1;
                    console.log(modelArray[modelNumber].width);
                    scaling(modelArray[modelNumber].width, modelArray[modelNumber].height, modelArray[modelNumber].depth, modelNumber);
                    break;
                case 88:
                    console.log("lower X key");
                    modelArray[modelNumber].width = modelArray[modelNumber].width * 0.9;
                    console.log(modelArray[modelNumber].width);
                    scaling(modelArray[modelNumber].width, modelArray[modelNumber].height, modelArray[modelNumber].depth, modelNumber);
                    break;
                case (script.shiftKey == true && 89):
                    console.log("upper Y key");
                    modelArray[modelNumber].height = modelArray[modelNumber].height * 1.1;
                    console.log(modelArray[modelNumber].height);
                    scaling(modelArray[modelNumber].width, modelArray[modelNumber].height, modelArray[modelNumber].depth, modelNumber);
                    break;
                case 89:
                    console.log("lower Y key");
                    modelArray[modelNumber].height = modelArray[modelNumber].height * 0.9;
                    console.log(modelArray[modelNumber].height);
                    scaling(modelArray[modelNumber].width, modelArray[modelNumber].height, modelArray[modelNumber].depth, modelNumber);
                    break;
                case (script.shiftKey == true && 90):
                    console.log("upper Z key");
                    modelArray[modelNumber].depth = modelArray[modelNumber].depth * 1.1;
                    console.log(modelArray[modelNumber].depth);
                    scaling(modelArray[modelNumber].width, modelArray[modelNumber].height, modelArray[modelNumber].depth, modelNumber);
                    break;
                case 90:
                    console.log("lower Z key");
                    modelArray[modelNumber].depth = modelArray[modelNumber].depth * 0.9;
                    console.log(modelArray[modelNumber].depth);
                    scaling(modelArray[modelNumber].width, modelArray[modelNumber].height, modelArray[modelNumber].depth, modelNumber);
                    break;
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
                x = x + 3;
                console.log(x);
                movecamera(x, y);
                break;
            case 37:
                console.log("Left key");
                x = x - 3;
                console.log(x);
                movecamera(x, y);
                break;
            case 38:
                console.log("Up key");
                y = y + 3;
                console.log(y);
                movecamera(x, y);
                break;
            case 40:
                console.log("Down key");
                y = y - 3;
                console.log(y);
                movecamera(x, y);
                break;

        }
    };
    //arrow keys camera deactivated
    function translationArrow(script, modelNumber) {
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
            switch (script.keyCode) {
                case 39:
                    console.log("Right key");
                    modelArray[modelNumber].xtrans = modelArray[modelNumber].xtrans + 1;
                    console.log(modelArray[modelNumber].xtrans);
                    transformation(modelArray[modelNumber].xtrans, modelArray[modelNumber].ytrans, modelArray[modelNumber].ztrans, modelNumber);
                    break;
                case 37:
                    console.log("Left key");
                    modelArray[modelNumber].xtrans = modelArray[modelNumber].xtrans - 1;
                    console.log(modelArray[modelNumber].xtrans);
                    transformation(modelArray[modelNumber].xtrans, modelArray[modelNumber].ytrans, modelArray[modelNumber].ztrans, modelNumber);
                    break;
                case 38:
                    console.log("Up key");
                    modelArray[modelNumber].ytrans = modelArray[modelNumber].ytrans + 1;
                    console.log(modelArray[modelNumber].ytrans);
                    transformation(modelArray[modelNumber].xtrans, modelArray[modelNumber].ytrans, modelArray[modelNumber].ztrans, modelNumber);
                    break;
                case 40:
                    console.log("Down key");
                    modelArray[modelNumber].ytrans = modelArray[modelNumber].ytrans - 1;
                    console.log(modelArray[modelNumber].ytrans);
                    transformation(modelArray[modelNumber].xtrans, modelArray[modelNumber].ytrans, modelArray[modelNumber].ztrans, modelNumber);
                    break;
                case 188:
                    console.log("Comma key");
                    modelArray[modelNumber].ztrans = modelArray[modelNumber].ztrans + 1;
                    console.log(modelArray[modelNumber].ztrans);
                    transformation(modelArray[modelNumber].xtrans, modelArray[modelNumber].ytrans, modelArray[modelNumber].ztrans, modelNumber);
                    break;
                case 190:
                    console.log("Dot key");
                    modelArray[modelNumber].ztrans = modelArray[modelNumber].ztrans - 1;
                    console.log(modelArray[modelNumber].ztrans);
                    transformation(modelArray[modelNumber].xtrans, modelArray[modelNumber].ytrans, modelArray[modelNumber].ztrans, modelNumber);
                    break;
            }
        }
    };
    //light movement
    function lightArrow(script) {
        switch (script.keyCode) {
            case 39:
                console.log("Right key");
                lightX = lightX + 3;
                movelight(lightX, lightY, lightZ);
                break;
            case 37:
                console.log("Left key");
                lightX = lightX - 3;
                movelight(lightX, lightY, lightZ);
                break;
            case 38:
                console.log("Up key");
                lightY = lightY + 3;
                movelight(lightX, lightY, lightZ);
                break;
            case 40:
                console.log("Down key");
                lightY = lightY - 3;
                movelight(lightX, lightY, lightZ);
                break;
            case 188:
                lightZ = lightZ + 1;
                movelight(lightX, lightY, lightZ);
                break;
            case 190:
                lightZ = lightZ - 1;
                movelight(lightX, lightY, lightZ);
                break;

        }
    };

    //all together with functions in interaction section
    var modelNumber = -2;
    var pressCounter = 0;
    var pressSecondCounter = 0;
    var choosedModel = "on";
    var lightCounter = 0;
    var lightSecondCounter = 0;
    
    document.addEventListener("keydown", function (numberScript) {
           
        if (numberScript.keyCode >= 48 && numberScript.keyCode <= 57) {
            modelNumber = parseInt(numberScript.key) - 1;
            console.log(modelNumber);
        }

    });

    function mybasic(e) { Basic(e, modelNumber); }
    function myOtherfunction(e) { translationArrow(e, modelNumber); };
    function myfunction(e) { cameraArrow(e); };
    function myOtherOtherfunction(e) { lightArrow(e) };
    //close the camera before opening the light (do a alert later)
    //correct, when no model is selected
    document.addEventListener("keydown", function (CameraScript) {
        if (CameraScript.keyCode == 67 && modelNumber == -2 && pressCounter % 2 == 0) {
            document.removeEventListener("keydown", myOtherOtherfunction);
            document.addEventListener("keydown", myfunction);
            ++pressCounter;
            console.log(pressCounter);
            console.log("first");
        } else if (CameraScript.keyCode == 67 && modelNumber == -2 && pressCounter % 2 != 0) {
            document.removeEventListener("keydown", myfunction);
            ++pressCounter;
            console.log("removed");
        } else if (CameraScript.keyCode == 76 && modelNumber == -2 && lightCounter % 2 == 0) {
            //document.removeEventListener("keydown", myfunction);
            document.addEventListener("keydown", myOtherOtherfunction);
            ++lightCounter;

        } else if (CameraScript.keyCode == 76 && modelNumber == -2 && lightCounter % 2 != 0) {
            document.removeEventListener("keydown", myOtherOtherfunction);
            ++lightCounter;

        } 
    });

    //correct, when one model is selected
    document.addEventListener("keydown", function (newScript) {
        if (modelNumber != -2 && choosedModel == "on") {
            console.log("this first FUNCTION")
            //Basic(newScript, modelNumber);
            document.addEventListener("keydown", mybasic);
            document.addEventListener("keydown", myOtherfunction);
            choosedModel = "false";
            //translationArrow(newScript, modelNumber);
        } else if (modelNumber != -2 && newScript.keyCode == 67 && pressSecondCounter % 2 == 0) {
            console.log(".................");
            document.removeEventListener("keydown", myOtherfunction);
            document.addEventListener("keydown", myfunction);
            ++pressSecondCounter;
        } else if (modelNumber != -2 && newScript.keyCode == 67 && pressSecondCounter % 2 != 0) {
            document.removeEventListener("keydown", myfunction);
            document.addEventListener("keydown", myOtherfunction);
            ++pressSecondCounter;
        } else if (modelNumber != -2 && newScript.keyCode == 76 && lightSecondCounter % 2 == 0) {
            document.removeEventListener("keydown", myOtherfunction);
            document.addEventListener("keydown", myOtherOtherfunction);
            ++lightSecondCounter;
        } else if (modelNumber != -2 && newScript.keyCode == 76 && lightSecondCounter % 2 != 0) {
            document.removeEventListener("keydown", myOtherOtherfunction);
            document.addEventListener("keydown", myOtherfunction);
            ++lightSecondCounter;
        } 
    });




    // shaders
    //Grouraud diffuse and specular
    const fsGouraudD = gl.createShader(gl.FRAGMENT_SHADER);
    const vsGouraudD = gl.createShader(gl.VERTEX_SHADER);
    const fsGouraudS = gl.createShader(gl.FRAGMENT_SHADER);
    const vsGouraudS = gl.createShader(gl.VERTEX_SHADER);
    //Phong diffuse and specular
    const fsPhongD = gl.createShader(gl.FRAGMENT_SHADER);
    const vsPhongD = gl.createShader(gl.VERTEX_SHADER);
    const fsPhongS = gl.createShader(gl.FRAGMENT_SHADER);
    const vsPhongS = gl.createShader(gl.VERTEX_SHADER);

    console.log(gl.getShaderSource(fsNormal))
    console.log(gl.getShaderSource(vsNormal))
    document.addEventListener("keydown", function (firstScript) {
        if (firstScript.keyCode == 79) {
            console.log("Phong/Diffuse")
            detach(gl, program, fshader, vshader);

            vshader = vsPhongD;
            fshader = fsPhongD;
            vsource = vertexShaderSourcePd;
            fsource = fragmentShaderSourcePd;

            shadersetup(gl, program, fshader, vshader, fsource, vsource);
            uniforms();
        } else if (firstScript.keyCode == 80) {
            console.log("Phong/Specular")
            detach(gl, program, fshader, vshader);

            vshader = vsPhongS;
            fshader = fsPhongS;
            vsource = vertexShaderSourcePs;
            fsource = fragmentShaderSourcePs;

            shadersetup(gl, program, fshader, vshader, fsource, vsource);
            uniforms();
        } else if (firstScript.keyCode == 85) {
            console.log("Gouraud/Diffuse")
            detach(gl, program, fshader, vshader);

            vshader = vsGouraudD;
            fshader = fsGouraudD;
            vsource = vertexShaderSourceGd;
            fsource = fragmentShaderSourceGd;

            shadersetup(gl, program, fshader, vshader, fsource, vsource);
            uniforms();
        } else if (firstScript.keyCode == 73) {
            console.log("Gouraud/Specular")
            detach(gl, program, fshader, vshader);

            vshader = vsGouraudS;
            fshader = fsGouraudS;
            vsource = vertexShaderSourceGs;
            fsource = fragmentShaderSourceGs;

            shadersetup(gl, program, fshader, vshader, fsource, vsource);
            uniforms();
        } 

    });

    //load obj file section
    var objVertexArray = [];
    const input = document.getElementById('content');
    input.addEventListener('change', (e) => {
        var vArray = [];
        var fArray = [];
        var v2Array = [];
        var f2Array = [];
        var finalVarray = [];
        var finalFarray = [];

        const fileList = e.target.files;
        var file = fileList[0];
        console.log(file);
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = function (e) {
            var data = reader.result;
            //data = reader.result;

            //separate whole data for each line
            var lines = data.split(/\n/);
            for (i = 0; i < lines.length; i++) {
                //idea
                //if the line starts with v, cut the "v" in the beginning and put then in an Array
                //if the line starts with f, cut the "f" in the beginning and put them in an new Array

                if (lines[i].startsWith("v")) {
                    vArray.push(lines[i].substr(2, lines[i].length));

                } else if (lines[i].startsWith("f")) {
                    fArray.push(lines[i].substr(2, lines[i].length));
                } else {
                    //dont do anything
                }
            }
            //idea
            //for each one separate the numbers by " "
            //put them into a new array and merged them all (only for faces, dont merge vertex) 
            for (i = 0; i < fArray.length; i++) {
                var faces = fArray[i].split(" ");//get individual vertex
                f2Array.push(faces);

            }
            //for later face count
            console.log(f2Array);
            //then merge it
            finalFarray = [].concat.apply([], f2Array);
            //face length for drawing later
            length = length + f2Array.length * 3;

            for (i = 0; i < vArray.length; i++) {
                var verticies = vArray[i].split(" ");//get individual vertex
                v2Array.push(verticies);

            }
            //idea
            //faces reprecent which row of vertecies forms a face, but array starts with 0
            //so each time minus 1 to get the position of the vertecies
            //then put the correct order of vertecies into a new array
            //concat them with a color each
            //merge the array, add the array to outside var (objVertexArray: array of array) 
            //fin
            for (i = 0; i < finalFarray.length; i++) {
                finalVarray.push(v2Array[parseInt(finalFarray[i]) - 1]);
            }

            var color = ["0", "0", "1"];
            for (i = 0; i < finalFarray.length; i++) {
                //var color = [Math.random().toString(), Math.random().toString(), Math.random().toString()];
                finalVarray[i] = finalVarray[i].concat(color);
            }

            //merge
            finalVarray = [].concat.apply([], finalVarray);
            objVertexArray.push(finalVarray);
            for (i = 0; i < objVertexArray.length; i++) {
                var newBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, newBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objVertexArray[i]), gl.STATIC_DRAW);
                objbufferArray.push(newBuffer);
            };

            drawObj();
            console.log("after function");
            //console.log(lines[0]);//first line
            //console.log(lines[0][0]);//first char of code
        };
    });
    var objFaceArray = [];
    console.log(objVertexArray);

    var objbufferArray = [];


}
