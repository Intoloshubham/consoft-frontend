import { StyleSheet } from 'react-native'
import { COLORS, FONTS, SIZES, dummyData, icons, images } from '../../../constants'
export default styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        backgroundColor: COLORS.lightblue_200,
        borderColor: COLORS.lightblue_200,
        margin: SIZES.base * 0.3,
        borderRadius: 2,
        width: SIZES.width * 0.7,
        elevation: 2
    },

    con_body: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: COLORS.lightblue_100,
        marginHorizontal: 5,
        width: SIZES.width * 0.7,
        alignSelf: "center",

    },
    body_del_btn: {
        // backgroundColor: "green",
        top: 2
    },
    body_edit_btn: {
        // backgroundColor: "gray",
        paddingHorizontal: 2
    },
    body_ed_de_view: {
        flexDirection: "row",
        justifyContent: "space-around",
        // right: -52,
        // backgroundColor: "red",
    },
    group: {
        marginVertical: 4,
    },
    option: {
        marginVertical: 4,
        marginHorizontal: 12,
    },
    input: {
        height: 20,
        margin: 12,
        borderWidth: 1,
        padding: 2,
        width: 38
    },
    Project_list_drop: {
        height: 30,
        borderWidth: 1,
        borderColor:COLORS.lightblue_400,
        paddingHorizontal: 8,
        marginTop: 20,
        marginBottom:5,
        width:SIZES.width*1*0.962,
        borderRadius:2
    },
    cont_Project_list_drop: {
        height: 38,
        borderRadius:5,
        borderWidth: 1,
        borderColor:COLORS.transparentBlack1,
        alignSelf:"center",
        paddingHorizontal: 8,
        marginTop: 20,
        marginBottom:5,
        width:320,
        bottom:-15
    },
    //for quantity styles
    dropdown: {
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        // marginTop: 28,
        width: '60%',
        marginBottom: 5,
        borderColor: COLORS.gray,
      },
      dropdown1: {
        height: 45,
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 28,
        marginBottom: 5,
        borderColor: COLORS.gray,
      },
      container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
      },
      inputsContainer: {
        flex: 1,
      },
      inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        borderWidth: 2,
        borderColor: COLORS.black,
        borderRadius: 5,
        padding: 8,
        marginBottom: 10,
      },
      inputfrom: {
        width: '30%',
        borderWidth: 1,
        height: 30,
        padding: -6,
        paddingLeft: 5,
        marginBottom: 5,
        borderRadius: 10,
        marginLeft: 5,
        borderColor: COLORS.gray,
      },
      inputfromtwo:{
      width: '25%',
      borderWidth: 1,
      height: 30,
      padding: -6,
      paddingLeft: 5,
      marginBottom: 5,
      borderRadius: 5,
      marginLeft: 5,
      backgroundColor: COLORS.gray2,
      color: COLORS.gray,
      textAlign: 'center',
      borderColor: COLORS.gray,
    },
      inputfromone: {
        width: '23%',
        borderWidth: 1,
        height: 30,
        padding: -6,
        textAlign:'center',
        color:COLORS.black,
        paddingLeft: 5,
        marginBottom: 5,
        borderRadius: 5,
        marginLeft: 5,
        borderColor: COLORS.gray,
      },
      

})
