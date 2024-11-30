package raytracing;

import java.util.LinkedList;

import calculate.Calculator;
import calculate.Vector;
import model.Model;

public class Tracer {
	private Camera camera;
	public LinkedList<Model> modelList = new LinkedList<Model>();
	
	public Tracer(Camera c, LinkedList<Model> list) {
		this.camera = c;
		this.modelList = list;
		
	}

	public void raytrace(Render render) {

		for(int u = 0; u< Render.width; u++) {
			for(int v = 0; v<Render.height; v++) {
				//functioning
				double x = camera.getLeft() + (camera.getRight()-camera.getLeft()) * (u+0.5)/Render.width;
				double y = camera.getTop() + (camera.getBottom()-camera.getTop()) * (v+0.5)/Render.height;
				
				Vector temp = Calculator.plus(Calculator.mul(camera.getU(), x), Calculator.mul(camera.getV(), y));
				Vector ray = Calculator.plus(temp, camera.getNegwd());
				//direction ray to pixel
				Vector directionRay = Calculator.normalized(ray);
				
				Ray raY = new Ray(camera.getPosition(), directionRay);
				int color = raY.shootFirstRay(this.modelList);
				render.setPixel(u, v, color);
				
				
			}
		}
		
	}
	
	
	
}
