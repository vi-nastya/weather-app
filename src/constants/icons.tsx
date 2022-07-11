import { ReactComponent as ClearSkyIcon } from "icons/clear-sky.svg";
import { ReactComponent as ClearSkyNightIcon } from "icons/clear-sky-night.svg";
import { ReactComponent as FewCouldsIcon } from "icons/few-clouds.svg";
import { ReactComponent as FewCouldsNightIcon } from "icons/few-clouds-night.svg";
import { ReactComponent as ScatteredCloudsIcon } from "icons/scattered-clouds.svg";
import { ReactComponent as BrokenCloudsIcon } from "icons/broken-clouds.svg";
import { ReactComponent as ShowerRainIcon } from "icons/shower-rain.svg";
import { ReactComponent as RainIcon } from "icons/rain.svg";
import { ReactComponent as RainNightIcon } from "icons/rain-night.svg";
import { ReactComponent as ThunderstormIcon } from "icons/thunderstorm.svg";
import { ReactComponent as SnowIcon } from "icons/snow.svg";
import { ReactComponent as MistIcon } from "icons/mist.svg";

// icons pack https://www.iconfinder.com/iconsets/weather-color-2
// open weather API icon codes: https://openweathermap.org/weather-conditions#How-to-get-icon-URL

export const WEATHER_ICONS = {
  "01d": ClearSkyIcon,
  "01n": ClearSkyNightIcon,
  "02d": FewCouldsIcon,
  "02n": FewCouldsNightIcon,
  "03d": ScatteredCloudsIcon,
  "03n": ScatteredCloudsIcon,
  "04d": BrokenCloudsIcon,
  "04n": BrokenCloudsIcon,
  "09d": ShowerRainIcon,
  "09n": ShowerRainIcon,
  "10d": RainIcon,
  "10n": RainNightIcon,
  "11d": ThunderstormIcon,
  "11n": ThunderstormIcon,
  "13d": SnowIcon,
  "13n": SnowIcon,
  "50d": MistIcon,
  "50n": MistIcon,
};

export type WeatherApiIconType = keyof typeof WEATHER_ICONS;
