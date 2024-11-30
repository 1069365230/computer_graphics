package model;

public class Geometry {
	private float radius;
	private float posX;
	private float posY;
	private float posZ;
	
	
	
	public Geometry(float radius, float posX, float posY, float posZ) {
		this.radius = radius;
		this.posX = posX;
		this.posY = posY;
		this.posZ = posZ;
	}
	
	public float getRadius() {
		return radius;
	}
	public void setRadius(float radius) {
		this.radius = radius;
	}
	public double getPosX() {
		return posX;
	}
	public void setPosX(float posX) {
		this.posX = posX;
	}
	public double getPosY() {
		return posY;
	}
	public void setPosY(float posY) {
		this.posY = posY;
	}
	public double getPosZ() {
		return posZ;
	}
	public void setPosZ(float posZ) {
		this.posZ = posZ;
	}

	@Override
	public String toString() {
		return "Geometry [radius=" + radius + ", posX=" + posX + ", posY=" + posY + ", posZ=" + posZ + "]";
	}
	
	//obj parser?

}
