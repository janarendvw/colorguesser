import { ComponentPropsWithRef, forwardRef } from "react";

type InputProps = ComponentPropsWithRef<'input'>

const Input = forwardRef(function Input({...inheritedProps}: InputProps, ref: React.Ref<HTMLInputElement>) {
  return (
    <input
          {...inheritedProps}
        ref={ref}
          className={`placeholder:text-black/10 w-16 h-16 text-4xl text-center bg-white/60 outline-none duration-200 focus:duration-0 focus:placeholder:text-transparent focus:bg-white
          }`}
        />
  )
})

export default Input