import { CanvasApi } from "@kth/canvas-api";
import type { Course } from "./types/course.ts";
import fs from "fs"
import type { Assignment } from "./types/assignment.ts";

if (!process.env.CANVAS_API_URL) throw new Error("Please define CANVAS_API_URL");
if (!process.env.CANVAS_API_TOKEN) throw new Error("Please define CANVAS_API_TOKEN");

export const client = new CanvasApi(
    process.env.CANVAS_API_URL+"/api/v1",
    process.env.CANVAS_API_TOKEN
);

export async function getCourses() {
    const req = client.listItems("courses");
    return await req.toArray() as Course[];
}

export async function getCourseAssignments(courseId: number) {
    const req = client.listItems(`courses/${courseId}/assignments`);
    return await req.toArray() as Assignment[];
}