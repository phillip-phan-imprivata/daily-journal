/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
export const JournalEntryComponent = (entry) => {
  return `
      <section id="entry--${entry.id}" class="journalEntry">
        <div class="entryContainer">
          <div>${entry.date}</div>
          <div><b>${entry.concept}</b></div>
          <div>${entry.mood}</div>
        </div><br>
          <div>${entry.entry}</div>
      </section>
  `
}