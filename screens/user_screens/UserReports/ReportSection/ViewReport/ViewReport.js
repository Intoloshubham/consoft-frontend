import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getProjects } from '../../../../../controller/ProjectController'
import { SIZES, FONTS, COLORS, icons, images } from '../../../../../constants'
import {
    getManpower,
    getReport,
    getQuantity,
    verifyReport,
    revertReport,
    getProjectReportPath
} from '../../../../../controller/ReportController'
import { ScrollView } from 'react-native-gesture-handler';



const ViewReport = () => {
    const userData = useSelector(state => state.user);
    const user_id = userData._id;
    const company_id = userData.company_id;
    const navigation = useNavigation();
    // projects
    const [onSelect, setOnSelect] = React.useState(false);
    const [openProject, setOpenProject] = React.useState(false);
    const [projectValue, setProjectValue] = React.useState([]);
    const [project, setProject] = React.useState([]);
    const onProjectOpen = React.useCallback(() => {
        setOnSelect(false);
        fetchProject();
    }, []);

    const [report, setReport] = React.useState([]);
    const [reportModal, setReportModal] = React.useState(false);
    const [reportData, setReportData] = React.useState('');

    //report
    const [manpower, setManpower] = React.useState([]);
    const [quantity, setQuantity] = React.useState([]);

    //report path
    const [reportPath, setReportPath] = React.useState([]);

    // for report verify
    const [projectId, setProjectId] = React.useState('');
    const [reportId, setReportId] = React.useState('');

    //modal
    const [revertModal, setRevertModal] = React.useState(false);
    const [revertMsg, setRevertMsg] = React.useState('');
    let rep_resp;
    // get projects
    const fetchProject = async () => {
        let response = await getProjects(company_id);
        if (response.status === 200) {
            let projectFromApi = response.data.map(ele => {
                return { label: ele.project_name, value: ele._id };
            });
            setProject(projectFromApi);
        }
    };


    // fetch manpower on click
    const fetchManpower = async report_id => {
        setReportId(report_id);
        let response = await getManpower(report_id);
        if (response.status === 200) {
            setManpower(response.data);
        }
    };

    // fetch quantity on click
    const fetchQuantity = async report_id => {
        let response = await getQuantity(report_id);
        if (response.status === 200) {
            setQuantity(response.data);
        }
    };

    // fetch report path
    const fetchReportPath = async project_id => {
        const response = await getProjectReportPath(company_id, project_id);
        setProjectId(project_id);

        if (response.data) {
            {
                response.data.map(async (ele, i) => {

                    if (ele.verification_1 === user_id) {
                        let user_id = '';
                        rep_resp = await getReport(project_id, user_id);

                    } else {
                        rep_resp = await getReport(project_id, user_id);
                    }
                    setReport(rep_resp.data);

                })
            }
            setReportPath(response.data);
        }

    };



    // fetch verify report
    const fetchVerifyReport = async () => {
        let response = await verifyReport(projectId, reportId, user_id);
        if (response.status === 200) {
            alert('Verified');
            fetchReportPath();
        }
    };

    // fetch revert report
    const submitRevertReport = async () => {
        const formData = {
            revert_msg: revertMsg,
        };
        let response = await revertReport(projectId, reportId, user_id, formData);
        if (response.status === 200) {
            alert('Reverted Successfully');
            setRevertMsg('');
            setRevertModal(false);
            fetchReportPath();
        } else {
            alert(response.message);
        }
    };

    React.useEffect(() => {
        fetchReportPath();
    }, [onSelect]);

    // date
    const [date, setDate] = React.useState(new Date());
    const MyDateString =
        date.getFullYear() +
        '/' +
        ('0' + date.getDate()).slice(-2) +
        '/' +
        ('0' + (date.getMonth() + 1)).slice(-2);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };
    const showMode = currentMode => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    function renderProjectFilter() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: -SIZES.radius * 0.5,
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        width: '70%',
                        ...styles.shadow,
                    }}>
                    <DropDownPicker
                        style={{
                            borderWidth: null,
                            backgroundColor: COLORS.white,
                            minHeight: 40,
                            borderRadius: 5,
                        }}
                        dropDownContainerStyle={{
                            backgroundColor: COLORS.darkGray,
                            borderWidth: null,
                            borderRadius: 5,
                        }}
                        textStyle={{
                            fontSize: 16,
                            color: COLORS.black,
                            textTransform: 'capitalize',
                        }}
                        listParentLabelStyle={{ color: COLORS.white, fontSize: 15 }}
                        placeholder="Select project"
                        open={openProject}
                        value={projectValue}
                        items={project}
                        setOpen={setOpenProject}
                        setValue={setProjectValue}
                        setItems={setProject}
                        tickIconStyle={{
                            width: 18,
                            height: 18,
                            backgroundColor: COLORS.white,
                            tintColor: 'black',
                        }}
                        onSelectItem={value => {
                            // fetchReport(value.value);
                            setOnSelect(true);
                            fetchReportPath(value.value);
                        }}
                        onOpen={onProjectOpen}
                        autoScroll={false}
                        arrowIconStyle={{
                            width: 25,
                            height: 25,
                            tintColor: 'black',
                        }}
                        // maxHeight={200}
                        // zIndex={1000}
                        zIndexInverse={1000}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.darkGray,
                        padding: 10,
                        borderRadius: 2,
                    }}
                    onPress={showDatepicker}>
                    <Image
                        source={icons.filter}
                        style={{ height: 18, width: 18, tintColor: '#ffffff' }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        backgroundColor: COLORS.gray,
                        padding: 5,
                        paddingVertical: 9,
                        // right: -SIZES.base * 4,
                        alignItems: 'center',
                        borderRadius: 5,
                    }}
                    onPress={() => {
                        navigation.navigate('UserDashboard')
                    }}
                >
                    <Ionicons
                        name={'arrow-back'}
                        color={COLORS.white2}
                    />
                    <Text
                        style={{
                            color: COLORS.white2
                        }}
                    > Back </Text>
                </TouchableOpacity>
            </View>
        );
    }

    // console.log("🚀 ~ file: ViewReport.js ~ line 305 ~ ViewReport ~ reportPath", reportPath)

    // report user list
    function renderReport() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: 10,
                    elevation: 1,
                }}
                onPress={() => {
                    setReportModal(true);
                    setReportData({
                        project_name: item.project_name,
                        user_name: item.user_name,
                        date: item.report_date,
                        time: item.report_time,

                        verify_1_status: item.verify_1_status,
                        verify_1_revert: item.verify_1_revert,
                        verify_1_revert_msg: item.verify_1_revert_msg,

                        admin_1_status: item.admin_1_status,
                        admin_1_revert: item.admin_1_revert,
                        admin_1_revert_msg: item.admin_1_revert_msg,

                        admin_2_status: item.admin_2_status,
                        admin_2_revert: item.admin_2_revert,
                        admin_2_revert_msg: item.admin_2_revert_msg

                    });
                    fetchManpower(item._id);
                    fetchQuantity(item._id);
                }}>
                <Text
                    style={{
                        ...FONTS.h2,
                        color: COLORS.darkGray,
                        textTransform: 'capitalize',
                    }}>
                    {item.user_name}
                </Text>
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={icons.date}
                            style={{ height: 12, width: 12, right: 10 }}
                        />
                        <Text style={{ fontSize: 12, color: COLORS.darkGray }}>
                            {item.report_date}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={icons.time}
                            style={{ height: 12, width: 12, right: 10 }}
                        />
                        <Text style={{ fontSize: 12, color: COLORS.darkGray }}>
                            {item.report_time}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
        return (
            <FlatList
                contentContainerStyle={{ marginTop: 20 }}
                data={report}
                keyExtractor={item => `${item._id}`}
                renderItem={renderItem}
                scrollEnabled={true}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => {
                    return (
                        <View
                            style={{
                                marginVertical: SIZES.base - 2,
                            }}></View>
                    );
                }}
            />
        );
    }

    const trackVerificationProcess = () => {
        return (<View
            style={{
                flex: 1,
                borderWidth: 1,
                padding: SIZES.base,
                maxHeight: 210,
                marginTop: 5
            }}
        >
            <ScrollView
                style={{
                    flex: 1,
                    height: 500
                }}
                contentContainerStyle={{ flexGrow: 1, height: 200 }}
            >
                <View>
                    <Text
                        style={{
                            ...FONTS.h3,
                            color: COLORS.black,
                            marginBottom: 5,
                            textAlign: 'center'
                        }}>
                        Track Verification Process :
                    </Text>
                </View>
                {reportPath ? reportPath.map((ele, idx) => {
                    return (
                        <View style={{
                        }}
                            key={idx}
                        >
                            {
                                (
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        position: 'relative',
                                        // backgroundColor: 'dodgerblue',
                                        // top: 20,
                                        left: 0,
                                        right: 0,
                                        bottom: 0
                                    }}>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            right: 0,
                                            bottom: 0,
                                            flexWrap: 'wrap'

                                        }}>
                                            <View style={{
                                                // backgroundColor: 'red',
                                                position: 'absolute',
                                                left: 0,
                                                width: SIZES.width * 0.17

                                            }}>
                                                <Text>Verifier</Text>
                                            </View>
                                            <View style={{
                                                // backgroundColor: 'dodgerblue',
                                                position: 'absolute',
                                                left: 70,
                                                width: SIZES.width * 0.3
                                            }}>
                                                <Text>Verifier Name</Text>
                                            </View>
                                            <View style={{
                                                // backgroundColor: 'green',
                                                position: 'absolute',
                                                left: 185,
                                                width: SIZES.width * 0.3
                                            }}>
                                                <Text>Verify Status</Text>
                                            </View>
                                            <View style={{
                                                // backgroundColor: 'yellow',
                                                position: 'absolute',
                                                left: 275,
                                                width: SIZES.width * 0.3
                                            }}>
                                                <Text>Revtd. Status</Text>
                                            </View>
                                            <View style={{
                                                // backgroundColor: 'yellow',
                                                position: 'absolute',
                                                top: 110,
                                                left: 0,
                                                width: SIZES.width * 0.35
                                            }}>
                                                <Text>Reverted-Message</Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'column',
                                            // alignContent:'space-between',
                                            // justifyContent: 'space-between',
                                            // position: 'absolute',
                                            // left: 0,
                                            // bottom: 0,
                                            marginTop: 25
                                        }}>
                                            <View
                                                style={{
                                                    position: 'absolute',
                                                    left: 1,
                                                    width: SIZES.width * 0.48,
                                                    // backgroundColor: 'yellow'
                                                }}
                                            >
                                                <Text
                                                    numberOfLines={1}
                                                    style={{
                                                        ...FONTS.h3,
                                                        textTransform: 'capitalize',
                                                        color: COLORS.black,
                                                    }}>
                                                    Verifier 1: {ele.verification_1_name}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    position: 'absolute',
                                                    left: 1,
                                                    top: 25,
                                                    width: SIZES.width * 0.5,
                                                    // backgroundColor: 'yellow'
                                                }}
                                            >
                                                <Text
                                                    numberOfLines={1}
                                                    style={{
                                                        ...FONTS.h3,
                                                        textTransform: 'capitalize',
                                                        color: COLORS.black,
                                                    }}>
                                                    Admin 1:  {ele.admin_1_name}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    position: 'absolute',
                                                    left: 1,
                                                    top: 49,
                                                    width: SIZES.width * 0.5,
                                                    // backgroundColor: 'yellow'
                                                }}
                                            >
                                                <Text
                                                    numberOfLines={1}
                                                    style={{
                                                        ...FONTS.h3,
                                                        textTransform: 'capitalize',
                                                        color: COLORS.black,
                                                    }}>
                                                    Admin 2:  {ele.admin_2_name}
                                                </Text>
                                            </View>
                                        </View>
                                        {

                                            (

                                                <View
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: 'column',
                                                        position: 'absolute',
                                                        left: 190,
                                                        marginTop: 25
                                                    }}
                                                // key={i}
                                                >
                                                    {
                                                        reportData.verify_1_status === false && reportData.verify_1_revert === false &&
                                                            reportData.admin_1_status === false && reportData.admin_1_revert === false &&
                                                            reportData.admin_2_status === false && reportData.admin_2_revert === false
                                                            ? (
                                                                <View
                                                                    style={{
                                                                        flexDirection: 'row',
                                                                        alignContent: 'space-between',
                                                                        position: 'absolute'
                                                                    }}>

                                                                    <View style={{
                                                                        left: 90,
                                                                    }}>
                                                                        <TouchableOpacity
                                                                            style={{
                                                                                left: 15,
                                                                                paddingHorizontal: 5,
                                                                                paddingVertical: 1,
                                                                                backgroundColor: COLORS.rose_600,
                                                                            }}
                                                                            onPress={() => setRevertModal(true)}>
                                                                            <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                Revert
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity
                                                                            style={{
                                                                                left: 15,
                                                                                top: 1,
                                                                                paddingHorizontal: 5,
                                                                                paddingVertical: 1,
                                                                                backgroundColor: COLORS.rose_600,
                                                                            }}
                                                                            onPress={() => {
                                                                                // setRevertModal(true)
                                                                            }}>
                                                                            <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                Revert
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity
                                                                            style={{
                                                                                left: 15,
                                                                                top: 2,
                                                                                paddingHorizontal: 5,
                                                                                paddingVertical: 1,
                                                                                backgroundColor: COLORS.rose_600,
                                                                            }}
                                                                            onPress={() => {
                                                                                // setRevertModal(true)
                                                                            }}>
                                                                            <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                Revert
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View style={{
                                                                        position: 'absolute',
                                                                        left: 0,
                                                                    }}>
                                                                        <View
                                                                            style={{
                                                                                left: 20,

                                                                                flexDirection: 'row',
                                                                            }}>
                                                                            <TouchableOpacity
                                                                                style={{
                                                                                    paddingHorizontal: 5,
                                                                                    paddingVertical: 1,
                                                                                    backgroundColor: COLORS.success_600,
                                                                                }}
                                                                                onPress={() => fetchVerifyReport()}>
                                                                                <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                    Verify
                                                                                </Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View
                                                                            style={{
                                                                                left: 20,
                                                                                top: 1,
                                                                                flexDirection: 'row',
                                                                            }}>
                                                                            <TouchableOpacity
                                                                                style={{
                                                                                    paddingHorizontal: 5,
                                                                                    paddingVertical: 1,
                                                                                    backgroundColor: COLORS.success_600,
                                                                                }}
                                                                                onPress={() => {
                                                                                    // fetchVerifyReport()
                                                                                }
                                                                                }>
                                                                                <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                    Verify
                                                                                </Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View
                                                                            style={{
                                                                                left: 20,
                                                                                top: 2,
                                                                                flexDirection: 'row',
                                                                            }}>
                                                                            <TouchableOpacity
                                                                                style={{
                                                                                    paddingHorizontal: 5,
                                                                                    paddingVertical: 1,
                                                                                    backgroundColor: COLORS.success_600,
                                                                                }}
                                                                                onPress={() => {
                                                                                    // fetchVerifyReport()
                                                                                }}>
                                                                                <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                    Verify
                                                                                </Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            ) :
                                                            reportData.verify_1_status === true && reportData.verify_1_revert === false &&
                                                                reportData.admin_1_status === false && reportData.admin_1_revert === false &&
                                                                reportData.admin_2_status === false && reportData.admin_2_revert === false
                                                                ? (
                                                                    <View
                                                                        style={{
                                                                            flexDirection: 'row',
                                                                            alignContent: 'space-between',
                                                                            position: 'absolute'
                                                                        }}>
                                                                        <View>
                                                                            <View
                                                                                style={{
                                                                                    left: 20,
                                                                                    flexDirection: 'row',
                                                                                }}>
                                                                                <TouchableOpacity
                                                                                    style={{
                                                                                        paddingHorizontal: 16,
                                                                                        paddingVertical: 1,
                                                                                        alignItems: 'center',
                                                                                        backgroundColor: COLORS.transparent,
                                                                                    }}
                                                                                    onPress={() => {
                                                                                        // fetchVerifyReport()
                                                                                    }}>
                                                                                    <Image
                                                                                        source={icons.verify}
                                                                                        style={{
                                                                                            // left: 8,
                                                                                            width: 16,
                                                                                            height: 16,
                                                                                            tintColor: 'green',
                                                                                        }}
                                                                                    />
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                            <View
                                                                                style={{
                                                                                    left: 20,
                                                                                    flexDirection: 'row',
                                                                                }}>
                                                                                <TouchableOpacity
                                                                                    style={{
                                                                                        paddingHorizontal: 5,
                                                                                        paddingVertical: 1,
                                                                                        top: 3,
                                                                                        backgroundColor: COLORS.success_600,
                                                                                    }}
                                                                                    onPress={() => {
                                                                                        // fetchVerifyReport()
                                                                                    }}>
                                                                                    <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                        Verify
                                                                                    </Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                            <View
                                                                                style={{
                                                                                    left: 20,
                                                                                    flexDirection: 'row',
                                                                                }}>
                                                                                <TouchableOpacity
                                                                                    style={{
                                                                                        paddingHorizontal: 5,
                                                                                        top: 5,
                                                                                        paddingVertical: 1,
                                                                                        backgroundColor: COLORS.success_600,
                                                                                    }}
                                                                                    onPress={() => {
                                                                                        // fetchVerifyReport()
                                                                                    }}>
                                                                                    <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                        Verify
                                                                                    </Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        </View>
                                                                        <View
                                                                            style={{
                                                                                left: 40
                                                                            }}>
                                                                            <TouchableOpacity
                                                                                style={{
                                                                                    left: 15,
                                                                                    paddingHorizontal: 5,
                                                                                    paddingVertical: 1,
                                                                                    backgroundColor: COLORS.rose_600,
                                                                                }}
                                                                                onPress={() => {
                                                                                    // setRevertModal(true)
                                                                                }}>
                                                                                <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                    Revert
                                                                                </Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity
                                                                                style={{
                                                                                    left: 15,
                                                                                    top: 1,
                                                                                    paddingHorizontal: 5,
                                                                                    paddingVertical: 1,
                                                                                    backgroundColor: COLORS.rose_600,
                                                                                }}
                                                                                onPress={() => {
                                                                                    // setRevertModal(true)
                                                                                }}>
                                                                                <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                    Revert
                                                                                </Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity
                                                                                style={{
                                                                                    left: 15,
                                                                                    top: 2,
                                                                                    paddingHorizontal: 5,
                                                                                    paddingVertical: 1,
                                                                                    backgroundColor: COLORS.rose_600,
                                                                                }}
                                                                                onPress={() => {
                                                                                    // setRevertModal(true)
                                                                                }}>
                                                                                <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                    Revert
                                                                                </Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>
                                                                ) :
                                                                reportData.verify_1_status === true && reportData.verify_1_revert === false &&
                                                                    reportData.admin_1_status === true && reportData.admin_1_revert === false &&
                                                                    reportData.admin_2_status === false && reportData.admin_2_revert === false
                                                                    ? (
                                                                        <View
                                                                            style={{
                                                                                flexDirection: 'row',
                                                                                alignContent: 'space-between',
                                                                                position: 'absolute'
                                                                            }}
                                                                        >
                                                                            <View>
                                                                                <View
                                                                                    style={{
                                                                                        left: 20,
                                                                                        top: 3,
                                                                                        flexDirection: 'row',
                                                                                    }}>
                                                                                    <TouchableOpacity
                                                                                        style={{
                                                                                            paddingHorizontal: 16,
                                                                                            paddingVertical: 1,
                                                                                            alignItems: 'center',
                                                                                            backgroundColor: COLORS.transparent,
                                                                                        }}
                                                                                        onPress={() => {
                                                                                            // fetchVerifyReport()
                                                                                        }}>
                                                                                        <Image
                                                                                            source={icons.verify}
                                                                                            style={{
                                                                                                // left: 8,
                                                                                                width: 16,
                                                                                                height: 16,
                                                                                                tintColor: 'green',
                                                                                            }}
                                                                                        />
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                                <View
                                                                                    style={{
                                                                                        left: 20,
                                                                                        top: 8,
                                                                                        flexDirection: 'row',
                                                                                    }}>
                                                                                    <TouchableOpacity
                                                                                        style={{
                                                                                            paddingHorizontal: 16,
                                                                                            paddingVertical: 1,
                                                                                            alignItems: 'center',
                                                                                            backgroundColor: COLORS.transparent,
                                                                                        }}
                                                                                        onPress={() => {
                                                                                            // fetchVerifyReport()
                                                                                        }}>
                                                                                        <Image
                                                                                            source={icons.verify}
                                                                                            style={{
                                                                                                // left: 8,
                                                                                                width: 16,
                                                                                                height: 16,
                                                                                                tintColor: 'green',
                                                                                            }}
                                                                                        />
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                                <View
                                                                                    style={{
                                                                                        left: 20,
                                                                                        top: 13,
                                                                                        flexDirection: 'row',
                                                                                    }}>
                                                                                    <TouchableOpacity
                                                                                        style={{
                                                                                            paddingHorizontal: 5,
                                                                                            paddingVertical: 1,
                                                                                            backgroundColor: COLORS.success_600,
                                                                                        }}
                                                                                        onPress={() => {
                                                                                            // fetchVerifyReport()
                                                                                        }}>
                                                                                        <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                            Verify
                                                                                        </Text>
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
                                                                            <View>
                                                                                <View
                                                                                    style={{
                                                                                        left: 40
                                                                                    }}>
                                                                                    <TouchableOpacity
                                                                                        style={{
                                                                                            left: 15,
                                                                                            paddingHorizontal: 5,
                                                                                            paddingVertical: 1,
                                                                                            backgroundColor: COLORS.rose_600,
                                                                                        }}
                                                                                        onPress={() => {
                                                                                            // setRevertModal(true)
                                                                                        }}>
                                                                                        <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                            Revert
                                                                                        </Text>
                                                                                    </TouchableOpacity>
                                                                                    <TouchableOpacity
                                                                                        style={{
                                                                                            left: 15,
                                                                                            top: 1,
                                                                                            paddingHorizontal: 5,
                                                                                            paddingVertical: 1,
                                                                                            backgroundColor: COLORS.rose_600,
                                                                                        }}
                                                                                        onPress={() => {
                                                                                            // setRevertModal(true)
                                                                                        }}>
                                                                                        <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                            Revert
                                                                                        </Text>
                                                                                    </TouchableOpacity>
                                                                                    <TouchableOpacity
                                                                                        style={{
                                                                                            left: 15,
                                                                                            top: 2,
                                                                                            paddingHorizontal: 5,
                                                                                            paddingVertical: 1,
                                                                                            backgroundColor: COLORS.rose_600,
                                                                                        }}
                                                                                        onPress={() => {
                                                                                            // setRevertModal(true)
                                                                                        }}>
                                                                                        <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                            Revert
                                                                                        </Text>
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                    : reportData.verify_1_status === true && reportData.verify_1_revert === false &&
                                                                        reportData.admin_1_status === true && reportData.admin_1_revert === false &&
                                                                        reportData.admin_2_status === true && reportData.admin_2_revert === false
                                                                        ? (
                                                                            <View style={{
                                                                                flexDirection: 'row',
                                                                                alignContent: 'space-between',
                                                                                position: 'absolute'
                                                                            }}>
                                                                                <View>
                                                                                    <View
                                                                                        style={{
                                                                                            left: 20,
                                                                                            top: 3,
                                                                                            flexDirection: 'row',
                                                                                        }}>
                                                                                        <TouchableOpacity
                                                                                            style={{
                                                                                                paddingHorizontal: 16,
                                                                                                paddingVertical: 1,
                                                                                                alignItems: 'center',
                                                                                                backgroundColor: COLORS.transparent,
                                                                                            }}
                                                                                            onPress={() => {
                                                                                                // fetchVerifyReport()
                                                                                            }}>
                                                                                            <Image
                                                                                                source={icons.verify}
                                                                                                style={{
                                                                                                    // left: 8,
                                                                                                    width: 16,
                                                                                                    height: 16,
                                                                                                    tintColor: 'green',
                                                                                                }}
                                                                                            />
                                                                                        </TouchableOpacity>
                                                                                    </View>
                                                                                    <View
                                                                                        style={{
                                                                                            left: 20,
                                                                                            top: 8,
                                                                                            flexDirection: 'row',
                                                                                        }}>
                                                                                        <TouchableOpacity
                                                                                            style={{
                                                                                                paddingHorizontal: 16,
                                                                                                paddingVertical: 1,
                                                                                                alignItems: 'center',
                                                                                                backgroundColor: COLORS.transparent,
                                                                                            }}
                                                                                            onPress={() => {
                                                                                                // fetchVerifyReport()
                                                                                            }}>
                                                                                            <Image
                                                                                                source={icons.verify}
                                                                                                style={{
                                                                                                    // left: 8,
                                                                                                    width: 16,
                                                                                                    height: 16,
                                                                                                    tintColor: 'green',
                                                                                                }}
                                                                                            />
                                                                                        </TouchableOpacity>
                                                                                    </View>
                                                                                    <View
                                                                                        style={{
                                                                                            left: 20,
                                                                                            top: 16,
                                                                                            flexDirection: 'row',
                                                                                        }}>
                                                                                        <TouchableOpacity
                                                                                            style={{
                                                                                                paddingHorizontal: 16,
                                                                                                paddingVertical: 1,
                                                                                                alignItems: 'center',
                                                                                                backgroundColor: COLORS.transparent,
                                                                                            }}
                                                                                            onPress={() => {
                                                                                                // fetchVerifyReport()
                                                                                            }}>
                                                                                            <Image
                                                                                                source={icons.verify}
                                                                                                style={{
                                                                                                    // left: 8,
                                                                                                    width: 16,
                                                                                                    height: 16,
                                                                                                    tintColor: 'green',
                                                                                                }}
                                                                                            />
                                                                                        </TouchableOpacity>
                                                                                    </View>
                                                                                </View>
                                                                                <View>
                                                                                    <View
                                                                                        style={{
                                                                                            left: 40
                                                                                        }}>
                                                                                        <TouchableOpacity
                                                                                            style={{
                                                                                                left: 15,
                                                                                                paddingHorizontal: 5,
                                                                                                paddingVertical: 1,
                                                                                                backgroundColor: COLORS.rose_600,
                                                                                            }}
                                                                                            onPress={() => {
                                                                                                // setRevertModal(true)
                                                                                            }}>
                                                                                            <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                                Revert
                                                                                            </Text>
                                                                                        </TouchableOpacity>
                                                                                        <TouchableOpacity
                                                                                            style={{
                                                                                                left: 15,
                                                                                                top: 1,
                                                                                                paddingHorizontal: 5,
                                                                                                paddingVertical: 1,
                                                                                                backgroundColor: COLORS.rose_600,
                                                                                            }}
                                                                                            onPress={() => {
                                                                                                // setRevertModal(true)
                                                                                            }}>
                                                                                            <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                                Revert
                                                                                            </Text>
                                                                                        </TouchableOpacity>
                                                                                        <TouchableOpacity
                                                                                            style={{
                                                                                                left: 15,
                                                                                                top: 2,
                                                                                                paddingHorizontal: 5,
                                                                                                paddingVertical: 1,
                                                                                                backgroundColor: COLORS.rose_600,
                                                                                            }}
                                                                                            onPress={() => {
                                                                                                // setRevertModal(true)
                                                                                            }}>
                                                                                            <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                                Revert
                                                                                            </Text>
                                                                                        </TouchableOpacity>
                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                        )
                                                                        : reportData.verify_1_revert === true &&
                                                                            reportData.admin_1_revert === false &&
                                                                            reportData.admin_2_revert === false
                                                                            ? (
                                                                                <View
                                                                                    style={{
                                                                                        flex: 1,
                                                                                        position: 'absolute'

                                                                                    }}
                                                                                >
                                                                                    <View style={{
                                                                                        flexDirection: 'row',
                                                                                        alignContent: 'space-between',

                                                                                    }}>
                                                                                        <View style={{
                                                                                            position: 'absolute',
                                                                                            left: 0,
                                                                                        }}>
                                                                                            <View
                                                                                                style={{
                                                                                                    left: 20,
                                                                                                    flexDirection: 'row',
                                                                                                }}>
                                                                                                <TouchableOpacity
                                                                                                    style={{
                                                                                                        paddingHorizontal: 5,
                                                                                                        paddingVertical: 1,
                                                                                                        backgroundColor: COLORS.success_600,
                                                                                                    }}
                                                                                                    onPress={() => {
                                                                                                        fetchVerifyReport()
                                                                                                    }}>
                                                                                                    <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                                        Verify
                                                                                                    </Text>
                                                                                                </TouchableOpacity>
                                                                                            </View>
                                                                                            <View
                                                                                                style={{
                                                                                                    left: 20,
                                                                                                    top: 1,
                                                                                                    flexDirection: 'row',
                                                                                                }}>
                                                                                                <TouchableOpacity
                                                                                                    style={{
                                                                                                        paddingHorizontal: 5,
                                                                                                        paddingVertical: 1,
                                                                                                        backgroundColor: COLORS.success_600,
                                                                                                    }}
                                                                                                    onPress={() => {
                                                                                                        // fetchVerifyReport()
                                                                                                    }}>
                                                                                                    <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                                        Verify
                                                                                                    </Text>
                                                                                                </TouchableOpacity>
                                                                                            </View>
                                                                                            <View
                                                                                                style={{
                                                                                                    left: 20,
                                                                                                    top: 2,
                                                                                                    flexDirection: 'row',
                                                                                                }}>
                                                                                                <TouchableOpacity
                                                                                                    style={{
                                                                                                        paddingHorizontal: 5,
                                                                                                        paddingVertical: 1,
                                                                                                        backgroundColor: COLORS.success_600,
                                                                                                    }}
                                                                                                    onPress={() => {
                                                                                                        // fetchVerifyReport()
                                                                                                    }}>
                                                                                                    <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                                        Verify
                                                                                                    </Text>
                                                                                                </TouchableOpacity>
                                                                                            </View>
                                                                                        </View>

                                                                                        <View style={{
                                                                                            left: 90
                                                                                        }}>
                                                                                            <View style={{
                                                                                                flex: 1,
                                                                                                flexDirection: "row",
                                                                                                top: 5,
                                                                                                flexWrap: 'wrap',
                                                                                                alignContent: "space-around",

                                                                                                // top: 12
                                                                                            }}>
                                                                                                <View
                                                                                                    style={{
                                                                                                        left: 15,
                                                                                                        flexDirection: 'row',
                                                                                                        alignItems: 'center',
                                                                                                        paddingHorizontal: 20

                                                                                                    }}>
                                                                                                    <Image
                                                                                                        source={icons.verify}
                                                                                                        style={{
                                                                                                            width: 16,
                                                                                                            height: 16,
                                                                                                            tintColor: 'red',
                                                                                                        }}
                                                                                                    />
                                                                                                </View>
                                                                                            </View>
                                                                                            <TouchableOpacity
                                                                                                style={{
                                                                                                    left: 15,
                                                                                                    paddingHorizontal: 5,
                                                                                                    paddingVertical: 1,
                                                                                                    top: 10,
                                                                                                    backgroundColor: COLORS.rose_600,
                                                                                                }}
                                                                                                onPress={() => {
                                                                                                    // setRevertModal(true)
                                                                                                }}>
                                                                                                <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                                    Revert
                                                                                                </Text>
                                                                                            </TouchableOpacity>
                                                                                            <TouchableOpacity
                                                                                                style={{
                                                                                                    left: 15,
                                                                                                    top: 12,
                                                                                                    paddingHorizontal: 5,
                                                                                                    paddingVertical: 1,
                                                                                                    backgroundColor: COLORS.rose_600,
                                                                                                }}
                                                                                                onPress={() => {
                                                                                                    //  setRevertModal(true)
                                                                                                }}>
                                                                                                <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                                    Revert
                                                                                                </Text>
                                                                                            </TouchableOpacity>
                                                                                        </View>
                                                                                    </View>
                                                                                    <View
                                                                                        style={{
                                                                                            // backgroundColor: 'dodgerblue',
                                                                                            width: SIZES.width * 0.5,
                                                                                            top: 45,
                                                                                            right: 190,
                                                                                            padding: 2
                                                                                        }}
                                                                                    >
                                                                                        <Text
                                                                                            numberOfLines={1}
                                                                                            style={{
                                                                                                ...FONTS.h5,
                                                                                                textTransform: 'capitalize',
                                                                                                color: COLORS.black,
                                                                                            }}>
                                                                                            {reportData.verify_1_revert_msg}
                                                                                        </Text>
                                                                                    </View>
                                                                                </View>
                                                                            )
                                                                            :
                                                                            reportData.verify_1_status === true &&
                                                                                reportData.admin_1_revert === true &&
                                                                                reportData.admin_2_revert === false
                                                                                ? (
                                                                                    <>
                                                                                        <View
                                                                                            style={{
                                                                                                flexDirection: 'row',
                                                                                                alignContent: 'space-between',
                                                                                                position: 'absolute'
                                                                                            }}>

                                                                                            <View style={{

                                                                                                left: 90,
                                                                                            }}>
                                                                                                <TouchableOpacity
                                                                                                    style={{
                                                                                                        left: 15,
                                                                                                        paddingHorizontal: 5,
                                                                                                        paddingVertical: 1,
                                                                                                        backgroundColor: COLORS.rose_600,
                                                                                                    }}
                                                                                                    onPress={() => {
                                                                                                        // setRevertModal(true)
                                                                                                    }}>
                                                                                                    <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                                        Revert
                                                                                                    </Text>
                                                                                                </TouchableOpacity>

                                                                                                <TouchableOpacity
                                                                                                    style={{
                                                                                                        left: 15,
                                                                                                        top: 5,
                                                                                                        paddingHorizontal: 5,
                                                                                                        paddingVertical: 1,
                                                                                                        alignItems: 'center',
                                                                                                        backgroundColor: COLORS.transparent,
                                                                                                    }}
                                                                                                    onPress={() => {
                                                                                                        // fetchVerifyReport()
                                                                                                    }}>
                                                                                                    <Image
                                                                                                        source={icons.verify}
                                                                                                        style={{
                                                                                                            // left: 8,
                                                                                                            width: 16,
                                                                                                            height: 16,
                                                                                                            tintColor: 'red',
                                                                                                        }}
                                                                                                    />
                                                                                                </TouchableOpacity>
                                                                                                <TouchableOpacity
                                                                                                    style={{
                                                                                                        left: 15,
                                                                                                        top: 8,
                                                                                                        paddingHorizontal: 5,
                                                                                                        paddingVertical: 1,
                                                                                                        backgroundColor: COLORS.rose_600,
                                                                                                    }}
                                                                                                    onPress={() => {
                                                                                                        // setRevertModal(true)
                                                                                                    }}>
                                                                                                    <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                                        Revert
                                                                                                    </Text>
                                                                                                </TouchableOpacity>
                                                                                            </View>
                                                                                            <View style={{
                                                                                                position: 'absolute',
                                                                                                left: 0,
                                                                                            }}>
                                                                                                <View
                                                                                                    style={{
                                                                                                        left: 20,
                                                                                                        top: 3,
                                                                                                        flexDirection: 'row',
                                                                                                    }}>
                                                                                                    <TouchableOpacity
                                                                                                        style={{
                                                                                                            paddingHorizontal: 16,
                                                                                                            paddingVertical: 1,
                                                                                                            alignItems: 'center',
                                                                                                            backgroundColor: COLORS.transparent,
                                                                                                        }}
                                                                                                        onPress={() => {
                                                                                                            // fetchVerifyReport()
                                                                                                        }}>
                                                                                                        <Image
                                                                                                            source={icons.verify}
                                                                                                            style={{
                                                                                                                // left: 8,

                                                                                                                width: 16,
                                                                                                                height: 16,
                                                                                                                tintColor: 'green',
                                                                                                            }}
                                                                                                        />
                                                                                                    </TouchableOpacity>
                                                                                                </View>
                                                                                                <View
                                                                                                    style={{
                                                                                                        left: 20,
                                                                                                        top: 5,
                                                                                                        flexDirection: 'row',
                                                                                                    }}>
                                                                                                    <TouchableOpacity
                                                                                                        style={{
                                                                                                            paddingHorizontal: 5,
                                                                                                            paddingVertical: 1,
                                                                                                            backgroundColor: COLORS.success_600,
                                                                                                        }}
                                                                                                        onPress={() => {
                                                                                                            // fetchVerifyReport()
                                                                                                        }
                                                                                                        }>
                                                                                                        <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                                            Verify
                                                                                                        </Text>
                                                                                                    </TouchableOpacity>
                                                                                                </View>
                                                                                                <View
                                                                                                    style={{
                                                                                                        left: 20,
                                                                                                        top: 6,
                                                                                                        flexDirection: 'row',
                                                                                                    }}>
                                                                                                    <TouchableOpacity
                                                                                                        style={{
                                                                                                            paddingHorizontal: 5,
                                                                                                            paddingVertical: 1,
                                                                                                            backgroundColor: COLORS.success_600,
                                                                                                        }}
                                                                                                        onPress={() => {
                                                                                                            // fetchVerifyReport()
                                                                                                        }}>
                                                                                                        <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                                            Verify
                                                                                                        </Text>
                                                                                                    </TouchableOpacity>
                                                                                                </View>
                                                                                                <View
                                                                                                    style={{
                                                                                                        // backgroundColor: 'dodgerblue',
                                                                                                        width: SIZES.width * 0.5,
                                                                                                        top: 40,
                                                                                                        right: 191,
                                                                                                        padding: 2
                                                                                                    }}
                                                                                                >
                                                                                                    <Text
                                                                                                        numberOfLines={1}
                                                                                                        style={{
                                                                                                            ...FONTS.h5,
                                                                                                            textTransform: 'capitalize',
                                                                                                            color: COLORS.black,
                                                                                                        }}>
                                                                                                        {reportData.admin_1_revert_msg}
                                                                                                    </Text>
                                                                                                </View>
                                                                                            </View>
                                                                                        </View>
                                                                                    </>

                                                                                )
                                                                                :
                                                                                reportData.admin_1_status === true &&
                                                                                    reportData.admin_2_revert === true
                                                                                    ? (
                                                                                        <>
                                                                                            <View style={{
                                                                                                flexDirection: 'row',
                                                                                                alignContent: 'space-between',
                                                                                                position: 'absolute'
                                                                                            }}>
                                                                                                <View>
                                                                                                    <View
                                                                                                        style={{
                                                                                                            left: 20,
                                                                                                            top: 3,
                                                                                                            flexDirection: 'row',
                                                                                                        }}>
                                                                                                        <TouchableOpacity
                                                                                                            style={{
                                                                                                                paddingHorizontal: 16,
                                                                                                                paddingVertical: 1,
                                                                                                                alignItems: 'center',
                                                                                                                backgroundColor: COLORS.transparent,
                                                                                                            }}
                                                                                                            onPress={() => {
                                                                                                                // fetchVerifyReport()
                                                                                                            }}>
                                                                                                            <Image
                                                                                                                source={icons.verify}
                                                                                                                style={{
                                                                                                                    // left: 8,
                                                                                                                    width: 16,
                                                                                                                    height: 16,
                                                                                                                    tintColor: 'green',
                                                                                                                }}
                                                                                                            />
                                                                                                        </TouchableOpacity>
                                                                                                    </View>
                                                                                                    <View
                                                                                                        style={{
                                                                                                            left: 20,
                                                                                                            top: 8,
                                                                                                            flexDirection: 'row',
                                                                                                        }}>
                                                                                                        <TouchableOpacity
                                                                                                            style={{
                                                                                                                paddingHorizontal: 16,
                                                                                                                paddingVertical: 1,
                                                                                                                alignItems: 'center',
                                                                                                                backgroundColor: COLORS.transparent,
                                                                                                            }}
                                                                                                            onPress={() => {
                                                                                                                // fetchVerifyReport()
                                                                                                            }}>
                                                                                                            <Image
                                                                                                                source={icons.verify}
                                                                                                                style={{
                                                                                                                    // left: 8,
                                                                                                                    width: 16,
                                                                                                                    height: 16,
                                                                                                                    tintColor: 'green',
                                                                                                                }}
                                                                                                            />
                                                                                                        </TouchableOpacity>
                                                                                                    </View>
                                                                                                    <View
                                                                                                        style={{
                                                                                                            left: 20,
                                                                                                            top: 14,
                                                                                                            flexDirection: 'row',
                                                                                                        }}>

                                                                                                        <TouchableOpacity
                                                                                                            style={{
                                                                                                                paddingHorizontal: 5,
                                                                                                                paddingVertical: 1,
                                                                                                                backgroundColor: COLORS.success_600,
                                                                                                            }}
                                                                                                            onPress={() => {
                                                                                                                // fetchVerifyReport()
                                                                                                            }}>
                                                                                                            <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                                                Verify
                                                                                                            </Text>
                                                                                                        </TouchableOpacity>
                                                                                                    </View>
                                                                                                </View>
                                                                                                <View>
                                                                                                    <View
                                                                                                        style={{
                                                                                                            left: 40,
                                                                                                            position: 'absolute'
                                                                                                        }}>
                                                                                                        <TouchableOpacity
                                                                                                            style={{
                                                                                                                left: 15,
                                                                                                                paddingHorizontal: 5,
                                                                                                                paddingVertical: 1,
                                                                                                                backgroundColor: COLORS.rose_600,
                                                                                                            }}
                                                                                                            onPress={() => {
                                                                                                                // setRevertModal(true)
                                                                                                            }}>
                                                                                                            <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                                                Revert
                                                                                                            </Text>
                                                                                                        </TouchableOpacity>
                                                                                                        <TouchableOpacity
                                                                                                            style={{
                                                                                                                left: 15,
                                                                                                                top: 1,
                                                                                                                paddingHorizontal: 5,
                                                                                                                paddingVertical: 1,
                                                                                                                backgroundColor: COLORS.rose_600,
                                                                                                            }}
                                                                                                            onPress={() => {
                                                                                                                // setRevertModal(true)
                                                                                                            }}>
                                                                                                            <Text style={{ color: 'white', ...FONTS.h4 }}>
                                                                                                                Revert
                                                                                                            </Text>
                                                                                                        </TouchableOpacity>
                                                                                                        <TouchableOpacity
                                                                                                            style={{
                                                                                                                left: 15,
                                                                                                                top: 10,
                                                                                                                paddingHorizontal: 16,
                                                                                                                paddingVertical: 1,
                                                                                                                alignItems: 'center',
                                                                                                                backgroundColor: COLORS.transparent,
                                                                                                            }}
                                                                                                            onPress={() => {
                                                                                                                // setRevertModal(true)
                                                                                                            }}>
                                                                                                            <Image
                                                                                                                source={icons.verify}
                                                                                                                style={{
                                                                                                                    // left: 8,
                                                                                                                    width: 16,
                                                                                                                    height: 16,
                                                                                                                    tintColor: 'red',
                                                                                                                }}
                                                                                                            />
                                                                                                        </TouchableOpacity>
                                                                                                    </View>
                                                                                                    <View
                                                                                                        style={{
                                                                                                            // backgroundColor: 'dodgerblue',
                                                                                                            width: SIZES.width * 0.5,
                                                                                                            top: 105,
                                                                                                            right: 240,
                                                                                                            padding: 2
                                                                                                        }}
                                                                                                    >
                                                                                                        <Text
                                                                                                            numberOfLines={1}
                                                                                                            style={{

                                                                                                                ...FONTS.h5,
                                                                                                                textTransform: 'capitalize',
                                                                                                                color: COLORS.black,
                                                                                                            }}>
                                                                                                            {reportData.admin_2_revert_msg}
                                                                                                        </Text>
                                                                                                    </View>
                                                                                                </View>
                                                                                            </View>
                                                                                        </>
                                                                                    ) : null
                                                    }
                                                </View>

                                            )
                                        }
                                    </View>
                                )


                            }
                        </View>
                    );
                }) : null
                }
            </ScrollView>
        </View>)

    }


    // report showing modal
    function renderReportModal() {

        const renderItem = ({ item, index }) => (
            <View
                style={{
                    borderWidth: 1,
                    borderColor: COLORS.gray2,
                    padding: 5,
                    borderRadius: 3,
                    width: SIZES.width / 2.4,
                }}
            >
                <Text style={{ ...FONTS.h3, color: 'black' }}>
                    {item.contractor_name}
                </Text>
                <View style={{}}>
                    {item.manpowerCategories.map((ele, i) => {
                        return (
                            <View
                                key={i}
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ ...FONTS.h4, color: COLORS.darkGray }}>
                                    {i + 1}.
                                </Text>
                                <View
                                    style={{
                                        left: 5,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            ...FONTS.h4,
                                            color: COLORS.black,
                                        }}>
                                        {ele.manpower_category_name} {' - '}
                                    </Text>
                                    <Text
                                        style={{
                                            ...FONTS.h4,
                                            color: COLORS.black,
                                        }}>
                                        {ele.manpower_member}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        );

        const footerComponent = () => (
            <View>
                {renderQuantity()}
                {/* {user_id && renderFooter()} */}
            </View>
        );

        return (
            <Modal animationType="slide" transparent={true} visible={reportModal}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.transparentBlack7,
                    }}>
                    <View
                        style={{
                            top: 50,
                            backgroundColor: COLORS.white,
                            paddingHorizontal: SIZES.radius,
                            paddingBottom: SIZES.radius,
                            height: '100%',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <ImageBackground
                                style={{
                                    borderWidth: 2,
                                    borderRadius: 20,
                                    borderColor: 'white',
                                    padding: 3,
                                    top: -20,
                                    backgroundColor: COLORS.rose_600,
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setReportModal(false);
                                    }}>
                                    <Image
                                        source={icons.cross}
                                        style={{ height: 25, width: 25, tintColor: COLORS.white }}
                                    />
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                        <Text
                            style={{
                                textAlign: 'center',
                                marginBottom: 8,
                                ...FONTS.h2,
                                color: COLORS.lightblue_900,
                                fontWeight: '500',
                                textDecorationLine: 'underline',
                            }}>
                            Daily Progress Report
                        </Text>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: COLORS.darkGray2,
                                borderRadius: 3,
                                padding: 15,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    // alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        ...FONTS.h2,
                                        color: COLORS.black,
                                        textTransform: 'capitalize',
                                    }}>
                                    {reportData.project_name}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                    }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 13, color: COLORS.darkGray }}>
                                            Date{' - '}
                                        </Text>
                                        <Text style={{ fontSize: 12, color: COLORS.darkGray }}>
                                            {reportData.date}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 13, color: COLORS.darkGray }}>
                                            Time{' - '}
                                        </Text>
                                        <Text style={{ fontSize: 12, color: COLORS.darkGray }}>
                                            {reportData.time}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    marginVertical: 10,
                                    borderColor: COLORS.gray2,
                                }}></View>
                            <View>
                                <Text
                                    style={{
                                        ...FONTS.h3,
                                        color: COLORS.black,
                                        textAlign: 'center',
                                    }}>
                                    Manpower
                                </Text>
                                <Text style={{ ...FONTS.h3, color: COLORS.black }}>
                                    Contractors
                                </Text>

                                <FlatList
                                    contentContainerStyle={{ marginTop: 5 }}
                                    numColumns={2}
                                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                                    data={manpower}
                                    keyExtractor={item => `${item._id}`}
                                    renderItem={renderItem}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={() => {
                                        return <View style={{ margin: 5 }}></View>;
                                    }}
                                    ListFooterComponent={footerComponent}
                                    maxHeight={200}
                                    ListFooterComponentStyle={{
                                        flex: 1,
                                        // borderWidth:1,
                                        height: "100%",
                                        // marginBottom: '40%'
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            {trackVerificationProcess()}
                        </View>

                    </View>
                </View>
            </Modal>
        );
    }

    // quantity report
    function renderQuantity() {
        const renderItem = ({ item, index }) => (
            <View>
                <View
                    style={{
                        // marginTop: 5,
                        flexDirection: 'row',
                    }}>
                    <Text
                        style={{
                            flex: 1,
                            ...FONTS.h3,
                            color: COLORS.darkGray,
                        }}>
                        {item.quantityWorkItems.item_name}
                    </Text>
                    <Text
                        style={{
                            ...FONTS.h3,
                            flex: 0.5,
                            color: COLORS.darkGray,
                            textAlign: 'right',
                        }}>
                        {item.quantityWorkItems.num_length}
                    </Text>
                    <Text
                        style={{
                            ...FONTS.h3,
                            flex: 0.5,
                            color: COLORS.darkGray,
                            textAlign: 'right',
                        }}>
                        {item.quantityWorkItems.num_width}
                    </Text>
                    <Text
                        style={{
                            ...FONTS.h3,
                            flex: 0.5,
                            color: COLORS.darkGray,
                            textAlign: 'right',
                        }}>
                        {item.quantityWorkItems.num_height}
                    </Text>
                    <Text
                        style={{
                            ...FONTS.h3,
                            flex: 1,
                            color: COLORS.darkGray,
                            textAlign: 'right',
                        }}>
                        {item.quantityWorkItems.num_total}
                    </Text>
                    <Text
                        style={{
                            ...FONTS.h3,
                            flex: 1,
                            color: COLORS.darkGray,
                            textAlign: 'right',
                        }}>
                        {item.quantityWorkItems.quality_type}
                    </Text>
                </View>
                {index == 0 ? (
                    <View
                        style={{
                            borderBottomWidth: 1,
                            marginVertical: index == 0 ? 10 : null,
                            borderColor: COLORS.darkGray2,
                        }}></View>
                ) : null}
                <View style={{}}>
                    {item.quantityWorkItems.subquantityitems.map((ele, i) => {
                        return (
                            <View key={i}>
                                {i == 0 ? (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            // marginBottom: SIZES.base,
                                        }}>
                                        <Text
                                            style={{
                                                flex: 1,
                                                ...FONTS.h4,
                                                color: COLORS.black,
                                                // fsontWeight: 'bold',
                                            }}></Text>
                                        <Text
                                            style={{
                                                ...FONTS.h4,
                                                flex: 0.5,
                                                color: COLORS.black,
                                                textAlign: 'right',
                                                // fontWeight: 'bold',
                                            }}>
                                            L
                                        </Text>
                                        <Text
                                            style={{
                                                ...FONTS.h4,
                                                flex: 0.5,
                                                color: COLORS.black,
                                                textAlign: 'right',
                                                // fontWeight: 'bold',
                                            }}>
                                            W
                                        </Text>
                                        <Text
                                            style={{
                                                ...FONTS.h4,
                                                flex: 0.5,
                                                color: COLORS.black,
                                                textAlign: 'right',
                                                // fontWeight: 'bold',
                                            }}>
                                            H
                                        </Text>
                                        <Text
                                            style={{
                                                ...FONTS.h4,
                                                flex: 1,
                                                color: COLORS.black,
                                                textAlign: 'right',
                                                // fontWeight: 'bold',
                                            }}>
                                            Total
                                        </Text>
                                        <Text
                                            style={{
                                                ...FONTS.h3,
                                                flex: 1,
                                                color: COLORS.black,
                                                textAlign: 'right',
                                                // fontWeight: 'bold',
                                            }}>
                                            Remark
                                        </Text>
                                    </View>
                                ) : null}
                                <View
                                    style={{
                                        left: 100,
                                        borderBottomWidth: 1,
                                        borderColor: COLORS.darkGray2,
                                        width: '75%',
                                        marginVertical: 5,
                                    }}></View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        // marginBottom: SIZES.base,
                                    }}>
                                    <Text
                                        style={{
                                            flex: 1,
                                            ...FONTS.h4,
                                            color: COLORS.darkGray,
                                            // fsontWeight: 'bold',
                                        }}></Text>
                                    <Text
                                        style={{
                                            ...FONTS.h4,
                                            flex: 0.5,
                                            color: COLORS.darkGray,
                                            textAlign: 'right',
                                            // fontWeight: 'bold',
                                        }}>
                                        {ele.sub_length}
                                    </Text>
                                    <Text
                                        style={{
                                            ...FONTS.h4,
                                            flex: 0.5,
                                            color: COLORS.darkGray,
                                            textAlign: 'right',
                                            // fontWeight: 'bold',
                                        }}>
                                        {ele.sub_width}
                                    </Text>
                                    <Text
                                        style={{
                                            ...FONTS.h4,
                                            flex: 0.5,
                                            color: COLORS.darkGray,
                                            textAlign: 'right',
                                            // fontWeight: 'bold',
                                        }}>
                                        {ele.sub_height}
                                    </Text>
                                    <Text
                                        style={{
                                            ...FONTS.h4,
                                            flex: 1,
                                            color: COLORS.darkGray,
                                            textAlign: 'right',
                                            // fontWeight: 'bold',
                                        }}>
                                        {ele.sub_total}
                                    </Text>
                                    <Text
                                        style={{
                                            ...FONTS.h3,
                                            flex: 1,
                                            color: COLORS.darkGray,
                                            textAlign: 'right',
                                            // fontWeight: 'bold',
                                        }}>
                                        {ele.sub_quality_type}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        );

        return (
            <View
                style={{
                    // height:'100%'
                }}

            >
                <View
                    style={{
                        borderBottomWidth: 1,
                        marginVertical: 10,
                        borderColor: COLORS.gray2,
                    }}></View>
                <Text
                    style={{
                        ...FONTS.h3,
                        color: COLORS.black,
                        textAlign: 'center',
                    }}>
                    Excluded Quantity
                </Text>
                <FlatList
                    // contentContainerStyle={{marginTop: 5}}
                    data={quantity}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={renderItem}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    ItemSeparatorComponent={() => {
                        return (
                            <View
                                style={{
                                    width: '100%',
                                    height: 1,
                                    backgroundColor: COLORS.darkGray,
                                    marginVertical: 10,
                                }}></View>
                        );
                    }}
                    ListHeaderComponent={
                        <View>
                            <View
                                style={{
                                    marginTop: 15,
                                    flexDirection: 'row',
                                    marginBottom: SIZES.base,
                                }}>
                                <Text
                                    style={{
                                        flex: 1,
                                        ...FONTS.h3,
                                        color: COLORS.black,
                                    }}>
                                    Items
                                </Text>
                                <Text
                                    style={{
                                        ...FONTS.h3,
                                        flex: 0.5,
                                        color: COLORS.black,
                                        textAlign: 'right',
                                    }}>
                                    L
                                </Text>
                                <Text
                                    style={{
                                        ...FONTS.h3,
                                        flex: 0.5,
                                        color: COLORS.black,
                                        textAlign: 'right',
                                    }}>
                                    W
                                </Text>
                                <Text
                                    style={{
                                        ...FONTS.h3,
                                        flex: 0.5,
                                        color: COLORS.black,
                                        textAlign: 'right',
                                    }}>
                                    H
                                </Text>
                                <Text
                                    style={{
                                        ...FONTS.h3,
                                        flex: 1,
                                        color: COLORS.black,
                                        textAlign: 'right',
                                    }}>
                                    Total
                                </Text>
                                <Text
                                    style={{
                                        ...FONTS.h3,
                                        flex: 1,
                                        color: COLORS.black,
                                        textAlign: 'right',
                                    }}>
                                    Remark
                                </Text>
                            </View>
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: COLORS.darkGray,
                                    marginBottom: 10,
                                }}></View>
                        </View>
                    }
                />
            </View>
        );
    }



    function renderRevertModal() {
        return (
            <Modal animationType="slide" transparent={true} visible={revertModal}>
                <TouchableWithoutFeedback onPress={() => setRevertModal(false)}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.transparentBlack7,
                        }}>
                        <View
                            style={{
                                position: 'absolute',
                                backgroundColor: COLORS.white,
                                paddingHorizontal: SIZES.padding,
                                paddingVertical: SIZES.radius,
                                width: '90%',
                                top: '30%',
                                borderRadius: 5,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                }}>
                                <Text style={{ fontSize: 20, color: COLORS.darkGray }}>
                                    Revert message
                                </Text>
                                <ImageBackground
                                    style={{
                                        backgroundColor: COLORS.white,
                                        padding: 2,
                                        elevation: 20,
                                    }}>
                                    <TouchableOpacity onPress={() => setRevertModal(false)}>
                                        <Image
                                            source={icons.cross}
                                            style={{
                                                height: 25,
                                                width: 25,
                                                tintColor: COLORS.rose_600,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>

                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: COLORS.darkGray
                                }}>
                                <TextInput
                                    placeholder="Write your message..."
                                    multiline={true}
                                    numberOfLines={3}
                                    onChangeText={value => {
                                        setRevertMsg(value);
                                    }}
                                />
                            </View>

                            <TouchableOpacity
                                style={{
                                    marginTop: SIZES.padding,
                                    alignItems: 'center',
                                }}
                                onPress={() => submitRevertReport()}>
                                <Text
                                    style={{
                                        ...FONTS.h3,
                                        backgroundColor: COLORS.lightblue_800,
                                        paddingHorizontal: SIZES.radius,
                                        paddingVertical: 5,
                                        borderRadius: 3,
                                        color: COLORS.white,
                                    }}>
                                    Send
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
    return (
        <View style={{ margin: SIZES.radius }}>
            {renderProjectFilter()}
            {renderRevertModal()}
            {renderReportModal()}
            {onSelect == true && renderReport()}
        </View>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
});

export default ViewReport