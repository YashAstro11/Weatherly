export default function getGradient(condition) {
    switch (condition.toLowerCase()) {
      case 'clear':
        return ['#f7971e', '#ffd200']; // sunny
      case 'clouds':
        return ['#757f9a', '#d7dde8']; // cloudy
      case 'rain':
      case 'drizzle':
        return ['#000046', '#1cb5e0']; // rain
      case 'snow':
        return ['#83a4d4', '#b6fbff']; // snow
      case 'thunderstorm':
        return ['#141e30', '#243b55']; // storm
      case 'mist':
      case 'haze':
      case 'fog':
        return ['#3e5151', '#decba4']; // foggy
      default:
        return ['#0f2027', '#203a43']; // fallback
    }
  }
  