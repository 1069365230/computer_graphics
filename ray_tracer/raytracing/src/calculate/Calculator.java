package calculate;

public class Calculator {

	public static Vector plus(Vector x, Vector y) {
		double a = x.getI()+y.getI();
		double b = x.getJ()+y.getJ();
		double c = x.getK()+y.getK();
		
		Vector out = new Vector(a, b, c);
		return out;
		
	}

	public static Vector minus(Vector x, Vector y) {
		double a = x.getI()-y.getI();
		double b = x.getJ()-y.getJ();
		double c = x.getK()-y.getK();
		
		Vector out = new Vector(a, b, c);
		return out;
		
	}
	
	public static Vector mul(Vector x, double y) {
		double a = x.getI() * y;
		double b = x.getJ() * y;
		double c = x.getK() * y;
		
		Vector out = new Vector(a, b, c);
		return out;
		
	}
	
	public static double dot(Vector x, Vector y) {
		double a = x.getI() * y.getI();
		double b = x.getJ() * y.getJ();
		double c = x.getK() * y.getK();
		
		double out = a+b+c;
		return out;
		
	}
	
	public static Vector cross(Vector x, Vector y) {
		Vector out = new Vector(x.getJ()*y.getK()-x.getK()*y.getJ(), x.getK()*y.getI()-x.getI()*y.getK(), x.getI()*y.getJ()-x.getJ()*y.getI());
		return out;
		
	}
	
	public static Vector normalized(Vector x) {
		double a = x.getI();
		double b = x.getJ();
		double c = x.getK();
		
		double length = Math.sqrt(a*a + b*b + c*c);
		if(length == 0) {
			Vector v = new Vector(0, 0, 0);
			return v;
		}
		Vector v = new Vector(a/length, b/length, c/length);
		return v;
		
	}
	
	public static double length(Vector v) {
		return Math.sqrt(v.getI()*v.getI() + v.getJ() * v.getJ() + v.getK() * v.getK());
		
	}

	
}
