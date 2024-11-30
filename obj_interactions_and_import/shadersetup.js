const vertexShaderSource =
    'attribute vec3 vertPosition; \n' +
    'attribute vec3 vertColor; \n' +
    'varying lowp vec3 fragColor; \n' +
    'uniform mat4 worldMatrix; \n' +
    'uniform mat4 viewMatrix; \n' +
    'uniform mat4 projectionMatrix; \n' +
    'uniform mat4 objectMatrix; \n' +
    'void main(){\n' +
    'fragColor = vertColor; \n' +
    'gl_Position= projectionMatrix * viewMatrix * worldMatrix * objectMatrix * vec4(vertPosition, 1);\n' +
    '}';

const fragmentShaderSource =
    'varying lowp vec3 fragColor;\n' + 
    'void main(){ \n' +
    'gl_FragColor = vec4(fragColor, 1);\n' +
    '}';


function shadersetup(gl,program) {

    const vs = gl.createShader(gl.VERTEX_SHADER);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fragmentShaderSource);
    gl.shaderSource(vs, vertexShaderSource);
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

    //combine shader
    //var program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log('Link program ERROR', gl.getProgramInfoLog(program));
        return;
    }

};