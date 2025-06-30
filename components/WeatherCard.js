import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function WeatherCard({ weather }) {
  const {
    name,
    main: { temp, feels_like, humidity },
    weather: [details],
    wind,
    sys: { sunrise, sunset },
  } = weather;

  const iconUrl = `https://openweathermap.org/img/wn/${details.icon}@4x.png`;

  const formatTime = (unix) => {
    const date = new Date(unix * 1000);
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{name}</Text>
      <Text style={styles.temp}>{Math.round(temp)}°C</Text>
      <Text style={styles.desc}>{details.description}</Text>
      <Image style={styles.icon} source={{ uri: iconUrl }} />

      <View style={styles.info}>
        <Feather name="thermometer" size={16} color="#fff" />
        <Text style={styles.infoText}>Feels like: {Math.round(feels_like)}°C</Text>
      </View>

      <View style={styles.info}>
        <Feather name="wind" size={16} color="#fff" />
        <Text style={styles.infoText}>Wind: {Math.round(wind.speed)} m/s</Text>
      </View>

      <View style={styles.info}>
        <Feather name="droplet" size={16} color="#fff" />
        <Text style={styles.infoText}>Humidity: {humidity}%</Text>
      </View>

      <View style={styles.sunRow}>
        <View style={styles.sunColumn}>
          <Feather name="sunrise" size={16} color="#fff" />
          <Text style={styles.sunText}>{formatTime(sunrise)}</Text>
        </View>
        <View style={styles.sunColumn}>
          <Feather name="sunset" size={16} color="#fff" />
          <Text style={styles.sunText}>{formatTime(sunset)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e3c72',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  city: { fontSize: 28, color: '#fff', fontWeight: 'bold' },
  temp: { fontSize: 40, color: '#fff', fontWeight: 'bold' },
  desc: { fontSize: 18, color: '#ccc', textTransform: 'capitalize' },
  icon: { width: 100, height: 100, marginTop: 10 },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  infoText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  sunRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    width: '60%',
  },
  sunColumn: {
    alignItems: 'center',
  },
  sunText: {
    color: '#fff',
    marginTop: 4,
    fontSize: 14,
  },
});
