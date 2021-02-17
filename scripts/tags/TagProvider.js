let tags = []

export const useTags = () => tags.slice()

export const getTags = () => {
  return fetch("http://localhost:8088/tags")
    .then(res => res.json())
    .then(parsedRes => tags = parsedRes)
}

export const saveTag = (tag) => {
  return fetch("http://localhost:8088/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tag)
  })
    .then(getTags)
}

export const findTag = (subject) => {
  return fetch(`http://localhost:8088/tags?subject=${subject}`)
      .then(response => response.json())
}