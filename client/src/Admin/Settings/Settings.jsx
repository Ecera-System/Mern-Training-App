// components/Settings.js
import React, { useState } from 'react';
import PageTitle from '../../Pages/Shared/PageTitle';
import ChooseLanguage from './ChooseLanguage';

const Settings = () => {
  const [state, setState] = useState("show");
  // Add your settings logic here
  return (<>
    <PageTitle title="Settings" />
    <div className='w-full my-5 text-gray-600'>
      <div className="p-5 border-b bg-white rounded-lg border">
        <h3 className="font-semibold text-xl mb-3">Settings</h3>
        <p className="text-content text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum
        </p>
        <div className="flex flex-wrap items-center gap-5 mt-5">
                    <button
                        className={`py-3 px-4 border hover:bg-violet-100 ${state === "add" && "bg-violet-100"}`}
                        onClick={() => setState("add")}
                    >
                        Choose Language
                    </button>
                    <button
                        className={`py-3 px-4 border hover:bg-violet-100 ${state === "add" && "bg-violet-100"}`}
                        onClick={() => setState("add")}
                    >
                        Theme
                    </button>
                    <button
                        className={`py-3 px-4 border hover:bg-violet-100 ${state === "show" && "bg-violet-100"}`}
                        onClick={() => setState("show")}
                    >
                        About
                    </button>
                </div>
      </div>
      {state === "add" && <ChooseLanguage  />}

      {state === "add" && <Theme  />}

      {state === "submit" && <About />}
    </div>
  </>);
};

export default Settings;