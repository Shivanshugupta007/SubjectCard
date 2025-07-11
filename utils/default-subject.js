function defaultSubject(question) {
  const subjectsMap = {
    Physics: ['newton', 'force', 'gravity', 'acceleration'],
    Chemistry: ['molecule', 'reaction', 'acid', 'atom'],
    Biology: ['photosynthesis', 'cell', 'mitochondria'],
    Math: ['algebra', 'equation', 'integral', 'derivative'],
    History: ['war', 'revolution', 'empire'],
    Geography: ['river', 'continent', 'climate'],
    ComputerScience: ['algorithm', 'code', 'data']
  };

  const lowerQuestion = text.toLowerCase();

  for (const [subject, keywords] of Object.entries(subjectsMap)) {
    if (keywords.some(keyword => lowerQuestion.includes(keyword))) {
      return subject;
    }
  }

  return 'General';
}

module.exports = defaultSubject;
