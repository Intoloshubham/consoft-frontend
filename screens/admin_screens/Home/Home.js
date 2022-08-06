import React, {useEffect} from 'react';
import {
  View,
  LogBox,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import ProjectsBanner from './ProjectsBanner';
import AssignedWorks from './AssignedWorks';
import ProjectReports from './ProjectReports';
import SubmittedWorks from './SubmittedWorks';
import VerifyAndRevertWork from './VerifyAndRevertWork';
import {useSelector} from 'react-redux';

const Home = () => {
  const companyData = useSelector(state => state.company);
  
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  // refresh
  function delay(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const [loading, setLoading] = React.useState(false);
  const loadMore = React.useCallback(async () => {
    setLoading(true);
    delay(2000).then(() => setLoading(false));
  }, [loading]);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            progressBackgroundColor="white"
            tintColor="red"
            refreshing={loading}
            onRefresh={loadMore}
          />
        }>
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
