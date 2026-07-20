import { AnetTool } from "../anetTool";
import { GET_CENTERS_DEFAULT_FIELDS, GET_CENTERS_OUT_FIELDS, GET_ORGANIZATION_TOOL, GET_SEASONS_DEFAULT_FIELDS, GET_SEASONS_OUT_FIELDS, LIST_CENTERS_TOOL, LIST_GENDERS_TOOL, LIST_SEASONS_TOOL, LIST_SITES_TOOL, LIST_SKILLS_TOOL, LIST_STATES_TOOL } from "./generalToolDetails";

/**
 * List of general tools.
 */
export const GENERAL_TOOLS: AnetTool[] = [
  {
    definition: GET_ORGANIZATION_TOOL,
    endPoint: '/api/v1/organization',
    endPointName: 'GetOrganization'
  },
  {
    definition: LIST_SITES_TOOL,
    endPoint: '/api/v1/sites',
    endPointName: 'GetSites'
  },
  {
    definition: LIST_CENTERS_TOOL,
    endPoint: '/api/v1/centers',
    endPointName: 'GetCenters',
    availableOutputFields: GET_CENTERS_OUT_FIELDS,
    defaultOutputFields: GET_CENTERS_DEFAULT_FIELDS
  },
  {
    definition: LIST_SEASONS_TOOL,
    endPoint: '/api/v1/seasons',
    endPointName: 'GetSeasons',
    availableOutputFields: GET_SEASONS_OUT_FIELDS,
    defaultOutputFields: GET_SEASONS_DEFAULT_FIELDS
  },
  {
    definition: LIST_SKILLS_TOOL,
    endPoint: '/api/v1/skills',
    endPointName: 'GetSkills'
  },
  {
    definition: LIST_GENDERS_TOOL,
    endPoint: '/api/v1/genders',
    endPointName: 'GetGenders'
  },
  {
    definition: LIST_STATES_TOOL,
    endPoint: '/api/v1/states',
    endPointName: 'GetStates'
  }
];
