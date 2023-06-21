import {View, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import {COLORS} from './src/data/color';
import SurfComponent from './src/Components/SurfComponent';
import Products from './src/Components/Products';
import {Provider} from 'react-redux';
import {persitor, store} from './src/Redux_Toolkit/Store';
import Carts from './src/Components/Carts';
import {PersistGate} from 'redux-persist/integration/react';
const {width: WSCREEN, height: HSCREEN} = Dimensions.get('screen');

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persitor}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.White,
          }}>
          <SurfComponent />
          <ScrollView
            style={{
              position: 'absolute',
              width: WSCREEN,
              height: HSCREEN,
            }}
            nestedScrollEnabled
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}
            renderToHardwareTextureAndroid>
            <Products />
            <Carts />
          </ScrollView>
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
