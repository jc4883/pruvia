import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import Calendar from 'react-calendar';
import LoginNavBar from '../login_nav_bar/login_nav_bar';
var moment = require('moment');

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            curr_time: null,
            date: null,
            calendar_val: null,
            formatted: null,
            time_zone: null,
            time_zone_form: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getTime = this.getTime.bind(this);
        this.handleMeetingButton = this.handleMeetingButton.bind(this);
        this.handleClickMonth = this.handleClickMonth.bind(this);
        this.timeZoneFormChange = this.timeZoneFormChange.bind(this);
        this.submitNewTimeZone = this.submitNewTimeZone.bind(this);
    }

    componentDidMount() {
        debugger
        this.props.showSlotsOfDoctor(1, "America+Los_Angeles")
            .then(() => {this.setState({time_zone: this.props.time_zone})})
    }

    submitNewTimeZone(e) {
        e.preventDefault();
        this.props.showSlotsOfDoctor(1, this.state.time_zone_form)
            .then(() => {this.setState({time_zone: this.props.time_zone})})
    }

    timeZoneFormChange(e) {
        this.setState({time_zone_form: e.target.value})
    }



    // submitNewTimeZone} onChange={this.timeZoneFormChange

    handleClickMonth({ activeStartDate, view }) {
        debugger
        alert('Changed view to: ', activeStartDate, view)
        this.props.showSlotsOfDoctor(1);
    }

    getTime() {
        let _moment = moment();
        let hour = _moment.hour();
        let minute = _moment.minutes();
        let AM_or_PM = undefined;
        if (hour >= 12) {
            AM_or_PM = "PM";
        } else {
            AM_or_PM = "AM";
        }
        hour = hour % 12;
        return hour + ":" + minute + " " + AM_or_PM;
    }

    onChange(date) {
        debugger
        let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        let date_int = date.getDate();
        let suffix;
        if (date_int > 3 && date_int < 21) {
            suffix = "th";
        } else {
            switch (date_int % 10) {
                case 1:
                    suffix = "st";
                    break;
                case 2:
                    suffix = "nd";
                    break;
                case 3:
                    suffix = "rd";
                    break;
                default:
                    suffix = "th";
            }
        }
        let _formatted = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date_int + suffix;
        this.setState({ date: date.getDate(), formatted: _formatted })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createMeeting(this.state);
    }
    //<div>Date Chosen: {this.state.date.getUTCDay()} </div>

    handleMeetingButton(e) {
        let meetingId = e.target.value;
        this.props.history.push(`/meeting_confirm/${meetingId}`);
    }

    render() {
        // momentObject.toString()
        // momentObject.format()
        // momentObject.toISOString()
        if (!("available_date" in this.props.meetings)) {
            debugger
            return null;
        }
        let meetings = this.props.meetings;
        let meetings_array = Object.values(meetings);
        meetings_array.pop(); //remove key-value pair with key "available-date"
        meetings_array.pop(); //remove key-value pair with key "time_zone"
        debugger
        return (
            <div id="schedule">
                <LoginNavBar/>
                <Calendar 
                    className="schedule-calendar"
                    onClickDay={this.onChange}
                    value={this.state.calendar_val}
                    minDate={new Date()}
                    // minDetail="month"
                    prev2Label={null}
                    next2Label={null}
                    minDetail="month"
                    tileDisabled={({ activeStartDate, date, view }) => {
                        // [{year: ..., month: ..., date: ...}, ...]
                        //&& this.props.meetings.available_date.includes(date.getDate()) ? "available-date" : null
                        let date_moment = moment(date);
                        let year_month_date = date_moment.year() + "-" + date_moment.month() + "-" + date_moment.date();
                        if (view !== 'month') {
                            return false
                        }
                        if (!(year_month_date in this.props.meetings.available_date)) {
                            return true
                        } 
                    }}
                />
                <div className="available-times-tables">
                    <div className="today-date">
                        <div>{this.state.formatted}</div>
                    </div>
                    <ul className="slots-ul">
                        {meetings_array.slice(0).map((meeting, key) => {
                            if (meeting.date != this.state.date) {
                                debugger
                                return
                            }
                            debugger
                            if (!meeting.patient_id) {
                                debugger
                                return <div key={key}>
                                        <button className="slot-unselected" value={meeting.id} onClick={this.handleMeetingButton}>{meeting.time_formatted}</button>
                                    </div> 
                            }
                            debugger
                            return <div key={key}>
                                        <button disabled className="slot-selected" value={meeting.id} onClick={this.handleMeetingButton}>{meeting.time_formatted}</button>
                                    </div> 
                        })}
                    </ul>
                </div>
                <div>
                    Times shown in {this.state.time_zone} clock.
                    <form onSubmit={this.submitNewTimeZone}>
                        Time Zone:
                        <input placeholder="ie) America+Los_Angeles" onChange={this.timeZoneFormChange} value={this.state.time_zone_form} type="text"/>
                        <button>submit</button>
                    </form>
                </div>
            </div>
        )
    }
}


export default Schedule;





    



            // <form id="schedule-form" onSubmit={this.handleSubmit}>
            //     <input type="text" placeholder="begin_time" value={this.state.begin_time}
            //         onChange={this.update("begin_time")} required/>
            //     <br/>
            //     <input type="text" placeholder="end_time" value={this.state.end_time}
            //         onChange={this.update("end_time")} required/>
            //     <br/>
            //     <input type="text" placeholder="user_id" value={this.state.user_id}
            //         onChange={this.update("user_id")} required/>
            //     <br/>
            //     <button>Create Meeting</button>
            // </form>