import React, {useEffect, useState} from 'react';
import {View, LogBox, ScrollView, SafeAreaView} from 'react-native';
import ProjectsBanner from './ProjectsBanner';
import AssignedWorks from './AssignedWorks';
import ProjectReports from './ProjectReports';
import SubmittedWorks from './SubmittedWorks';
import VerifyAndRevertWork from './VerifyAndRevertWork';
import {getToken} from '../../../services/asyncStorageService';
import {useGetLoggedCompanyQuery} from '../../../services/companyAuthApi';
import {useDispatch} from 'react-redux';
import {setCompanyInfo} from '../../../features/CompanySlice';
import {setCompanyToken} from '../../../features/CompanyAuthSlice';
import {useSelector} from 'react-redux';

const Home = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  // get company data
  const companyData = useSelector(state => state.company);
  console.log(companyData);

  // get token
  const {data, isSuccess} = useGetLoggedCompanyQuery(accessToken);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setAccessToken(token);
      dispatch(setCompanyToken({token: token}));
    })();
  });

  //store data in redux store
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setCompanyInfo({
          _id: data._id,
          company_name: data.company_name,
          email: data.email,
          mobile: data.mobile,
        }),
      );
    }
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            flex: 1,
            marginBottom: 130,
          }}>
          <ProjectsBanner />
          <SubmittedWorks />
          <ProjectReports />
          <AssignedWorks />
          <VerifyAndRevertWork company_id={companyData._id} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
