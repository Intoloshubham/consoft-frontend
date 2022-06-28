import React from 'react';
import {View, LogBox, ScrollView, SafeAreaView} from 'react-native';
import ProjectsBanner from './ProjectsBanner';
import AssignedWorks from './AssignedWorks';
import ProjectReports from './ProjectReports';
import ProjectWorksIdentifier from './ProjectWorksIdentifier';

const Home = () => {
  React.useEffect(() => {
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
          <AssignedWorks />
          {/* <ProjectReports /> */}
          {/* <ProjectWorksIdentifier /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
