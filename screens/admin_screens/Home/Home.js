import React, {useEffect, useState} from 'react';
import {View, LogBox, ScrollView, SafeAreaView} from 'react-native';
import ProjectsBanner from './ProjectsBanner';
import AssignedWorks from './AssignedWorks';
import ProjectReports from './ProjectReports';
import SubmittedWorks from './SubmittedWorks';
import VerifyAndRevertWork from './VerifyAndRevertWork';
import {useSelector, useDispatch} from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const companyData = useSelector(state => state.company);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

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
