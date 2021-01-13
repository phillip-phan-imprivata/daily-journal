/*
 *   Journal data provider for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

// This is the original data.
const journal = [
  {
    id: 1,
    date: "01/04/2021",
    concept: "HTML & CSS",
    entry: "We talked about HTML components and how to make grid layouts with Flexbox in CSS.",
    mood: "Okay"
  },
  {
    id: 2,
    date: "01/12/2021",
    concept: "JavaScript",
    entry: "started implementing JavaScript to automate website data.",
    mood: "Okay"
  },
  {
    id: 3,
    date: "01/13/2021",
    concept: "JavaScript pt 2",
    entry: "More js eskettit",
    mood: "Not Okay"
  }
]

/*
  You export a function that provides a version of the
  raw data in the format that you want
*/
export const useJournalEntries = () => {
  const sortedByDate = journal.sort(
      (currentEntry, nextEntry) =>
          Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
  ).reverse()
  return sortedByDate
}