import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';



const API_KEY = "oQudC0I6xCtlECim9qpcXwr0eLQwXi8K";

export default function App() {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);


    
  useEffect(() => {
    const watchId = Geolocation.watchPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    return () => Geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchCityAndCountry();
    }
  }, [latitude, longitude]);
  
    // useEffect(() => {
    //   Geolocation.getCurrentPosition(position => {
    //     setLatitude(position.coords.latitude);
    //     setLongitude(position.coords.longitude);
    //   });
    // }, []);
  
    const fetchCityAndCountry = async () => {
      try {
        const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude},${longitude}&toplevel=true`);
        const data = response.data;
        setCity(data.AdministrativeArea.LocalizedName);
        setCountry(data.Country.LocalizedName);
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <View style={styles.container}>
      <Text>Vous êtes :</Text>
      <Text>Ville : {city}</Text>
      <Text>Pays : {country}</Text>
      <Button title="Actualiser" onPress={fetchCityAndCountry} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
})





  