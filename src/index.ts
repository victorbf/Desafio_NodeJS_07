/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { setupDatabase } from "./SetupDatabase";
import { createStudent } from "./createStudent";
import { Course } from "./Course";
import { Student } from "./Student";
import { question } from "./Question";
import { editStudent } from "./editStudent";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);

  // CÓDIGO PARA ATENDER OS REQUERIMENTOS
  // R01, R02, R03, R04, R05
  await setupDatabase();

  const option = await question(`
    Escolha opção:
    (c) Criar aluno
    (l) Ver lista de alunos
    (e) Editar aluno
  `);

  if (option === "c") {
    await createStudent();
    return;
  } else if (option === "l") {
    const [courses, students] = await Promise.all([
      Course.findCourses(),
      Student.findStudents(),
    ]);

    const coursesMap = courses.reduce<Record<Course["id"], Course>>(
      (map, course) => {
        map[course.id] = course;
        return map;
      },
      {}
    );

    const courseStudent = students.map((student) => {
      return {
        ...student,
        course: coursesMap[student.courseId],
      };
    });

    courseStudent.forEach((student) =>
      console.log(`${student.name} | ${student.course.name}`)
    );

    return;
  } else if (option === "e") {
    await editStudent();
  } else {
    console.log('Comando não existe');
  }
});
