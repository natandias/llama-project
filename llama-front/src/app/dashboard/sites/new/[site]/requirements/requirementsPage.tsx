"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Dropzone from "react-dropzone";
import { Site } from "@/app/dashboard/sites/types";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Inputs, SubmitInputs } from "./types";
import { updateSite } from "@/app/dashboard/sites/actions";
import { generateSite } from "@/app/dashboard/sites/new/[site]/description/actions";
import Loading from "@/components/dashboard/Loading";
import Modal from "@/components/dashboard/Modal";

type Props = {
  siteInfo: Site;
};

export default withPageAuthRequired(function RequirementsPage({
  siteInfo,
}: Props) {
  const params = useParams();
  const router = useRouter();

  const { site } = params;

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting, isValid },
    trigger,
    setValue,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      content: siteInfo.content,
      requirements: siteInfo.requirements,
      template: siteInfo.template,
      images: [],
    },
  });

  const imagesFiles = watch("images");

  const [imagesPreview, setImagesPreview] = useState<
    (File & { preview: string })[] | undefined
  >([]);

  useEffect(() => {
    if (imagesFiles) {
      setImagesPreview(
        imagesFiles?.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    }
  }, [imagesFiles]);

  const onSubmit: SubmitHandler<SubmitInputs> = async formValues => {
    try {
      const { content, requirements, template, images } = formValues;

      const siteId = site.toString();

      const formData = new FormData();
      formData.append("content", content);
      formData.append("requirements", requirements);
      formData.append("template", template);
      images.forEach(img => formData.append("images", img));

      const result = await updateSite(siteId, formData);
      if (!result) throw new Error("Failed to update site");

      await generateSite(siteId);
      setIsSuccessModalOpen(true);
    } catch (error: any) {
      const errorMessage = error?.message ?? "Failed to update site";
      toast.error(errorMessage);
      return false;
    }
  };

  const toggleSubmitModal = () =>
    isValid ? setIsSubmitModalOpen(!isSubmitModalOpen) : trigger();

  const returnToHome = () => router.push("/dashboard/sites");

  const thumbs = imagesPreview?.map(file => (
    <div key={file.name}>
      <div>
        <Image
          src={file.preview}
          alt={file.name}
          width={200}
          height={200}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          onClick={() =>
            setValue(
              "images",
              imagesFiles.filter(img => img.name !== file.name)
            )
          }
          className="cursor-pointer"
        ></Image>
      </div>
    </div>
  ));

  const templateOptions = [
    {
      id: "start_page",
      label: "Template ideal para Landing Pages",
      image: "start-page-template.png",
    },
    {
      id: "architects",
      label: "Template ideal para vitrine de projetos",
      image: "architects.png",
    },
    // {
    //   id: "portifolio",
    //   label: "Template ideal para portifólios",
    //   image: "portifolio.png",
    // },
    {
      id: "store",
      label: "Template ideal para lojas",
      image: "store.png",
    },
  ];

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "6em",
    borderWidth: 2,
    borderRadius: 2,
    width: "100%",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };
  const acceptStyle = {
    borderWidth: 2,
    borderColor: "#2196f3",
  };
  const rejectStyle = {
    borderColor: "#ff1744",
  };

  return isSubmitting ? (
    <Loading />
  ) : (
    <form
      className="flex flex-col items-center gap-10 w-full h-full pb-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      {!isSuccessModalOpen && isSubmitModalOpen ? (
        <Modal>
          <p className="font-semibold ">O seu site será gerado agora.</p>
          <p>Essa operação pode levar alguns minutos.</p>
          <p>É preciso manter a aba aberta enquanto o site é gerado.</p>
          <p>Podemos continuar?</p>
          <div className="flex flex-wrap justify-center gap-5 mt-5 md:mt-10">
            <button
              className="bg-white hover:bg-red-500 transition-all duration-500 text-black font-semibold text-md p-3 px-8 rounded-md mt-auto "
              type="button"
              disabled={isSubmitting}
              onClick={toggleSubmitModal}
            >
              Cancelar
            </button>
            <button
              className="bg-primary hover:bg-primary_hover text-black font-semibold text-md p-3 px-8 rounded-md mt-auto "
              type="submit"
              disabled={isSubmitting}
            >
              Continuar
            </button>
          </div>
        </Modal>
      ) : null}

      {isSuccessModalOpen ? (
        <Modal>
          <p className="font-semibold ">Parabéns!</p>
          <p>O seu site está pronto!</p>
          <p>Deseja visualizá-lo agora?</p>

          <div className="flex flex-wrap justify-center gap-5 mt-5 md:mt-10">
            <button
              className="bg-white hover:bg-yellow-500 transition-all duration-500 text-black font-semibold text-md p-3 px-8 rounded-md mt-auto "
              type="button"
              disabled={isSubmitting}
              onClick={returnToHome}
            >
              Voltar para tela inicial
            </button>

            <a
              className="bg-primary hover:bg-primary_hover text-black font-semibold text-md p-3 px-8 rounded-md mt-auto "
              href={`${process.env.NEXT_PUBLIC_STATIC_URL}/${site}.html`}
              target="_blank"
            >
              Ver site
            </a>
          </div>
          <button
            className="bg-white hover:bg-red-500  text-black font-semibold text-sm p-3 px-8 rounded-md mt-auto "
            type="submit"
            disabled={isSubmitting}
          >
            Gerar novamente?
          </button>
        </Modal>
      ) : null}

      {!isSubmitModalOpen && !isSuccessModalOpen ? (
        <>
          <p className="text-xl text-center leading-3">
            Abaixo você pode editar detalhes sobre o seu site
          </p>
          <section className="flex flex-col w-5/6">
            <label htmlFor="requirements" className="text-xl bold mb-4">
              Requisitos
            </label>
            <textarea
              {...register("requirements", {
                required: {
                  value: true,
                  message: "Requisitos não podem ser vazios",
                },
              })}
              className="min-w-1/2 min-h-[450px] border-2 border-gray-200 p-4"
            />
          </section>
          <section className="flex flex-col w-5/6">
            <label htmlFor="content" className="text-xl bold mb-4">
              Conteúdo
            </label>
            <textarea
              {...register("content", {
                required: {
                  value: true,
                  message: "Conteúdo não pode ser vazio",
                },
              })}
              className="min-w-1/2 min-h-[450px] border-2 border-gray-200 p-4"
            />
          </section>
          <section className="flex flex-col w-5/6">
            <p className="text-xl bold mb-4">Selecione um template:</p>
            <div className="flex items-center flex-wrap">
              {templateOptions.map(template => (
                <div
                  key={template.id}
                  className="flex flex-wrap items-center mt-8"
                >
                  <input
                    {...register("template", {
                      required: {
                        value: true,
                        message: "É preciso selecionar um template",
                      },
                    })}
                    type="radio"
                    value={template.id}
                    className="w-6 h-6 mr-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                  />

                  <div className="mt-2">
                    <Image
                      src={`/images/${template.image}`}
                      alt={template.label}
                      width={1100}
                      height={900}
                    />
                    <label htmlFor={template.id}>{template.label}</label>
                  </div>

                  <br />
                </div>
              ))}
            </div>
          </section>
          <section className="flex flex-col w-5/6">
            <p className="text-xl bold mb-4">
              Adicione fotos ao seu site (opcional):
            </p>

            <Controller
              name="images"
              control={control}
              rules={{ required: false }}
              render={({ field, field: { onChange } }) => (
                <Dropzone
                  {...field}
                  onDrop={acceptedFiles => {
                    onChange([...field.value, ...acceptedFiles]);
                  }}
                  onDropRejected={rejected => console.log("rejected", rejected)}
                  accept={{
                    "image/jpeg": [".jpeg", ".jpg"],
                    "image/png": [".png"],
                  }}
                  maxFiles={6}
                  maxSize={5242880}
                  multiple
                >
                  {({
                    getRootProps,
                    getInputProps,
                    isDragAccept,
                    isDragReject,
                  }) => (
                    <section className="flex flex-col items-center ">
                      <div
                        {...getRootProps({
                          style: {
                            ...baseStyle,
                            ...(isDragAccept ? acceptStyle : {}),
                            ...(isDragReject ? rejectStyle : {}),
                          },
                        })}
                      >
                        <input {...getInputProps()} />
                        <p className="text-center">
                          Arraste fotos aqui ou clique para selecionar fotos do
                          seu dispositivo (Máx: 6)
                        </p>
                        <p className="text-center">
                          (Apenas imagens .jpeg, .jpg e .png serão aceitas)
                        </p>
                      </div>
                      <aside className="flex flex-row flex-wrap gap-2 mt-4">
                        {thumbs}
                      </aside>
                    </section>
                  )}
                </Dropzone>
              )}
            />
          </section>
          <p className="text-red-500 text-md ">{errors.template?.message}</p>
          <button
            className="bg-primary hover:bg-primary_hover text-black font-semibold text-md p-3 px-8 rounded-md mt-auto "
            type="button"
            disabled={isSubmitting}
            onClick={toggleSubmitModal}
          >
            Gerar site
          </button>
        </>
      ) : null}
    </form>
  );
});
