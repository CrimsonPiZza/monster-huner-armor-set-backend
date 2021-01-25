const sectionA = require("../asset/SectionA_StudentList.json")

let studentJson = ""
for (let student in sectionA) {
    studentJson += `{ "name":"${student}", "email": "${nameToEmail(student,"2018")}", "profile_src":""},\n`
}

console.log(studentJson)

function nameToEmail(name, year) {
    let lastName = name.split(" ")[0].toLowerCase()
    let surName = name.split(" ")[1].toLowerCase()
    year = year.slice(-2)
    return `${surName}${lastName}${year}@kit.edu.kh`
}
