package raytracing;

import java.io.File;
import java.io.IOException;
import java.util.LinkedList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import model.Model;

public class Parser {
	
	private LinkedList<Model> modelList = new LinkedList<Model>();
	private Camera camera;
	private Light light;
	
	
	public LinkedList<Model> getModelList() {
		return modelList;
	}

	public Camera getCamera() {
		return camera;
	}

	public Light getLight() {
		return light;
	}

	public void read() throws ParserConfigurationException, SAXException, IOException {
		File input = new File("/Users/jin/Desktop/ray_tracer/raytracing/xml_files/example3.xml");
		
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document document = builder.parse(input);
		
		
		document.getDocumentElement().normalize();
		
		//System.out.println("ROOT: "+document.getDocumentElement().getNodeName());
		
		/*NodeList list = document.getElementsByTagName("camera");
		Node node = list.item(0);
		Element element = (Element) node;
		System.out.println("category : "+ node.getNodeName());
		*/
		
		//camera parse
		Element poselement = (Element) document.getElementsByTagName("position").item(0);
		float posz=Float.parseFloat(poselement.getAttribute("z"));
		float posy=Float.parseFloat(poselement.getAttribute("y"));
		float posx=Float.parseFloat(poselement.getAttribute("x"));
		
		//System.out.println("position : "+posz);
		//System.out.println("position : "+posy);
		//System.out.println("position : "+posx);
		
		Element lookatelement = (Element) document.getElementsByTagName("lookat").item(0);
		float lookz=Float.parseFloat(lookatelement.getAttribute("z"));
		float looky=Float.parseFloat(lookatelement.getAttribute("y"));
		float lookx=Float.parseFloat(lookatelement.getAttribute("x"));
		
		//System.out.println("lookat : "+lookz);
		//System.out.println("lookat : "+looky);
		//System.out.println("lookat : "+lookx);
		
		Element upelement = (Element) document.getElementsByTagName("up").item(0);
		float upz=Float.parseFloat(upelement.getAttribute("z"));
		float upy=Float.parseFloat(upelement.getAttribute("y"));
		float upx=Float.parseFloat(upelement.getAttribute("x"));
		
		//System.out.println("up : "+upz);
		//System.out.println("up : "+upy);
		//System.out.println("up : "+upx);
		
		Element angleelement = (Element) document.getElementsByTagName("horizontal_fov").item(0);
		double angle=Double.parseDouble(angleelement.getAttribute("angle"));
		
		//System.out.println("angle : "+angle);
		
		Element reselement = (Element) document.getElementsByTagName("resolution").item(0);
		int vertical=Integer.parseInt(reselement.getAttribute("vertical"));
		int horizontal=Integer.parseInt(reselement.getAttribute("horizontal"));
		
		//System.out.println("vertical : "+vertical);
		//System.out.println("horizontal : "+horizontal);
		
		Element bounceselement = (Element) document.getElementsByTagName("max_bounces").item(0);
		int bounces=Integer.parseInt(bounceselement.getAttribute("n"));
		
		//System.out.println("bounces : "+bounces);

		Camera cameraTemp= new Camera(posx, posy, posz, lookx, looky, lookz, upx, upy, upz, angle, vertical, horizontal, bounces);
		this.camera = cameraTemp;
		
		
		
		Render.width=camera.getWidth();
		Render.height=camera.getHeight();
		
		System.out.println("Camera : "+camera);
		
		Element lightAmbientelement = (Element) document.getElementsByTagName("ambient_light").item(0);
		((Element) lightAmbientelement.getElementsByTagName("color").item(0)).getAttribute("r");
		float lightb=Float.parseFloat(((Element) lightAmbientelement.getElementsByTagName("color").item(0)).getAttribute("b"));
		float lightg=Float.parseFloat(((Element) lightAmbientelement.getElementsByTagName("color").item(0)).getAttribute("g"));
		float lightr=Float.parseFloat(((Element) lightAmbientelement.getElementsByTagName("color").item(0)).getAttribute("r"));
		
		Element lightParallelelement = (Element) document.getElementsByTagName("parallel_light").item(0);
		
		float lightparab=0;
		float lightparag=0;
		float lightparar=0;
		float lightdirz=0;
		float lightdiry=0;
		float lightdirx=0;
		
		if(lightParallelelement!=null) {
			((Element) lightAmbientelement.getElementsByTagName("color").item(0)).getAttribute("r");
			lightparab=Float.parseFloat(((Element) lightParallelelement.getElementsByTagName("color").item(0)).getAttribute("b"));
			lightparag=Float.parseFloat(((Element) lightParallelelement.getElementsByTagName("color").item(0)).getAttribute("g"));
			lightparar=Float.parseFloat(((Element) lightParallelelement.getElementsByTagName("color").item(0)).getAttribute("r"));
			
			lightdirz=Float.parseFloat(((Element) lightParallelelement.getElementsByTagName("direction").item(0)).getAttribute("z"));
			lightdiry=Float.parseFloat(((Element) lightParallelelement.getElementsByTagName("direction").item(0)).getAttribute("y"));
			lightdirx=Float.parseFloat(((Element) lightParallelelement.getElementsByTagName("direction").item(0)).getAttribute("x"));
			
		}
		
		
		/*Element lightelement = (Element) document.getElementsByTagName("color").item(0);
		float lightb=Float.parseFloat(lightelement.getAttribute("b"));
		float lightg=Float.parseFloat(lightelement.getAttribute("g"));
		float lightr=Float.parseFloat(lightelement.getAttribute("r"));
		*/
		//Light lightTemp = new Light(lightr, lightg, lightb);
		Light lightTemp = new Light(lightr, lightg, lightb, lightparar, lightparag, lightparab, lightdirx, lightdiry, lightdirz);
		this.light = lightTemp;
		System.out.println("Light : "+light);
		
		
		
		
		NodeList list = document.getElementsByTagName("sphere");
		
		//total spheres
		System.out.println("LIST SIZE: "+list.getLength());
		
		//model parse
		//loop through surfaces/ multiple spheres
		for(int i =0; i<list.getLength();i++) {
			Element elementone = (Element) list.item(i);
			float radius = Float.parseFloat(elementone.getAttribute("radius"));
			
			float sphereOnez = Float.parseFloat(((Element) elementone.getElementsByTagName("position").item(0)).getAttribute("z"));
			float sphereOney = Float.parseFloat(((Element) elementone.getElementsByTagName("position").item(0)).getAttribute("y"));
			float sphereOnex = Float.parseFloat(((Element) elementone.getElementsByTagName("position").item(0)).getAttribute("x"));
			
			float sphereColorb = Float.parseFloat( ((Element) ((Element)elementone.getElementsByTagName("material_solid").item(0)).getElementsByTagName("color").item(0)).getAttribute("b"));
			float sphereColorg = Float.parseFloat( ((Element) ((Element)elementone.getElementsByTagName("material_solid").item(0)).getElementsByTagName("color").item(0)).getAttribute("g"));
			float sphereColorr = Float.parseFloat( ((Element) ((Element)elementone.getElementsByTagName("material_solid").item(0)).getElementsByTagName("color").item(0)).getAttribute("r"));
			
			int exponent = Integer.parseInt( ((Element) ((Element)elementone.getElementsByTagName("material_solid").item(0)).getElementsByTagName("phong").item(0)).getAttribute("exponent"));
			float ks = Float.parseFloat( ((Element) ((Element)elementone.getElementsByTagName("material_solid").item(0)).getElementsByTagName("phong").item(0)).getAttribute("ks"));
			float kd = Float.parseFloat( ((Element) ((Element)elementone.getElementsByTagName("material_solid").item(0)).getElementsByTagName("phong").item(0)).getAttribute("kd"));
			float ka = Float.parseFloat( ((Element) ((Element)elementone.getElementsByTagName("material_solid").item(0)).getElementsByTagName("phong").item(0)).getAttribute("ka"));
			
			float reflectance = Float.parseFloat( ((Element) ((Element)elementone.getElementsByTagName("material_solid").item(0)).getElementsByTagName("reflectance").item(0)).getAttribute("r"));
			
			float transmittance = Float.parseFloat( ((Element) ((Element)elementone.getElementsByTagName("material_solid").item(0)).getElementsByTagName("transmittance").item(0)).getAttribute("t"));
			
			float refraction = Float.parseFloat( ((Element) ((Element)elementone.getElementsByTagName("material_solid").item(0)).getElementsByTagName("refraction").item(0)).getAttribute("iof"));
			
			Model model= new Model(radius, sphereOnex, sphereOney, sphereOnez);
			model.setMat(lightTemp, sphereColorr, sphereColorg, sphereColorb, ka, kd, ks, exponent, reflectance, transmittance, refraction);
			
			modelList.push(model);

			System.out.println(model);
		}
		
		
	}
	
	
	
	
}
