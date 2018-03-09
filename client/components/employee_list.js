import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmpoloyeeDetail from './employee_detail';

const per_page = 20;

//Functional Component
// const EmployeeList = (props) => {
//     console.log(props.employees);
//     return (
//         <div>
//             <div className="employee-list">
//                 { props.employees.map(employee => <EmpoloyeeDetail key={employee._id} employee = {employee} />) }
//             </div>

//             <button onClick={() => Meteor.subscribe('employees', per_page + 20)} 
//                     className="btn btn-primary">
//                     Load More...
//             </button>
//         </div> 
//     );
// }

//Class based component

class EmployeeList extends Component {
    // constructor(props) {
    //     super(props);
    // }

    //lifeCycle method of react
    componentWillMount() {
        this.page = 1;
    }

    handleButtonClick() {
        Meteor.subscribe('employees', per_page * (this.page + 1));
        this.page += 1;
    }

    render() {
        return (
            <div>
                <div className="employee-list">
                    { this.props.employees.map(employee => <EmpoloyeeDetail key={employee._id} employee = {employee} />) }
                </div>

                <button onClick={ this.handleButtonClick.bind(this) } 
                        className="btn btn-primary">
                        Load More...
                </button>
            </div>
        )
    }
}

export default withTracker(props => {
    //set up subscription
    Meteor.subscribe('employees', per_page);

    return {
        employees: Employees.find({}).fetch()
    }
    //return an object . Whatever we return will be sent to EmployeeList as props
})(EmployeeList);