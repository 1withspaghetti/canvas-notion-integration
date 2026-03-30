export interface Assignment {
    id:                                   number;
    position:                             number;
    description:                          string;
    points_possible:                      number;
    grading_type:                         "points";
    created_at:                           string;
    updated_at:                           string;
    due_at:                               string | null;
    final_grader_id:                      null;
    grader_count:                         number;
    graders_anonymous_to_graders:         boolean;
    grader_comments_visible_to_graders:   boolean;
    grader_names_visible_to_final_grader: boolean;
    lock_at:                              string | null;
    unlock_at:                            string | null;
    assignment_group_id:                  number;
    peer_reviews:                         boolean;
    anonymous_peer_reviews:               boolean;
    automatic_peer_reviews:               boolean;
    intra_group_peer_reviews:             boolean;
    post_to_sis:                          boolean;
    grade_group_students_individually:    boolean;
    group_category_id:                    null;
    grading_standard_id:                  null;
    moderated_grading:                    boolean;
    hide_in_gradebook:                    boolean;
    omit_from_final_grade:                boolean;
    suppress_assignment:                  boolean;
    anonymous_instructor_annotations:     boolean;
    anonymous_grading:                    boolean;
    allowed_attempts:                     number;
    annotatable_attachment_id:            null;
    lock_info?:                           LockInfo;
    secure_params:                        string;
    lti_context_id:                       string;
    course_id:                            number;
    name:                                 string;
    submission_types:                     string[];
    has_submitted_submissions:            boolean;
    due_date_required:                    boolean;
    max_name_length:                      number;
    in_closed_grading_period:             boolean;
    availability_status?:                 AvailabilityStatus;
    graded_submissions_exist:             boolean;
    is_quiz_assignment:                   boolean;
    can_duplicate:                        boolean;
    original_course_id:                   number | null;
    original_assignment_id:               number | null;
    original_lti_resource_link_id:        null | string;
    original_assignment_name:             null | string;
    original_quiz_id:                     null;
    workflow_state:                       "published";
    important_dates:                      boolean;
    muted:                                boolean;
    html_url:                             string;
    quiz_id?:                             number;
    anonymous_submissions?:               boolean;
    published:                            boolean;
    only_visible_to_overrides:            boolean;
    visible_to_everyone:                  boolean;
    locked_for_user:                      boolean;
    lock_explanation?:                    string;
    submissions_download_url:             string;
    post_manually:                        boolean;
    anonymize_students:                   boolean;
    new_quizzes_anonymous_participants:   boolean;
    require_lockdown_browser:             boolean;
    restrict_quantitative_data:           boolean;
    allowed_extensions?:                  string[];
    is_quiz_lti_assignment?:              boolean;
    frozen_attributes?:                   string[];
    settings?:                            Settings;
    external_tool_tag_attributes?:        ExternalToolTagAttributes;
    url?:                                 string;
}

export interface AvailabilityStatus {
    status: "closed";
    string:   null;
}

export interface ExternalToolTagAttributes {
    url:                 string;
    new_tab:             boolean;
    external_data:       string;
    resource_link_id:    string;
    resource_link_title: null;
    content_type:        string;
    content_id:          number;
    custom_params:       null;
}

export interface LockInfo {
    lock_at:      string;
    can_view:     boolean;
    asset_string: string;
}

export interface Settings {
    lockdown_browser: LockdownBrowser;
}

export interface LockdownBrowser {
    require_lockdown_browser: boolean;
}
