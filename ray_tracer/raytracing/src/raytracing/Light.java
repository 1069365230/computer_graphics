package raytracing;

import calculate.Vector;

public class Light {

	private float ambientR;
	private float ambientG;
	private float ambientB;
	
	private float lightR;
	private float lightG;
	private float lightB;
	
	private float directionX;
	private float directionY;
	private float directionZ;
	
	private float pointlightR;
	private float pointlightG;
	private float pointlightB;
	
	private float pointdirectionX;
	private float pointdirectionY;
	private float pointdirectionZ;
	
	
	public Light(float ambientR, float ambientG, float ambientB, float lightR, float lightG, float lightB,
			float directionX, float directionY, float directionZ) {
		super();
		this.ambientR = ambientR;
		this.ambientG = ambientG;
		this.ambientB = ambientB;
		this.lightR = lightR;
		this.lightG = lightG;
		this.lightB = lightB;
		this.directionX = directionX;
		this.directionY = directionY;
		this.directionZ = directionZ;
	}
	
	//this constructor used only for xml_1, because other variables are not given
	public Light(float ambientR, float ambientG, float ambientB) {
		this.ambientR = ambientR;
		this.ambientG = ambientG;
		this.ambientB = ambientB;
	}

	//getters and setters
	public Vector getAmbient() {
		return new Vector(this.ambientR, this.ambientG, this.ambientB);
	}
	
	public float getAmbientR() {
		return ambientR;
	}



	public float getAmbientG() {
		return ambientG;
	}



	public float getAmbientB() {
		return ambientB;
	}



	public float getLightR() {
		return lightR;
	}



	public float getLightG() {
		return lightG;
	}



	public float getLightB() {
		return lightB;
	}



	public float getDirectionX() {
		return directionX;
	}



	public float getDirectionY() {
		return directionY;
	}



	public float getDirectionZ() {
		return directionZ;
	}



	public float getPointlightR() {
		return pointlightR;
	}



	public float getPointlightG() {
		return pointlightG;
	}



	public float getPointlightB() {
		return pointlightB;
	}



	public float getPointdirectionX() {
		return pointdirectionX;
	}



	public float getPointdirectionY() {
		return pointdirectionY;
	}



	public float getPointdirectionZ() {
		return pointdirectionZ;
	}



	@Override
	public String toString() {
		return "Light [ambientR=" + ambientR + ", ambientG=" + ambientG + ", ambientB=" + ambientB + ", lightR="
				+ lightR + ", lightG=" + lightG + ", lightB=" + lightB + ", directionX=" + directionX + ", directionY="
				+ directionY + ", directionZ=" + directionZ + ", pointlightR=" + pointlightR + ", pointlightG="
				+ pointlightG + ", pointlightB=" + pointlightB + ", pointdirectionX=" + pointdirectionX
				+ ", pointdirectionY=" + pointdirectionY + ", pointdirectionZ=" + pointdirectionZ + "]";
	}
	
	
}
