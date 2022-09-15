import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SIZES, FONTS, COLORS} from '../../../constants';
import {HeaderBar, CustomDropdown} from '../../../Components';
import {
  getUserByPrivileges,
  getUserRole,
  roleByUser,
} from '../../../controller/UserRoleController';
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

  // STARTED BY
  const [openUserRole, setOpenUserRole] = React.useState(false);
  const [userRoleValue, setUserRoleValue] = React.useState([]);
  const [userRoles, setUserRoles] = React.useState([]);

  const [openUsers, setOpenUsers] = React.useState(false);
  const [usersValue, setUsersValue] = React.useState([]);
  const [users, setUsers] = React.useState([]);

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
    let response = await roleByUser(company_id, role_id);
    if (response.status === 200) {
      let roleDataFromApi = response.data.map(ele => {
        return {label: ele.name, value: ele._id};
      });
      setUsers(roleDataFromApi);
    }
  };

  // on open role
  const onRoleOpen = React.useCallback(() => {
    getUserRoles();
    setOpenUsers(false);
    setOpenUserRole1(false);
    setOpenUsers1(false);
    setOpenPrivilege1(false);
    setOpenPrivilegeUser1(false);
    setOpenPrivilege2(false);
    setOpenPrivilegeUser2(false);
  }, []);

  // on open user
  const onUserOpen = React.useCallback(() => {
    setOpenUserRole(false);
    setOpenUserRole1(false);
    setOpenUsers1(false);
    setOpenPrivilege1(false);
    setOpenPrivilegeUser1(false);
    setOpenPrivilege2(false);
    setOpenPrivilegeUser2(false);
  }, []);

  // VERIFICATION 1
  const [openUserRole1, setOpenUserRole1] = React.useState(false);
  const [userRoleValue1, setUserRoleValue1] = React.useState([]);
  const [userRoles1, setUserRoles1] = React.useState([]);

  const [openUsers1, setOpenUsers1] = React.useState(false);
  const [usersValue1, setUsersValue1] = React.useState('');
  const [users1, setUsers1] = React.useState([]);

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
    let response = await roleByUser(company_id, role_id);
    if (response.status === 200) {
      let roleDataFromApi = response.data.map(ele => {
        return {label: ele.name, value: ele._id};
      });
      setUsers1(roleDataFromApi);
    }
  };

  // on open role
  const onRoleOpen1 = React.useCallback(() => {
    getUserRolesV1();
    setOpenUsers(false);
    setOpenUserRole(false);
    setOpenUsers1(false);
    setOpenPrivilege1(false);
    setOpenPrivilegeUser1(false);
    setOpenPrivilege2(false);
    setOpenPrivilegeUser2(false);
  }, []);

  // on open user
  const onUserOpen1 = React.useCallback(() => {
    setOpenUserRole(false);
    setOpenUserRole1(false);
    setOpenUsers(false);
    setOpenPrivilege1(false);
    setOpenPrivilegeUser1(false);
    setOpenPrivilege2(false);
    setOpenPrivilegeUser2(false);
  }, []);

  // ADMIN 1
  const [openPrivilege1, setOpenPrivilege1] = React.useState(false);
  const [privilegeValue1, setPrivilegeValue1] = React.useState([]);
  const [privilege1, setPrivilege1] = React.useState([]);

  const [openPrivilegeUser1, setOpenPrivilegeUser1] = React.useState(false);
  const [privilegeUserValue1, setPrivilegeUserValue1] = React.useState('');
  const [privilegeUser1, setPrivilegeUser1] = React.useState([]);

  const fetchPrivilege1 = async () => {
    let response = await getPrivileges();
    if (response.status === 200) {
      let privilesFromApi = response.data.map(one => {
        return {label: one.privilege, value: one._id};
      });
      setPrivilege1(privilesFromApi);
    }
  };

  const fetchUserByPrivileges1 = async privilege_id => {
    let response = await getUserByPrivileges(company_id, privilege_id);
    if (response.status === 200) {
      let privilesFromApi = response.data.map(one => {
        return {label: one.name, value: one._id};
      });

      setPrivilegeUser1(privilesFromApi);
    }
  };

  // on open role
  const onPrivilegesOpen = React.useCallback(() => {
    fetchPrivilege1();
    setOpenUserRole(false);
    setOpenUserRole1(false);
    setOpenUsers(false);
    setOpenUsers1(false);
    setOpenPrivilegeUser1(false);
    setOpenPrivilege2(false);
    setOpenPrivilegeUser2(false);
  }, []);

  // on open user
  const onPrivilegesUserOpen = React.useCallback(() => {
    setOpenUserRole(false);
    setOpenUserRole1(false);
    setOpenUsers(false);
    setOpenUsers1(false);
    setOpenPrivilege1(false);
    setOpenPrivilege2(false);
    setOpenPrivilegeUser2(false);
  }, []);

  // ADMIN 2
  const [openPrivilege2, setOpenPrivilege2] = React.useState(false);
  const [privilegeValue2, setPrivilegeValue2] = React.useState([]);
  const [privilege2, setPrivilege2] = React.useState([]);

  const [openPrivilegeUser2, setOpenPrivilegeUser2] = React.useState(false);
  const [privilegeUserValue2, setPrivilegeUserValue2] = React.useState('');
  const [privilegeUser2, setPrivilegeUser2] = React.useState([]);

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

  const fetchUserByPrivileges2 = async privilege_id => {
    let response = await getUserByPrivileges(company_id, privilege_id);
    if (response.status === 200) {
      let privilesFromApi = response.data.map(one => {
        return {label: one.name, value: one._id};
      });

      setPrivilegeUser2(privilesFromApi);
    }
  };

  const onPrivilegesOpen1 = React.useCallback(() => {
    fetchPrivilege2();
    setOpenUserRole(false);
    setOpenUserRole1(false);
    setOpenUsers(false);
    setOpenUsers1(false);
    setOpenPrivilegeUser1(false);
    setOpenPrivilege1(false);
    setOpenPrivilegeUser2(false);
  }, []);

  // on open user
  const onPrivilegesUserOpen1 = React.useCallback(() => {
    setOpenUserRole(false);
    setOpenUserRole1(false);
    setOpenUsers(false);
    setOpenUsers1(false);
    setOpenPrivilege1(false);
    setOpenPrivilege2(false);
    setOpenPrivilegeUser1(false);
  }, []);

  // ====================================================================================

  const [reportPath, setReportPath] = React.useState([]);

  const fetchReportSettingPath = async () => {
    const response = await getProjectReportPath(company_id, project_id);
    setReportPath(response.data);
  };

  const onSubmit = async () => {
    const formData = {
      company_id: company_id,
      project_id: project_id,
      started_by: usersValue,
      verification_1: usersValue1,
      admin_1: privilegeUserValue1,
      admin_2: privilegeUserValue2,
    };
    const response = await postProjectReportPath(formData);
    if (response.status === 200) {
      alert('Successfull');
      fetchReportSettingPath();
      setUsersValue('');
      setUsersValue1('');
      setPrivilegeUserValue1('');
      setPrivilegeUserValue2('');
      setUserRoleValue('');
      setUserRoleValue1('');
      setPrivilegeValue1();
      setPrivilegeValue2();
    }
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
            Admin 1 {' - '}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.darkGray,

              textTransform: 'capitalize',
            }}>
            Admin 2 {' - '}
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
              zIndex={8000}
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
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              zIndex={7000}
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
              zIndex={6000}
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
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              zIndex={5000}
              zIndexInverse={4000}
              onOpen={onUserOpen1}
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
              onSelectItem={value => {
                fetchUserByPrivileges1(value.value);
              }}
              onOpen={onPrivilegesOpen}
              zIndex={4000}
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
              placeholder="Select"
              open={openPrivilegeUser1}
              value={privilegeUserValue1}
              items={privilegeUser1}
              setOpen={setOpenPrivilegeUser1}
              setValue={setPrivilegeUserValue1}
              setItems={setPrivilegeUser1}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              onOpen={onPrivilegesUserOpen}
              zIndex={3000}
              zIndexInverse={6000}
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
              onSelectItem={value => {
                fetchUserByPrivileges2(value.value);
              }}
              onOpen={onPrivilegesOpen1}
              zIndex={2000}
              zIndexInverse={7000}
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
              placeholder="Select"
              open={openPrivilegeUser2}
              value={privilegeUserValue2}
              items={privilegeUser2}
              setOpen={setOpenPrivilegeUser2}
              setValue={setPrivilegeUserValue2}
              setItems={setPrivilegeUser2}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              onOpen={onPrivilegesUserOpen1}
              zIndex={1000}
              zIndexInverse={8000}
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
                Admin 1 {' :  '}
              </Text>
              <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                Admin 2 {' :  '}
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
                {ele.admin_1_name}
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.darkGray,
                  textTransform: 'capitalize',
                }}>
                {ele.admin_2_name}
              </Text>
            </View>
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
