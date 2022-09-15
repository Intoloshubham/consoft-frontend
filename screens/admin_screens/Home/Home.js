import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import ProjectsBanner from './ProjectsBanner';
import AssignedWorks from './AssignedWorks';
import ProjectReports from './ProjectReports';
import SubmittedWorks from './SubmittedWorks';
import VerifyAndRevertWork from './VerifyAndRevertWork';
import {useSelector} from 'react-redux';
import {getSubmitWorks} from '../../../controller/AssignWorkController';
import {getVerifyAndRevertWorks} from '../../../controller/AssignWorkController';
import {getAssignWorks} from '../../../controller/AssignWorkController';
import {SIZES, COLORS, FONTS, images} from '../../../constants';
import {getProjectAtGlance} from '../../../controller/ReportController';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAssignWorks();
    fetchVerifyAndRevertWork();
    fetchSubmitWork();
    fetchProjectAtGlance();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const companyDetail = useSelector(state => state.company);
  const userData = useSelector(state => state.user);

  var companyData;
  if (companyDetail._id) {
    companyData = companyDetail;
  } else {
    companyData = userData;
  }

  // console.log(companyData)

  const [submitWork, setSubmitWork] = React.useState([]);
  const fetchSubmitWork = async () => {
    const response = await getSubmitWorks(companyData._id);
    // console.log(response);
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
    // console.log(response);
    if (response.status === 200) {
      setAssignWorkData(response.data);
    }
  };

  //=======================
  const [reportData, setReportData] = React.useState([]);
  const fetchProjectAtGlance = async () => {
    const response = await getProjectAtGlance(companyData._id);
    // console.log(response)
    if (response.status === 200) {
      setReportData(response.data);
    }
  };

  React.useEffect(() => {
    fetchSubmitWork();
    fetchVerifyAndRevertWork();
    fetchAssignWorks();
    fetchProjectAtGlance();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            marginBottom: 100,
          }}>
          <View
            style={{
              marginHorizontal: SIZES.padding,
              marginVertical: SIZES.radius,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                <Text
                  style={{
                    ...FONTS.h2,
                    textTransform: 'capitalize',
                    color: COLORS.lightblue_700,
                    fontWeight: 'bold',
                  }}>
                  {companyData.company_name}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Image
                source={images.consoft_PNG}
                style={{
                  height: 40,
                  width: 80,
                  borderRadius: 5,
                }}
              />
            </TouchableOpacity>
          </View>
          <ProjectsBanner company={companyData._id} />
          <SubmittedWorks data={submitWork} Submitfunction={fetchSubmitWork} />
          <ProjectReports
            data={reportData}
            reportFunction={fetchProjectAtGlance}
          />
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
