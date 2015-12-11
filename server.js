import request from 'superagent'
import Debug from 'debug'

const debug = Debug('server')

request
  .get('http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=55ec6d6e-dc5c-4268-a725-d04cc262172b')
  .set('Accept', 'application/json')
  .end(function (err, res) {
    debug('res', res.text)
  })
