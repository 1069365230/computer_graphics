JFLAGS = -g
JC = javac
.SUFFIXES: .java .class
.java.class:
	$(JC) $(JFLAGS) $*.java

CLASSES = \
	calculate/*.java \
	model/*.java \
	raytracing/*.java \
	unused_ideas/*.java

TEST = 

default: classes \
	zipping

classes: $(CLASSES:.java=.class)
zipping: META-INF calculate model raytracing unused_ideas
	zip -r lab2a.jar META-INF calculate model raytracing unused_ideas
clean:
	$(RM) calculate/*.class \
	model/*.class \
	raytracing/*.class \
	unused_ideas/*.class