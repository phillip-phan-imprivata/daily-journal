let entryTags = []

export const useEntryTags = () => entryTags.slice()

export const getEntryTags = () => {
  return fetch("http://localhost:8088/entrytags")
    .then(res => res.json())
    .then(parsedRes => {
      entryTags = parsedRes
    })
}

export const saveEntryTags = (entryTag) => {
  return fetch("http://localhost:8088/entrytags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(entryTag)
  })
    .then(getEntryTags)
}