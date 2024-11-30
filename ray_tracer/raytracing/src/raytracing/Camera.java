package raytracing;

import calculate.Calculator;
import calculate.Vector;

public class Camera {

	private double left;
	private double right;
	private double top;
	private double bottom;
	
	
	private Vector position;
	private Vector lookat;
	private Vector up;
	//given
	private float positionX;
	private float positionY;
	private float positionZ;
	
	private float lookatX;
	private float lookatY;
	private float lookatZ;
	
	private float upX;
	private float upY;
	private float upZ;
	
	private double fovangle;
	
	private int height;
	private int width;
	
	private int maxbounces;

	//needed
	private Vector W;
	private Vector U;
	private Vector V;
	
	private double distance;
	private Vector negwd;
	
	public Camera(float positionX, float positionY, float positionZ, float lookatX, float lookatY, float lookatZ, float upX,
			float upY, float upZ, double fovangle, int height, int width, int maxbounces) {
		
		
		this.positionX = positionX;
		this.positionY = positionY;
		this.positionZ = positionZ;
		this.position = new Vector(this.positionX, this.positionY, this.positionZ);
	
		this.lookatX = lookatX;
		this.lookatY = lookatY;
		this.lookatZ = lookatZ;
		this.lookat = new Vector(this.lookatX, this.lookatY, this.lookatZ);
		
		
		this.upX = upX;
		this.upY = upY;
		this.upZ = upZ;
		this.up = new Vector(this.upX, this.upY, this.upZ);
		
		this.fovangle = fovangle;
		this.height = height;
		this.width = width;
		this.maxbounces = maxbounces;
		
		this.left = -Render.width/2;
		this.right = Render.width/2;
		this.top = Render.height/2;
		this.bottom = -Render.height/2;
		
		
		this.W = Calculator.normalized(Calculator.minus(position, lookat));
		this.U = Calculator.normalized(Calculator.cross(up, this.W));
		this.V = Calculator.normalized(Calculator.cross(W, U));
		this.distance  = this.top/Math.tan(Math.toRadians(fovangle))/2;
		this.negwd = Calculator.mul(W, -distance);
		
	}
	
	//getters and setters
	
	public Vector getPosition() {
		return position;
	}

	public void setPosition(Vector position) {
		this.position = position;
	}

	public Vector getLookat() {
		return lookat;
	}

	public void setLookat(Vector lookat) {
		this.lookat = lookat;
	}

	public Vector getUp() {
		return up;
	}

	public void setUp(Vector up) {
		this.up = up;
	}

	public float getPositionX() {
		return positionX;
	}

	public float getPositionY() {
		return positionY;
	}

	public float getPositionZ() {
		return positionZ;
	}

	public float getLookatX() {
		return lookatX;
	}

	public float getLookatY() {
		return lookatY;
	}

	public float getLookatZ() {
		return lookatZ;
	}

	public float getUpX() {
		return upX;
	}

	public float getUpY() {
		return upY;
	}

	public float getUpZ() {
		return upZ;
	}

	public double getFovangle() {
		return fovangle;
	}

	public int getHeight() {
		return height;
	}

	public int getWidth() {
		return width;
	}

	public int getMaxbounces() {
		return maxbounces;
	}

	
	public double getLeft() {
		return left;
	}

	public void setLeft(double left) {
		this.left = left;
	}

	public double getRight() {
		return right;
	}

	public void setRight(double right) {
		this.right = right;
	}

	public double getTop() {
		return top;
	}

	public void setTop(double top) {
		this.top = top;
	}

	public double getBottom() {
		return bottom;
	}

	public void setBottom(double bottom) {
		this.bottom = bottom;
	}

	public Vector getW() {
		return W;
	}

	public void setW(Vector w) {
		W = w;
	}

	public Vector getU() {
		return U;
	}

	public void setU(Vector u) {
		U = u;
	}

	public Vector getV() {
		return V;
	}

	public void setV(Vector v) {
		V = v;
	}

	public Vector getNegwd() {
		return negwd;
	}

	public void setNegwd(Vector negwd) {
		this.negwd = negwd;
	}

	
	@Override
	public String toString() {
		return "Camera [positionX=" + positionX + ", positionY=" + positionY + ", positionZ=" + positionZ + ", lookatX="
				+ lookatX + ", lookatY=" + lookatY + ", lookatZ=" + lookatZ + ", upX=" + upX + ", upY=" + upY + ", upZ="
				+ upZ + ", fovangle=" + fovangle + ", height=" + height + ", width=" + width + ", maxbounces="
				+ maxbounces + "]";
	}
	

	
	
	
}
