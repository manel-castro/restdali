"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Field, PaginasAccordionSection } from "./paginas-accordion-section";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/provider";
import { instance } from "@/app/axiosInstance";

interface ISection {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  initialFields: Field[];
}

interface IPaginasAccordion {}

export const PaginasAccordion: React.FC<IPaginasAccordion> = ({}) => {
  const [sections, setSections] = useState<ISection[]>([]);
  useEffect(() => {
    (async () => {
      const _sections =
        (await instance
          .get("/api/backoffice/sections")
          .then((data) => data.data)
          .catch((err) => console.log("error: ", err))) || [];
      console.log("_sections: ", _sections);
      setSections(_sections);
    })();
  }, []);

  const { languageInUse } = useAppContext();

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {sections.length &&
          sections.map((section, index) => (
            <PaginasAccordionSection
              key={index}
              initialFields={section.initialFields}
              sectionId={section.id}
              lang={languageInUse}
              title={section.title}
              onSubmit={(title, newValues) =>
                console.log(title, JSON.stringify(newValues, null, 1))
              }
            />
          ))}
      </Accordion>
    </>
  );
};
