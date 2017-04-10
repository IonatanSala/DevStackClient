const _jobTypeEnum = [
  'Full-time',
  'Part-time',
  'Temporary',
  'Contract',
  'Internship',
  'Commission',
  'Permanent',
  'Apprenticeship'
];

const _salaryPaidPerEnum = [
  'hour',
  'day',
  'month',
  'year'
];

const validate = values => {
  const errors = {};
  if(!values.company) {
    errors.company = 'Company name required.'
  }

  if(!values.title) {
    errors.title = 'Job title is required';
  }

  if(!values.location) {
    errors.location = 'Location is required';
  }

  if(!values.jobType) {
    errors.jobType = 'Job type is required';
  } else if(!_jobTypeEnum.includes(values.jobType)) {
    errors.jobType = 'Your must select job type from the given list';
  }

  if(values.salary && !values.salaryPaidPer) {
    errors.salaryPaidPer = 'Field required';
  } else if(values.salaryPaidPer && !_salaryPaidPerEnum.includes(values.salaryPaidPer)) {
    errors.salaryPaidPer = 'You must select from given list';
  }

  if(!values.description) {
    errors.description = 'Job description is required';
  } else if(values.description && values.description.length < 30) {
    errors.description = 'Job description must be a minimum of 30 characters';
  }

  return errors;
}

export default validate;
