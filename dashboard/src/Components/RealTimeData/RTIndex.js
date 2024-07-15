import React, { useState } from 'react';
import FeedDrive from './FeedDrive';
import './RTIndex.css'; // Import the CSS for styling and animations
import Spindle from './Spindle';

const RTIndex = () => {
  const [activeTab, setActiveTab] = useState('spin');

  const handleComponentChange = (component) => {
    setActiveTab(component);
  };

  return (
    <div className="w-full">
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
