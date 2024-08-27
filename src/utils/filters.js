import dnt from 'date-and-time'

export default {
  date: function(date, format) {
    // date formatting filter
    let d = new Date(date)
    return dnt.format(d, format)
  }
}
