import React, { useState } from 'react';
import FeedDrive from './FeedDrive';
import Spindle from './Spindle';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const RTIndex = () => {
  const [activeTab, setActiveTab] = useState('spin');

  const handleComponentChange = (component) => {
    setActiveTab(component);
  };

  return (
    <div className="w-full">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-blue-800 mb-5 mt-3" style={{ fontFamily: 'serif' }}>
        MACHINE REAL TIME DATA
      </h2>
      <div className="melt_back  lg:w-1/2">
        <Breadcrumb />
      </div>
      <div className="ms-3 p-3">
        <div className="tem_buttong flex justify-center items-center" role="group">
          <button
            type="button"
            className={`tem_button h-16 w-[400px] rounded-2xl ${activeTab === "spin" ? "bg-sky-800 text-white" : " border-2 border-sky-500 text-info hover:shadow-xl  "}`}
            onClick={() => handleComponentChange("spin")}
          >
            SPINDLE
          </button>
          <button
            type="button"
            className={`tem_button h-16 w-[400px] rounded-2xl ${activeTab === "feed" ? "bg-sky-800 text-white" : "border-2 border-sky-500  text-info hover:shadow-xl"}`}
            onClick={() => handleComponentChange("feed")}
          >
            FEED-DRIVE
          </button>
        </div>
      </div>
      <div className="card-body">
        {activeTab === "spin" && <Spindle />}
        {activeTab === "feed" && <FeedDrive />}
      </div>
    </div>
  );
};

export default RTIndex;
