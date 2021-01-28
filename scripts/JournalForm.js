import { saveJournalEntry } from "./JournalDataProvider.js"

const contentTarget = document.querySelector(".form__container")
const eventHub = document.querySelector("#container")

export const JournalFormComponent = () => {
  contentTarget.innerHTML = `
    <form action="">
    <fieldset>
        <div class="form__top">
            <label for="journalDate">Date of Entry:</label>
            <input type="date" name="journalDate" id="journalDate">
            
            <label for="journalConcepts">Concepts Covered:</label>
            <input type="text" name="journalConcepts" id="journalConcepts" placeholder="What did you learn?" autocomplete="off">
            
            <label for="journalMood">Mood of the Day:</label>
            <select id="moods">
                <option value="" disabled selected>Select Your Mood</option>
                <option value="good">Good</option>
                <option value="bad">Bad</option>         
                <option value="sad">Sad</option>
                <option value="ok">Ok</option>
                <option value="notOk">Not Okay</option>
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
      "date": `${document.getElementById("journalDate").value}`,
      "concept": `${document.getElementById("journalConcepts").value}`,
      "entry": `${document.getElementById("journalEntry").value}`,
      "mood": `${document.getElementById("moods").value}`
    }

    saveJournalEntry(newEntry)
  }
})