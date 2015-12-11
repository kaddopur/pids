import XLSX from 'xlsx'
import Debug from 'debug'
import _ from 'lodash'
import fs from 'fs'

const debug = Debug('stationParser')

const workbook = XLSX.readFile('data/raw/stations.xls')
const workSheet = workbook.Sheets[workbook.SheetNames[0]]
const parsedStations = {}
const parsedLines = {}

_.chunk(Object.keys(workSheet)
  .filter(v => v[0] !== '!')
  .map(address => workSheet[address].v), 6)
  .forEach(row => {
    const stationBus = row[0]
    const stationA = row[1].replace('捷運', '')
    const stationB = row[2].replace('捷運', '')
    const travelTime = row[3]
    const id = row[4]
    const stopTime = row[5]

    parsedStations[stationBus] = parsedStations[stationBus] || []
    parsedStations[stationBus].push({
      stationA, stationB, travelTime, id, stopTime
    })

    parsedLines[stationBus] = parsedLines[stationBus] || []
    parsedLines[stationBus] = parsedLines[stationBus].concat([ stationA, stationB ])
  })

// stations
delete parsedStations.stationbus

fs.writeFile(`${__dirname}/../data/parsed/stations.json`, JSON.stringify(parsedStations, undefined, 2), err => {
  if(err) {
    return debug(err)
  }
  debug('Station data was parsed and saved!')
})

// lines
Object.keys(parsedLines).map(key => {
  parsedLines[key] = parsedLines[key].filter((v, i) => {
    return i === parsedLines[key].indexOf(v)
  })
})

delete parsedLines.stationbus

fs.writeFile(`${__dirname}/../data/parsed/lines.json`, JSON.stringify(parsedLines, undefined, 2), err => {
  if(err) {
    return debug(err)
  }
  debug('Line data was parsed and saved!')
})
