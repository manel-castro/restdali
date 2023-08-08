"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  IAvailableLanguages,
  availableLanguages,
} from "@/config/available-languages";
import { useRouter } from "next/navigation";

const frameworks = availableLanguages;

interface ILanguageSelector {
  languageInUse: IAvailableLanguages | undefined;
  setLanguageInUse: React.Dispatch<React.SetStateAction<IAvailableLanguages>>;
}

export const LanguageSelector: React.FC<ILanguageSelector> = ({
  languageInUse,
  setLanguageInUse,
}) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const storedLanguage = window.localStorage.getItem("language-in-use");
    if (storedLanguage) {
      const language = availableLanguages?.find(
        (item) => item.value === storedLanguage
      )!;
      setLanguageInUse(language);
    }
  }, [setLanguageInUse]);

  const onChange = (_value: string) => {
    window.localStorage.setItem("language-in-use", _value);
    const language = availableLanguages?.find((item) => item.value === _value);
    language && setLanguageInUse(language);
    window.location.reload()
    // router.refresh() not working
    // also component state doesnt refresh component childs 
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {languageInUse?.value
            ? frameworks.find(
              (framework) => framework.value === languageInUse.value
            )?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Select a language..." />
          <CommandEmpty>Select a language</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => {
                  console.log("onselect currentvalue: ", currentValue);
                  const actualCurrentValue =
                    frameworks.find(
                      (item) => item.label.toLowerCase() === currentValue
                    )?.value || frameworks[0].value;
                  onChange(
                    currentValue === languageInUse?.value
                      ? ""
                      : actualCurrentValue
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    languageInUse?.value === framework.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
