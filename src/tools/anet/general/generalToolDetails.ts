/**
 * Tool to list ActiveNet sites.
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Tool definition for get organization.
 */
export const GET_ORGANIZATION_TOOL: Tool = {
  name: 'get_organization',
  description: 'Retrieve the current organization profile including basic configuration, contact information and key organizational settings',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};


/**
 * Tool definition for list_sites.
 */
export const LIST_SITES_TOOL: Tool = {
  name: 'list_sites',
  description: 'show the information of ActiveNet sites',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

/**
 * Tool definition for list_centers.
 */
export const LIST_CENTERS_TOOL: Tool = {
  name: 'list_centers',
  description: 'List all centers (operational units) for the current organization. Centers are typically buildings, campuses or major locations where activities and services are delivered',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const GET_CENTERS_OUT_FIELDS = ['Friday_hours_of_operation.closed_all_day','Friday_hours_of_operation.closes','Friday_hours_of_operation.opens','Monday_hours_of_operation.closed_all_day','Monday_hours_of_operation.closes','Monday_hours_of_operation.opens','Saturday_hours_of_operation.closed_all_day','Saturday_hours_of_operation.closes','Saturday_hours_of_operation.opens','Sunday_hours_of_operation.closed_all_day','Sunday_hours_of_operation.closes','Sunday_hours_of_operation.opens','Thursday_hours_of_operation.closed_all_day','Thursday_hours_of_operation.closes','Thursday_hours_of_operation.opens','Tuesday_hours_of_operation.closed_all_day','Tuesday_hours_of_operation.closes','Tuesday_hours_of_operation.opens','Wednesday_hours_of_operation.closed_all_day','Wednesday_hours_of_operation.closes','Wednesday_hours_of_operation.opens','address1','address2','center_id','center_name','city','country','customer_webpage_url','default_hours_of_operation.default_closes','default_hours_of_operation.default_opens','description','fax','latitude','longitude','phone1','phone2','prevent_further_use','site_id','site_name','state','zip_code'];
export const GET_CENTERS_DEFAULT_FIELDS = ['center_id','center_name','prevent_further_use','site_id','site_name','description','address1','address2','city','state','zip_code','country','phone1','default_hours_of_operation.default_opens','default_hours_of_operation.default_closes'];

/**
 * Tool definition for list_seasons.
 */
export const LIST_SEASONS_TOOL: Tool = {
  name: 'list_seasons',
  description: 'List all seasons configured for the current organization, including their names and active date ranges. Use this to understand registration periods and seasonal program groupings',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const GET_SEASONS_OUT_FIELDS = ['child_season.child_season','child_season.child_season_id','child_season.end_date','child_season.first_date_in_person','child_season.first_date_in_person_members','child_season.first_date_in_person_non_residents','child_season.first_date_on_internet','child_season.first_date_on_internet_members','child_season.first_date_on_internet_non_residents','child_season.last_date_in_person','child_season.last_date_on_internet','child_season.prevent_further_use','child_season.start_date','end_date','first_date_in_person','first_date_in_person_members','first_date_in_person_non_residents','first_date_on_internet','first_date_on_internet_members','first_date_on_internet_non_residents','last_date_in_person','last_date_on_internet','prevent_further_use','season_id','season_name','site_id','start_date'];
export const GET_SEASONS_DEFAULT_FIELDS = ['season_id','season_name','prevent_further_use','start_date','end_date','first_date_in_person','site_id','child_season.child_season_id','child_season.child_season','child_season.prevent_further_use','child_season.start_date','child_season.end_date'];

/**
 * Tool definition for list_skills.
 */
export const LIST_SKILLS_TOOL: Tool = {
  name: 'list_skills',
  description: 'List all skills configured for the current organization, including their names and descriptions. Use this to understand the skill sets available for various activities and programsList all skills levels or categories used by the organization (for example, swim levels, coaching certifications or proficiency levels). Useful for matching participants or staff to skill-based programs',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

/**
 * Tool definition for list_genders.
 */
export const LIST_GENDERS_TOOL: Tool = {
  name: 'list_genders',
  description: 'List the gender codes and descriptions configured for the organization. Use this when you need valid gender options for customer profiles or registrations',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

/**
 * Tool definition for list_states.
 */
export const LIST_STATES_TOOL: Tool = {
  name: 'list_states',
  description: 'List the state or province codes available for the organization, including abbreviations and descriptions. Use this to validate addresses or provide dropdown choices for state/province fields',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};
