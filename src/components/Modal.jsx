import { File, FileText, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const modalRef = useRef(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setPreview(null);
      setSelectedFile(null);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    if (file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("non-image");
    }
  };

  const handleDiagnose = () => {
    console.log("Fichier sélectionné:", selectedFile);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const renderFilePreview = () => {
    if (selectedFile?.type.match("image.*")) {
      return (
        <div className="relative w-full h-full flex items-center justify-center p-2">
          <img
            src={preview}
            alt="Preview"
            className="max-h-full max-w-full object-contain"
          />
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            {selectedFile.name}
          </div>
        </div>
      );
    } else if (selectedFile) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
          {selectedFile.type === "application/pdf" ? (
            <FileText className="w-12 h-12 text-red-500 mb-2" />
          ) : (
            <File className="w-12 h-12 text-gray-400 mb-2" />
          )}
          <span className="text-sm text-gray-700 font-medium text-center truncate max-w-full">
            {selectedFile.name}
          </span>
          <span className="text-xs text-gray-500 mt-1">
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="block text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        Evaluer mon CV
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50 backdrop-blur-3xl bg-opacity-50">
          <div
            ref={modalRef}
            className="relative p-4 w-full max-w-2xl max-h-full"
          >
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Diagnostic de mon CV
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={toggleModal}
                >
                  <X className="w-5 h-5" />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-input"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden"
                  >
                    {selectedFile ? (
                      renderFilePreview()
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <Upload className="w-10 h-10 mb-4 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">
                            Cliquez pour uploader
                          </span>{" "}
                          ou glissez-déposez
                        </p>
                        <p className="text-xs text-gray-400">
                          Formats supportés: PDF, JPG, PNG (Max. 10MB)
                        </p>
                      </div>
                    )}
                    <input
                      id="file-input"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b gap-3">
                <Button onClick={toggleModal}>Annuler</Button>
                <Button
                  onClick={handleDiagnose}
                  disabled={!selectedFile}
                  color="dark"
                >
                  Diagnostiquer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
