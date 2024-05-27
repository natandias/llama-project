import CONSTANTS from "@/constants";
import Modal from "./Modal";

type ExistingSiteCardProps = {
  id: string;
  name: string;
  siteStep: string;
  onEdit: () => void;
  onDelete: () => void;
  onDownload: () => void;
  isLoading: boolean;
};

const ExistingSiteCard = ({
  id,
  name,
  onEdit,
  onDelete,
  onDownload,
  isLoading,
  siteStep,
}: ExistingSiteCardProps) => (
  <div className="flex flex-col gap-6 w-80 h-60 bg-gray-100 text-black border border-black rounded-md items-center justify-center">
    {name}
    <div className="flex flex-col flex-wrap justify-center gap-1 p-2">
      <div className="flex justify-center gap-1">
        <button
          className="bg-red-300 enabled:hover:bg-red-500  disabled:text-gray-500  rounded-md p-2 px-4"
          type="button"
          onClick={onDelete}
          disabled={isLoading}
        >
          Excluir
        </button>
        <button
          className="bg-blue-300 enabled:hover:bg-blue-500   disabled:text-gray-500 rounded-md p-2 px-4"
          type="button"
          onClick={onEdit}
          disabled={isLoading}
        >
          Editar
        </button>
      </div>

      {siteStep === CONSTANTS.SITE_STEPS.DONE ? (
        <div className="flex justify-center gap-1">
          <button
            className="bg-yellow-300 enabled:hover:bg-yellow-500 disabled:text-gray-500 rounded-md p-2 px-4"
            type="button"
            onClick={onDownload}
            disabled={isLoading}
          >
            Baixar código
          </button>

          <a
            className={`${
              isLoading
                ? " bg-primary  text-gray-500 pointer-events-none "
                : "bg-primary hover:bg-primary_hover "
            }  rounded-md p-2 px-4`}
            href={`${process.env.NEXT_PUBLIC_STATIC_URL}/${id}.html`}
            target="_blank"
          >
            Visualizar
          </a>
        </div>
      ) : null}
    </div>
  </div>
);

export default ExistingSiteCard;
