import React from 'react';
import {View, Text, LogBox, ScrollView} from 'react-native';
import {FONTS, SIZES, COLORS, images, icons} from '../../../constants';
import ProjectsBanner from './ProjectsBanner';
import ProjectProgressReview from './ProjectProgressReview';
import ProjectProgressReviewTop20 from './ProjectProgressReviewTop20';
import ProjectWorksIdentifier from './ProjectWorksIdentifier';
import AssignedWorks from './AssignedWorks';

const Home = () => {
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  const projectProgressReview = [
    {id: 1, img: icons.duplex, name: 'Duplex', data: 100},
    {id: 2, img: icons.apartment, name: 'Apartment', data: 70},
    {id: 3, img: icons.bungalow, name: 'Bungalow', data: 80},
    {id: 4, img: icons.mall, name: 'Mall', data: 90},
    {id: 5, img: icons.garage, name: 'Parking Garage', data: 20},
  ];
  const top20ProjectProgressReview = [
    {id: 1, name: 'Vijan Mahal', location: 'Jabalpur'},
    {id: 2, name: 'Krishna Jyoti', location: 'Jabalpur'},
    {id: 3, name: 'DB Mall', location: 'Bhopal'},
  ];
  const assignedWorks = [
    {id: 1, work_name: 'City Mall', date: '10/02/2022'},
    {id: 2, work_name: 'Delhi Public School', date: '12/06/2022'},
    {id: 3, work_name: 'St. Xaviour School', date: '06/06/2021'},
    {id: 4, work_name: 'Shri Ram Collage', date: '18/09/2019'},
    {id: 5, work_name: 'Shalby Hospital', date: '26/05/2019'},
  ];
  const projectTasksIdentifier = [
    {id: 1, name: 'Important', img: images.red},
    {id: 2, name: 'Moderate', img: images.green},
    {id: 3, name: 'Informational', img: images.yellow},
  ];
  const [reviewData, setreviewData] = React.useState(projectProgressReview);
  const [reviewTop20, setReviewTop20] = React.useState(
    top20ProjectProgressReview,
  );
  const [assignWorks, setAssignWorks] = React.useState(assignedWorks);
  const [indentifierColor, setIdentifierColor] = React.useState(
    projectTasksIdentifier,
  );

  function renderProjectProgressReview() {
    return <ProjectProgressReview history={reviewData} />;
  }
  function renderProjectProgressReviewTop20() {
    return <ProjectProgressReviewTop20 history={reviewTop20} />;
  }
  function renderAssignedWorksList() {
    return <AssignedWorks history={assignWorks} />;
  }

  function renderIdentifier() {
    return <ProjectWorksIdentifier history={indentifierColor} />;
  }
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          // backgroundColor: COLORS.lightblue_50,
          marginBottom: 130,
        }}>
        <ProjectsBanner />
        {/* {renderProjectProgressReview()} */}
        {renderProjectProgressReviewTop20()}
        {renderAssignedWorksList()}
        {renderIdentifier()}
      </View>
    </ScrollView>
  );
};

export default Home;
