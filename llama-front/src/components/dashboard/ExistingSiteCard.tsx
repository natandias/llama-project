type ExistingSiteCardProps = { title: string; onClick: () => void };

const ExistingSiteCard = ({ title, onClick }: ExistingSiteCardProps) => (
  <button
    className="flex flex-col gap-6 w-80 h-52 bg-primary text-black border border-black rounded-md items-center justify-center"
    onClick={onClick}
  >
    {title}
  </button>
);

export default ExistingSiteCard;
