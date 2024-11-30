package model;

import java.awt.Color;
import java.util.LinkedList;

import calculate.Calculator;
import calculate.Vector;
import raytracing.Light;
import raytracing.Ray;
import raytracing.Render;

public class Material {
	private final double bias = 0.1;
	private Model m;
	
	private Light light;
	
	//not needed rn
	
	private Vector ambient;
	private Vector specular;
	private Vector diffuse;
	
	private float colorR;
	private float colorG;
	private float colorB;
	
	private float ka;
	private float kd;
	private float ks;
	private int exponent;
	
	private float reflectance;
	private float transmittance;

	private float refraction;

	public int basecolor() {
		int out =new Color(this.colorR, this.colorG, this.colorB).getRGB();
		return out;
		
	}
	
	public int color(Vector pos, LinkedList<Model> modelList) {
		int ambient =new Color(light.getAmbientR()*ka*this.colorR, light.getAmbientG()*ka*this.colorG, light.getAmbientB()*ka*this.colorB).getRGB();
		this.ambient = new Vector(light.getAmbientR()*ka*this.colorR, light.getAmbientG()*ka*this.colorG, light.getAmbientB()*ka*this.colorB);
		
		Vector lightDirection = new Vector(this.light.getDirectionX(), this.light.getDirectionY(), this.light.getDirectionZ());
		Vector l = Calculator.normalized(Calculator.mul(lightDirection, -1));
		//Calculator.normalized(Calculator.minus(pos, this.position));
		//Calculator.minus(pos, lightDirection)
		//shadow ray, have not completed
		//point to light Calculator.normalized(Calculator.minus(lightDirection, pos))
		//Vector lightpoint = Calculator.normalized(lightDirection); 
		//Calculator.plus(pos, Calculator.mul(lightpoint, bias));
		Vector origin = Calculator.plus(pos, Calculator.mul(l, bias));
		//Calculator.normalized(Calculator.minus(pos, this.position))
		//light vector is then not to all direction, it should limited to 
		
		Ray shadowRay = new Ray(origin, l);
		boolean shadow = shadowRay.shadowRay(modelList);
		if(shadow) {
			return ambient;
			//return Color.BLACK.getRGB();
		}
		double cos = Calculator.dot(m.normalVec(pos), l);

		if(cos > Math.toRadians(90) || cos < Math.toRadians(0)) {
			cos=0;
		}
		float Id = (float)cos * kd;
		
		int diffuse = new Color(light.getLightR() * Id * this.colorR, light.getLightG() * Id * this.colorG, light.getLightB() * Id * this.colorB).getRGB();
		
		//reflected vector
		Vector preR = Calculator.minus(Calculator.mul(m.normalVec(pos), 2*cos), l);
		Vector R = Calculator.normalized(preR);
		
		Vector temp = Calculator.normalized(Calculator.minus(Render.camera.getPosition(), pos));
		
		double spec = Math.max(Calculator.dot(R, temp), 0);
		if(spec > Math.toRadians(90) || spec < Math.toRadians(0)) {
			spec=0;
		}
		float preSpec = (float) Math.pow(spec, exponent) * ks;
		
		int specular = new Color(light.getLightR() * preSpec * this.colorR, light.getLightG() * preSpec * this.colorG, light.getLightB() * preSpec * this.colorB).getRGB();
		
		int out = ambient + diffuse + specular;
		return out;
		
	}
	
	public Material(Model m, Light light, float colorR, float colorG, float colorB, float ka, float kd, float ks, int exponent,
			float reflectance, float transmittance, float refraction) {
		this.m = m;
		this.light = light;
		this.colorR = colorR;
		this.colorG = colorG;
		this.colorB = colorB;
		this.ka = ka;
		this.kd = kd;
		this.ks = ks;
		this.exponent = exponent;
		this.reflectance = reflectance;
		this.transmittance = transmittance;
		this.refraction = refraction;

		//this.ambient = light.getAmbient();
	}
	
	public float getColorR() {
		return colorR;
	}

	public void setColorR(float colorR) {
		this.colorR = colorR;
	}

	public float getColorG() {
		return colorG;
	}

	public void setColorG(float colorG) {
		this.colorG = colorG;
	}

	public float getColorB() {
		return colorB;
	}

	public void setColorB(float colorB) {
		this.colorB = colorB;
	}

	public float getKa() {
		return ka;
	}

	public void setKa(float ka) {
		this.ka = ka;
	}

	public float getKd() {
		return kd;
	}

	public void setKd(float kd) {
		this.kd = kd;
	}

	public float getKs() {
		return ks;
	}

	public void setKs(float ks) {
		this.ks = ks;
	}

	public int getExponent() {
		return exponent;
	}

	public void setExponent(int exponent) {
		this.exponent = exponent;
	}

	public float getReflectance() {
		return reflectance;
	}

	public void setReflectance(float reflectance) {
		this.reflectance = reflectance;
	}

	public float getTransmittance() {
		return transmittance;
	}

	public void setTransmittance(float transmittance) {
		this.transmittance = transmittance;
	}

	public float getRefraction() {
		return refraction;
	}

	public void setRefraction(float refraction) {
		this.refraction = refraction;
	}


	@Override
	public String toString() {
		return "Material [colorR=" + colorR + ", colorG=" + colorG + ", colorB=" + colorB + ", ka=" + ka + ", kd=" + kd
				+ ", ks=" + ks + ", exponent=" + exponent + ", reflectance=" + reflectance + ", transmittance="
				+ transmittance + ", refraction=" + refraction + "]";
	}
	
	
	

}
