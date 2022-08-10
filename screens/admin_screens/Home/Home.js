import React from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';
import ProjectsBanner from './ProjectsBanner';
import AssignedWorks from './AssignedWorks';
import ProjectReports from './ProjectReports';
import SubmittedWorks from './SubmittedWorks';
import VerifyAndRevertWork from './VerifyAndRevertWork';
import {useSelector} from 'react-redux';

const Home = () => {
  const companyData = useSelector(state => state.company);

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            flex: 1,
            marginBottom: 100,
          }}>
          <ProjectsBanner company_id={companyData._id} />
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
