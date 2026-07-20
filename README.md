# ActiveNet MCP SDK 
### ActiveNet OpenAPI MCP Server (TypeScript)

A Model Context Protocol (MCP) server for ActiveNet OpenAPI integration, enabling AI agents to interact with ActiveNet services using TypeScript/Node.js.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [System Parameter Configuration](#system-parameter-configuration)
- [Available Tools](#available-tools)

## About

This MCP server bridges AI agents (like Claude or GitHub Copilot) with ActiveNet OpenAPI services. Tool loading is controlled by `PRODUCT` and system parameters are read from MCP client configuration (`mcp.json` / `claude_desktop_config.json`) through environment variables.

## Features

- ActiveNet OpenAPI MCP

## Prerequisites

- Node.js 18.0 or higher
- npm
- Request the ACTIVENET OPENAPI key and token.
- Claude Desktop, VS Code with Copilot, or another MCP-compatible client

  > **Note:** Use least-privilege credentials for your ActiveNet integration.

## Installation

1. **Clone the repository**
   ```sh
   git clone git@gitlab.dev.activenetwork.com:ActiveNet/activenet-mcp-sdk.git
   cd activenet-mcp-sdk
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Build the project**
    ```sh
    npm run build:clean && npm run build
    ```

4. **Prepare environment variables**
   
   Runtime settings are read from environment variables. In MCP usage, these are provided by your MCP client configuration file (`mcp.json` / `claude_desktop_config.json`) via the `env` object.

   You can still keep a local `.env` for reference or local scripts:
   
    ```env
    # Product switch: anet | aw | pos
    # Default: anet
    PRODUCT=anet

    # ActiveNet settings (used when PRODUCT=anet)
    ACTIVENET_HOST=api.amp.active.com/anet-systemapi-stg-secret
    ACTIVENET_ORG=your_org
    ACTIVENET_API_KEY=your_api_key
    ACTIVENET_SHARED_SECRET=your_shared_secret

    # Backward compatibility only (deprecated):
    # ACTIVE=true or active=true maps to PRODUCT=anet when PRODUCT is not set.
    ```
   
   
   > **Note:** For MCP clients, prefer setting values in the client `env` block. The server reads `process.env` at startup.
   
5. **Configure Your MCP Client**

   #### For Claude Desktop
   
   Add to your `claude_desktop_config.json`:
   ```json
   {
     "mcpServers": {
       "activenet": {
         "command": "node",
         "args": [
           "/absolute/path/to/activenet-mcp-sdk/lib/index.js"
         ],
         "cwd": "/absolute/path/to/activenet-mcp-sdk",
         "env":{
          "PRODUCT":"anet",
          "ACTIVENET_HOST":"api.amp.active.com/anet-systemapi-stg-secret",
          "ACTIVENET_ORG":"your_org",
          "ACTIVENET_API_KEY":"your_api_key",
          "ACTIVENET_SHARED_SECRET":"your_shared_secret"
         }
       }
     }
   }
   ```

   #### For VS Code (Copilot)
   
   Add to your VS Code MCP settings file (`mcp.json`):
   ```json
   {
     "servers": {
       "activenet": {
         "command": "node",
         "args": [
           "lib/index.js"
         ],
         "cwd": "/absolute/path/to/activenet-mcp-sdk",
         "env": {
          "PRODUCT": "anet",
          "ACTIVENET_HOST": "api.amp.active.com/anet-systemapi-stg-secret",
          "ACTIVENET_ORG": "your_org",
          "ACTIVENET_API_KEY": "your_api_key",
          "ACTIVENET_SHARED_SECRET": "your_shared_secret"
         }
       }
     }
   }
   ```
   
     **Note:** `PRODUCT` determines which tools are exposed by each server process.

## System Parameter Configuration

The server resolves all runtime parameters from `process.env` (typically injected from your MCP client config).

### PRODUCT-based tool loading

| PRODUCT | Loaded tools |
|---------|--------------|
| `anet` | ActiveNet tool list (`mcp_active-mcp-se_*`) |
| `aw` | Reserved (currently empty tool list) |
| `pos` | Reserved (currently empty tool list) |
| unknown/empty | Fallback to `anet` tool list |

### Parameter notes

| Parameter | Required | Notes |
|-----------|----------|-------|
| `PRODUCT` | No | Default `anet`. Controls which tool list is registered. |
| `ACTIVENET_HOST` | Yes for `anet` | ActiveNet API host value. |
| `ACTIVENET_ORG` | Yes for `anet` | ActiveNet organization code. |
| `ACTIVENET_API_KEY` | Yes for `anet` | ActiveNet API key. |
| `ACTIVENET_SHARED_SECRET` | Yes for `anet` | ActiveNet shared secret. |
| `ACTIVE` / `active` | No | Legacy compatibility only. If true and `PRODUCT` is unset, behaves like `PRODUCT=anet`. |


## Available Tools

This MCP server currently provides ActiveNet tools.

### ActiveNet

| Tool | Description |
|------|-------------|
| `mcp_active-mcp-se_get_organization` | Retrieve the current organization profile including basic configuration, contact information and key organizational settings. |
| `mcp_active-mcp-se_list_sites` | show the information of ActiveNet sites. |
| `mcp_active-mcp-se_list_centers` | List all centers (operational units) for the current organization. Centers are typically buildings, campuses or major locations where activities and services are delivered. |
| `mcp_active-mcp-se_list_seasons` | List all seasons configured for the current organization, including their names and active date ranges. Use this to understand registration periods and seasonal program groupings. |
| `mcp_active-mcp-se_list_skills` | List all skills configured for the current organization, including their names and descriptions. Useful for matching participants or staff to skill-based programs. |
| `mcp_active-mcp-se_list_genders` | List the gender codes and descriptions configured for the organization. Use this when you need valid gender options for customer profiles or registrations. |
| `mcp_active-mcp-se_list_states` | List the state or province codes available for the organization, including abbreviations and descriptions. Use this to validate addresses or provide dropdown choices for state/province fields. |
| `mcp_active-mcp-se_search_activity` | Search activities matching advanced criteria such as name, age range, date ranges, activity type, categories, sites, facilities, gender, day of week, and skill. |
| `mcp_active-mcp-se_get_activity_by_id` | Retrieve complete details for one activity using its unique identifier. |
| `mcp_active-mcp-se_get_activity_fees_by_id` | Retrieve complete fees detail for one activity. |
| `mcp_active-mcp-se_list_activity_categories` | List activity categories configured for the organization. Use these IDs to filter or group activities by high-level category. |
| `mcp_active-mcp-se_list_activity_other_categories` | List secondary or other activity categories configured for the organization. Use these IDs to further classify activities beyond their primary category. |
| `mcp_active-mcp-se_list_activity_types` | List activity types configured for the organization. Use these IDs to filter or group activities by type. |
| `mcp_active-mcp-se_get_activity_expanded_detail` | Retrieve details, enrollment, customer, and custom question answer details for one or more activities in a single call. |
| `mcp_active-mcp-se_get_activity_enrollment` | Retrieve enrollment information for one activity. Supports filtering by enrollment status and date. |
| `mcp_active-mcp-se_get_customers_enrollment` | Retrieve enrollment information for one or more customers. Supports filtering by enrollment status and date. |
| `mcp_active-mcp-se_get_activities_dates` | Retrieve upcoming activity dates for one activity. |
| `mcp_active-mcp-se_search_customers` | Search customers using flexible filters such as name, email, phone or customer IDs. |
| `mcp_active-mcp-se_get_customer_by_id` | Get the information about a customer. |
| `mcp_active-mcp-se_get_custom_questions` | Retrieve custom questions by question ID, activity ID, package ID, FlexReg program ID, event type ID, or account creation type. |
| `mcp_active-mcp-se_get_custom_question_answers` | Retrieve custom question answers by activity ID, package ID, FlexReg program ID, permit number, or customer ID. |
| `mcp_active-mcp-se_get_prospect_custom_question_answers` | Retrieve answers for prospect custom questions. |
| `mcp_active-mcp-se_get_family_members` | Retrieve details of all customers linked to one or several families. |
| `mcp_active-mcp-se_search_facilities` | Search facilities using flexible filters such as name, facility type, center, site, amenity. |
| `mcp_active-mcp-se_get_facility_details` | Get detailed information about a specific facility. |
| `mcp_active-mcp-se_get_facility_types` | Retrieve the list of facility types configured for the current organization. |
| `mcp_active-mcp-se_get_facility_schedules` | Get a list of reservation schedules for one or more facilities during the specified date range. |
| `mcp_active-mcp-se_get_facility_open_hours` | Return default facility opening and closing hours and facility open and close hours. |
| `mcp_active-mcp-se_get_general_charge_matrix` | Return facility charges for the specified request parameters. |
| `mcp_active-mcp-se_get_facility_charge_matrix` | Return facility charges applied to the specified customer type, facility, and event type during reservation. |
| `mcp_active-mcp-se_get_event_types` | Retrieve a list of event types with configured facilities for the organization. |
| `mcp_active-mcp-se_get_reservation_groups` | Retrieve a list of reservation groups with configured facilities for the organization. |
| `mcp_active-mcp-se_get_prep_codes` | Retrieve the list of preparation codes. |
| `mcp_active-mcp-se_get_schedule_types` | Retrieve the list of schedule types of the organization. |
| `mcp_active-mcp-se_get_skip_dates` | Retrieve the list of skip dates for a specific facility. |
| `mcp_active-mcp-se_get_instructor_schedules` | Get a list of reservation schedules for one or more instructors during the specified date range. |
| `mcp_active-mcp-se_get_equipment_types` | Retrieve the list of equipment types configured for the current organization. |
| `mcp_active-mcp-se_get_equipment_details` | Get the details of a specific equipment by its ID. |
| `mcp_active-mcp-se_get_center_equipment` | Retrieve the list of equipment for one or more centers. |
| `mcp_active-mcp-se_get_equipment_schedules` | Get a list of reservation schedules for one or more equipment items during the specified date range. |
| `mcp_active-mcp-se_get_refunds` | Retrieve refund transaction information for a specified date range and optional filters. |
| `mcp_active-mcp-se_get_flexreg_programs` | Search FlexReg programs using filters such as name, type, season, status, category, site, center, gender, and age. |
| `mcp_active-mcp-se_get_flexreg_program_detail` | Get detailed information about a FlexReg program by its ID. |
| `mcp_active-mcp-se_get_flexreg_program_fees` | Get fee information about a FlexReg program by its ID. |
| `mcp_active-mcp-se_get_flexreg_program_types` | List all FlexReg program types configured for the current organization. |
| `mcp_active-mcp-se_get_flexreg_program_expanded_detail` | Get program, enrollment, customer, and custom question answer fields for the specified program. |
| `mcp_active-mcp-se_get_flexreg_session_expanded_detail` | Get programs, enrollments, customers, and custom question answer fields for programs using a specific session. |
| `mcp_active-mcp-se_get_flexreg_program_enrollment` | Get program enrollment information about a FlexReg program by its ID. |
| `mcp_active-mcp-se_get_flexreg_session_enrollment` | Get session enrollment information about a FlexReg session by its ID. |
| `mcp_active-mcp-se_get_flexreg_customer_enrollment` | Get enrollments information for one or more customers. |
| `mcp_active-mcp-se_get_flexreg_program_dates` | Get the dates of a FlexReg program in the next 90 days. |
| `mcp_active-mcp-se_get_membership_packages` | Search for membership packages in the current organization. |
| `mcp_active-mcp-se_get_memberships` | Search for memberships. |
| `mcp_active-mcp-se_get_membership_package_categories` | Retrieve the list of membership package categories configured for the current organization. |
| `mcp_active-mcp-se_get_membership_usages` | Search for membership usages at a specific date. |
| `mcp_active-mcp-se_get_membership_package_fees` | Retrieve the list of membership package fees for a specific membership package. |

