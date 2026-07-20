import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { appendPositiveInteger, appendStrictlyPositiveInteger, appendStrictlyPositiveIntegerArray, appendString } from '../utils/anetToolUtils';

/**
 * Tool definition for list_states.
 */
export const SEARCH_CUSTOMER_TOOL: Tool = {
  name: 'search_customers',
  description: 'Search customers using flexible filters such as name, email, phone or customer_ids',
  inputSchema: {
    type: 'object',
    properties: {
      customer_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'Optional list of customer IDs. Max supported length is 500. Useful to restrict the search to some customers.'
      },
      last_name: {
        type: 'string',
        description: 'Optional last name (partial match allowed, depending on configuration).'
      },
      first_name: {
        type: 'string',
        description: 'Optional first name (partial match allowed, depending on configuration).'
      },
      min_age: {
        type: 'integer',
        description: 'Optional minimum age of the customers to search.'
      },
      max_age: {
        type: 'integer',
        description: 'Optional maximum age of the customers to search.'
      },
      activity_id: {
        type: 'string',
        description: 'Optional activity id to search only between the customers enrolled to a given activity'
      },
      site_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'Optional list of sites assigned to the searched customers. Only customers assigned to one of the given sites will be returned. Max 5 sites'
      },
      email: {
        type: 'string',
        description: 'Optional primary email address.'
      },
      phone: {
        type: 'string',
        description: 'Optional primary phone number.'
      }
    }
  }
};

export const GET_CUSTOMERS_OUT_FIELDS = ['additional_email', 'age', 'age_category', 'agree_receive_text_message', 'alternate_keys.alternate_key_id', 'alternate_keys.alternate_key_status', 'alternate_keys.alternate_key_type', 'birth_date', 'cell_phone', 'country', 'created_on', 'customer_general_alert', 'customer_id', 'customer_medical_alert', 'customer_notes', 'customer_title', 'customer_type', 'date_time_modified', 'email', 'emergency_contact1_first_name', 'emergency_contact1_last_name', 'emergency_contact1_other_phone', 'emergency_contact1_phone', 'emergency_contact1_relation', 'emergency_contact2_first_name', 'emergency_contact2_last_name', 'emergency_contact2_other_phone', 'emergency_contact2_phone', 'emergency_contact2_relation', 'encrypted_customer_id', 'families.external_id', 'families.family_id', 'families.family_role', 'families.head_of_household', 'families.head_of_household_customer_email', 'families.head_of_household_customer_first_name', 'families.head_of_household_customer_id', 'families.head_of_household_customer_last_name', 'families.household_size', 'fax_phone', 'first_name', 'gender', 'geographic_area', 'grade', 'guardian_contact_id', 'guardian_email', 'has_active_membership', 'head_of_household', 'home_phone', 'interest_date', 'last_name', 'last_transaction_date', 'late_fee_date', 'legal_name', 'login_created', 'login_used', 'mailing_address1', 'mailing_address2', 'mailing_city', 'mailing_name', 'mailing_state_or_province', 'mailing_zip_code', 'middle_name', 'mobile_carrier', 'no_mail', 'no_postal_mail', 'not_online_activated', 'occupation', 'other_phone', 'pager_phone', 'photo_key', 'residency_expire_date', 'resident_status', 'residential_address1', 'residential_address2', 'residential_city', 'residential_state_or_province', 'residential_zip_code', 'retired_status', 'skills.evaluation_date', 'skills.evaluator', 'skills.evaluator_comment', 'skills.expiry_date', 'skills.skill_id', 'skills.skill_title', 'special_handling', 'work_phone'];
export const GET_CUSTOMERS_DEFAULT_FIELDS = ['customer_id', 'first_name', 'last_name', 'customer_type', 'residential_address1', 'residential_city', 'email', 'home_phone', 'work_phone', 'cell_phone', 'birth_date', 'gender', 'retired_status', 'families.family_id', 'families.family_role', 'skills.skill_id', 'grade', 'age_category', 'resident_status'];

export function buildSearchCustomersParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {

  appendStrictlyPositiveIntegerArray(queryParams, 'customer_ids', args.customer_ids, definition, 500);
  appendString(queryParams, 'last_name', args.last_name, definition);
  appendString(queryParams, 'first_name', args.first_name, definition);
  appendPositiveInteger(queryParams, 'min_age', args.min_age, definition);
  appendPositiveInteger(queryParams, 'max_age', args.max_age, definition);
  appendStrictlyPositiveInteger(queryParams, 'activity_id', args.activity_id, definition);
  appendStrictlyPositiveIntegerArray(queryParams, 'site_ids', args.site_ids, definition, 5);
  appendString(queryParams, 'email', args.email, definition);
  appendString(queryParams, 'phone', args.phone, definition);

  // Set otherwise the request may fail if no other filters are provided.
  appendString(queryParams, 'modified_date_from', '2000-01-01', definition);
}

export const GET_CUSTOMER_DETAILS_TOOL: Tool = {
  name: 'get_customer_by_id',
  description: 'Get the information about a customer.',
  inputSchema: {
    type: 'object',
    properties: {
      customerId: {
        type: 'integer',
      }
    }
  }
};

export function buildGetCustomerDetailsParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendStrictlyPositiveInteger(queryParams, 'customer_id', args.customerId, definition);

  // Set otherwise the request may fail as no other filters are provided.
  appendString(queryParams, 'modified_date_from', '2000-01-01', definition);
}

const QUESTION_ID = 'question_id';
const ACTIVITY_ID = 'activity_id';
const PACKAGE_ID = 'package_id';
const PROGRAM_ID = 'program_id';
const EVENT_TYPE_ID = 'event_type_id';
const ACCOUNT_CREATION_TYPE = 'account_creation_type';

export const GET_CUSTOM_QUESTIONS_TOOL: Tool = {
  name: 'get_custom_questions',
  description: 'Retrieve custom questions. Questions can be retrieved by by a question id, an activity id, a package id, Flexreg program id, event type id or account creation type',
  inputSchema: {
    type: 'object',
    properties: {
      id_type: {
        type: 'string',
        description: `Type of the id used for retrieving the custom questions. Values are "${QUESTION_ID}", "${ACTIVITY_ID}", "${PACKAGE_ID}", "${PROGRAM_ID}", "${EVENT_TYPE_ID}" and "${ACCOUNT_CREATION_TYPE}".`
      },
      id: {
        type: 'integer',
        description: 'Id used for retrieving the custom questions. Depending on the type, it can be a question id, an activity id, a package id, Flexreg program id, event type id or account creation type (1=individual, 2=family)'
      }
    },
    required: ['id_type', 'id']
  }
};

export const GET_CUSTOM_QUESTIONS_OUT_FIELDS = ['answer_format', 'answer_required', 'answer_type', 'auto_fill_conditional_answers.age_from', 'auto_fill_conditional_answers.age_to', 'auto_fill_conditional_answers.answer', 'auto_fill_conditional_answers.gender', 'custom_question_id', 'custom_question_text', 'custom_question_title', 'default_answer', 'display', 'maximum_length', 'modified_date_time', 'multiple_choice_answers.answer', 'multiple_choice_answers.answer_code', 'multiple_choice_answers.default_response', 'multiple_choice_answers.demographic', 'multiple_choice_answers.sub_question', 'prevent_further_use', 'question_scope', 'use_answer_code'];
export const GET_CUSTOM_QUESTIONS_DEFAULT_FIELDS = ['custom_question_id', 'custom_question_title', 'custom_question_text', 'answer_type', 'answer_required', 'display', 'prevent_further_use'];

export function buildGetCustomQuestionsParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  switch (args.id_type) {
    case QUESTION_ID:
      appendStrictlyPositiveInteger(queryParams, 'custom_question_id', args.id, definition);
      break;
    case ACTIVITY_ID:
      appendStrictlyPositiveInteger(queryParams, 'activity_id', args.id, definition);
      break;
    case PACKAGE_ID:
      appendStrictlyPositiveInteger(queryParams, 'package_id', args.id, definition);
      break;
    case PROGRAM_ID:
      appendStrictlyPositiveInteger(queryParams, 'program_id', args.id, definition);
      break;
    case EVENT_TYPE_ID:
      appendStrictlyPositiveInteger(queryParams, 'event_type_id', args.id, definition);
      break;
    case ACCOUNT_CREATION_TYPE:
      appendStrictlyPositiveInteger(queryParams, 'account_creation_type', args.id, definition);
      break;
    default:
      throw new Error(`Invalid id_type ${args.id_type}. Valid values are "${QUESTION_ID}", "${ACTIVITY_ID}", "${PACKAGE_ID}", "${PROGRAM_ID}", "${EVENT_TYPE_ID}" and "${ACCOUNT_CREATION_TYPE}".`)
  }
}

const PERMIT_NUMBER = 'permit_number';
const CUSTOMER_ID = 'customer_id';

export const GET_CUSTOM_QUESTION_ANSWERS_TOOL: Tool = {
  name: 'get_custom_question_answers',
  description: 'Retrieve custom question answers. Answers can be retrieved by by an activity id, a package id, Flexreg program id, permit number or customer id',
  inputSchema: {
    type: 'object',
    properties: {
      id_type: {
        type: 'string',
        description: `Type of the id used for retrieving the custom question answers. Values are  "${ACTIVITY_ID}", "${PACKAGE_ID}", "${PROGRAM_ID}", "${PERMIT_NUMBER}" and "${CUSTOMER_ID}".`
      },
      id: {
        type: 'integer',
        description: 'Id used for retrieving the custom question answers. Depending on the type, it can be an activity id, a package id, a Flexreg program id, a permit number or a customer id'
      }
    },
    required: ['id_type', 'id']
  }
};

export const GET_CUSTOM_QUESTION_ANSWERS_OUT_FIELDS = ['activity_id', 'activity_name', 'activity_number', 'activity_status', 'answer_for', 'customer_id', 'event_name', 'event_type', 'first_name', 'last_name', 'package_id', 'package_name', 'permit_number', 'permit_status', 'program_id', 'program_name', 'program_number', 'program_status', 'question_answers.answer', 'question_answers.question', 'question_answers.question_id', 'question_answers.time_stamp', 'receipt_number'];
export const GET_CUSTOM_QUESTION_ANSWERS_DEFAULT_FIELDS = ['customer_id', 'first_name', 'last_name', 'question_answers.question_id', 'question_answers.question', 'question_answers.answer', 'answer_for', 'activity_id', 'program_id', 'package_id'];

export function buildGetCustomQuestionAnswersParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  switch (args.id_type) {
    case ACTIVITY_ID:
      appendStrictlyPositiveInteger(queryParams, 'activity_id', args.id, definition);
      break;
    case PACKAGE_ID:
      appendStrictlyPositiveInteger(queryParams, 'package_id', args.id, definition);
      break;
    case PROGRAM_ID:
      appendStrictlyPositiveInteger(queryParams, 'program_id', args.id, definition);
      break;
    case PERMIT_NUMBER:
      appendStrictlyPositiveInteger(queryParams, 'permit_number', args.id, definition);
      break;
    case CUSTOMER_ID:
      appendStrictlyPositiveInteger(queryParams, 'customer_id', args.id, definition);
      break;
    default:
      throw new Error(`Invalid id_type ${args.id_type}. Valid values are "${ACTIVITY_ID}", "${PACKAGE_ID}", "${PROGRAM_ID}", "${PERMIT_NUMBER}" and "${CUSTOMER_ID}".`)
  }
}

export const GET_PROSPECT_CUSTOM_QUESTION_ANSWERS_TOOL: Tool = {
  name: 'get_prospect_custom_question_answers',
  description: 'Retrieve answers for prospect custom questions',
  inputSchema: {
    type: 'object',
    properties: {
      customer_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'Ids of the customers for which the answers are retrieved. Max 500 ids.',
      },
    },
    required: ['customer_ids']
  }
};

export function buildGetProspectCustomQuestionAnswersParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendStrictlyPositiveIntegerArray(queryParams, 'customer_ids', args.customer_ids, definition, 500);
}

export const GET_FAMILY_MEMBERS_TOOL: Tool = {
  name: 'get_family_members',
  description: 'Retrieve details of all the customers linked to one or several families. Use this to understand family structure and related customers',
  inputSchema: {
    type: 'object',
    properties: {
      family_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'One or more family ids. Up to 500 ids can be given. The family id of a given customer can be retrieved with the search_customers tool. Max 500 ids',
      },
    },
    required: ['family_ids']
  }
};

export const GET_FAMILY_MEMBERS_OUT_FIELDS = ['age', 'age_category', 'birth_date', 'customer_id', 'customer_type', 'date_time_modified', 'encrypted_customer_id', 'families.family_id', 'first_name', 'gender', 'last_name', 'retired_status'];
export const GET_FAMILY_MEMBERS_DEFAULT_FIELDS = ['customer_id', 'first_name', 'last_name', 'customer_type', 'families.family_id'];

export function buildGetFamilyMembersParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendStrictlyPositiveIntegerArray(queryParams, 'family_ids', args.family_ids, definition, 500);
}
