{
  "name": "HelpOffer",
  "type": "object",
  "properties": {
    "skill_type": {
      "type": "string",
      "description": "Type of skill offered"
    },
    "available_time": {
      "type": "string",
      "description": "When the user is available"
    },
    "resources": {
      "type": "string",
      "description": "Resources the user can offer"
    },
    "location": {
      "type": "string"
    },
    "offerer_email": {
      "type": "string"
    },
    "offerer_name": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "busy",
        "inactive"
      ],
      "default": "active"
    }
  },
  "required": [
    "skill_type",
    "available_time"
  ]
}
