"use client";
import { instance } from "@/app/axiosInstance";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { IAvailableLanguages } from "@/config/available-languages";
import { ERoleLevel } from "@/context/enums";
import { useAppContext } from "@/context/provider";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

export interface Field {
  fieldId: string;
  fieldType: "text";
  fieldLabel: string;
  fieldValue: string;
  lang: string;
}

interface IPaginasAccordionSection {
  title: string;
  sectionId: string;
  lang: IAvailableLanguages;
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

  const onSave = async () => {
    setIsLoadingSaveForm(true);
    console.log("fields: ", fields);
    try {
      await instance.patch(`/api/backoffice/sections/${sectionId}/fields`, {
        fields,
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
      fieldId: Math.floor(Math.random() * 10000).toString(),
      fieldType: "text",
      fieldLabel: "New input",
      fieldValue: "Initial value",
      lang: lang.value,
    };

    try {
      console.log("newField: ", newField);
      await instance.post(
        `/api/backoffice/sections/${sectionId}/field`,
        newField
      );
      setFields((prev) => {
        return [...prev, newField];
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
    try {
      await instance.delete(`/api/backoffice/fields/${fieldId}`);

      setFields((prev) => {
        const index = prev.findIndex((item) => item.fieldId === fieldId);
        console.log({ index, prev });

        prev.splice(index, 1);
        return prev;
      });
      setRefreshComponent((prev) => prev + 1);
    } catch (E) {
      console.log("error:", E);
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
    <AccordionItem value={title}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>Aquí puedes editar los valores para la seccion {title}:</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {fields.map((field, index) => {
              return (
                <div key={index} style={{ display: "flex" }}>
                  <Label
                    style={{ display: "flex", gap: 20, alignItems: "center" }}
                  >
                    <Input
                      onChange={(e) => onChangeFieldLabel(e, index)}
                      // React useState doesn't detect nested objects changes
                      disabled={roleLevel !== ERoleLevel.SUPERADMIN}
                      defaultValue={field.fieldLabel}
                    ></Input>
                    <Input
                      onChange={(e) => onChangeFieldValue(e, index)}
                      // React useState doesn't detect nested objects changes
                      defaultValue={field.fieldValue}
                      disabled={
                        roleLevel !== ERoleLevel.SUPERADMIN &&
                        roleLevel !== ERoleLevel.ADMIN
                      }
                    ></Input>
                  </Label>
                  {roleLevel === ERoleLevel.SUPERADMIN && (
                    <Button
                      variant={"ghost"}
                      onClick={() => onDeleteField(field.fieldId)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  )}
                </div>
              );
            })}
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
                {IsLoadingCreateNeweField ? <Spinner /> : "Añadir nuevo campo"}
              </Button>
            </div>
          )}
          {(roleLevel === ERoleLevel.SUPERADMIN ||
            roleLevel === ERoleLevel.ADMIN) && (
            <div>
              <Button
                style={{ width: 150 }}
                onClick={onSave}
                disabled={IsLoadingSaveForm}
              >
                {IsLoadingSaveForm ? <Spinner /> : "Guardar"}
              </Button>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
