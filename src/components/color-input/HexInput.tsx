import { useEffect, useRef } from "react";
import { useStore } from "../../stores/app-store";
import Input from "./Input";
import validateHex from "../../utils/color-validator";
import generateColor from "../../utils/color-generator";

function HexInput() {
  const {
    guesssedColor,
    generatedColor,
    addAttempt,
    caretPosition,
    setCaretPosition,
    updateGuesssedColor,
    setGeneratedColor,
    resetGuesssedColor,
  } = useStore();
  const inputLength = 6;
  const inputRefs = useRef<HTMLInputElement[]>(Array(inputLength).fill(null));

  useEffect(() => {
    inputRefs.current && inputRefs?.current[caretPosition].focus();
    console.log(guesssedColor);
  }, [caretPosition, guesssedColor]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (guesssedColor[caretPosition] === null) {
        updateGuesssedColor(caretPosition - 1, null);
      }
      updateGuesssedColor(caretPosition, null);
      caretPosition > 0 && setCaretPosition(caretPosition - 1);
    }
    if (e.key === "ArrowRight" && caretPosition < inputLength - 1) {
      setCaretPosition(caretPosition + 1);
    }
    if (e.key === "ArrowLeft" && caretPosition > 0) {
      setCaretPosition(caretPosition - 1);
    }
    if (e.key.match(/^[0-9a-fA-F]$/)) {
      updateGuesssedColor(caretPosition, e.key.toString().toUpperCase());
      caretPosition < inputLength - 1 && setCaretPosition(caretPosition + 1);
    }
    if (e.key === "Enter") {
      if (guesssedColor.includes(null)) return;
      const hex = guesssedColor.join("");
      addAttempt({
        score: validateHex(generatedColor, '#' + hex),
        guesssedColor: '#' + hex,
        generatedColor,
      });
      setCaretPosition(0);
      resetGuesssedColor();
      setGeneratedColor(generateColor());
    }
  };

  return (
    <div className="flex gap-px bg-white/20 w-fit rounded-md overflow-clip font-semibold">
      <div className="w-16 h-full flex items-center justify-center font-bold text-4xl text-center bg-black text-white outline-none rounded-l-md">
        #
      </div>
      {inputRefs.current.map((inputRef, index) => (
        <Input
          pattern="[0-9a-fA-F]"
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el!;
          }}
          type="text"
          placeholder="F"
          maxLength={1}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={() => ""}
          value={guesssedColor[index] || ""}
          onFocus={() => {
            setCaretPosition(index);
          }}
        />
      ))}
    </div>
  );
}

export default HexInput;
