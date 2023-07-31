"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Field, PaginasAccordionSection } from "./paginas-accordion-section";

interface ISection {
  title: string;
  initialFields: Field[];
}

const sections: ISection[] = [
  {
    title: "Hero",
    initialFields: [
      {
        fieldId: "field1",
        fieldType: "text",
        fieldLabel: "Title",
        fieldValue: "Initial title",
      },
      {
        fieldId: "field1",
        fieldType: "text",
        fieldLabel: "WHATEVER ELSE",
        fieldValue: "Initial title",
      },
      {
        fieldId: "field1",
        fieldType: "text",
        fieldLabel: "WHATEVERWHATEVERWHATEVERWHATEVER",
        fieldValue: "Initial title",
      },
    ],
  },
  {
    title: "Tabs",
    initialFields: [
      {
        fieldId: "field1",
        fieldType: "text",
        fieldLabel: "Title",
        fieldValue: "Initial title",
      },
    ],
  },
];

export function PaginasAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {sections.map((section, index) => (
        <PaginasAccordionSection
          key={index}
          initialFields={section.initialFields}
          title={section.title}
          onSubmit={(title, newValues) =>
            console.log(title, JSON.stringify(newValues, null, 1))
          }
        />
      ))}
    </Accordion>
  );
}
