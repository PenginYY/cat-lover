import Image from "next/image";

export default function CatSearch() {
  return (
    <main className="flex flex-col h-h-dvh">
      <div className=" w-full h-auto">
        {" "}
        {/* Set the height you want with Tailwind */}
        <Image
          src="/img/default-image.png"
          alt="Default picture"
          layout="responsive"
          width={1440}
          height={698}
          className="object-cover" // Tailwind class for image fitting
        />
      </div>
      <div className="flex flex-row justify-center space-x-4 mt-10">
        <label></label>
        <input
          className="bg-[#D9D9D9] items-center rounded w-64 h-10"
          type="text"
          placeholder="Enter message"
        />
        <button className="bg-black rounded text-white w-20 h-10" type="submit">
          Search
        </button>
      </div>
    </main>
  );
}
