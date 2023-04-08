import { Router } from "express";
import Jimp from "jimp";
import { findAdviceById, randomAdvice } from "./services/adviceslip";
import { createImageCode } from "./services/jimp";

const routes = Router();

routes.get("/advice", async (req, res) => {

    const advice = await randomAdvice();
    const card = await createImageCode({ message:advice.advice, id: advice.id});
    
    const stream = await card.getBufferAsync(Jimp.MIME_PNG);

    res.type("png");
    res.send(stream);
});

routes.get("/advice/:id", async (req, res) => {

    const { id } = req.params;

    const advice = await findAdviceById(Number(id));
    const card = await createImageCode({ message:advice.advice, id: advice.id});
    
    const stream = await card.getBufferAsync(Jimp.MIME_PNG);

    res.type("png");
    res.send(stream);
});

export { routes };
