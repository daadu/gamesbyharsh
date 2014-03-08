import java.awt.*;
import java.applet.*;

/*
<applet code="sampleApplet" width=300 height=300 ></applet>
*/

public class sampleApplet extends Applet{
	public void init(){
		setBackground(Color.cyan);
		setForeground(Color.red);
	}
	public void start(){
	}
	public void stop(){

	}
	public void paint(Graphics g){
		g.drawString("Hello",50,50);
	}
	public void destroy(){}
}