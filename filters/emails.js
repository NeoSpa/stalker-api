function filterEmails(rawText, terms) {
  const matchEmails = rawText.match(/(3*[a-zA-Z0-9]+[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+)/gi);

  return matchEmails 
  ? matchEmails.reduce((uniq, item) => {
      return uniq.includes(item) ? uniq : [...uniq, item]
  }, []).filter((email) => email.includes(terms))
  : []
}

module.exports = filterEmails;