import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create(
    {
        container: {
            height: Dimensions.get('screen').height / 2 - 140,
            backgroundColor: '#3F36C1',
        },
        viewPager: {
            flex: 1,
        },
        page: {
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        containerActiveSlide: {
            flexDirection: 'row',
            marginBottom: 10
        },
        activeSlide: {
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: '#fff',
            marginHorizontal: 5
        },
        now: {
            backgroundColor: '#ffD700',
        },
        imgSlideContainer: {
            flex: 1
        },

    }
)