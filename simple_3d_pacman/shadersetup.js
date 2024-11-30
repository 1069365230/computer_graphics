function shadersetup(gl, program, fs, vs, fsource, vsource) {
    console.log("ENTER SETUP")
    gl.shaderSource(fs, fsource);
    gl.shaderSource(vs, vsource);
    gl.compileShader(fs);
    gl.compileShader(vs);

    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        console.log('Vertex shader ERROR', gl.getShaderInfoLog(vs));
        return;
    }
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        console.log('Fragment shader ERROR', gl.getShaderInfoLog(fs));
        return;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log('Link program ERROR', gl.getProgramInfoLog(program));
        return;
    }

};

function detach(gl, program, fs, vs) {
    gl.detachShader(program, fs);
    gl.detachShader(program, vs);
    //gl.deleteShader(fs);
    //gl.deleteShader(vs);
}

