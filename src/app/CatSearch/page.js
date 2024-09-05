import Image from "next/image";

export default function CatSearch() {
  const searchHandle = () => {};

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        <input
          className="bg-[#D9D9D9] items-center rounded w-1/3 h-10 ring-2 ring-slate-400"
          type="text"
          placeholder="Enter message"
        />
        <button
          onclick={searchHandle()}
          className="bg-black rounded text-white w-20 h-10"
          type="submit"
        >
          Search
        </button>
      </div>
      <div></div>
    </main>
  );
}
