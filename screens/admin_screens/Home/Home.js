import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Image,
  ImageBackground,
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
import {SIZES, COLORS, FONTS, icons, images} from '../../../constants';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = ({navigation}) => {
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
          <View
            style={{
              marginHorizontal: SIZES.padding,
              marginTop: SIZES.radius,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                Welcome...
              </Text>
              <Text
                style={{
                  ...FONTS.h2,
                  textTransform: 'capitalize',
                  color: COLORS.lightblue_700,
                  fontWeight: 'bold',
                }}>
                {companyData.company_name}
              </Text>
            </View>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.lightblue_900,
                  padding: 2,
                  borderRadius: 5,
                }}>
                <Image
                  source={images.civil_eng}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 5,
                  }}
                />
              </ImageBackground>
            </TouchableOpacity> */}
          </View>
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
