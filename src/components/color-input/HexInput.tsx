import { useEffect, useLayoutEffect, useRef } from "react";
import { useStore } from "../../stores/app-store";
import ColorGenerator from "../../utils/color-generator2";
import Input from "./Input";

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

  useLayoutEffect(() => {
    setGeneratedColor(ColorGenerator.generateHex());
  }
  , [setGeneratedColor]);

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
        score: ColorGenerator.validateHex(generatedColor, '#' + hex),
        guesssedColor: '#' + hex,
        generatedColor,
      });
      setCaretPosition(0);
      resetGuesssedColor();
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
