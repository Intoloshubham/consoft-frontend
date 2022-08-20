import React from 'react';
import {View, ScrollView, SafeAreaView, Text} from 'react-native';
import ProjectsBanner from './ProjectsBanner';
import AssignedWorks from './AssignedWorks';
import ProjectReports from './ProjectReports';
import SubmittedWorks from './SubmittedWorks';
import VerifyAndRevertWork from './VerifyAndRevertWork';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SIZES} from '../../../constants';

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
          {/* <View
            style={{paddingHorizontal: SIZES.padding, marginTop: SIZES.radius}}>
            <Text
              style={{
                textTransform: 'capitalize',
                ...FONTS.h2,
                color: COLORS.darkGray,
              }}>
              {companyData.company_name}
            </Text>
          </View> */}
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
