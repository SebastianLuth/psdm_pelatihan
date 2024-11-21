import { useState } from "react";
import Link from "next/link";
import ClickOutside from "@/components/ClickOutside";
type SettingDropdownProps = {
    handleStatusUpdate: () => void
}
const DropdownSettingProfile = ( {handleStatusUpdate} : SettingDropdownProps ) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          href="#"
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          <span
            className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? "hidden" : "inline"
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>

          <svg
            className="fill-current duration-300 ease-in-out"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <path
              d="M12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.434 12.9853C19.4654 12.669 19.5 12.3373 19.5 12C19.5 11.6627 19.4654 11.331 19.434 11.0147L21.2756 9.57435C21.5168 9.39596 21.5912 9.06023 21.463 8.78106L19.463 4.78106C19.3348 4.50189 19.0481 4.38064 18.767 4.46339L16.5093 5.15106C16.0407 4.80044 15.5421 4.49479 15.0166 4.24106L14.693 2.07106C14.6518 1.77913 14.4115 1.5625 14.116 1.5625H9.88397C9.58848 1.5625 9.34822 1.77913 9.307 2.07106L8.98338 4.24106C8.45792 4.49479 7.95933 4.80044 7.49071 5.15106L5.23303 4.46339C4.95192 4.38064 4.66518 4.50189 4.53703 4.78106L2.53703 8.78106C2.40887 9.06023 2.48323 9.39596 2.72441 9.57435L4.56603 11.0147C4.53463 11.331 4.5 11.6627 4.5 12C4.5 12.3373 4.53463 12.669 4.56603 12.9853L2.72441 14.4256C2.48323 14.604 2.40887 14.9398 2.53703 15.2189L4.53703 19.2189C4.66518 19.4981 4.95192 19.6194 5.23303 19.5366L7.49071 18.8489C7.95933 19.1996 8.45792 19.5052 8.98338 19.7589L9.307 21.9289C9.34822 22.2209 9.58848 22.4375 9.88397 22.4375H14.116C14.4115 22.4375 14.6518 22.2209 14.693 21.9289L15.0166 19.7589C15.5421 19.5052 16.0407 19.1996 16.5093 18.8489L18.767 19.5366C19.0481 19.6194 19.3348 19.4981 19.463 19.2189L21.463 15.2189C21.5912 14.9398 21.5168 14.604 21.2756 14.4256L19.434 12.9853ZM12 15.75C10.2051 15.75 8.75 14.2949 8.75 12.5C8.75 10.7051 10.2051 9.25 12 9.25C13.7949 9.25 15.25 10.7051 15.25 12.5C15.25 14.2949 13.7949 15.75 12 15.75Z"
              fill="currentColor"
            />
          </svg>
        </Link>

        {dropdownOpen && (
           <div
           className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
         >
           <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
             <li onClick={handleStatusUpdate}>
               <div
                 className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
               >
                 <svg
                   className="fill-current"
                   width="22"
                   height="22"
                   viewBox="0 0 22 22"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path
                     d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                     fill=""
                   />
                   <path
                     d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                     fill=""
                   />
                 </svg>
                 Edit Profile
               </div>
             </li>
           </ul>
         </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownSettingProfile;
