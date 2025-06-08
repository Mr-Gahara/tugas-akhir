import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Image height={48} width={48} alt="logo" src={"/Butterfly.png"} />
      <p className="p-2 font-bold text-l text-sky-900 text-nowrap">
        Fly In Fantasy
      </p>
    </div>
  );
};
