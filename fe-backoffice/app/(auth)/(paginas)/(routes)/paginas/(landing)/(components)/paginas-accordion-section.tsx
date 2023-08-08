"use client";
import { instance } from "@/app/axiosInstance";
import { DeletionAlert } from "@/components/abstract/deletion-alert";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { IAvailableLanguages } from "@/config/available-languages";
import { ERoleLevel } from "@/context/enums";
import { useAppContext } from "@/context/provider";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export interface Field {
  id: string;
  fieldId: string;
  fieldType: "text";
  fieldLabel: string;
  fieldValue: string;
  lang: string;
}

interface IPaginasAccordionSection {
  title: string;
  sectionId: string;
  lang: IAvailableLanguages | undefined;
  initialFields: Field[];
  onSubmit?: (title: string, newValues: Field[]) => void;
}

export const PaginasAccordionSection: React.FC<IPaginasAccordionSection> = ({
  title,
  sectionId,
  lang,
  initialFields,
  onSubmit = (title, fields) => {
    console.log(title, JSON.stringify(fields, null, 1));
  },
}) => {
  const [fields, setFields] = useState(initialFields);
  const [refreshComponent, setRefreshComponent] = useState(0);
  const [isOpenFieldDeletionModal, setIsOpenFieldDeletionModal] = useState("");

  const [IsLoadingCreateNeweField, setIsLoadingCreateNeweField] =
    useState(false);

  const [IsLoadingSaveForm, setIsLoadingSaveForm] = useState(false);

  const { toast } = useToast();
  const { roleLevel } = useAppContext();

  const onChangeFieldValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setFields((prev) => {
      prev[index].fieldValue = e.target.value;
      return prev;
    });
  };
  const onChangeFieldLabel = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setFields((prev) => {
      prev[index].fieldLabel = e.target.value;
      return prev;
    });
  };
  const onChangeFieldId = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setFields((prev) => {
      prev[index].fieldId = e.target.value;
      return prev;
    });
  };

  const onUpdateField = async () => {
    if (!fields.length) return;
    setIsLoadingSaveForm(true);
    console.log("fields: ", fields);
    try {
      await instance.patch(`/api/backoffice/sections/${sectionId}/fields`, {
        fields,
        lang: lang?.value,
      });
    } catch (E) {
      console.log("error:", E);
      const error = E as any;
      const messages = error.response.data.errors;
      toast({
        title: "Error",
        description: messages[0].message,
        variant: "destructive",
      });
    } finally {
      setIsLoadingSaveForm(false);
    }
  };

  const onAddNewField = async () => {
    console.log("onAddNewField");

    setIsLoadingCreateNeweField(true);
    console.log("lang: ", lang);
    const newField: Field = {
      id: Math.floor(Math.random() * 10000).toString(),
      fieldId: Math.floor(Math.random() * 10000).toString(),
      fieldType: "text",
      fieldLabel: "New input",
      fieldValue: "Initial value",
      lang: lang?.value || "es",
    };

    try {
      console.log("newField: ", newField);
      const createdField = await instance.post(
        `/api/backoffice/sections/${sectionId}/field`,
        newField
      ).then(res => res.data).catch(err => console.log("err creating new field: ", err));
      console.log("createdField:", createdField)
      setFields((prev) => {
        return [...prev, createdField];
      });
    } catch (E) {
      console.log("error:", E);
      const error = E as any;
      const messages = error.response.data.errors;
      toast({
        title: "Error while adding new field",
        description: messages[0].message,
        variant: "destructive",
      });
    } finally {
      setIsLoadingCreateNeweField(false);
    }
  };

  const onDeleteField = async (fieldId: string) => {
    /**
     * Used to pass the fieldId 
     */
    setIsOpenFieldDeletionModal(fieldId);
  };
  const deleteField = async (id: string) => {
    try {
      await instance.delete(`/api/backoffice/fields/${id}`);

      /**
       * TODO: debug why this deletes other value in the list optimistically 
       */
      window.location.reload() // temporal solution
      setFields((prev) => {
        const index = prev.findIndex((item) => item.id === id);
        console.log({ id, index, prev: JSON.parse(JSON.stringify(prev, null, 2)) });

        return prev.reduce<Field[]>((previous, current, currentIndex, array) => {

          if (currentIndex === index) return previous
          return [...previous, current]
        }, [])

      });
      /**
       * \/ Needed since nested array it's not detected for rerender.
       */
      setRefreshComponent((prev) => prev + 1);
    } catch (E) {
      console.log("error E");
      const error = E as any;
      const messages = error.response.data?.errors || ["Default error"];
      toast({
        title: "Error while deleting new field",
        description: messages[0].message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DeletionAlert
        isOpen={!!isOpenFieldDeletionModal}
        onCancel={() => setIsOpenFieldDeletionModal("")}
        onSuccess={() => {
          deleteField(isOpenFieldDeletionModal);
          setIsOpenFieldDeletionModal("");
        }}
      />
      <AccordionItem value={title}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>Aquí puedes editar los valores para la seccion {title}:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <table
                style={{
                  borderCollapse: "separate",
                  borderSpacing: "1em",
                }}
              >
                <tr>
                  <th>ID</th>
                  <th>Label</th>
                  <th>Value</th>
                </tr>
                {fields.length &&
                  fields.map((field, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Input
                            onChange={(e) => onChangeFieldId(e, index)}
                            // React useState doesn't detect nested objects changes
                            disabled={roleLevel !== ERoleLevel.SUPERADMIN}
                            defaultValue={field.fieldId}
                          ></Input>
                        </td>
                        <td>
                          <Input
                            onChange={(e) => onChangeFieldLabel(e, index)}
                            // React useState doesn't detect nested objects changes
                            disabled={roleLevel !== ERoleLevel.SUPERADMIN}
                            defaultValue={field.fieldLabel}
                          ></Input>
                        </td>
                        <td>
                          <Input
                            onChange={(e) => onChangeFieldValue(e, index)}
                            // React useState doesn't detect nested objects changes
                            defaultValue={field.fieldValue}
                            disabled={
                              roleLevel !== ERoleLevel.SUPERADMIN &&
                              roleLevel !== ERoleLevel.ADMIN
                            }
                          ></Input>
                        </td>
                        <td>
                          {roleLevel === ERoleLevel.SUPERADMIN && (
                            <Button
                              variant={"ghost"}
                              onClick={() => onDeleteField(field.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </div>
            {roleLevel === ERoleLevel.SUPERADMIN && (
              <div>
                <Button
                  onClick={() => {
                    onAddNewField();
                  }}
                  disabled={IsLoadingCreateNeweField}
                  style={{ width: 200 }}
                >
                  {IsLoadingCreateNeweField ? (
                    <Spinner />
                  ) : (
                    "Añadir nuevo campo"
                  )}
                </Button>
              </div>
            )}
            {(roleLevel === ERoleLevel.SUPERADMIN ||
              roleLevel === ERoleLevel.ADMIN) && (
                <div>
                  <Button
                    style={{ width: 150 }}
                    onClick={onUpdateField}
                    disabled={!fields.length || IsLoadingSaveForm}
                  >
                    {IsLoadingSaveForm ? <Spinner /> : "Guardar"}
                  </Button>
                </div>
              )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
};
