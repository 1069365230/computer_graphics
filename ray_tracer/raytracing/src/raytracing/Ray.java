package raytracing;

import java.awt.Color;
import java.util.LinkedList;

import calculate.Calculator;
import calculate.Vector;
import model.Model;

public class Ray {
	private Vector origin;
	private Vector direction;
	
	private Vector firstintersect;
	private Vector secondintersect;
	
	//primary ray
	
	public Ray(Vector origin, Vector direction) {
		this.origin = origin;
		this.direction = Calculator.normalized(direction);
	}
	
	
	public Vector getPos(double p) {
		Vector pos = Calculator.plus(origin, Calculator.mul(direction, p));
		return pos;
	}
	
	public int shootFirstRay(LinkedList<Model> modelList) {
		Model intersect = new Model();
		boolean hit=false;
		//p, first intersection 
		//Double.MAX_VALUE-1
		double p = Double.MAX_VALUE;
		for(Model m : modelList) {
			//find the first intersection point (tem)
			//from youtube
			//double tem = m.intersect(camera.getPosition(), directionRay);
			intersect(m, this.direction);
			//double tem = m.getTzero();
			//double sec = m.getTone();
			//check not behind the camera
			/*if(tem > 0 && tem < p) {
				hit = true;
				intersect = m;
				p = tem;
				
			}*/
			
			if(m.getTzero()>0) {
				hit = true;
				intersect = m;
				p = m.getTzero();
				m.setTzero(0);
			}
			
		}
		
		if(hit) {
			//return intersect.getMaterial().basecolor();
			return intersect.getMaterial().color(getPos(p), modelList);
			//Render.setPixel(u, v, intersect.getMaterial().basecolor());
			
		}else {
			return Color.BLACK.getRGB();
		}
		
		
	}
	
	public boolean shadowRay(LinkedList<Model> modelList) {
		double temp =0 ;
		for(Model m : modelList) {
			intersect(m, this.direction);
			temp = m.getTzero();
			if(temp > 0) {
				return true;
			}
			
		}

		return false;
	}
	
	public boolean intersect(Model model, Vector direction) {
		//C is the center of the sphere
		//O is the camera
		Vector L = Calculator.minus(model.getPosition(), this.origin);
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
		this.firstintersect = Calculator.plus(this.origin, Calculator.mul(direction, model.getTzero()));
		//p'
		//Vector sInter = plus(O, mul(p.getD(), tone));
		this.secondintersect = Calculator.plus(this.origin, Calculator.mul(direction, model.getTone()));
		return true;
		
		
	}
	
	public Vector getFirstintersect() {
		return this.firstintersect;
	}
	
	
	public Vector getSecondintersect() {
		return this.secondintersect;
	}


	
	
}
