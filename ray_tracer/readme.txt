Implemented tasks:
T1, T2, T3, T4, T5, Bonus.
Test environment:
Windows with eclipse,
Java version 11.0.8
Addition remarks:
I used makefile instead of building a Gradle. I have tired with Gradle, 
it was a bit confusing for me, and a friend of mine has shown me on
how to do with the makefile. Personally I know it does not make too much sense
to use makefile, but I found it a bit easier than Gradle. I hope that is okay.

During the implementation, I used a different formula for each pixel(other than x=2u-width/width * tan(fovx), y=2v-height/height*tan(fovy) in slides), 
because the outcome seems not very correct to me during my implementation, maybe I did something wrong. 
However the concept is the same. The main class is the Render class and all the classes from the package unused_ideas are not used during the implementation.
Some of the method are from Youtube tutorial and some of them are concepts that did not work out. 

Location on almighty:
The makefile is under the directory of
/home/yuj98/Desktop/GFX/lab2a/ray_tracer/raytracing/scr/

to complie the project
the make file is located at raytracing/scr directory. 
type in "make" in cmd, and close it, it will generate the jar file for my entire project

and type in java -jar lab2a.jar in cmd to execute jar file and close it, 
the outcome PNG should be in the same directory.


 






