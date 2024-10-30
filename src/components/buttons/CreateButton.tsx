import Link from "next/link";
import React from "react";

type CreateButtonProps = {
  buttonName: string;
  pathUrl: string;
};

const CreateButton: React.FC<CreateButtonProps> = ({ pathUrl, buttonName }) => {
  return (
    <Link passHref href={pathUrl} legacyBehavior>
      <a className="px-5 py-[.675rem] text-sm font-semibold text-center text-white transition duration-300 ease-in-out bg-green-600 rounded-full cursor-pointer hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
      {buttonName}
      </a>
    </Link>
  );
};

export default CreateButton;
