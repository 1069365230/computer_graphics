var Init = function(){
    const {mat4} = glMatrix;
  
    var canvas = document.getElementById("gl-canvas");
    var gl = canvas.getContext('webgl');

    gl.clearColor(0.50,0.50,0.5,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    // Create shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    /*
    //without shading
    var vertexShaderText =
        'precision mediump float;\
        attribute vec3 vertPosition;\
        attribute vec3 vertColor;\
        varying vec3 fragColor;\
        uniform mat4 mWorld;\
        uniform mat4 mView;\
        uniform mat4 mProj;\
        uniform mat4 mMod;\
        void main(){\
        fragColor=vertColor;\
        gl_Position=mProj*mView*mWorld*mMod*vec4(vertPosition, 1.0);\
        }'

    var fragmentShaderText =
        'precision mediump float;\
        varying vec3 fragColor;\
        void main(){ \
        gl_FragColor=vec4(fragColor, 1.0);\
        }'
    */

    //try to do shading but looks weird
    var vertexShaderText =
    'precision mediump float;\
    attribute vec3 vertPosition;\
    attribute vec3 vertColor;\
    varying vec3 fragColor;\
    \
    varying mat4 mWorldv;\
    varying mat4 mModv;\
    varying vec3 vertPositionv;\
    varying vec4 realPos;\
    \
    uniform mat4 mWorld;\
    uniform mat4 mView;\
    uniform mat4 mProj;\
    uniform mat4 mMod;\
    \
    void main(){\
        \
        mWorldv = mWorld;\
        mModv = mMod;\
        vertPositionv = vertPosition;\
        realPos = mProj * mView * mWorld * mMod * vec4(vertPosition, 1.0);\
        fragColor = vertColor;\
        gl_Position = realPos;\
    }';

    var fragmentShaderText =
    'precision mediump float;\
    varying vec3 fragColor;\
    \
    varying mat4 mWorldv;\
    varying mat4 mModv;\
    varying vec3 vertPositionv;\
    varying vec4 realPos;\
    \
    void main(){ \
        \
        vec3 lightposition = vec3(0, 10, 0);\
        vec3 L = normalize(lightposition - vertPositionv);\
        vec3 E = normalize(-vertPositionv);\
        vec4 vnormal = vec4(realPos.xyz, 0.0);\
        vec3 N = normalize((mWorldv * mModv * vnormal).xyz);\
        vec3 H = normalize(L + E);\
        \
        float KS = pow(max(dot(N, H), 0.0), 600.0);\
        float specular = KS;\
        if(dot(L, N)<0.0){\
            specular = 0.0;\
        }\
        \
        float KD = max(dot(L, N), 0.0);\
        float diffuse = KD;\
        \
        float ambient = 0.1;\
        vec3 color = fragColor * (ambient + diffuse + specular);\
        gl_FragColor = vec4(color, 1.0);\
    }';
    
    //Set the shader source
    gl.shaderSource(vertexShader,vertexShaderText);
    gl.shaderSource(fragmentShader,fragmentShaderText);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader); 
    
  
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);


    function render() {
        var positionAttributeLocation = gl.getAttribLocation(program, 'vertPosition');
        var colorAttributeLocation = gl.getAttribLocation(program, 'vertColor');

        gl.vertexAttribPointer(
            positionAttributeLocation,
            3, //number of elements per attribute
            gl.FLOAT,
            gl.FALSE,
            6 * Float32Array.BYTES_PER_ELEMENT, //Size of an individual vertex
            0 //Offset from the beginning of a single vertex to this attribute
        );

        gl.vertexAttribPointer(
            colorAttributeLocation,
            3, //Number of elements per attribute
            gl.FLOAT,
            gl.FALSE,
            6 * Float32Array.BYTES_PER_ELEMENT, //Size of an individual vertex
            3 * Float32Array.BYTES_PER_ELEMENT//Offset from the beginning of a single vertex to this attribute
        );

        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.enableVertexAttribArray(colorAttributeLocation);

        gl.useProgram(program);

    }
    
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    render();

    //Default world setup
    var worldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    var viewUniformLocation = gl.getUniformLocation(program, 'mView');
    var projectionUniformLocation = gl.getUniformLocation(program, 'mProj');
    var modelUniformLocation = gl.getUniformLocation(program, 'mMod');

    var worldMatrix = mat4.create();
    var viewMatrix = mat4.create();
    var projectionMatrix = mat4.create();
    var modelMatrix = mat4.create();

    //Camera
    //lookAt(out, eye, center, up)
    //qqs

    mat4.lookAt(viewMatrix, [8, 10, 26], [0, 0, 0], [0, 1, 0]);
    
    //Perspective
    //perspective(out, fovy, aspect, near, far)
    mat4.perspective(projectionMatrix, glMatrix.glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000);

    
    gl.uniformMatrix4fv(worldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(viewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(projectionUniformLocation, gl.FALSE, projectionMatrix);
    gl.uniformMatrix4fv(modelUniformLocation, gl.FALSE, modelMatrix);


    function drawGrid(x, y, z){
        render();
        var identityMatrix = mat4.create();
        var translateMatrix = mat4.create();
        mat4.translate(translateMatrix, identityMatrix, [x, y, z]);
        gl.uniformMatrix4fv(modelUniformLocation, gl.FALSE, translateMatrix);
        gl.drawArrays(gl.LINES, 0, 2 * 36);
    }

    //Stack cubes and pyramids on screen 
    //Only one complete set of vertices, translate it into different position but do not clear the screen in between
    var objIndices = [];
    var objVertices = [];

    function drawAllTeteris() {
        for (var i = 0; i < objIndices.length; i++) {
            drawObj(objIndices[i], objVertices[i]);
        }
    }

    function drawWorld() {
        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

        //draw terteris
        if (objIndices.length != 0) {
            drawAllTeteris();
        }
 
    }
    function drawGridOnWorld() {
        var bufferThree = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferThree);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(gridVertices), gl.STATIC_DRAW);

        drawGrid(-1.5, 0, 1.5);

    }
    
    drawWorld();

    //save current world matrix

    function changeViewOrtho() {
        //ortho(out, left, right, bottom, top, near, far) 
        mat4.ortho(projectionMatrix, -10.0, 10.0, -10.0, 10.0, 0.1, 10000);
        gl.uniformMatrix4fv(projectionUniformLocation, gl.FALSE, projectionMatrix);

        drawWorld();
        drawObj(objIndices, objVertices);
    }

    function changeViewPerspect() {
        mat4.perspective(projectionMatrix, glMatrix.glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000);
        gl.uniformMatrix4fv(projectionUniformLocation, gl.FALSE, projectionMatrix);

        drawWorld();
        drawObj(objIndices, objVertices);
    }

    function update(translation, rotation, scaling) {
        var temp = mat4.create();
        var update = mat4.create();
        
        mat4.mul(temp, rotation, scaling);
        mat4.mul(update, translation, temp);
        
        gl.uniformMatrix4fv(worldUniformLocation, gl.FALSE, update);
    }

    //math 
    function matrixMul(x, y, z) {
        var temp = mat4.create();
        var output = mat4.create();

        mat4.mul(temp, y, z);
        mat4.mul(output, x, temp);
        return output;

    }

    var identity = mat4.create();
    var rotateMatrix = mat4.create();
    var scaleMatrix = mat4.create();
    var translateMatrix = mat4.create();

    var rotateX = 0;
    var rotateY = 0;
    var rotateZ = 0;

    function rotate(x, y, z) {
       
        var xOut = mat4.create();
        var yOut = mat4.create();
        var zOut = mat4.create();

        rotateX = rotateX + x;
        rotateY = rotateY + y;
        rotateZ = rotateZ + z;

        mat4.rotate(xOut, identity, glMatrix.glMatrix.toRadian(rotateX), [1, 0, 0]);
        mat4.rotate(yOut, identity, glMatrix.glMatrix.toRadian(rotateY), [0, 1, 0]);
        mat4.rotate(zOut, identity, glMatrix.glMatrix.toRadian(rotateZ), [0, 0, 1]);

        rotateMatrix = matrixMul(xOut, yOut, zOut);

        update(translateMatrix, rotateMatrix, scaleMatrix);

        drawWorld();
        drawObj(objIndices, objVertices);
    }

    var translateX = 0;
    var translateY = 0;
    var translateZ = 0;

    function translate(x, y, z) {
        translateX = translateX + x;
        translateY = translateY + y;
        translateZ = translateZ + z;

        mat4.translate(translateMatrix, identity, [translateX, translateY, translateZ]);

        update(translateMatrix, rotateMatrix, scaleMatrix);

        drawWorld();
        drawObj(objIndices, objVertices);
    }

    //two press counter
    //one for "v", one for "g"
    var pressCounter = 0;
    var pressCounterG = 0;
    console.log(pressCounter)

    //mousemove now only act to move from left and right
    //removed up and down
    var screenx = 0;
    function mouseMoveWithGrid(event) {
        if (screenx > event.x) {
            rotate(0, -2, 0);
            drawGridOnWorld();
        }
        if (screenx < event.x) {
            rotate(0, 2, 0);
            drawGridOnWorld();
        }
        screenx = event.x;
    }

    function mouseMoveWithoutGrid(event) {
        if (screenx > event.x) {
            rotate(0, -2, 0);
        }
        if (screenx < event.x) {
            rotate(0, 2, 0);
        }
        screenx = event.x;
    }

    /*function mouseDown() {
        document.addEventListener('mousemove', mouseMove, false);
    }

    function mouseUp() {
        document.removeEventListener('mousemove', mouseMove);
    }

    document.addEventListener('mousedown', mouseDown, false);
    document.addEventListener('mouseup', mouseUp, false);
    */

    //since the requirement is now only moveing mouse and no need for clicking, it does not need both mouseUp and mouseDown function 
    //instead only use mousemove is enought
    //however it can be easily changed by just separating them...
    document.addEventListener('mousemove', mouseMoveWithGrid, false);


    //toggling grid separate the event listener into two parts
    //one is with drawing grid after drawing the world
    //the other one does not
    //the function for drawing grid is called "drawGridOnWorld()"
    function noGrid(event) {
        switch (event.key) {
            case "ArrowDown":
                translate(0, -3, 0);
                break;
            case "ArrowUp":
                translate(0, 3, 0);
                break;
            case "ArrowLeft":
                translate(-3, 0, 0);
                break;
            case "ArrowRight":
                translate(3, 0, 0);
                break;

            //changing view
            case (pressCounter % 2 == 0 && "v"):
                pressCounter++;
                console.log(pressCounter)
                changeViewOrtho();
                console.log("change to orthographic")
                break;
            case (pressCounter % 2 != 0 && "v"):
                pressCounter++;
                console.log(pressCounter)
                changeViewPerspect();
                console.log("change to perspective")
                break;

            case "+":
                //zoom in
                translate(0, 0, 3);
                break;
            case "-":
                //zoom out
                translate(0, 0, -3);
                break;

            case "j":
                //counter clock wise
                console.log("pressed j")
                rotate(0, 30, 0);
                break;
            case "l":
                //clock wise
                console.log("pressed l")
                rotate(0, -30, 0);
                break;
            case "k":
                //clock wise
                console.log("pressed k")
                rotate(-30, 0, 0);
                break;
            case "i":
                //counter clock
                console.log("pressed i")
                rotate(30, 0, 0);
                break;
            case "u":
                //counter clock
                console.log("pressed u")
                rotate(0, 0, 30);
                break;
            case "o":
                //clock wise
                console.log("pressed o")
                rotate(0, 0, -30);
                break;


            default:
                console.log(pressCounter)
                return; 
        
        }
    }

    document.addEventListener("keydown", function (event) {
        switch (event.key) {
            //changing view
            case (pressCounter % 2 == 0 && "v"):
                pressCounter++;
                console.log(pressCounter)
                changeViewOrtho();
                drawGridOnWorld();
                console.log("change to orthographic")
                break;
            case (pressCounter % 2 != 0 && "v"):
                pressCounter++;
                console.log(pressCounter)
                changeViewPerspect();
                drawGridOnWorld();
                console.log("change to perspective")
                break;

            case "+":
                //zoom in
                translate(0, 0, 3);
                drawGridOnWorld();
                break;
            case "-":
                //zoom out
                translate(0, 0, -3);
                drawGridOnWorld();
                break;

            case "j":
                //counter clock wise
                console.log("pressed j")
                rotate(0, 30, 0);
                drawGridOnWorld();
                break;
            case "l":
                //clock wise
                console.log("pressed l")
                rotate(0, -30, 0);
                drawGridOnWorld();
                break;
            case "k":
                //clock wise
                console.log("pressed k")
                rotate(-30, 0, 0);
                drawGridOnWorld();
                break;
            case "i":
                //counter clock
                console.log("pressed i")
                rotate(30, 0, 0);
                drawGridOnWorld();
                break;
            case "u":
                //counter clock
                console.log("pressed u")
                rotate(0, 0, 30);
                drawGridOnWorld();
                break;
            case "o":
                //clock wise
                console.log("pressed o")
                rotate(0, 0, -30);
                drawGridOnWorld();
                break;

            //toggling g
            case (pressCounterG % 2 == 0 && "g"):
                pressCounterG++;
                console.log(pressCounterG)
                console.log("Pressed g")
                //clearWorld();
                drawWorld();
                document.addEventListener("keydown", noGrid);
                document.removeEventListener('mousemove', mouseMoveWithGrid);
                document.addEventListener('mousemove', mouseMoveWithoutGrid);
                console.log("disable grid")
                break;

            case (pressCounterG % 2 != 0 && "g"):
                pressCounterG++;
                console.log(pressCounterG)
                drawWorld();
                drawGridOnWorld();
                document.removeEventListener("keydown", noGrid);
                document.removeEventListener('mousemove', mouseMoveWithoutGrid);
                document.addEventListener('mousemove', mouseMoveWithGrid);
                console.log("enable grid")
                break;

            default:
                console.log(pressCounter)
                return; // Quit when this doesn't handle the key event.
        }

    }, false);

    //import obj file part  


    var input = document.querySelector('input');
    if (input) {
        input.addEventListener('change', () => {
            let files = input.files;
            const file = files[0];
            let reader = new FileReader();

            reader.onload = (e) => {
                const file = e.target.result;
                const lines = file.split(/\n/);
                var indicesArray = [];
                var verticesArray = [];
                //idea
                //cut from the second position
                //split with space 
                //parse string to int

                for (var line of lines) {
                    //handling faces
                    if (line.startsWith("f")) {
                        var newline = line.substr(2, line.length).split(/\s/);
                        for (var num of newline) {
                            number = parseInt(num);
                            indicesArray.push(number);
                        }
                    }
                    //handling vertices
                    if (line.startsWith("v")) {
                        //add color for each line
                        //can be handeled with blender 
                        line = line + " 1 0 1";
                        var newline = line.substr(2, line.length).split(/\s/);

                        for (var num of newline) {
                            number = parseFloat(num);
                            //there is possiblity that parser convert a space into NaN(happens with bunny obj file)
                            //therefore ignore the NaN value while pushing it into an array
                            if (!isNaN(number)) {
                                verticesArray.push(number);
                            }

                        }
                    }

                }
                console.log(verticesArray)

                tmp = indicesArray.map(n => n - 1);

                objIndices.push(tmp);
                objVertices.push(verticesArray);

                drawWorld(); 
                drawGridOnWorld();

            }

            reader.readAsText(file);

        })

    }

    console.log(objIndices)
 
    function drawObj(indices, vertices) {

        var objbuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, objbuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
       
        var objIndicesbuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, objIndicesbuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        
        render();
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0); 
        
    }

    //adjust camera angle from the beginning to match the requirement by just rotating it
    //and draw grid afterwards (grid is on by default)
    rotate(3, 50, 30);
    drawGridOnWorld();
};