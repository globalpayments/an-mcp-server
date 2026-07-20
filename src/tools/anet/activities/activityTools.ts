import { AnetTool } from "../anetTool";
import {
  buildActivityEnrollmentParams, buildActivityExpandedDetailsParams, buildGetActivityDatesParams,
  buildGetActivityDetailsEndPoint, buildGetActivityFeesEndPoint, buildSearchActivitiesParams, GET_ACTIVITY_CATEGORIES_TOOL, GET_ACTIVITY_DATES_DEFAULT_FIELDS, GET_ACTIVITY_DATES_OUT_FIELDS, GET_ACTIVITY_DATES_TOOL, GET_ACTIVITY_DETAIL_TOOL, GET_ACTIVITY_ENROLLMENT_DEFAULT_FIELDS, GET_ACTIVITY_ENROLLMENT_OUT_FIELDS, GET_ACTIVITY_ENROLLMENT_TOOL, GET_ACTIVITY_EXPANDED_DETAILS_TOOL, GET_ACTIVITY_FEES_TOOL, GET_ACTIVITY_OTHER_CATEGORIES_TOOL, GET_ACTIVITY_TYPES_TOOL, GET_CUSTOMERS_ENROLLMENT_TOOL, SEARCH_ACTIVITIES_DEFAULT_FIELDS, SEARCH_ACTIVITIES_OUT_FIELDS, SEARCH_ACTIVITIES_TOOL
} from "./activityToolDetails";

/**
 * List of tools related to activities.
 */
export const ACTIVITY_TOOLS: AnetTool[] = [
  {
    definition: SEARCH_ACTIVITIES_TOOL,
    endPoint: '/api/v1/activities',
    pageSize: 500,
    queryParamBuilder: buildSearchActivitiesParams,
    endPointName: 'GetActivities',
    availableOutputFields: SEARCH_ACTIVITIES_OUT_FIELDS,
    defaultOutputFields: SEARCH_ACTIVITIES_DEFAULT_FIELDS,
  },
  {
    definition: GET_ACTIVITY_DETAIL_TOOL,
    endPoint: buildGetActivityDetailsEndPoint,
    endPointName: 'GetActivityDetail',
  },
  {
    definition: GET_ACTIVITY_FEES_TOOL,
    endPoint: buildGetActivityFeesEndPoint,
    endPointName: 'GetActivityFees'
  },
  {
    definition: GET_ACTIVITY_CATEGORIES_TOOL,
    endPoint: '/api/v1/activitycategories',
    endPointName: 'GetActivityCategories'
  },
  {
    definition: GET_ACTIVITY_OTHER_CATEGORIES_TOOL,
    endPoint: '/api/v1/activityothercategories',
    endPointName: 'GetActivityOtherCategories'
  },
  {
    definition: GET_ACTIVITY_TYPES_TOOL,
    endPoint: '/api/v1/activitytypes',
    endPointName: 'GetActivityTypes'
  },
  {
    definition: GET_ACTIVITY_ENROLLMENT_TOOL,
    endPoint: '/api/v1/activityenrollment',
    pageSize: 500,
    queryParamBuilder: buildActivityEnrollmentParams,
    endPointName: 'GetActivityEnrollment',
    availableOutputFields: GET_ACTIVITY_ENROLLMENT_OUT_FIELDS,
    defaultOutputFields: GET_ACTIVITY_ENROLLMENT_DEFAULT_FIELDS
  },
  {
    definition: GET_CUSTOMERS_ENROLLMENT_TOOL,
    endPoint: '/api/v1/activityenrollment',
    pageSize: 500,
    queryParamBuilder: buildActivityEnrollmentParams,
    endPointName: 'GetActivityEnrollment',
    availableOutputFields: GET_ACTIVITY_ENROLLMENT_OUT_FIELDS,
    defaultOutputFields: GET_ACTIVITY_ENROLLMENT_DEFAULT_FIELDS
  },
  {
    definition: GET_ACTIVITY_EXPANDED_DETAILS_TOOL,
    endPoint: '/api/v1/activityexpandeddetail',
    pageSize: 500,
    queryParamBuilder: buildActivityExpandedDetailsParams,
    endPointName: 'GetActivityExpandedDetail'
  },
  {
    definition: GET_ACTIVITY_DATES_TOOL,
    endPoint: '/api/v1/activitydates',
    pageSize: 500,
    queryParamBuilder: buildGetActivityDatesParams,
    endPointName: 'GetActivityDates',
    availableOutputFields: GET_ACTIVITY_DATES_OUT_FIELDS,
    defaultOutputFields: GET_ACTIVITY_DATES_DEFAULT_FIELDS
  }
];
