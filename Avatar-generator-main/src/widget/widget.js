import { getColorIterator } from "./utils/colors/color.js"
import blob from "./utils/blob/blob.js"

function widget(key, draw) {
    let nextColor = getColorIterator(key)
    
    const canvasWidth = 1400;
    const canvasHeight = 1400;

    const shapeSize = 20;
    const shapeSpacing = key.next256() % 10 + 5; 
    const shapeCountX = Math.floor(canvasWidth / (shapeSize + shapeSpacing));
    const shapeCountY = Math.floor(canvasHeight / (shapeSize + shapeSpacing));

    let shapeType = key.next() % 4;

    draw.rect(canvasWidth, canvasHeight).fill(nextColor());

    for (let i = 0; i < shapeCountX; i++) {
        for (let j = 0; j < shapeCountY; j++) {
            const x = (i * (shapeSize + shapeSpacing) + key.next() * shapeSpacing) % canvasWidth;
            const y = (j * (shapeSize + shapeSpacing) + key.next256() * shapeSpacing) % canvasHeight;

            if (shapeType === 1) {
                draw.polygon([
                    [x, y],
                    [x + shapeSize + key.next(), y],
                    [x + shapeSize + key.next() / 2, y + shapeSize + key.next()]
                ])
                    .fill(nextColor())
                    .opacity(0.5);

                shapeType = key.next() % 3;
                
            } else if (shapeType === 2) {
                draw.circle()
                    .radius(shapeSize + key.next() / 2)
                    .center(x + shapeSize + key.next256() / 2, y + shapeSize + key.next256() / 2)
                    .fill(nextColor())
                    .opacity(0.5);

            } else if (shapeType === 3) {
                draw.rect(shapeSize + key.next(), shapeSize + key.next()).x(x + key.next256() * shapeSpacing)
                    .y(y + key.next256() * shapeSpacing)
                    .fill(nextColor())
                    .opacity(0.5);

            } else if (shapeType === 4) {
                let b = blob(key.next256())
                
                b.fill(nextColor())
                    .opacity(0.5)
                b.move(key.next(),key.next256())
                    .size(key.next())
                b.addTo(draw)
            }

            shapeType = key.next() % 4;
        }
    }
}

export default widget
