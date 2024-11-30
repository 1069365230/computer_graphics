package unused_ideas;

import java.awt.Color;
import java.awt.image.BufferedImage;

import raytracing.Render;

public class Ideas {

	
}

//another intersection calculation from youtube


//x = -b +- sqrt(b^2 - 4ac) / 2a
// = -b/2a --> one outcome
// sqrt... < 0 --> no outcome
// sqrt... > 0 --> two outcome
/*public static Vector root(double a, double b, double c) {
	double primary = b*b-4*a*c;
	if(primary < 0) {
		return new Vector(0,0,0);
	}
	else if(primary == 0) {
		if(a==0) {
			return new Vector(0,0,0);
		}
		return new Vector(-b/2*a, 0 , 1);
	}
	else {
		double temp = Math.sqrt(primary);
		return new Vector((-b + temp)/(2 *a), (-b - temp)/(2 *a), 2);
	}
	
	
}*/



	/*public double intersect(Vector v, Vector direction) {
		double a = Calculator.dot(direction, direction);
		Vector eyecenter = Calculator.minus(v, this.position);
		double b = 2 * Calculator.dot(direction, eyecenter);
		double c = Calculator.dot(eyecenter, eyecenter) - this.radius*this.radius;
		Vector out = Calculator.root(a, b, c);
		int quantity = (int)Math.round(out.getK());
		
		if(quantity == 0) {
			return Double.MAX_VALUE;
		}
		if(quantity == 1) {
			return out.getI();
		}
		if(quantity == 2) {
			//return the first intersection point
			//if the first intersect is behind the camera
			if(out.getI()<0) {
				if(out.getJ()<0) {
					//both intersect behind camera
					return Double.MAX_VALUE;
				}else {
					//only one intersect is behind the camera
					return out.getJ();
					
				}
			}

			if(out.getI()>=0) {
				if(out.getJ()<0) {
					//second intersect behind camera
					return out.getI();
				}else {
					//both intersect infront of camera
					//return the first intersection point
					//only one intersect is behind the camera
					//could change
					return Math.min(out.getI(), out.getJ());
					
				}
				
			}
		}
		
		return Double.MAX_VALUE;
	}
	*/

// j panel
//in main
/*
JFrame frame = new JFrame("RAYTRACE");
frame.add(render);
frame.pack();
frame.setVisible(true);
frame.setResizable(false);
frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);*/

/*public Render(int width, int height) {
	
	this.canvas = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
	
	for(int u = 0; u< width; u++) {
		for(int v = 0; v<height; v++) {
			canvas.setRGB(v, u, Color.BLACK.getRGB());
			
		}
		
	}
	this.setPreferredSize(new Dimension(width, height));
	
}*/


//paint
/*public void paintComponent(Graphics g) {
	//super.paintComponent(g);
	
	Graphics2D gg = (Graphics2D)g;
	gg.drawImage(canvas, null, null);
}*/

/*public void setPixel(int x, int y, int rgb) {
	
	//Render render = getRender();
	if(x > Render.width-1 || x < 0 || y >  Render.height-1 || y < 0) {
		return;
		
	}
	this.canvas.setRGB(x, y, rgb);
	
	render.repaint();
	
	
}
*/



//intersection calculations from class
/*public boolean intersect(Camera camera, Model model, Vector direction) {
//C is the center of the sphere
//O is the camera
Vector L = Calculator.minus(model.getPosition(), camera.getPosition());
double tca = Calculator.dot(L, direction);
if(tca<0) {
	return false;
}

double d= Math.sqrt(Calculator.dot(L, L) - (tca*tca));
if(d<0) {
	return false;
}

double thc = Math.sqrt(model.getRadius()*model.getRadius() - d*d);

model.setTzero(tca-thc);
model.setTone(tca+thc);
//this.tzero = tca - thc;
//this.tone = tca + thc;
//p
//Vector fInter = plus(O, mul(p.getD(), tzero));
Vector firstintersect = Calculator.plus(camera.getPosition(), Calculator.mul(direction, model.getTzero()));
//p'
//Vector sInter = plus(O, mul(p.getD(), tone));
Vector secondintersect = Calculator.plus(camera.getPosition(), Calculator.mul(direction, model.getTone()));
return true;


}*/

//before object orented
//working
/*
Model intersect = new Model();
boolean hit=false;
//p, first intersection 
//Double.MAX_VALUE-1
double p = Double.MAX_VALUE;

for(Model m : this.modelList) {
	//find the first intersection point (tem)
	//from youtube
	//double tem = m.intersect(camera.getPosition(), directionRay);
	intersect(m, directionRay);
	double tem = m.getTzero();
	//check not behind the camera
	//if(tem > 0 && tem < p) {
		//hit = true;
		//intersect = m;
		//p = tem;
		
	//}
	if(m.getTzero()>0) {
		hit = true;
		intersect = m;
		p = m.getTzero();
		
	}
	
}

if(hit) {
	Render.setPixel(u, v, intersect.getMaterial().basecolor());
	
}*/


//pixles
//testing

//double fovx = Math.toRadians(camera.getFovangle());
//double fovy = (camera.getHeight()/camera.getWidth()) * fovx;
/*
double x = ((2*u - camera.getWidth())/camera.getWidth()) * Math.tan(fovx);
double y = ((2*v - camera.getHeight())/camera.getHeight()) * Math.tan(fovy);

Vector point = new Vector (x,y,0);
Vector directionRay = Calculator.normalized(Calculator.minus(point, camera.getPosition()));
*/


//dum constructor

//private static Render render = null;

/*public static Render getRender() {

	if(Render.render == null) {
		Render.render = new Render(width, height);
	}
	return Render.render;
}*/


/*double distance = Calculator.length(Calculator.minus(lightDirection, pos));

Vector c = Calculator.plus(this.ambient, Calculator.mul(this.ambient, 1/(distance*distance)));
c = Calculator.mul(c, 255);
double t1 = c.getI();
double t2 = c.getJ();
double t3 = c.getK();

t1 = Math.min(255, t1);
t2 = Math.min(255, t2);
t3 = Math.min(255, t3);
t1 = Math.max(0, t1);
t2 = Math.max(0, t2);
t3 = Math.max(0, t3);


ambient = new Color((int)t1, (int)t2, (int)t3).getRGB(); */
