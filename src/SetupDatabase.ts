import { client } from "./Client";
import { Course } from "./Course";
import { Student } from "./Student";

export const setupDatabase = async () => {
  await client.connect();

  await client.query(`CREATE TABLE IF NOT EXISTS ${Course.tableName} (
    id varchar(36) PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL
  );`);

  await client.query(`CREATE TABLE IF NOT EXISTS ${Student.tableName} (
    id varchar(36) PRIMARY KEY,
    "courseId" varchar(36) NOT NULL,
    name varchar(255) UNIQUE NOT NULL,
    CONSTRAINT fk_student_course FOREIGN KEY("courseId") REFERENCES courses(id) ON DELETE CASCADE
  );`);
}