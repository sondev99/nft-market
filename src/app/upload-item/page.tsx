import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';
import UploadForm from './upload-form';

const UploadItem = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          <div className=" w-full">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              Create New Item
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can set preferred display name, create your profile URL and
              manage other personal settings.
            </span>
          </div>
          <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700 "></hr>

          <UploadForm />
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default UploadItem;
