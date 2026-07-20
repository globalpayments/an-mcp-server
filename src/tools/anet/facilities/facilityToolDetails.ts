import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { appendPositiveInteger, appendStrictlyPositiveInteger, appendStrictlyPositiveIntegerArray, appendString, getStrictlyPositiveIntegerParameter } from "../utils/anetToolUtils";

export const GET_FACILITIES_TOOL: Tool = {
  name: 'search_facilities',
  description: 'Search facilities using flexible filters such as name, facility type, center, site, amenity',
  inputSchema: {
    type: 'object',
    properties: {
      facility_id: {
        type: 'integer',
        description: 'The ID of the facility. The facilities whose ID fully match the specified ID are returned.'
      },
      facility_name: {
        type: 'string',
        description: 'Facility name. All facilities whose names fully or partially match the specified name are returned.'
      },
      facility_type_id: {
        type: 'integer',
        description: 'The ID of the facility type as given by the tool get_facility_types'
      },
      center_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'The center ID of the facility. Max 5 centers.'
      },
      site_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'The site ID of the facility\'s center. Max 5 sites.'
      },
      amenity_id: {
        type: 'integer',
        description: 'The ID of the amenity which is associated with the facility.'
      },
      prep_code_id: {
        type: 'integer',
        description: 'The ID of the prep code which is associated with the facility as returned by the tool get_prep_codes.'
      },
      reserve_by: {
        type: 'integer',
        description: 'Reservation time increment: 1-minute; 2-hour; 3-day; 4-week; 5-month; 6-defined date range; 7-rental block; 8-overnight.'
      },

    },
  }
};

export const GET_FACILITIES_OUT_FIELDS = ['amenities','calculated_open_pattern.date_range','calculated_open_pattern.days_of_week','calculated_open_pattern.opening_times','capacity_track_current_in','capacity_track_maximum','center_id','center_name','default_maximum_capacity','default_minimum_capacity','description','disclaimer','facility_id','facility_name','facility_number','facility_type','hide_on_internet','modified_date_time','open_blocks.date','open_blocks.time_block_on_date','prep_code','prevent_further_use','reserve_by','setup_time','start_on','teardown_time'];
export const GET_FACILITIES_DEFAULT_FIELDS = ['facility_id','facility_name','facility_type','center_id','center_name','amenities'];

export function buildGetFacilityParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendStrictlyPositiveInteger(queryParams, 'facility_id', args.facility_id, definition);
  appendString(queryParams, 'facility_name', args.facility_name, definition);
  appendStrictlyPositiveIntegerArray(queryParams, 'center_ids', args.center_ids, definition, 5);
  appendStrictlyPositiveIntegerArray(queryParams, 'site_ids', args.site_ids, definition, 5);
  appendStrictlyPositiveInteger(queryParams, 'facility_type_id', args.facility_type_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'amenity_id', args.amenity_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'prep_code_id', args.prep_code_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'reserve_by', args.reserve_by, definition);
}

export const GET_FACILITY_DETAILS_TOOL: Tool = {
  name: 'get_facility_details',
  description: 'Get detailed information about a specific facility',
  inputSchema: {
    type: 'object',
    properties: {
      facility_id: {
        type: 'integer',
      },
    },
    required: ['facility_id']
  }
};

export function buildGetFacilityDetailsEndPoint(definition: Tool, args: Record<string, any>): string {
  return `/api/v1/facilities/${getStrictlyPositiveIntegerParameter('facility_id', args.facility_id, definition)}`;
}

export const GET_FACILITY_TYPES_TOOL: Tool = {
  name: 'get_facility_types',
  description: 'Retrieve the list of facility types configured for the current organization',
  inputSchema: {
    type: 'object',
    properties: {},
  }
};

export const GET_FACILITY_SCHEDULES_TOOL: Tool = {
  name: 'get_facility_schedules',
  description: 'Get a list of reservation schedules for one or more facilities (up to 10) during the specified date range',
  inputSchema: {
    type: 'object',
    properties: {
      facility_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'IDs of facilities. Max 10 ids.'
      },
      date_from: {
        type: 'string',
        description: 'All facility schedules with start dates on or after this date and time are returned. Must be a date in the future. Format is YYYY-MM-DD HH:MM.'
      },
      date_to: {
        type: 'string',
        description: 'All facility schedules with end dates on or before this date and time are returned. Must be a date later than date_from. Format is YYYY-MM-DD HH:MM.'
      },
    },
    required: [
      'facility_ids',
      'date_from',
      'date_to'
    ],
  }
};

export const GET_FACILITY_SCHEDULES_OUT_FIELDS = ['activity_name','activity_number','activity_status','attendance','center_id','center_name','company_id','company_name','company_type','customer_first_name','customer_id','customer_last_name','customer_type','dressing_rooms.dressing_room_home_or_away_status','dressing_rooms.dressing_room_id','dressing_rooms.dressing_room_name','dressing_rooms.dressing_room_occupant','end_date_time','event_description','event_type','event_type_id','facility_id','facility_name','facility_number','facility_type','facility_type_id','has_active_membership','league_name','permit_creation_date','permit_number','permit_status','schedule_type','schedule_type_id','session_name','setup_from_time','setup_to_time','site_id','site_name','start_date_time','tear_down_from_time','tear_down_to_time'];
export const GET_FACILITY_SCHEDULES_DEFAULT_FIELDS = ['facility_id','facility_name','facility_type_id','center_id','start_date_time','end_date_time','schedule_type','event_type','site_id','attendance','activity_name','session_name','league_name','customer_id','company_id'];

export function buildGetFacilitySchedulesParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendStrictlyPositiveIntegerArray(queryParams, 'facility_ids', args.facility_ids, definition, 10);
  appendString(queryParams, 'date_from', args.date_from, definition);
  appendString(queryParams, 'date_to', args.date_to, definition);
}

export const GET_FACILITY_OPEN_HOURS_TOOL: Tool = {
  name: 'get_facility_open_hours',
  description: 'Returns default facility opening/closing hours and facility open/close hours',
  inputSchema: {
    type: 'object',
    properties: {
      facility_id: {
        type: 'integer',
      },
    },
    required: ['facility_id']
  }
};

export function buildGetFacilityOpenHoursEndPoint(definition: Tool, args: Record<string, any>): string {
  return `/api/v1/facilityopenhours/${getStrictlyPositiveIntegerParameter('facility_id', args.facility_id, definition)}`;
}

export const GET_GENERAL_CHARGE_MATRIX_TOOL: Tool = {
  name: 'get_general_charge_matrix',
  description: 'Returns facility charges for the specified request parameters. All charges configured with the specified query parameters are returned. At least one parameter must be provided',
  inputSchema: {
    type: 'object',
    properties: {
      customer_type_id: {
        type: 'integer',
        description: 'The ID of the customer type.'
      },
      center_id: {
        type: 'integer',
        description: 'The ID of the center.'
      },
      facility_type_id: {
        type: 'integer',
        description: 'The ID of the facility type.'
      },
      facility_id: {
        type: 'integer',
        description: 'The ID of the facility.'
      },
      site_id: {
        type: 'integer',
        description: 'The ID of the site.'
      },
      event_type_id: {
        type: 'integer',
        description: 'The ID of the event type.'
      }
    },
  }
};

export function buildGetGeneralChargeMatrixParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendPositiveInteger(queryParams, 'search_type', 0, definition);
  appendGetChargeMatrixParams(queryParams, definition, args);
}

export const GET_FACILITY_CHARGE_MATRIX_TOOL: Tool = {
  name: 'get_facility_charge_matrix',
  description: 'Returns facility charges for the specified request parameters. All charges which will be applied to the specified customer type, facility and event type during reservation are returned',
  inputSchema: {
    type: 'object',
    properties: {
      customer_type_id: {
        type: 'integer',
        description: 'The ID of the customer type.'
      },
      center_id: {
        type: 'integer',
        description: 'The ID of the center.'
      },
      facility_type_id: {
        type: 'integer',
        description: 'The ID of the facility type.'
      },
      facility_id: {
        type: 'integer',
        description: 'The ID of the facility.'
      },
      site_id: {
        type: 'integer',
        description: 'The ID of the site.'
      },
      event_type_id: {
        type: 'integer',
        description: 'The ID of the event type.'
      }
    },
    required: [
      'customer_type_id',
      'facility_id'
    ]
  }
};

export const GET_FACILITY_CHARGE_MATRIX_OUT_FIELDS = ['activation_code', 'activation_date', 'allow_qty_selection_online', 'alternate_key_statuses', 'alternate_key_types', 'center_id', 'center_name', 'charge_name', 'charge_type', 'custom_questions.answer', 'custom_questions.question_text', 'custom_questions.question_title', 'customer_type', 'default_amount', 'default_percentage', 'default_quantity', 'discount_type', 'discountable', 'event_type', 'exclude_from_payment_plan', 'expiration_date', 'extra_booking_fee', 'facility_id', 'facility_name', 'facility_type', 'gl_account', 'holiday_rates', 'is_deposit', 'maximum_age', 'maximum_qty_allowed', 'minimum_age', 'minimum_qty_allowed', 'once_per_permit', 'online_question', 'prefill_condition', 'scheduled_fee_change.charge_amount', 'scheduled_fee_change.effective_date', 'site_id', 'site_name', 'system_account_package', 'taxable_by_tax1', 'taxable_by_tax2', 'taxable_by_tax3', 'taxable_by_tax4', 'taxable_by_tax5', 'taxable_by_tax6', 'taxable_by_tax7', 'taxable_by_tax8', 'unit_of_measure'];
export const GET_FACILITY_CHARGE_MATRIX_DEFAULT_FIELDS = ['charge_name', 'charge_type', 'customer_type', 'center_id', 'facility_id', 'facility_name', 'site_id', 'event_type', 'prefill_condition', 'gl_account', 'site_id', 'default_amount', 'default_percentage', 'discountable', 'discount_type', 'activation_date', 'expiration_date', 'scheduled_fee_change.charge_amount', 'scheduled_fee_change.effective_date', 'unit_of_measure', 'minimum_age', 'maximum_age', 'alternate_key_statuses', 'alternate_key_types'];

export function buildGetFacilityChargeMatrixParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendPositiveInteger(queryParams, 'search_type', 1, definition);
  appendGetChargeMatrixParams(queryParams, definition, args);
}

function appendGetChargeMatrixParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendStrictlyPositiveInteger(queryParams, 'customer_type_id', args.customer_type_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'center_id', args.center_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'facility_type_id', args.facility_type_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'facility_id', args.facility_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'site_id', args.site_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'event_type_id', args.event_type_id, definition);
}

export const GET_EVENT_TYPES_TOOL: Tool = {
  name: 'get_event_types',
  description: 'Retrieve a list of event types with configured facilities for the organization',
  inputSchema: {
    type: 'object',
    properties: {},
  }
};

export const GET_RESERVATION_GROUPS_TOOL: Tool = {
  name: 'get_reservation_groups',
  description: 'Retrieve a list of reservation groups with configured facilities for the organization',
  inputSchema: {
    type: 'object',
    properties: {},
  }
};

export const GET_PREP_CODES_TOOL: Tool = {
  name: 'get_prep_codes',
  description: 'Retrieve the list of preparation codes',
  inputSchema: {
    type: 'object',
    properties: {},
  }
};

export const GET_SCHEDULE_TYPES_TOOL: Tool = {
  name: 'get_schedule_types',
  description: 'Retrieve the list of schedule types of the organization',
  inputSchema: {
    type: 'object',
    properties: {},
  }
};

export const GET_SKIP_DATES_TOOL: Tool = {
  name: 'get_skip_dates',
  description: 'Retrieve the list of skip dates for a specific facility',
  inputSchema: {
    type: 'object',
    properties: {
      facility_id: {
        type: 'integer',
      },
    },
    required: ['facility_id']
  }
};

export function buildSkipDatesParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendPositiveInteger(queryParams, 'facility_id', args.facility_id, definition);
}

export const GET_INSTRUCTOR_SCHEDULES_TOOL: Tool = {
  name: 'get_instructor_schedules',
  description: 'Get a list of reservation schedules for one or more instructors (up to 10) during the specified date range',
  inputSchema: {
    type: 'object',
    properties: {
      instructor_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'The IDs of the instructors to retrieve schedules for. Max 10 ids.'
      },
      date_from: {
        type: 'string',
        description: 'Instructor schedules with start dates on or after this date and time. Format YYYY-MM-DD HH:MM.'
      },
      date_to: {
        type: 'string',
        description: 'Instructor schedules with end dates on or before this date and time. Must be within 3 months after date_from. Format YYYY-MM-DD HH:MM.'
      },
      instructor_schedule_type: {
        type: 'integer',
        description: 'Type of the instructor schedule: 1- Instructor Schedule for Normal Activities, 2- Instructor Schedule for Private Lessons, 3- Instructor Schedule for Regular Instructor Bookings'
      },
      activity_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'To return only instructor schedules that are reserved by the specified activities. Max 10 activity ids.'
      },
    },
    required: [
      'instructor_ids',
      'date_from',
      'date_to'
    ]
  }
};

export const GET_INSTRUCTOR_SCHEDULES_OUT_FIELDS = ['activity_id','activity_name','activity_number','customer_first_name','customer_id','customer_last_name','event_name','facility_id','facility_name','instructor_email','instructor_first_name','instructor_id','instructor_last_name','instructor_schedule_type','permit_number','schedule_end','schedule_start'];
export const GET_INSTRUCTOR_SCHEDULES_DEFAULT_FIELDS = ['instructor_id','instructor_first_name','instructor_last_name','instructor_schedule_type','schedule_start','schedule_end','activity_id','facility_id','customer_id','event_name'];

export function buildGetInstructorSchedulesParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendStrictlyPositiveIntegerArray(queryParams, 'instructor_ids', args.instructor_ids, definition, 10);
  appendString(queryParams, 'date_from', args.date_from, definition);
  appendString(queryParams, 'date_to', args.date_to, definition);
  appendStrictlyPositiveInteger(queryParams, 'instructor_schedule_type', args.instructor_schedule_type, definition);
  appendStrictlyPositiveIntegerArray(queryParams, 'activity_ids', args.activity_ids, definition, 10);
}

export const GET_EQUIPMENT_TYPES_TOOL: Tool = {
  name: 'get_equipment_types',
  description: 'Retrieve the list of equipment types configured for the current organization',
  inputSchema: {
    type: 'object',
    properties: {},
  }
};

export const GET_EQUIPMENT_DETAILS_TOOL: Tool = {
  name: 'get_equipment_details',
  description: 'Get the details of a specific equipment by its ID',
  inputSchema: {
    type: 'object',
    properties: {
      equipment_id: {
        type: 'integer',
      },
    },
    required: ['equipment_id']
  }
};

export function buildEquipmentDetailsParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendPositiveInteger(queryParams, 'equipment_id', args.equipment_id, definition);
}

export const GET_CENTER_EQUIPMENTS_TOOL: Tool = {
  name: 'get_center_equipment',
  description: 'Retrieve the list of equipment for one or more centers (up to 5)',
  inputSchema: {
    type: 'object',
    properties: {
      center_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'Center ids. Max 5 center ids.'
      },
      bookable_or_lendable: {
        type: 'integer',
        description: 'Filter for equipment by their Bookable or Lendable property: 0-Both; 1-Bookable; 2-Lendable'
      }
    },
    required: ['center_ids']
  }
};

export const GET_EQUIPMENT_OUT_FIELDS = ['bookable_or_lendable','center_id','default_cleanup','default_setup','equipment_id','equipment_name','equipment_number','equipment_type_id','open_blocks.date','open_blocks.time_block_on_date','status','total_quantity'];
export const GET_EQUIPMENT_DEFAULT_FIELDS = ['equipment_id','equipment_name','equipment_type_id','center_id','status','bookable_or_lendable','total_quantity'];

export function buildCenterEquipmentParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendStrictlyPositiveIntegerArray(queryParams, 'center_ids', args.center_ids, definition, 5);
  appendPositiveInteger(queryParams, 'bookable_or_lendable', args.bookable_or_lendable, definition);
}

export const GET_EQUIPMENT_SCHEDULES_TOOL: Tool = {
  name: 'get_equipment_schedules',
  description: 'Get a list of reservation schedules for one or more equipments (up to 100) during the specified date range',
  inputSchema: {
    type: 'object',
    properties: {
      equipment_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'The IDs of the equipments to retrieve schedules for. Max 100 equipments ids.'
      },
      date_from: {
        type: 'string',
        description: 'Equipment schedules with start dates on or after this date and time. Must be a date in the future. Format YYYY-MM-DD HH:MM.'
      },
      date_to: {
        type: 'string',
        description: 'Equipment schedules with end dates on or before this date and time. Must be after date_from. Format YYYY-MM-DD HH:MM.'

      },
    },
    required: [
      'equipment_ids',
      'date_from',
      'date_to'
    ]
  }
};

export const GET_EQUIPMENT_SCHEDULES_OUT_FIELDS = ['booking_end_date_time','booking_start_date_time','equipment_id','equipment_name','equipment_number','equipment_type','equipment_type_id','quantity','schedule_id','setup_from_time','setup_to_time','tear_down_from_time','tear_down_to_time'];
export const GET_EQUIPMENT_SCHEDULES_DEFAULT_FIELDS = ['equipment_id','equipment_name','equipment_type_id','quantity','booking_start_date_time','booking_end_date_time','schedule_id'];

export function buildGetEquipmentSchedulesParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendStrictlyPositiveIntegerArray(queryParams, 'equipment_ids', args.equipment_ids, definition, 100);
  appendString(queryParams, 'date_from', args.date_from, definition);
  appendString(queryParams, 'date_to', args.date_to, definition);
}
