import { useRef, useState, useEffect } from 'react'
import { Canvas, Rect, Circle, Triangle } from 'fabric';
import RectangleIcon from '@mui/icons-material/Rectangle';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CircleIcon from '@mui/icons-material/Circle';
import { IconButton } from '@mui/material';
import './CreateCanvas.css';
const CreateCanvas = () => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [eventLog, setEventLog] = useState([]);
    const [shapeColor, setShapeColor] = useState("#ea8585");
    useEffect(() => {
        let initCanvas;
        if (canvasRef.current) {
            initCanvas = new Canvas(canvasRef.current, { width: 600, height: 600, backgroundColor: "white" })
        }
        const rect = new Rect({
            top: 40,
            left: 40,
            width: 100,
            height: 60,
            fill:shapeColor
        })
        initCanvas.add(rect);
        const circle = new Circle({
            top: 140,
            left: 40,
            radius: 50,
            fill: shapeColor
        })
        initCanvas.add(circle);
        const triangle = new Triangle({
            top: 270,
            left: 40,
            width: 100,
            height: 100,
            fill: shapeColor
        });
        initCanvas.add(triangle);
        if (initCanvas) {
            initCanvas.on("mouse:down", (e) => {
                if (e.target) {
                    const { type } = e.target;
                    const { x: pointerX, y: pointerY } = e.pointer;
                    const message = `CLICKED ON ${type.toUpperCase()} AT (x = ${pointerX.toFixed(0)}, y = ${pointerY.toFixed(0)})`;
                    setEventLog((prev) => [message, ...prev]);

                    const dot = new Circle({
                        left: pointerX - 2.5,
                        top: pointerY - 2.5,
                        radius: 2.5,
                        fill: 'black',
                        selectable: false,
                        evented: false
                    });
                    initCanvas.add(dot);
                }
            });
            setCanvas(initCanvas);
        }
        return (() => {
            initCanvas.dispose();
        })
    }, [])
    const addRectangle = () => {
        const rectangle = new Rect({
            top: 60,
            left: 150,
            width: 100,
            height: 60,
            fill: shapeColor
        })
        canvas.add(rectangle);
    }
    const addTriangle = () => {
        const triangle = new Triangle({
            top: 60,
            left: 150,
            width: 100,
            height: 100,
            fill: shapeColor
        })
        canvas.add(triangle);
    }
    const addCircle = () => {
        const circle = new Circle({
            radius: 50,
            fill: shapeColor
        })
        canvas.add(circle);
    }
    return (
        <div class="container">
            <div class="canvas-wrapper">
                <div class="canvas-buttons">
                    <input
                        type="color"
                        value={shapeColor}
                        onChange={(e) => setShapeColor(e.target.value)}
                        style={{ marginBottom: '1rem' }}
                    />
                    <IconButton onClick={addRectangle}><RectangleIcon /></IconButton>
                    <IconButton onClick={addCircle}><CircleIcon /></IconButton>
                    <IconButton onClick={addTriangle}><ChangeHistoryIcon /></IconButton>
                </div>
                <canvas id="canvas" ref={canvasRef} />
            </div>
            <div class="event-log">
                <h3>EVENT LOG :</h3>
                <ul>
                    {eventLog.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default CreateCanvas