import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import MapView from 'react-native-maps';
import Colors from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';

const LocationSearch = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 39.8887,
    longitude: 32.8609,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Ara.."
        onPress={(data, details = null) => {
          const points = details?.geometry?.location;
          if (!points) return;
          setLocation({
            ...location,
            latitude: points.lat,
            longitude: points.lng,
          });
        }}
        renderLeftButton={()=>{
          return <View style={styles.iconBox}>
            <Ionicons name='search-outline' size={24} color={Colors.primary}/>
          </View>
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInputContainer: {
            padding: 12,
            backgroundColor: Colors.primary,
          },
          textInput: {
            backgroundColor: Colors.lightGrey,
            borderRadius: 12,
            paddingLeft: 40,
          },
        }}
        query={{
          key: 'AIzaSyARqSfIOE-T4pUKqib9VLSifuKSQg2_zyM',
          language: 'en',
        }}
      />
      <MapView style={styles.map} region={location} showsUserLocation={true} />
      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Onayla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: Colors.primary,
    margin: 16,
    padding: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  iconBox:{
    position: 'absolute',
    zIndex:1,
    top:22,
    left:20
  }
});
