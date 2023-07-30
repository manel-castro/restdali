"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";

interface Field {
  fieldId: string;
  fieldType: "text";
  fieldLabel: string;
  fieldValue: string;
}

interface IPaginasAccordionSection {
  title?: string;
  initialFields?: Field[];
  onSubmit?: (title: string, newValues: Field[]) => void;
}

export const PaginasAccordionSection: React.FC<IPaginasAccordionSection> = ({
  title = "Hero",
  initialFields = [
    {
      fieldId: "field1",
      fieldType: "text",
      fieldLabel: "Title",
      fieldValue: "Initial title",
    },
  ],
  onSubmit = (title, fields) => {
    console.log(title, JSON.stringify(fields, null, 1));
  },
}) => {
  const [fields, setFields] = useState(initialFields);

  const onChangeField = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setFields((prev) => {
      prev[index].fieldValue = e.target.value;
      return prev;
    });
  };

  return (
    <AccordionItem value="item-1">
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        <div>Aquí puedes editar los valores para la seccion {title}:</div>
        <div>
          {fields.map((field, index) => {
            return (
              <div key={index} style={{ display: "flex" }}>
                <div>{field.fieldLabel}</div>
                <input
                  onChange={(e) => onChangeField(e, index)}
                  // React useState doesn't detect nested objects changes
                  defaultValue={field.fieldValue}
                ></input>
              </div>
            );
          })}
          <Button
            onClick={() => {
              onSubmit(title, fields);
            }}
          >
            Guardar
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
