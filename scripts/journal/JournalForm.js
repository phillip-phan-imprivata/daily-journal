import { getEntries, saveJournalEntry, useJournalEntries, useUnsortedEntries } from "./JournalDataProvider.js"
import { getMoods, useMoods } from "./MoodProvider.js"
import { getInstructors, useInstructors } from "./InstructorProvider.js"
import { findTag, getTags, saveTag, useTags } from "../tags/TagProvider.js"
import { saveEntryTags } from "../tags/EntryTagProvider.js"

const contentTarget = document.querySelector(".form__container")
const eventHub = document.querySelector("#container")

export const JournalFormComponent = () => {
  getMoods()
  .then(getInstructors)
  .then(() => {
    const moods = useMoods()
    const instructors = useInstructors()

    contentTarget.innerHTML = `
      <form action="">
      <fieldset>
          <div class="form__top">
              <label for="journalDate">Date of Entry:</label>
              <input type="date" name="journalDate" id="journalDate">
              
              <label for="journalConcepts">Concepts Covered:</label>
              <input type="text" name="journalConcepts" id="journalConcepts" placeholder="What did you learn?" autocomplete="off">

              <label for="journalTags">Concept Tags:</label>
              <input type="text" name="journalTags" id="journalTags" placeholder="Tags" autocomplete="off">
              
              <label for="journalInstructor">Concept Instructor:</label>
              <select id="journalInstructor">
                <option value="0">Choose an instructor</option>
                ${instructors.map(instructor => `<option value="${instructor.id}">${instructor.firstName}</option>`).join("")}
              </select>
              
              <label for="journalMood">Mood of the Day:</label>
              <select id="moods">
                <option value="0">Choose a mood</option>
                ${moods.map(mood => `<option value="${mood.id}">${mood.label}</option>`).join("")}
              </select>
          </div>
          <div class="form__bottom">
              <label for="journalEntry">Journal Entry:</label>
              <textarea name="journalEntry" id="journalEntry" rows="7" cols="97" style="resize: none;" placeholder="Make an entry... (400 characters max)"></textarea>
          </div>
          <div class="form__submit">
              <input id="submitButton" type="submit" value="Record Journal Entry">                    
          </div>
      </fieldset>
    </form>
    `
  })
}

eventHub.addEventListener("click", e => {
  if (e.target.id === "submitButton") {
    e.preventDefault()

    const badWords = new RegExp("fuck|shit|bitch")
    if (document.getElementById("journalEntry").value.length > 400) {
      alert("Journal entry exceeds 400 characters :(")
      return
    } else if (badWords.test(document.getElementById("journalConcepts").value.toLowerCase())) {
      alert("Your 'Concepts' section contains a no-no word :(")
      return
    } else if (badWords.test(document.getElementById("journalEntry").value.toLowerCase())) {
      alert("Your 'Entry' section contains a no-no word :(")
      return
    }

    const newEntry = {
      "date": document.getElementById("journalDate").value,
      "concept": document.getElementById("journalConcepts").value,
      "entry": document.getElementById("journalEntry").value,
      "instructorId": parseInt(document.getElementById("journalInstructor").value),
      "moodId": parseInt(document.getElementById("moods").value)
    }

    saveJournalEntry(newEntry)
  }
})

const makeEntryTag = (tag, chosenEntry) => {
  getTags()
  .then(() => {
    findTag(tag)
      .then(tagArr=> {
        if (tagArr.length !== 0){
          const matchingTag = tagArr[0]
  
          const savedTag = {
            "entryId": chosenEntry.id,
            "tagId": matchingTag.id
          }
  
          saveEntryTags(savedTag)
        } else {
          const newTag = {
            "subject": tag
          }
  
          saveTag(newTag)
            .then(makeEntryTag(tag, chosenEntry))
        }
      })
  })
}

eventHub.addEventListener("journalStateChanged", e => {
  const formTags = document.getElementById("journalTags").value.split(",")

  formTags.map(tag => {
    getEntries()
      .then(() => {
        const entriesArr = useUnsortedEntries()
        let latestEntry = entriesArr[entriesArr.length - 1]
        makeEntryTag(tag, latestEntry)
      })
  })
})
