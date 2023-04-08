
export interface IAdvice {
    id: number;
    advice: string;
}

const errorMap:IAdvice = {
    id: -500,
    advice: "if an api is not working, do not judge before knowing the reason :)",
};

export async function randomAdvice(): Promise<IAdvice> {

    return await fetch("https://api.adviceslip.com/advice")
        .then((response) => response.json())
        .then((data) => {
            
            return data.slip as IAdvice;
            
        }).catch((error) => errorMap);

}

export async function findAdviceById(id: number): Promise<IAdvice> {
    return await fetch("https://api.adviceslip.com/advice/" + id)
        .then((response) => response.json())
        .then((data) => {
            
            return data.slip as IAdvice;

        }).catch((error) => errorMap);
}