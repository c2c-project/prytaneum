// /**
//  * @description Renders the full summary of a report as a form. Data of the report is populated in updatable input fields. Uses Loading Button component as the submit button.
//  * @params {Object} props
//  * @params {Object} props.Report - object that stores the report data
//  * @params {string} props.SubmitEndpoint - endpoint to call when the form is submitted
//  */
// <FormBase
//     Report={Object}
//     SubmitEndpoint='/feedback/update-report'
// />

// /**
//  * @description Renders a form to create a feedback or bug report. Uses FormBase as a child component, passing an empty report object and a create-report endpoint
//  * @params {Object} props
//  * @params {string} props.Title - Title of the form
//  * @params {string} props.MainDescription - Description of the form
//  */

// <ReportForm
//     Title='Feedback Form'
//     MainDescription='Let us know how we can improve your virtual town hall experience in the future. We strongly appreciate your feedback!'
// />

// /**
//  * @description Renders Feedback or Bug report summaries, as forms, to a non-privileged user. Uses FormBase as a child component, passing an non-empty report object and a update-report endpoint
//  * @params {Object} props
//  * @params {Object} props.Report - object that stores the report data
//  */
// <ReportSummary
//     Report={Object}
// />
