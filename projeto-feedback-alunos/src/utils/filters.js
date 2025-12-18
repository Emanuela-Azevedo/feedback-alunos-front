export const filterUsersByMatricula = (usuarios, searchMatricula) => {
  return usuarios.filter(user => 
    searchMatricula === '' || user.matricula.includes(searchMatricula)
  );
};