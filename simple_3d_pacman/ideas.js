//lighting 
const crossout = glMatrix.vec3.create();
const crossout1 = glMatrix.vec3.create();
var a = glMatrix.vec3.create();
var b = glMatrix.vec3.create();

console.log(crossout);
glMatrix.vec3.subtract(a, [1, 0, -1], [1, 0, 1]);
glMatrix.vec3.subtract(b, [-1, 0, 1], [1, 0, 1]);
glMatrix.vec3.cross(crossout, b, a);
console.log("CROSSOUT");
glMatrix.vec3.normalize(crossout1, crossout)
console.log(crossout1);


    //var normalLoc = gl.getAttribLocation(program, 'vecNormal');

    /*gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.vertexAttribPointer(
        normalLoc,
        3,//elements per attribute
        gl.FLOAT,
        gl.FALSE,
        0 * Float32Array.BYTES_PER_ELEMENT, //size of individual vertex,(0=use the type above, usually 3)
        0//offset
    );
    gl.enableVertexAttribArray(normalLoc);*/



    /*for (i = 0; i < mynormals.length; i++) {
        var normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mynormals[i]), gl.STATIC_DRAW);
        normalArray.push(normalBuffer);
    }*/



    /*
            switch (firstScript.keyCode) {
            case 85:
                console.log("Gouraud");
                //detach(gl, program, fsNormal, vsNormal);
                //detach(gl, program, fsPhong, vsPhong);
                console.log("Detached")
                shadersetup(gl, program, fsGouraud, vsGouraud, fragmentShaderSourceG, vertexShaderSourceG);

                break;

            case 79:
                console.log("Phong");
                //detach(gl, program, fshader, vshader);
                //detach(gl, program, fsGouraud, vsGouraud);
                //shadersetup(gl, program, fsPhong, vsPhong, fragmentShaderSourceP, vertexShaderSourceP);
                p = true;
                console.log(p)
                vshader = vsPhong;
                fshader = fsPhong;
                vsource = vertexShaderSourceP;
                fsource = fragmentShaderSourceP;
    //shadersetup(gl, program, fshader, vshader, fsource, vsource);
    break;

} 
*/



    //swapP();
    //console.log(shaderArray)

    //detach(gl, program, fshader, vshader);
    //detach(gl, program, fsGouraud, vsGouraud);
    //shadersetup(gl, program, fsPhong, vsPhong, fragmentShaderSourceP, vertexShaderSourceP);
    /*
    vshader = vsPhong;
    fshader = fsPhong;
    vsource = vertexShaderSourceP;
    fsource = fragmentShaderSourceP;
    shadersetup(gl, program, fshader, vshader, fsource, vsource);*/

    //shadersetup(gl, program, fsGouraud, vsGouraud, fragmentShaderSourceG, vertexShaderSourceG);

    //detach(gl, program, fsGouraud, vsGouraud);
    //shadersetup(gl, program, fsPhong, vsPhong, fragmentShaderSourceP, vertexShaderSourceP);






var vshader;
var fshader;
var vsource;
var fsource;

vshader = vsNormal;
fshader = fsNormal;
vsource = vertexShaderSource;
fsource = fragmentShaderSource;

function uniforms() {
    var program = gl.createProgram();
    gl.useProgram(program);

    var matWorldUniformLocation = gl.getUniformLocation(program, 'worldMatrix');
    var matViewUniformLocation = gl.getUniformLocation(program, 'viewMatrix');
    var matProjUniformLocation = gl.getUniformLocation(program, 'projectionMatrix');
    var matObjUniformLocation = gl.getUniformLocation(program, 'objectMatrix');

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
    var modelArray = [];
    for (i = 0; i < ModelMatrixArray.length; i++) {
        var identityMatrix = glMatrix.mat4.create();
        const model = new Model(identityMatrix, identityMatrix, identityMatrix, identityMatrix, identityMatrix, identityMatrix, identityMatrix);
        modelArray.push(model);
        gl.uniformMatrix4fv(matObjUniformLocation, gl.FALSE, ModelMatrixArray[i]);
        drawOne(i);
    }

}










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




switch (script.keyCode) {
    case 39:
        console.log("Right key");
        objVertexArray[modelNumber].xtrans = objVertexArray[modelNumber].xtrans + 1;
        console.log(objVertexArray[modelNumber].xtrans);
        transformation(objVertexArray[modelNumber].xtrans, objVertexArray[modelNumber].ytrans, modelArray[modelNumber].ztrans, modelNumber);
        break;
    case 37:
        console.log("Left key");
        objVertexArray[modelNumber].xtrans = objVertexArray[modelNumber].xtrans - 1;
        console.log(objVertexArray[modelNumber].xtrans);
        transformation(objVertexArray[modelNumber].xtrans, objVertexArray[modelNumber].ytrans, modelArray[modelNumber].ztrans, modelNumber);
        break;
    case 38:
        console.log("Up key");
        objVertexArray[modelNumber].ytrans = objVertexArray[modelNumber].ytrans + 1;
        console.log(objVertexArray[modelNumber].ytrans);
        transformation(objVertexArray[modelNumber].xtrans, objVertexArray[modelNumber].ytrans, modelArray[modelNumber].ztrans, modelNumber);
        break;
    case 40:
        console.log("Down key");
        objVertexArray[modelNumber].ytrans = objVertexArray[modelNumber].ytrans - 1;
        console.log(objVertexArray[modelNumber].ytrans);
        transformation(objVertexArray[modelNumber].xtrans, objVertexArray[modelNumber].ytrans, modelArray[modelNumber].ztrans, modelNumber);
        break;
    case 188:
        console.log("Comma key");
        objVertexArray[modelNumber].ztrans = objVertexArray[modelNumber].ztrans + 1;
        console.log(objVertexArray[modelNumber].ztrans);
        transformation(objVertexArray[modelNumber].xtrans, objVertexArray[modelNumber].ytrans, modelArray[modelNumber].ztrans, modelNumber);
        break;
    case 190:
        console.log("Dot key");
        objVertexArray[modelNumber].ztrans = objVertexArray[modelNumber].ztrans - 1;
        console.log(objVertexArray[modelNumber].ztrans);
        transformation(objVertexArray[modelNumber].xtrans, objVertexArray[modelNumber].ytrans, modelArray[modelNumber].ztrans, modelNumber);
        break;
}


//loader

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
        //console.log(f2Array);
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

        var color = [0, 0, 0];
        for (i = 0; i < finalFarray.length; i++) {
            //var color = [Math.random().toString(), Math.random().toString(), Math.random().toString()];
            finalVarray[i] = finalVarray[i].concat(color);
        }

        //merge
        finalVarray = [].concat.apply([], finalVarray);
        //convert everything into a float
        for (i = 0; i < finalVarray.length; i++) {
            finalVarray[i] = parseFloat(finalVarray[i]);
        }

        objVertexArray.push(finalVarray);
        for (i = 0; i < objVertexArray.length; i++) {
            var newBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, newBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objVertexArray[i]), gl.STATIC_DRAW);
            objbufferArray.push(newBuffer);
        };
        console.log(finalVarray);

        var store = JSON.stringify(finalVarray);
        localStorage.setItem('users', store);
        /*var fs = require('fs');
        var file = fs.createWriteStream('array.txt');
        file.on('error', function (err) {});
        arr.forEach(function (v) { file.write(v + '\n'); });
        file.end();*/


        //createPacman();
        //drawObj();
        console.log("after function");
        //console.log(lines[0]);//first line
        //console.log(lines[0][0]);//first char of code
    };
});
var objFaceArray = [];
console.log(objVertexArray[0]);

var objbufferArray = [];

//input file
<input type="file" id="content">
//obj draw
    

    /*function drawObj() {
        if (objVertexArray.length != 0) {
            //console.log(objVertexArray[0]);
            console.log("draw OBJ begin");

            stackanddraw()
            console.log(objbufferArray.length)

            for (i = 0; i < objbufferArray.length; i++) {
                var temp = glMatrix.mat4.create();
                gl.uniformMatrix4fv(matObjUniformLocation, gl.FALSE, temp);
                objdraw(gl, program, objbufferArray[i], positionLoc, colorLoc, length);
            };
        } else {
            return;
};

}*/




//scale
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
//drawObj();
};



//close the camera before opening the light (do a alert later)
//correct, when no model is selected
    /*document.addEventListener("keydown", function (CameraScript) {
        if (CameraScript.keyCode == 67 && modelNumber == -2 && pressCounter % 2 == 0) {
        document.addEventListener("keydown", myfunction);
    ++pressCounter;
    console.log(pressCounter);
    console.log("first");
        } else if (CameraScript.keyCode == 67 && modelNumber == -2 && pressCounter % 2 != 0) {
        document.removeEventListener("keydown", myfunction);
    ++pressCounter;
    console.log("removed");
}
});*/

//correct, when one model is selected
    /*document.addEventListener("keydown", function (newScript) {
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
}
});*/
    