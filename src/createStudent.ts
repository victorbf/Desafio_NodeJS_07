import { Course } from "./Course";
import { question } from "./Question";
import { Student } from "./Student";

export const createStudent = async () => {
  const studentName = await question("Qual nome do aluno(a)? ");
  const studentCourse = await question("Qual o curso desse aluno(a)? ");
  
  try {
    const newCourse = await Course.create({
      name: studentCourse
    });

    await Student.create({
      name: studentName,
      courseId: newCourse.id,
    });
    
    console.log(`${studentName} está no curso ${studentCourse}.`);

    const createMoreStudents = await question("Gostaria de adicionar mais? (s/n)");

    if (createMoreStudents === 's') {
      await createStudent();
    } else {
      console.log('Finalizando operação...');
    }
  } catch (error: any) {
    console.error(error);
  }
}