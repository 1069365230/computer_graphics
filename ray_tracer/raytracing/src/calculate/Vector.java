package calculate;

public class Vector {

	private double i;
	private double j;
	private double k;
	
	public Vector() {
		
	}
	
	public Vector(double i, double j, double k) {
		this.i =  i;
		this.j =  j;
		this.k =  k;
	}


	public double getI() {
		return i;
	}

	public void setI(float i) {
		this.i = i;
	}

	public double getJ() {
		return j;
	}

	public void setJ(float j) {
		this.j = j;
	}

	public double getK() {
		return k;
	}

	public void setK(float k) {
		this.k = k;
	}

	@Override
	public String toString() {
		return "Vector [i=" + i + ", j=" + j + ", k=" + k + "]";
	}
	
	
}
