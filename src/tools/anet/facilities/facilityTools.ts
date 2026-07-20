import { AnetTool } from "../anetTool";
import { buildCenterEquipmentParams, buildEquipmentDetailsParams, buildGetEquipmentSchedulesParams, buildGetFacilityChargeMatrixParams, buildGetFacilityDetailsEndPoint, buildGetFacilityOpenHoursEndPoint, buildGetFacilityParams, buildGetFacilitySchedulesParams, buildGetGeneralChargeMatrixParams, buildGetInstructorSchedulesParams, buildSkipDatesParams, GET_CENTER_EQUIPMENTS_TOOL, GET_EQUIPMENT_DEFAULT_FIELDS, GET_EQUIPMENT_DETAILS_TOOL, GET_EQUIPMENT_OUT_FIELDS, GET_EQUIPMENT_SCHEDULES_DEFAULT_FIELDS, GET_EQUIPMENT_SCHEDULES_OUT_FIELDS, GET_EQUIPMENT_SCHEDULES_TOOL, GET_EQUIPMENT_TYPES_TOOL, GET_EVENT_TYPES_TOOL, GET_FACILITIES_DEFAULT_FIELDS, GET_FACILITIES_OUT_FIELDS, GET_FACILITIES_TOOL, GET_FACILITY_CHARGE_MATRIX_DEFAULT_FIELDS, GET_FACILITY_CHARGE_MATRIX_OUT_FIELDS, GET_FACILITY_CHARGE_MATRIX_TOOL, GET_FACILITY_DETAILS_TOOL, GET_FACILITY_OPEN_HOURS_TOOL, GET_FACILITY_SCHEDULES_DEFAULT_FIELDS, GET_FACILITY_SCHEDULES_OUT_FIELDS, GET_FACILITY_SCHEDULES_TOOL, GET_FACILITY_TYPES_TOOL, GET_GENERAL_CHARGE_MATRIX_TOOL, GET_INSTRUCTOR_SCHEDULES_DEFAULT_FIELDS, GET_INSTRUCTOR_SCHEDULES_OUT_FIELDS, GET_INSTRUCTOR_SCHEDULES_TOOL, GET_PREP_CODES_TOOL, GET_RESERVATION_GROUPS_TOOL, GET_SCHEDULE_TYPES_TOOL, GET_SKIP_DATES_TOOL } from "./facilityToolDetails";

export const FACILITY_TOOLS: AnetTool[] = [
  {
    definition: GET_FACILITIES_TOOL,
    endPoint: '/api/v1/facilities',
    pageSize: 500,
    queryParamBuilder: buildGetFacilityParams,
    endPointName: 'GetFacilities',
    availableOutputFields: GET_FACILITIES_OUT_FIELDS,
    defaultOutputFields: GET_FACILITIES_DEFAULT_FIELDS,
  },
  {
    definition: GET_FACILITY_DETAILS_TOOL,
    endPoint: buildGetFacilityDetailsEndPoint,
    endPointName: 'GetFacilityDetail',
  },
  {
    definition: GET_FACILITY_TYPES_TOOL,
    endPoint: '/api/v1/facilitytypes',
    endPointName: 'GetFacilityTypes',
  },
  {
    definition: GET_FACILITY_SCHEDULES_TOOL,
    endPoint: '/api/v1/facilityschedules',
    pageSize: 500,
    queryParamBuilder: buildGetFacilitySchedulesParams,
    endPointName: 'GetFacilitySchedules',
    availableOutputFields: GET_FACILITY_SCHEDULES_OUT_FIELDS,
    defaultOutputFields: GET_FACILITY_SCHEDULES_DEFAULT_FIELDS,
  },
  {
    definition: GET_FACILITY_OPEN_HOURS_TOOL,
    endPoint: buildGetFacilityOpenHoursEndPoint,
    endPointName: 'GetFacilityOpenHours',
  },
  {
    definition: GET_GENERAL_CHARGE_MATRIX_TOOL,
    endPoint: '/api/v1/facilitychargematrix',
    pageSize: 500,
    queryParamBuilder: buildGetGeneralChargeMatrixParams,
    endPointName: 'GetFacilityChargeMatrix',
    availableOutputFields: GET_FACILITY_CHARGE_MATRIX_OUT_FIELDS,
    defaultOutputFields: GET_FACILITY_CHARGE_MATRIX_DEFAULT_FIELDS
  },
  {
    definition: GET_FACILITY_CHARGE_MATRIX_TOOL,
    endPoint: '/api/v1/facilitychargematrix',
    pageSize: 500,
    queryParamBuilder: buildGetFacilityChargeMatrixParams,
    endPointName: 'GetFacilityChargeMatrix',
    availableOutputFields: GET_FACILITY_CHARGE_MATRIX_OUT_FIELDS,
    defaultOutputFields: GET_FACILITY_CHARGE_MATRIX_DEFAULT_FIELDS
  },
  {
    definition: GET_EVENT_TYPES_TOOL,
    endPoint: '/api/v1/eventtypes',
    endPointName: 'GetEventTypes'
  },
  {
    definition: GET_RESERVATION_GROUPS_TOOL,
    endPoint: '/api/v1/reservationgroups',
    endPointName: 'GetReservationGroups'
  },
  {
    definition: GET_PREP_CODES_TOOL,
    endPoint: '/api/v1/prepcodes',
    endPointName: 'GetPrepCodes'
  },
  {
    definition: GET_SCHEDULE_TYPES_TOOL,
    endPoint: '/api/v1/scheduletypes',
    endPointName: 'GetScheduleTypes'
  },
  {
    definition: GET_SKIP_DATES_TOOL,
    endPoint: '/api/v1/skipdates',
    pageSize: 500,
    queryParamBuilder: buildSkipDatesParams,
    endPointName: 'GetSkipDates'
  },
  {
    definition: GET_INSTRUCTOR_SCHEDULES_TOOL,
    endPoint: '/api/v1/instructorschedules',
    pageSize: 500,
    queryParamBuilder: buildGetInstructorSchedulesParams,
    endPointName: 'GetInstructorSchedules',
    availableOutputFields: GET_INSTRUCTOR_SCHEDULES_OUT_FIELDS,
    defaultOutputFields: GET_INSTRUCTOR_SCHEDULES_DEFAULT_FIELDS
  },
  {
    definition: GET_EQUIPMENT_TYPES_TOOL,
    endPoint: '/api/v1/equipmenttypes',
    endPointName: 'GetEquipmentTypes'
  },
  {
    definition: GET_EQUIPMENT_DETAILS_TOOL,
    endPoint: '/api/v1/equipment',
    queryParamBuilder: buildEquipmentDetailsParams,
    endPointName: 'GetEquipment'
  },
  {
    definition: GET_CENTER_EQUIPMENTS_TOOL,
    endPoint: '/api/v1/equipment',
    pageSize: 500,
    queryParamBuilder: buildCenterEquipmentParams,
    endPointName: 'GetEquipment',
      availableOutputFields: GET_EQUIPMENT_OUT_FIELDS,
      defaultOutputFields: GET_EQUIPMENT_DEFAULT_FIELDS
  },
  {
    definition: GET_EQUIPMENT_SCHEDULES_TOOL,
    endPoint: '/api/v1/equipmentschedules',
    pageSize: 500,
    queryParamBuilder: buildGetEquipmentSchedulesParams,
    endPointName: 'GetEquipmentSchedules',
    availableOutputFields: GET_EQUIPMENT_SCHEDULES_OUT_FIELDS,
    defaultOutputFields: GET_EQUIPMENT_SCHEDULES_DEFAULT_FIELDS
  }
];
