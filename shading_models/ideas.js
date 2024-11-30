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