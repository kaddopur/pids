import XLSX from 'xlsx'
import Debug from 'debug'
import _ from 'lodash'
import fs from 'fs'

const debug = Debug('stationParser')

const workbook = XLSX.readFile('data/raw/stations.xls')
const workSheet = workbook.Sheets[workbook.SheetNames[0]]
const parsedStations = {}

_.chunk(Object.keys(workSheet)
  .filter(v => v[0] !== '!')
  .map(address => workSheet[address].v), 6)
  .forEach(row => {
    const stationBus = row[0]
    const stationA = row[1]
    const stationB = row[2]
    const travelTime = row[3]
    const id = row[4]
    const stopTime = row[5]

    parsedStations[stationBus] = parsedStations[stationBus] || []
    parsedStations[stationBus].push({
      stationA, stationB, travelTime, id, stopTime
    })
  })

delete parsedStations.stationbus

fs.writeFile(`${__dirname}/../data/parsed/stations.json`, JSON.stringify(parsedStations, undefined, 2), err => {
  if(err) {
        return debug(err);
    }
    debug("Station data was parsed and saved!");
})
