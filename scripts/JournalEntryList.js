/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data provider component
 */
import { getEntries, useJournalEntries } from "./JournalDataProvider.js"
import { JournalEntryComponent } from "./JournalEntry.js"
import { getMoods, useMoods } from "./MoodProvider.js"

// DOM reference to where all entries will be rendered
const entryLog = document.querySelector("#entryLog")
const eventHub = document.querySelector("#container")

export const EntryListComponent = () => {

    getEntries()
        .then(getMoods)
        .then(() => {
            // Use the journal entry data from the data provider component
            const moods = useMoods()
            const entries = useJournalEntries()
        
            const entriesWithMoods = entries.map(entry => {
                const matchingMood = moods.find(mood => mood.id === parseInt(entry.moodId))

                entry.mood = matchingMood.label
                return JournalEntryComponent(entry)
            }).join("")

            entryLog.innerHTML = `
            ${entriesWithMoods}
            `
        })
}

eventHub.addEventListener("journalStateChanged", e => {
    EntryListComponent()
})
