import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { appendStrictlyPositiveIntegerArray, appendString } from "../utils/anetToolUtils";

export const GET_REFUNDS_TOOL: Tool = {
  name: 'get_refunds',
  description: 'Retrieve enrollment information for one or more customers. Supports filtering by enrollment_status and date_after.',
  inputSchema: {
    type: 'object',
    properties: {
      date_from: {
        type: 'string',
        description: 'The start date and time from which to retrieve refund transaction information. Format is YYYY-MM-DD HH:MM.'
      },
      date_to: {
        type: 'string',
        description: 'The end date and time up to which to retrieve refund transaction information. Must be within a month after date_from. Format is YYYY-MM-DD HH:MM.'
      },
      gl_account_numbers: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'The G/L account numbers paying out the refund. Multiple GL account numbers can be specified'
      },
      revenue_site_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'Ids of revenue sites.'
      },
      transaction_site_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'Ids of transaction sites.'
      },
      payment_type_ids: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'Ids of the payment types. Each payment can be any of Mail Cheque-6, Cash-7, Credit Card-8, To Account-10, No Money-11, Gift Card-19, Debit Card-23.'
      }
    },
    required: ['date_from', 'date_to']
  }
};

export const GET_REFUNDS_OUT_FIELDS = ['gl_account_name_refund_from','gl_account_name_refund_to','gl_account_number_refund_from','gl_account_number_refund_to','original_receipt_number','payee_cell_phone','payee_company_id','payee_company_name','payee_customer_id','payee_customer_name','payee_home_phone','payee_mailing_address1','payee_mailing_address2','payee_mailing_city','payee_mailing_state_or_province','payee_mailing_zip_code','payee_other_phone','payee_residential_address1','payee_residential_address2','payee_residential_city','payee_residential_state_or_province','payee_residential_zip_code','payee_work_phone','payment_type','payment_type_id','receipt_date','receipt_number','receipt_time','refund_amount','refund_detail','transaction_site','transaction_site_id'];
export const GET_REFUNDS_DEFAULT_FIELDS = ['receipt_number','receipt_date','refund_amount','refund_detail','payment_type','payee_customer_id','payee_company_id','gl_account_number_refund_from','gl_account_number_refund_to','transaction_site_id'];

export function buildGetRefundsParams(queryParams: URLSearchParams, definition: Tool, args: Record<string, any>): void {
  appendString(queryParams, 'date_time_from', args.date_from, definition);
  appendString(queryParams, 'date_time_to', args.date_to, definition);
  appendStrictlyPositiveIntegerArray(queryParams, 'gl_account_number_refund_from', args.gl_account_numbers, definition);
  appendStrictlyPositiveIntegerArray(queryParams, 'revenue_site_ids', args.revenue_site_ids, definition);
  appendStrictlyPositiveIntegerArray(queryParams, 'transaction_site_ids', args.transaction_site_ids, definition);
  appendStrictlyPositiveIntegerArray(queryParams, 'payment_type_ids', args.payment_type_ids, definition);
}
