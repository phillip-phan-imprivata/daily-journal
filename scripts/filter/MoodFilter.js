export const MoodFilter = (allMoods) => {
  return `
      <fieldset class="fieldset">
          <p>Filter Journal Entries by Mood:</p>
          <input type="radio" name="moodFilter" value="0" checked="true">
          <label for="moodFilter--noMood">All Entries</label>
          ${
              allMoods.map(
                  (mood) => {
                      return `<input type="radio" name="moodFilter" value="${ mood.id }"/>
                      <label for="moodFilter--${mood.label}">${ mood.label }</label>
                      `
                  }
              ).join("")
          }
      </fieldset>
      `
}