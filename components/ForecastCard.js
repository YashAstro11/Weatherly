import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ForecastCard({ forecast }) {
  const date = new Date(forecast.dt * 1000).toDateString().slice(0, 10);
  const temp = Math.round(forecast.main.temp);
  const icon = forecast.weather[0].icon;

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{date}</Text>
      <Image
        style={styles.icon}
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
      />
      <Text style={styles.temp}>{temp}°C</Text>
      <Text style={styles.desc}>{forecast.weather[0].main}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    width: 100,
  },
  date: { color: '#fff', fontSize: 12, marginBottom: 4 },
  icon: { width: 50, height: 50 },
  temp: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  desc: { color: '#eee', fontSize: 12 },
});
