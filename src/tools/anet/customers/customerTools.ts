import { AnetTool } from "../anetTool";
import { buildGetCustomerDetailsParams, buildGetCustomQuestionAnswersParams, buildGetCustomQuestionsParams, buildGetFamilyMembersParams, buildGetProspectCustomQuestionAnswersParams, buildSearchCustomersParams, GET_CUSTOM_QUESTION_ANSWERS_DEFAULT_FIELDS, GET_CUSTOM_QUESTION_ANSWERS_OUT_FIELDS, GET_CUSTOM_QUESTION_ANSWERS_TOOL, GET_CUSTOM_QUESTIONS_DEFAULT_FIELDS, GET_CUSTOM_QUESTIONS_OUT_FIELDS, GET_CUSTOM_QUESTIONS_TOOL, GET_CUSTOMER_DETAILS_TOOL, GET_CUSTOMERS_DEFAULT_FIELDS, GET_CUSTOMERS_OUT_FIELDS, GET_FAMILY_MEMBERS_DEFAULT_FIELDS, GET_FAMILY_MEMBERS_OUT_FIELDS, GET_FAMILY_MEMBERS_TOOL, GET_PROSPECT_CUSTOM_QUESTION_ANSWERS_TOOL, SEARCH_CUSTOMER_TOOL } from "./customerToolDetails";

export const CUSTOMER_TOOLS: AnetTool[] = [
  {
    definition: SEARCH_CUSTOMER_TOOL,
    endPoint: '/api/v1/customers',
    pageSize: 500,
    queryParamBuilder: buildSearchCustomersParams,
    endPointName: 'GetCustomers',
    availableOutputFields: GET_CUSTOMERS_OUT_FIELDS,
    defaultOutputFields: GET_CUSTOMERS_DEFAULT_FIELDS
  },
  {
    definition: GET_CUSTOMER_DETAILS_TOOL,
    endPoint: '/api/v1/customers',
    queryParamBuilder: buildGetCustomerDetailsParams,
    endPointName: 'GetCustomers',
  },
  {
    definition: GET_CUSTOM_QUESTIONS_TOOL,
    endPoint: '/api/v1/customquestions',
    queryParamBuilder: buildGetCustomQuestionsParams,
    endPointName: 'GetCustomQuestions',
    availableOutputFields: GET_CUSTOM_QUESTIONS_OUT_FIELDS,
    defaultOutputFields: GET_CUSTOM_QUESTIONS_DEFAULT_FIELDS,
  },
  {
    definition: GET_CUSTOM_QUESTION_ANSWERS_TOOL,
    endPoint: '/api/v1/customquestionanswers',
    pageSize: 500,
    queryParamBuilder: buildGetCustomQuestionAnswersParams,
    endPointName: 'GetCustomQuestionAnswers',
    availableOutputFields: GET_CUSTOM_QUESTION_ANSWERS_OUT_FIELDS,
    defaultOutputFields: GET_CUSTOM_QUESTION_ANSWERS_DEFAULT_FIELDS,
  },
  {
    definition: GET_PROSPECT_CUSTOM_QUESTION_ANSWERS_TOOL,
    endPoint: '/api/v1/prospectcustomquestionanswers',
    pageSize: 500,
    queryParamBuilder: buildGetProspectCustomQuestionAnswersParams,
    endPointName: 'GetProspectCustomQuestionAnswers',
  },
  {
    definition: GET_FAMILY_MEMBERS_TOOL,
    endPoint: '/api/v1/familymembers',
    queryParamBuilder: buildGetFamilyMembersParams,
    endPointName: 'GetFamilyMembers',
    availableOutputFields: GET_FAMILY_MEMBERS_OUT_FIELDS,
    defaultOutputFields: GET_FAMILY_MEMBERS_DEFAULT_FIELDS,
  }
];
