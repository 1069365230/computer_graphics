package unused_ideas;

import java.awt.Color;

import calculate.Vector;

public class Pixel {

	private double x;
	private double y;
	private Vector D;
	private Color color;
	
	public Pixel(double x, double y, Vector d) {
		this.x = x;
		this.y = y;
		this.D = d;
	}
	
	public Color getColor() {
		return color;
	}

	public void setColor(Color color) {
		this.color = color;
	}

	public double getX() {
		return x;
	}
	public void setX(double x) {
		this.x = x;
	}
	public double getY() {
		return y;
	}
	public void setY(double y) {
		this.y = y;
	}
	
	public Vector getD() {
		return D;
	}
	public void setD(Vector d) {
		this.D = d;
	}

	@Override
	public String toString() {
		return "Pixel [x=" + x + ", y=" + y + ", D=" + D + "]";
	}
	
	
}
