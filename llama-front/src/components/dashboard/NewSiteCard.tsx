import { PlusOutlined } from "@ant-design/icons";

type NewSiteCardProps = {
  onClick: () => void;
};

const NewSiteCard = ({ onClick }: NewSiteCardProps) => (
  <button
    className="flex flex-col gap-6 w-80 h-52 bg-white border border-black rounded-md p-6 items-center justify-center"
    onClick={onClick}
  >
    <PlusOutlined className="text-2xl" />
  </button>
);

export default NewSiteCard;
