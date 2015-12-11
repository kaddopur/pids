import expect from 'expect'
import { isTrainPassingStation } from '../../utils/stationUtils'


describe('#stationUtils', () => {
  describe('#isTrainPassingStation', () => {
    it('should be true for middle station', done => {
      expect(isTrainPassingStation({
        '_id': '2',
        'Station': '大安森林公園站',
        'Destination': '象山站',
        'UpdateTime': '2015-12-11T15:18:39.447'
      }, '台北101/世貿站')).toBe(true, '大安森林公園站->象山站, 台北101/世貿站')
      done()
    })

    it('should be false if train is already passed', done => {
      expect(isTrainPassingStation({
        '_id': '2',
        'Station': '大安森林公園站',
        'Destination': '象山站',
        'UpdateTime': '2015-12-11T15:18:39.447'
      }, '台北車站')).toBe(false, '大安森林公園站->象山站, 台北車站')
      done()
    })

    it('should be false if the train will stop at former station', done => {
      expect(isTrainPassingStation({
        '_id': '6',
        'Station': '奇岩站',
        'Destination': '大安站',
        'UpdateTime': '2015-12-11T15:18:49.78'
      }, '台北101/世貿站')).toBe(false, '奇岩站->大安站, 台北101/世貿站')
      done()
    })

    it('should be true for return trains', done => {
      expect(isTrainPassingStation({
        '_id': '2',
        'Station': '大安森林公園站',
        'Destination': '北投站',
        'UpdateTime': '2015-12-11T15:18:39.447'
      }, '台北車站')).toBe(true, '大安森林公園站->北投站, 台北車站')
      done()
    })

    it('should be false for different line', done => {
      expect(isTrainPassingStation({
        '_id': '17',
        'Station': '萬芳社區站',
        'Destination': '動物園站',
        'UpdateTime': '2015-12-11T15:18:45'
      }, '台北101/世貿站')).toBe(false, '萬芳社區站->動物園站, 台北101/世貿站')
      done()
    })
  })
})
