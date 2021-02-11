/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
export const JournalEntryComponent = (entry, mood, instructor) => {
  return `
      <section id="entry--${entry.id}" class="journalEntry">
        <div class="entryContainer">
          <div>Date: ${entry.date}</div>
          <div>Topic: <i><b>${entry.concept}</b></i></div>
          <div>Instructor: ${instructor.firstName}</div>
          <div>Mood: ${mood.label}</div>
        </div><br>
          <div>${entry.entry}</div><br>
        <button id="deleteNote--${entry.id}">Delete</button>
      </section>
  `
}