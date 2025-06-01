import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { FaUpload, FaTimesCircle } from 'react-icons/fa';

interface CertificateUploadProps {
  certificates: File[];
  onCertificateUpload: (files: File[]) => void;
  onRemoveCertificate: (index: number) => void;
}

const CertificateUpload: React.FC<CertificateUploadProps> = ({
  certificates,
  onCertificateUpload,
  onRemoveCertificate
}) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME,
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onCertificateUpload(files);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FaUpload className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload certificates</span>
            </p>
            <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 10MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            multiple
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Preview uploaded certificates */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {certificates.map((file, index) => (
          <div key={index} className="relative">
            {file.type.includes('image') ? (
              <AdvancedImage
                cldImg={cld
                  .image(URL.createObjectURL(file))
                  .format('auto')
                  .quality('auto')
                  .resize(auto().gravity(autoGravity()).width(200).height(200))
                }
                className="rounded-lg shadow-md"
              />
            ) : (
              <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-500">{file.name}</p>
              </div>
            )}
            <button
              type="button"
              onClick={() => onRemoveCertificate(index)}
              className="absolute -top-2 -right-2 text-red-500 hover:text-red-700"
            >
              <FaTimesCircle className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateUpload;