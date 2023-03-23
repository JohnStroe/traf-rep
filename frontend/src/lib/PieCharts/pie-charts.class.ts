import {
    REGIONS,
    DEFAULT_PIE_BACKGROUND_COLORS,
    DEFAULT_PIE_HOVER_BACKGROUND_COLORS,
    DEFAULT_RELEVANT_ENTRIES
} from "./constants";


const defaultPieOpts: PieChartOpts = {
    relevantEntries: DEFAULT_RELEVANT_ENTRIES,
    backgroundColor: DEFAULT_PIE_BACKGROUND_COLORS,
    hoverBackgroundColor: DEFAULT_PIE_HOVER_BACKGROUND_COLORS
}

export class PieCharts {
    private readonly _data: EntryData[];
    private _opts: PieChartOpts;

    constructor(rawData: EntryData[], opts: PieChartOpts) {
        this._data = rawData
        this._opts = {...defaultPieOpts, ...opts}
        this.dataSet = this.dataSet.bind(this);
    }

    sortByContinent(continentCode: string): EntryData[] {
        return this._data.filter((entry) =>
            entry.continent_name === REGIONS.filter(r => r.code === continentCode)[0].title);
    }

    hitsPerCountry(continentCode: string): HitsPerCountry {
        const sbc = this.sortByContinent(continentCode)
        const filterKey = ["NA", "AU"].includes(continentCode)
            ? "country_subdivision"
            : "country_name"
        // sbc - sorted by continents
        return sbc.reduce((acc, c) => {
            if (acc.hasOwnProperty(c[filterKey])) {
                acc[c[filterKey]]++;
            } else {
                acc[c[filterKey]] = 1;
            }
            return acc;
        }, {})
    }

    relevantCountries(continentCode: string): HitsPerCountry[] {
        // hpc - hitsPerCountry
        const hpc = this.hitsPerCountry(continentCode)
        const hpcArr = Object.entries(hpc).map(([k, v]) => ({[k]: v}))
        return hpcArr.sort((a, b) =>
            Object.values(b)[0] - Object.values(a)[0]).slice(0, this._opts.relevantEntries)
    }

    relevantCountriesNames(continentCode: string): string[] {
        return this.relevantCountries(continentCode).map(entry => `${Object.keys(entry)[0]} - ${Object.values(entry)[0]}`)
    }

    relevantCountriesHits(continentCode: string): number[] {
        return this.relevantCountries(continentCode).map(entry => Object.values(entry)[0])
    }

    dataSet(continentCode) {
        return {
            labels: this.relevantCountriesNames(continentCode) ,
            datasets: [
                {
                    data: this.relevantCountriesHits(continentCode),
                    backgroundColor: this._opts.backgroundColor,
                    hoverBackgroundColor: this._opts.hoverBackgroundColor
                },
            ],
        }
    }
}