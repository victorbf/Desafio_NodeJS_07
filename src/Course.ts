import crypto from "node:crypto";
import { client } from "./Client";

export class Course {
  public static tableName = "courses";

  public id!: string;
  public name!: string;

  static async create(course: Pick<Course, 'name'>): Promise<Course> {
    const createCourse = new Course();
    Object.assign(createCourse, {
      ...course,
      id: crypto.randomUUID(),
    });


    await client.query(
      `INSERT INTO ${Course.tableName} (id, name) VALUES ($1, $2)`,
      [createCourse.id, createCourse.name]
    );

    return createCourse;
  }

  static async findCourses(): Promise<Course[]> {
    const { rows } = await client.query(`SELECT * from ${Course.tableName};`);

    return rows;
  }
}