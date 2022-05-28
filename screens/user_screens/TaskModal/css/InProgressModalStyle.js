import {StyleSheet} from 'react-native'
import { FONTS, icons, SIZES,COLORS } from '../../../../constants'

export default StyleSheet.create({
    modal_container: {
        paddingHorizontal: SIZES.padding,
        flex: 1,
        flexDirection: "row",
        borderColor: "#B7EEE1",
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopRightRadius: 77,
        borderTopLeftRadius: 77,
        shadowColor: "#470000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        marginTop: 200
    },
    circle: {
        height: 10,
        width: 10,
        marginVertical: 4,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 1
    },
    active_task_view: {
        margin: 1,     
        paddingVertical: SIZES.largeTitle,
        paddingHorizontal: SIZES.h2,
        borderRadius: 10,
        alignItems: "center",
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: "#000",
        shadowOpacity: 1.2,
        bottom: -10
    },
    active_task_title: {
        elevation: 2,
        fontSize: SIZES.h4,
        fontWeight: "bold",    
        paddingHorizontal: SIZES.font,
        textAlign: "center",
        bottom: -15,
        color:COLORS.black
    },
    act_tsk_stat: {
       
        ...FONTS.h2,
        textAlign:"center"
    },
    act_tsk_stat_view: {
        backgroundColor: "#0000",
        margin: 5,    
                 
   
    },
    act_tsk_list_view: {
        marginTop: SIZES.body1,
        padding: SIZES.base,
        marginBottom:-SIZES.base

    },
    pie_tag:{
        marginLeft:SIZES.base,
        color:COLORS.blue,
        ...FONTS.h4,
        fontWeight:"bold"
    }
})