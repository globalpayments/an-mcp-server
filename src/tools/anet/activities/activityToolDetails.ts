/**
 * Tool to list ActiveNet activities.
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { appendPositiveInteger, appendStrictlyPositiveIntegerArray, appendString, appendDaysOfWeek, getStrictlyPositiveIntegerParameter, appendStrictlyPositiveInteger } from '../utils/anetToolUtils';


/**
 * Tool definition for advanced activity search.
 * TODO: Add pagination + output fields control.
 */
export const SEARCH_ACTIVITIES_TOOL: Tool = {
  name: 'search_activity',
  description: 'Search activities matching advanced criteria such as name, age range, date ranges, activity type, categories, sites, facilities, gender, day of week, and skill.',
  inputSchema: {
    type: 'object',
    properties: {
      activity_name: {
        type: 'string',
        description: 'Activity name. Full or partial matches are returned.',
      },
      activity_type_id: {
        type: 'integer',
        description: 'Activity type ID.',
      },
      parent_season_id: {
        type: 'integer',
        description: 'Parent season ID.',
      },
      activity_status_id: {
        type: 'integer',
        description: "Activity status ID. Possible values include: 0='Open', 1='Closed', 2='Cancelled', 3='Tentative', 4='On Hold', 5='Retired', 6='Date Conflicted'.",
      },
      category_id: {
        type: 'integer',
        description: 'Primary category ID.',
      },
      other_category_id: {
        type: 'integer',
        description: 'Other category ID.',
      },
      site_ids: {
        type: 'array',
        items: { type: 'integer' },
        description: 'List of site IDs (max 5).',
      },
      center_ids: {
        type: 'array',
        items: { type: 'integer' },
        description: 'List of center/facility IDs (max 5).',
      },
      days_of_week: {
        type: "array",
        items: { type: "integer" },
        description: 'Days of week represented as integers (1=Sunday, 2=Monday, ..., 7=Saturday). Activities that occur on any of the specified days will be returned.',
      },
      gender_id: {
        type: 'integer',
        description: "Gender ID. At minimum, these values are available: 0='Mixed', 1='Male', 2='Female', 13='Non-binary', 14='Prefer not to say'. Additional values may be available via the list_genders tool.",
      },
      first_date_range_from: {
        type: 'string',
        description: 'First date range start (yyyy-MM-dd).',
      },
      first_date_range_to: {
        type: 'string',
        description: 'First date range end (yyyy-MM-dd).',
      },
      last_date_range_from: {
        type: 'string',
        description: 'Last date range start (yyyy-MM-dd).',
      },
      last_date_range_to: {
        type: 'string',
        description: 'Last date range end (yyyy-MM-dd).',
      },
      age_from: {
        type: 'integer',
        description: 'Minimum age (inclusive).',
      },
      age_to: {
        type: 'integer',
        description: 'Maximum age (inclusive).',
      },
      skill_id: {
        type: 'integer',
        description: 'Skill ID.',
      }
    },
  },
};

export const SEARCH_ACTIVITIES_OUT_FIELDS = ['activity_department', 'activity_department_id', 'activity_id', 'activity_name', 'activity_number', 'activity_status', 'activity_status_id', 'activity_type', 'activity_type_id', 'age_max_month', 'age_max_week', 'age_max_year', 'age_min_month', 'age_min_week', 'age_min_year', 'category', 'category_id', 'child_season', 'child_season_id', 'default_beginning_date', 'default_ending_date', 'default_facilities', 'default_pattern_dates', 'enroll_max', 'enroll_min', 'gender', 'gender_id', 'modified_date_time', 'other_category', 'other_category_id', 'parent_season', 'parent_season_id', 'site_id', 'site_name'];
export const SEARCH_ACTIVITIES_DEFAULT_FIELDS = ['activity_name', 'activity_id', 'activity_type', 'activity_type_id', 'parent_season_id', 'activity_status', 'activity_status_id', 'category_id', 'site_id', 'age_min_year', 'age_max_year', 'enroll_max'];

export function buildSearchActivitiesParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {

  appendString(queryParams, 'activity_name', args.activity_name, definition);
  appendPositiveInteger(queryParams, 'activity_type_id', args.activity_type_id, definition);
  appendPositiveInteger(queryParams, 'parent_season_id', args.parent_season_id, definition);
  appendPositiveInteger(queryParams, 'activity_status_id', args.activity_status_id, definition);
  appendPositiveInteger(queryParams, 'category_id', args.category_id, definition);
  appendPositiveInteger(queryParams, 'other_category_id', args.other_category_id, definition);
  appendDaysOfWeek(queryParams, 'days_of_week', args.days_of_week, definition);
  appendPositiveInteger(queryParams, 'gender', args.gender_id, definition);
  appendString(queryParams, 'first_date_range_from', args.first_date_range_from, definition);
  appendString(queryParams, 'first_date_range_to', args.first_date_range_to, definition);
  appendString(queryParams, 'last_date_range_from', args.last_date_range_from, definition);
  appendString(queryParams, 'last_date_range_to', args.last_date_range_to, definition);
  appendPositiveInteger(queryParams, 'age_from', args.age_from, definition);
  appendPositiveInteger(queryParams, 'age_to', args.age_to, definition);
  appendPositiveInteger(queryParams, 'skill_id', args.skill_id, definition);
  appendStrictlyPositiveIntegerArray(queryParams, 'site_ids', args.site_ids, definition, 5);
  appendStrictlyPositiveIntegerArray(queryParams, 'center_ids', args.center_ids, definition, 5);
}

/**
 * Tool definition for get activity details.
 */
export const GET_ACTIVITY_DETAIL_TOOL: Tool = {
  name: 'get_activity_by_id',
  description: 'Retrieve complete details for one activity using its unique identifier',
  inputSchema: {
    type: 'object',
    properties: {
      activity_id: {
        type: 'integer',
      },
    },
    required: ['activity_id']
  }
};

export function buildGetActivityDetailsEndPoint(definition: Tool, args: Record<string, any>): string {
  return `/api/v1/activities/${getStrictlyPositiveIntegerParameter('activity_id', args.activity_id, definition)}`;
}

/**
 * Tool definition for get activity fees.
 */
export const GET_ACTIVITY_FEES_TOOL: Tool = {
  name: 'get_activity_fees_by_id',
  description: 'Retrieve complete fees detail for one activity',
  inputSchema: {
    type: 'object',
    properties: {
      activity_id: {
        type: 'integer',
      },
    },
    required: ['activity_id']
  }
};

export function buildGetActivityFeesEndPoint(definition: Tool, args: Record<string, any>): string {
  return buildGetActivityDetailsEndPoint(definition, args) + '/fees';
}

/**
 * Tool definition for get activity categories.
 */
export const GET_ACTIVITY_CATEGORIES_TOOL: Tool = {
  name: 'list_activity_categories',
  description: 'List activity categories configured for the organization. Use these IDs to filter or group activities by high-level category',
  inputSchema: {
    type: 'object',
    properties: {},
  }
};

/**
 * Tool definition for get activity other categories.
 */
export const GET_ACTIVITY_OTHER_CATEGORIES_TOOL: Tool = {
  name: 'list_activity_other_categories',
  description: 'List secondary or "other" activity categories configured for the organization. Use these IDs to further classify activities beyond their primary category',
  inputSchema: {
    type: 'object',
    properties: {},
  }
};

/**
 * Tool definition for get activity types.
 */
export const GET_ACTIVITY_TYPES_TOOL: Tool = {
  name: 'list_activity_types',
  description: 'List activity types configured for the organization (for example, program vs. single event vs. league). Use these IDs to filter or group activities by type.',
  inputSchema: {
    type: 'object',
    properties: {},
  }
};

const ENROLLMENT_STATUS_PROP = {
  type: "integer",
  description: "Optional enrollment_status (1-Enrolled, 2-Withdrawn, 3-Waitlisted, 4-Waitlist Removed, 5-Trial, 6-All). Default to 1."
};

const DATE_AFTER_PROP = {
  type: "string",
  description: "Customers who enrolled, withdrawn, waitlisted, waitlist removed, enrolled trial class on or after this specified date and time are returned. Format: yyyy-MM-dd HH:MM"
};


/**
 * Tool definition for get activity expanded details.
 * TODO: Add pagination
 */
export const GET_ACTIVITY_EXPANDED_DETAILS_TOOL: Tool = {
  name: 'get_activity_expanded_detail',
  description: 'All in one tool, retrieving at the same time details, enrollment, customer and custom question answer details for one or more activities. This tools returns the most details about one or more activities in a single call. Supports filtering by enrollment status (for example to get all activities with waitlist) and date_after',
  inputSchema: {
    type: 'object',
    properties: {
      activity_ids: {
        type: "array",
        items: {
          type: "integer"
        },
        description: "The IDs of the activity to retrieve the details for."
      },
      enrollment_status: ENROLLMENT_STATUS_PROP,
      date_after: DATE_AFTER_PROP
    },
  }
};

function appendEnrollmentStatusAndDateAfterParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendStrictlyPositiveInteger(queryParams, 'enrollment_status', args.enrollment_status, definition);
  appendString(queryParams, 'date_after', args.date_after, definition);
}

export function buildActivityExpandedDetailsParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendStrictlyPositiveIntegerArray(queryParams, 'activity_ids', args.activity_ids, definition);
  appendEnrollmentStatusAndDateAfterParams(queryParams, definition, args);
}

const CUSTOMER_IDS_PROP = {
  type: 'array',
  items: {
    type: 'integer'
  },
  description: 'List of customer ids. Max 100 ids.',
};

/**
 * Tool definition for get activity enrollment.
 * TODO: Add pagination
 */
export const GET_ACTIVITY_ENROLLMENT_TOOL: Tool = {
  name: 'get_activity_enrollment',
  description: 'Retrieve enrollment information for one activity. Supports filtering by enrollment_status and date_after.',
  inputSchema: {
    type: 'object',
    properties: {
      activity_id: {
        type: "integer",
      },
      customer_ids: CUSTOMER_IDS_PROP,
      enrollment_status: ENROLLMENT_STATUS_PROP,
      date_after: DATE_AFTER_PROP
    },
    required: ['activity_id']
  }
};

/**
 * Tool definition for get activity enrollment.
 * TODO: Add pagination
 */
export const GET_CUSTOMERS_ENROLLMENT_TOOL: Tool = {
  name: 'get_customers_enrollment',
  description: 'Retrieve enrollment information for one or more customers. Supports filtering by enrollment_status and date_after.',
  inputSchema: {
    type: 'object',
    properties: {
      customer_ids: CUSTOMER_IDS_PROP,
      activity_id: {
        type: "integer",
      },
      enrollment_status: ENROLLMENT_STATUS_PROP,
      date_after: DATE_AFTER_PROP
    },
    required: ['customer_ids']
  }
};

export const GET_ACTIVITY_ENROLLMENT_OUT_FIELDS = ['activity_id','activity_name','customer_date_modified','customer_email','customer_id','date_registered','enrollment_status','first_name','has_active_membership','last_name','last_transaction_date','payers.payer_company_name','payers.payer_company_phone','payers.payer_customer_id','payers.payer_email','payers.payer_first_name','payers.payer_last_name','quantity','receipt_number','total_due','total_fee','total_paid','trial_class_date','waitlist_removed_date','waitlisted_date','withdraw_date'];
export const GET_ACTIVITY_ENROLLMENT_DEFAULT_FIELDS = ['activity_id','activity_name','enrollment_status','first_name','last_name','customer_id','total_fee','total_paid','total_due','quantity','payers.payer_customer_id','payers.payer_company_name'];

export function buildActivityEnrollmentParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  // Depending on the tool, either activity_id or customer_ids is required.
  appendStrictlyPositiveInteger(queryParams, 'activity_id', args.activity_id, definition);
  appendStrictlyPositiveIntegerArray(queryParams, 'customer_ids', args.customer_ids, definition, 100);
  appendEnrollmentStatusAndDateAfterParams(queryParams, definition, args);
}

/**
 * Tool definition for get activity dates.
 */
export const GET_ACTIVITY_DATES_TOOL: Tool = {
  name: 'get_activities_dates',
  description: 'Retrieve upcoming activity dates (within 90 days after today) for one activity. For other date range outside of the 90 days interval, the get_activity_by_id tool can be used to get all activity dates, but with in larger and less user friendly response.',
  inputSchema: {
    type: 'object',
    properties: {
      activity_id: {
        type: 'integer',
      },
    },
    required: ['activity_id']
  }
};

export const GET_ACTIVITY_DATES_OUT_FIELDS = ['activity_center_id','activity_center_name','activity_date_id','activity_facility_id','activity_facility_name','activity_id','available_spots','end_date_time','start_date_time'];
export const GET_ACTIVITY_DATES_DEFAULT_FIELDS = ['activity_id','activity_date_id','start_date_time','end_date_time','available_spots','activity_facility_id'];

export function buildGetActivityDatesParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendStrictlyPositiveInteger(queryParams, 'activity_id', args.activity_id, definition);
}
