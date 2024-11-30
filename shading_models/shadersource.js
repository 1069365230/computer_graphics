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
    'gl_FragColor = vec4(fragColor * 0.1, 1);\n' +
    '}';
//    'uniform vec3 lightbulb; \n' +

//Phong
const vertexShaderSourcePd =
    'precision mediump float; \n' +
    'attribute vec3 vertPosition; \n' +
    'attribute vec3 vertColor; \n' +
    'varying vec3 fragColor; \n' +
    'uniform mat4 worldMatrix; \n' +
    'uniform mat4 viewMatrix; \n' +
    'uniform mat4 projectionMatrix; \n' +
    'uniform mat4 objectMatrix; \n' +
    'uniform vec3 lightVec; \n' +

    'varying vec3 normal; \n' +
    'varying mat4 obj; \n' +
    'varying mat4 world; \n' +
    'varying vec3 light; \n' +

    'void main(){\n' +
    'fragColor = vertColor;\n' +
    'normal = vertPosition;\n' +
    'obj = objectMatrix;\n' +
    'world = worldMatrix;\n' +
    'light = lightVec;\n' +

    'gl_Position= projectionMatrix * viewMatrix * worldMatrix * objectMatrix * vec4(vertPosition, 1);\n' +
    '}';

const fragmentShaderSourcePd =
    'precision mediump float; \n' +
    'varying vec3 fragColor;\n' +
    'varying vec3 normal; \n' +
    'varying mat4 obj; \n' +
    'varying mat4 world; \n' +
    'varying vec3 light; \n' +

    'void main(){ \n' +
    'vec3 lightsource = light + vec3(0, 10, 0);\n' +
    'vec3 vecNormal = normalize(normal);\n' +
    'vec3 pos =  - (obj * vec4(vecNormal, 0)).xyz; \n' +
    'vec3 L = normalize(lightsource - pos); \n' +
    'vec3 N = normalize((obj * world * vec4(vecNormal, 1)).xyz); \n' +

    'vec3 productd =fragColor * max(dot(L, N), 0.0) * vec3(1,1,1) * 1.0; \n' +

    'if(dot(L, N) < 0.0){ vec3 specular = vec3(0, 0, 0);}; \n' +

    'vec3 ambient = fragColor * vec3(1,1,1) * 0.1 * 1.0; \n' +
    'vec3 diffuse = productd; \n' +

    'gl_FragColor = vec4(ambient + diffuse , 1);\n' +

    '}';
//'const vec3 lightsource = vec3(0, 10, 0); \n' +
const vertexShaderSourcePs =
    'precision mediump float; \n' +
    'attribute vec3 vertPosition; \n' +
    'attribute vec3 vertColor; \n' +
    'varying vec3 fragColor; \n' +
    'uniform mat4 worldMatrix; \n' +
    'uniform mat4 viewMatrix; \n' +
    'uniform mat4 projectionMatrix; \n' +
    'uniform mat4 objectMatrix; \n' +
    'uniform vec3 lightVec; \n' +

    'varying vec3 normal; \n' +
    'varying mat4 obj; \n' +
    'varying mat4 world; \n' +
    'varying vec3 light; \n' +

    'void main(){\n' +
    'fragColor = vertColor;\n' +
    'normal = vertPosition;\n' +
    'obj = objectMatrix;\n' +
    'world = worldMatrix;\n' +
    'light = lightVec;\n' +

    'gl_Position= projectionMatrix * viewMatrix * worldMatrix * objectMatrix * vec4(vertPosition, 1);\n' +
    '}';

const fragmentShaderSourcePs =
    'precision mediump float; \n' +
    
    'varying vec3 fragColor;\n' +
    'varying vec3 normal; \n' +
    'varying mat4 obj; \n' +
    'varying mat4 world; \n' +
    'varying vec3 light; \n' +


    'void main(){ \n' +
    'vec3 lightsource = light + vec3(0, 10, 0);\n' +
    'vec3 vecNormal = normalize(normal);\n' +
    'vec3 pos =  - (obj * vec4(vecNormal, 0)).xyz; \n' +
    'vec3 L = normalize(lightsource - pos); \n' +
    'vec3 N = normalize((obj * world * vec4(vecNormal, 1)).xyz); \n' +
    'vec3 E = -pos; \n' +
    'vec3 H = normalize(L + E); \n' +
   
    'vec3 products = fragColor * pow(max(dot(N, H), 0.0), 100.0) * vec3(1,1,1) * 1.0; \n' +

    'if(dot(L, N) < 0.0){ vec3 specular = vec3(0, 0, 0);}; \n' +

    'vec3 ambient = fragColor * vec3(1,1,1) * 0.1 * 1.0; \n' +
    'vec3 specular = products; \n' +


    'gl_FragColor = vec4(ambient + specular, 1);\n' +

    '}';
//'const vec3 lightsource = vec3(0, 10, 0); \n' +
// 'vec3 productd = max(dot(L, N), 0.0) * vec3(1,1,1) * 1.0; \n' +

//Gouraud
const vertexShaderSourceGd =
    'precision mediump float; \n' +
    'attribute vec3 vertPosition; \n' +
    'attribute vec3 vertColor; \n' +
    'varying vec3 fragColor; \n' +
    'uniform mat4 worldMatrix; \n' +
    'uniform mat4 viewMatrix; \n' +
    'uniform mat4 projectionMatrix; \n' +
    'uniform mat4 objectMatrix; \n' +
    'uniform vec3 lightVec; \n' +

    'const vec3 lightsource = vec3(0, 10, 0); \n' +
    'attribute vec3 vecNormal; \n' +

    'void main(){\n' +
    'fragColor = vertColor;\n' +
    'vec3 vecNormal = normalize(vertPosition);\n' +
    'vec3 pos =  - (objectMatrix * vec4(vecNormal, 0)).xyz; \n' +
    'vec3 L = normalize((lightsource + lightVec) - pos); \n' +
    'vec3 N = normalize((objectMatrix * worldMatrix * vec4(vecNormal, 1)).xyz); \n' +
    'vec3 productd = vertColor * max(dot(L, N), 0.0) * vec3(1,1,1) * 1.0; \n' +

    'vec3 ambient = vertColor * vec3(1,1,1) * 0.1 * 1.0; \n' +
    'vec3 diffuse = productd; \n' +

    'fragColor = ambient + diffuse; \n' +
    'gl_Position= projectionMatrix * viewMatrix * worldMatrix * objectMatrix * vec4(vertPosition, 1);\n' +
    '}';
// 'fragColor = vertColor;\n' +
const fragmentShaderSourceGd =
    'precision mediump float; \n' +
    'varying vec3 fragColor;\n' +

    'void main(){ \n' +

    'gl_FragColor = vec4(fragColor, 1);\n' +
    '}';

const vertexShaderSourceGs =
    'precision mediump float; \n' +
    'attribute vec3 vertPosition; \n' +
    'attribute vec3 vertColor; \n' +
    'varying vec3 fragColor; \n' +
    'uniform mat4 worldMatrix; \n' +
    'uniform mat4 viewMatrix; \n' +
    'uniform mat4 projectionMatrix; \n' +
    'uniform mat4 objectMatrix; \n' +
    'uniform vec3 lightVec; \n' +

    'const vec3 lightsource = vec3(0, 10, 0); \n' +
    'attribute vec3 vecNormal; \n' +

    'void main(){\n' +
    'fragColor = vertColor;\n' +
    'vec3 vecNormal = normalize(vertPosition);\n' +
    'vec3 pos =  - (objectMatrix * vec4(vecNormal, 0)).xyz; \n' +
    'vec3 L = normalize((lightsource + lightVec) - pos); \n' +
    'vec3 N = normalize((objectMatrix * worldMatrix * vec4(vecNormal, 1)).xyz); \n' +

    'vec3 E = normalize(-pos); \n' +
    'vec3 H = normalize(L + E); \n' +
    'vec3 products = vertColor * pow(max(dot(N, H), 0.0), 100.0) * vec3(1,1,1) * 1.0; \n' +

    'if(dot(L, N) < 0.0){ vec3 specular = vec3(0, 0, 0);}; \n' +

    'vec3 ambient = vertColor * vec3(1,1,1) * 0.1 * 1.0; \n' +
    'vec3 specular = products; \n' +

    'fragColor = ambient + specular; \n' +
    'gl_Position= projectionMatrix * viewMatrix * worldMatrix * objectMatrix * vec4(vertPosition, 1);\n' +
    '}';

const fragmentShaderSourceGs =
    'precision mediump float; \n' +
    'varying vec3 fragColor;\n' +

    'void main(){ \n' +

    'gl_FragColor = vec4(fragColor, 1);\n' +
    '}';

//var shaderArray = [vertexShaderSource, fragmentShaderSource, vertexShaderSourceP, fragmentShaderSourceP, vertexShaderSourceG, fragmentShaderSourceG];
//shader.shaderArray.push()

