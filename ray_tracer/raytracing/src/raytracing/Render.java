package raytracing;

import java.awt.Color;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.xml.parsers.ParserConfigurationException;

import org.xml.sax.SAXException;


public class Render{
	
	public static int width=512;
	public static int height=512;
	public static Camera camera;
	private BufferedImage canvas;
	
	public BufferedImage getImage() {
		return canvas;
	}
	public Render(int width, int height) {
		
		this.canvas = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
		
		for(int u = 0; u< width; u++) {
			for(int v = 0; v<height; v++) {
				canvas.setRGB(v, u, Color.BLACK.getRGB());
				
			}
			
		}
		
	}
	
	public void setPixel(int x, int y, int rgb) {
		if(x > Render.width-1 || x < 0 || y >  Render.height-1 || y < 0) {
			return;
			
		}
		this.canvas.setRGB(x, y, rgb);
	}

	public static void main(String[] args) throws ParserConfigurationException, SAXException, IOException {
		// TODO Auto-generated method stub
		Parser p = new Parser();
		p.read();
		System.out.println(Render.width);
		System.out.println(Render.height);

		Camera c = p.getCamera();
		Render.camera=c;

		//render starts
		
		Tracer t = new Tracer(c, p.getModelList());
		System.out.println("Total objects on screen: "+t.modelList.size());

		Render test = new Render(512,512);
		t.raytrace(test);
		
		//Render render = getRender();
		
		BufferedImage write = test.getImage();
		File output = new File("Lab2a_xmltest.png");
		ImageIO.write(write, "png", output);
		System.out.println("FINISHED");
		
		//camerea
		System.out.println(c.getPosition());
		System.out.println(c.getUp());
		
	}
	

	
	

}
