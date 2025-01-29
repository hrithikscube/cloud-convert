import Head from 'next/head';
import { file_types } from '@/utils/helpers';
import React, { useRef, useState } from 'react';
import SelectInput from '@/components/SelectInput';
import PrimaryButton from '@/components/PrimaryButton';
import PreviewModal from '@/components/modals/PreviewModal';

const Home = () => {

  const [mStates, setMStates] = useState({
    preview: {
      isOpen: false
    }
  })

  const toggleModalOpen = (name) => {
    let temp = { ...mStates }
    temp[name].isOpen = true
    setMStates(temp)
  }

  const toggleModalClose = (name) => {
    let temp = { ...mStates }
    temp[name].isOpen = false
    setMStates(temp)
  }

  const [params, setParams] = useState({
    file: '',
    preview: '',
    from_type: 'image/png',
    to_type: 'image/webp',

    files: [
      {
        file: '',
        preview: '',
        from_type: '',
        to_type: ''
      }
    ]
  })

  const handleChange = (e) => {
    let { name, value } = e.target
    setParams({
      ...params,
      [name]: value
    })
  }

  const fileRef = useRef(null)

  const addImage = () => {
    if (fileRef.current) {
      fileRef.current.click()
    }
  }


  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToastMessage('File type should be an image', 'error');
        return;
      }

      const preview = URL.createObjectURL(file);

      // Update state with the file and preview URL
      setParams({
        ...params,
        file: file,
        preview: preview
      });
    }
  };

  const handleAddNewFile = () => {
    setParams({
      ...params,
      file: '',
      preview: ''
    })

    if (fileRef.current) {
      fileRef.current.value = '';
    }
  }


  return (
    <div className='flex flex-col w-full h-screen'>

      <Head>
        <title>Cloud Convert</title>
      </Head>

      {/* Header */}
      <div className='w-full py-4 bg-[#202020]'>

        <div className='flex items-center justify-between lg:w-9/12 mx-auto'>

          <div className='flex items-center gap-4'>

            <img src="/headerlogo.png" alt="headerlogo" className='w-10 h-10 object-contain' />
            <h2 className='lg:text-2xl text-xl font-medium text-white tracking-wider'>cloud<span className='font-bold text-white'>convert</span></h2>
          </div>
        </div>

      </div>


      <div className='w-full bg-[#303030]'>

        <div className='flex lg:w-9/12 mx-auto items-center h-full py-16'>

          <div className='lg:w-1/2 h-full flex flex-col gap-2'>
            <h2 className='lg:text-3xl text-2xl font-bold text-white'>File Converter</h2>
            <p className='lg:text-base text-sm text-white'>
              CloudConvert is an online file converter. We support nearly all audio, video, document, ebook, archive, image, spreadsheet, and presentation formats. To get started, use the button below and select files to convert from your computer.
            </p>

          </div>

          <div className='lg:w-1/2 h-full flex flex-row items-center justify-center gap-4'>

            <p className='lg:text-base text-sm text-white'>convert</p>

            <div className='w-28'>
              <SelectInput
                options={file_types}
                label="..."
                name="from_type"
                value={params?.from_type}
                handleChange={handleChange}
              />
            </div>

            <p className='lg:text-base text-sm text-white'>to</p>

            <div className='w-28'>
              <SelectInput
                options={file_types}
                label="..."
                name="to_type"
                value={params?.to_type}
                handleChange={handleChange}
              />
            </div>


          </div>

        </div>

      </div>

      <div className='flex flex-col w-full py-12 items-center justify-center gap-4'>

        {
          params?.preview === '' ?
            <div className='w-40'>
              <PrimaryButton
                onClick={addImage}
                label="Select File"
              />

              <input
                type="file"
                ref={fileRef}
                name="file"
                onChange={handleFileChange}
                className="hidden"
                accept={params?.from_type}
              />

            </div>
            :
            <>
              <div className='flex flex-col lg:w-9/12 mx-auto gap-4 bg-white shadow'>

                <div className='grid grid-cols-5 items-center px-4 py-2'>

                  <div className='col-span-2'>
                    <p className='text-sm font-medium text-[#666666]'>File Name</p>
                  </div>

                  <div className='text-start'>
                    <p className='text-sm font-medium text-[#666666]'>Convert to <span className='text-[#121212] font-semibold'>{params?.to_type}</span></p>
                  </div>

                  <div className='flex items-center justify-center'>
                    <p className='lg:text-sm text-xs font-medium bg-[#28a745] text-white w-fit py-1 px-3 rounded'>Finished</p>
                  </div>

                  <div className='text-start'>
                    <PrimaryButton onClick={() => toggleModalOpen('preview')} color="bg-[#303030]" width={"w-10/12 ml-auto"} label="Preview" />
                  </div>

                </div>

              </div>

              <div className='flex flex-col lg:w-9/12 mx-auto items-centr justify-center'>

                <PrimaryButton
                  width={"w-fit mx-auto"}
                  onClick={handleAddNewFile}
                  label="Add New"
                />
              </div>
            </>
        }

      </div>

      <div className='flex flex-col w-full h-full bg-[#f9f9f9] items-center justify-center'>

        <p>Footer</p>

      </div>


      <PreviewModal
        params={params}
        open={mStates?.preview?.isOpen}
        handleClose={() => toggleModalClose('preview')}
      />

    </div>
  )
}

export default Home