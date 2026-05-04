import "dotenv/config"
import * as canvas from "./canvas.ts"
import * as notion from "./notion.ts";
import type { CreatePageParameters } from "@notionhq/client";

async function main(): Promise<void> {
    // Fetch all courses from canvas
    const allCourses = await canvas.getCourses();
    console.log("Fetched", allCourses.length, "courses")
    // Get the highest term listed
    const highestTerm = allCourses.map(c=>c.enrollment_term_id).reduce((prev, curr) => Math.max(prev || 1, curr || 1)) || 1;
    console.log("Highest term id:", highestTerm)
    console.log();
    // Filter all courses in the last term (given its higher than 1)
    const courses = highestTerm > 1 ? allCourses.filter(c => c.enrollment_term_id !== undefined && c.enrollment_term_id >= highestTerm && c.course_code !== undefined) : [];
    if (courses.length == 0) throw new Error("Could not find any valid courses!")

    for (const course of courses) {
        console.log();
        const pageId = await notion.getCoursePageIdFromCourseCode(course.course_code!);
        if (!pageId) {
            console.log("[WARN] Notion course page not found for course code", course.course_code);
            continue;
        }
        console.log("Notion course page", pageId.id, "linked with course", course.course_code);

        const assignments = await canvas.getCourseAssignments(course.id);
        console.log("Fetched", assignments.length, "assignments")

        for (const assignment of assignments) {
            console.log("└ Handling assignment", assignment.id, '"'+assignment.name+'"')
            const properties: CreatePageParameters['properties'] = {
                "Name": {
                    type: "title",
                    title: [{
                        type: "text",
                        text: { content: assignment.name, link: { url: assignment.html_url } }
                    }]
                },
                "Course": {
                    type: "relation",
                    relation: [{
                        id: pageId.id
                    }]
                },
                "Due date": {
                    type: "date",
                    date: assignment.due_at != null ? {
                        start: assignment.due_at.replace("T07:59:59Z", "")
                    } : null
                },
                "Canvas ID": {
                    type: "number",
                    number: assignment.id
                }
            };

            const existingNotionAssignment = await notion.getAssignmentPageIdFromCanvasAssignmentId(assignment.id);

            if (existingNotionAssignment) {
                notion.updateAssignmentPage(existingNotionAssignment.id, properties);
                console.log("│  └ Updated existing notion assignment page", existingNotionAssignment.id)
            }
            else {
                notion.createAssignmentPage(properties);
                console.log("│  └ **Created new notion assignment page**")
            }
        }
    }
    console.log()
    console.log("Done!")
}

main().catch(console.error);
