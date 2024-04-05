import Input from "./Input";


function HslInput() {
  return (
    <div className="gap-px flex items-center font-bold w-fit rounded-md overflow-clip">
              <div className="px-4 h-full flex items-center justify-center font-bold text-4xl text-center bg-black text-white outline-none">
        hsl
      </div>
      <Input />
      <Input />
      <Input />
      -
      <Input />
      <Input />
      <Input />
      -
      <Input />
      <Input />
      <Input />
    </div>
  );
}

export default HslInput;
