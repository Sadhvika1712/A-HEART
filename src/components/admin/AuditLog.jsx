{
  "name": "AuditLog",
  "type": "object",
  "properties": {
    "action": {
      "type": "string",
      "description": "Action performed e.g. data_download, user_approved, user_blocked"
    },
    "performed_by_email": {
      "type": "string"
    },
    "performed_by_name": {
      "type": "string"
    },
    "target_email": {
      "type": "string",
      "description": "Target user email if applicable"
    },
    "details": {
      "type": "string",
      "description": "Additional details about the action"
    },
    "ip_address": {
      "type": "string"
    }
  },
  "required": [
    "action",
    "performed_by_email"
  ]
}
