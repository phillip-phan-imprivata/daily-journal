/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data provider component
 */
import { deleteJournalEntry, getEntries, useJournalEntries } from "./JournalDataProvider.js"
import { JournalEntryComponent } from "./JournalEntry.js"
import { getMoods, useMoods } from "./MoodProvider.js"
import { getInstructors, useInstructors } from "./InstructorProvider.js"

// DOM reference to where all entries will be rendered
const contentTarget = document.querySelector("#entryLog")
const eventHub = document.querySelector("#container")

const render = (entries) => {
    const moods = useMoods()
    const instructors = useInstructors()

    const entriesList = entries.map(entry => {
        const matchingMood = moods.find(mood => mood.id === entry.moodId)
        const matchingInstructor = instructors.find(instructor => instructor.id === entry.instructorId)
        return JournalEntryComponent(entry, matchingMood, matchingInstructor)
    }).join("")

    contentTarget.innerHTML = entriesList
}

export const EntryListComponent = () => {

    getEntries()
        .then(getMoods)
        .then(getInstructors)
        .then(() => {
            // Use the journal entry data from the data provider component
            const entries = useJournalEntries()
            
            render(entries)
        })
}

eventHub.addEventListener("journalStateChanged", e => {
    EntryListComponent()
})

eventHub.addEventListener("click", e => {
    if(e.target.id.startsWith("deleteNote--")){
        const [prefix, id] = e.target.id.split("--")

        deleteJournalEntry(id)
            .then(EntryListComponent)
    }
})

eventHub.addEventListener("moodChosen", e => {
    const entries = e.detail.filteredEntries

    render(entries)
})
