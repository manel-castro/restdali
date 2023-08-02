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

interface IPaginasAccordion {
  sections: ISection[]
}


export const PaginasAccordion: React.FC<IPaginasAccordion> = ({ sections }) => {
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
