import expect from 'expect'
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

    // console.log(line)
    // console.log(fromIndex, currentIndex, toIndex)

    return result && ((fromIndex < currentIndex && currentIndex < toIndex) ||
                      (fromIndex > currentIndex && currentIndex > toIndex))
  }, true))
}


expect(isTrainPassingStation({
  '_id': '2',
  'Station': '大安森林公園站',
  'Destination': '象山站',
  'UpdateTime': '2015-12-11T15:18:39.447'
}, '台北101/世貿站')).toBe(true, '大安森林公園站->象山站, 台北101/世貿站')

expect(isTrainPassingStation({
  '_id': '2',
  'Station': '大安森林公園站',
  'Destination': '象山站',
  'UpdateTime': '2015-12-11T15:18:39.447'
}, '台北車站')).toBe(false, '大安森林公園站->象山站, 台北車站')

expect(isTrainPassingStation({
  '_id': '6',
  'Station': '奇岩站',
  'Destination': '大安站',
  'UpdateTime': '2015-12-11T15:18:49.78'
}, '台北101/世貿站')).toBe(false, '奇岩站->大安站, 台北101/世貿站')

expect(isTrainPassingStation({
  '_id': '2',
  'Station': '大安森林公園站',
  'Destination': '北投站',
  'UpdateTime': '2015-12-11T15:18:39.447'
}, '台北車站')).toBe(true, '大安森林公園站->北投站, 台北車站')

expect(isTrainPassingStation({
  '_id': '17',
  'Station': '萬芳社區站',
  'Destination': '動物園站',
  'UpdateTime': '2015-12-11T15:18:45'
}, '台北101/世貿站')).toBe(false, '萬芳社區站->動物園站, 台北101/世貿站')
