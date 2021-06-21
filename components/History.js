import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
//import UdaciFitnessCalendar from 'udacifitness-calendar-fix'
import { Agenda } from 'react-native-calendars'

class History extends Component {
	componentDidMount() {
		const { dispatch } = this.props
		
		fetchCalendarResults()
			.then((entries) => dispatch(receiveEntries(entries)))
			.then(({ entries }) => {
				// if that day's entry is not logged, then assign reminder text
				// to that day's value
				if (!entries[timeToString()]) {
					dispatch(addEntry({
						[timeToString()]: getDailyReminderValue()
					}))
				}
			})
	}
	
	// the first item/arg is going to be day coming from the redux store.
	renderItem = ({ today, ...metrics }, formattedDate, key) => (
		<View>
			{today
				? <Text>{JSON.stringify(today)}</Text>
				: <Text>{JSON.stringify(metrics)}</Text>}
		</View>
	)
	
	renderEmptyDate(formattedDate) {
		return (
			<View>
				<Text>No Data for this day</Text>
			</View>
		)
	}
	
	render() {
		const { entries } = this.props
		return (
			<Agenda
				items={entries}
				renderItem={this.renderItem}
				renderEmptyDate={this.renderEmptyDate}
			/>
		)
	}
}

function mapStateToProps (entries) {
	return {
		entries
	}
}

export default connect(mapStateToProps)(History)