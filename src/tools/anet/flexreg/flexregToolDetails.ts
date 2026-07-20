import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { appendDaysOfWeek, appendPositiveInteger, appendStrictlyPositiveInteger, appendStrictlyPositiveIntegerArray, appendString, getStrictlyPositiveIntegerParameter } from "../utils/anetToolUtils";

export const GET_FLEXREG_PROGRAMS_TOOL: Tool = {
  name: 'get_flexreg_programs',
  description: 'Retrieve enrollment information for one or more customers. Supports filtering by enrollment_status and date_after.',
  inputSchema: {
    type: 'object',
    properties: {
      program_name: {
        type: 'string',
        description: 'Program name. All programs whose names fully or partially match the specified name are returned.'
      },
      program_type_id: {
        type: 'integer',
        description: 'Program Type id.'
      },
      program_season_id: {
        type: 'integer',
        description: 'Program Season id.'
      },
      program_status_id: {
        type: 'integer',
        description: 'The status of the program. (0-Open, 1-Closed, 2-Tentative, 3-On Hold, 4-Retired)'
      },
      category_id: {
        type: 'integer',
        description: 'Category id.'
      },
      other_category_id: {
        type: 'integer',
        description: 'Other Category id.'
      },
      reservation_unit: {
        type: 'integer',
        description: 'Reservation unit of the program. (0-Same as billing unit, 1-Daily, 2-Weekly, 3-Monthly, 4-No choices).'
      },
      site_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'Site IDs assigned to the program. Max 5 site ids.'
      },
      center_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'Center IDs assigned to the program. Max 5 center ids.'
      },
      days_of_week: {
        type: "array",
        items: { type: "integer" },
        description: 'Days of week represented as integers (1=Sunday, 2=Monday, ..., 7=Saturday). Programs that occur on any of the specified days will be returned.',
      },
      gender_id: {
        type: 'integer',
        description: "Gender id. At least 0-'Mixed', 1-'Male', 2-'Female', 13-'Non-binary', 14-'Prefer not to say' are be available, but more may be listed using the list_genders tools"
      },
      age_from: {
        type: 'integer',
        description: 'minimum age (inclusive).'
      },
      age_to: {
        type: 'integer',
        description: 'maximum age (inclusive).'
      },
    },
  }
};

export const GET_FLEX_REG_PROGRAMS_OUT_FIELDS = ['age_max_month', 'age_max_week', 'age_max_year', 'age_min_month', 'age_min_week', 'age_min_year', 'category', 'category_id', 'child_season', 'gender', 'modified_date_time', 'parent_season', 'program_department', 'program_id', 'program_name', 'program_number', 'program_status', 'program_type', 'reservation_unit', 'site_name', 'sub_category'];
export const GET_FLEX_REG_PROGRAMS_DEFAULT_FIELDS = ['program_id', 'program_name', 'program_status', 'program_type', 'parent_season', 'category_id', 'site_name', 'age_max_year', 'age_min_year'];

export function buildGetFlexregProgramsParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendString(queryParams, 'program_name', args.program_name, definition);
  appendStrictlyPositiveInteger(queryParams, 'program_type_id', args.program_type_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'program_season_id', args.program_season_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'program_status_id', args.program_status_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'category_id', args.category_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'other_category_id', args.other_category_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'reservation_unit', args.reservation_unit, definition);
  appendStrictlyPositiveIntegerArray(queryParams, 'site_ids', args.site_ids, definition, 5);
  appendStrictlyPositiveIntegerArray(queryParams, 'center_ids', args.center_ids, definition, 5);
  appendDaysOfWeek(queryParams, 'days_of_week', args.days_of_week, definition);
  appendPositiveInteger(queryParams, 'gender', args.gender_id, definition);
  appendPositiveInteger(queryParams, 'age_from', args.age_from, definition);
  appendPositiveInteger(queryParams, 'age_to', args.age_to, definition);
}

export const GET_FLEXREG_PROGRAM_DETAIL_TOOL: Tool = {
  name: 'get_flexreg_program_detail',
  description: 'Get detailed information about a FlexReg program by its ID',
  inputSchema: {
    type: 'object',
    properties: {
      program_id: {
        type: 'integer',
      },
    },
    required: ['program_id']
  }
};

export function buildGetFlexregProgramDetailsEndPoint(definition: Tool, args: Record<string, any>): string {
  return `/api/v1/flexregprograms/${getStrictlyPositiveIntegerParameter('program_id', args.program_id, definition)}`;
}

export const GET_FLEXREG_PROGRAM_FEES_TOOL: Tool = {
  name: 'get_flexreg_program_fees',
  description: 'Get fee information about a FlexReg program by its ID',
  inputSchema: {
    type: 'object',
    properties: {
      program_id: {
        type: 'integer',
      },
    },
    required: ['program_id']
  }
};

export function buildGetFlexregProgramFeesEndPoint(definition: Tool, args: Record<string, any>): string {
  return buildGetFlexregProgramDetailsEndPoint(definition, args) + '/fees';
}

export const GET_FLEXREG_PROGRAM_TYPES_TOOL: Tool = {
  name: 'get_flexreg_program_types',
  description: 'List all FlexReg program types configured for the current organization',
  inputSchema: {
    type: 'object',
    properties: {},
  }
};

const GET_FLEXREG_PROGRAM_EXPANDED_DETAIL_PROPERTIES = {
  program_id: {
    type: 'integer',
    description: 'FlexReg Program ID'
  },
  session_id: {
    type: 'integer',
    description: 'Only customers enrolled in the specified session ID are returned.'
  },
  roster_date: {
    type: 'string',
    description: 'Only return roster for the specified date. Date format is YYYY-MM-DD'
  },
  enrollment_status_id: {
    type: 'integer',
    description: 'Enrollment status to search customer enrollment information: 1-Enrolled, 2-Withdrawn, 3-Waitlisted, 4-Waitlist Removed, 5-Trial, 6-All. Default value is 1-Enrolled.'
  },
  date_after: {
    type: 'string',
    description: 'Customers who enrolled, withdrawn, waitlisted, removed from waitlisted on or after this specified date and time are returned. Format is YYYY-MM-DD HH:MM'
  }
};

export const GET_FLEXREG_PROGRAM_EXPANDED_DETAIL_TOOL: Tool = {
  name: 'get_flexreg_program_expanded_detail',
  description: 'Get program, program enrollment, customer and custom question answer fields for the specified program',
  inputSchema: {
    type: 'object',
    properties: GET_FLEXREG_PROGRAM_EXPANDED_DETAIL_PROPERTIES,
    required: ['program_id']
  }
};

export const GET_FLEXREG_SESSION_EXPANDED_DETAIL_TOOL: Tool = {
  name: 'get_flexreg_session_expanded_detail',
  description: 'Get programs, program enrollments, customers and custom questions answer fields for programs using a specific session',
  inputSchema: {
    type: 'object',
    properties: GET_FLEXREG_PROGRAM_EXPANDED_DETAIL_PROPERTIES,
    required: ['session_id']
  }
};

export function buildGetFlexregExpandedDetailParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendStrictlyPositiveInteger(queryParams, 'program_id', args.program_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'session_id', args.session_id, definition);
  appendString(queryParams, 'roster_date', args.roster_date, definition);
  appendStrictlyPositiveInteger(queryParams, 'enrollment_status_id', args.enrollment_status_id, definition);
  appendString(queryParams, 'date_after', args.date_after, definition);
}


const GET_FLEXREG_PROGRAM_ENROLLMENT_PROPERTIES = {
  program_id: {
    type: 'integer',
    description: 'Only enrollment to the specific program are returned.'
  },
  session_id: {
    type: 'integer',
    description: 'Only customers enrolled in the specified session ID are returned.'
  },
  customer_ids: {
    type: 'array',
    items: {
      type: 'integer'
    },
    description: 'Only return enrollments for the specified customers. Max 500 customer ids.'
  },
  roster_date: {
    type: 'string',
    description: 'Only return roster for the specified date. Date format is YYYY-MM-DD'
  },
  enrollment_status_id: {
    type: 'integer',
    description: 'Enrollment status to search customer enrollment information: 1-Enrolled, 2-Withdrawn, 3-Waitlisted, 4-Waitlist Removed, 5-Trial, 6-All. Default value is 1-Enrolled.'
  },
  date_after: {
    type: 'string',
    description: 'Customers who enrolled, withdrawn, waitlisted, removed from waitlisted on or after this specified date and time are returned. Format is YYYY-MM-DD HH:MM'
  }
};

export const GET_FLEX_REG_ENROLLMENT_OUT_FIELDS = ['customer_date_modified', 'customer_email', 'customer_id', 'date_registered', 'enrolled_sessions.first_date', 'enrolled_sessions.last_date', 'enrolled_sessions.session_id', 'enrolled_sessions.session_name', 'enrollment_status', 'first_name', 'has_active_membership', 'last_name', 'last_transaction_date', 'payers.payer_company_name', 'payers.payer_company_phone', 'payers.payer_customer_id', 'payers.payer_email', 'payers.payer_first_name', 'payers.payer_last_name', 'program_id', 'program_name', 'waitlist_removed_date', 'waitlisted_date'];
export const GET_FLEX_REG_ENROLLMENT_DEFAULT_FIELDS = ['program_id', 'program_name', 'enrollment_status', 'first_name', 'last_name', 'customer_id', 'enrolled_sessions.session_id', 'enrolled_sessions.session_name'];

export const GET_FLEXREG_PROGRAM_ENROLLMENT_TOOL: Tool = {
  name: 'get_flexreg_program_enrollment',
  description: 'Get program enrollment information about a FlexReg program by its ID',
  inputSchema: {
    type: 'object',
    properties: GET_FLEXREG_PROGRAM_ENROLLMENT_PROPERTIES,
    required: ['program_id']
  }
};

export const GET_FLEXREG_SESSION_ENROLLMENT_TOOL: Tool = {
  name: 'get_flexreg_session_enrollment',
  description: 'Get session enrollment information about a FlexReg session by its ID',
  inputSchema: {
    type: 'object',
    properties: GET_FLEXREG_PROGRAM_ENROLLMENT_PROPERTIES,
    required: ['session_id']
  }
};

export const GET_FLEXREG_CUSTOMER_ENROLLMENT_TOOL: Tool = {
  name: 'get_flexreg_customer_enrollment',
  description: 'Get enrollments information for one or more customers',
  inputSchema: {
    type: 'object',
    properties: GET_FLEXREG_PROGRAM_ENROLLMENT_PROPERTIES,
    required: ['customer_ids']
  }
};

export function buildGetFlexregProgramEnrollmentParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendStrictlyPositiveInteger(queryParams, 'program_id', args.program_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'session_id', args.session_id, definition);
  appendStrictlyPositiveIntegerArray(queryParams, 'customer_ids', args.customer_ids, definition, 500);
  appendString(queryParams, 'roster_date', args.roster_date, definition);
  appendStrictlyPositiveInteger(queryParams, 'enrollment_status_id', args.enrollment_status_id, definition);
  appendString(queryParams, 'date_after', args.date_after, definition);
}


export const GET_FLEXREG_PROGRAM_DATES_TOOL: Tool = {
  name: 'get_flexreg_program_dates',
  description: 'Get the dates of a FlexReg program in the next 90 days',
  inputSchema: {
    type: 'object',
    properties: {
      program_id: {
        type: 'integer',
      },
    },
    required: ['program_id']
  }
};

export function buildGetFlexregProgramDatesParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendStrictlyPositiveInteger(queryParams, 'program_id', args.program_id, definition);
}
