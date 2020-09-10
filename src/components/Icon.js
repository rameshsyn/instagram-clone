import React from 'react';
import theme from '../config/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Icon = ({component: Component, ...rest}) => {
  return (
    <Component
      size={theme.sizes.icon}
      color={theme.colors.charcoal}
      {...rest}
    />
  );
};

Icon.defaultProps = {
  component: MaterialCommunityIcons,
};

export default Icon;
