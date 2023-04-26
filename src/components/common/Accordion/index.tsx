import { Disclosure as AccordionPrimitive } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { AccordionProps } from "./index.props";


const Accordion = (props: AccordionProps) => {
  const { name, child } = props;
  return (
    <AccordionPrimitive>
      {({ open }) => (
        <>
          <AccordionPrimitive.Button className="border:black delay-50 flex w-full items-center justify-between rounded-xl bg-[#4a4a4a] px-3 py-2 text-sm tracking-wider outline-0 transition-all placeholder:text-white/20 hover:border-[#1E88E5]/40 hover:bg-[#6b6b6b] focus:border-[#1E88E5] focus-visible:ring sm:py-2 md:text-lg">
            {name}
            <FaChevronDown
              className={`${open ? "rotate-180 transform" : ""} h-5 w-5`}
            />
          </AccordionPrimitive.Button>
          <AccordionPrimitive.Panel className="rounded-xl bg-[#4a4a4a] p-2">
            {child}
          </AccordionPrimitive.Panel>
        </>
      )}
    </AccordionPrimitive>
  );
};

export {
  Accordion
};
