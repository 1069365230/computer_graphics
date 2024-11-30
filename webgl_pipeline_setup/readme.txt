the pipeline of webgl program is from CPU to GPU to display.
1: in the CPU, it will be the data(vertex) input using javascript 
2: load into the buffer in GPU
3: Webgl comes in, we need to tell webgl how to manipulate those vertex,
4: shader program
vertex shader (takes the data, put them into the right coordinate)
fragment shader (takes the coordinate and color them)

5:last step: draw it on display

I used a simple html to see the triangle on screen instead of a local server.
