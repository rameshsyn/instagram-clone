import React from 'react';
import BottomTab from './BottomTab';

const ScreenLayout = ({children, navigation}) => {
  return (
    <>
      {children}
      <BottomTab navigation={navigation} />
    </>
  );
};

export default ScreenLayout;
