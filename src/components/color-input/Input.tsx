import { ComponentPropsWithRef, forwardRef } from "react";

type InputProps = ComponentPropsWithRef<"input"> & {
  inputLength: number;
};

const Input = forwardRef(function Input(
  {inputLength, ...inheritedProps }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {

  const inputSize = {
    width: `${3 * inputLength}rem`,
    height: "3.5rem",
  };

  return (
    <input
      {...inheritedProps}
      ref={ref}
      maxLength={inputLength}
      style={ inputSize }
      className={`placeholder:text-black/10 text-4xl text-center bg-white/60 outline-none duration-200 focus:duration-0 focus:placeholder:text-transparent focus:bg-white
          }`}
    />
  );
});

export default Input;
