import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { appendBoolean, appendPositiveInteger, appendStrictlyPositiveInteger, appendStrictlyPositiveIntegerArray, appendString, getStrictlyPositiveIntegerParameter } from "../utils/anetToolUtils";

export const GET_MEMBERSHIP_PACKAGES_TOOL: Tool = {
  name: 'get_membership_packages',
  description: 'Search for membership packages in the current organization. Returns a JSON array of membership package records and pagination cursor info',
  inputSchema: {
    type: 'object',
    properties: {
      package_name: {
        type: 'string',
        description: 'Package name. All package whose names fully or partially match the specified name are returned.'
      },
      package_status_id: {
        type: 'integer',
        description: 'Package status code, 1 for Open and 0 for Closed.'
      },
      package_category_id: {
        type: 'integer',
        description: 'Id of the package category.'
      },
      site_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'Site IDs assigned to the program. Max 5 site ids.'
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

export const GET_MEMBERSHIP_PACKAGES_OUT_FIELDS = ['after_scan_print_receipt','ages_max','ages_min','all_family_members','auto_allocate_to_immediate_family_members','automatic_cancellation','available_as_prerequisite','cancellation_options','catalog_description','description','disable_renew_usage_fee','disable_transfer_usage_fee','eligibility_percentage','family_member_age_min','family_member_count_max','family_member_count_min','family_membership','force_auto_renew','force_expiration_date','hide_on_internet','max_passes','max_sellable_uses','max_timeperiods','max_uses','max_uses_per_day','max_uses_per_week','membership_discount','membership_expire_warn_days','modified_date_time','new_alternate_key_status_links_names','new_alternate_key_type_links_names','package_category_name','package_gender','package_id','package_name','package_start_date','package_status','qualify_commission_option','qualify_member_registration_dates','renewable_membership','residency_type','select_family_members','selected_entry_points','site_name','specific_end_date','specific_number_of_days','specific_renew_period','specific_time_period','usage_fee_name'];
export const GET_MEMBERSHIP_PACKAGES_DEFAULT_FIELDS = ['package_id','package_name','package_category_name','package_status','description','site_name','usage_fee_name','ages_min','ages_max','package_start_date','specific_end_date','specific_number_of_days','specific_time_period'];

export function buildGetMembershipPackagesParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendString(queryParams, 'package_name', args.package_name, definition);
  appendPositiveInteger(queryParams, 'package_status_id', args.package_status_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'package_category_id', args.package_category_id, definition);
  appendStrictlyPositiveIntegerArray(queryParams, 'site_ids', args.site_ids, definition, 5);
  appendStrictlyPositiveInteger(queryParams, 'gender', args.gender_id, definition);
  appendPositiveInteger(queryParams, 'age_from', args.age_from, definition);
  appendPositiveInteger(queryParams, 'age_to', args.age_to, definition);
}

export const GET_MEMBERSHIPS_TOOL: Tool = {
  name: 'get_memberships',
  description: 'Search for memberships',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'Customer id. Can the original customer id (integer) given as string or an encoded version.'
      },
      package_id: {
        type: 'integer',
        description: 'Optional package id.'
      },
      modified_date_from: {
        type: 'string',
        description: 'Optional modified date from. Format is YYYY-MM-DD HH:MM.'
      },
      modified_date_to: {
        type: 'string',
        description: 'Optional modified date to. Format is YYYY-MM-DD HH:MM.'
      },
      package_status_id: {
        type: 'integer',
        description: 'Search only within packages with the given status code, 1 for Open and 0 for Closed.'
      },
      active_memberships_only: {
        type: 'boolean',
        description: 'If true, only active memberships are returned'
      }
    },
  }
};

export const GET_MEMBERSHIPS_OUT_FIELDS = ['automatic_cancellation_reason','automatic_renewal','cancellation_date','cancellation_reason','customer_first_name','customer_id','customer_last_name','customer_since_date','effective_date','entry_point','expiration_date','family_package','last_renewed_date','member_pass_number','member_since_date','membership_id','membership_status','modified_date_time','number_of_uses_used','package_category_id','package_id','package_name','package_retention_eligible','package_site_id','package_status_id','primary_member_customer_id','primary_member_first_name','primary_member_last_name','primary_member_pass_number','qualify_member_registration_dates','remaining_number_of_uses_left','scheduled_automatic_cancellation','scheduled_automatic_cancellation_date','scheduled_cancellation','scheduled_cancellation_date','scheduled_cancellation_reason','suspended_from_date','suspended_until_date','suspension_reason','total_number_of_uses'];
export const GET_MEMBERSHIPS_DEFAULT_FIELDS = ['customer_id','package_id','package_name','customer_first_name','customer_last_name','primary_member_customer_id','membership_id','membership_status','effective_date','expiration_date','automatic_renewal','last_renewed_date','package_status_id','package_site_id','package_category_id','family_package','total_number_of_uses','number_of_uses_used','remaining_number_of_uses_left','member_pass_number'];

export function buildGetMembershipsParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendString(queryParams, 'customer_id', args.customer_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'package_id', args.package_id, definition);
  appendString(queryParams, 'modified_date_from', args.modified_date_from, definition);
  appendString(queryParams, 'modified_date_to', args.modified_date_to, definition);
  appendPositiveInteger(queryParams, 'package_status_id', args.package_status_id, definition);
  appendBoolean(queryParams, 'active_memberships_only', args.active_memberships_only, definition);
}


export const GET_MEMBERSHIP_PACKAGE_CATEGORIES_TOOL: Tool = {
  name: 'get_membership_package_categories',
  description: 'Retrieve the list of membership package categories configured for the current organization',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const GET_MEMBERSHIP_USAGES_TOOL: Tool = {
  name: 'get_membership_usages',
  description: 'Search for membership usages at a specific date',
  inputSchema: {
    type: 'object',
    properties: {
      usage_date: {
        type: 'string',
        description: 'Date of the required membership and/or alternate key usage data. Format is YYYY-MM-DD'
      },
      customer_id: {
        type: 'integer',
        description: 'Customer id'
      },
      package_id: {
        type: 'integer',
        description: 'Package id'
      },
      alternate_key_type: {
        type: 'string',
        description: 'The alternate key type name.'
      },
      entry_point_id: {
        type: 'integer',
        description: 'ID of the entry point where the membership and/or alternate key was used'
      },
      entry_point_name: {
        type: 'string',
        description: 'Name of the entry point where the membership and/or alternate key was used'
      },
      from_daily_time: {
        type: 'string',
        description: 'The required daily time range for the membership and/or alternate key usage data. Format is HH:MM'
      },
      to_daily_time: {
        type: 'string',
        description: 'The required daily time range for the membership and/or alternate key usage data. Format is HH:MM'
      }
    },
    required: ['usage_date']
  },
};

export const GET_MEMBERSHIP_USAGES_OUT_FIELDS = ['alternate_key_id','alternate_key_status','alternate_key_type','check_in_entry_point_id','check_out_entry_point_id','checkin_date','checkin_day_of','checkin_entry_point','checkin_time','checkout_date','checkout_day_of','checkout_entry_point','checkout_time','customer_first_name','customer_id','customer_last_name','package_id','package_name','pass_number','qty'];
export const GET_MEMBERSHIP_USAGES_DEFAULT_FIELDS = ['customer_id','customer_first_name','customer_last_name','package_id','package_name','pass_number','checkin_date','checkin_time','qty','check_in_entry_point_id','checkin_entry_point','checkout_date','checkout_time','check_out_entry_point_id','checkout_entry_point'];

export function buildGetMembershipUsagesParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendString(queryParams, 'usage_date', args.usage_date, definition);
  appendStrictlyPositiveInteger(queryParams, 'customer_id', args.customer_id, definition);
  appendStrictlyPositiveInteger(queryParams, 'package_id', args.package_id, definition);
  appendString(queryParams, 'alternate_key_type', args.alternate_key_type, definition);
  appendStrictlyPositiveInteger(queryParams, 'entry_point_id', args.entry_point_id, definition);
  appendString(queryParams, 'entry_point', args.entry_point_name, definition);
  appendString(queryParams, 'from_daily_time', args.from_daily_time, definition);
  appendString(queryParams, 'to_daily_time', args.to_daily_time, definition);
}

export const GET_MEMBERSHIP_PACKAGE_FEES_TOOL: Tool = {
  name: 'get_membership_package_fees',
  description: 'Retrieve the list of membership package fees for a specific membership package',
  inputSchema: {
    type: 'object',
    properties: {
      package_id: {
        type: 'integer',
      },
    },
    required: ['package_id']
  },
};

export function buildGetMembershipPackageFeesEndpoint(definition: Tool, args: Record<string, any>): string {
  return `/api/v1/membershippackages/${getStrictlyPositiveIntegerParameter('package_id', args.package_id, definition)}/fees`;
}
