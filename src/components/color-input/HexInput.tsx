import { useEffect, useLayoutEffect, useRef } from "react";
import { useStore } from "../../stores/app-store";
import { ColorGenerator, ColorValidator } from "../../utils/ColorFabric";
import Input from "./Input";

function HexInput() {
  const {
    guessedHexColor,
    generatedColor,
    addAttempt,
    caretPosition,
    setCaretPosition,
    updateGuessedHexColor,
    setGeneratedColor,
    resetGuessedHexColor,
  } = useStore();
  const inputLength = 6;
  const inputRefs = useRef<HTMLInputElement[]>(Array(inputLength).fill(null));

  useEffect(() => {
    inputRefs.current && inputRefs?.current[caretPosition].focus();
  }, [caretPosition, guessedHexColor]);

  useLayoutEffect(() => {
    setGeneratedColor(ColorGenerator.generateHex());
  }, [setGeneratedColor]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (guessedHexColor[caretPosition] === null) {
        updateGuessedHexColor(caretPosition - 1, null);
      }
      updateGuessedHexColor(caretPosition, null);
      caretPosition > 0 && setCaretPosition(caretPosition - 1);
    }
    if (e.key === "ArrowRight" && caretPosition < inputLength - 1) {
      setCaretPosition(caretPosition + 1);
    }
    if (e.key === "ArrowLeft" && caretPosition > 0) {
      setCaretPosition(caretPosition - 1);
    }
    if (e.key.match(/^[0-9a-fA-F]$/)) {
      updateGuessedHexColor(caretPosition, e.key.toString().toUpperCase());
      caretPosition < inputLength - 1 && setCaretPosition(caretPosition + 1);
    }
    if (e.key === "Enter") {
      if (guessedHexColor.includes(null)) return;
      const hex = guessedHexColor.join("");
      addAttempt({
        score: ColorValidator.validateHex(generatedColor, "#" + hex),
        guessedColor: "#" + hex,
        generatedColor,
      });
      setCaretPosition(0);
      resetGuessedHexColor();
      setGeneratedColor(ColorGenerator.generateHex());
    }
  };

  return (
    <div className="flex gap-0.5 bg-white/20 w-fit rounded-md overflow-clip font-semibold">
      <div className="w-16 h-full flex items-center justify-center font-bold text-4xl text-center bg-black text-white outline-none rounded-l-md">
        #
      </div>
      {inputRefs.current.map((_inputRef, index) => (
        <Input
          pattern="[0-9a-fA-F]"
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el!;
          }}
          type="text"
          placeholder="F"
          inputLength={1}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={() => ""}
          value={guessedHexColor[index] || ""}
          onFocus={() => {
            setCaretPosition(index);
          }}
        />
      ))}
    </div>
  );
}

export default HexInput;
