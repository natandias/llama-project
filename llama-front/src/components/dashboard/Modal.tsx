type Props = {
  children: React.ReactNode;
};

const Modal = ({ children }: Props) => (
  <dialog
    className="flex flex-col items-center justify-around relative mx-4 md:mx-auto h-72 lg:h-80 p-5 border border-black rounded-md text-center"
    open
  >
    {children}
  </dialog>
);

export default Modal;
