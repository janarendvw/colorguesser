import { useEffect, useRef } from "react";
import { useStore } from "../../stores/app-store";
import { ColorGenerator, ColorValidator } from "../../utils/ColorFabric";
import Input from "./Input";

function HslInput() {
  const {
    updateGuessedHslColor,
    guessedHslColor,
    setCaretPosition,
    caretPosition,
    resetGuessedHslColor,
    addAttempt,
    setGeneratedColor,
    generatedColor,
  } = useStore();

  const inputLength = 3;
  const inputRefs = useRef<HTMLInputElement[]>(Array(inputLength).fill(null));

  useEffect(() => {
    inputRefs.current && inputRefs?.current[caretPosition].focus();
  }, [caretPosition, guessedHslColor]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (guessedHslColor[caretPosition] === null) {
        caretPosition > 0 && setCaretPosition(caretPosition - 1);
      } else {
        updateGuessedHslColor(caretPosition, null);
      }
    }
    if (e.key === "ArrowRight" && caretPosition < inputLength - 1) {
      setCaretPosition(caretPosition + 1);
    }
    if (e.key === "ArrowLeft" && caretPosition > 0) {
      setCaretPosition(caretPosition - 1);
    }
    if (e.key.match(/^[0-9]$/)) {
      if (guessedHslColor[caretPosition]?.length === 3) {
        caretPosition < inputLength - 1 && setCaretPosition(caretPosition + 1);
      } else if (guessedHslColor[caretPosition] === (null)) {
        updateGuessedHslColor(caretPosition, e.key);
      } else {
        updateGuessedHslColor(
          caretPosition,
          guessedHslColor[caretPosition] + e.key
        );
      }
    }
    if (e.key === "Enter") {
      if (guessedHslColor.includes(null)) return;
      else {
        addAttempt({
          score: ColorValidator.validateHsl(
            generatedColor,
            `hsl(${guessedHslColor[0]}, ${guessedHslColor[1]}%, ${guessedHslColor[2]}%)`
          ),
          guessedColor: `hsl(${guessedHslColor[0]}, ${guessedHslColor[1]}%, ${guessedHslColor[2]}%)`,
          generatedColor,
        });
      }
      setCaretPosition(0);
      resetGuessedHslColor();
      setGeneratedColor(ColorGenerator.generateHsl());
    }
  };

  return (
    <div className="gap-px flex items-center font-bold w-fit rounded-md overflow-clip">
      <div className="px-4 h-full flex items-center justify-center font-bold text-4xl text-center bg-black text-white outline-none">
        hsl
      </div>
      <Input
        ref={(el) => (inputRefs.current[0] = el!)}
        onKeyDown={(e) => handleKeyDown(e)}
        placeholder="0-360"
        onFocus={() => setCaretPosition(0)}
        value={guessedHslColor[0] || ""}
        inputLength={3}
      />
      <div className="px-4 h-full flex items-center justify-center font-bold text-4xl text-center bg-black text-white outline-none">
        ,
      </div>
      <Input
        ref={(el) => (inputRefs.current[1] = el!)}
        onKeyDown={(e) => handleKeyDown(e)}
        placeholder="0-100%"
        onFocus={() => setCaretPosition(1)}
        value={guessedHslColor[1] || ""}
        inputLength={3}
      />
      <div className="px-4 h-full flex items-center justify-center font-bold text-4xl text-center bg-black text-white outline-none">
        ,
      </div>
      <Input
        ref={(el) => (inputRefs.current[2] = el!)}
        onKeyDown={(e) => handleKeyDown(e)}
        placeholder="0-100%"
        onFocus={() => setCaretPosition(2)}
        value={guessedHslColor[2] || ""}
        inputLength={3}
      />
    </div>
  );
}

export default HslInput;
