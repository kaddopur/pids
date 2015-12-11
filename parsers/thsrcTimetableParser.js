import jsdom from 'jsdom'
import jquery from 'jquery'
import moment from 'moment'

function parseTable(jquery, tableNode) {
  const $ = jquery
  let table = []

  tableNode.find('tr:not(:first-child)').each(function () {
    let trainInfo = {
      '車次': $(this).find('td:first-child').text().trim()
    }

    $(this).find('td:not(:first-child)').each(function () {
      const stationName = $(this).attr('title').trim()
      const departureTime = $(this).text().trim()
      if (departureTime !== '') {
        trainInfo[stationName] = departureTime
      }
    })

    table.push(trainInfo)
  })

  return table
}

function parseTime(timeString) {
  return moment.utc(timeString, 'HH:mm', true).unix()
}

export function updateTimetable() {
  const today = moment().format('YYYYMMDD')
  const timetableUrl = 'http://www.thsrc.com.tw/tw/TimeTable/DailyTimeTable/'

  return new Promise((resolve, reject) => {
    jsdom.env({
      url: timetableUrl + today,
      done: function (err, window) {
        if (err) {
          reject(err)
          return
        }

        const $ = jquery(window)
        let toSouth = {}
        let toNorth = {}

        $('table table table').each(function (i) {
          if (i === 0) {
            toSouth = parseTable($, $(this))
          } else if (i === 1) {
            toNorth = parseTable($, $(this))
          }
        })

        resolve({ toSouth, toNorth })
      }
    })
  })
}

export function timetableWithStationAndTime(timetable, station, time, limit) {
  return Object.keys(timetable).reduce((result, key) => {
    result[key] = timetable[key].filter(v => v[station] && parseTime(v[station]) > parseTime(time))
                                .sort((a, b) => parseTime(a[station]) - parseTime(b[station]))
                                .slice(0, limit)
    return result
  }, {})
}

// updateTimetable()
// .then(timetable => {
//   return timetableWithStationAndTime(timetable, '台中站', '06:00', 3)
// })
// .then(console.log)
