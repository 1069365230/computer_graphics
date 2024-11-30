const vertexShaderSource =
    'attribute vec3 vertPosition; \n' +
    'attribute vec3 vertColor; \n' +
    'varying lowp vec3 fragColor; \n' +
    'uniform mat4 worldMatrix; \n' +
    'uniform mat4 viewMatrix; \n' +
    'uniform mat4 projectionMatrix; \n' +
    'uniform mat4 objectMatrix; \n' +

    'varying vec3 normal; \n' +
    'varying mat4 obj; \n' +
    'varying mat4 world; \n' +

    'void main(){\n' +
    'fragColor = vertColor;\n' +
    'normal = vertPosition;\n' +
    'obj = objectMatrix;\n' +
    'world = worldMatrix;\n' +
    
    'gl_Position= projectionMatrix * viewMatrix * worldMatrix * objectMatrix * vec4(vertPosition, 1);\n' +
    '}';

const fragmentShaderSource =
    'precision mediump float; \n' +
    'varying vec3 fragColor;\n' +
    'varying vec3 normal; \n' +
    'varying mat4 obj; \n' +
    'varying mat4 world; \n' +
    'void main(){ \n' +

    'vec3 lightsource = vec3(15, 39, -15);\n' +
    'vec3 vecNormal = normalize(normal);\n' +
    'vec3 pos =  - (obj * vec4(vecNormal, 0)).xyz; \n' +

    'vec3 L = normalize(lightsource - pos); \n' +
    'vec3 N = normalize((obj * world * vec4(vecNormal, 1)).xyz); \n' +
    'vec3 E = -pos; \n' +
    'vec3 H = normalize(L + E); \n' +

    'vec3 productd =fragColor * max(dot(L, N), 0.0) * vec3(1,1,1) * 1.0; \n' +
    'vec3 products = fragColor * pow(max(dot(N, H), 0.0), 100.0) * vec3(1,1,1) * 1.0; \n' +

    'if(dot(L, N) < 0.0){ vec3 specular = vec3(0, 0, 0);}; \n' +

    'vec3 ambient = fragColor * vec3(1,1,1) * 0.3 * 0.9; \n' +
    'vec3 diffuse = productd; \n' +
    'vec3 specular = products; \n' +

    'gl_FragColor = vec4(ambient + diffuse + specular, 1);\n' +
    '}';
