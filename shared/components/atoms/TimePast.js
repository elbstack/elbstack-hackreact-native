import React, {
  Component,
  InteractionManager
} from 'react-native'

import TimerMixin from 'react-timer-mixin'
import Text from './Text'

export default class TimePast extends Component {
  _format(inputTime, format) {
    const CAL_AM = 'am'
    const CAL_PM = 'pm'
    const CAL_SECONDS = 'sec'
    const CAL_MINUTES = 'min'
    const CAL_HOURS = 'h'
    const DAYS = 'd'
    const WEEKS = 'w'

    const time = new Date()
    const theTime = new Date(inputTime / 1000)

    let timeSpan = time.getTime() / 1000 - theTime.getTime()
    if (timeSpan < 10) {
      return 'now'
    }
    else if (timeSpan < 60) {
      return parseInt(timeSpan) + ' ' + CAL_SECONDS + ' ago'
    }
    else if (timeSpan < 3600) {
      timeSpan = parseInt(timeSpan / 60)
      return timeSpan + ' ' + CAL_MINUTES + ' ago'
    }
    else if (timeSpan < 86400) {
      timeSpan = parseInt(timeSpan / 3660)
      return timeSpan + ' ' + CAL_HOURS + ' ago'
    }
    else if (timeSpan < 604800) {
      timeSpan = parseInt(timeSpan / 86400)
      return timeSpan + ' ' + DAYS + ' ago'
    }
    else if (timeSpan < 2678400) {
      timeSpan = parseInt(timeSpan / 604800)
      return timeSpan + ' ' + WEEKS + ' ago'
    }
    else {
      var ap = CAL_AM
      var date = new Date(theTime * 1000)
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var day = date.getDate()
      var month = date.getMonth()
      var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      var year = date.getFullYear()
      if (hours > 12) {
        hours = hours - 12
        ap = CAL_PM
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (format) {
        return hours + ':' + minutes + ' ' + ap + ' ' + monthName[month] + ' ' + day + ', ' + year
      } else {
        return monthName[month] + ' ' + day + ', ' + year
      }
    }
  }

  _updateMultipleTimes(interval, times) {
    if (times > 0) {
      this.timeouts.push(TimerMixin.setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
          this.forceUpdate()
        })

        this._updateMultipleTimes(interval, --times)
      }, interval))
    } else {
      switch (interval) {
        case 10000:
          this._updateMultipleTimes(60000, 60)
          break
        default:
          return
      }
    }
  }

  componentDidMount() {
    this.timeouts = []

    const now = new Date().getTime()
    const difference = now - this.props.time

    if (difference <= 60000) {
      this._updateMultipleTimes(10000, parseInt((60000 - difference) / 10000) + 1)
    } else if (difference <= 3600000) {
      this._updateMultipleTimes(60000, parseInt((3600000 - difference) / 60000) + 1)
    }
  }

  componentWillUnmount() {
    InteractionManager.runAfterInteractions(() => {
      this.timeouts.forEach((timeout) => {
        TimerMixin.clearTimeout(timeout)
      })
    })
  }

  render() {
    return (
      <Text style={this.props.styles}>
        {this._format(this.props.time, this.props.displayHours)}
      </Text>
    )
  }
}

