export interface Course {
    id:                                    number;
    name?:                                 string;
    course_code?:                          string;
    account_id?:                           number;
    created_at?:                           string;
    start_at?:                             null;
    default_view?:                         "modules" | "syllabus" | "wiki" | string;
    enrollment_term_id?:                   number;
    is_public?:                            boolean;
    grading_standard_id?:                  number | null;
    root_account_id?:                      number;
    uuid?:                                 string;
    license?:                              "private" | string;
    grade_passback_setting?:               null;
    end_at?:                               null;
    public_syllabus?:                      boolean;
    public_syllabus_to_auth?:              boolean;
    storage_quota_mb?:                     number;
    is_public_to_auth_users?:              boolean;
    homeroom_course?:                      boolean;
    course_color?:                         null;
    friendly_name?:                        null;
    apply_assignment_group_weights?:       boolean;
    calendar?:                             Calendar;
    time_zone?:                            "America/Los_Angeles" | string;
    blueprint?:                            boolean;
    template?:                             boolean;
    enrollments?:                          Enrollment[];
    hide_final_grades?:                    boolean;
    workflow_state?:                       "available";
    restrict_enrollments_to_course_dates?: boolean;
    access_restricted_by_date?:            boolean;
}

export interface Calendar {
    ics: string;
}

export interface Enrollment {
    type:                               "student";
    role:                               "StudentEnrollment";
    role_id:                            number;
    user_id:                            number;
    enrollment_state:                   "active" | string;
    limit_privileges_to_course_section: boolean;
}
