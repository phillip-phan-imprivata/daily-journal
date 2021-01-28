/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
export const JournalEntryComponent = (entry) => {
  return `
      <section id="entry--${entry.id}" class="journalEntry">
        <div class="entryContainer">
          <div>Date: ${entry.date}</div>
          <div>Topic: <i><b>${entry.concept}</b></i></div>
          <div>Mood: ${entry.mood}</div>
        </div><br>
          <div>${entry.entry}</div>
      </section>
  `
}