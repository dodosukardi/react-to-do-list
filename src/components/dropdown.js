import React, { useState, useRef, useEffect } from 'react';

const Dropdown = (props) => {
  const { onChange, placeholder, items, selected } = props;

  const [toggle, setToggle] = useState(false);
  const toggleRef = useRef(null);

  // const handleClickOutside = (event) => {
  //   if (toggleRef.current && !toggleRef.current.contains(event.target)) {
  //     setToggle(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true);
  //   };
  // }, []);

  return (
    <>
      <div>
        <button
          onClick={() => setToggle(true)}
          type="button"
          className="inline-flex w-full justify-center rounded-full border-2 bg-gray-800 bg-opacity-20 px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-opacity-40 focus:outline-none active:bg-opacity-50"
        >
          {placeholder} {selected ? ` - ${selected.name}` : ''}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div
        ref={toggleRef}
        className={`absolute ${toggle ? 'visible' : 'invisible'} left-0 z-10 mt-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        <div className="py-1" role="none">
          {items.map((item) => (
            <p
              onClick={() => {
                setToggle(false);
                onChange(item);
              }}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
            >{item.name}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
