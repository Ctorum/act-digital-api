export const mandatoryQuestions = [
  "Público-alvo",
  "Quantidade de estrelas",
  "E-mail para contato",
];

export const getSurveyById = (id: number) => {
  return `SELECT * FROM surveys s WHERE s.id = ${id}`;
};
