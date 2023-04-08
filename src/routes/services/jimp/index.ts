import Jimp from "jimp";

const window = {
    width: 600,
    height: 500,
    padding: 20,
    background: "282a36",
    comment: {
        font: {
            id: Jimp.FONT_SANS_16_WHITE,
            advice: Jimp.FONT_SANS_32_WHITE,
        },
        prefix: "// ",
    }
}

interface createImageCode {
    id: number;
    message: string;
}

export async function createImageCode(props: createImageCode) {

    const card = new Jimp(
        window.width,
        window.height,
        window.background
    );

    // window buttons
    card.composite(
        createCircle("#ff5555", 8),
        window.padding,
        18
    );
    card.composite(
        createCircle("#50fa7b", 8),
        window.padding * 2,
        18
    );
    card.composite(
        createCircle("#f1fa8c", 8),
        window.padding * 3,
        18
    );

    // comment 
    card.composite(
        await createText(
            window.comment.font.id,
            props.id.toPrecision(),
            0.6
        ),
        window.padding,
        60,
    );
    card.composite(
        await createText(
            window.comment.font.advice,
            props.message,
            0.4
        ),
        window.padding,
        85,
    );


    return card;
}


function createCircle(background: string, radius: number) {
    const z = radius * 2;
    const circle = new Jimp(z, z, background);

    circle.circle({
        radius: radius,
        x: radius,
        y: radius
    });

    return circle;
}

async function createText(fontName: string, message: string, opacity: number) {
    const font = await Jimp.loadFont(fontName);
    const advice = window.comment.prefix.concat(message);

    const width = window.width - (window.padding * 2);
    const height = Jimp.measureTextHeight(
        font,
        advice,
        width,

    );

    const text = await Jimp.create(
        width,
        height,
    );

    text.print(
        font, 0, 0, advice, width
    );

    text.opacity(opacity);

    return text;
}