import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Alert,
  ImageBackground,
  FlatList,
  Text,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';

import getGradient from './utils/getGradient';
import Header from './components/Header';
import SearchBar from './components/SearchBar'; 
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import Loader from './components/Loader';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecastList, setForecastList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bgImage, setBgImage] = useState(null);

  const WEATHER_API_KEY = '60ed597cd1345cb90419f9582d71d3a6';
  const UNSPLASH_ACCESS_KEY = 'Y4-dD9OaZzoCluMuoR13ao0HcxdBtkqeapO2BOXq11Gg'; 

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission denied', 'Please enable location permission in settings.');
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
        );

        setWeather(res.data);
        fetchCityImage(res.data.name);
        getForecast(res.data.name);
      } catch (error) {
        Alert.alert('Location Error', 'Could not fetch weather from your location.');
      }
      setLoading(false);
    })();
  }, []);

  const getWeather = async () => {
    if (!city) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      setWeather(res.data);
      fetchCityImage(city);
      getForecast(city);
    } catch (err) {
      Alert.alert('City not found', 'Please enter a valid city name.');
    }
    setLoading(false);
  };

  const getForecast = async (cityName) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const daily = res.data.list.filter((item) => item.dt_txt.includes('12:00:00'));
      setForecastList(daily);
    } catch (err) {
      console.log('Forecast fetch error:', err.message);
      setForecastList([]);
    }
  };

  const fetchCityImage = async (cityName) => {
    try {
      const res = await axios.get(
        `https://api.unsplash.com/search/photos?query=${cityName} city landscape&client_id=${UNSPLASH_ACCESS_KEY}&orientation=portrait`
      );
      const imageUrl = res.data?.results?.[0]?.urls?.regular;
      if (imageUrl) setBgImage(imageUrl);
      else setBgImage(null);
    } catch (err) {
      setBgImage(null);
    }
  };

  const condition = weather?.weather?.[0]?.main || 'default';
  const gradient = getGradient(condition);

  return (
    <ImageBackground
      source={bgImage ? { uri: bgImage } : null}
      style={styles.background}
      resizeMode="cover"
      blurRadius={2}
    >
      <LinearGradient colors={gradient} style={styles.overlay}>
        <StatusBar barStyle="light-content" />
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <Header />
          <SearchBar city={city} setCity={setCity} onSearch={getWeather} />
          {loading && <Loader />}
          {weather && !loading && <WeatherCard weather={weather} />}
          {forecastList.length > 0 && !loading && (
            <View style={{ marginTop: 20, width: '100%', height: 200 }}>
              <Text style={styles.forecastTitle}>5-Day Forecast</Text>
              <FlatList
                data={forecastList}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <ForecastCard forecast={item} />}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  forecastTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 4,
  },
});
