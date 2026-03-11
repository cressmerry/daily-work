package shape;

public abstract class Shape {
	private float area;
	private float perimeter;
	abstract void draw();
	abstract void erase();
	abstract void move();
	abstract void resize();
}
