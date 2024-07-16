import React, { useState, useEffect } from 'react';
import PDF1 from '../pdf/maxi-200-macpower-machine.pdf';
import PDF2 from '../pdf/t999_user_manual.pdf';
import PDF3 from '../pdf/o032_cnc_operator_operation_manual_en.pdf';
import PDF4 from '../pdf/Capture.JPG';
import PDF5 from '../pdf/CNC-Turning-Machine-Parts.jpg';
import PDF6 from '../pdf/DSC.JPG';
import { useNavigate, Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

const PdfViewer = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [fileName, setFileName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const documents = [
    { name: 'Data Sheet', url: PDF1, isImage: false, fileName: 'data_sheet.pdf' },
    { name: 'Operating Manual', url: PDF2, isImage: false, fileName: 'operating_manual.pdf' },
    { name: 'Maintenance Manual', url: PDF3, isImage: false, fileName: 'maintenance_manual.pdf' },
    { name: 'Job1 Drawing', url: PDF4, isImage: true, fileName: 'job1_drawing.jpg' },
    { name: 'Job2 Drawing', url: PDF5, isImage: true, fileName: 'job2_drawing.jpg' },
    { name: 'Job3 Drawing', url: PDF6, isImage: true, fileName: 'job3_drawing.jpg' },
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleButtonClick = (url, image, name) => {
    setFileUrl(url);
    setIsImage(image);
    setFileName(name);
  };

  const handleReset = () => {
    window.location.reload();
  };

  const handleDownload = () => {
    if (fileUrl) {
      fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(() => alert('An error occurred while downloading the file.'));
    }
  };

  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-blue-600 mb-12">Machine Specifications and Documents</h1>
      <p>
                        <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center">
                            <FaHome className="mr-2" size={30}/>
                            <span className="hover:underline text-2xl">Home</span>
                        </Link>
                    </p>
      <div className="w-full mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 space-y-4 lg:space-y-0">
            <div className="flex flex-wrap justify-center lg:justify-start">
              {filteredDocuments.map((doc, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(doc.url, doc.isImage, doc.fileName)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 m-1 rounded focus:outline-none focus:shadow-outline text-xs sm:text-sm lg:text-base"
                >
                  {doc.name}
                </button>
              ))}
            </div>
            <div className="flex space-x-2 justify-center lg:justify-end">
              {/* <button
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-xs sm:text-sm lg:text-base"
              >
                Reset
              </button> */}
              <button
                onClick={handleDownload}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-xs sm:text-sm lg:text-base"
                disabled={!fileUrl}
              >
                Download
              </button>
            </div>
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {fileUrl && (
            <div className="bg-gray-200 flex justify-center items-center">
              {isImage ? (
                <img
                  src={fileUrl}
                  alt="Drawing"
                  className="max-w-full max-h-[90vh] object-contain"
                />
              ) : (
                <div className="w-full h-[calc(100vh-250px)] min-h-[500px]">
                  <iframe
                    src={fileUrl}
                    className="w-full h-full"
                    title="PDF Viewer"
                  ></iframe>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;