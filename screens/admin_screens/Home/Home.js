import React, {useEffect, useState} from 'react';
import {View, LogBox, ScrollView, SafeAreaView, Text} from 'react-native';
import ProjectsBanner from './ProjectsBanner';
import AssignedWorks from './AssignedWorks';
import ProjectReports from './ProjectReports';
import ProjectWorksIdentifier from './ProjectWorksIdentifier';

import { getToken } from '../../../services/asyncStorageService';
import { useGetLoggedCompanyQuery } from '../../../services/companyAuthApi';
import { useDispatch } from 'react-redux';
import { setCompanyInfo } from '../../../features/CompanySlice';
import { setCompanyToken } from '../../../features/CompanyAuthSlice';
import { useSelector } from 'react-redux';

const Home = () => {

  const [accessToken, setAccessToken] = useState('');
  console.log('ok');
  console.log(accessToken);

  useEffect( () => {
    (async() => {
        const token = await getToken();
        setAccessToken(token)
        dispatch(setCompanyToken({ token:token }))
      })();
  })

  const { data, isSuccess } = useGetLoggedCompanyQuery(accessToken)
  // console.log(data)

  //store data in redux store
  const dispatch = useDispatch()
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCompanyInfo({ _id:data._id, company_name:data.company_name, email: data.email, mobile: data.mobile  }))
    }
  })

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const companyData = useSelector(state => state.company);
  
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            flex: 1,
            marginBottom: 130,
          }}>
          <Text>{accessToken}</Text>
          <ProjectsBanner />
          <AssignedWorks />
          {/* <ProjectReports /> */}
          {/* <ProjectWorksIdentifier /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
