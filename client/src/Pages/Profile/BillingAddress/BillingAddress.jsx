import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ShowBillingAddress from './ShowBillingAddress';
import StoreBillingAddressForm from './StoreBillingAddressForm';
import Spinner from '../../Shared/Spinner/Spinner';
import PageTitle from '../../Shared/PageTitle';
import EditBillingAddressForm from './EditBillingAddressForm'


function BillingAddress() {
  const [currentPage, setCurrentPage] = useState('');
  const [billingAddress, setBillingAddress] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchBillingAddressData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_V1_URL}/billing-address/fetch`,
        // 'http://localhost:5600/api/v1/billing-address/store',
        {
          headers: {
            Authorization: localStorage.getItem("auth_token"),
          },
        }
      );

      if(response.data.billingAddress){
        setBillingAddress(response.data.billingAddress);
        setCurrentPage('fetch');
      }else{
        setCurrentPage('store');
      }
      // console.log(response);
      setLoading(false);
    } catch (error) {
      setCurrentPage('store');
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBillingAddressData()
  }, [])

  const showInfoFun = async(val) =>{
    if(val){
      await fetchBillingAddressData()
    }
  }

  const showAnotherScreen = (val) =>{
    setCurrentPage(val)
    if(val === 'fetch'){
      fetchBillingAddressData();
    }
  }

  return (
    <div>
      <PageTitle title='Billing Address' />
      {currentPage === 'fetch' ? (
        <ShowBillingAddress billingAdd={billingAddress} showEdit={showAnotherScreen} />
      ) : currentPage === 'store' ? (
        <StoreBillingAddressForm showInfo={showInfoFun} />
      ) : currentPage === 'edit' ? (
        <EditBillingAddressForm showInfo={showAnotherScreen} />
      ) : null}
      {loading && <Spinner />}
    </div>
  );
}

export default BillingAddress