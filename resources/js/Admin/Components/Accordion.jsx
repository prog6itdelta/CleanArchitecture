import { Menu } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useState } from "react";

export default function Accordion({ title, children }) {
  const [click, setClick] = useState(false);
  return (
    <Menu as="div" className="inline-block w-full drop-shadow-lg">
      <div onClick={() => setClick(!click)}>
        <Menu.Button className="inline-flex justify-center items-center w-full py-2 px-2 
        bg-indigo-600 text-base font-medium text-indigo-100 transition duration-300 hover:bg-indigo-500
        rounded
        ">
          {title}
          {click ? (
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 "
              aria-hidden="true"
            />
          ) : (
            <ChevronUpIcon className="-mr-1 ml-2 h-5 w-5 " />
          )}
        </Menu.Button>
      </div>

      <Menu.Items className="origin-top-right w-full bg-indigo-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
        <div className="py-1">
          <Menu.Item>
            <p>{children}</p>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}
