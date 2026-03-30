import { Client, type CreatePageParameters, type PartialPageObjectResponse } from "@notionhq/client";

if (!process.env.NOTION_API_TOKEN) throw new Error("Please define NOTION_API_TOKEN");
if (!process.env.NOTION_TASK_DATA_SOURCE_ID) throw new Error("Please define NOTION_TASK_DATA_SOURCE_ID");
if (!process.env.NOTION_COURSE_DATA_SOURCE_ID) throw new Error("Please define NOTION_COURSE_DATA_SOURCE_ID");
const NOTION_API_TOKEN = process.env.NOTION_API_TOKEN;
const NOTION_TASK_DATA_SOURCE_ID = process.env.NOTION_TASK_DATA_SOURCE_ID;
const NOTION_COURSE_DATA_SOURCE_ID = process.env.NOTION_COURSE_DATA_SOURCE_ID;

export const client = new Client({
  auth: NOTION_API_TOKEN,
});

export async function getCoursePageIdFromCourseCode(courseCode: string): Promise<PartialPageObjectResponse | undefined> {
    const res = await client.dataSources.query({
        data_source_id: NOTION_COURSE_DATA_SOURCE_ID,
        filter_properties: ["Course code"],
        filter: {
            property: "Course code",
            rich_text: {
                contains: courseCode
            }
        },
        page_size: 1,
        in_trash: false
    });
    
    const pages = res.results.filter(r=>r.object === 'page');
    return pages[0];
}

export async function getAssignmentPageIdFromCanvasAssignmentId(assignmentId: number): Promise<PartialPageObjectResponse | undefined> {
    const res = await client.dataSources.query({
        data_source_id: NOTION_TASK_DATA_SOURCE_ID,
        filter_properties: ["Canvas ID"],
        filter: {
            property: "Canvas ID",
            number: {
                equals: assignmentId
            }
        },
        page_size: 1,
        in_trash: false
    });
    
    const pages = res.results.filter(r=>r.object === 'page');
    return pages[0];
}

export async function createAssignmentPage(properties: CreatePageParameters['properties']) {
    client.pages.create({
        parent: {
            data_source_id: NOTION_TASK_DATA_SOURCE_ID
        },
        properties
    })
}

export async function updateAssignmentPage(pageId: string, properties: CreatePageParameters['properties']) {
    client.pages.update({
        page_id: pageId,
        properties
    })
}
