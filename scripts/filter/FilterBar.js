import { MoodFilter } from "./MoodFilter.js"
import { getMoods, useMoods } from "../journal/MoodProvider.js"
import { getEntries, useJournalEntries } from "../journal/JournalDataProvider.js"

/*
 You need to make a new HTML element with a class of
 `filters` in index.html
*/
const contentTarget = document.querySelector(".filters")
const eventHub = document.querySelector("#container")

export const FilterBar = () => {
  getMoods()
    .then(() => {
      const moods = useMoods()

      const render = () => {
          contentTarget.innerHTML = `
              ${MoodFilter(moods)}
          `
      }
  
      render()
    })
}

eventHub.addEventListener("change", e => {
  if(e.target.name === "moodFilter"){
    if(e.target.value === "0"){
      const customEvent = new CustomEvent("journalStateChanged")
      eventHub.dispatchEvent(customEvent)
    } else{
      getEntries()
        .then(getMoods)
        .then(() => {
          const entries = useJournalEntries()
  
          const filteredEntries = entries.filter(entry => entry.moodId === parseInt(e.target.value))
  
          const customEvent = new CustomEvent("moodChosen", {
            detail: {
              "filteredEntries": filteredEntries
            }
          })
  
          eventHub.dispatchEvent(customEvent)
        })
    }
  }
})
