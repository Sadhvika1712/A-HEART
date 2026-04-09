{
  "name": "HelpRequest",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Title of the help request"
    },
    "description": {
      "type": "string",
      "description": "Detailed description of help needed"
    },
    "category": {
      "type": "string",
      "enum": [
        "skill",
        "tool",
        "resource",
        "general_help"
      ],
      "description": "Category of help needed"
    },
    "urgency": {
      "type": "string",
      "enum": [
        "low",
        "medium",
        "high"
      ],
      "default": "medium"
    },
    "location": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "open",
        "assigned",
        "in_progress",
        "completed",
        "cancelled"
      ],
      "default": "open"
    },
    "requester_email": {
      "type": "string"
    },
    "requester_name": {
      "type": "string"
    },
    "assigned_helper_email": {
      "type": "string"
    },
    "assigned_helper_name": {
      "type": "string"
    },
    "match_reason": {
      "type": "string",
      "description": "AI matching reason"
    },
    "requester_rated_helper": {
      "type": "boolean",
      "default": false
    },
    "helper_rated_requester": {
      "type": "boolean",
      "default": false
    },
    "completed_date": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "title",
    "description",
    "category",
    "urgency"
  ]
}
