"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { IAvailableLanguages } from "@/config/available-languages";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

export interface Field {
  fieldId: string;
  fieldType: "text";
  fieldLabel: string;
  fieldValue: string;
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
  const [creatingErrors, setCreatingErrors] = useState<{ message: string, field: string }[]>([]);

  const { toast } = useToast()

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

  const onSave = () => { };


  const onAddNewField = async () => {
    console.log("lang: ", lang)
    try {
      await axios.post(`/api/backoffice/sections/${sectionId}/field`, {
        fieldId: Math.floor(Math.random() * 10000),
        // fieldType: "text",
        fieldLabel: "New input",
        fieldValue: "Initial value",
        lang: lang.value,
      });
    } catch (E) {
      console.log("error:", E);
      const error = E as any
      const messages = error.response.data.errors
      setCreatingErrors(messages)

    }
  };

  useEffect(() => {
    if (!creatingErrors.length) return;

    for (const error of creatingErrors) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    }

  }, [creatingErrors])

  return (
    <AccordionItem value={title}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>Aquí puedes editar los valores para la seccion {title}:</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {fields.map((field, index) => {
              return (
                <Label
                  key={index}
                  style={{ display: "flex", gap: 20, alignItems: "center" }}
                >
                  <Input
                    onChange={(e) => onChangeFieldLabel(e, index)}
                    // React useState doesn't detect nested objects changes
                    defaultValue={field.fieldLabel}
                  ></Input>
                  <Input
                    onChange={(e) => onChangeFieldValue(e, index)}
                    // React useState doesn't detect nested objects changes
                    defaultValue={field.fieldValue}
                  ></Input>
                </Label>
              );
            })}
          </div>
          <div>
            <Button
              onClick={() => {
                onAddNewField();
              }}
            >
              Add new field
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                onSubmit(title, fields);
              }}
            >
              Guardar
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
