import {StyleSheet} from 'react-native'
import { FONTS, icons, SIZES,COLORS } from '../../../../constants'
export default StyleSheet.create({

    container: {
      flex: 1
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    avai_task: {
  
      margin: 10,
      padding: 4,
      width: 300,
      borderColor: "transparent",
      elevation: 0.1,
      marginTop: 10,
      marginBottom: 6,
      marginLeft: 20,
      backgroundColor: "transparent"
    },
    avai_text: {
      // fontWeight: "bold",
      textAlign: "left",
      // fontSize: 20,
      ...FONTS.body2,
      marginTop: 4,
      padding: 5,
      paddingHorizontal: 10,
      paddingBottom: 10,
      color: COLORS.black
  
    },
    icon1: {
      width: 30,
      borderRadius: 1,
      borderWidth: 2,
      padding: 5,
      marginLeft: -SIZES.base,
      height: 30,
      marginTop: 7,
      justifyContent:"flex-start",
      left:5,
  
      marginHorizontal: SIZES.largeTitle
    },
    tasks: {
      borderColor: "whitesmoke",
      marginHorizontal: 20,
      borderRadius: 10,
      padding: 12,
      backgroundColor: "#E4E9F2",
      justifyContent: "center",
      elevation: 3
    },
    Intask: {
      backgroundColor: COLORS.gray3,
      margin:SIZES.base,
      flexDirection: "row",
      justifyContent: "space-between",   
      alignItems:"center",
      padding: 7,
      borderRadius: 5,
      elevation: 4
    },
    num_task: {
      ...FONTS.body3,
      // alignSelf: "center",
      marginHorizontal: 50,
      
      // fontSize: 15,
      color: COLORS.black
    },
    report_section_title: {
      margin: SIZES.h5,
      padding: 5,
      width: 350,
      marginTop: SIZES.body3,
      marginBottom: -SIZES.h5,
      marginLeft: SIZES.h2,
    },
    create_new_report_btn: {
      // backgroundColor: "#E4E9F2",
      backgroundColor: COLORS.lightGray1,
      opacity:1.2,
      elevation: 3,
      margin: 10,
      borderColor:"#0000",
      borderWidth:1,
      width:SIZES.width*0.4,
      marginLeft: SIZES.padding,
      marginRight: SIZES.padding,
      borderTopLeftRadius: SIZES.h5,
      borderTopRightRadius: SIZES.h5,
      borderBottomLeftRadius: SIZES.h5,
      padding: SIZES.h5,
    },
    eng: {
      width: 150,
      height: 150,
      borderWidth: 1,
      backgroundColor: COLORS.gray3,
      margin: 5,
      marginLeft: 5,
      marginRight: 2,
      borderColor: "whitesmoke",
      padding: 20,
      borderRadius: 15,
    },
    circular_progress: {
      textAlign: "center",
      alignItems: "center",
      marginVertical: 30
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    tag: {
      ...FONTS.h5,
      fontWeight: "bold"
    }
  
  })