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

interface IPaginasAccordion { }

export const PaginasAccordion: React.FC<IPaginasAccordion> = ({ }) => {
  const [sections, setSections] = useState<ISection[]>([]);

  const { languageInUse } = useAppContext();

  console.log("paginas-accordion rerendered: ",);

  useEffect(() => {
    if (!languageInUse) return;
    (async () => {
      const _sections =
        (await instance
          .get(`/api/backoffice/sections?lang=${languageInUse.value}`)
          .then((data) => data.data)
          .catch((err) => console.log("error: ", err))) || [];
      console.log("_sections: ", _sections);
      setSections(_sections);
    })();
  }, [languageInUse]);

  const [defaultOpen, setDefaultOpen] = useState<string | undefined>(window.localStorage.getItem("default-open-accordion-sections") || undefined)
  const onChangeOpen = (title: string) => {

    window.localStorage.setItem("default-open-accordion-sections", title)
    setDefaultOpen(title)
  }

  return (
    <>
      <Accordion type="single" collapsible className="w-full" value={defaultOpen}>
        {sections.length &&
          sections.map((section, index) => (
            <div
              key={index}
              onClick={() => onChangeOpen(section.title)}
            >
              <PaginasAccordionSection
                initialFields={section.initialFields}
                sectionId={section.id}
                lang={languageInUse}
                title={section.title}
                onSubmit={(title, newValues) =>
                  console.log(title, JSON.stringify(newValues, null, 1))
                }
              />
            </div>
          ))}
      </Accordion>
    </>
  );
};
