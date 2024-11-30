function normaldraw(mgl, Program, buffer, Plocation, Clocation) {

    mgl.bindBuffer(mgl.ARRAY_BUFFER, buffer);
    
    mgl.vertexAttribPointer(
        Plocation,
        3,//elements per attribute
        mgl.FLOAT,
        mgl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, //size of individual vertex,(0=use the type above, usually 3)
        0//offset
    );

    mgl.vertexAttribPointer(
        Clocation,
        3,
        mgl.FLOAT,
        mgl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT
    );

    mgl.enableVertexAttribArray(Plocation);
    mgl.enableVertexAttribArray(Clocation);

    mgl.useProgram(Program);

    ///need to update everytime new faces are added
    //18 faces per pyramids
    //36 faces per cube
    //18 * 8 + 36
    mgl.drawArrays(mgl.TRIANGLES, 0, 18 * 8 + 36);

};

function objdraw(mgl, Program, buffer, Plocation, Clocation, length) {

    console.log("OBJDRAW CALLED");

    mgl.bindBuffer(mgl.ARRAY_BUFFER, buffer);

    mgl.vertexAttribPointer(
        Plocation,
        3,//elements per attribute
        mgl.FLOAT,
        mgl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, //size of individual vertex,(0=use the type above, usually 3)
        0//offset
    );

    mgl.vertexAttribPointer(
        Clocation,
        3,
        mgl.FLOAT,
        mgl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT
    );

    mgl.enableVertexAttribArray(Plocation);
    mgl.enableVertexAttribArray(Clocation);

    mgl.useProgram(Program);

    mgl.drawArrays(mgl.TRIANGLES, 0, length);

};
