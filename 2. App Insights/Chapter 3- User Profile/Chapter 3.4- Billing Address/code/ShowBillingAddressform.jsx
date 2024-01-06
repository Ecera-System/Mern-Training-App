import React from 'react';

function ShowBillingAddress({ billingAdd, showEdit }) {
  const editFormOpener = () => {
    showEdit('edit');
  };

  return (
    <div className='h-full flex column flex-wrap justify-center align-middle'>
      <h1 className='text-2xl font-bold p-5'>My Billing Address</h1>
      <div className='w-full flex flex-wrap justify-around bg-white p-5 rounded relative'>
        <button
          onClick={editFormOpener}
          className='editBtn absolute right-5 top-5 bg-blue-500 text-white px-2 py-1 rounded'
        >
          Edit
        </button>
        <div className='labelInfo w-full md:w-[35%] mb-5'>
          <h3 className='text-sm'>Full Name</h3>
          <h2 className='text-lg font-semibold'>
            {`${billingAdd.firstName} ${billingAdd.lastName}`}
          </h2>
        </div>
        <div className='labelInfo w-full md:w-[35%] mb-5'>
          <h3 className='text-sm'>Contact No</h3>
          <h2 className='text-lg font-semibold'>{billingAdd.contactNo}</h2>
        </div>
        <div className='labelInfo w-full md:w-[35%] mb-5'>
          <h3 className='text-sm'>Address1</h3>
          <h2 className='text-lg font-semibold'>{billingAdd.address1}</h2>
        </div>
        <div className='labelInfo w-full md:w-[35%] mb-5'>
          <h3 className='text-sm'>Address2</h3>
          <h2 className='text-lg font-semibold'>{billingAdd.address2}</h2>
        </div>
        <div className='labelInfo w-full md:w-[35%] mb-5'>
          <h3 className='text-sm'>City</h3>
          <h2 className='text-lg font-semibold'>{billingAdd.city}</h2>
        </div>
        <div className='labelInfo w-full md:w-[35%] mb-5'>
          <h3 className='text-sm'>State</h3>
          <h2 className='text-lg font-semibold'>{billingAdd.state}</h2>
        </div>
        <div className='labelInfo w-full md:w-[35%] mb-5'>
          <h3 className='text-sm'>Country</h3>
          <h2 className='text-lg font-semibold'>{billingAdd.country}</h2>
        </div>
        <div className='labelInfo w-full md:w-[35%] mb-5'>
          <h3 className='text-sm'>Zip</h3>
          <h2 className='text-lg font-semibold'>{billingAdd.zip}</h2>
        </div>
      </div>
    </div>
  );
}

export default ShowBillingAddress;