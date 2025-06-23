
export interface NodeTemplate {
  id: string;
  label: string;
  description: string;
  type: 'trigger' | 'action';
  category: string;
}

export const nodeTemplates: Record<string, NodeTemplate[]> = {
  CRM: [
    {
      id: 'crm-new-contact',
      label: 'New Contact Created',
      description: 'Triggers when a new contact is added to CRM',
      type: 'trigger',
      category: 'CRM',
    },
    {
      id: 'crm-update-contact',
      label: 'Update Contact',
      description: 'Updates an existing contact in CRM',
      type: 'action',
      category: 'CRM',
    },
    {
      id: 'crm-create-deal',
      label: 'Create Deal',
      description: 'Creates a new deal in CRM',
      type: 'action',
      category: 'CRM',
    },
  ],
  Contact: [
    {
      id: 'contact-send-email',
      label: 'Send Email',
      description: 'Sends an email to specified contact',
      type: 'action',
      category: 'Contact',
    },
    {
      id: 'contact-send-sms',
      label: 'Send SMS',
      description: 'Sends an SMS to specified contact',
      type: 'action',
      category: 'Contact',
    },
    {
      id: 'contact-add-tag',
      label: 'Add Tag',
      description: 'Adds a tag to contact',
      type: 'action',
      category: 'Contact',
    },
  ],
  Calendar: [
    {
      id: 'calendar-new-event',
      label: 'New Event Created',
      description: 'Triggers when a new calendar event is created',
      type: 'trigger',
      category: 'Calendar',
    },
    {
      id: 'calendar-create-event',
      label: 'Create Event',
      description: 'Creates a new calendar event',
      type: 'action',
      category: 'Calendar',
    },
    {
      id: 'calendar-update-event',
      label: 'Update Event',
      description: 'Updates an existing calendar event',
      type: 'action',
      category: 'Calendar',
    },
  ],
  LMS: [
    {
      id: 'lms-course-completed',
      label: 'Course Completed',
      description: 'Triggers when a student completes a course',
      type: 'trigger',
      category: 'LMS',
    },
    {
      id: 'lms-enroll-student',
      label: 'Enroll Student',
      description: 'Enrolls a student in a course',
      type: 'action',
      category: 'LMS',
    },
    {
      id: 'lms-generate-certificate',
      label: 'Generate Certificate',
      description: 'Generates a completion certificate',
      type: 'action',
      category: 'LMS',
    },
  ],
  Database: [
    {
      id: 'db-record-created',
      label: 'Record Created',
      description: 'Triggers when a new record is created',
      type: 'trigger',
      category: 'Database',
    },
    {
      id: 'db-create-record',
      label: 'Create Record',
      description: 'Creates a new database record',
      type: 'action',
      category: 'Database',
    },
    {
      id: 'db-update-record',
      label: 'Update Record',
      description: 'Updates an existing database record',
      type: 'action',
      category: 'Database',
    },
  ],
};

export const categories = Object.keys(nodeTemplates);
