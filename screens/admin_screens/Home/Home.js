import React, {useEffect, useState} from 'react';
import {View, LogBox, ScrollView, SafeAreaView, Text} from 'react-native';
import ProjectsBanner from './ProjectsBanner';
import AssignedWorks from './AssignedWorks';
import ProjectReports from './ProjectReports';
import ProjectWorksIdentifier from './ProjectWorksIdentifier';
import SubmittedWorks from './SubmittedWorks';

import {useSelector, useDispatch} from 'react-redux';

const Home = () => {

  const dispatch = useDispatch()
  const companyData = useSelector(state => state.company);
  // console.log(companyData)

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
          {/* <ProjectWorksIdentifier /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
