export default function validateColor(generatedColor: string, guessedColor: string){
    const splicedGeneratedColor =  {
        r: parseInt(generatedColor.slice(1,3), 16),
        g: parseInt(generatedColor.slice(3,5), 16),
        b: parseInt(generatedColor.slice(5,7), 16)
    }

    const splicedGuessedColor =  {
        r: parseInt(guessedColor.slice(1,3), 16),
        g: parseInt(guessedColor.slice(3,5), 16),
        b: parseInt(guessedColor.slice(5,7), 16)
    }
    console.log(splicedGeneratedColor, splicedGuessedColor);

    const rDiff = Math.abs(splicedGeneratedColor.r - splicedGuessedColor.r);
    const gDiff = Math.abs(splicedGeneratedColor.g - splicedGuessedColor.g);
    const bDiff = Math.abs(splicedGeneratedColor.b - splicedGuessedColor.b);

    const totalDiff = rDiff + gDiff + bDiff;

    return Math.max(500 - totalDiff, 0);

}