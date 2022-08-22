import React from 'react';
import {View, ScrollView, SafeAreaView, RefreshControl} from 'react-native';
import ProjectsBanner from './ProjectsBanner';
import AssignedWorks from './AssignedWorks';
import ProjectReports from './ProjectReports';
import SubmittedWorks from './SubmittedWorks';
import VerifyAndRevertWork from './VerifyAndRevertWork';
import {useSelector} from 'react-redux';
import {getSubmitWorks} from '../../../controller/AssignWorkController';
import {getVerifyAndRevertWorks} from '../../../controller/AssignWorkController';
import {getAssignWorks} from '../../../controller/AssignWorkController';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = () => {
  const companyData = useSelector(state => state.company);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAssignWorks();
    fetchVerifyAndRevertWork();
    fetchSubmitWork();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const [submitWork, setSubmitWork] = React.useState([]);
  const fetchSubmitWork = async () => {
    const response = await getSubmitWorks(companyData._id);
    if (response.status === 200) {
      setSubmitWork(response.data);
    }
  };

  //==================
  // const [verifyAndRevert, setVerifyAndRevert] = React.useState([]);
  const [verify, setVerify] = React.useState([]);
  const [revert, setRevert] = React.useState([]);

  const fetchVerifyAndRevertWork = async () => {
    const response = await getVerifyAndRevertWorks(companyData._id);
    // setVerifyAndRevert(response.data);

    //filter revert & verify
    const verify_data = response.data.filter(el => el.verify === true);
    setVerify(verify_data);
    const revert_data = response.data.filter(el => el.revert_status === true);
    setRevert(revert_data);
  };

  //===========================
  const [assignWorkData, setAssignWorkData] = React.useState([]);
  const fetchAssignWorks = async () => {
    const response = await getAssignWorks(companyData._id);
    // console.log(response)
    if (response.status === 200) {
      setAssignWorkData(response.data);
    }
  };

  React.useEffect(() => {
    fetchSubmitWork();
    fetchVerifyAndRevertWork();
    fetchAssignWorks();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
          <SubmittedWorks data={submitWork} Submitfunction={fetchSubmitWork} />
          <ProjectReports />
          <AssignedWorks
            data={assignWorkData}
            AssignWorkfunction={fetchAssignWorks}
          />
          <VerifyAndRevertWork verify={verify} revert={revert} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
