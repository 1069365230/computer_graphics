Finished tasks:
T1
T2
T3 a(except highlighting the local coordinates part),b,c,d
T4


I have started this lab very early and have almost spend a whole month doing it.

First I have complete this whole lab without the local transformation which is the T3 part a. 
I created 9 models with all different vertices, and every transformation works without an issue.(that was before the first tutorial). 
As soon as I started implementing the local transformation, I realized how complex I have structed my code.
I because I did not put all the models at the center first, then move them into different positions. 
I straight up put them at the different position in the beginning with all 9 different vertices, and it becomes so hard to do the local transformation. 
I had to first translate them back to the center and then do the rotation and scaling then translate them back...

and because my structure was defined only with one global transforamtion matrix, 
every model carry the same transformation as the last selected model. I was confused for a week on that part.

Then I made class for model, so every model can have their own transformation matrix(include scaling, rotation, angles...)
and at that time Willi had the tutorial and explained me via email a lot. I realized it is much better and easier to place all
my models at the global center in the beginning, then just translate them at different position.
I have to restructure my whole code again, which tooked me about one day.

but beside the structure part, the most difficult thing for me was the event lisenter in java script. 
I had some difficulties when I try to implement the toggle camera key(key C).


Finally, I trimed down my code a bit, removed all the unnecessary comments and code,
improved some degree of modulization, create a function instead of call the same code each time. 



OS of dev-computer: windows (DELL XPS)
OS of test-computer: windows (Asus)
browsers: Chrome 86.0.4240.111 64 bit

Feedback:
For me, importing OBJ file was the easiest part during this lab, even easier than creating those 9 models.
I think people should try first to import the file after they create the 9 models.
As soon as they get the concept of how vertices works, not even color, they should be completly capable of import an OBJ file.

glMatrix.mat4.mul() is a dangerous function, I strongly suggest that the outcome matrix is a newly created matrix.
For example, if you want to multiply 3 matrices, make a temporary matrix inbetween as a bridge. since mat4.mul() can only multiply 2 matrices.

local transformation definetly is the most difficult. It should worth more points in my opinion.
I wish the tutorial can be done earlier, to tell people that each model should have an individual matrix as well as the structure.
restucturing my code was PAINFULL and DEPRESSING.



