import { FunctionComponent, ReactNode } from 'react';

// native/expo components
import { View, Image, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';

// styles
import styleSliderTutorial from '../../styles/styleSliderTutorial';

// interface
interface Props {
   sliderArray: Array<object>
}

const SliderTutorial: FunctionComponent<Props> = ({ sliderArray }) => {

   // function to map array of slide 
   const renderSlider = (item: { [key: string]: any }, key: number): ReactNode => {
      return (
         <View style={styleSliderTutorial.page} key={key}>
            <View style={styleSliderTutorial.imgSlideContainer}>
               <Image
                  resizeMode={'contain'}
                  style={styleSliderTutorial.imgSlide}
                  source={item.urlImg}
               />
            </View>

            {/* ACTIVE SLIDE BTN */}
            <View style={styleSliderTutorial.containerActiveSlide}>
               <View style={[styleSliderTutorial.activeSlide, key === 0 ? styleSliderTutorial.now : null]}></View>
               <View style={[styleSliderTutorial.activeSlide, key === 1 ? styleSliderTutorial.now : null]}></View>
               <View style={[styleSliderTutorial.activeSlide, key === 2 ? styleSliderTutorial.now : null]}></View>
               <View style={[styleSliderTutorial.activeSlide, key === 3 ? styleSliderTutorial.now : null]}></View>
            </View>
         </View>
      )
   }

   return (
      <View style={{ flex: 1 }}>
         <PagerView style={styleSliderTutorial.viewPager} initialPage={0}>
            {sliderArray.map(renderSlider)}
         </PagerView>
      </View>
   )
}

export default SliderTutorial;