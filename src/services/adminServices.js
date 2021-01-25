const Student = require("../models/student");
const Session = require("../models/session");
const DateModel = require("../models/date");
const validate = require("validate.js");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { async } = require("validate.js");


class adminService{

    // Create New Session from existing date
    async createNewSession( date, name, startTime, endTime ) {
        return new Promise(async (resolve, reject) => {
            let d = new Date(date)
            let DateObject = await DateModel.findOne( { date : `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}` } )
            if (DateObject === null){
                let res = await this.createNewDate(date)
                if (res.error){
                    return resolve(res)
                }
                DateObject = res.data
            }
            
            try {
                // Create New Session
                let newSession = new Session({
                    name : name,
                    startTime : new Date(startTime).toTimeString(),
                    endTime : new Date(endTime).toTimeString(),
                    date : DateObject._id
                })
                await newSession.save()

                // Add Session to Date Object
                await DateObject.sessions.push(newSession._id)
                await DateObject.save()

            } catch (error) {
                console.log(error)
                return resolve({ error : true, message : "Failed to create new Session Object."})
            }
            return resolve({ error : false, message : `Successfully create session on : ${date} | with name: ${name}`})
        });
    }

    // Create New Date to Store Session
    async createNewDate(date) {
        return new Promise(async (resolve, reject) => {
            try {
                const d = new Date(date)
                const newDateObject = new DateModel({
                    date : `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
                })
                await newDateObject.save()
                return resolve({ error : false, message : "Successfully create Date Object", data : newDateObject})
            } catch (error) {
                return resolve({ error : true, message : "Failed to create new Date Object. Same Date Object may already exist."})
            }
        });
    }

    // Register New Absentee to Session
    async registerSessionAbsentees(session_id, students) {
        return new Promise(async (resolve, reject) => {
            const session = await Session.findById(session_id)
            if (session === null){
                return resolve({ error : true, message : "Session does not exist"})
            }
            let student_ID = new Array()
            try {
                // Clear Absentees
                session.absentees = []
                // Loop through student to check for their id
                students.forEach(async student => {
                    const stud = await Student.findOne({ name : student.name })
                    await session.updateOne({ $addToSet : { absentees : stud._id } })
                })

                return resolve({ error : false, message : `Successfully register new absentees list to : ${session.name} | From : ${session.startTime} | To : ${session.endTime}`})
            } catch (error) {
                return resolve({ error : true, message : "Failed to register new absentees."})
            }
        })
    }

    // Register New Students
    async registerNewStudents(students){
        return new Promise(async (resolve, reject) => {
            students.forEach( async student => {
                try {
                    const newStudent = new Student({
                        name : student.name,
                        email : student.email,
                        profile_src : student.profile_src
                    })
                    await newStudent.save()
                } catch (error) {
                    return resolve({ error : true, message : `Failed to register ${student.name}`})
                }
            })
            return resolve({ error : false, message : "Successfully register all students" })
        })
    }

    // View date from n number of previous days
    async getAllDates({n}){
        return new Promise(async (resolve, reject) => {
            if (n === null){
                n = 5
            }
            await DateModel.find({}).sort({ date : -1 }).limit(parseInt(n)).populate({
                path : "sessions", 
                select : {_id:1,name:1,startTime:1,endTime:1,absentees:1}, 
                populate : { path : "absentees", select : {_id:1, name:1, email:1, profile_src:1} } 
            })
            .then(dates => resolve({ error : false, message : `Successfully retrieve dates.`, data : dates}))
            .catch(err => { resolve({ error : true, message : `Failed to retrieve dates.` })});
        })
    }

    // View date specified in the parameter
    async getDate({date,session_name}){
        return new Promise(async (resolve, reject) => {
            const d = new Date(date)
            // Check if the request needed a specific session
            if (session_name != null){
                await DateModel.findOne({ 
                    date : `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}` 
                })
                .sort({ date : -1 })
                .populate({
                    path : "sessions", 
                    select : {_id:1,name:1,startTime:1,endTime:1,absentees:1}, 
                    match : { name : {'$regex' : `.*${session_name}.*`, '$options' : 'i'} }, 
                    populate : { path : "absentees", select : {_id:1, name:1, email:1, profile_src:1} } 
                })
                .then(dates => resolve({ error : false, message : `Successfully retrieve dates.`, data : dates}))
                .catch(err => resolve({ error : true, message : `Failed to retrive dates.` }));
            }else{ 
            // If no specific name of the session were given
                await DateModel.findOne
                ({ 
                    date : `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}` 
                })
                .sort({ date : -1 })
                .populate({
                    path : "sessions", 
                    select : {_id:1,name:1,startTime:1,endTime:1,absentees:1}, 
                    populate : { path : "absentees", select : {_id:1, name:1, email:1, profile_src:1} } 
                })
                .then(dates => resolve({ error : false, message : `Successfully retrieve dates.`, data : dates}))
                .catch(err => resolve({ error : true, message : `Failed to retrive dates.` }));
            }
        })
    }

}

module.exports = new adminService();