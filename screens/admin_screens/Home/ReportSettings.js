import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {SIZES, FONTS, COLORS} from '../../../constants';
import {HeaderBar, CustomDropdown} from '../../../Components';
import {getUserRole, roleByUser} from '../../../controller/UserRoleController';
import {getPrivileges} from '../../../controller/UserRoleController';
import {useSelector} from 'react-redux';
import {
  getProjectReportPath,
  postProjectReportPath,
} from '../../../controller/ReportController';

const ReportSettings = ({route}) => {
  const companyDetail = useSelector(state => state.company);
  const userData = useSelector(state => state.user);

  var companyData;
  if (companyDetail._id) {
    companyData = companyDetail;
  } else {
    companyData = userData;
  }

  const company_id = companyData._id;
  const {project_id} = route.params;

  //GETTING USER ROLES FROM API
  const [openUserRole, setOpenUserRole] = React.useState(false);
  const [userRoleValue, setUserRoleValue] = React.useState([]);
  const [userRoles, setUserRoles] = React.useState([]);

  //GETTING USER FROM APIS ON CHANGE OF USER ROLES
  const [openUsers, setOpenUsers] = React.useState(false);
  const [usersValue, setUsersValue] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  //GETTING USER ROLES FROM API
  const [openUserRole1, setOpenUserRole1] = React.useState(false);
  const [userRoleValue1, setUserRoleValue1] = React.useState([]);
  const [userRoles1, setUserRoles1] = React.useState([]);

  //GETTING USER FROM APIS ON CHANGE OF USER ROLES
  const [openUsers1, setOpenUsers1] = React.useState(false);
  const [usersValue1, setUsersValue1] = React.useState([]);
  const [users1, setUsers1] = React.useState([]);

  //GETTING USER ROLES FROM API
  const [openUserRole2, setOpenUserRole2] = React.useState(false);
  const [userRoleValue2, setUserRoleValue2] = React.useState([]);
  const [userRoles2, setUserRoles2] = React.useState([]);

  //GETTING USER FROM APIS ON CHANGE OF USER ROLES
  const [openUsers2, setOpenUsers2] = React.useState(false);
  const [usersValue2, setUsersValue2] = React.useState([]);
  const [users2, setUsers2] = React.useState([]);

  //privileges
  const [openPrivilege, setOpenPrivilege] = React.useState(false);
  const [privilegeValue, setPrivilegeValue] = React.useState([]);
  const [privilege, setPrivilege] = React.useState([]);
  //privileges
  const [openPrivilege1, setOpenPrivilege1] = React.useState(false);
  const [privilegeValue1, setPrivilegeValue1] = React.useState([]);
  const [privilege1, setPrivilege1] = React.useState([]);
  //privileges
  const [openPrivilege2, setOpenPrivilege2] = React.useState(false);
  const [privilegeValue2, setPrivilegeValue2] = React.useState([]);
  const [privilege2, setPrivilege2] = React.useState([]);

  const [startedBy, setStartedBy] = React.useState('');
  const [verification1, setVerification1] = React.useState('');
  const [verification2, setVerification2] = React.useState('');
  const [sendTo, setSendTo] = React.useState('');
  const [admin2, setAdmin2] = React.useState('');
  const [admin1, setAdmin1] = React.useState('');

  const [reportPath, setReportPath] = React.useState([]);

  // started by -----------------
  const getUserRoles = async () => {
    let response = await getUserRole(company_id);
    if (response.status === 200) {
      let roleDataFromApi = response.data.map((one, i) => {
        return {label: one.user_role, value: one._id};
      });
      setUserRoles(roleDataFromApi);
    }
  };

  const getUserByRoleId = async role_id => {
    let response = await roleByUser(role_id);
    if (response.status === 200) {
      let roleDataFromApi = response.data.map(ele => {
        return {label: ele.name, value: ele._id};
      });
      setUsers(roleDataFromApi);
    }
  };

  //---------------------------------------------------

  // verification 1 -----------------
  const getUserRolesV1 = async () => {
    let response = await getUserRole(company_id);
    if (response.status === 200) {
      let roleDataFromApi = response.data.map((one, i) => {
        return {label: one.user_role, value: one._id};
      });
      setUserRoles1(roleDataFromApi);
    }
  };

  const getUserByRoleIdV1 = async role_id => {
    let response = await roleByUser(role_id);
    if (response.status === 200) {
      let roleDataFromApi = response.data.map(ele => {
        return {label: ele.name, value: ele._id};
      });
      setUsers1(roleDataFromApi);
    }
  };

  //---------------------------------------------------

  // verification 2 -----------------
  const getUserRolesV2 = async () => {
    let response = await getUserRole(company_id);
    if (response.status === 200) {
      let roleDataFromApi = response.data.map((one, i) => {
        return {label: one.user_role, value: one._id};
      });
      setUserRoles2(roleDataFromApi);
    }
  };

  const getUserByRoleIdV2 = async role_id => {
    let response = await roleByUser(role_id);
    if (response.status === 200) {
      let roleDataFromApi = response.data.map(ele => {
        return {label: ele.name, value: ele._id};
      });
      setUsers2(roleDataFromApi);
    }
  };

  //---------------------------------------------------

  // send to ------------------------------
  const fetchPrivilege = async () => {
    let response = await getPrivileges();
    if (response.status === 200) {
      let privilesFromApi = response.data.map(one => {
        return {label: one.privilege, value: one._id};
      });
      setPrivilege(privilesFromApi);
    }
  };
  //-----------------------------------------
  // send to ------------------------------
  const fetchPrivilege1 = async () => {
    let response = await getPrivileges();
    if (response.status === 200) {
      let privilesFromApi = response.data.map(one => {
        return {label: one.privilege, value: one._id};
      });
      setPrivilege1(privilesFromApi);
    }
  };
  //-----------------------------------------
  // send to ------------------------------
  const fetchPrivilege2 = async () => {
    let response = await getPrivileges();
    if (response.status === 200) {
      let privilesFromApi = response.data.map(one => {
        return {label: one.privilege, value: one._id};
      });
      setPrivilege2(privilesFromApi);
    }
  };
  //-----------------------------------------

  // CLOSE DROPDOWN ON OPEN ANOTHER DROPDOWN
  const onRoleOpen = React.useCallback(() => {
    getUserRoles();
    setOpenUsers(false);
    setOpenUsers1(false);
    setOpenUsers2(false);
    setOpenUserRole1(false);
    setOpenUserRole2(false);
    setOpenPrivilege(false);
    setOpenPrivilege1(false);
    setOpenPrivilege2(false);
  }, []);

  const onRoleOpen1 = React.useCallback(() => {
    getUserRolesV1();
    setOpenUserRole(false);
    setOpenUsers(false);
    setOpenUsers1(false);
    setOpenUserRole2(false);
    setOpenUsers2(false);
    setOpenPrivilege(false);
    setOpenPrivilege1(false);
    setOpenPrivilege2(false);
  }, []);

  //----------------
  const onRoleOpen2 = React.useCallback(() => {
    getUserRolesV2();
    setOpenUserRole(false);
    setOpenUsers(false);
    setOpenUserRole1(false);
    setOpenUsers1(false);
    setOpenUsers2(false);
    setOpenPrivilege(false);
    setOpenPrivilege1(false);
    setOpenPrivilege2(false);
  }, []);

  const onUserOpen = React.useCallback(() => {
    // setOpenUserRole(false);
  }, []);

  const onPrivilegesOpen = React.useCallback(() => {
    fetchPrivilege();
    setOpenUserRole(false);
    setOpenUsers(false);
    setOpenUserRole1(false);
    setOpenUsers1(false);
    setOpenUserRole2(false);
    setOpenUsers2(false);
    setOpenPrivilege1(false);
    setOpenPrivilege2(false);
  }, []);

  const onPrivilegesOpen1 = React.useCallback(() => {
    fetchPrivilege1();
    setOpenUserRole(false);
    setOpenUsers(false);
    setOpenUserRole1(false);
    setOpenUsers1(false);
    setOpenUserRole2(false);
    setOpenUsers2(false);
    setOpenPrivilege(false);
    setOpenPrivilege2(false);
  }, []);

  const onPrivilegesOpen2 = React.useCallback(() => {
    fetchPrivilege2();
    setOpenUserRole(false);
    setOpenUsers(false);
    setOpenUserRole1(false);
    setOpenUsers1(false);
    setOpenUserRole2(false);
    setOpenUsers2(false);
    setOpenPrivilege1(false);
    setOpenPrivilege(false);
  }, []);

  const onSubmit = async () => {
    const formData = {
      company_id: company_id,
      project_id: project_id,
      started_by: usersValue,
      verification_1: usersValue1,
      verification_2: usersValue2,
      admin_3: privilegeValue,
      admin_2: privilegeValue1,
      admin_1: privilegeValue2,
    };
    const response = await postProjectReportPath(formData);
    if (response.status === 200) {
      setUserRoleValue('');
      setUserRoleValue1('');
      setUserRoleValue2('');
      setUsersValue('');
      setUsersValue1('');
      setUsersValue2('');
      setPrivilegeValue('');
      setPrivilegeValue1('');
      setPrivilegeValue2('');
    }
  };

  const fetchReportSettingPath = async () => {
    const response = await getProjectReportPath(company_id, project_id);
    // console.log(response.data);
    setReportPath(response.data);
  };

  React.useEffect(() => {
    fetchReportSettingPath();
  }, []);

  function renderReportPath() {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 0.7,
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.darkGray,
              marginBottom: 60,
              textTransform: 'capitalize',
            }}>
            started by {' - '}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.darkGray,
              marginBottom: 60,
              textTransform: 'capitalize',
            }}>
            Verification 1 {' - '}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.darkGray,
              marginBottom: 60,
              textTransform: 'capitalize',
            }}>
            Verification 2 {' - '}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.darkGray,
              marginBottom: 30,
              textTransform: 'capitalize',
            }}>
            Send to {' - '}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.darkGray,
              marginBottom: 20,
              textTransform: 'capitalize',
            }}>
            Admin 2 {' - '}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.darkGray,

              textTransform: 'capitalize',
            }}>
            Admin 1 {' - '}
          </Text>
        </View>
        <View
          style={{
            flex: 1.3,
            alignItems: 'flex-start',
          }}>
          <View>
            <CustomDropdown
              containerStyle={{
                width: '70%',
                marginTop: null,
                minHeight: 30,
                paddingHorizontal: SIZES.radius,
                borderRadius: null,
                backgroundColor: COLORS.lightGray1,
              }}
              dropdownContainerStyle={{width: '70%', marginTop: null}}
              placeholder="Select user role"
              open={openUserRole}
              value={userRoleValue}
              items={userRoles}
              setOpen={setOpenUserRole}
              setValue={setUserRoleValue}
              setItems={setUserRoles}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              onSelectItem={value => getUserByRoleId(value.value)}
              onOpen={onRoleOpen}
              zIndex={9000}
              zIndexInverse={1000}
              maxHeight={150}
            />
            <CustomDropdown
              containerStyle={{
                width: '70%',
                marginTop: 30,
                minHeight: 30,
                paddingHorizontal: SIZES.radius,
                borderRadius: null,
                backgroundColor: COLORS.lightGray1,
              }}
              dropdownContainerStyle={{width: '70%', marginTop: 30}}
              placeholder="Select user"
              open={openUsers}
              value={usersValue}
              items={users}
              setOpen={setOpenUsers}
              setValue={setUsersValue}
              setItems={setUsers}
              // categorySelectable={true}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              onSelectItem={value => setStartedBy(value.label)}
              zIndex={8000}
              zIndexInverse={2000}
              onOpen={onUserOpen}
              maxHeight={150}
            />
          </View>
          <View style={{marginTop: 40}}>
            <CustomDropdown
              containerStyle={{
                width: '70%',
                marginTop: null,
                minHeight: 30,
                paddingHorizontal: SIZES.radius,
                borderRadius: null,
                backgroundColor: COLORS.lightGray1,
              }}
              dropdownContainerStyle={{width: '70%', marginTop: null}}
              placeholder="Select user role"
              open={openUserRole1}
              value={userRoleValue1}
              items={userRoles1}
              setOpen={setOpenUserRole1}
              setValue={setUserRoleValue1}
              setItems={setUserRoles1}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              onSelectItem={value => getUserByRoleIdV1(value.value)}
              onOpen={onRoleOpen1}
              zIndex={7000}
              zIndexInverse={3000}
              maxHeight={150}
            />
            <CustomDropdown
              containerStyle={{
                width: '70%',
                marginTop: 30,
                minHeight: 30,
                paddingHorizontal: SIZES.radius,
                borderRadius: null,
                backgroundColor: COLORS.lightGray1,
              }}
              dropdownContainerStyle={{width: '70%', marginTop: 30}}
              placeholder="Select user"
              open={openUsers1}
              value={usersValue1}
              items={users1}
              setOpen={setOpenUsers1}
              setValue={setUsersValue1}
              setItems={setUsers1}
              // categorySelectable={true}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              onSelectItem={value => setVerification1(value.label)}
              zIndex={6000}
              zIndexInverse={4000}
              onOpen={onUserOpen}
              maxHeight={150}
            />
          </View>
          <View style={{marginTop: 40}}>
            <CustomDropdown
              containerStyle={{
                width: '70%',
                marginTop: null,
                minHeight: 30,
                paddingHorizontal: SIZES.radius,
                borderRadius: null,
                backgroundColor: COLORS.lightGray1,
              }}
              dropdownContainerStyle={{width: '70%', marginTop: null}}
              placeholder="Select user role"
              open={openUserRole2}
              value={userRoleValue2}
              items={userRoles2}
              setOpen={setOpenUserRole2}
              setValue={setUserRoleValue2}
              setItems={setUserRoles2}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              // onChangeValue={value => getUserByRoleId(value)}
              onSelectItem={value => getUserByRoleIdV2(value.value)}
              onOpen={onRoleOpen2}
              zIndex={5000}
              zIndexInverse={5000}
              maxHeight={150}
            />
            <CustomDropdown
              containerStyle={{
                width: '70%',
                marginTop: 30,
                minHeight: 30,
                paddingHorizontal: SIZES.radius,
                borderRadius: null,
                backgroundColor: COLORS.lightGray1,
              }}
              dropdownContainerStyle={{width: '70%', marginTop: 30}}
              placeholder="Select user"
              open={openUsers2}
              value={usersValue2}
              items={users2}
              setOpen={setOpenUsers2}
              setValue={setUsersValue2}
              setItems={setUsers2}
              // categorySelectable={true}
              onSelectItem={value => setVerification2(value.label)}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              zIndex={4000}
              zIndexInverse={6000}
              onOpen={onUserOpen}
              maxHeight={150}
            />
          </View>
          <View style={{marginTop: 40}}>
            <CustomDropdown
              containerStyle={{
                width: '70%',
                marginTop: null,
                minHeight: 30,
                paddingHorizontal: SIZES.radius,
                borderRadius: null,
                backgroundColor: COLORS.lightGray1,
              }}
              dropdownContainerStyle={{width: '70%', marginTop: null}}
              placeholder="Select"
              open={openPrivilege}
              value={privilegeValue}
              items={privilege}
              setOpen={setOpenPrivilege}
              setValue={setPrivilegeValue}
              setItems={setPrivilege}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              // onChangeValue={value => getUserByRoleId(value)}
              onSelectItem={value => setSendTo(value.label)}
              onOpen={onPrivilegesOpen}
              zIndex={3000}
              zIndexInverse={7000}
              maxHeight={150}
            />
          </View>
          <View style={{marginTop: 40}}>
            <CustomDropdown
              containerStyle={{
                width: '70%',
                marginTop: null,
                minHeight: 30,
                paddingHorizontal: SIZES.radius,
                borderRadius: null,
                backgroundColor: COLORS.lightGray1,
              }}
              dropdownContainerStyle={{width: '70%', marginTop: null}}
              placeholder="Select"
              open={openPrivilege1}
              value={privilegeValue1}
              items={privilege1}
              setOpen={setOpenPrivilege1}
              setValue={setPrivilegeValue1}
              setItems={setPrivilege1}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              // onChangeValue={value => getUserByRoleId(value)}
              onSelectItem={value => setAdmin2(value.label)}
              onOpen={onPrivilegesOpen1}
              zIndex={2000}
              zIndexInverse={8000}
              maxHeight={150}
            />
          </View>
          <View style={{marginTop: 40}}>
            <CustomDropdown
              containerStyle={{
                width: '70%',
                marginTop: null,
                minHeight: 30,
                paddingHorizontal: SIZES.radius,
                borderRadius: null,
                backgroundColor: COLORS.lightGray1,
              }}
              dropdownContainerStyle={{width: '70%', marginTop: null}}
              placeholder="Select"
              open={openPrivilege2}
              value={privilegeValue2}
              items={privilege2}
              setOpen={setOpenPrivilege2}
              setValue={setPrivilegeValue2}
              setItems={setPrivilege2}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              // onChangeValue={value => getUserByRoleId(value)}
              onSelectItem={value => setAdmin1(value.label)}
              onOpen={onPrivilegesOpen2}
              zIndex={1000}
              zIndexInverse={9000}
              maxHeight={150}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: SIZES.padding * 2}}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.lightblue_800,
                paddingHorizontal: 30,
                paddingVertical: 8,
                alignItems: 'center',
              }}
              onPress={() => onSubmit()}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>Submit </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function renderPath() {
    return (
      <View style={{marginTop: SIZES.radius}}>
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.darkGray,
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}>
          Report Path
        </Text>
        {reportPath.map((ele, i) => (
          <View key={i} style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                Started by {' :  '}
              </Text>
              <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                Verification 1 {' :  '}
              </Text>
              <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                Verification 2 {' :  '}
              </Text>
              <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                Send to {' :  '}
              </Text>
              <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                Admin 2 {' :  '}
              </Text>
              <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                Admin 1 {' :  '}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.darkGray,
                  textTransform: 'capitalize',
                }}>
                {ele.started_by_name}
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.darkGray,
                  textTransform: 'capitalize',
                }}>
                {ele.verification_1_name}
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.darkGray,
                  textTransform: 'capitalize',
                }}>
                {ele.verification_2_name}
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.darkGray,
                  textTransform: 'capitalize',
                }}>
                {ele.admin_3_name}
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.darkGray,
                  textTransform: 'capitalize',
                }}>
                {ele.admin_2_name}
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.darkGray,
                  textTransform: 'capitalize',
                }}>
                {ele.admin_1_name}
              </Text>
            </View>

            {/* <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
              Started by : {ele.started_by_name} {'\n'}
              Verification 1 : {ele.verification_1_name} {'\n'}
              Verification 2 : {ele.verification_2_name} {'\n'}
              Send to : {ele.admin_3_name} {'\n'}
              Admin 2 : {ele.admin_2_name} {'\n'}
              Admin 1 : {ele.admin_1_name} {'\n'}
            </Text> */}
          </View>
        ))}
      </View>
    );
  }
  return (
    <View>
      <HeaderBar right={true} title="Report Settings" />
      <View style={{marginHorizontal: SIZES.radius}}>
        {renderReportPath()}
        {renderPath()}
      </View>
    </View>
  );
};

export default ReportSettings;
