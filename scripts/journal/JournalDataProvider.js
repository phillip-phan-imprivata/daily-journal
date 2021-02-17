/*
 *   Journal data provider for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

// This is the original data.
let journal = []

/*
  You export a function that provides a version of the
  raw data in the format that you want
*/
const eventHub = document.querySelector("#container")

export const useJournalEntries = () => {
  const sortedByDate = journal.sort(
      (currentEntry, nextEntry) =>
          Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
  ).reverse()
  return sortedByDate
}

export const useUnsortedEntries = () => journal.slice()

const dispatchStateChangeEvent = () => {
  eventHub.dispatchEvent(new CustomEvent("journalStateChanged"))
}

export const getEntries = () => {
  return fetch("http://localhost:8088/entries") // Fetch from the API
    .then(response => response.json())  // Parse as JSON
    .then(entries => {
      journal = entries
    })
}

export const saveJournalEntry = (newJournalEntry) => {
  // Use `fetch` with the POST method to add your entry to your API
  fetch("http://localhost:8088/entries", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newJournalEntry)
  })
    .then(getEntries())  // <-- Get all journal entries
    .then(dispatchStateChangeEvent())  // <-- Broadcast the state change event
}

export const deleteJournalEntry = entryId => {
  return fetch(`http://localhost:8088/entries/${entryId}`, {
    method: "DELETE"
  })
}