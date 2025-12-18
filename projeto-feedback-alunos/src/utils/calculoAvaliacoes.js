export const calcularMedia = (avaliacoes) => {
  if (!avaliacoes.length) return 0;
  const soma = avaliacoes.reduce((acc, av) => acc + av.nota, 0);
  return (soma / avaliacoes.length).toFixed(1);
};

export const calcularMediaPorDisciplina = (avaliacoes) => {
  const disciplinas = {};
  avaliacoes.forEach(av => {
    if (!disciplinas[av.disciplina]) disciplinas[av.disciplina] = { soma: 0, count: 0 };
    disciplinas[av.disciplina].soma += av.nota;
    disciplinas[av.disciplina].count += 1;
  });
  return Object.entries(disciplinas).map(([disciplina, data]) => ({
    disciplina,
    media: (data.soma / data.count).toFixed(1),
    avaliacoes: data.count
  }));
};