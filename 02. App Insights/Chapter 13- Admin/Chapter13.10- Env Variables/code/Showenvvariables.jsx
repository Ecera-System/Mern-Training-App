import React from 'react';
import PageTitle from '../../Pages/Shared/PageTitle';

function ShowEnvVariables({ envVar, showEdit }) {
  const editFormOpener = () => {
    showEdit('edit');
  };

  return (
    <div className='h-full flex column flex-wrap justify-center align-middle'>
      <PageTitle title='Env variables' />
      <h1 className='text-2xl font-bold p-5'>Environment Variables</h1>
      <div className='w-full flex flex-wrap justify-between bg-white p-5 rounded relative'>
        <button
          onClick={editFormOpener}
          className='editBtn absolute right-5 top-5 bg-blue-500 text-white px-2 py-1 rounded'
        >
          Edit
        </button>
        <div className='labelInfo w-full md:w-[35%] mb-5'>
          <h3 className='text-sm'>SMTP User</h3>
          <h2 className='text-lg font-semibold'>
            {`${envVar.smtpUser}`}
          </h2>
        </div>
        <div className='labelInfo w-full md:w-[35%] mb-5'>
          <h3 className='text-sm'>SMTP Password</h3>
          <h2 className='text-lg font-semibold'>{envVar.smtpPassword}</h2>
        </div>
        <div className='labelInfo w-full md:w-[35%] mb-5'>
          <h3 className='text-sm'>Sender Email</h3>
          <h2 className='text-lg font-semibold'>{envVar.senderEmail}</h2>
        </div>
      </div>
    </div>
  );
}

export default ShowEnvVariables;