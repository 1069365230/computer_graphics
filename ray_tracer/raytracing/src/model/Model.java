package model;

import calculate.Calculator;
import calculate.Vector;
import raytracing.Light;

public class Model {
	private double radius;
	
	private Vector position;
	private double posX;
	private double posY;
	private double posZ;
	
	private Material material;
	
	private double tzero;
	private double tone;
	
	
	
	public Model() {
		
	}
	
	public Model(float radius, float posX, float posY, float posZ) {
		this.radius = radius;
		this.posX = posX;
		this.posY = posY;
		this.posZ = posZ;
		
		this.position = new Vector(posX, posY, posZ);
		
		
	}
	//normal vector on specific point
	public Vector normalVec(Vector pos) {
		return Calculator.normalized(Calculator.minus(pos, this.position));
	}
	
	public void setMat(Light light, float colorR, float colorG, float colorB, float ka, float kd, float ks, int exponent,
			float reflectance, float transmittance, float refraction) {
		this.material= new Material(this, light, colorR, colorG, colorB, ka, kd, ks, exponent, reflectance, transmittance, refraction);

	}
	
	//getters and setters
	public double getTzero() {
		return tzero;
	}

	public void setTzero(double tzero) {
		this.tzero = tzero;
	}

	public double getTone() {
		return tone;
	}

	public void setTone(double tone) {
		this.tone = tone;
	}

	public double getRadius() {
		return radius;
	}

	public void setRadius(double radius) {
		this.radius = radius;
	}

	public Vector getPosition() {
		return position;
	}

	public void setPosition(Vector position) {
		this.position = position;
	}

	public double getPosX() {
		return posX;
	}

	public void setPosX(double posX) {
		this.posX = posX;
	}

	public double getPosY() {
		return posY;
	}

	public void setPosY(double posY) {
		this.posY = posY;
	}

	public double getPosZ() {
		return posZ;
	}

	public void setPosZ(double posZ) {
		this.posZ = posZ;
	}

	public Material getMaterial() {
		return material;
	}

	public void setMaterial(Material material) {
		this.material = material;
	}
	
	
	@Override
	public String toString() {
		return "Model [Position=" + this.position + "Radius" + this.radius + ", material=" + material + "]";
	}
	
	
	
}
