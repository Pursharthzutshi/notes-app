import React from 'react';
import { ColorPicker as RawColorPicker } from 'react-native-color-picker';

const ColorPicker = React.forwardRef<any, React.ComponentProps<typeof RawColorPicker>>((props, ref) => (
  <RawColorPicker {...props} ref={ref} />
));
