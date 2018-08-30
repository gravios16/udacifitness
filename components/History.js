import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminder } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import UdacifitnessCalendar from 'udacifitness-calendar'

class History extends Component {

  componentDidMount() {
    const { dispatch } = this.props

    fetchCalendarResults()
      .then((etries) => dispatch(receiveEntries(etries)))
      .then(({entries}) => {
        if (!entries[timeToString()]) {
          dispatch(addEntry({
            [timeToString()]: getDailyReminder()
          }))
        }
      })
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => {
    <View>
      {today
        ? <Text>{JSON.stringify(today)}</Text>
        : <Text>{JSON.stringify(metrics)}</Text>
      }
    </View>
  }

  renderEmptyDate (formattedDate) {
    return (
      <View>
        <Text>No data for this Day</Text>
      </View>
    )
  }

  render() {
    const { entries } = this.props

    return (
      <UdacifitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    )
  }
}

function mapStateToProps(entries) {
  return {
    entries
  }
}

export default connect(mapStateToProps)(History)