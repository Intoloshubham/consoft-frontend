import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {SIZES} from '../../../constants';

const Demo = () => {
  const [data, setData] = React.useState([]);
  // console.log(data);

  React.useEffect(() => {
    const abortCont = new AbortController();
    fetch(
      'http://192.168.1.99:8000/api/user-assign-works/62c827689c1d4cb814ead866',
      {signal: abortCont.signal},
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        setData(data);
        // console.log(data);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          console.log(err);
        }
      });
    return () => abortCont.abort();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View>
        <Text>{item._id}</Text>
        <Text>{item.role_id}</Text>
        <Text>{item.user_id}</Text>
        {item.assign_works.map(ele => {
          return <Text key={ele._id}>{ele.work}</Text>;
        })}
      </View>
    );
  };
  return (
    <View
      style={{
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.padding,
      }}>
      <FlatList
        data={data}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Demo;
