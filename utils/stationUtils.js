import expect from 'expect'
const lines = [ '奇岩站', '大安森林公園站', '大安站', '捷運台北101/世貿站', '象山站' ]

// train
// {
//   '_id': '1',
//   'Station': '三民高中站',
//   'Destination': '南勢角站',
//   'UpdateTime': '2015-12-11T15:18:42.983'
// }
export function isTrainPassingStation(train, station) {
  const fromIndex = lines.indexOf(train.Station)
  const toIndex = lines.indexOf(train.Destination)
  const stationIndex = lines.indexOf(station)

  if (fromIndex === -1 || toIndex === -1 || stationIndex === -1) {
    return false
  }

  return fromIndex < stationIndex && stationIndex < toIndex
}


expect(isTrainPassingStation({
  '_id': '2',
  'Station': '大安森林公園站',
  'Destination': '象山站',
  'UpdateTime': '2015-12-11T15:18:39.447'
}, '捷運台北101/世貿站')).toBe(true)

expect(isTrainPassingStation({
  '_id': '6',
  'Station': '奇岩站',
  'Destination': '大安站',
  'UpdateTime': '2015-12-11T15:18:49.78'
}, '捷運台北101/世貿站')).toBe(false)
