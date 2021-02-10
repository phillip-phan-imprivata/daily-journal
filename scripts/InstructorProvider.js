let instructorCollection = []

export const useInstructors = () => instructorCollection.slice()

export const getInstructors = () => {
  return fetch("http://localhost:8088/instructors")
    .then(res => res.json())
    .then(parsedRes => {
      instructorCollection = parsedRes
    })
}