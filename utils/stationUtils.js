import lines from '../data/parsed/lines.json'

// train
// {
//   '_id': '1',
//   'Station': '三民高中站',
//   'Destination': '南勢角站',
//   'UpdateTime': '2015-12-11T15:18:42.983'
// }
export function isTrainPassingStation(train, station) {
  const passingLines = Object.keys(lines).filter(key => {
    return lines[key].indexOf(train.Station) !== -1 &&
           lines[key].indexOf(train.Destination) !== -1 &&
           lines[key].indexOf(station) !== -1
  })

  if (passingLines.length === 0) {
    return false
  }

  return(passingLines.reduce((result, passingLine) => {
    const line = lines[passingLine]
    const fromIndex = line.indexOf(train.Station)
    const toIndex = line.indexOf(train.Destination)
    const currentIndex = line.indexOf(station)

    return result && ((fromIndex < currentIndex && currentIndex < toIndex) ||
                      (fromIndex > currentIndex && currentIndex > toIndex))
  }, true))
}
