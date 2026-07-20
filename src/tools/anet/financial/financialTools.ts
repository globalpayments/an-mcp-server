import { AnetTool } from "../anetTool";
import { buildGetRefundsParams, GET_REFUNDS_DEFAULT_FIELDS, GET_REFUNDS_OUT_FIELDS, GET_REFUNDS_TOOL } from "./financialToolDetails";

export const FINANCIAL_TOOLS: AnetTool[] = [
  {
    definition: GET_REFUNDS_TOOL,
    endPoint: '/api/v1/refunds',
    pageSize: 500,
    queryParamBuilder: buildGetRefundsParams,
    endPointName: 'GetRefunds',
    availableOutputFields: GET_REFUNDS_OUT_FIELDS,
    defaultOutputFields: GET_REFUNDS_DEFAULT_FIELDS,
  }
];
