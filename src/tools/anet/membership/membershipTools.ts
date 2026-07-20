import { AnetTool } from "../anetTool";
import { buildGetMembershipPackageFeesEndpoint, buildGetMembershipPackagesParams, buildGetMembershipsParams, buildGetMembershipUsagesParams, GET_MEMBERSHIP_PACKAGE_CATEGORIES_TOOL, GET_MEMBERSHIP_PACKAGE_FEES_TOOL, GET_MEMBERSHIP_PACKAGES_DEFAULT_FIELDS, GET_MEMBERSHIP_PACKAGES_OUT_FIELDS, GET_MEMBERSHIP_PACKAGES_TOOL, GET_MEMBERSHIP_USAGES_DEFAULT_FIELDS, GET_MEMBERSHIP_USAGES_OUT_FIELDS, GET_MEMBERSHIP_USAGES_TOOL, GET_MEMBERSHIPS_DEFAULT_FIELDS, GET_MEMBERSHIPS_OUT_FIELDS, GET_MEMBERSHIPS_TOOL } from "./membershipToolDetails";

export const MEMBERSHIP_TOOLS: AnetTool[] = [
    {
        definition: GET_MEMBERSHIP_PACKAGES_TOOL,
        endPoint: '/api/v1/membershippackages',
        pageSize: 200,
        queryParamBuilder: buildGetMembershipPackagesParams,
        endPointName: 'GetMembershipPackages',
        availableOutputFields: GET_MEMBERSHIP_PACKAGES_OUT_FIELDS,
        defaultOutputFields: GET_MEMBERSHIP_PACKAGES_DEFAULT_FIELDS
    },
    {
        definition: GET_MEMBERSHIPS_TOOL,
        endPoint: '/api/v1/memberships',
        pageSize: 200,
        queryParamBuilder: buildGetMembershipsParams,
        endPointName: 'GetMemberships',
        availableOutputFields: GET_MEMBERSHIPS_OUT_FIELDS,
        defaultOutputFields: GET_MEMBERSHIPS_DEFAULT_FIELDS
    },
    {
        definition: GET_MEMBERSHIP_PACKAGE_CATEGORIES_TOOL,
        endPoint: '/api/v1/membershippackagecategories',
        endPointName: 'GetMembershipPackageCategories'
    },
    {
        definition: GET_MEMBERSHIP_USAGES_TOOL,
        endPoint: '/api/v1/membershipusages',
        pageSize: 500,
        queryParamBuilder: buildGetMembershipUsagesParams,
        endPointName: 'GetMembershipUsages',
        availableOutputFields: GET_MEMBERSHIP_USAGES_OUT_FIELDS,
        defaultOutputFields: GET_MEMBERSHIP_USAGES_DEFAULT_FIELDS
    },
    {
        definition: GET_MEMBERSHIP_PACKAGE_FEES_TOOL,
        endPoint: buildGetMembershipPackageFeesEndpoint,
        endPointName: 'GetMembershipPackageFees',
    }
];
