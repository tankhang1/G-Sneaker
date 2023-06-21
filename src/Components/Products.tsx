import {
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useCallback} from 'react';
import {COLORS} from '../data/color';
import SHOES from '../data/shoes.json';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Redux_Toolkit/Store';
import {SHOE, addCart} from '../Redux_Toolkit/Slices/cartsSlice';
const {width: WSCREEN, height: HSCREEN} = Dimensions.get('screen');

const Products = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.carts);

  const onPress = (shoe: SHOE) => {
    dispatch(addCart({shoe, quantity: 1}));
  };

  const checkCarts = useCallback(
    (id: number) => {
      if (carts.some(e => e.shoe.id === id)) {
        return true;
      }
      return false;
    },
    [carts],
  );
  return (
    <View
      style={{
        width: WSCREEN,
        height: HSCREEN,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
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
            <Text adjustsFontSizeToFit style={styles.textHeader}>
              Our Products
            </Text>
          </View>
        </View>
        <ScrollView nestedScrollEnabled>
          {SHOES.shoes.map((shoe, index) => {
            return (
              <View key={index} style={styles.itemContainer}>
                {/*Image */}
                <View
                  style={[
                    styles.imageBg,
                    {
                      backgroundColor: shoe.color,
                    },
                  ]}>
                  <Image
                    source={{uri: shoe.image}}
                    style={{
                      width: '100%',
                      height: '60%',
                      transform: [{rotateZ: '-30deg'}, {translateX: -30}],
                    }}
                  />
                </View>
                {/*Title */}
                <Text
                  adjustsFontSizeToFit
                  style={[
                    styles.textHeader,
                    {
                      fontSize: 20,
                      marginTop: 26,
                      marginBottom: 20,
                    },
                  ]}>
                  {shoe.name}
                </Text>
                {/*Sub Title */}
                <Text adjustsFontSizeToFit style={styles.subText}>
                  {shoe.description}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  {/*Money */}
                  <Text
                    adjustsFontSizeToFit
                    style={[
                      styles.textHeader,
                      {
                        fontSize: 18,
                      },
                    ]}>
                    ${shoe.price}
                  </Text>

                  {/*Add to card */}
                  <Pressable
                    onPress={() => onPress(shoe)}
                    style={styles.addBtn}
                    disabled={checkCarts(shoe.id)}>
                    {!checkCarts(shoe.id) ? (
                      <Text
                        style={[
                          styles.textHeader,
                          {
                            fontSize: 14,
                          },
                        ]}>
                        ADD TO CART
                      </Text>
                    ) : (
                      <Image
                        source={require('../assets/check.png')}
                        style={{
                          width: 18,
                          height: 18,
                          resizeMode: 'contain',
                        }}
                      />
                    )}
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
    marginLeft: 16,
    marginVertical: 10,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Rubik',
    color: COLORS.Black,
  },
  itemContainer: {
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  imageBg: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  subText: {
    fontSize: 13,
    fontFamily: 'Rubik',
    fontWeight: '300',
    color: COLORS.Gray,
    marginBottom: 20,
  },
  addBtn: {
    width: 'auto',
    minWidth: 46,
    height: 46,
    backgroundColor: COLORS.Yellow,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});
export default Products;
