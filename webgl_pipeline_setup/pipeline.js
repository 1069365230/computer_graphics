var Initializer = function () {
    var canvas = document.getElementById('surface');
    var gl = canvas.getContext('webgl');

    if (!gl) {
        console.log('shit aint working')
    }
    gl.clearColor(0, 0, 0, 1);//setting color//alpha value always 1
    gl.clear(gl.COLOR_BUFFER_BIT);//perform color paint


    //triangle part
    //shader vertex+fragment
    const vs = gl.createShader(gl.VERTEX_SHADER);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    //set shader source
    //too complex
    //gl.shaderSource(vs, "attribute vec2 vertPosition; \nvoid main(){\n gl_Position = vec4(vertPosition, 0, 1);\n}");
    //gl.shaderSource(fs, "void main(){\n gl_FragColor = vec4(1, 1, 1, 1.0);\n}");
    var vertexShader =
        'attribute vec2 vertPosition;\n' +
        'void main(){\n' +
        'gl_Position=vec4(vertPosition, 0, 1);\n' +
        '}'

    var fragmentShader =
        'void main(){ \n' +
        'gl_FragColor=vec4(1, 1, 1, 1.0);\n' +
        '}'

    gl.shaderSource(vs, vertexShader);
    gl.shaderSource(fs, fragmentShader);

    //complie
    gl.compileShader(vs);
    gl.compileShader(fs);

    //combine shader
    var program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    //for debugging if nessesary

    /*
    //for Vertex shader
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        console.log('VS ERROR', gl.getShaderInfoLog(vs));
        return;
    }
    //for Fragment shader
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        console.log('FS ERROR', gl.getShaderInfoLog(fs));
        return;
    }

    //for linking
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log('LINK ERROR', gl.getProgramInfoLog(program));
        return;
    }
    */
    
    const triVert = [
        0, 0.5,
        -1, -0.9,
        1, -0.9,  
    ];
    //buffer for GPU
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //webgl 32 bit, javascript 64 bit
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triVert), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, 'vertPosition');
    gl.vertexAttribPointer(position, 2, gl.FLOAT, gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT,0);
    gl.enableVertexAttribArray(position);


    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

};