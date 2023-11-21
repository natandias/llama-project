type props = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: props) {
  return (
    <aside
      className={`h-[94vh] ${
        isOpen
          ? "absolute md:relative w-full md:w-72 text-black"
          : "relative w-0 text-transparent"
      } bg-zinc-200 transition-all ease-in-out delay-200 text-center pt-6`}
    >
      aside
    </aside>
  );
}
