import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY} from '../constants';
const OrderDelivery = ({route, navigation}) => {
  const [restaurant, setRestaurant] = React.useState(null);
  const [streetName, setStreetName] = React.useState('');
  const [fromLocation, setFromLocation] = React.useState(null);
  const [toLocation, setToLocation] = React.useState(null);
  const [region, setRegion] = React.useState(null);
  React.useEffect(() => {
    let {restaurant, currentLocation} = route.params;

    let fromLoc = currentLocation.gps;
    let toLoc = restaurant.location;
    let street = currentLocation.streetName;
    // Haritanın görüntüleyeceği bölgeyi hesapla
    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2, // Enlem
      longitude: fromLoc.longitude + toLoc.longitude / 2, // Boylam
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2, // Enlem farkı
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2, // Boylam farkı
    };
    setRestaurant(restaurant);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, [route.params]);
  console.log(region);
  function renderMap() {
    return (
      <View style={{flex: 1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={{flex: 1}}
        />
      </View>
    );
  }

  return <View style={{flex: 1}}>{renderMap()}</View>;
};

export default OrderDelivery;
