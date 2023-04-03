const X_API_KEY = 'x-api-key'

const PORT = process.env.SERVER_PORT

const CLIENT_ID_KEY = 'client_id'

const ACCEPTED_LOC_KEYS = [
        "city",
        "region",
        "region_code",
        "country",
        "country_name",
        "country_code",
        "country_code_iso3",
        "continent_code",
        "latitude",
        "longitude",
        "timezone"
]

const CONTENT_TYPE = {
        "Content-Type": "application/json"
}

module.exports = {
        PORT,
        X_API_KEY,
        ACCEPTED_LOC_KEYS,
        CLIENT_ID_KEY,
        CONTENT_TYPE
}