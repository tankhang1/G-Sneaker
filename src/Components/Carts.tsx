import {
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useMemo} from 'react';
import {COLORS} from '../data/color';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Redux_Toolkit/Store';
import Animated, {ZoomIn, ZoomOut} from 'react-native-reanimated';
import {
  descreaseShoe as dShoe,
  increaseShoe as iShoe,
  deleteShoe as deShoe,
} from '../Redux_Toolkit/Slices/cartsSlice';
const {width: WSCREEN, height: HSCREEN} = Dimensions.get('screen');
const Carts = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.carts);
  const sumCarts = useMemo(
    () =>
      carts.reduce(
        (preValue, curValue) =>
          preValue + curValue.shoe.price * curValue.quantity,
        0,
      ),
    [carts],
  );
  const descreaseShoe = (id: number) => {
    dispatch(dShoe({id}));
  };
  const increaseShoe = (id: number) => {
    dispatch(iShoe({id}));
  };
  const deleteShoe = (id: number) => {
    dispatch(deShoe({id}));
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardBg} />
        <View>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/nike.png')}
              style={{
                width: 50,
                height: 30,
                resizeMode: 'contain',
              }}
            />
            <View
              style={[
                styles.cartContainer,
                {
                  width: '100%',
                },
              ]}>
              <Text adjustsFontSizeToFit style={styles.textHeader}>
                Your cart
              </Text>
              <Text adjustsFontSizeToFit style={styles.textHeader}>
                ${sumCarts.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        {carts.length === 0 ? (
          <Text
            style={{
              fontFamily: 'Rubik',
              fontSize: 14,
              color: COLORS.Gray,
              paddingLeft: 15,
            }}>
            Your cart is empty
          </Text>
        ) : (
          <ScrollView
            nestedScrollEnabled
            contentContainerStyle={{
              paddingHorizontal: 15,
              height: '100%',
            }}>
            {carts.map((cart, index) => {
              return (
                <Animated.View
                  entering={ZoomIn.duration(1000)}
                  exiting={ZoomOut.duration(1000)}
                  key={index}
                  style={[
                    styles.cartContainer,
                    {
                      marginVertical: 20,
                    },
                  ]}>
                  <View
                    style={[
                      styles.imageBg,
                      {
                        backgroundColor: cart.shoe.color,
                      },
                    ]}>
                    <Image
                      source={{uri: cart.shoe.image}}
                      style={{
                        width: 120,
                        height: 100,
                        resizeMode: 'cover',
                        transform: [{translateX: -15}, {translateY: -5}],
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: '60%',
                    }}>
                    <Text
                      style={[
                        styles.textHeader,
                        {
                          fontSize: 14,
                          marginBottom: 10,
                        },
                      ]}>
                      {cart.shoe.name}
                    </Text>
                    <Text
                      style={[
                        styles.textHeader,
                        {
                          fontSize: 20,
                          marginBottom: 16,
                        },
                      ]}>
                      ${cart.shoe.price}
                    </Text>
                    <View style={styles.cartContainer}>
                      <View
                        style={[
                          styles.cartContainer,
                          {
                            width: '60%',
                          },
                        ]}>
                        <Pressable
                          onPress={() => descreaseShoe(cart.shoe.id)}
                          style={styles.btn}>
                          <Image
                            source={require('../assets/minus.png')}
                            style={{width: 12, height: 12}}
                          />
                        </Pressable>
                        <Text
                          style={{
                            fontFamily: 'Rubik',
                            fontSize: 14,
                            color: COLORS.Gray,
                          }}>
                          {cart.quantity}
                        </Text>
                        <Pressable
                          onPress={() => increaseShoe(cart.shoe.id)}
                          style={styles.btn}>
                          <Image
                            source={require('../assets/plus.png')}
                            style={{
                              width: 12,
                              height: 12,
                              resizeMode: 'contain',
                            }}
                          />
                        </Pressable>
                      </View>
                      <Pressable
                        onPress={() => deleteShoe(cart.shoe.id)}
                        style={styles.btnTrash}>
                        <Image
                          source={require('../assets/trash.png')}
                          style={{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain',
                          }}
                        />
                      </Pressable>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: WSCREEN,
    height: HSCREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    height: '70%',
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    overflow: 'hidden',
  },
  cardBg: {
    width: 300,
    height: 300,
    backgroundColor: COLORS.Yellow,
    borderRadius: 150,
    position: 'absolute',
    top: -150,
    left: -150,
  },
  logoContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Rubik',
    color: COLORS.Black,
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageBg: {
    width: 90,
    height: 90,
    borderRadius: 100,
    transform: [{rotateZ: '-30deg'}],
  },
  btn: {
    width: 28,
    height: 28,
    backgroundColor: '#eee',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTrash: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: COLORS.Yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Carts;
