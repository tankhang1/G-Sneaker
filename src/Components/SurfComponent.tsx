import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {Svg, Path} from 'react-native-svg';
import {COLORS} from '../data/color';
const PathAnimated = Animated.createAnimatedComponent(Path);

const SurfComponent = () => {
  const surfValue = useSharedValue(0);
  const propsAnimated = useAnimatedProps(() => {
    return {
      d: `M 0 0 c 0.5 ${interpolate(
        surfValue.value,
        [0, 1],
        [0.2, -0.1],
      )} 0.7 ${interpolate(
        surfValue.value,
        [0, 1],
        [-0.2, 0.2],
      )} 1 0 v 1 h -1 z`,
    };
  });
  useEffect(() => {
    surfValue.value = withRepeat(withTiming(1, {duration: 3000}), -1, true);
  }, []);
  return (
    <Svg viewBox="0 -0.35 1 1">
      <PathAnimated animatedProps={propsAnimated} fill={COLORS.Yellow} />
    </Svg>
  );
};

export default SurfComponent;
