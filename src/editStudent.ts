import { question } from "./Question";
import { Student } from "./Student";

export const editStudent = async () => {
  const studentName = await question("Qual nome do aluno(a) que deseja editar? ");
  
  try {
    const selectedStudent = await Student.findStudent(studentName);
    
    const isThisStudent = await question(`Deseja editar ${selectedStudent.name}? (s/n)  `);

    if (isThisStudent === 's') {
      const newName = await question("Qual o novo nome? ");

      await Student.updateStudent({
        oldName: selectedStudent.name,
        newName,
      });

      console.log('Nome atualizado com sucesso!');
    } else {
      await editStudent();
      return;
    }

    const createMoreStudents = await question("Gostaria de editar outro(a)? (s/n)");

    if (createMoreStudents === 's') {
      await editStudent();
    } else {
      console.log('Finalizando operação...');
    }
  } catch (error: any) {
    console.log('Aluno não existe');
    await editStudent();
  }
}