import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create(
   {
      containerTutorial: {
         backgroundColor: '#007AFF',
         flex: 1
      },
      container: {
         backgroundColor: '#3F36C1'
      },
      viewPager: {
         height: '100%'
      },
      page: {
         justifyContent: 'space-between',
         alignItems: 'center'
      },
      containerActiveSlide: {
         flexDirection: 'row',
         marginVertical: 10
      },
      activeSlide: {
         width: 15,
         height: 15,
         borderRadius: 10,
         backgroundColor: '#fff',
         marginHorizontal: 10
      },
      now: {
         backgroundColor: '#ffD700',
      },
      imgSlideContainer: {
         flex: 1
      },
      imgSlide: {
         width: Dimensions.get('screen').width - 10,
         height: '100%'
      },
      text: {
         textAlign: 'center', fontWeight: 'bold',
         color: '#fff'
      }

   }
)