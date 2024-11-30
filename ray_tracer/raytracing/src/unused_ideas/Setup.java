package unused_ideas;

import java.lang.Math;
import java.util.LinkedList;

import calculate.Calculator;
import calculate.Vector;


public class Setup {
	private Vector camera;
	
	//given
	private int height;
	private int width;
	private double fovx;
	
	private double fovy;
	
	//given
	private Vector O;
	private Vector C;
	
	private Vector L;
	//put it in pixel class, because each ray has their own direction
	//private Vector D;
	
	private double tca;
	
	private double d;
	
	//given
	private float radius;
	
	private double thc;
	
	private Vector firstintersect;
	private Vector secondintersect;
	
	private Vector normal;
	
	private LinkedList<Pixel> pixelList = new LinkedList<Pixel>();
	
	public Setup(int height, int width, double fovx, Vector O, Vector C, float radius) {
		this.height=height;
		this.width=width;
		this.fovx=fovx;
		this.O=O;
		this.camera=O;
		this.C=C;
		this.radius=radius;
		
		init();
	}
	
	public Vector getCamera() {
		return camera;
	}

	public int getHeight() {
		return height;
	}

	public int getWidth() {
		return width;
	}

	public double getFovx() {
		return fovx;
	}

	public double getFovy() {
		return fovy;
	}

	public Vector getO() {
		return O;
	}

	public Vector getC() {
		return C;
	}

	public Vector getL() {
		return L;
	}

	public double getTca() {
		return tca;
	}

	public double getD() {
		return d;
	}

	public float getRadius() {
		return radius;
	}

	public double getThc() {
		return thc;
	}

	public Vector getFirstintersect() {
		return firstintersect;
	}

	public Vector getSecondintersect() {
		return secondintersect;
	}

	public Vector getNormal() {
		return normal;
	}

	public LinkedList<Pixel> getPixelList() {
		return pixelList;
	}

	private void init() {
		
		double temp = Math.toRadians(fovx);
		this.fovy = (this.height/this.width) * temp;
		
		for(int u = 0; u< this.width; u++) {
			double x = (2*u - this.width)/width * Math.tan(temp);

			for(int v = 0; v<this.height; v++) {
				double y = (2*v - this.height)/height * Math.tan(fovy);
				Vector point = new Vector (x,y,-1);
				//Vector direction = Calculator.minus(point, camera);
				Vector direction = Calculator.normalized(Calculator.minus(point, camera));
				//should I normalize it ? is D a scalar or a vector ?
				Pixel p = new Pixel (x, y, direction);
				this.pixelList.add(p);
				
			}
			
		}
		
	}
	
	


	public boolean intersect(Pixel p) {
		//C is the center of the sphere
		//O is the camera
		this.L = Calculator.minus(C,O);
		this.tca = Calculator.dot(L, p.getD());
		if(this.tca<0) {
			return false;
		}
		
		this.d= Math.sqrt(Calculator.dot(L, L) - (tca*tca));
		if(this.d<0) {
			return false;
		}
		
		this.thc = Math.sqrt(radius*radius - this.d*this.d);
		
		double tzero = tca - thc;
		double tone = tca + thc;
		//p
		//Vector fInter = plus(O, mul(p.getD(), tzero));
		this.firstintersect = Calculator.plus(O, Calculator.mul(p.getD(), tzero));
		//p'
		//Vector sInter = plus(O, mul(p.getD(), tone));
		this.secondintersect = Calculator.plus(O, Calculator.mul(p.getD(), tone));
		return true;
		
		
	}
	
	//for shading
	public void normal() {
		this.normal = Calculator.minus(this.firstintersect, C);
		//Vector afternormalized = normalized(this.normal);
		//normalize?
	}
	
}
