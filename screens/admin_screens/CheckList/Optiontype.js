import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import {Title} from 'react-native-paper';
import {FormInput, TextButton, HeaderBar} from '../../../Components';
import {SIZES, COLORS, icons, FONTS} from '../../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import config from '../../../config';
import { getCompanyId,getToken } from '../../../services/asyncStorageService';
import { postoptionitem,getoptiontypeitem,updateOptionitems,optionItemDelete } from '../../../controller/OptiontypeController';

const Optiontype = () => {
    
  const [optiontypemodal, setoptiontypemodal] = useState(false);
  const [optiontypemodalupdate, setoptiontypemodalupdate] = useState(false);

  const [optionTypename, setoptionTypename] = useState('');
  const [Optiondata, setOptiondata] = useState([]);
  const [Optionid, setOptionid] = useState('');

  //get company id 
  const [company_id, setCompany_id] = useState('')
  const [accessTokenoptiontype, setAccessTokenoptiontype] = useState('');

  const optionidmodal = (id, name) => {
    setoptiontypemodalupdate(true);
    setOptionid(id);
    setoptionTypename(name);
    // console.log(id, name);
  };

  const _companyId =async () => {
   
    const _id = await getCompanyId();
    setCompany_id(_id);
  }
  // console.log(company_id);
  //setting token
  React.useEffect(() => {
    (async () => await _companyId())();
  }, [])


  
  useEffect(() => {
    (async () => {
      const token = await getToken();
      setAccessTokenoptiontype(token);
    })();
  });
  //  console.log(accessTokenoptiontype);

  const updateOption = async () => {
    const optiondataupdate = {
      option_type: optionTypename,
      company_id:company_id,
    };
    let data = await updateOptionitems(Optionid,optiondataupdate)
        check();
        setoptionTypename('');
       alert('update option type item')
       setoptiontypemodalupdate(false);
  };

  const check = async () => {
      let dataitem =  await getoptiontypeitem(accessTokenoptiontype);
      //  console.log(dataitem);
       setOptiondata(dataitem);
  }

  useEffect(() => {
    check();
  }, []);



  const submit = async () => {
    const optiondata = {
      option_type: optionTypename,
      company_id:company_id
    };
    let data = await postoptionitem(optiondata)
    if(data.status === 200){
      setoptionTypename('');
      check()
    }
    setoptiontypemodal(false)
  };

  const DeleteOption = async Optionid => {
   let data = await optionItemDelete(Optionid)
   alert('Delete')
   check();
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: SIZES.base,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.darkGray,
              textTransform: 'capitalize',
            }}>
            {item.option_type}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.darkGray,
              fontWeight: 'bold',
            }}>
            {item.qty}
          </Text>
        </View>
        <View style={{marginLeft: 40, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              optionidmodal(item._id, item.option_type);
            }}>
            <Image
              source={icons.edit}
              style={{
                width: 18,
                height: 18,
                right: 15,
                tintColor: COLORS.lightblue_900,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              DeleteOption(item._id);
            }}>
            <Image
              source={icons.delete_icon}
              style={{
                width: 18,
                height: 18,
                tintColor: COLORS.red,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <HeaderBar right={true} title="Option type" />
      <Modal
        transparent={false}
        visible={optiontypemodal}
        animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000aa',
            justifyContent: 'center',
          }}>
          <View
            style={{
              //   flex: 1,
              backgroundColor: '#fff',
              margin: 10,
              padding: 20,
              borderRadius: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
              }}>
              <Title>Modal</Title>
              <Pressable onPress={setoptiontypemodal}>
                <AntDesign name="close" size={30} color="black" />
              </Pressable>
            </View>
            <FormInput
              label="name"
              onChange={optionTypename => {
                setoptionTypename(optionTypename);
              }}
            />
            <View>
              <TextButton
                label="Save"
                buttonContainerStyle={{
                  height: 45,
                  borderRadius: SIZES.radius,
                  marginTop: SIZES.padding,
                }}
                onPress={() => submit()}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          marginBottom: SIZES.padding,
          // marginTop: 5,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
        }}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{flexDirection:"row",justifyContent:"space-between",flex:1}}>
            <Text style={{...FONTS.h2, color: COLORS.darkGray}}>
              OptionTypes 
            </Text>
            <TextButton
              label="Option Type"
              buttonContainerStyle={{
                paddingHorizontal: SIZES.base,
                borderRadius: 5,
              }}
              labelStyle={{...FONTS.h5}}
              onPress={() => setoptiontypemodal(true)}
            />
          </View>
        </View>
        <FlatList
          maxHeight={410}
          contentContainerStyle={{marginTop: SIZES.radius}}
          scrollEnabled={true}
          data={Optiondata}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={true}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.lightGray1,
                  marginVertical: 5,
                }}></View>
            );
          }}
        />
      </View>
      <Modal
        transparent={false}
        visible={optiontypemodalupdate}
        animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000aa',
            justifyContent: 'center',
          }}>
          <View
            style={{
              //   flex: 1,
              backgroundColor: '#fff',
              margin: 10,
              padding: 20,
              borderRadius: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
              }}>
              <Title>Update</Title>
              <Pressable onPress={setoptiontypemodalupdate}>
                <AntDesign name="close" size={30} color="black" />
              </Pressable>
            </View>
            <FormInput
              label="name"
              value={optionTypename}
              onChange={optionTypename => {
                setoptionTypename(optionTypename);
              }}
            />
            <View>
              <TextButton
                label="Update"
                buttonContainerStyle={{
                  height: 45,
                  borderRadius: SIZES.radius,
                  marginTop: SIZES.padding,
                }}
                onPress={() => updateOption()}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* <View
        style={{
          marginBottom: SIZES.padding,
          // marginTop: 5,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
        }}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{flexDirection:"row",justifyContent:"space-between",flex:1}}>
            <Text style={{...FONTS.h2, color: COLORS.darkGray}}>
              OptionTypes 
            </Text>
            <TextButton
              label="Option Type"
              buttonContainerStyle={{
                height: 40,
                // marginHorizontal: SIZES.padding,
                // marginBottom: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightblue_700,
                width:"50%"
              }}
              onPress={() => setoptiontypemodal(true)}
            />
          </View>
        </View>
        <FlatList
          maxHeight={410}
          contentContainerStyle={{marginTop: SIZES.radius}}
          scrollEnabled={true}
          data={Optiondata}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={true}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.lightGray1,
                  marginVertical: 5,
                }}></View>
            );
          }}
        />
      </View> */}
    </View>
  );
};

export default Optiontype;

const styles = StyleSheet.create({});
