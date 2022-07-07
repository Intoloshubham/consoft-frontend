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
        elevation: 5
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
        width:377
    }

})
