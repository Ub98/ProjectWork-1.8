export interface IMeteoDaily {
    latitude: number
    longitude: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    elevation: number
    daily_units: DailyUnits
    daily: Daily
  }
  
  export interface DailyUnits {
    time: string
    temperature_2m_max: string
    temperature_2m_min: string
    precipitation_probability_max: string
  }
  
  export interface Daily {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_probability_max: number[]
  }

  export interface IMeteoHourly {
    latitude: number
    longitude: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    elevation: number
    hourly_units: HourlyUnits
    hourly: Hourly
  }
  
  export interface HourlyUnits {
    time: string
    temperature_2m: string
    precipitation_probability: string

  }
  
  export interface Hourly {
    time: string[]
    temperature_2m: number[]
    precipitation_probability: number[]

  }
  