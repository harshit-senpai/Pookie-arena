import Image from "next/image";

export const Hero = () => {
  return (
    <section className="pt-44 h-full bg-cover bg-center relative bg-no-repeat">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-semibold mb-6 text-gray-800">
          Your Safe Space to Thrive
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium mb-20">
          A Welcoming space designed to support your growth, provide comfort,
          and empower you to thrive-because your well-being matters.
        </p>
        <button className="text-lg text-gray-950 font-semibold bg-[#A2D729] rounded-md border border-[#A2D729] px-6 py-1.5">
          Get Started
        </button>
      </div>
      <div className="absolute -bottom-96 z-0 ">
        <Image src={"/BG.svg"} alt="bg" width={1920} height={1080} />
      </div>
    </section>
  );
};
