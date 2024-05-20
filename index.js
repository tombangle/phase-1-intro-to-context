function createEmployeeRecord ([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createTimeInEvent(employeeRecord, dateTimeStr) {
    let [date, hour] = dateTimeStr.split(' ');
    let timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeStr) {
    let [date, hour] = dateTimeStr.split(' ');
    let timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let inEvent = employeeRecord.timeInEvents.find(e => e.date === date);
    let outEvent = employeeRecord.timeOutEvents.find(e => e.date === date);
    return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    let payable = employeeRecord.timeInEvents.map((e, index) => {
        let outEvent = employeeRecord.timeOutEvents.find(out => out.date === e.date);
        let hoursWorked = (outEvent.hour - e.hour) / 100;
        return hoursWorked * employeeRecord.payPerHour;
    });
    return payable.reduce((memo, d) => memo + d);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((memo, rec) => memo + allWagesFor(rec), 0);
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(employeeArray => createEmployeeRecord(employeeArray));
}

let employeeRecords = createEmployeeRecords(employeeData);
console.log(employeeRecords);