import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ShowEnvVariables from './ShowEnvVariables';
import StoreEnvVariables from './StoreEnvVariables';
import PageTitle from '../../Pages/Shared/Spinner/Spinner.jsx'
import EditEnvVariables from './EditEnvVariables';
import Spinner from '../../Pages/Shared/Spinner/Spinner';


function EnvVariables() {
  const [currentPage, setCurrentPage] = useState('');
  const [envVar, setEnvVar] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchEnvVar = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_V1_URL}/admin/get-env-variables`,
        // 'http://localhost:5600/api/v1/billing-address/store',
        {
          headers: {
            Authorization: localStorage.getItem("auth_token"),
          },
        }
      );

      if(response.data.envVar){
        setEnvVar(response.data.envVar);
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
    fetchEnvVar()
  }, [])

  const showInfoFun = async(val) =>{
    if(val){
      await fetchEnvVar()
    }
  }

  const showAnotherScreen = async(val) =>{
    setCurrentPage(val)
    if(val === 'fetch'){
      await fetchEnvVar();
    }
  }

  return (
    <div>
      {currentPage === 'fetch' ? (
        <ShowEnvVariables envVar={envVar} showEdit={showAnotherScreen} />
      ) : currentPage === 'store' ? (
        <StoreEnvVariables showInfo={showInfoFun} />
      ) : currentPage === 'edit' ? (
        <EditEnvVariables showInfo={showAnotherScreen} />
      ) : null}
      {loading && <Spinner />}
    </div>
  );
}

export default EnvVariables;