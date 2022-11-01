import crypto from "node:crypto";
import { client } from "./Client";

export class Student {
  public static tableName = "students";

  public id!: string;
  public name!: string;
  public courseId!: string;

  static async create(student: Pick<Student, 'name' | 'courseId'>): Promise<Student> {
    const createStudent = new Student();

    Object.assign(createStudent, {
      ...student,
      id: crypto.randomUUID(),
    });

    await client.query(
      `INSERT INTO ${Student.tableName} (id, name, "courseId") VALUES ($1, $2, $3);`,
      [createStudent.id, createStudent.name, createStudent.courseId]
    );

    return createStudent;
  }

  static async findStudents(): Promise<Student[]> {
    const { rows } = await client.query(`SELECT * FROM ${Student.tableName};`);

    return rows;
  }

  static async findStudent(name: string): Promise<Student> {
    const { rows } = await client.query(`SELECT * FROM ${Student.tableName} WHERE name = '${name}'`);

    return rows[0];
  }
  
  static async updateStudent({ oldName, newName }: { oldName: string, newName: string }): Promise<Student> {
    const { rows } = await client.query(`UPDATE ${Student.tableName} SET name = '${newName}' WHERE name = '${oldName}'`);

    return rows[0];
  }
}
