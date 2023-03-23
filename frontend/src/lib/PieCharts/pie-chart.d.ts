type EntryData = {
    dateTime?: Date
    userAgent?: string
    ip: string
    country_name: string
    city: string
    continent_name: string
    country_subdivision?: string
    country_emoji: string
    location_latitude: number
    location_longitude: number
}

type HitsPerCountry = {
    [key: string]: number
}

type PieChartOpts = {
    relevantEntries?: number
    backgroundColor?: string[]
    hoverBackgroundColor?: string[]
}
