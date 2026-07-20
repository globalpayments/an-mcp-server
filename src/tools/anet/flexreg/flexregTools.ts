import { AnetTool } from "../anetTool";
import { buildGetFlexregExpandedDetailParams, buildGetFlexregProgramDatesParams, buildGetFlexregProgramDetailsEndPoint, buildGetFlexregProgramEnrollmentParams, buildGetFlexregProgramFeesEndPoint, buildGetFlexregProgramsParams, GET_FLEX_REG_ENROLLMENT_DEFAULT_FIELDS, GET_FLEX_REG_ENROLLMENT_OUT_FIELDS, GET_FLEX_REG_PROGRAMS_DEFAULT_FIELDS, GET_FLEX_REG_PROGRAMS_OUT_FIELDS, GET_FLEXREG_CUSTOMER_ENROLLMENT_TOOL, GET_FLEXREG_PROGRAM_DATES_TOOL, GET_FLEXREG_PROGRAM_DETAIL_TOOL, GET_FLEXREG_PROGRAM_ENROLLMENT_TOOL, GET_FLEXREG_PROGRAM_EXPANDED_DETAIL_TOOL, GET_FLEXREG_PROGRAM_FEES_TOOL, GET_FLEXREG_PROGRAM_TYPES_TOOL, GET_FLEXREG_PROGRAMS_TOOL, GET_FLEXREG_SESSION_ENROLLMENT_TOOL, GET_FLEXREG_SESSION_EXPANDED_DETAIL_TOOL } from "./flexregToolDetails";

export const FLEXREG_TOOLS: AnetTool[] = [
  {
    definition: GET_FLEXREG_PROGRAMS_TOOL,
    endPoint: '/api/v1/flexregprograms',
    pageSize: 500,
    queryParamBuilder: buildGetFlexregProgramsParams,
    endPointName: 'GetFlexRegPrograms',
    availableOutputFields: GET_FLEX_REG_PROGRAMS_OUT_FIELDS,
    defaultOutputFields: GET_FLEX_REG_PROGRAMS_DEFAULT_FIELDS,
  },
  {
    definition: GET_FLEXREG_PROGRAM_DETAIL_TOOL,
    endPoint: buildGetFlexregProgramDetailsEndPoint,
    endPointName: 'GetFlexRegProgramDetail'
  },
  {
    definition: GET_FLEXREG_PROGRAM_FEES_TOOL,
    endPoint: buildGetFlexregProgramFeesEndPoint,
    endPointName: 'GetFlexRegProgramFees',
  },
  {
    definition: GET_FLEXREG_PROGRAM_TYPES_TOOL,
    endPoint: '/api/v1/flexregprogramtypes',
    endPointName: 'GetFlexRegProgramTypes',
  },
  {
    definition: GET_FLEXREG_PROGRAM_ENROLLMENT_TOOL,
    endPoint: '/api/v1/flexregenrollment',
    pageSize: 200,
    queryParamBuilder: buildGetFlexregProgramEnrollmentParams,
    endPointName: 'GetFlexRegEnrollment',
    availableOutputFields: GET_FLEX_REG_ENROLLMENT_OUT_FIELDS,
    defaultOutputFields: GET_FLEX_REG_ENROLLMENT_DEFAULT_FIELDS
  },
  {
    definition: GET_FLEXREG_SESSION_ENROLLMENT_TOOL,
    endPoint: '/api/v1/flexregenrollment',
    pageSize: 200,
    queryParamBuilder: buildGetFlexregProgramEnrollmentParams,
    endPointName: 'GetFlexRegEnrollment',
    availableOutputFields: GET_FLEX_REG_ENROLLMENT_OUT_FIELDS,
    defaultOutputFields: GET_FLEX_REG_ENROLLMENT_DEFAULT_FIELDS
  },
  {
    definition: GET_FLEXREG_CUSTOMER_ENROLLMENT_TOOL,
    endPoint: '/api/v1/flexregenrollment',
    pageSize: 200,
    queryParamBuilder: buildGetFlexregProgramEnrollmentParams,
    endPointName: 'GetFlexRegEnrollment',
    availableOutputFields: GET_FLEX_REG_ENROLLMENT_OUT_FIELDS,
    defaultOutputFields: GET_FLEX_REG_ENROLLMENT_DEFAULT_FIELDS
  },
    {
    definition: GET_FLEXREG_PROGRAM_EXPANDED_DETAIL_TOOL,
    endPoint: '/api/v1/flexregexpandeddetail',
    pageSize: 500,
    queryParamBuilder: buildGetFlexregExpandedDetailParams,
    endPointName: 'GetFlexregExpandedDetail'
  },
  {
    definition: GET_FLEXREG_SESSION_EXPANDED_DETAIL_TOOL,
    endPoint: '/api/v1/flexregexpandeddetail',
    pageSize: 500,
    queryParamBuilder: buildGetFlexregExpandedDetailParams,
    endPointName: 'GetFlexregExpandedDetail'
  },
  {
    definition: GET_FLEXREG_PROGRAM_DATES_TOOL,
    endPoint: '/api/v1/flexregprogramdates',
    queryParamBuilder: buildGetFlexregProgramDatesParams,
    endPointName: 'GetFlexRegProgramDates'
  }
];
